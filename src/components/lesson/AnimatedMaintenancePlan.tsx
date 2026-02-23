import { motion } from "framer-motion";
import { useState } from "react";
import { ClipboardList, Wrench, ShieldCheck, Clock } from "lucide-react";

const phases = [
  { label: "Identify", icon: ClipboardList, color: "bg-info/20 text-info", items: ["Gather fault reports", "Review system logs", "Check warranty status"] },
  { label: "Prepare", icon: Wrench, color: "bg-primary/20 text-primary", items: ["Select tools & parts", "Create backup", "Schedule downtime"] },
  { label: "Execute", icon: Clock, color: "bg-warning/20 text-warning", items: ["Follow repair procedure", "Document each step", "Test incrementally"] },
  { label: "Verify", icon: ShieldCheck, color: "bg-accent/20 text-accent", items: ["Run diagnostics", "User acceptance test", "Update records"] },
];

const AnimatedMaintenancePlan = () => {
  const [activePhase, setActivePhase] = useState(-1);

  const play = () => {
    setActivePhase(0);
    phases.forEach((_, i) => {
      setTimeout(() => setActivePhase(i), (i + 1) * 1000);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">📋 Maintenance Workflow</h4>
        <button
          onClick={play}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {activePhase >= 0 ? "↻ Replay" : "▶ Show Plan"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {phases.map((phase, i) => {
          const Icon = phase.icon;
          const active = i <= activePhase;
          return (
            <motion.div
              key={i}
              animate={{ opacity: active ? 1 : 0.25, scale: active ? 1 : 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-lg bg-secondary/50 p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${phase.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-foreground">{phase.label}</span>
              </div>
              <div className="space-y-1">
                {phase.items.map((item, j) => (
                  <motion.p
                    key={j}
                    animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : -5 }}
                    transition={{ delay: j * 0.1 }}
                    className="text-[10px] text-muted-foreground flex items-start gap-1"
                  >
                    <span className="text-primary mt-0.5">•</span> {item}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedMaintenancePlan;
