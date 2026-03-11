import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2, XCircle, ArrowRight, Trophy, Star, Terminal } from "lucide-react";
import { saveHighScore, getHighScore } from "@/hooks/useGameScores";

const commands = [
  { command: "ipconfig", description: "Display IP configuration on Windows", wrong: ["List running processes", "Format a disk partition"] },
  { command: "ping", description: "Test network connectivity to a host", wrong: ["Display routing table", "Scan open ports"] },
  { command: "tracert", description: "Trace the route packets take to a destination", wrong: ["Reset network adapter", "Display DNS cache"] },
  { command: "nslookup", description: "Query DNS to resolve domain names", wrong: ["List network interfaces", "Show ARP table"] },
  { command: "netstat", description: "Display active network connections and ports", wrong: ["Configure firewall rules", "Test bandwidth speed"] },
  { command: "sfc /scannow", description: "Scan and repair Windows system files", wrong: ["Defragment hard drive", "Update device drivers"] },
  { command: "chkdsk", description: "Check disk for errors and bad sectors", wrong: ["Clear browser cache", "Monitor CPU temperature"] },
  { command: "tasklist", description: "Display all currently running processes", wrong: ["Schedule a system restart", "Install Windows updates"] },
  { command: "diskpart", description: "Manage disk partitions via command line", wrong: ["Monitor network traffic", "Configure user accounts"] },
  { command: "gpupdate /force", description: "Force refresh of Group Policy settings", wrong: ["Reset BIOS to defaults", "Clear event logs"] },
  { command: "chmod", description: "Change file permissions on Linux", wrong: ["Compile source code", "Mount a USB drive"] },
  { command: "ls", description: "List directory contents on Linux/Mac", wrong: ["Delete all temp files", "Show system uptime"] },
  { command: "ifconfig", description: "Display network interface config on Linux", wrong: ["Install a package", "Check disk usage"] },
  { command: "grep", description: "Search text patterns in files on Linux", wrong: ["Compress a folder", "Create a new user"] },
];

const OSCommandQuizGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "done">("ready");
  const [questions, setQuestions] = useState<typeof commands>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const startGame = useCallback(() => {
    const shuffled = [...commands].sort(() => Math.random() - 0.5).slice(0, 10);
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
      setShuffledOptions([current.description, ...current.wrong].sort(() => Math.random() - 0.5));
    }
  }, [currentIdx, current?.command]);

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setShowResult(true);
    if (opt === current.description) setScore((s) => s + 1);
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-info/10">
          <Terminal className="h-8 w-8 text-info" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">OS Command Quiz</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Match 10 Windows & Linux commands to what they actually do. Prove your command-line mastery!
        </p>
        <button onClick={startGame} className="mt-6 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all">
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "done") {
    const pct = Math.round((score / questions.length) * 100);
    const { isNewBest } = saveHighScore({ gameId: "os-commands", score, total: questions.length, percentage: pct });
    const prev = getHighScore("os-commands");
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-info/10">
          <Trophy className="h-10 w-10 text-info" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">{pct >= 70 ? "Command master! 🎉" : "Keep practicing!"}</h2>
        <p className="mt-2 text-muted-foreground">You matched {score}/{questions.length} commands ({pct}%)</p>
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
          <motion.div animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} className="h-full rounded-full bg-info" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
        <span className="text-xs font-bold text-warning">{score}✓</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
          <div className="mb-6 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <p className="text-xs text-muted-foreground mb-2">What does this command do?</p>
            <p className="font-mono text-2xl font-bold text-info">{current.command}</p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {shuffledOptions.map((opt, idx) => {
              let style = "border-border bg-card hover:bg-secondary cursor-pointer";
              if (showResult) {
                if (opt === current.description) style = "border-accent bg-accent/10";
                else if (opt === selected) style = "border-destructive bg-destructive/10";
                else style = "border-border bg-card opacity-40";
              }
              return (
                <motion.button key={opt} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => handleSelect(opt)} disabled={!!selected} className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${style}`}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold shrink-0">{String.fromCharCode(65 + idx)}</span>
                  <span className="text-foreground flex-1">{opt}</span>
                  {showResult && opt === current.description && <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />}
                  {showResult && opt === selected && opt !== current.description && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
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

export default OSCommandQuizGame;
