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
    var $pagination;
    var $reviews;
    var $hallTpl;
    var $halls;

    $(document).ready(function(){
        $map = $('.map');
        $toggle = $('.edit-venue');
        $body = $('body');
        $attrs = $('.accessories');
        $attrsInput = $('#attributes');
        $tpl = $('#tag-template').detach().removeAttr('id');
        $reviews = $('.venue__reviews');
        $pagination = $('.pagination');
        $halls = $('.venue__halls');
        $hallTpl = $halls.find('.template').detach().removeClass('template');

        $body
            .on('focus', '[contenteditable]', onFocus)
            .on('blur', '[contenteditable]', onBlur)
            .on('click', '.edit-venue', toggleEditMode)
            .on('click', '.remove-photo', removePhoto)
            .on('click', '.button-add-hall', addHall)
            .on('click', '.trigger-upload', triggerUpload);

        var ids = [];

        $attrs.find('li').each(function(){
            ids.push( $(this).data('id') );
        });

        getTags(ids).then(function(tags){
            for(var i=0;i<tags.length;i++){
                $attrsInput.tagsinput('add', tags[i]);
            }

            $attrsInput
                .on('itemAdded', addTag)
                .on('itemRemoved', removeTag);
        });

        handleModal('#modal-contact');
        // handleModal('#modal-review');
        handleModal('#modal-hall', appendHall);

        initPagination();
        initUpload();
        initFancybox();
        initFacebook();

        if(sessionStorage && sessionStorage.getItem('edit')){
            $toggle.trigger('click');
        }
    });

    function initFancybox(){
        $('.fancybox').fancybox({
            live: true,
            afterLoad: function() {
                if(editEnabled) {
                    this.title = '<span contenteditable data-property="photo" data-id="' + this.element.data('id') + '">' + this.title + '</span><i class="material-icons right remove-photo" data-id="' + this.element.data('id') + '" title="Usuń">delete</i>';
                }
            },
            helpers : {
                title : {
                    type : 'inside'
                }
            }
        });
    }

    function initFacebook(){
        var $modal = $('#modal-facebook');
        var $pageID = $modal.find('input');

        $modal.on('click', '.modal-action', function(){
            var pageID = $pageID.val();

            if(!/^[a-zA-Z0-9\-_]+$/.test(pageID)){
                $pageID.focus();
                Materialize.toast('Niepoprawny format identyfikatora!', 2000, 'red');
            } else {
                FB.login(function(response) {
                    if (response.authResponse) {
                        FB.api(
                            '/' + pageID + '?fields=about,description,location,phone,website,emails',
                            parseResponse
                        );
                    }
                }, {scope: ''});
            }
        });

        function parseResponse(response){
            if (response && !response.error) {
                var description = response.description || response.about;
                var website = response.website;
                var email = response.emails ? response.emails[0] : undefined;
                var phone = response.phone;
                var location = response.location;
                var data = {};
                var position;

                if(description){
                    data.description = filterTags(description);
                }

                if(website && isWebsite(website)){
                    data.website = website;
                }

                if(email && isEmail(email)){
                    data.email = email;
                }

                if(phone && isPhone(phone)){
                    data.phone = phone;
                }

                if(location){
                    data.address = filterTags(location.street) + '<br>' +
                                   filterTags(location.zip) + ' ' + filterTags(location.city);

                    position = {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)};

                    data.geoposition = position.lat + ',' + position.lng;

                    marker.setPosition(position);
                    map.setCenter(position);
                }

                var keys = Object.keys(data);
                var key;

                for(var i=0;i<keys.length;i++ ){
                    key = keys[i];
                    setProperty(key, data[key]);
                }

                $.ajax({
                    url: window.location.href,
                    type: 'PUT',
                    data: {venue: data}
                });

                $modal.closeModal();
            }
        }

        function setProperty(property, value){
            $('*[data-property=' + property + ']').html(value);
        }

        function isPhone(phone){
            return /^[0-9\(\)\+\-\s]$/.test(phone);
        }

        function isWebsite(website){
            return /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?$/.test(website);
        }

        function isEmail(email){
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }

        function filterTags(content){
            return content.replace(/(<([^>]+)>)/ig, "");
        }
    }

    function appendHall(response){
        var $tpl = $hallTpl.clone();
        $tpl.data('id', response.id);
        $tpl.find('.card-title-text').text(response.name);
        $tpl.find('img').attr('src', response.photo);
        $tpl.find('.sitting').text(response.chairs);
        $tpl.find('.standing').text(response.capacity);
        $halls.find('.row').append($tpl);
    }

    function addHall(e){
        e.preventDefault();
        $('#modal-hall').addClass('modal-add').openModal();
    }

    function triggerUpload(e){
        e.preventDefault();
        $('#modal-upload').openModal();
        $('#upload-type').val( $(this).data('type') );
        $('#upload-id').val( $(this).data('id') );
    }

    function removePhoto(){
        var id = $(this).data('id');
        save('photo', '', {
            id: id,
            method: 'delete'
        });
        $('.fancybox[data-id=' + id + ']').parent().remove();
        $.fancybox.close();
    }

    function initUpload(){
        var $gallery = $('.venue__gallery');
        var $galleryTpl = $gallery.find('.template').detach().removeClass('template');

        $('#modal-upload').on('submit', 'form', function(e){
            e.preventDefault();
            var form = $(this);
            var formData = new FormData();
            formData.append('type', $('#upload-type').val());
            formData.append('id', $('#upload-id').val());
            formData.append('description', $('#upload-description').val());
            formData.append('photo', $('#upload-photo')[0].files[0]);

            $.ajax({
                url: $(this).attr('action'),
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false
            })
                .done(function(response){
                    $('#modal-upload').closeModal();

                    if(response.imageable_type == 'Venue'){
                        venueUpload(response);
                    }
                })
                .fail(window.defaultErrorHandler);
        });

        function venueUpload(response){
            var $tpl = $galleryTpl.clone();
            $tpl.find('a').attr({
                'href' : response.image,
                'title' : response.title,
                'data-id' : response.id
            }).find('img').attr('src', response.image);
            $gallery.find('ul').append($tpl);
        }
    }

    function initPagination(){
        var $items = $reviews.find('.collection-item');
        var pages = $items.size() / 5 + 1;
        var currentPage;
        var $prev = $pagination.find('li').first();
        var $next = $pagination.find('li').last();

        if(pages == 1){
            $pagination.hide();
        } else {
            $pagination.on('click', 'li', function(e){
                e.preventDefault();

                if($(this) == $prev){
                    displayPage(currentPage-1);
                } else if($(this) == $next){
                    displayPage(currentPage+1);
                } else {
                    displayPage( $(this).index() );
                }
            });

            var fragment = $(document.createDocumentFragment());
            var item = $pagination.find('li').eq(1);

            for(var i=2;i<=pages;i++){
                fragment.append( item.clone().find('a').text(i).end() );
            }

            item.after(fragment);
        }

        displayPage(1);

        function displayPage(n){
            if(n < 1 || n > pages){
                return false;
            }

            currentPage = n;

            if(currentPage == 1){
                $prev.addClass('disabled');
            } else {
                $prev.removeClass('disabled');
            }

            if(currentPage == pages){
                $next.addClass('disabled');
            } else {
                $next.removeClass('disabled');
            }

            $items.hide().slice((n-1)*5, n*5).show();
            $pagination.find('li').removeClass('active light-blue darken-2').eq(n).addClass('active light-blue darken-2');
        }
    }

    function onFocus(){
        saved = $(this).text();
    }

    function onBlur(){
        var current = $(this).text();

        if(current != saved){
            save( $(this).data('property'), current, $(this).data() );
        }
    }

    function addTag(event){
        var $tag = $tpl.clone();
        $tag.prepend(event.item.name);
        $tag.data('id', event.item.id);
        $tag.find('i').text(event.item.icon);
        $attrs.append($tag);
        saveTag(event.item.id, 'add');
    }

    function removeTag(event){
        $attrs.find('[data-id="'+event.item.id+'"]').remove();
        saveTag(event.item.id, 'remove');
    }

    function saveTag(id, action){
        save( $attrsInput.data('property'), id, {method: action} );
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

            if(sessionStorage){
                sessionStorage.removeItem('edit');
            }
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

            if(sessionStorage){
                sessionStorage.setItem('edit', true);
            }
        }

        $toggle.removeClass(remove).addClass(add).find('i').text(text);

        editEnabled = !editEnabled;

        if(marker){
            marker.setDraggable(editEnabled);
        }

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
            map: map,
            draggable: editEnabled
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
