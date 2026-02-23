import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Check, RotateCcw, Zap, Cable } from "lucide-react";

interface Wire {
  id: string;
  label: string;
  colorClass: string;
  stripe: boolean;
}

const T568B_ORDER: Wire[] = [
  { id: "w-org", label: "White/Orange", colorClass: "bg-orange-200 border-orange-300", stripe: true },
  { id: "org", label: "Orange", colorClass: "bg-orange-500", stripe: false },
  { id: "w-grn", label: "White/Green", colorClass: "bg-green-200 border-green-300", stripe: true },
  { id: "blu", label: "Blue", colorClass: "bg-blue-500", stripe: false },
  { id: "w-blu", label: "White/Blue", colorClass: "bg-blue-200 border-blue-300", stripe: true },
  { id: "grn", label: "Green", colorClass: "bg-green-500", stripe: false },
  { id: "w-brn", label: "White/Brown", colorClass: "bg-amber-300 border-amber-400", stripe: true },
  { id: "brn", label: "Brown", colorClass: "bg-amber-800", stripe: false },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CableCrimpingSimulation = () => {
  const [wires, setWires] = useState<Wire[]>(() => shuffle(T568B_ORDER));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let correct = 0;
    wires.forEach((w, i) => {
      if (w.id === T568B_ORDER[i].id) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setWires(shuffle(T568B_ORDER));
    setSubmitted(false);
    setScore(0);
  };

  const isPerfect = score === 8;

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold text-accent">
            <Cable className="h-3.5 w-3.5" />
            Wire Ordering Simulation
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Cable Crimping — T568B</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Arrange the 8 wires in the correct T568B order from Pin 1 (top) to Pin 8 (bottom).
          </p>
        </div>

        {/* Reference card */}
        <div className="rounded-xl border border-info/30 bg-info/5 p-4">
          <p className="text-xs text-info font-semibold mb-2">📌 Remember the pattern</p>
          <p className="text-xs text-muted-foreground">
            T568B pairs: Orange pair → Green/Blue swap → Blue pair → Green → Brown pair. 
            Each pair has a white-striped wire first, except the blue pair which is reversed.
          </p>
        </div>

        {/* RJ-45 connector visual */}
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3 text-center">RJ-45 Connector — Pin 1 at Top</p>
          
          <div className="mx-auto max-w-sm rounded-xl border-2 border-muted bg-secondary/30 p-3 space-y-1.5">
            <Reorder.Group axis="y" values={wires} onReorder={setWires} className="space-y-1.5">
              {wires.map((wire, index) => {
                const isCorrect = submitted && wire.id === T568B_ORDER[index].id;
                const isWrong = submitted && wire.id !== T568B_ORDER[index].id;

                return (
                  <Reorder.Item
                    key={wire.id}
                    value={wire}
                    dragListener={!submitted}
                    className={`flex items-center gap-3 rounded-lg border p-2.5 select-none transition-colors ${
                      submitted
                        ? isCorrect
                          ? "border-accent/50 bg-accent/5"
                          : "border-destructive/30 bg-destructive/5"
                        : "border-border bg-card hover:border-primary/30 cursor-grab active:cursor-grabbing"
                    }`}
                    whileDrag={{ scale: 1.04, boxShadow: "0 6px 24px rgba(0,0,0,0.1)", zIndex: 50 }}
                  >
                    {/* Pin number */}
                    <span className={`text-[10px] font-bold w-5 text-center shrink-0 ${
                      submitted ? (isCorrect ? "text-accent" : "text-destructive") : "text-muted-foreground"
                    }`}>
                      {index + 1}
                    </span>

                    {/* Wire color bar */}
                    <div className={`w-10 h-4 rounded-sm ${wire.colorClass} ${wire.stripe ? "border" : ""} shrink-0`} />

                    {/* Label */}
                    <span className="text-xs font-medium text-foreground flex-1">{wire.label}</span>

                    {/* Status icon */}
                    {submitted && isCorrect && <Check className="h-3.5 w-3.5 text-accent shrink-0" />}
                    {submitted && isWrong && <span className="text-xs text-destructive shrink-0">✗</span>}

                    {/* Drag handle */}
                    {!submitted && (
                      <div className="flex flex-col gap-0.5 shrink-0 opacity-30">
                        <div className="w-3 h-0.5 rounded bg-muted-foreground" />
                        <div className="w-3 h-0.5 rounded bg-muted-foreground" />
                        <div className="w-3 h-0.5 rounded bg-muted-foreground" />
                      </div>
                    )}
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          </div>
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
              <div className="text-3xl">{isPerfect ? "🔌" : "🔧"}</div>
              <p className="font-display font-bold text-lg text-foreground">
                {isPerfect ? "Perfect Crimp!" : `${score} / 8 Correct`}
              </p>
              <p className="text-xs text-muted-foreground">
                {isPerfect ? "Your cable would pass a continuity test!" : "Some wires are out of order. Review and try again."}
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
              Crimp Cable
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

        {/* Correct answer */}
        {submitted && !isPerfect && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-4 space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground mb-2">✅ Correct T568B Order:</p>
            {T568B_ORDER.map((w, i) => (
              <div key={w.id} className="flex items-center gap-2 text-xs">
                <span className="w-4 text-center font-bold text-muted-foreground">{i + 1}</span>
                <div className={`w-6 h-3 rounded-sm ${w.colorClass} ${w.stripe ? "border" : ""}`} />
                <span className="text-foreground">{w.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CableCrimpingSimulation;
