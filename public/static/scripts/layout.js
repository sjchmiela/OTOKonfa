(function($){
    var compare = [];
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
            $.post('json/compare.json', {venue_id: id, action: type}, parseCompare);
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
            compare = data;

            $compareVenues.find('.collection-item').remove();

            if(compare.length > 0){
                $compareButton.show().find('i').text('filter_' + compare.length);
                var fragment = $(document.createDocumentFragment());
                var $item, item;
                for(var i= 0,c=compare.length;i<c;i++){
                    item = compare[i];
                    $item = $compareItem.clone();
                    $item.find('.title').text( item.name );
                    $item.find('img').attr( 'src', item.thumb );
                    $item.find('.action--remove').data('id', item.venue_id);
                    fragment.append($item);
                }
                $compareVenues.append(fragment);
            } else {
                $compareButton.hide();
            }
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