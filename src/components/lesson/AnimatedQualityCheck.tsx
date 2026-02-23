import { motion } from "framer-motion";
import { useState } from "react";
import { ClipboardCheck, Star } from "lucide-react";

const criteria = [
  { name: "Physical Condition", maxScore: 5, score: 5, note: "No visible damage" },
  { name: "Functionality", maxScore: 5, score: 4, note: "Minor software glitch" },
  { name: "Documentation", maxScore: 5, score: 5, note: "All records complete" },
  { name: "Safety Compliance", maxScore: 5, score: 5, note: "Passed electrical test" },
  { name: "Client Satisfaction", maxScore: 5, score: 4, note: "Positive feedback" },
];

const AnimatedQualityCheck = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">⭐ Quality Assessment</h4>
        <button
          onClick={() => setRevealed(!revealed)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {revealed ? "Reset" : "▶ Show Report"}
        </button>
      </div>

      <div className="space-y-2">
        {criteria.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -15 }}
            transition={{ delay: i * 0.2, type: "spring" }}
            className="rounded-lg bg-secondary/50 px-3 py-2 flex items-center gap-3"
          >
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">{c.name}</p>
              <p className="text-[10px] text-muted-foreground">{c.note}</p>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: c.maxScore }).map((_, s) => (
                <motion.div
                  key={s}
                  animate={revealed ? { scale: [0, 1.2, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: i * 0.2 + s * 0.08 }}
                >
                  <Star
                    className={`h-3 w-3 ${s < c.score ? "text-warning fill-warning" : "text-muted-foreground"}`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center rounded-lg bg-accent/10 p-2.5"
        >
          <p className="text-xs font-bold text-accent">Overall: 23/25 — Excellent Quality ✓</p>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedQualityCheck;
