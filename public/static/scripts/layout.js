(function($){
    $(document).ready(function(){
        $('.parallax').parallax();
        $('.modal-trigger').leanModal();

        handleModal('#modal-login', loginSuccess, error);
        handleModal('#modal-register', registerSuccess, error);

        function loginSuccess(){
            window.location.reload();
        }

        function error(result){
            Materialize.toast(result.message, 4000, 'red');
        }

        function registerSuccess(result){
            $('#modal-register').closeModal();
            Materialize.toast(result.message, 4000, 'green');
        }
    });

    window.handleModal = function(id, success, error){
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