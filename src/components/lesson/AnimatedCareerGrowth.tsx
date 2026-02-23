import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp } from "lucide-react";

const levels = [
  { title: "Apprentice", skills: "Basic assembly, cable crimping", timeframe: "Year 1", emoji: "🌱" },
  { title: "Junior Technician", skills: "OS install, network config", timeframe: "Year 2", emoji: "🔧" },
  { title: "Technician", skills: "Server setup, fault diagnosis", timeframe: "Year 3", emoji: "💻" },
  { title: "Senior Technician", skills: "Team lead, complex repairs", timeframe: "Year 5+", emoji: "⭐" },
];

const AnimatedCareerGrowth = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">📈 Career Path</h4>
        <button
          onClick={() => setRevealed(!revealed)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {revealed ? "Reset" : "▶ Show Path"}
        </button>
      </div>

      <div className="space-y-2">
        {levels.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0.15, x: -20 }}
            transition={{ delay: i * 0.3, type: "spring" }}
            className="flex items-center gap-3"
          >
            <div className="flex flex-col items-center">
              <motion.span
                animate={revealed ? { scale: [0.5, 1.2, 1] } : { scale: 0.5 }}
                transition={{ delay: i * 0.3 }}
                className="text-xl"
              >
                {level.emoji}
              </motion.span>
              {i < levels.length - 1 && (
                <motion.div
                  animate={revealed ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ delay: i * 0.3 + 0.2 }}
                  className="w-0.5 h-4 bg-primary/30 origin-top"
                />
              )}
            </div>
            <div className="flex-1 rounded-lg bg-secondary/50 px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">{level.title}</span>
                <span className="text-[9px] text-muted-foreground bg-card px-1.5 py-0.5 rounded">{level.timeframe}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{level.skills}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCareerGrowth;
