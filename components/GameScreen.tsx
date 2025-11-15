import React, { useReducer, useEffect, useRef, useCallback } from 'react';
import { WorldState, PlayerState, GameObject, Vector2D } from '../types';
import {
  GRAVITY,
  PLAYER_JUMP_FORCE,
  PLAYER_SPEED,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  LEVEL_DATA,
  LEVEL_WIDTH,
  SCREEN_WIDTH,
  GROUND_LEVEL,
} from '../constants';
import GameControls from './GameControls';

type GameAction =
  | { type: 'TICK' }
  | { type: 'MOVE'; direction: 'left' | 'right' | 'stop' }
  | { type: 'JUMP' };

const initialPlayerState: PlayerState = {
  position: { x: 50, y: GROUND_LEVEL - PLAYER_HEIGHT },
  velocity: { x: 0, y: 0 },
  size: { x: PLAYER_WIDTH, y: PLAYER_HEIGHT },
  isGrounded: false,
};

const initialWorldState: WorldState = {
  player: initialPlayerState,
  levelObjects: LEVEL_DATA.map(o => ({...o})), // Make a copy to prevent mutation
  score: 0,
  lives: 3,
  coins: 0,
  cameraX: 0,
  hasWon: false,
};

const gameReducer = (state: WorldState, action: GameAction): WorldState => {
    switch (action.type) {
        case 'TICK': {
            let { player, levelObjects, score, lives, coins, hasWon } = state;

            if (hasWon) return state;

            // --- Player Movement ---
            let newVel = { ...player.velocity };
            newVel.y += GRAVITY;
            let newPos = {
                x: player.position.x + newVel.x,
                y: player.position.y + newVel.y,
            };

            // World bounds
            if (newPos.x < 0) newPos.x = 0;
            if (newPos.x + player.size.x > LEVEL_WIDTH) newPos.x = LEVEL_WIDTH - player.size.x;
            if (newPos.y > LEVEL_WIDTH) { // Fell out of world
                return { ...initialWorldState, lives: lives - 1, score, coins, levelObjects: LEVEL_DATA.map(o => ({...o})) };
            }

            let isGrounded = false;

            // --- Collision Detection ---
            const playerRect = { ...newPos, width: player.size.x, height: player.size.y };

            for (const obj of levelObjects) {
                if (obj.type === 'platform') {
                    const platformRect = { ...obj.position, width: obj.size.x, height: obj.size.y };
                    // Check vertical collision (landing on platform)
                    if (
                        player.position.y + player.size.y <= obj.position.y &&
                        newPos.y + player.size.y >= obj.position.y &&
                        newPos.x + player.size.x > obj.position.x &&
                        newPos.x < obj.position.x + obj.size.x
                    ) {
                        newVel.y = 0;
                        newPos.y = obj.position.y - player.size.y;
                        isGrounded = true;
                    }
                }
            }

            // Object Interaction
            let newLevelObjects = [...levelObjects];
            const collectedCoins: number[] = [];
            
            for (const obj of newLevelObjects) {
                 const objRect = { x: obj.position.x, y: obj.position.y, width: obj.size.x, height: obj.size.y };
                 if (playerRect.x < objRect.x + objRect.width &&
                    playerRect.x + playerRect.width > objRect.x &&
                    playerRect.y < objRect.y + objRect.height &&
                    playerRect.height + playerRect.y > objRect.y)
                {
                    if (obj.type === 'coin') {
                        if (!collectedCoins.includes(obj.id)) {
                             collectedCoins.push(obj.id);
                             score += 100;
                             coins += 1;
                        }
                    } else if (obj.type === 'spike' || obj.type === 'enemy') {
                         return { ...initialWorldState, lives: lives - 1, score, coins, levelObjects: LEVEL_DATA.map(o => ({...o})) };
                    } else if (obj.type === 'goal') {
                         hasWon = true;
                    }
                }
            }
             
            if (collectedCoins.length > 0) {
                 newLevelObjects = newLevelObjects.filter(obj => !(obj.type === 'coin' && collectedCoins.includes(obj.id)));
            }

            // --- Update State ---
            return {
                ...state,
                player: { ...player, position: newPos, velocity: newVel, isGrounded },
                levelObjects: newLevelObjects,
                score,
                coins,
                hasWon,
                cameraX: Math.max(0, Math.min(player.position.x - SCREEN_WIDTH / 2, LEVEL_WIDTH - SCREEN_WIDTH)),
            };
        }
        case 'MOVE': {
            let newVelX = 0;
            if (action.direction === 'left') newVelX = -PLAYER_SPEED;
            if (action.direction === 'right') newVelX = PLAYER_SPEED;
            return { ...state, player: { ...state.player, velocity: { ...state.player.velocity, x: newVelX } } };
        }
        case 'JUMP': {
            if (state.player.isGrounded) {
                return { ...state, player: { ...state.player, velocity: { ...state.player.velocity, y: PLAYER_JUMP_FORCE } } };
            }
            return state;
        }
        default:
            return state;
    }
};

