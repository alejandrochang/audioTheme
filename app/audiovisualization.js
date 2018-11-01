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

  function init() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    const analyser = context.createAnalyser();


    bufferLoader = new BufferLoader(
      context,
      [
        // './assets/music/sundaycandy.mp3',
        // './assets/music/staytogether.mp3',
      ],
      finishedLoading
    );

    bufferLoader.load();

    setupAnalyser(analyser);
  }

  function setupAnalyser(context, analyser, bufferLoader) {
    const source = context.createMediaStreamSource(bufferLoader)
    // source.connect(analyser);
    // analyser.connect(distortion);
    // distortion.connect(context.destination);

    // analyser.fftSize = 2048;
    // var bufferLength = analyser.frequencyBinCount;
    // var dataArray = new Uint8Array(bufferLength);

    // analyser.getByteTimeDomainData(dataArray);
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
  } 

  BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
  }
  
  function finishedLoading(bufferList) {
    // Create two sources and play them both together.
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];
  
    source1.connect(context.destination);
    source2.connect(context.destination);
    source1.start(0);
    source2.start(0);
  }  
  // manipulating the volume
  
  var VolumeSample = {
  };
  
  // Gain node needs to be mutated by volume control.
  // VolumeSample.gainNode = null;
  
  // VolumeSample.play = function () {
  //   if (!context.createGain)
  //     context.createGain = context.createGainNode;
  //   this.gainNode = context.createGain();
  //   var source = context.createBufferSource();
  //   source.buffer = BUFFERS.techno;
  
  //   // Connect source to a gain node
  //   source.connect(this.gainNode);
  //   // Connect gain node to destination
  //   this.gainNode.connect(context.destination);
  //   // Start playback in a loop
  //   source.loop = true;
  //   if (!source.start)
  //     source.start = source.noteOn;
  //   source.start(0);
  //   this.source = source;
  // };
  
  // VolumeSample.changeVolume = function (element) {
  //   var volume = element.value;
  //   var fraction = parseInt(element.value) / parseInt(element.max);
  //   // Let's use an x*x curve (x-squared) since simple linear (x) does not
  //   // sound as good.
  //   this.gainNode.gain.value = fraction * fraction;
  // };
  
  // VolumeSample.stop = function () {
  //   if (!this.source.stop)
  //     this.source.stop = source.noteOff;
  //   this.source.stop(0);
  // };
  
  // VolumeSample.toggle = function () {
  //   this.playing ? this.stop() : this.play();
  //   this.playing = !this.playing;
  // };
  
  // end of volume 
}

export default setupAudio;
