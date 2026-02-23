import { motion } from "framer-motion";
import { useState } from "react";
import { Wrench, CheckCircle2 } from "lucide-react";

const tools = [
  { name: "Phillips Screwdriver", use: "Opening cases, mounting drives", emoji: "🪛" },
  { name: "Anti-static Wrist Strap", use: "ESD protection", emoji: "⚡" },
  { name: "Cable Crimper", use: "Making RJ-45 connectors", emoji: "🔧" },
  { name: "Multimeter", use: "Testing voltage & continuity", emoji: "📟" },
  { name: "Cable Tester", use: "Verifying network cables", emoji: "🔌" },
  { name: "Compressed Air", use: "Cleaning dust from components", emoji: "💨" },
];

const AnimatedToolSelection = () => {
  const [showTools, setShowTools] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🧰 Technician's Toolkit</h4>
        <button
          onClick={() => setShowTools(!showTools)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {showTools ? "Reset" : "▶ Open Toolkit"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {tools.map((tool, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={showTools ? { opacity: 1, rotateY: 0 } : { opacity: 0.2, rotateY: 90 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 150 }}
            className="rounded-lg bg-secondary/50 p-2.5 flex items-start gap-2"
          >
            <span className="text-lg">{tool.emoji}</span>
            <div>
              <p className="text-[11px] font-bold text-foreground">{tool.name}</p>
              <p className="text-[9px] text-muted-foreground">{tool.use}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedToolSelection;
