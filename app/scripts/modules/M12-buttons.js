$(function(){
    $(".dropdown").hover(
        function() {
            $('.dropdown-select', this).stop( true, true ).fadeIn("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");
        },
        function() {
            $('.dropdown-select', this).stop( true, true ).fadeOut("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");
        });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();

  // delay: {
  //   "show": 100,
  //   "hide": 100
  // }
})
