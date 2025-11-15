
import React from 'react';

interface InstructionsScreenProps {
  onBack: () => void;
}

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#200020] p-6 text-white text-center">
      <h1 className="text-4xl font-bold mb-8" style={{ textShadow: '0 0 10px #A020F0' }}>Instrucciones</h1>
      <div className="text-left text-lg space-y-4 max-w-md">
        <p>🏃‍♂️ Usa los botones de flecha en la parte inferior para moverte a la izquierda y a la derecha.</p>
        <p>🚀 Usa el botón grande de salto para saltar sobre obstáculos y enemigos.</p>
        <p>🪙 Recoge las monedas moradas para aumentar tu puntaje.</p>
        <p>💔 Evita los pinchos y los enemigos. Tienes 3 vidas.</p>
        <p>🎯 ¡Llega al final del nivel para rescatar a Suga!</p>
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

export default InstructionsScreen;
