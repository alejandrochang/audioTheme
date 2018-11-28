const setupAudio = () => {
  //Music Genres
  const hiphop = ["./assets/music/sundaycandy.mp3", "./assets/music/babyblue.mp3", "./assets/music/tuesday.mp3", "./assets/music/tuscanleather.mp3", "./assets/music/comebacktoearth.mp3", "./assets/music/january28.mp3", "./assets/music/anziety.mp3", "./assets/music/2009.mp3", "./assets/music/allido.mp3",
    "./assets/music/everydayshelter.mp3", './assets/music/slowjamz.mp3', './assets/music/girlsthatdance.mp3', './assets/music/happy.mp3',
    './assets/music/heavenonlyknows.mp3', './assets/music/ladders.mp3', './assets/music/soho.mp3'];
  const house = ['./assets/music/randomaccessmemories.mp3', './assets/music/igotu.mp3', './assets/music/comingover.mp3', './assets/music/firestone.mp3', './assets/music/tenniscourt.mp3', './assets/music/redlights.mp3',
    './assets/music/sleepless.mp3', './assets/music/stayhigh.mp3', './assets/music/tomorrowland.mp3', './assets/music/espoir.mp3', './assets/music/sunandmoon.mp3',
    './assets/music/hothands.mp3',];
  const randb = ['./assets/music/thinkingaboutyou.mp3', './assets/music/doyou.mp3', './assets/music/openyoureyes.mp3', './assets/music/getyou.mp3',
    './assets/music/bananaclip.mp3', './assets/music/loveseason.mp3', './assets/music/sofartogo.mp3'];
  const onehitwonders = ['./assets/music/staytogether.mp3', './assets/music/dancinginthemoonlight.mp3', './assets/music/icanthelpmyself.mp3', './assets/music/september.mp3'];
  const classical = ['./assets/music/thewayyoulooktonight.mp3', './assets/music/youngandbeautiful.mp3',];
  const study = ["./assets/music/lofi2.mp3"];
  const alternative = ["./assets/music/outofmyleague.mp3", './assets/music/allthesethingsthativedone.mp3',];

  let randomHipHop = Math.floor(Math.random() * hiphop.length);
  let randomHouse = Math.floor(Math.random() * house.length);
  let randomRandb = Math.floor(Math.random() * randb.length);
  let oneHitWonders = Math.floor(Math.random() * onehitwonders.length);
  let classicalMusic = Math.floor(Math.random() * classical.length);
  let alternativeMusic = Math.floor(Math.random() * alternative.length);
  let studyRand = Math.floor(Math.random() * study.length);

  const songs = {
    'hiphop': [hiphop[randomHipHop]],
    'house': [house[randomHouse]],
    'randb': [randb[randomRandb]],
    'onehit': [onehitwonders[oneHitWonders]],
    'classical': [classical[classicalMusic]],
    'study': [study[studyRand]],
    'alternative-rock': [alternative[alternativeMusic]],
  }

  window.onload = start;
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  const analyser = context.createAnalyser();
  const analyser2 = context.createAnalyser();
  const analyser3 = context.createAnalyser();
  const analyser4 = context.createAnalyser();

  function start() {
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

      // circle canvas (all circles)
      const center_x = canvas.width / 2;
      const center_y = canvas.height / 2;
      const radius = z;
      canvasCtx.lineWidth = 2.3;
      canvasCtx.strokeStyle = "rgb(" + 0 + "," + r() + "," + 0 + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
      canvasCtx.stroke();

      const cx = (canvas.width / 2);
      const cy = (canvas.height / 2);
      let radius2 = y;
      canvasCtx.lineWidth = 2.3;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx, cy, radius2, 0, 2 * Math.PI);
      canvasCtx.stroke();

      const cx2 = canvas.width / 2;
      const cy2 = canvas.height / 2;
      let radius3 = w;
      canvasCtx.lineWidth = 2.2;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx2, cy2, radius3, 0, 2 * Math.PI);
      canvasCtx.stroke();

      const cx3 = canvas.width / 2;
      const cy3 = canvas.height / 2;
      let radius4 = m;
      canvasCtx.lineWidth = 2.1;
      canvasCtx.strokeStyle = "rgb(" + r() + "," + r() + "," + r() + ")";
      canvasCtx.beginPath();
      canvasCtx.arc(cx3, cy3, radius4, 0, 2 * Math.PI);
      canvasCtx.stroke();

    }
    draw();
  }

    let audio, playbtn, mutebtn, pausebtn, volumeSlider;
      function initAudioPlayer() {
        audio = new Audio();
        audio.src = hiphop[randomHipHop];
        audio.play();

        const changeGenre = (song) => { console.log(song); audio.src = songs[song]}
        let gdropdown = document.getElementById('genre-dropdown');
        gdropdown.addEventListener('change', ( {target: { value }}) =>  changeGenre(value));

        playbtn = document.getElementById('button-play');
        mutebtn = document.getElementById('mute-button');
        pausebtn = document.getElementById('pause-button');

        volumeSlider = document.getElementById('volume-slider');
        let changeVolume = function () { audio.volume = this.value / 100; };
        volumeSlider.addEventListener('change', changeVolume);
        volumeSlider.addEventListener('input', changeVolume);

        playbtn.addEventListener("click", play);
        mutebtn.addEventListener("click", mute);
        pausebtn.addEventListener("click", pause);

        function play() {
          if (audio.paused) {
            audio.play();
          };
        }

        function pause() {
          if (!audio.paused) {
            audio.pause();
          };
        }

        function mute() {
          if (audio.muted) {
            audio.muted = false;
          } else {
            audio.muted = true;
          }
        }
        var source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
      }
    window.addEventListener("load", initAudioPlayer);
}

export default setupAudio;
