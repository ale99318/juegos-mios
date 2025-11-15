
import React from 'react';

interface MainMenuProps {
  onPlay: () => void;
  onInstructions: () => void;
  onCredits: () => void;
}

const NeonButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`w-4/5 max-w-xs px-6 py-4 bg-black border-2 border-[#A020F0] text-white text-2xl rounded-lg shadow-[0_0_15px_#A020F0] hover:bg-[#A020F0] hover:shadow-[0_0_25px_#A020F0] transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

const MainMenu: React.FC<MainMenuProps> = ({ onPlay, onInstructions, onCredits }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#200020] p-4 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-2" style={{ textShadow: '0 0 10px #A020F0' }}>
        Suga Rescue
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12" style={{ textShadow: '0 0 10px #A020F0' }}>
        Quest 💜
      </h2>
      <div className="flex flex-col items-center space-y-6 w-full">
        <NeonButton onClick={onPlay}>Jugar</NeonButton>
        <NeonButton onClick={onInstructions}>Instrucciones</NeonButton>
        <NeonButton onClick={onCredits}>Créditos</NeonButton>
      </div>
    </div>
  );
};

export default MainMenu;
