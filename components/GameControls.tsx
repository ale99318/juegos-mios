
import React from 'react';

interface GameControlsProps {
  onMoveLeft: (active: boolean) => void;
  onMoveRight: (active: boolean) => void;
  onJump: () => void;
}

const ControlButton: React.FC<{ onTouchStart: () => void; onTouchEnd: () => void; children: React.ReactNode, className?: string }> = ({ onTouchStart, onTouchEnd, children, className }) => {
  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onTouchStart}
      onMouseUp={onTouchEnd}
      onMouseLeave={onTouchEnd}
      className={`w-20 h-20 bg-black/50 border-2 border-[#A020F0] rounded-full flex items-center justify-center text-white text-4xl shadow-[0_0_10px_#A020F0] active:bg-[#A020F0] select-none ${className}`}
    >
      {children}
    </div>
  );
};

const GameControls: React.FC<GameControlsProps> = ({ onMoveLeft, onMoveRight, onJump }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-32 p-4 flex justify-between items-center z-50">
      <div className="flex gap-4">
        <ControlButton onTouchStart={() => onMoveLeft(true)} onTouchEnd={() => onMoveLeft(false)}>
          &larr;
        </ControlButton>
        <ControlButton onTouchStart={() => onMoveRight(true)} onTouchEnd={() => onMoveRight(false)}>
          &rarr;
        </ControlButton>
      </div>
      <div
         onTouchStart={onJump}
         onMouseDown={onJump}
         className="w-28 h-28 bg-black/50 border-4 border-[#A020F0] rounded-full flex items-center justify-center text-white text-xl font-bold uppercase shadow-[0_0_15px_#A020F0] active:bg-[#A020F0] select-none"
      >
        Jump
      </div>
    </div>
  );
};

export default GameControls;
