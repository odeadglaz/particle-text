import { canvas, context } from './constants';
import * as painter from './painter';
import { Particle } from './Particle';
import { setMousePosition, addParticles, particles } from './state';
import './style.css';

canvas.addEventListener('mousemove', (event) => {
  setMousePosition(event);
});

const draw = () => {
  painter.wipe();

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    const restOfPartciles = particles.slice(index + 1, particles.length - 1);

    particle.connect(restOfPartciles);
  });

  requestAnimationFrame(draw);
};

const init = () => {
  const coordinates = painter.textCoordinates('A');
  addParticles(coordinates);
  draw();
};

init();
