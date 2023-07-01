const setupAudio = () => {
  //Music Genres
  const rootPath = './assets/music/';
  const hiphop = [
    `${rootPath}sundaycandy.mp3`,`${rootPath}babyblue.mp3`,
    `${rootPath}tuesday.mp3`,`${rootPath}tuscanleather.mp3`,
    `${rootPath}comebacktoearth.mp3`,`${rootPath}january28.mp3`,
    `${rootPath}anziety.mp3`,`${rootPath}2009.mp3`,
    `${rootPath}allido.mp3`,`${rootPath}everydayshelter.mp3`,
    `${rootPath}slowjamz.mp3`,`${rootPath}girlsthatdance.mp3`,
    `${rootPath}happy.mp3`,`${rootPath}heavenonlyknows.mp3`,
    `${rootPath}ladders.mp3`,`${rootPath}soho.mp3`
  ];
  const house = [
    `${rootPath}randomaccessmemories.mp3`,`${rootPath}igotu.mp3`,
    `${rootPath}comingover.mp3`,`${rootPath}firestone.mp3`,
    `${rootPath}tenniscourt.mp3`,`${rootPath}redlights.mp3`,
    `${rootPath}sleepless.mp3`,`${rootPath}stayhigh.mp3`,
    `${rootPath}tomorrowland.mp3`, `${rootPath}espoir.mp3`,
    `${rootPath}sunandmoon.mp3`,`${rootPath}hothands.mp3`
  ];
  const randb = [
    `${rootPath}thinkingaboutyou.mp3`, `${rootPath}doyou.mp3`,
    `${rootPath}openyoureyes.mp3`, `${rootPath}getyou.mp3`,
    `${rootPath}bananaclip.mp3`, `${rootPath}loveseason.mp3`,
    `${rootPath}sofartogo.mp3`
  ];
  const onehitwonders = [`${rootPath}staytogether.mp3`, `${rootPath}dancinginthemoonlight.mp3`, `${rootPath}icanthelpmyself.mp3`, `${rootPath}september.mp3`, `${rootPath}bluesky.mp3`, `${rootPath}caroline.mp3`, `${rootPath}cagylove.mp3`, `${rootPath}iwyouback.mp3`, `${rootPath}hookedonfeeling.mp3`];
  const classical = [`${rootPath}thewayyoulooktonight.mp3`, `${rootPath}youngandbeautiful.mp3`,];
  const alternative = [`${rootPath}outofmyleague.mp3`, `${rootPath}allthesethingsthativedone.mp3`,];
  const study = [`${rootPath}lofi2.mp3`];

  const randomizeSong = (genre) => Math.floor(Math.random() * genre.length);
  let randomHipHop = Math.floor(Math.random() * hiphop.length);

  const songs = {
    'hiphop': [hiphop[randomizeSong(hiphop)]],
    'house': [house[randomizeSong(house)]],
    'randb': [randb[randomizeSong(randb)]],
    'onehit': [onehitwonders[randomizeSong(onehitwonders)]],
    'classical': [classical[randomizeSong(classical)]],
    'study': [study[randomizeSong(study)]],
    'alternative-rock': [alternative[randomizeSong(alternative)]],
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

  document.getElementById("button-play").addEventListener("click", () => {
    context.resume().then(() => {
      console.log("Playback resumed successfully");
    });
  });

    let audio, playbtn, mutebtn, pausebtn, volumeSlider;
      function initAudioPlayer() {
        
        audio = new Audio();
        audio.crossOrigin = "anonymous";
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
