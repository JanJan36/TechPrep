import { motion } from "framer-motion";
import { useState } from "react";
import { MessageSquare, Users, FileText } from "lucide-react";

const messages = [
  { from: "Tech", msg: "The client's PC won't boot. PSU tested OK.", align: "left", icon: "🧑‍💻" },
  { from: "Lead", msg: "Check the motherboard capacitors. Document findings.", align: "right", icon: "👨‍💼" },
  { from: "Tech", msg: "Found 2 bulging caps. Requesting replacement board.", align: "left", icon: "🧑‍💻" },
  { from: "Lead", msg: "Approved. Update the job ticket with photos.", align: "right", icon: "👨‍💼" },
];

const AnimatedCommunication = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  const play = () => {
    setVisibleCount(0);
    messages.forEach((_, i) => {
      setTimeout(() => setVisibleCount(i + 1), (i + 1) * 900);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">💬 Technical Communication</h4>
        <button
          onClick={play}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {visibleCount > 0 ? "↻ Replay" : "▶ Show Chat"}
        </button>
      </div>

      <div className="space-y-2 min-h-[120px]">
        {messages.slice(0, visibleCount).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring" }}
            className={`flex gap-2 ${m.align === "right" ? "flex-row-reverse" : ""}`}
          >
            <span className="text-lg shrink-0">{m.icon}</span>
            <div className={`rounded-xl px-3 py-2 max-w-[75%] ${
              m.align === "left" ? "bg-secondary/70" : "bg-primary/10"
            }`}>
              <p className="text-[10px] font-bold text-muted-foreground mb-0.5">{m.from}</p>
              <p className="text-xs text-foreground">{m.msg}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount >= messages.length && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-muted-foreground text-center">
          Clear, professional communication keeps the team aligned!
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedCommunication;
