(function($){
    $(document).ready(function(){
        var attributes = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            identify: function(obj) { return obj.id; },
            prefetch: '/features.json'
        });

        var $input = $('.tags-input');

        var values = attributes.get($input.val().split(','));

        $input.tagsinput({
            tagClass: 'chip light-blue darken-2 white-text',
            itemValue: 'id',
            itemText: 'label',
            typeaheadjs: {
                name: 'attributes',
                displayKey: 'label',
                source: attributes.ttAdapter()
            }
        });

        for(var i=0;i<values.length;i++){
            $input.tagsinput('add', values[i]);
        }
    });
})(jQuery);
