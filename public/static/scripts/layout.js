(function($){
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('.page-nav ul').pushpin({
        top: $('.page-nav').offset().top,
        offset: $('.page-nav').offset().top,
        bottom: $('.default-page').next().offset().top - $('.page-nav ul').height() - 45
    });
    $('.default-page').find('h3, h4, h5, h6').scrollSpy();
})(jQuery);