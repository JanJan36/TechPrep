import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Binary, RotateCcw, Trophy, Timer, Star } from "lucide-react";
import { saveHighScore, getHighScore } from "@/hooks/useGameScores";

type Question = { prompt: string; answer: string; hint: string };

const generateQuestions = (): Question[] => {
  const qs: Question[] = [];
  // Decimal to Binary
  for (let i = 0; i < 4; i++) {
    const n = Math.floor(Math.random() * 240) + 1;
    qs.push({ prompt: `Convert ${n} to binary`, answer: n.toString(2), hint: "Decimal → Binary" });
  }
  // Binary to Decimal
  for (let i = 0; i < 3; i++) {
    const n = Math.floor(Math.random() * 240) + 1;
    qs.push({ prompt: `Convert ${n.toString(2)} to decimal`, answer: n.toString(), hint: "Binary → Decimal" });
  }
  // Subnet-related
  const subnets = [
    { prompt: "How many hosts in a /24 network?", answer: "254", hint: "Subnetting" },
    { prompt: "How many hosts in a /28 network?", answer: "14", hint: "Subnetting" },
    { prompt: "What is the subnet mask for /16?", answer: "255.255.0.0", hint: "Subnetting" },
    { prompt: "Convert 255 to binary", answer: "11111111", hint: "Decimal → Binary" },
    { prompt: "How many bits in a byte?", answer: "8", hint: "Fundamentals" },
  ];
  qs.push(...subnets.sort(() => Math.random() - 0.5).slice(0, 3));
  return qs.sort(() => Math.random() - 0.5).slice(0, 10);
};

const GAME_DURATION = 90;

const BinaryQuizGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "done">("ready");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startGame = useCallback(() => {
    setQuestions(generateQuestions());
    setCurrentIdx(0);
    setInput("");
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setFeedback(null);
    setGameState("playing");
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) { setGameState("done"); return; }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [gameState, timeLeft]);

  const current = questions[currentIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!current || feedback) return;
    const isCorrect = input.trim().toLowerCase() === current.answer.toLowerCase();
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);
    setTimeout(() => {
      if (currentIdx + 1 >= questions.length) {
        setGameState("done");
      } else {
        setCurrentIdx((i) => i + 1);
        setInput("");
        setFeedback(null);
        inputRef.current?.focus();
      }
    }, 800);
  };

  if (gameState === "ready") {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/10">
          <Binary className="h-8 w-8 text-warning" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Binary & Subnetting Quiz</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Convert between binary and decimal, solve subnetting questions. 10 questions, {GAME_DURATION}s time limit!
        </p>
        <button onClick={startGame} className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95">
          Start Quiz
        </button>
      </div>
    );
  }

  if (gameState === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const { isNewBest } = saveHighScore({ gameId: "binary-quiz", score, total: questions.length, percentage: pct });
    const prev = getHighScore("binary-quiz");
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-warning/10">
          <Trophy className="h-10 w-10 text-warning" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {pct >= 80 ? "Binary Master! 🧠" : pct >= 50 ? "Solid Work! 💻" : "Keep Practicing! 📖"}
        </h2>
        <p className="mt-2 text-lg font-bold text-primary">{score}/{questions.length} correct ({pct}%)</p>
        {isNewBest && (
          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-warning">
            <Star className="h-4 w-4 fill-warning" /> New Personal Best!
          </motion.p>
        )}
        {!isNewBest && prev && (
          <p className="mt-1 text-xs text-muted-foreground">Best: {prev.percentage}%</p>
        )}
        {pct >= 60 && <p className="mt-2 text-sm font-semibold text-warning">+30 XP earned!</p>}
        <button onClick={startGame} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <RotateCcw className="h-4 w-4" /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Timer className={`h-4 w-4 ${timeLeft <= 15 ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
          <span className={`text-lg font-bold font-mono ${timeLeft <= 15 ? "text-destructive" : "text-foreground"}`}>{timeLeft}s</span>
        </div>
        <span className="text-sm text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
        <span className="text-sm font-bold text-primary">{score} correct</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted mb-6 overflow-hidden">
        <motion.div animate={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }} className={`h-full rounded-full ${timeLeft <= 15 ? "bg-destructive" : "bg-primary"}`} />
      </div>

      <motion.div key={currentIdx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6">
        <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground mb-3">{current.hint}</span>
        <h3 className="font-display text-xl font-bold text-foreground mb-6">{current.prompt}</h3>
        <form onSubmit={handleSubmit}>
          <div className={`flex items-center gap-2 rounded-lg border p-3 font-mono text-sm transition-colors ${
            feedback === "correct" ? "border-accent bg-accent/10" : feedback === "wrong" ? "border-destructive bg-destructive/10" : "border-border bg-secondary/50"
          }`}>
            <span className="text-accent shrink-0">›</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40"
              placeholder="Type your answer..."
              autoComplete="off"
              spellCheck={false}
              disabled={!!feedback}
            />
          </div>
          {feedback === "wrong" && (
            <p className="mt-2 text-xs text-destructive">Answer: <span className="font-mono font-bold">{current.answer}</span></p>
          )}
          <button type="submit" disabled={!input.trim() || !!feedback} className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-all">
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BinaryQuizGame;
