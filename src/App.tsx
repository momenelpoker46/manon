import React, { useState, useEffect } from 'react';
import TimerPage from './components/TimerPage';
import QuizPage from './components/QuizPage';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import StoryPage from './components/StoryPage';
import { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    stage: 'timer', // Changed back to 'timer' to show the countdown
    quizAttempts: 1,
    retryTimeLeft: 0,
    isBlocked: false,
    quizAnswers: {},
    compatibilityAnswers: {}
  });

  // For testing purposes, you can start from any stage by changing the stage above:
  // 'timer' - Timer countdown page
  // 'quiz' - Entry quiz page
  // 'game1' - Love confirmation game
  // 'game2' - Compatibility test
  // 'story' - Final story page

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.retryTimeLeft > 0) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          retryTimeLeft: Math.max(0, prev.retryTimeLeft - 1)
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameState.retryTimeLeft]);

  const handleTimerComplete = () => {
    setGameState(prev => ({ ...prev, stage: 'quiz' }));
  };

  const handleQuizComplete = () => {
    setGameState(prev => ({ ...prev, stage: 'game1' }));
  };

  const handleQuizFailed = () => {
    if (gameState.quizAttempts >= 3) {
      setGameState(prev => ({ ...prev, isBlocked: true }));
    } else {
      const retryTime = gameState.quizAttempts === 1 ? 30 : 300; // 30 seconds or 5 minutes
      setGameState(prev => ({
        ...prev,
        quizAttempts: prev.quizAttempts + 1,
        retryTimeLeft: retryTime
      }));
    }
  };

  const handleGame1Complete = () => {
    setGameState(prev => ({ ...prev, stage: 'game2' }));
  };

  const handleGame2Complete = () => {
    setGameState(prev => ({ ...prev, stage: 'story' }));
  };

  const renderCurrentStage = () => {
    switch (gameState.stage) {
      case 'timer':
        return <TimerPage onTimerComplete={handleTimerComplete} />;
      case 'quiz':
        return (
          <QuizPage
            onQuizComplete={handleQuizComplete}
            attempts={gameState.quizAttempts}
            onAttemptFailed={handleQuizFailed}
            retryTimeLeft={gameState.retryTimeLeft}
            isBlocked={gameState.isBlocked}
          />
        );
      case 'game1':
        return <Game1 onComplete={handleGame1Complete} />;
      case 'game2':
        return <Game2 onComplete={handleGame2Complete} />;
      case 'story':
        return <StoryPage />;
      default:
        return <TimerPage onTimerComplete={handleTimerComplete} />;
    }
  };

  return (
    <div className="font-cairo">
      {renderCurrentStage()}
    </div>
  );
}

export default App;
