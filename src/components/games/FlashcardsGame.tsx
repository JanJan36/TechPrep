import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2, XCircle, ArrowRight, Trophy } from "lucide-react";

interface Card {
  id: number;
  image: string;
  name: string;
  hint: string;
  options: string[];
  correctIndex: number;
}

const cards: Card[] = [
  {
    id: 1,
    image: "🔲",
    name: "CPU (Processor)",
    hint: "The 'brain' of the computer that executes instructions",
    options: ["RAM Module", "CPU (Processor)", "GPU", "Motherboard"],
    correctIndex: 1,
  },
  {
    id: 2,
    image: "📦",
    name: "Power Supply Unit (PSU)",
    hint: "Converts AC power to DC and distributes it to components",
    options: ["UPS", "Power Supply Unit (PSU)", "Voltage Regulator", "Transformer"],
    correctIndex: 1,
  },
  {
    id: 3,
    image: "🧩",
    name: "RAM (Memory)",
    hint: "Temporary storage for data actively being used by programs",
    options: ["SSD", "Cache", "RAM (Memory)", "ROM"],
    correctIndex: 2,
  },
  {
    id: 4,
    image: "💽",
    name: "Hard Disk Drive (HDD)",
    hint: "Uses spinning magnetic platters for long-term storage",
    options: ["Hard Disk Drive (HDD)", "Solid State Drive", "Optical Drive", "Flash Drive"],
    correctIndex: 0,
  },
  {
    id: 5,
    image: "🖥️",
    name: "Motherboard",
    hint: "The main circuit board connecting all components together",
    options: ["Expansion Card", "Backplane", "Motherboard", "Daughterboard"],
    correctIndex: 2,
  },
  {
    id: 6,
    image: "🌀",
    name: "CPU Cooler / Heatsink",
    hint: "Dissipates heat from the processor to prevent overheating",
    options: ["Case Fan", "CPU Cooler / Heatsink", "Thermal Pad", "Radiator"],
    correctIndex: 1,
  },
  {
    id: 7,
    image: "🎮",
    name: "Graphics Card (GPU)",
    hint: "Renders images and video, essential for gaming and design",
    options: ["Sound Card", "Network Card", "Graphics Card (GPU)", "Capture Card"],
    correctIndex: 2,
  },
  {
    id: 8,
    image: "🔌",
    name: "SATA Cable",
    hint: "Connects storage drives to the motherboard for data transfer",
    options: ["HDMI Cable", "USB Cable", "Ethernet Cable", "SATA Cable"],
    correctIndex: 3,
  },
  {
    id: 9,
    image: "📡",
    name: "Network Interface Card (NIC)",
    hint: "Allows the computer to connect to a network (wired or wireless)",
    options: ["Modem", "Network Interface Card (NIC)", "Router", "Switch"],
    correctIndex: 1,
  },
  {
    id: 10,
    image: "⚡",
    name: "Solid State Drive (SSD)",
    hint: "Uses flash memory for fast, silent, durable storage",
    options: ["RAM Stick", "Solid State Drive (SSD)", "HDD", "M.2 Adapter"],
    correctIndex: 1,
  },
];

const FlashcardsGame = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const card = cards[currentCard];

  const handleSelect = useCallback(
    (idx: number) => {
      if (selected !== null) return;
      setSelected(idx);
      setFlipped(true);
      if (idx === card.correctIndex) setScore((s) => s + 1);
    },
    [selected, card.correctIndex]
  );

  const handleNext = () => {
    if (currentCard + 1 < cards.length) {
      setCurrentCard((c) => c + 1);
      setFlipped(false);
      setSelected(null);
      setShowHint(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentCard(0);
    setFlipped(false);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowHint(false);
  };

  if (finished) {
    const pct = Math.round((score / cards.length) * 100);
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
        >
          <Trophy className="h-10 w-10 text-accent" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {pct >= 70 ? "Excellent! 🎉" : "Keep practicing!"}
        </h2>
        <p className="mt-2 text-muted-foreground">
          You identified {score}/{cards.length} components ({pct}%)
        </p>
        {pct >= 70 && (
          <p className="mt-1 text-sm font-semibold text-warning">+20 XP earned!</p>
        )}
        <button
          onClick={handleRestart}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
        >
          <RotateCcw className="h-4 w-4" /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            animate={{ width: `${((currentCard + 1) / cards.length) * 100}%` }}
            className="h-full rounded-full bg-primary"
          />
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {currentCard + 1}/{cards.length}
        </span>
        <span className="text-xs font-bold text-warning">{score}✓</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          {/* Flashcard */}
          <div className="relative mx-auto mb-6 perspective-1000">
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-48 rounded-2xl preserve-3d"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-card shadow-lg backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-6xl mb-3">{card.image}</span>
                <p className="text-sm font-medium text-muted-foreground">What component is this?</p>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-accent bg-accent/5 shadow-lg"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-4xl mb-2">{card.image}</span>
                <p className="font-display font-bold text-foreground text-lg">{card.name}</p>
                <p className="text-xs text-muted-foreground mt-1 px-6 text-center">{card.hint}</p>
              </div>
            </motion.div>
          </div>

          {/* Hint toggle */}
          {!flipped && (
            <button
              onClick={() => setShowHint((h) => !h)}
              className="mb-4 text-xs text-info underline underline-offset-2"
            >
              {showHint ? "Hide hint" : "Need a hint?"}
            </button>
          )}
          {showHint && !flipped && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 rounded-lg border border-info/20 bg-info/5 p-3 text-xs text-info"
            >
              💡 {card.hint}
            </motion.p>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 gap-2">
            {card.options.map((opt, idx) => {
              let style = "border-border bg-card hover:bg-secondary cursor-pointer";
              if (selected !== null) {
                if (idx === card.correctIndex) style = "border-accent bg-accent/10";
                else if (idx === selected) style = "border-destructive bg-destructive/10";
                else style = "border-border bg-card opacity-40";
              }
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${style}`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-foreground flex-1">{opt}</span>
                  {selected !== null && idx === card.correctIndex && (
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  )}
                  {selected !== null && idx === selected && idx !== card.correctIndex && (
                    <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {selected !== null && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 flex items-center justify-center gap-2"
            >
              {currentCard + 1 < cards.length ? "Next Card" : "See Results"}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FlashcardsGame;
