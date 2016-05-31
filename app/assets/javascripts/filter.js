(function($){
    var $location;
    var $radius;
    var $map;
    var map;
    var circle;
    var marker;

    $(document).ready(function(){
        $map = $('.map');
        $radius = $('#radius_size');
        $location = $('#location');

        $('.range-input').each(function(){
            var input = $(this).find('input');
            var value = input.val().split(',');
            var element = $(this).get(0);
            var step = $(this).data('step');
            var decimals = $(this).data('decimals');

            if(!step){
                step = 1;
            }

            if(!decimals){
                decimals = 0;
            }

            noUiSlider.create(element, {
                start: value,
                connect: true,
                step: step,
                range: {
                    'min': $(this).data('min'),
                    'max': $(this).data('max')
                },
                format: wNumb({
                    decimals: decimals
                })
            });

            element.noUiSlider.on('update', function( values ) {
                input.val(values.join(','));
                input.trigger('change');
            });
        });

        $radius.on('change', updateMap);
    });

    window.initMap = function(){
        var position = getDefaultPosition();

        map = new google.maps.Map($map.get(0), {
            center: position,
            zoom: 12
        });

        marker = new google.maps.Marker({
            position: position,
            map: map,
            draggable: true
        });

        circle = new google.maps.Circle({
            map: map,
            radius: 1000,
            strokeWeight: 1,
            fillColor: '#0288d1',
            strokeColor: '#0288d1'
        });
        circle.bindTo('center', marker, 'position');

        google.maps.event.addListener(marker, 'dragend', updateLocationInput );

        updateMap();
    };

    function updateLocationInput(){
        var location = marker.getPosition();
        $location.val(location.lat() + ',' + location.lng());
    }

    function getDefaultPosition(){
        if($location !== undefined && $location.val() != ''){
            var parts = $location.val().split(',');
            return {lat: parts[0], lng: parts[1]};
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(displayCurrentPosition);
            }

            return {lat: 50.060688, lng: 19.9304733};
        }
    }

    function displayCurrentPosition(position){
        var location = {lat: position.coords.latitude, lng: position.coords.longitude};
        map.setCenter(location);
        marker.setPosition(location);
        updateMap();
        updateLocationInput();
    }

    function updateMap(){
        var radius = $radius.val().split(',')[1];
        circle.setRadius(1000 * radius);
        map.fitBounds(circle.getBounds());
    }
})(jQuery);
