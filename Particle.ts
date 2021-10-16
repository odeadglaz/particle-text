import { INTERACTION_RADIUS } from './constants';
import * as painter from './painter';
import { mouse, hue } from './state';

export interface Position {
  x: number;
  y: number;
}

export class Particle {
  size: number;
  private position: Position;
  private readonly basePosition;
  private interacting: boolean;
  private density: number;
  private color: string;
  private baseHue: number;

  constructor(position: Position) {
    this.position = position; // Initial position by current mouse
    this.basePosition = { ...position };
    this.density = Math.random() * 15 + 1;
    this.size = 3;
    this.baseHue = hue;
  }

  update() {
    const { x, y } = this.position;

    const dx = x - mouse.x;
    const dy = y - mouse.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // Movment towards mouse point
    const movmentX = dx / distance;
    const movmentY = dy / distance;

    // Gravitatio around mouse point further they are, faster they are pulled
    const gravitation = (INTERACTION_RADIUS - distance) / INTERACTION_RADIUS;

    // The momvment multiplier to add to a given partical once in interaction range.
    const momvmentMultiplier = this.density * gravitation;

    if (distance < INTERACTION_RADIUS) {
      this.position.x += movmentX * momvmentMultiplier;
      this.position.y += movmentY * momvmentMultiplier;
      this.interacting = true;
    } else {
      // Oposite movment towards base point
      this.moveToBasePosition();
      this.interacting = false;
    }

    const relativeOpacityRatio = INTERACTION_RADIUS / distance;
    const opacity = 50 + Math.min(relativeOpacityRatio * 5, 50);
    //
    this.color = `hsl(${this.baseHue}, ${opacity}%, ${
      this.interacting ? 50 : 100
    }%)`;
  }

  moveToBasePosition() {
    const { x, y } = this.position;

    const dx = x - this.basePosition.x;
    const dy = y - this.basePosition.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) {
      return;
    }

    if (x != this.basePosition.x) {
      const movmentX = Math.abs(dx) > 1 ? dx / 20 : dx;
      this.position.x -= movmentX;
    }

    if (y != this.basePosition.y) {
      const movmentY = Math.abs(dy) > 1 ? dy / 20 : dy;
      this.position.y -= movmentY;
    }
  }

  draw() {
    painter.circle(this.position, {
      size: this.size,
      color: this.color,
    });
  }

  connect(otherPartciles: Particle[]) {
    const connectDistance = 25;

    otherPartciles.forEach((other: Particle) => {
      const otherPosition = other.position;

      const dx = this.position.x - otherPosition.x;
      const dy = this.position.y - otherPosition.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectDistance) {
        painter.line(this.position, other.position, {
          color: this.color,
          size: 0.4,
        });
      }
    });
  }
}
