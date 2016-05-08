(function($){
    var $location;
    var $map;
    var map;
    var circle;
    var marker;

    $(document).ready(function(){
        $map = $('.map');
        $location = $('#filter-location');

        $('.range-input').each(function(){
            noUiSlider.create($(this).get(0), {
                start: [$(this).data('start-from'), $(this).data('start-to')],
                connect: true,
                step: 1,
                range: {
                    'min': $(this).data('min'),
                    'max': $(this).data('max')
                },
                format: wNumb({
                    decimals: 0
                })
            });
        });
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
    };

    function getDefaultPosition(){
        if($location.val() != ''){
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
    }
})(jQuery);