window.$ = window.jQuery = require('jquery');
require("bootstrap");

module.exports = function(vars) {
	//TODO: alert make a separate
	function pagealerts(int,title,content,type) {

		var $alert = $('<div/>', {
		    'class': 'alert '+ type +'',
		    'html': '<h3>'+ title +'</h3><span>'+ content +'</span>',
		});

		$('<button/>', {
		    'type':'button',
		    'class':'close',
				'data-dismiss': "alert",
				'aria-label':"Close",
		    'html':'<span aria-hidden="true">&times;</span>',
		}).on('click', function(){
				$(this).parent().remove();
		}).prependTo($alert);

		$(int).prepend($alert);

	}

	

	//page id init (Auth.html)
//  $("#authpage").each(function(){
//		console.log('%c T01-messenger init! ', 'background: #A3C5E9; color: white');
//		pagealerts(this,'Allert message','in Auth page!, remove or edit this message in modules/T01-messenger/ #authpage, curent branch develop!','alert-success');
//  });

};
