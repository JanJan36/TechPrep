import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Timer, RotateCcw, Trophy, Zap } from "lucide-react";

const commands = [
  { cmd: "ipconfig /all", desc: "Show full IP configuration" },
  { cmd: "ping 192.168.1.1", desc: "Test connectivity to gateway" },
  { cmd: "sfc /scannow", desc: "Scan and repair system files" },
  { cmd: "chkdsk C: /f", desc: "Check and fix disk errors" },
  { cmd: "netstat -an", desc: "Show all active connections" },
  { cmd: "tracert google.com", desc: "Trace route to a host" },
  { cmd: "nslookup dns.google", desc: "Query DNS for a domain" },
  { cmd: "tasklist /v", desc: "List running processes (verbose)" },
  { cmd: "diskpart", desc: "Open disk partition tool" },
  { cmd: "format D: /fs:NTFS", desc: "Format drive D as NTFS" },
  { cmd: "shutdown /r /t 0", desc: "Restart computer immediately" },
  { cmd: "cls", desc: "Clear the terminal screen" },
  { cmd: "dir /s /b", desc: "List all files recursively" },
  { cmd: "net user admin", desc: "Show user account details" },
  { cmd: "gpupdate /force", desc: "Force group policy refresh" },
];

const GAME_DURATION = 60;

const SpeedTypingGame = () => {
  const [gameState, setGameState] = useState<"ready" | "playing" | "done">("ready");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [shuffled, setShuffled] = useState<typeof commands>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const shuffle = useCallback(() => {
    const s = [...commands].sort(() => Math.random() - 0.5);
    setShuffled(s);
  }, []);

  const startGame = () => {
    shuffle();
    setGameState("playing");
    setTimeLeft(GAME_DURATION);
    setCurrentIdx(0);
    setInput("");
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      setGameState("done");
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [gameState, timeLeft]);

  const current = shuffled[currentIdx % shuffled.length];

  const handleInput = (val: string) => {
    setInput(val);
    if (current && val.trim() === current.cmd) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
      setCurrentIdx((i) => i + 1);
      setInput("");
    }
  };

  const getCharStatus = (typed: string, target: string) => {
    return target.split("").map((char, i) => {
      if (i >= typed.length) return "pending";
      return typed[i] === char ? "correct" : "wrong";
    });
  };

  if (gameState === "ready") {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Speed Typing Challenge</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Type technical commands as fast as you can! You have {GAME_DURATION} seconds.
        </p>
        <button
          onClick={startGame}
          className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all hover:scale-105 active:scale-95"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "done") {
    const wpm = Math.round((score / GAME_DURATION) * 60);
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-warning/10"
        >
          <Trophy className="h-10 w-10 text-warning" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">Time's Up! ⏱️</h2>
        <div className="mt-4 grid grid-cols-3 gap-3 max-w-xs mx-auto">
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-2xl font-bold text-primary">{score}</p>
            <p className="text-[10px] text-muted-foreground">Commands</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-2xl font-bold text-accent">{wpm}</p>
            <p className="text-[10px] text-muted-foreground">CPM</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-2xl font-bold text-warning">{bestStreak}🔥</p>
            <p className="text-[10px] text-muted-foreground">Best Streak</p>
          </div>
        </div>
        {score >= 8 && (
          <p className="mt-3 text-sm font-semibold text-warning">+25 XP earned!</p>
        )}
        <button
          onClick={startGame}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" /> Play Again
        </button>
      </div>
    );
  }

  const charStatuses = current ? getCharStatus(input, current.cmd) : [];

  return (
    <div className="mx-auto max-w-lg">
      {/* Timer & Score bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Timer className={`h-4 w-4 ${timeLeft <= 10 ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
          <span className={`text-lg font-bold font-mono ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="flex items-center gap-4">
          {streak >= 3 && (
            <span className="text-xs font-bold text-warning animate-pulse">🔥 {streak} streak!</span>
          )}
          <span className="text-sm font-bold text-primary">{score} done</span>
        </div>
      </div>

      {/* Time bar */}
      <div className="h-1.5 rounded-full bg-muted mb-6 overflow-hidden">
        <motion.div
          animate={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
          className={`h-full rounded-full transition-colors ${timeLeft <= 10 ? "bg-destructive" : "bg-primary"}`}
        />
      </div>

      {/* Command prompt */}
      {current && (
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 mb-4"
        >
          <p className="text-xs text-muted-foreground mb-3">📌 {current.desc}</p>
          {/* Rendered target with per-char coloring */}
          <div className="font-mono text-lg tracking-wide mb-4 flex flex-wrap">
            {charStatuses.map((status, i) => (
              <span
                key={i}
                className={`${
                  status === "correct"
                    ? "text-accent"
                    : status === "wrong"
                    ? "text-destructive bg-destructive/10 rounded"
                    : "text-muted-foreground/40"
                }`}
              >
                {current.cmd[i] === " " ? "\u00A0" : current.cmd[i]}
              </span>
            ))}
          </div>

          {/* Terminal-style input */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 p-3 font-mono text-sm">
            <span className="text-accent shrink-0">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40"
              placeholder="Type the command..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </motion.div>
      )}

      {/* Upcoming */}
      <div className="space-y-1.5">
        {shuffled.slice(currentIdx + 1, currentIdx + 3).map((c, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
            <span className="text-muted-foreground/40">next:</span>
            <span className="font-mono">{c.cmd}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeedTypingGame;
