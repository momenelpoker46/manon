import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Game1Props {
  onComplete: () => void;
}

const Game1: React.FC<Game1Props> = ({ onComplete }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);

  const handleNoClick = () => {
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (showMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-3xl p-8 text-center max-w-md w-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            كنت عارف انك لسة بتحبيني ❤️ 
          </h2>
          <p className="text-xl text-gray-600">
            يلا بينا علي المرحلة التانية
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-3xl p-8 text-center max-w-md w-full relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          دلوقتي انا عايز اتأكد انك لسة بتحبيني
        </h2>
        
        <p className="text-xl text-gray-700 mb-8">
          متأكدة انك بتحبيني وعايزاني لسة؟
        </p>

        <div className="space-y-4 relative">
          <motion.button
            onClick={handleYesClick}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            اه متأكدة
          </motion.button>

          <motion.button
            onClick={handleNoClick}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`
            }}
            animate={{
              x: noButtonPosition.x,
              y: noButtonPosition.y
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            whileHover={{ scale: 1.05 }}
          >
            لا مش متأكدة
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Game1;
