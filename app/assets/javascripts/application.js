// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require materialize-sprockets
//= require_tree .

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
