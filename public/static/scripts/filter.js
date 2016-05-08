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
})(jQuery);