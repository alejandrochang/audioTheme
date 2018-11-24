import setupAudio from './audiovisualization';
import setupBackground from './background.js';

document.addEventListener('DOMContentLoaded', () => {
  setupAudio();

  const canvas = document.getElementById('analyser-render');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  setupBackground();
}); 
