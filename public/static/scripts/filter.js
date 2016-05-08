(function($){
    $(document).ready(function(){
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
        var $map = $('.map');
        var position = {lat: 50.060688, lng: 19.9304733};
        var map = new google.maps.Map($map.get(0), {
            center: position,
            zoom: 12
        });
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            draggable: true
        });
        var circle = new google.maps.Circle({
            map: map,
            radius: 1000,
            strokeWeight: 1,
            fillColor: '#0288d1',
            strokeColor: '#0288d1'
        });
        circle.bindTo('center', marker, 'position');
    }
})(jQuery);