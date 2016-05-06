(function($){
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();

    var $pageNav = $('.page-nav');
    var $defaultPage = $('.default-page');

    if($pageNav.size()){
        $pageNav.find('ul').pushpin({
            top: $pageNav.offset().top,
            offset: $pageNav.offset().top,
            bottom: $defaultPage.next().offset().top - $pageNav.find('ul').height() - 45
        });
        $defaultPage.find('h3, h4, h5, h6').scrollSpy();
    }

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
    })
})(jQuery);