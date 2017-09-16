
jQuery(function(){

    jQuery(window).on('order:change',function(event, some, blockIdent, value){

        var $clicked_item = jQuery('[data-sortbox][data-ident="'+blockIdent+'"]').find('[data-element-type="sort-item"][data-value="'+value+'"]'),
                sort_box = $clicked_item.parents('[data-sortbox]'),
                $closer = sort_box.find(".ddcloser"),
                $frame  = sort_box.find(".ddframe"),
                opener = sort_box.find(".ddopener>span"),
                active_sort_elt = opener.find(".js-active-sort-state"),
                $current_active_item = $closer.find('[data-element-type="sort-item"]');

        $current_active_item.appendTo($frame);
        $current_active_item.removeAttr('data-current-element');
        $clicked_item.appendTo($closer);
        $clicked_item.attr('data-current-element', "");
        active_sort_elt.text($clicked_item.text());
    });
});
