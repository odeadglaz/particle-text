import { canvas } from './constants';
import * as painter from './painter';
import { setMousePosition, setAllowInteraction, addParticle, particles, increaseHue } from './state';
import './style.css';

let idleTimer: number;

canvas.addEventListener('mousemove', (event) => {
  setMousePosition(event);
  setAllowInteraction();
  idleTimer && clearTimeout(idleTimer);

  idleTimer = setTimeout(
    () => setAllowInteraction(false),
    1500
  )
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
  const coordinates = painter.textCoordinates('Hey');
  coordinates.forEach((coordinate) => {
    addParticle(coordinate);
    increaseHue();
  });
  draw();
};

init();
