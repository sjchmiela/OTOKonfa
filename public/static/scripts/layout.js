(function($){
    $(document).ready(function(){
        $('.parallax').parallax();
        $('.modal-trigger').leanModal();

        $('#modal-login').on('submit', 'form', function(e){
            e.preventDefault();

            $.post( $(this).attr('action'), $(this).serialize()).done(function(){
                window.location.reload();
            }).fail(function(result){
                Materialize.toast(result.message, 4000, 'red');
            });
        });
    });
})(jQuery);