(function($){
    var $map;
    var map;
    var marker;
    var saved;
    var editEnabled = false;
    var $attrsInput;
    var $attrs;
    var MESSAGES = {
        SAVING: 'Zapisuję zmiany...',
        DONE: 'Gotowe!',
        ERROR: 'Błąd!'
    };
    var $toggle;
    var $body;
    var $tpl;

    $(document).ready(function(){
        $map = $('.map');
        $toggle = $('.edit-venue > span');
        $body = $('body');
        $attrs = $('.accessories');
        $attrsInput = $('#attributes');
        $tpl = $('#tag-template').detach().removeAttr('id');

        $body
            .on('focus', '[contenteditable]', onFocus)
            .on('blur', '[contenteditable]', onBlur)
            .on('click', '.edit-venue', toggleEditMode);

        var ids = [];

        $attrs.find('li').each(function(){
            ids.push( $(this).data('id') );
        });

        var tags = getTags(ids);

        for(var i=0;i<tags.length;i++){
            $attrsInput.tagsinput('add', tags[i]);
        }

        $attrsInput
            .on('itemAdded', addTag)
            .on('itemRemoved', removeTag);
    });

    function onFocus(){
        saved = $(this).text();
    }

    function onBlur(){
        var current = $(this).text();

        if(current != saved){
            save( $(this).data('property'), current );
        }
    }

    function addTag(event){
        console.log(event.item);
        var $tag = $tpl.clone();
        $tag.prepend(event.item.label);
        $tag.data('id', event.item.id);
        $tag.find('i').text('mode_edit'); // mock icon
        $attrs.append($tag);
        saveTag(event.item.id, 'add');
    }

    function removeTag(event){
        $attrs.find('[data-id="'+event.item.id+'"]').remove();
        saveTag(event.item.id, 'remove');
    }

    function saveTag(id, action){
        save( $attrsInput.data('property'), id, {action: action} );
    }

    function toggleEditMode(){
        var add, remove, text, fn;

        if(editEnabled){
            add = 'red';
            remove = 'green';
            text = 'mode_edit';
            fn = function(){
                if(isContentEditable(this)){
                    $(this).removeAttr('contenteditable');
                }
            };
            $body.removeClass('edit-enabled');
        } else {
            add = 'green';
            remove = 'red';
            text = 'done';
            fn = function(){
                if(isContentEditable(this)){
                    $(this).attr('contenteditable', true);
                }
            };
            $body.addClass('edit-enabled');
        }

        $toggle.removeClass(remove).addClass(add).find('i').text(text);

        editEnabled = !editEnabled;
        marker.setDraggable(editEnabled);

        $('[data-property]').each(fn);
    }

    function isContentEditable(obj){
        return !$(obj).hasClass('map') && obj !== $attrsInput;
    }

    window.initMap = function(){
        var data = $map.data('geoposition').split(',');
        var position = {lat: parseFloat(data[0]), lng: parseFloat(data[1])};

        map = new google.maps.Map($map.get(0), {
            center: position,
            zoom: 12
        });

        marker = new google.maps.Marker({
            position: position,
            map: map
        });

        google.maps.event.addListener(marker, 'dragend', updateLocation );
    };

    function updateLocation(){
        var location = marker.getPosition();
        var data = location.lat() + ',' + location.lng();
        map.setCenter(location);
        save( $map.data('property'), data );
    }

    function save(property, value, data){
        Materialize.toast(MESSAGES.SAVING, 2000, 'orange');
        data = data || {};
        data.property = property;
        data.value = value;
        $.post(window.location.href, data).done(function(){
            Materialize.toast(MESSAGES.DONE, 2000, 'green');
        }).fail(function(){
            Materialize.toast(MESSAGES.ERROR, 2000, 'green');
        });
    }
})(jQuery);