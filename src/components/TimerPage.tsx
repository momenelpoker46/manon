import React from 'react';
import Countdown from 'react-countdown';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface TimerPageProps {
  onTimerComplete: () => void;
}

const TimerPage: React.FC<TimerPageProps> = ({ onTimerComplete }) => {
  const targetDate = new Date('2025-10-01T00:00:00+03:00'); // October 1, 2025 at 12:00 AM Cairo daylight saving time (UTC+3)

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      onTimerComplete();
      return null;
    }

    return (
      <motion.div 
        className="text-white text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-4xl md:text-6xl font-bold">{days}</div>
            <div className="text-lg md:text-xl">يوم</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-4xl md:text-6xl font-bold">{hours}</div>
            <div className="text-lg md:text-xl">ساعة</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-4xl md:text-6xl font-bold">{minutes}</div>
            <div className="text-lg md:text-xl">دقيقة</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-4xl md:text-6xl font-bold">{seconds}</div>
            <div className="text-lg md:text-xl">ثانية</div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen sunset-bg flower-overlay romantic-pattern flex items-center justify-center p-4 relative">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Heart className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-12"
        >
          <motion.div 
            className="heart-float"
            whileHover={{ scale: 1.1 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-white fill-white/80" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            الي اميرتي وكل ما املك
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
            العد التنازلي للحظة المميزة
          </p>
        </motion.div>

        <Countdown date={targetDate} renderer={renderer} />

        <motion.p 
          className="text-white/80 text-lg mt-8 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          انتظري مني شيء مميز ❤️
        </motion.p>
      </div>
    </div>
  );
};

export default TimerPage;