interface GameScreenProps {
  onGameOver: () => void;
  onVictory: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver, onVictory }) => {
  const [world, dispatch] = useReducer(gameReducer, initialWorldState);
  const moveState = useRef({ left: false, right: false });

  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000 / 60);
    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    if (world.lives <= 0) {
      onGameOver();
    }
  }, [world.lives, onGameOver]);

  useEffect(() => {
      if (world.hasWon) {
          onVictory();
      }
  }, [world.hasWon, onVictory]);

  const handleMove = useCallback((direction: 'left' | 'right', active: boolean) => {
    moveState.current[direction] = active;
    if (moveState.current.left) {
      dispatch({ type: 'MOVE', direction: 'left' });
    } else if (moveState.current.right) {
      dispatch({ type: 'MOVE', direction: 'right' });
    } else {
      dispatch({ type: 'MOVE', direction: 'stop' });
    }
  }, []);

  const handleJump = useCallback(() => {
    dispatch({ type: 'JUMP' });
  }, []);

  const renderObject = (obj: GameObject) => {
    const commonStyle = {
      position: 'absolute' as const,
      left: obj.position.x,
      top: obj.position.y,
      width: obj.size.x,
      height: obj.size.y,
    };

    switch (obj.type) {
      case 'platform':
        return <div key={obj.id} style={commonStyle} className="bg-gradient-to-b from-purple-500 to-purple-800 border-2 border-purple-300" />;
      case 'coin':
        return <div key={obj.id} style={commonStyle} className="bg-yellow-400 rounded-full border-2 border-white shadow-[0_0_10px_#A020F0]" >
          <div className="w-full h-full flex items-center justify-center text-purple-900 font-bold">P</div>
        </div>;
      case 'spike':
        return <div key={obj.id} style={{ ...commonStyle, clipPath: 'polygon(50% 0, 0 100%, 100% 100%)'}} className="bg-gray-400" />;
      case 'enemy':
        return <div key={obj.id} style={commonStyle} className="bg-red-500 rounded-sm" />;
      case 'goal':
        return (
          <div key={obj.id} style={commonStyle} className="flex flex-col items-center justify-center">
             <img src="https://s3.getstickerpack.com/storage/uploads/sticker-pack/chibi-bts-yoongi/sticker_16.png" alt="Suga" className="w-full h-full object-contain" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-[#2d004f] overflow-hidden relative">
      {/* HUD */}
      <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between text-white text-2xl" style={{ textShadow: '0 0 5px #A020F0' }}>
        <div>Vidas: {'💜'.repeat(world.lives)}</div>
        <div>Score: {world.score}</div>
      </div>
      
      {/* Game World */}
      <div style={{ transform: `translateX(-${world.cameraX}px)`, transition: 'transform 0.1s linear' }} className="absolute top-0 left-0 w-full h-full">
        {/* Player */}
        <div style={{
          position: 'absolute',
          left: world.player.position.x,
          top: world.player.position.y,
          width: world.player.size.x,
          height: world.player.size.y,
          backgroundColor: '#E6E6FA', // Light lavender
          border: '2px solid #A020F0',
        }} />

        {/* Level Objects */}
        {world.levelObjects.map(renderObject)}
      </div>

      <GameControls
        onMoveLeft={(active) => handleMove('left', active)}
        onMoveRight={(active) => handleMove('right', active)}
        onJump={handleJump}
      />
    </div>
  );
};

export default GameScreen;