export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
}

export interface GameState {
  stage: 'timer' | 'quiz' | 'game1' | 'game2' | 'story';
  quizAttempts: number;
  retryTimeLeft: number;
  isBlocked: boolean;
  quizAnswers: Record<number, string>;
  compatibilityAnswers: Record<number, string>;
}
