export enum GameState {
  MainMenu,
  Playing,
  GameOver,
  Victory,
  Instructions,
  Credits,
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface GameObject {
  id: number;
  position: Vector2D;
  size: Vector2D;
  type: 'platform' | 'coin' | 'spike' | 'enemy' | 'goal';
}

export interface PlayerState {
  position: Vector2D;
  velocity: Vector2D;
  size: Vector2D;
  isGrounded: boolean;
}

export interface WorldState {
  player: PlayerState;
  levelObjects: GameObject[];
  score: number;
  lives: number;
  coins: number;
  cameraX: number;
  hasWon: boolean;
}