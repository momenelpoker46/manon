import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { compatibilityQuestions } from '../data/questions';

interface Game2Props {
  onComplete: () => void;
}

const Game2: React.FC<Game2Props> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [compatibilityQuestions[currentQuestion].id]: answer
    }));

    if (currentQuestion < compatibilityQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getCompatibilityResult = () => {
    let correctAnswers = 0;
    compatibilityQuestions.forEach(q => {
      if (answers[q.id] === q.myAnswer) {
        correctAnswers++;
      }
    });

    if (correctAnswers >= 2) {
      return 'شوفتي كنت متأكد اننا لبعض ❤️';
    } else {
      return 'مش مهم، المهم اني بحبك زي ما انتي ❤️';
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-3xl p-8 text-center max-w-md w-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            نتيجة اختبار التوافق
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            {getCompatibilityResult()}
          </p>
          <motion.button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            متابعة ❤️
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-4">
      <div className="max-w-2xl mx-auto pt-16">
        <motion.div 
          className="bg-white rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              اختبار التوافق
            </h1>
            <p className="text-gray-600 mb-4">
              دلوقتي انتي هيظهرلك مجموعة من الاسئلة، انتي هتجاوبي عليها وانا مجاوب بالفعل ونشوف نسبة توافقنا قد ايه 😅
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / compatibilityQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {compatibilityQuestions[currentQuestion].question}
            </h2>
            
            {compatibilityQuestions[currentQuestion].hint && (
              <p className="text-gray-600 text-center mb-6 italic">
                {compatibilityQuestions[currentQuestion].hint}
              </p>
            )}
            
            <div className="space-y-3">
              {compatibilityQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 text-right bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-gray-800 font-medium">{option}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Game2;
