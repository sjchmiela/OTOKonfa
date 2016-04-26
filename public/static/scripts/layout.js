(function($){
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('.page-nav ul').pushpin({ top: $('.page-nav').offset().top, offset: $('.page-nav').offset().top});
    $('.default-page').find('h3, h4, h5, h6').scrollSpy();
})(jQuery);