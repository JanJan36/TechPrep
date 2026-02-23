import { motion } from "framer-motion";
import { useState } from "react";

const members = [
  { role: "Team Lead", task: "Assign tasks & review", emoji: "👨‍💼", color: "bg-primary/20 text-primary" },
  { role: "Technician A", task: "Hardware assembly", emoji: "🧑‍💻", color: "bg-accent/20 text-accent" },
  { role: "Technician B", task: "Network setup", emoji: "👩‍💻", color: "bg-warning/20 text-warning" },
  { role: "Support", task: "Documentation & testing", emoji: "📋", color: "bg-info/20 text-info" },
];

const AnimatedTeamwork = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🤝 Team Roles</h4>
        <button
          onClick={() => setActive(!active)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {active ? "Reset" : "▶ Show Team"}
        </button>
      </div>

      <div className="relative flex flex-col items-center gap-2">
        {/* Lead at top */}
        <motion.div
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.8 }}
          transition={{ type: "spring" }}
          className="rounded-xl bg-secondary/50 px-4 py-2.5 flex items-center gap-2"
        >
          <span className="text-xl">{members[0].emoji}</span>
          <div>
            <p className="text-xs font-bold text-foreground">{members[0].role}</p>
            <p className="text-[10px] text-muted-foreground">{members[0].task}</p>
          </div>
        </motion.div>

        {/* Connection lines */}
        {active && (
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="w-0.5 h-4 bg-primary/30 origin-top" />
        )}

        {/* Team members */}
        <div className="flex gap-2">
          {members.slice(1).map((m, i) => (
            <motion.div
              key={i}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 15 }}
              transition={{ delay: (i + 1) * 0.2, type: "spring" }}
              className="rounded-xl bg-secondary/50 px-3 py-2 flex flex-col items-center gap-1 text-center"
            >
              <span className="text-lg">{m.emoji}</span>
              <p className="text-[10px] font-bold text-foreground">{m.role}</p>
              <p className="text-[9px] text-muted-foreground leading-tight">{m.task}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTeamwork;
