import { canvas } from './constants';
import { Particle } from './Particle';

export const particles: Particle[] = [];

export let hue = 0;

export const mouse = {
  x: 0,
  y: 0,
};

export const increaseHue = () => (hue += 2);
export const setMousePosition = ({ x, y }) => Object.assign(mouse, { x, y });
export const addParticles = (coordinates) =>
  coordinates.forEach((coordinate) =>
    particles.push(
      new Particle({
        x: coordinate.x,
        y: coordinate.y,
      })
    )
  );
