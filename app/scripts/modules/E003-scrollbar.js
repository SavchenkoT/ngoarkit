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

$(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	}
})
