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
  const analyser3 = context.createAnalyser();
  const analyser4 = context.createAnalyser();


  function init() {
    bufferLoader = new BufferLoader(
      context,
      [
        // './assets/music/sundaycandy.mp3',
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
        './assets/music/youngandbeautiful.mp3',
        // './assets/music/doyou.mp3',
        // './assets/music/allido.mp3',
        // './assets/music/allthesethingsthativedone.mp3',
        // './assets/music/tuesday.mp3',
        // './assets/music/everydayshelter.mp3',
        // './assets/music/happy.mp3',
        // './assets/music/heavenonlyknows.mp3',
        // './assets/music/icanthelpmyself.mp3',
        // './assets/music/tenniscourt.mp3',
        // './assets/music/openyoureyes.mp3',
        // './assets/music/redlights.mp3',
        // './assets/music/sleepless.mp3',
        // './assets/music/slowjamz.mp3',
        // './assets/music/stayhigh.mp3',
        // './assets/music/tomorrowland.mp3',
        // './assets/music/tuscanleather.mp3',
        // './assets/music/comebacktoearth.mp3',
        // './assets/music/january28.mp3',
        // './assets/music/september.mp3',
        // './assets/music/sunandmoon.mp3',
        // './assets/music/espoir.mp3',
        // './assets/music/hothands.mp3',
        // './assets/music/2009.mp3',
        // './assets/music/getyou.mp3',
        // './assets/music/anziety.mp3',
        // './assets/music/girlsthatdance.mp3',
        // './assets/music/bananaclip.mp3',
      ],
      finishedLoading
    );

    bufferLoader.load();
    
   
    // audio analyzers
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

      for (let i = 0; i < bufferLength2; i++) {
        var z = dataArray2[i];
        var y = dataArray[i];
        var w = dataArray3[i];
        var m = dataArray4[i];
      }
      // circle canvas

      // find the center of the window
      const center_x = canvas.width / 2;
      const center_y = canvas.height / 2;
      const radius = z;
      canvasCtx.lineWidth = 2.3;
      canvasCtx.strokeStyle = "rgb(" + 0 + "," + r() + "," + 0 + ")";
      
      //circle
      canvasCtx.beginPath();
      canvasCtx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
      canvasCtx.stroke();

      //second circle
      const cx = (canvas.width / 2);
      const cy = (canvas.height / 2);
      let radius2 = y;
      canvasCtx.lineWidth = 2.3;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx, cy, radius2, 0, 2 * Math.PI);
      canvasCtx.stroke();

      //third circle
      const cx2 = canvas.width / 2;
      const cy2 = canvas.height / 2;
      let radius3 = w;
      canvasCtx.lineWidth = 2.2;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx2, cy2, radius3, 0, 2 * Math.PI);
      canvasCtx.stroke();

      //fourth circle
      const cx3 = canvas.width / 2;
      const cy3 = canvas.height / 2;
      let radius4 = m;
      canvasCtx.lineWidth = 2.1;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx3, cy3, radius4, 0, 2 * Math.PI);
      canvasCtx.stroke();

      //hexagon
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
  }


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

  BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
  }

  function finishedLoading(bufferList) {
    var source1 = context.createBufferSource();
    var source2= context.createBufferSource();
    var source3= context.createBufferSource();
    var source4= context.createBufferSource();
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

}

export default setupAudio;
