import { GameObject } from './types';

export const SCREEN_WIDTH = 400;
export const SCREEN_HEIGHT = 800;

export const GRAVITY = 0.5;
export const PLAYER_JUMP_FORCE = -12;
export const PLAYER_SPEED = 5;
export const PLAYER_WIDTH = 30;
export const PLAYER_HEIGHT = 40;

export const LEVEL_WIDTH = 3000;
export const LEVEL_HEIGHT = 800;
export const GROUND_LEVEL = 750;

export const LEVEL_DATA: GameObject[] = [
  // Starting platform
  { id: 1, type: 'platform', position: { x: 0, y: GROUND_LEVEL }, size: { x: 500, y: 50 } },
  { id: 100, type: 'coin', position: { x: 200, y: GROUND_LEVEL - 80 }, size: { x: 25, y: 25 } },
  { id: 101, type: 'coin', position: { x: 240, y: GROUND_LEVEL - 80 }, size: { x: 25, y: 25 } },

  // First gap
  { id: 2, type: 'platform', position: { x: 600, y: GROUND_LEVEL }, size: { x: 300, y: 50 } },
  { id: 200, type: 'spike', position: { x: 650, y: GROUND_LEVEL - 20 }, size: { x: 20, y: 20 } },
  
  // Floating platforms
  { id: 3, type: 'platform', position: { x: 950, y: GROUND_LEVEL - 100 }, size: { x: 150, y: 30 } },
  { id: 102, type: 'coin', position: { x: 1000, y: GROUND_LEVEL - 150 }, size: { x: 25, y: 25 } },
  { id: 4, type: 'platform', position: { x: 1200, y: GROUND_LEVEL - 200 }, size: { x: 150, y: 30 } },

  // Section with enemies
  { id: 5, type: 'platform', position: { x: 1400, y: GROUND_LEVEL }, size: { x: 600, y: 50 } },
  { id: 300, type: 'enemy', position: { x: 1500, y: GROUND_LEVEL - 30 }, size: { x: 30, y: 30 } },
  { id: 103, type: 'coin', position: { x: 1600, y: GROUND_LEVEL - 250 }, size: { x: 25, y: 25 } },
  { id: 104, type: 'coin', position: { x: 1640, y: GROUND_LEVEL - 250 }, size: { x: 25, y: 25 } },
  { id: 105, type: 'coin', position: { x: 1680, y: GROUND_LEVEL - 250 }, size: { x: 25, y: 25 } },
  { id: 6, type: 'platform', position: { x: 1600, y: GROUND_LEVEL - 200 }, size: { x: 120, y: 30 } },

  // Spike pit
  { id: 201, type: 'spike', position: { x: 2050, y: GROUND_LEVEL - 20 }, size: { x: 20, y: 20 } },
  { id: 202, type: 'spike', position: { x: 2090, y: GROUND_LEVEL - 20 }, size: { x: 20, y: 20 } },
  { id: 203, type: 'spike', position: { x: 2130, y: GROUND_LEVEL - 20 }, size: { x: 20, y: 20 } },

  // Final stretch
  { id: 7, type: 'platform', position: { x: 2200, y: GROUND_LEVEL }, size: { x: 800, y: 50 } },
  { id: 106, type: 'coin', position: { x: 2300, y: GROUND_LEVEL - 80 }, size: { x: 25, y: 25 } },
  { id: 107, type: 'coin', position: { x: 2340, y: GROUND_LEVEL - 80 }, size: { x: 25, y: 25 } },
  { id: 108, type: 'coin', position: { x: 2380, y: GROUND_LEVEL - 80 }, size: { x: 25, y: 25 } },

  // Goal
  { id: 999, type: 'goal', position: { x: 2900, y: GROUND_LEVEL - 80 }, size: { x: 80, y: 80 } }
];