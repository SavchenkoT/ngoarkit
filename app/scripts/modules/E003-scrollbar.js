window.$ = window.jQuery = require('jquery');
require('malihu-custom-scrollbar-plugin')(window.$);

module.exports = function(vars) {

	 window.applyScrollbar = function() {

			if($(window).width()>750){
				var $isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
				var $isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

				if($isChrome){
					console.log("css scroll is ok!");
				}
				else if($isSafari){
					console.log("css scroll is ok!");
				}
				else{
					console.log("js scroll is ok!");
					$("._scrollable").mCustomScrollbar();
				}
			}
   };
   window.applyScrollbar();
};

	$(".clickable").on("click", function(){
	 var $this = $(this)
	 $this.parent().parent().parent().find('.panel-body').toggleClass("open");


	 $this.find('i.fa').toggleClass("fa-chevron-down").toggleClass("fa-chevron-up");
	});
$('.collapse').on('show.bs.collapse', function () {
    document.body.style.overflow="hidden";
})

$('.collapse').on('hidden.bs.collapse', function () {
    document.body.style.overflow="scroll";
})