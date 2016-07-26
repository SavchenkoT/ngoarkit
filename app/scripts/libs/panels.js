var $copyDiv = $(".panel-default").find('.panel-heading').first().clone();
var $copyColap = $(".panel-default").find('.panel-collapse').first().clone();
$("#plusToPanel").on('click', function(){
  $copyDiv.insertAfter("#collapseOne").after($copyColap);
});


$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})
