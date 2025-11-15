import React, { useState, useCallback } from 'react';
import GameScreen from './components/GameScreen';
import MainMenu from './components/MainMenu';
import InstructionsScreen from './components/InstructionsScreen';
import CreditsScreen from './components/CreditsScreen';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MainMenu);

  const startGame = useCallback(() => setGameState(GameState.Playing), []);
  const showMainMenu = useCallback(() => setGameState(GameState.MainMenu), []);
  const showInstructions = useCallback(() => setGameState(GameState.Instructions), []);
  const showCredits = useCallback(() => setGameState(GameState.Credits), []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return <GameScreen onGameOver={() => setGameState(GameState.GameOver)} onVictory={() => setGameState(GameState.Victory)} />;
      case GameState.GameOver:
        return (
           <div className="w-full h-full flex flex-col justify-center items-center text-white bg-gradient-to-b from-black to-[#200020] p-4 text-center">
                <h1 className="text-5xl font-bold mb-4" style={{ textShadow: '0 0 10px #A020F0' }}>Game Over</h1>
                <button
                    onClick={startGame}
                    className="mt-4 px-8 py-4 bg-black border-2 border-[#A020F0] text-white text-2xl rounded-lg shadow-[0_0_15px_#A020F0] hover:bg-[#A020F0] transition-all duration-300"
                >
                    Try Again
                </button>
                 <button
                    onClick={showMainMenu}
                    className="mt-4 px-8 py-2 bg-transparent border-2 border-[#A020F0] text-white text-lg rounded-lg shadow-[0_0_10px_#A020F0] hover:bg-[#A020F0] transition-all duration-300"
                >
                    Main Menu
                </button>
            </div>
        );
      case GameState.Victory:
        return (
            <div className="w-full h-full flex flex-col justify-center items-center text-white bg-gradient-to-b from-black to-[#430075] p-4 text-center">
                <h1 className="text-4xl font-bold mb-4" style={{ textShadow: '0 0 10px #A020F0' }}>¡Has rescatado a Suga!</h1>
                <img src="https://s3.getstickerpack.com/storage/uploads/sticker-pack/chibi-bts-yoongi/sticker_16.png" alt="Suga Rescued" className="w-48 h-48 object-contain my-4 drop-shadow-[0_0_10px_#A020F0]" />
                <button
                    onClick={startGame}
                    className="mt-4 px-8 py-4 bg-black border-2 border-[#A020F0] text-white text-2xl rounded-lg shadow-[0_0_15px_#A020F0] hover:bg-[#A020F0] transition-all duration-300"
                >
                    Play Again
                </button>
                <button
                    onClick={showMainMenu}
                    className="mt-4 px-8 py-2 bg-transparent border-2 border-[#A020F0] text-white text-lg rounded-lg shadow-[0_0_10px_#A020F0] hover:bg-[#A020F0] transition-all duration-300"
                >
                    Main Menu
                </button>
            </div>
        );
      case GameState.Instructions:
        return <InstructionsScreen onBack={showMainMenu} />;
      case GameState.Credits:
        return <CreditsScreen onBack={showMainMenu} />;
      case GameState.MainMenu:
      default:
        return <MainMenu onPlay={startGame} onInstructions={showInstructions} onCredits={showCredits} />;
    }
  };

  return (
    <div className="h-full w-full bg-black overflow-hidden flex justify-center items-center">
      <div className="relative w-full h-full sm:w-[400px] sm:h-[800px] sm:border-4 sm:border-purple-500 sm:rounded-2xl overflow-hidden shadow-[0_0_20px_#A020F0]">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;