(function($){
    $(document).ready(function(){
        var attributes = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            identify: function(obj) { return obj.id; },
            prefetch: 'json/attributes.json'
        });

        $('.tags-input').tagsinput({
            tagClass: 'chip light-blue darken-2 white-text',
            itemValue: 'id',
            itemText: 'label',
            typeaheadjs: {
                name: 'attributes',
                displayKey: 'label',
                source: attributes.ttAdapter()
            }
        });
    });
})(jQuery);