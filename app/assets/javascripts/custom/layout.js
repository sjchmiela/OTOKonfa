(function($){
    $(document).ready(function(){
        $('.parallax').parallax();
        $('.modal-trigger').leanModal();
        $('.dropdown-button').dropdown();
        $('.reset-password').click(function(){
            $('#modal-login').closeModal();
            $('#modal-reset').openModal();
        });

        handleModal('#modal-login', loginSuccess);
        handleModal('#modal-register');
        handleModal('#modal-password');
        handleModal('#modal-information');
        handleModal('#modal-reset');

        function loginSuccess(){
            window.location.reload();
        }
    });

    window.handleModal = function(id, success, error){
        if(!success){
            success = function(result){
                Materialize.toast(result.message, 4000, 'green');
            };
        }

        if(!error){
            error = function(result){
                Materialize.toast(result.message, 4000, 'green');
            };
        }

        $(id).on('submit', 'form', function(e){
            e.preventDefault();

            $.post( $(this).attr('action'), $(this).serialize())
                .done(function(){
                    $(id).closeModal();
                    success.apply(this, arguments);
                })
                .fail(error);
        });
    };
})(jQuery);