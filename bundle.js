/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/audiovisualization.js":
/*!***********************************!*\
  !*** ./app/audiovisualization.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// loads the buffer
var setupAudio = function setupAudio() {
  function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  } // logic for the buffering of music


  BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var loader = this;

    request.onload = function () {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(request.response, function (buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }

        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length) loader.onload(loader.bufferList);
      }, function (error) {
        console.error('decodeAudioData error', error);
      });
    };

    request.onerror = function () {
      alert('BufferLoader: XHR error');
    };

    request.send();
  };

  function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  } // Abstracting the Web Audio API


  window.onload = init;
  var context;
  var bufferLoader;
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  var analyser = context.createAnalyser();
  var analyser2 = context.createAnalyser();

  function init() {
    bufferLoader = new BufferLoader(context, [// './assets/music/sundaycandy.mp3',
    './assets/music/staytogether.mp3'], finishedLoading);
    bufferLoader.load();
    analyser.fftSize = 2048; // analyser2.fftSize = 360;

    var bufferLength = analyser.frequencyBinCount;
    var bufferLength2 = analyser.frequencyBinCount; // console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);
    var dataArray2 = new Uint8Array(bufferLength);
    console.log(dataArray);
    analyser.getByteTimeDomainData(dataArray); // console.log(dataArray);
    // analyser.getByteTimeDomainData(dataArray);

    var canvas = document.getElementById("analyser-render");
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 2;
    var canvasCtx = canvas.getContext("2d");
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    function draw() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray); // console.log(dataArray);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();
      var sliceWidth = canvas.width * 1.0 / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        // console.log('hello')
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    }

    draw();
  } // function draw();
  // analyser.getByteFrequencyData(dataArray);
  // analyser.getFloatFrequencyData(dataArray);
  // analyser.getFloatTimeDomainData(dataArray);
  // AnalyserNode.getFloatFrequencyData()
  // AnalyserNode.getByteFrequencyData()
  // AnalyserNode.getByteFrequencyData()
  // Types of analysers
  // AnalyserNode.getFloatFrequencyData()
  // AnalyserNode.getByteFrequencyData()
  // AnalyserNode.getByTimeDomainData()
  // AnalyserNode.getFloatTimeDomainData()
  // AnalyserNode.frequencyBinCount()
  // AnalyserNode.fftSize;


  BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  };

  function finishedLoading(bufferList) {
    var source1 = context.createBufferSource();
    source1.connect(analyser);
    source1.buffer = bufferList[0];
    source1.connect(context.destination);
    source1.start(0);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (setupAudio);

/***/ }),

/***/ "./app/background.js":
/*!***************************!*\
  !*** ./app/background.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var setupBackground = function setupBackground() {
  var colors = new Array([62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]);
  var step = 0; //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right

  var colorIndices = [0, 1, 2, 3]; //transition speed

  var gradientSpeed = 0.002;

  function updateGradient() {
    if ($ === undefined) return;
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];
    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";
    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
    $('#gradient').css({
      background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
      background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });
    step += gradientSpeed;

    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3]; //pick two new target color indices
      //do not pick the same as the current one

      colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    }
  }

  setInterval(updateGradient, 10);
};

/* harmony default export */ __webpack_exports__["default"] = (setupBackground);

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _audiovisualization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audiovisualization */ "./app/audiovisualization.js");
/* harmony import */ var _background_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background.js */ "./app/background.js");
/**
 * Application entry point
 */
// Load application styles
// ================================
// START YOUR APP HERE
// ================================
 // import setupVisuals from './audiovisuals.js';


document.addEventListener('DOMContentLoaded', function () {
  Object(_audiovisualization__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var canvas = document.getElementById('analyser-render');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var context = canvas.getContext('2d'); // setupVisuals();

  Object(_background_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map