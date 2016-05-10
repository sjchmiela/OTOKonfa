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

        $('#modal-register').on('submit', 'form', function(e){
            e.preventDefault();

            $.post( $(this).attr('action'), $(this).serialize()).done(function(result){
                $('#modal-register').closeModal();
                Materialize.toast(result.message, 4000, 'green');
            }).fail(function(result){
                Materialize.toast(result.message, 4000, 'red');
            });
        });
    });
})(jQuery);