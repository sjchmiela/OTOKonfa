(function($){
    var $map;
    var map;
    var marker;
    var saved;
    var editEnabled = false;
    var MESSAGES = {
        SAVING: 'Zapisuję zmiany...',
        DONE: 'Gotowe!',
        ERROR: 'Błąd!'
    };
    var $toggle;

    $(document).ready(function(){
        $map = $('.map');
        $toggle = $('.edit-venue > span');

        $('body')
            .on('focus', '[contenteditable]', onFocus)
            .on('blur', '[contenteditable]', onBlur)
            .on('click', '.edit-venue', toggleEditMode);
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

    function toggleEditMode(){
        var add, remove, text, fn;

        if(editEnabled){
            add = 'red';
            remove = 'green';
            text = 'mode_edit';
            fn = function(){
                if(!$(this).hasClass('map')){
                    $(this).removeAttr('contenteditable');
                }
            };
        } else {
            add = 'green';
            remove = 'red';
            text = 'done';
            fn = function(){
                if(!$(this).hasClass('map')){
                    $(this).attr('contenteditable', true);
                }
            };
        }

        $toggle.removeClass(remove).addClass(add).find('i').text(text);

        editEnabled = !editEnabled;

        $('[data-property]').each(fn);
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
            map: map,
            draggable: true
        });

        google.maps.event.addListener(marker, 'dragend', updateLocation );
    };

    function updateLocation(){
        var location = marker.getPosition();
        var data = location.lat() + ',' + location.lng();
        map.setCenter(location);
        save( $map.data('property'), data );
    }

    function save(property, value){
        Materialize.toast(MESSAGES.SAVING, 2000, 'orange');
        $.post(window.location.href, {
            property: property,
            value: value
        }).done(function(){
            Materialize.toast(MESSAGES.DONE, 2000, 'green');
        }).fail(function(){
            Materialize.toast(MESSAGES.ERROR, 2000, 'green');
        });
    }
})(jQuery);