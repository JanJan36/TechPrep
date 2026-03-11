import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2, XCircle, ArrowRight, Trophy, Star, Cpu } from "lucide-react";
import { saveHighScore, getHighScore } from "@/hooks/useGameScores";

const specs = [
  { spec: "DDR5-6000 CL30", component: "RAM Module", wrong: ["CPU", "SSD"] },
  { spec: "AM5 Socket, 16 cores / 32 threads", component: "CPU (Processor)", wrong: ["GPU", "Motherboard"] },
  { spec: "PCIe 4.0 x4 NVMe, 7000 MB/s read", component: "M.2 SSD", wrong: ["HDD", "RAM Module"] },
  { spec: "750W 80+ Gold, fully modular", component: "Power Supply (PSU)", wrong: ["UPS Battery", "Voltage Regulator"] },
  { spec: "24GB GDDR6X, 384-bit bus", component: "Graphics Card (GPU)", wrong: ["CPU", "RAM Module"] },
  { spec: "LGA 1700, DDR5 support, PCIe 5.0", component: "Motherboard", wrong: ["CPU", "Expansion Card"] },
  { spec: "7200 RPM, 256MB cache, 2TB", component: "Hard Disk Drive (HDD)", wrong: ["SSD", "Optical Drive"] },
  { spec: "120mm, 1500 RPM, PWM controlled", component: "Case Fan", wrong: ["CPU Cooler", "PSU"] },
  { spec: "360mm radiator, copper base plate", component: "AIO Liquid Cooler", wrong: ["Air Cooler", "Case Fan"] },
  { spec: "2.5 Gbps, RJ-45, Wake-on-LAN", component: "Network Interface Card (NIC)", wrong: ["Wi-Fi Adapter", "Modem"] },
  { spec: "Wi-Fi 6E, Bluetooth 5.3, PCIe", component: "Wireless Network Adapter", wrong: ["NIC", "Router"] },
  { spec: "650VA, line-interactive, sine wave", component: "UPS (Uninterruptible Power Supply)", wrong: ["PSU", "Surge Protector"] },
];

const HardwareSpecsGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "done">("ready");
  const [questions, setQuestions] = useState<typeof specs>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const startGame = useCallback(() => {
    const shuffled = [...specs].sort(() => Math.random() - 0.5).slice(0, 10);
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
      setShuffledOptions([current.component, ...current.wrong].sort(() => Math.random() - 0.5));
    }
  }, [currentIdx, current?.spec]);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === current.component) setScore((s) => s + 1);
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
          <Cpu className="h-8 w-8 text-accent" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Hardware Specs Match</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Read real hardware specifications and identify which component they belong to. Think like a tech buyer!
        </p>
        <button onClick={startGame} className="mt-6 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const { isNewBest } = saveHighScore({ gameId: "hardware-specs", score, total: questions.length, percentage: pct });
    const prev = getHighScore("hardware-specs");
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
          <Trophy className="h-10 w-10 text-accent" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">{pct >= 70 ? "Spec expert! 🎉" : "Study those specs!"}</h2>
        <p className="mt-2 text-muted-foreground">You matched {score}/{questions.length} specs ({pct}%)</p>
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
          <motion.div animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} className="h-full rounded-full bg-accent" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
        <span className="text-xs font-bold text-warning">{score}✓</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
          <div className="mb-6 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <p className="text-xs text-muted-foreground mb-2">Which component has these specs?</p>
            <p className="font-mono text-lg font-bold text-accent">{current.spec}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {shuffledOptions.map((opt, idx) => {
              let style = "border-border bg-card hover:bg-secondary cursor-pointer";
              if (showResult) {
                if (opt === current.component) style = "border-accent bg-accent/10";
                else if (opt === selected) style = "border-destructive bg-destructive/10";
                else style = "border-border bg-card opacity-40";
              }
              return (
                <motion.button key={opt} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => handleSelect(opt)} disabled={!!selected} className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${style}`}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold shrink-0">{String.fromCharCode(65 + idx)}</span>
                  <span className="text-foreground flex-1">{opt}</span>
                  {showResult && opt === current.component && <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />}
                  {showResult && opt === selected && opt !== current.component && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
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

export default HardwareSpecsGame;
