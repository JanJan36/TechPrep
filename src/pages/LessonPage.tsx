import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { getLesson } from "@/data/lessonContents";
import { competencies } from "@/data/competencies";
import { ArrowLeft, Clock, Zap, BookOpen } from "lucide-react";
import { AnimatedDiagram, getAnimationForTopic } from "@/components/lesson/AnimatedDiagram";
import { LessonTextCard, LessonCalloutCard, LessonListCard } from "@/components/lesson/LessonSectionCard";
import LessonNavigation from "@/components/lesson/LessonNavigation";
import LessonQuiz from "@/components/lesson/LessonQuiz";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Groups lesson sections into pages.
 * Each "text" section that starts with "## " begins a new page.
 * The first group collects everything before the first ## heading.
 */
function groupSectionsIntoPages(sections: ReturnType<typeof getLesson>["sections"]) {
  const pages: (typeof sections)[] = [];
  let current: typeof sections = [];

  for (const section of sections) {
    if (
      section.type === "text" &&
      section.content?.startsWith("## ") &&
      current.length > 0
    ) {
      pages.push(current);
      current = [section];
    } else {
      current.push(section);
    }
  }
  if (current.length > 0) pages.push(current);

  // Ensure at least 2 pages for good UX
  if (pages.length === 1 && pages[0].length > 2) {
    const mid = Math.ceil(pages[0].length / 2);
    const first = pages[0].slice(0, mid);
    const second = pages[0].slice(mid);
    return [first, second];
  }

  return pages;
}

const LessonPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const lesson = topicId ? getLesson(topicId) : null;

  const [currentPage, setCurrentPage] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const parentComp = competencies.find((c) => c.topics.some((t) => t.id === topicId));

  const pages = useMemo(() => {
    if (!lesson) return [];
    return groupSectionsIntoPages(lesson.sections);
  }, [lesson]);

  const totalPages = pages.length;
  const hasAnimation = topicId ? !!getAnimationForTopic(topicId) : false;

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pb-24 text-center animate-fade-in">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="font-display text-xl font-bold text-foreground">Lesson Coming Soon</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">This lesson content is being prepared. Check back soon!</p>
        <button onClick={() => navigate("/learn")} className="mt-6 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          Back to Learn
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (quizStarted) {
    return (
      <div className="pb-24">
        <section className="px-4 py-4">
          <div className="mx-auto max-w-3xl">
            <button onClick={() => setQuizStarted(false)} className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Lesson
            </button>
            <h1 className="font-display text-xl font-bold text-foreground">{lesson.title} — Quiz</h1>
            {/* Full progress bar */}
            <div className="mt-3 h-1.5 rounded-full bg-accent overflow-hidden" />
          </div>
        </section>
        <LessonQuiz questions={lesson.quiz} xpReward={lesson.xpReward} />
      </div>
    );
  }

  const currentSections = pages[currentPage] || [];

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <button onClick={() => navigate("/learn")} className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Learn
          </button>
          {parentComp && (
            <p className="text-xs text-muted-foreground mb-1">{parentComp.title}</p>
          )}
          <h1 className="font-display text-xl font-bold text-foreground">{lesson.title}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Section {currentPage + 1} of {totalPages}
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {lesson.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1 text-warning font-semibold">
              <Zap className="h-3.5 w-3.5" />
              +{lesson.xpReward} XP
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full rounded-full bg-accent"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            {/* Show animation on the first page */}
            {currentPage === 0 && hasAnimation && topicId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <AnimatedDiagram topicId={topicId} />
              </motion.div>
            )}

            {/* Render sections for current page */}
            {currentSections.map((section, i) => {
              if (section.type === "text") {
                return <LessonTextCard key={i} content={section.content!} index={i} />;
              }
              if (section.type === "callout") {
                return (
                  <LessonCalloutCard
                    key={i}
                    content={section.content!}
                    variant={section.variant}
                    index={i}
                  />
                );
              }
              if (section.type === "list") {
                return <LessonListCard key={i} items={section.items!} index={i} />;
              }
              return null;
            })}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <LessonNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onStartQuiz={handleStartQuiz}
          isLastPage={currentPage === totalPages - 1}
        />
      </div>
    </div>
  );
};

export default LessonPage;
