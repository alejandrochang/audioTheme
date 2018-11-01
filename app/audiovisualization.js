// loads the buffer
const setupAudio = () => {

  function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  // logic for the buffering of music
  BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function (buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function (error) {
          console.error('decodeAudioData error', error);
        }
      );
    }

    request.onerror = function () {
      alert('BufferLoader: XHR error');
    }

    request.send();
  }

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}
// Abstracting the Web Audio API

  window.onload = init;
  var context;
  var bufferLoader;

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  const analyser = context.createAnalyser();
  const analyser2 = context.createAnalyser();

  function init() {
    bufferLoader = new BufferLoader(
      context,
      [
        // './assets/music/sundaycandy.mp3',
        // './assets/music/staytogether.mp3',
        './assets/music/randomaccessmemories.mp3',
      ],
      finishedLoading
    );

    bufferLoader.load();
    
   

    analyser.fftSize = 4096/2;
    // analyser2.fftSize = 360;

    var bufferLength = analyser.frequencyBinCount;
    var bufferLength2 = analyser.frequencyBinCount;
    // console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);
    var dataArray2 = new Uint8Array(bufferLength);
    console.log(dataArray);
    analyser.getByteTimeDomainData(dataArray);
    // console.log(dataArray);

    // analyser.getByteTimeDomainData(dataArray);

    const canvas = document.getElementById("analyser-render");
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 2;
    const canvasCtx = canvas.getContext("2d");
    
    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    function draw() {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.lineWidth = 1.85;
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
      
      // canvasCtx.lineTo(canvas.width, canvas.height/2);
      // canvasCtx.strokeStyle = "rgb(0, 0, 0)"
      canvasCtx.stroke();

      // circle canvas

      // find the center of the window
      const center_x = canvas.width / 2;
      const center_y = canvas.height / 2;
      const radius = 150;

      //draw a circle
      canvasCtx.beginPath();
      canvasCtx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
      canvasCtx.stroke();

    }
    draw();
  }



    // function draw();

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
    for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
  }

  function finishedLoading(bufferList) {
    var source1 = context.createBufferSource();
    source1.connect(analyser);
    source1.buffer = bufferList[0];
    source1.connect(context.destination);
    source1.start(0);
  } 

}

export default setupAudio;
