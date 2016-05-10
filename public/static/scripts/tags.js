(function($){
    $(document).ready(function(){
        var attributes = new Bloodhound({
            initialize: false,
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            identify: function(obj) { return obj.id; },
            prefetch: {
                url: 'json/attributes.json',
                cache: false
            }
        });

        var promise = attributes.initialize();

        window.getTags = function(ids) {
            return promise.then(function () {
                return attributes.get(ids);
            });
        };

        var $input = $('.tags-input');

        $input.tagsinput({
            tagClass: 'chip light-blue darken-2 white-text',
            itemValue: 'id',
            itemText: 'name',
            typeaheadjs: {
                name: 'attributes',
                displayKey: 'name',
                source: attributes.ttAdapter()
            }
        });

        getTags($input.val().split(',')).then(function(values){
            for(var i=0;i<values.length;i++){
                $input.tagsinput('add', values[i]);
            }
        });
    });
})(jQuery);