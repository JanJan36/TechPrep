import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2, XCircle, ArrowRight, Trophy, Star, ShieldCheck } from "lucide-react";
import { saveHighScore, getHighScore } from "@/hooks/useGameScores";

const safetyQuestions = [
  { question: "Before opening a PC case, what should you always do first?", answer: "Disconnect the power cable and press the power button to discharge", wrong: ["Put on safety goggles", "Turn the monitor off"] },
  { question: "What is the primary purpose of an ESD wrist strap?", answer: "Prevent static electricity from damaging components", wrong: ["Protect against electric shock", "Ground the motherboard"] },
  { question: "How should you handle a RAM stick?", answer: "Hold it by the edges, avoiding the gold contacts", wrong: ["Grip it firmly in the center", "Wear rubber gloves and hold anywhere"] },
  { question: "What should you do if you smell burning from inside a PC?", answer: "Immediately power off and unplug, then investigate", wrong: ["Open the case to find the source while running", "Ignore it if the PC still works"] },
  { question: "What's the correct way to clean dust from a PC?", answer: "Use compressed air in short bursts, holding fans still", wrong: ["Use a vacuum cleaner inside the case", "Blow hard with your mouth"] },
  { question: "Why should you never open a CRT monitor?", answer: "CRTs can hold lethal voltage even when unplugged", wrong: ["The glass might break", "It voids the warranty"] },
  { question: "What's the safe way to dispose of a swollen laptop battery?", answer: "Take it to a certified e-waste recycling center", wrong: ["Throw it in regular trash", "Puncture it to release the gas"] },
  { question: "When replacing a PSU, what safety step is essential?", answer: "Ensure it's unplugged and capacitors are discharged", wrong: ["Wear sunglasses for sparks", "Only turn off the switch"] },
  { question: "What fire extinguisher type is safe for electrical fires?", answer: "Class C (CO2 or dry chemical)", wrong: ["Class A (water-based)", "Class B (foam)"] },
  { question: "Why should you document cable connections before disassembly?", answer: "To ensure correct reassembly and avoid misconnections", wrong: ["For warranty claims only", "It's only needed for servers"] },
  { question: "What PPE is recommended when handling toner cartridges?", answer: "Dust mask and gloves to avoid inhaling fine particles", wrong: ["Safety helmet", "Steel-toed boots"] },
  { question: "How should you lift a heavy server or UPS?", answer: "Bend at the knees, keep back straight, use a buddy system", wrong: ["Bend at the waist for leverage", "Drag it across the floor"] },
];

const SafetyFirstGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "done">("ready");
  const [questions, setQuestions] = useState<typeof safetyQuestions>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const startGame = useCallback(() => {
    const shuffled = [...safetyQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameState("playing");
  }, []);

  const current = questions[currentIdx];

  useEffect(() => {
    if (current) {
      setShuffledOptions([current.answer, ...current.wrong].sort(() => Math.random() - 0.5));
    }
  }, [currentIdx, current?.question]);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === current.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setGameState("done");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  if (gameState === "ready") {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/10">
          <ShieldCheck className="h-8 w-8 text-warning" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Safety First!</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Answer 10 workplace safety and ESD prevention questions. A real technician always puts safety first!
        </p>
        <button onClick={startGame} className="mt-6 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const { isNewBest } = saveHighScore({ gameId: "safety-first", score, total: questions.length, percentage: pct });
    const prev = getHighScore("safety-first");
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-warning/10">
          <Trophy className="h-10 w-10 text-warning" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">{pct >= 70 ? "Safety pro! 🛡️" : "Review safety protocols!"}</h2>
        <p className="mt-2 text-muted-foreground">You answered {score}/{questions.length} correctly ({pct}%)</p>
        {isNewBest && (
          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-warning">
            <Star className="h-4 w-4 fill-warning" /> New Personal Best!
          </motion.p>
        )}
        {!isNewBest && prev && <p className="mt-1 text-xs text-muted-foreground">Best: {prev.percentage}%</p>}
        {pct >= 70 && <p className="mt-1 text-sm font-semibold text-warning">+25 XP earned!</p>}
        <button onClick={startGame} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
          <RotateCcw className="h-4 w-4" /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
          <motion.div animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} className="h-full rounded-full bg-warning" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
        <span className="text-xs font-bold text-warning">{score}✓</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
          <div className="mb-6 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <ShieldCheck className="h-6 w-6 text-warning mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">{current.question}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {shuffledOptions.map((opt, idx) => {
              let style = "border-border bg-card hover:bg-secondary cursor-pointer";
              if (showResult) {
                if (opt === current.answer) style = "border-accent bg-accent/10";
                else if (opt === selected) style = "border-destructive bg-destructive/10";
                else style = "border-border bg-card opacity-40";
              }
              return (
                <motion.button key={opt} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => handleSelect(opt)} disabled={!!selected} className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${style}`}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold shrink-0">{String.fromCharCode(65 + idx)}</span>
                  <span className="text-foreground flex-1">{opt}</span>
                  {showResult && opt === current.answer && <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />}
                  {showResult && opt === selected && opt !== current.answer && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {selected && (
            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={handleNext} className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 flex items-center justify-center gap-2">
              {currentIdx + 1 < questions.length ? "Next" : "See Results"} <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SafetyFirstGame;
