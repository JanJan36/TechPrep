import { motion } from "framer-motion";
import { useState } from "react";

const levels = [
  { label: "Elimination", desc: "Remove the hazard entirely", color: "bg-green-500", width: "w-24" },
  { label: "Substitution", desc: "Replace with something safer", color: "bg-lime-500", width: "w-32" },
  { label: "Engineering Controls", desc: "Isolate people from the hazard", color: "bg-yellow-500", width: "w-40" },
  { label: "Admin Controls", desc: "Change work procedures", color: "bg-orange-500", width: "w-48" },
  { label: "PPE", desc: "Personal protective equipment (last resort)", color: "bg-red-500", width: "w-56" },
];

const AnimatedHazardPyramid = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">⚠️ Hierarchy of Controls</h4>
        <button
          onClick={() => setRevealed(!revealed)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {revealed ? "Reset" : "▶ Show Pyramid"}
        </button>
      </div>

      <div className="flex flex-col items-center gap-1.5 py-2">
        <p className="text-[10px] font-bold text-accent mb-1">MOST EFFECTIVE</p>
        {levels.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={revealed ? { opacity: 1, scaleX: 1 } : { opacity: 0.2, scaleX: 0.5 }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
            className={`${level.width} ${level.color} rounded-lg py-2 px-3 text-center shadow-sm`}
          >
            <p className="text-[11px] font-bold text-white">{level.label}</p>
            <p className="text-[9px] text-white/80">{level.desc}</p>
          </motion.div>
        ))}
        <p className="text-[10px] font-bold text-destructive mt-1">LEAST EFFECTIVE</p>
      </div>
    </div>
  );
};

export default AnimatedHazardPyramid;
