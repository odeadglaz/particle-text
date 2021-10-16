import { Particle } from './Particle';

export const particles: Particle[] = [];

export let hue = 0;

export const mouse = {
  x: 0,
  y: 0,
};

export const increaseHue = () => (hue += 0.5);
export const setMousePosition = ({ x, y }) => Object.assign(mouse, { x, y });
export const addParticle = (coordinate) => {
  const particle = new Particle({
    x: coordinate.x,
    y: coordinate.y,
  });

  particles.push(particle);
};
