export const canvas: HTMLCanvasElement = document.getElementById(
  'board'
) as HTMLCanvasElement;

export const context = canvas.getContext('2d');

export const INTERACTION_RADIUS = 70;
