(function($){
    var $map;
    var map;
    var marker;

    $(document).ready(function(){
        $map = $('.map');
    });

    window.initMap = function(){
        var position = {lat: 50.060688, lng: 19.9304733};

        map = new google.maps.Map($map.get(0), {
            center: position,
            zoom: 12
        });

        marker = new google.maps.Marker({
            position: position,
            map: map,
            draggable: true
        });
    };
})(jQuery);