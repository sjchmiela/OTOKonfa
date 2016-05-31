(function($){
    var firstCall = true;
    var $compareButton;
    var $compareVenues;
    var $compareItem = $(
        '<li class="collection-item avatar">' +
            '<img src="" alt="" class="circle">' +
            '<a href="#" class="color-default title"></a>' +
            '<span class="secondary-content action--remove"><i class="material-icons grey-text">delete</i></span>' +
        '</li>');

    $(document).ready(function(){
        $('.parallax').parallax();
        $('.modal-trigger').leanModal();
        $('.dropdown-button').dropdown();
        $('.reset-password').click(function(){
            $('#modal-login').closeModal();
            $('#modal-reset').openModal();
        });

        $('body').on('click', function(){
            $compareVenues.fadeOut();
        });

        $('.action--compare').click(addToCompare);

        handleModal('#modal-login', loginSuccess);
        handleModal('#modal-register');
        handleModal('#modal-password');
        handleModal('#modal-information');
        handleModal('#modal-reset');

        loadCompare();

        function loginSuccess(){
            window.location.reload();
        }

        function actionCompare(type, id){
            $.ajax({
                url: '/venues/compare.json',
                type: 'GET',
                data: {venue_id: id, action_type: type},
                cache: false,
                dataType: 'json'
            })
                .done(parseCompare)
                .fail(window.defaultErrorHandler);
        }

        function addToCompare(){
            actionCompare('add', $(this).data('id'));
        }

        function loadCompare(){
            $compareButton = $('.compare-venues');
            $compareVenues = $('.toolbox .collection');

            $compareButton.on('click', function(e){
                e.stopPropagation();
                $compareVenues.fadeIn();
            });

            $compareVenues.on('click', '.action--remove', function(){
                actionCompare('remove', $(this).data('id'));
            }).on('click', function(e){
                e.stopPropagation();
            });

            actionCompare('get', 0);
        }

        function parseCompare(data){
            $compareVenues.find('.collection-item').remove();

            if(data.length > 0){
                $compareButton.show().find('i').text('filter_' + data.length);
                var fragment = $(document.createDocumentFragment());
                var $item, item;
                for(var i= 0,c=data.length;i<c;i++){
                    item = data[i];
                    $item = $compareItem.clone();
                    $item.find('.title').text( item.name );
                    $item.find('img').attr( 'src', item.thumb );
                    $item.find('.action--remove').data('id', item.id);
                    fragment.append($item);
                }

                $compareVenues.append(fragment);

                if(!firstCall){
                    $compareVenues.fadeIn();
                }
            } else {
                $compareButton.hide();
            }

            firstCall = false;
        }

        $('html').removeClass('no-js');
    });

    window.defaultErrorHandler = function(result){
        Materialize.toast(result.message, 4000, 'red');
    };

    window.handleModal = function(id, success, error){
        if(!success){
            success = function(result){
                Materialize.toast(result.message, 4000, 'green');
            };
        }

        if(!error){
            error = window.defaultErrorHandler;
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
