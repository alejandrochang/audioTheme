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
  var analyser3 = context.createAnalyser();
  var analyser4 = context.createAnalyser();

  function init() {
    bufferLoader = new BufferLoader(context, [// './assets/music/sundaycandy.mp3',
    // './assets/music/staytogether.mp3',
    // './assets/music/randomaccessmemories.mp3',
    // './assets/music/babyblue.mp3',
    // './assets/music/igotu.mp3',
    // './assets/music/outofmyleague.mp3',
    // './assets/music/thinkingaboutyou.mp3',
    // './assets/music/thewayyoulooktonight.mp3',
    // './assets/music/loveseason.mp3',
    // './assets/music/sofartogo.mp3',
    // './assets/music/comingover.mp3',
    // './assets/music/firestone.mp3',
    // './assets/music/dancinginthemoonlight.mp3',
    './assets/music/youngandbeautiful.mp3'], finishedLoading);
    bufferLoader.load(); // audio analyzers

    analyser.fftSize = 2048;
    analyser2.fftSize = 32;
    analyser3.fftSize = 512;
    analyser4.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var bufferLength2 = analyser2.frequencyBinCount;
    var bufferLength3 = analyser3.frequencyBinCount;
    var bufferLength4 = analyser4.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var dataArray2 = new Uint8Array(bufferLength2);
    var dataArray3 = new Uint8Array(bufferLength3);
    var dataArray4 = new Uint8Array(bufferLength4);
    var canvas = document.getElementById("analyser-render");
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 2;
    var canvasCtx = canvas.getContext("2d");
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    function draw() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      analyser.getByteFrequencyData(dataArray2);
      analyser.getByteFrequencyData(dataArray3);
      analyser.getByteFrequencyData(dataArray4);
      canvasCtx.lineWidth = 3.15;

      function r() {
        return Math.floor(Math.random() * 255);
      }

      canvasCtx.strokeStyle = "rgb(" + r() + "," + 0 + "," + r() + ")";
      canvasCtx.beginPath();
      var sliceWidth = canvas.width * 1.0 / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] - 128;
        var y = v + canvas.height / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.stroke();

      for (var _i = 0; _i < bufferLength2; _i++) {
        var z = dataArray2[_i];
        var y = dataArray[_i];
        var w = dataArray3[_i];
        var m = dataArray4[_i];
      } // circle canvas
      // find the center of the window


      var center_x = canvas.width / 2;
      var center_y = canvas.height / 2;
      var radius = z;
      canvasCtx.lineWidth = 2.3;
      canvasCtx.strokeStyle = "rgb(" + 0 + "," + r() + "," + 0 + ")"; //circle

      canvasCtx.beginPath();
      canvasCtx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
      canvasCtx.stroke(); //second circle

      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      var radius2 = y;
      canvasCtx.lineWidth = 2.3;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx, cy, radius2, 0, 2 * Math.PI);
      canvasCtx.stroke(); //third circle

      var cx2 = canvas.width / 2;
      var cy2 = canvas.height / 2;
      var radius3 = w;
      canvasCtx.lineWidth = 2.2;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx2, cy2, radius3, 0, 2 * Math.PI);
      canvasCtx.stroke(); //fourth circle

      var cx3 = canvas.width / 2;
      var cy3 = canvas.height / 2;
      var radius4 = m;
      canvasCtx.lineWidth = 2.1;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx3, cy3, radius4, 0, 2 * Math.PI);
      canvasCtx.stroke(); //hexagon
      // let side = 0;
      // let size = radius;
      // let q = canvas.width/3;
      // let j = canvas.height/3;
      // canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      // canvasCtx.beginPath();
      // canvasCtx.moveTo(q + size * Math.cos(0), j + size * Math.sin(0));
      // for (side; side < 7; side++) {
      //   canvasCtx.lineTo(q + size * Math.cos(side * 2 * Math.PI / 6), j + size * Math.sin(side * 2 * Math.PI / 6));
      // }
      // canvasCtx.fillStyle = "white opacity .2";
      // canvasCtx.fill();
    }

    draw();
  } // analyser.getByteFrequencyData(dataArray);
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


  BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  };

  function finishedLoading(bufferList) {
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    var source3 = context.createBufferSource();
    var source4 = context.createBufferSource();
    source1.connect(analyser);
    source2.connect(analyser2);
    source3.connect(analyser3);
    source4.connect(analyser4);
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[0];
    source3.buffer = bufferList[0];
    source4.buffer = bufferList[0];
    source1.connect(context.destination);
    source2.connect(context.destination);
    source3.connect(context.destination);
    source4.connect(context.destination);
    source1.start(0);
    source2.start(0);
    source3.start(0);
    source4.start(0);
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
// ==============================
 // import setupVisuals from './audiovisuals.js';

 // import blackhole from './blackhole';

document.addEventListener('DOMContentLoaded', function () {
  Object(_audiovisualization__WEBPACK_IMPORTED_MODULE_0__["default"])(); // blackhole();

  var canvas = document.getElementById('analyser-render');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var context = canvas.getContext('2d'); // setupVisuals();

  Object(_background_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map