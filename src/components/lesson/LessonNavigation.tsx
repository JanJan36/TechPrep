import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface LessonNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onStartQuiz: () => void;
  isLastPage: boolean;
}

const LessonNavigation = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onStartQuiz,
  isLastPage,
}: LessonNavigationProps) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={onPrevious}
        disabled={currentPage === 0}
        className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {/* Dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === currentPage ? 24 : 8,
              backgroundColor: i === currentPage
                ? "hsl(var(--primary))"
                : i < currentPage
                  ? "hsl(var(--accent))"
                  : "hsl(var(--muted))",
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>

      {isLastPage ? (
        <button
          onClick={onStartQuiz}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95"
        >
          Start Quiz
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default LessonNavigation;
