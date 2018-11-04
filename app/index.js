/**
 * Application entry point
 */

// Load application styles

// ================================
// START YOUR APP HERE
// ==============================

import setupAudio from './audiovisualization';
// import setupVisuals from './audiovisuals.js';
import setupBackground from './background.js';
// import blackhole from './blackhole';

document.addEventListener('DOMContentLoaded', () => {
  setupAudio();
  // blackhole();

  const canvas = document.getElementById('analyser-render');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext('2d');
  // setupVisuals();
  setupBackground();
}); 
