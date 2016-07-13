window.$ = window.jQuery = require('jquery');
require("bootstrap");
//require("bootstrap-carousel-swipe");
//require('angular');
//require('./libs/ui-bootstrap-custom-tpls-1.3.2');

/* Cookies */
window.Cookies = require("js-cookie");

/* Project init */
global.app = function () {
  require("./modules/E003-scrollbar")();
	require("./modules/M02-login")();
	//...
};

$(function(){
  global.app(' ');
});


