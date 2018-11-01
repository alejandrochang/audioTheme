
const setupVisuals = () => {
  // set to the size of device
  const canvas = document.getElementById('analyser-render');
  canvas.width = window.innerWidth - 2;
  canvas.height = window.innerHeight - 2;
  const ctx = canvas.getContext("2d");

  // find the center of the window
  const center_x = canvas.width / 2;
  const center_y = canvas.height / 2;
  const radius = 150;

  //draw a circle
  ctx.beginPath();
  ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
  ctx.stroke();

  //bars 
  // const bars = 200;
  // bar_width = 2;

  // for (var i = 0; i < bars; i++) {
  //   //divide a circle into equal parts
  //   rads = Math.PI * 2 / bars;
  //   bar_height = 100;
  //   bar_width = 2;
  //   x = center_x + Math.cos(rads * i) * (radius);
  //   y = center_y + Math.sin(rads * i) * (radius);
  //   x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
  //   y_end = center_y + Math.sin(rads * i) * (radius + bar_height);
  //   //draw a bar
  //   drawBar(x, y, x_end, y_end, bar_width);
  // }

  // Visualization with Web Audio API

  
}

export default setupVisuals;
