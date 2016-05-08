(function($){
    $(document).ready(function(){
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
    });
})(jQuery);