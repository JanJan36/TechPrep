import { useState, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Monitor, Cpu, Database, HardDrive, Battery, Fan, Check, RotateCcw, Zap } from "lucide-react";

interface Part {
  id: string;
  label: string;
  icon: typeof Cpu;
  desc: string;
}

const CORRECT_ORDER: Part[] = [
  { id: "case", label: "Case", icon: Monitor, desc: "Install the case first — the foundation" },
  { id: "psu", label: "PSU", icon: Battery, desc: "Mount the power supply unit" },
  { id: "mobo", label: "Motherboard", icon: Cpu, desc: "Secure the motherboard to standoffs" },
  { id: "cpu", label: "CPU", icon: Cpu, desc: "Align the triangle and lock in the processor" },
  { id: "cooler", label: "CPU Cooler", icon: Fan, desc: "Apply thermal paste, then mount the cooler" },
  { id: "ram", label: "RAM", icon: Database, desc: "Push sticks into DIMM slots until they click" },
  { id: "storage", label: "SSD / HDD", icon: HardDrive, desc: "Connect SATA data + power cables" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PCAssemblySimulation = () => {
  const [parts, setParts] = useState<Part[]>(() => shuffle(CORRECT_ORDER));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let correct = 0;
    parts.forEach((p, i) => {
      if (p.id === CORRECT_ORDER[i].id) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setParts(shuffle(CORRECT_ORDER));
    setSubmitted(false);
    setScore(0);
  };

  const isPerfect = score === CORRECT_ORDER.length;

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <Cpu className="h-3.5 w-3.5" />
            Drag & Drop Simulation
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">PC Assembly Order</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Drag the components into the correct assembly order. Start from what goes in first!
          </p>
        </div>

        {/* Instructions card */}
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
          <p className="text-xs text-accent font-semibold mb-1">💡 Tip</p>
          <p className="text-xs text-muted-foreground">
            Think about what needs to be installed before other components can fit. 
            The case is the foundation — what goes in next?
          </p>
        </div>

        {/* Reorderable list */}
        <div className="space-y-2">
          <Reorder.Group axis="y" values={parts} onReorder={setParts} className="space-y-2">
            {parts.map((part, index) => {
              const Icon = part.icon;
              const isCorrect = submitted && part.id === CORRECT_ORDER[index].id;
              const isWrong = submitted && part.id !== CORRECT_ORDER[index].id;

              return (
                <Reorder.Item
                  key={part.id}
                  value={part}
                  dragListener={!submitted}
                  className={`rounded-xl border p-4 flex items-center gap-4 select-none transition-colors ${
                    submitted
                      ? isCorrect
                        ? "border-accent bg-accent/5"
                        : "border-destructive/40 bg-destructive/5"
                      : "border-border bg-card hover:border-primary/40 hover:bg-primary/5 cursor-grab active:cursor-grabbing"
                  }`}
                  whileDrag={{ scale: 1.03, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", zIndex: 50 }}
                >
                  {/* Step number */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    submitted
                      ? isCorrect ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {submitted && isCorrect ? <Check className="h-4 w-4" /> : index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{part.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{part.desc}</p>
                  </div>

                  {/* Drag handle indicator */}
                  {!submitted && (
                    <div className="flex flex-col gap-0.5 shrink-0 opacity-40">
                      <div className="w-4 h-0.5 rounded bg-muted-foreground" />
                      <div className="w-4 h-0.5 rounded bg-muted-foreground" />
                      <div className="w-4 h-0.5 rounded bg-muted-foreground" />
                    </div>
                  )}
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>

        {/* Result */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl border p-5 text-center space-y-3 ${
                isPerfect ? "border-accent bg-accent/5" : "border-warning bg-warning/5"
              }`}
            >
              <div className="text-3xl">{isPerfect ? "🎉" : "🔧"}</div>
              <p className="font-display font-bold text-lg text-foreground">
                {isPerfect ? "Perfect Assembly!" : `${score} / ${CORRECT_ORDER.length} Correct`}
              </p>
              <p className="text-xs text-muted-foreground">
                {isPerfect
                  ? "You've mastered the PC assembly order!"
                  : "Review the correct order and try again."}
              </p>
              {isPerfect && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                  <Zap className="h-3 w-3" /> +25 XP
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Check My Order
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Try Again
            </button>
          )}
        </div>

        {/* Show correct order after submission */}
        {submitted && !isPerfect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-4 space-y-2"
          >
            <p className="text-xs font-semibold text-muted-foreground">✅ Correct Order:</p>
            {CORRECT_ORDER.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2 text-xs">
                <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="font-medium text-foreground">{p.label}</span>
                <span className="text-muted-foreground">— {p.desc}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PCAssemblySimulation;
