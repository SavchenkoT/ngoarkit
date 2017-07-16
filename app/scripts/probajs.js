$.ajax({
    url: '../scripts/probajs.js'             // указываем URL и
}).always(function() {
  $( this ).addClass( "done" );
});
