import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { quizQuestions } from '../data/questions';

interface QuizPageProps {
  onQuizComplete: () => void;
  attempts: number;
  onAttemptFailed: () => void;
  retryTimeLeft: number;
  isBlocked: boolean;
}

const QuizPage: React.FC<QuizPageProps> = ({ 
  onQuizComplete, 
  attempts, 
  onAttemptFailed, 
  retryTimeLeft,
  isBlocked 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: answer
    }));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const checkAnswers = () => {
    const isCorrect = quizQuestions.every(q => answers[q.id] === q.correctAnswer);
    
    if (isCorrect) {
      onQuizComplete();
    } else {
      onAttemptFailed();
      setCurrentQuestion(0);
      setAnswers({});
      setShowResult(false);
    }
  };

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(checkAnswers, 1000);
      return () => clearTimeout(timer);
    }
  }, [showResult]);

  if (isBlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-3xl p-8 text-center max-w-md w-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">تم حظرك نهائياً</h2>
          <p className="text-gray-600">
            لقد تجاوزت عدد المحاولات المسموحة. لا يمكنك الدخول مرة أخرى.
          </p>
        </motion.div>
      </div>
    );
  }

  if (retryTimeLeft > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-3xl p-8 text-center max-w-md w-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            المحاولة رقم {attempts}
          </h2>
          <p className="text-gray-600 mb-4">
            يجب الانتظار قبل المحاولة مرة أخرى
          </p>
          <div className="text-3xl font-bold text-orange-500">
            {Math.floor(retryTimeLeft / 60)}:{(retryTimeLeft % 60).toString().padStart(2, '0')}
          </div>
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              اختبار الدخول
            </h1>
            <p className="text-gray-600">
              المحاولة رقم {attempts} من 3
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {showResult ? (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-xl text-gray-700">جاري التحقق من الإجابات...</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                {quizQuestions[currentQuestion].question}
              </h2>
              
              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
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
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
