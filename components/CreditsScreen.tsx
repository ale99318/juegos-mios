
import React from 'react';

interface CreditsScreenProps {
  onBack: () => void;
}

const CreditsScreen: React.FC<CreditsScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#200020] p-6 text-white text-center">
      <h1 className="text-4xl font-bold mb-8" style={{ textShadow: '0 0 10px #A020F0' }}>Créditos</h1>
      <div className="text-lg space-y-4 max-w-md">
        <p>Juego diseñado y desarrollado con 💜.</p>
        <p className="mt-8 font-bold text-xl text-purple-300">Dedicatoria Especial:</p>
        <p className="italic">Para Min Yoongi (Suga), con la esperanza de que siempre encuentres tu camino a través de cualquier obstáculo.</p>
        <p>I Purple You 💜</p>
      </div>
      <button
        onClick={onBack}
        className="mt-12 px-8 py-3 bg-black border-2 border-[#A020F0] text-white text-xl rounded-lg shadow-[0_0_15px_#A020F0] hover:bg-[#A020F0] transition-all duration-300"
      >
        Volver
      </button>
    </div>
  );
};

export default CreditsScreen;
