import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cable, RotateCcw, Trophy, CheckCircle2, XCircle, Star } from "lucide-react";
import { saveHighScore, getHighScore } from "@/hooks/useGameScores";

const cableData = [
  { cable: "Cat5e", use: "Ethernet networking up to 1 Gbps", wrong: ["Connecting monitors", "Power supply"] },
  { cable: "Cat6", use: "Ethernet networking up to 10 Gbps", wrong: ["Audio connections", "Printer parallel port"] },
  { cable: "Coaxial", use: "Cable TV and older network connections", wrong: ["USB peripherals", "Power delivery"] },
  { cable: "Fiber Optic", use: "High-speed long-distance data transmission", wrong: ["Keyboard connection", "Analog audio"] },
  { cable: "HDMI", use: "Digital video and audio to displays", wrong: ["Network connectivity", "Power charging"] },
  { cable: "DisplayPort", use: "High-res video output to monitors", wrong: ["Internet access", "Serial communication"] },
  { cable: "USB-A to USB-B", use: "Connecting printers and scanners", wrong: ["Video output", "Network patching"] },
  { cable: "USB-C", use: "Universal data, video, and power delivery", wrong: ["Coaxial TV signal", "Telephone line"] },
  { cable: "SATA", use: "Connecting internal drives to motherboard", wrong: ["External monitor", "Wi-Fi antenna"] },
  { cable: "Molex", use: "Legacy internal power connector", wrong: ["Ethernet networking", "Display output"] },
  { cable: "RJ11", use: "Telephone and DSL connections", wrong: ["Video output", "SATA drives"] },
  { cable: "VGA", use: "Analog video output to older monitors", wrong: ["Network patching", "Power delivery"] },
];

const CableMatchGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "done">("ready");
  const [questions, setQuestions] = useState<typeof cableData>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = useCallback(() => {
    const shuffled = [...cableData].sort(() => Math.random() - 0.5).slice(0, 8);
    setQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameState("playing");
  }, []);

  const current = questions[currentIdx];

  const options = current
    ? [current.use, ...current.wrong].sort(() => Math.random() - 0.5)
    : [];

  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setGameState("done");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);
    if (option === current.use) setScore((s) => s + 1);
    setTimeout(handleNext, 1200);
  };

  // Shuffle options when question changes
  useState(() => {
    if (current) {
      setShuffledOptions([current.use, ...current.wrong].sort(() => Math.random() - 0.5));
    }
  });

  // Re-shuffle when currentIdx changes
  const getOptions = () => {
    if (!current) return [];
    // Deterministic shuffle based on index
    const opts = [current.use, ...current.wrong];
    return opts.sort((a, b) => a.localeCompare(b));
  };

  if (gameState === "ready") {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Cable className="h-8 w-8 text-accent" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Cable Match</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Match each cable type to its correct use. 8 questions — how many can you get right?
        </p>
        <button onClick={startGame} className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95">
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const { isNewBest } = saveHighScore({ gameId: "cable-match", score, total: questions.length, percentage: pct });
    const prev = getHighScore("cable-match");
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-warning/10">
          <Trophy className="h-10 w-10 text-warning" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {pct >= 80 ? "Excellent! 🎉" : pct >= 50 ? "Good Job! 👍" : "Keep Practicing! 💪"}
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
        {pct >= 60 && <p className="mt-2 text-sm font-semibold text-warning">+20 XP earned!</p>}
        <button onClick={startGame} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <RotateCcw className="h-4 w-4" /> Play Again
        </button>
      </div>
    );
  }

  const opts = getOptions();

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">Question {currentIdx + 1}/{questions.length}</span>
        <span className="text-sm font-bold text-primary">{score} correct</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted mb-6 overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs text-muted-foreground mb-1">What is this cable used for?</p>
          <h3 className="font-display text-2xl font-bold text-foreground mb-6">{current.cable}</h3>
          <div className="space-y-2.5">
            {opts.map((opt) => {
              const isCorrect = opt === current.use;
              const isSelected = opt === selected;
              let cls = "border-border bg-secondary/30 hover:bg-secondary/60 cursor-pointer";
              if (showResult && isSelected && isCorrect) cls = "border-accent bg-accent/10 text-accent";
              else if (showResult && isSelected && !isCorrect) cls = "border-destructive bg-destructive/10 text-destructive";
              else if (showResult && isCorrect) cls = "border-accent/50 bg-accent/5";
              else if (showResult) cls = "border-border bg-secondary/20 opacity-50 cursor-default";
              return (
                <button key={opt} onClick={() => handleSelect(opt)} disabled={showResult} className={`w-full text-left rounded-xl border p-3.5 text-sm transition-all flex items-center gap-3 ${cls}`}>
                  {showResult && isSelected && isCorrect && <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                  {showResult && !isSelected && isCorrect && <CheckCircle2 className="h-4 w-4 text-accent/50 shrink-0" />}
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CableMatchGame;
