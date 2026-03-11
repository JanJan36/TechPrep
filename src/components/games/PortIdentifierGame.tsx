import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Usb, RotateCcw, Trophy, CheckCircle2, XCircle, Star } from "lucide-react";
import { saveHighScore, getHighScore } from "@/hooks/useGameScores";

const ports = [
  { name: "USB 3.0", hint: "Blue rectangular connector, 5 Gbps data transfer", wrong: ["Round DIN connector for PS/2 keyboards", "15-pin trapezoidal for analog video"] },
  { name: "RJ-45", hint: "8-pin modular jack used for Ethernet networking", wrong: ["4-pin connector for telephone lines", "Circular connector for S-Video"] },
  { name: "HDMI", hint: "19-pin flat connector for digital audio/video", wrong: ["25-pin D-sub for parallel printing", "3.5mm circular jack for audio"] },
  { name: "VGA", hint: "15-pin D-sub connector with 3 rows, analog video", wrong: ["Flat 20-pin connector for digital displays", "8-pin modular for networking"] },
  { name: "DisplayPort", hint: "20-pin asymmetric connector, supports daisy-chaining", wrong: ["19-pin symmetric connector for HDMI", "9-pin D-sub for serial data"] },
  { name: "Thunderbolt 3", hint: "USB-C shaped, supports 40 Gbps data + video + power", wrong: ["Rectangular USB-A at 480 Mbps", "Mini circular connector for FireWire"] },
  { name: "RJ-11", hint: "6-pin modular jack for telephone/DSL lines", wrong: ["8-pin modular for Ethernet", "BNC connector for coaxial"] },
  { name: "eSATA", hint: "External SATA for high-speed drive connection", wrong: ["USB-B square connector for printers", "PS/2 mini-DIN for mice"] },
  { name: "PS/2", hint: "6-pin mini-DIN, purple for keyboard, green for mouse", wrong: ["USB-A rectangular connector", "RJ-45 modular for network"] },
  { name: "DVI-D", hint: "24-pin digital-only video connector with flat pin", wrong: ["15-pin analog VGA connector", "19-pin HDMI multimedia connector"] },
];

const PortIdentifierGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "done">("ready");
  const [questions, setQuestions] = useState<typeof ports>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = useCallback(() => {
    setQuestions([...ports].sort(() => Math.random() - 0.5).slice(0, 8));
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameState("playing");
  }, []);

  const current = questions[currentIdx];

  const getOptions = () => {
    if (!current) return [];
    return [current.hint, ...current.wrong].sort((a, b) => a.localeCompare(b));
  };

  const handleSelect = (opt: string) => {
    if (showResult) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === current.hint) setScore((s) => s + 1);
    setTimeout(() => {
      if (currentIdx + 1 >= questions.length) {
        setGameState("done");
      } else {
        setCurrentIdx((i) => i + 1);
        setSelected(null);
        setShowResult(false);
      }
    }, 1200);
  };

  if (gameState === "ready") {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Usb className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Port Identifier</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Identify ports by their description. Match the correct description to each port type!
        </p>
        <button onClick={startGame} className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95">
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const { isNewBest } = saveHighScore({ gameId: "port-identifier", score, total: questions.length, percentage: pct });
    const prev = getHighScore("port-identifier");
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-warning/10">
          <Trophy className="h-10 w-10 text-warning" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {pct >= 80 ? "Port Expert! 🔌" : pct >= 50 ? "Nice Work! 👍" : "Keep Learning! 📚"}
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
          <p className="text-xs text-muted-foreground mb-1">Which description matches this port?</p>
          <h3 className="font-display text-2xl font-bold text-foreground mb-6">{current.name}</h3>
          <div className="space-y-2.5">
            {opts.map((opt) => {
              const isCorrect = opt === current.hint;
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

export default PortIdentifierGame;
