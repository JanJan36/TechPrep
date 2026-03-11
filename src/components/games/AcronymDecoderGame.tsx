import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2, XCircle, ArrowRight, Trophy, Star, BookOpen } from "lucide-react";
import { saveHighScore, getHighScore } from "@/hooks/useGameScores";

const acronyms = [
  { acronym: "CPU", meaning: "Central Processing Unit", wrong: ["Computer Power Unit", "Central Peripheral Utility"] },
  { acronym: "RAM", meaning: "Random Access Memory", wrong: ["Read-After-Memory", "Rapid Active Module"] },
  { acronym: "BIOS", meaning: "Basic Input/Output System", wrong: ["Binary Integrated OS", "Base Internal Operation Software"] },
  { acronym: "SSD", meaning: "Solid State Drive", wrong: ["System Storage Device", "Serial Signal Disk"] },
  { acronym: "NIC", meaning: "Network Interface Card", wrong: ["Node Internet Controller", "Network Input Channel"] },
  { acronym: "DNS", meaning: "Domain Name System", wrong: ["Data Network Service", "Digital Naming Standard"] },
  { acronym: "DHCP", meaning: "Dynamic Host Configuration Protocol", wrong: ["Data Hub Control Protocol", "Device Hosting Config Process"] },
  { acronym: "RAID", meaning: "Redundant Array of Independent Disks", wrong: ["Rapid Access Integrated Data", "Remote Array Input Device"] },
  { acronym: "POST", meaning: "Power-On Self Test", wrong: ["Pre-Operating System Task", "Primary Output System Test"] },
  { acronym: "GPIO", meaning: "General Purpose Input/Output", wrong: ["Graphics Processing IO", "Global Peripheral Interface Option"] },
  { acronym: "VLAN", meaning: "Virtual Local Area Network", wrong: ["Variable Link Access Node", "Virtual LAN Address Name"] },
  { acronym: "ESD", meaning: "Electrostatic Discharge", wrong: ["Electronic Safety Device", "External Signal Detection"] },
  { acronym: "PSU", meaning: "Power Supply Unit", wrong: ["Processing System Utility", "Peripheral Signal Unit"] },
  { acronym: "CMOS", meaning: "Complementary Metal-Oxide Semiconductor", wrong: ["Central Memory Operating System", "Computer Managed Output Signal"] },
  { acronym: "UEFI", meaning: "Unified Extensible Firmware Interface", wrong: ["Universal Electronic Function Input", "User-End Firmware Integration"] },
];

const AcronymDecoderGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "done">("ready");
  const [questions, setQuestions] = useState<typeof acronyms>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const startGame = useCallback(() => {
    const shuffled = [...acronyms].sort(() => Math.random() - 0.5).slice(0, 10);
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
      setShuffledOptions([current.meaning, ...current.wrong].sort(() => Math.random() - 0.5));
    }
  }, [currentIdx, current?.acronym]);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === current.meaning) setScore((s) => s + 1);
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Acronym Decoder</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Match 10 common IT acronyms to their correct meanings. How well do you know your tech terminology?
        </p>
        <button onClick={startGame} className="mt-6 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const { isNewBest } = saveHighScore({ gameId: "acronym-decoder", score, total: questions.length, percentage: pct });
    const prev = getHighScore("acronym-decoder");
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Trophy className="h-10 w-10 text-primary" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">{pct >= 70 ? "Great job! 🎉" : "Keep studying!"}</h2>
        <p className="mt-2 text-muted-foreground">You decoded {score}/{questions.length} acronyms ({pct}%)</p>
        {isNewBest && (
          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-warning">
            <Star className="h-4 w-4 fill-warning" /> New Personal Best!
          </motion.p>
        )}
        {!isNewBest && prev && <p className="mt-1 text-xs text-muted-foreground">Best: {prev.percentage}%</p>}
        {pct >= 70 && <p className="mt-1 text-sm font-semibold text-warning">+20 XP earned!</p>}
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
          <motion.div animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} className="h-full rounded-full bg-primary" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
        <span className="text-xs font-bold text-warning">{score}✓</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
          <div className="mb-6 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <p className="text-xs text-muted-foreground mb-2">What does this stand for?</p>
            <p className="font-display text-4xl font-bold text-primary tracking-wider">{current.acronym}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {shuffledOptions.map((opt, idx) => {
              let style = "border-border bg-card hover:bg-secondary cursor-pointer";
              if (showResult) {
                if (opt === current.meaning) style = "border-accent bg-accent/10";
                else if (opt === selected) style = "border-destructive bg-destructive/10";
                else style = "border-border bg-card opacity-40";
              }
              return (
                <motion.button key={opt} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => handleSelect(opt)} disabled={!!selected} className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${style}`}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold shrink-0">{String.fromCharCode(65 + idx)}</span>
                  <span className="text-foreground flex-1">{opt}</span>
                  {showResult && opt === current.meaning && <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />}
                  {showResult && opt === selected && opt !== current.meaning && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
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

export default AcronymDecoderGame;
