(function($){
    window.initMap = function(){
        var map;
        var position;
        var split;

        $('.compare__map').each(function(){
            split = $(this).data('position').split(',');
            position = {lat: parseFloat(split[0]), lng: parseFloat(split[1])};

            map = new google.maps.Map($(this).get(0), {
                center: position,
                zoom: 12,
                disableDefaultUI: true
            });

            marker = new google.maps.Marker({
                position: position,
                map: map
            });
        });
    };
})(jQuery);