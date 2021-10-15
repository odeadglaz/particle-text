import { canvas, context } from './constants';
import { Position } from './Particle';

export const wipe = () => context.clearRect(0, 0, canvas.width, canvas.height);

export const wipeToFade = () => {
  context.fillStyle = 'rgba(0, 0, 0, 0.1)';
  context.fillRect(0, 0, canvas.width, canvas.height);
};

export const circle = (point, { size = 10, color = 'white' }) => {
  context.beginPath();
  context.arc(point.x, point.y, size, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
  context.closePath();
};

export const line = (
  from: Position,
  to: Position,
  { color = 'white', size = 12 }
) => {
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
  context.strokeStyle = color;
  context.lineWidth = size;
  context.closePath();
};

export const textCoordinates = (text = 'A') => {
  let coordinates = [];
  const positionAdjustement = 20;
  const positionMultiplier = 10;
  const drawingArea = {
    width: 100,
    height: 100,
  };
  // Opacity is represented inside a clamped array, 255 is 1, so 128 marks ~50%
  const minPixelOpacity = 128;

  // Stylinng
  context.fillStyle = 'white';
  context.font = '24px Verdana';
  context.fillText(text, 0, 30);

  // The Uint8ClampedArray
  const imageData = context.getImageData(
    0,
    0,
    drawingArea.width,
    drawingArea.height
  );

  // Iterate over data grid, 100x100
  // Each pixel represented in rgba ( 4 items inside the array )
  const opacityRepresentationIndex = 3;

  for (
    let y = 0, yOpacityIndex = 0;
    y < drawingArea.height;
    y++, yOpacityIndex += 4
  ) {
    for (
      let x = 0, xOpacityIndex = 0;
      x < drawingArea.width;
      x++, xOpacityIndex += 4
    ) {
      // The current pixel opacity index representationn
      const opacityIndex =
        drawingArea.height * yOpacityIndex +
        xOpacityIndex +
        opacityRepresentationIndex;

      // The current pixel opacity value
      const pixelOpacity = imageData.data[opacityIndex];

      // If not transparent, adds coordinate
      if (pixelOpacity > minPixelOpacity) {
        coordinates.push({
          x: x * positionMultiplier + positionAdjustement,
          y: y * positionMultiplier + positionAdjustement,
        });
      }
    }
  }
  return coordinates;
};
