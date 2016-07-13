window.$ = window.jQuery = require('jquery');
require("bootstrap");
require("bootstrap-carousel-swipe");
require("matchHeight");

module.exports = function(vars) {

  $("#authpage").each(function(){
		console.log('%c hello M02-login init! ', 'background: #A3C5E9; color: white');
  });

};