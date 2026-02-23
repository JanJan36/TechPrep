import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/data/lessonContents";

interface LessonQuizProps {
  questions: QuizQuestion[];
  xpReward: number;
}

const LessonQuiz = ({ questions, xpReward }: LessonQuizProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestion = questions[currentQ];

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === quizQuestion.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((c) => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectCount(0);
    setQuizFinished(false);
  };

  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= 70;

  if (quizFinished) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center animate-fade-in">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${passed ? "bg-accent/10" : "bg-destructive/10"}`}
        >
          {passed ? <CheckCircle2 className="h-10 w-10 text-accent" /> : <XCircle className="h-10 w-10 text-destructive" />}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl font-bold text-foreground"
        >
          {passed ? "Great job! 🎉" : "Keep practicing!"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-muted-foreground"
        >
          You scored {correctCount}/{questions.length} ({score}%)
        </motion.p>
        {passed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-1 text-sm font-semibold text-warning"
          >
            +{xpReward} XP earned!
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {!passed && (
            <button
              onClick={handleRetry}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95"
            >
              Retry Quiz
            </button>
          )}
          <Link
            to="/learn"
            className="rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-all hover:scale-105 active:scale-95"
          >
            Back to Lessons
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {currentQ + 1}/{questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            {quizQuestion.question}
          </h2>

          <div className="space-y-2.5">
            {quizQuestion.options.map((opt, idx) => {
              let optStyle = "border-border bg-card hover:bg-secondary cursor-pointer";
              if (showExplanation) {
                if (idx === quizQuestion.correctIndex) optStyle = "border-accent bg-accent/10";
                else if (idx === selectedAnswer) optStyle = "border-destructive bg-destructive/10";
                else optStyle = "border-border bg-card opacity-50";
              }
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => handleAnswer(idx)}
                  disabled={showExplanation}
                  className={`w-full flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all duration-300 ${optStyle}`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-foreground">{opt}</span>
                  {showExplanation && idx === quizQuestion.correctIndex && (
                    <CheckCircle2 className="h-5 w-5 text-accent ml-auto shrink-0" />
                  )}
                  {showExplanation && idx === selectedAnswer && idx !== quizQuestion.correctIndex && (
                    <XCircle className="h-5 w-5 text-destructive ml-auto shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-info/30 bg-info/5 p-4"
            >
              <p className="text-sm text-foreground">
                <strong className="text-info">Explanation:</strong> {quizQuestion.explanation}
              </p>
            </motion.div>
          )}

          {showExplanation && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {currentQ + 1 < questions.length ? "Next Question" : "See Results"}
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LessonQuiz;
