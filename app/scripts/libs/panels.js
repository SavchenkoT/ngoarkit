var $copyDiv = $(".panel-default").find('.panel-heading').first().clone();
var $copyColap = $(".panel-default").find('.panel-collapse').first().clone();
$("#plusToPanel").on('click', function(){
        $copyDiv.insertAfter("#collapseOne").after($copyColap);
});
