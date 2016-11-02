/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var MainView = __webpack_require__( 1 );
	
	window.onload = function() {
	  main();
	}
	
	var main = function() {
	  var view = new MainView();
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	var MainView = function() {
	  this.pictures = [];
	  this.url = "https://wedding--photo-test.herokuapp.com/pictures";
	  this.getPictures();
	}
	
	MainView.prototype = {
	
	  getPictures: function() {
	    var pictureSpace = document.getElementById( 'picture-space' );
	    pictureSpace.innerText = "";
	    var request = new XMLHttpRequest();
	    request.open( 'GET', this.url );
	    request.setRequestHeader("Content-Type", "application/json")
	    request.onload = () => {
	      if( request.status === 200 ) {
	        var pictures = JSON.parse( request.responseText );
	        this.pictures = pictures;
	        this.display();
	      }
	    }
	    request.send( null );
	  },
	
	  display: function() {
	    var pictureSpace = document.getElementById( 'picture-space' );
	    var list = document.createElement( 'ul' );
	    pictureSpace.appendChild( list );
	    for( var i = 0; i < this.pictures.length; i++ ) {
	      var picture = document.createElement( 'img' );
	      var text = this.pictures[i].url;
	      picture.src = text;
	      list.appendChild( picture );
	    }
	  },
	
	
	}
	
	module.exports = MainView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map