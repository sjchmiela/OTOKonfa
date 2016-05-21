(function($){
    var map;
    var $map;
    var promise;

    $(document).ready(function(){
        $map = $('.venues-map');

        promise = $.get('/venues.json');
    });

    window.initMap = function(){
        promise.then(function(data){
            map = new google.maps.Map($map.get(0));

            var marker;

            var bounds = new google.maps.LatLngBounds();

            for(var i=0;i<data.length;i++){
                var parts = data[i].geoposition.split(',');
                var position = new google.maps.LatLng(parseFloat(parts[0]), parseFloat(parts[1]));

                marker = new google.maps.Marker({
                    position: position,
                    map: map
                });

                bounds.extend(position);
            }

            map.fitBounds(bounds);
        });
    };
})(jQuery);
