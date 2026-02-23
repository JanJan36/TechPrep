import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, Wrench, CheckCircle2, ArrowRight } from "lucide-react";

const repairs = [
  { fault: "No Display", cause: "Loose GPU cable", fix: "Reseat graphics card", icon: "🖥️" },
  { fault: "Slow Boot", cause: "Failing HDD", fix: "Replace with SSD", icon: "💽" },
  { fault: "No Network", cause: "Bad NIC driver", fix: "Reinstall driver", icon: "🌐" },
];

const AnimatedRepairFlow = () => {
  const [activeRepair, setActiveRepair] = useState(-1);

  const play = () => {
    setActiveRepair(0);
    repairs.forEach((_, i) => {
      setTimeout(() => setActiveRepair(i), (i + 1) * 1200);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🔧 Repair Scenarios</h4>
        <button
          onClick={play}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {activeRepair >= 0 ? "↻ Replay" : "▶ Show Repairs"}
        </button>
      </div>

      <div className="space-y-2.5">
        {repairs.map((repair, i) => {
          const active = i <= activeRepair;
          return (
            <motion.div
              key={i}
              animate={{ opacity: active ? 1 : 0.2, y: active ? 0 : 10 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-lg bg-secondary/50 p-3"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 bg-destructive/10 rounded-lg px-2 py-1">
                  <AlertTriangle className="h-3 w-3 text-destructive" />
                  <span className="text-[10px] font-bold text-destructive">{repair.fault}</span>
                </div>
                <motion.div animate={{ opacity: active ? 1 : 0 }}>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </motion.div>
                <div className="flex items-center gap-1.5 bg-warning/10 rounded-lg px-2 py-1">
                  <Wrench className="h-3 w-3 text-warning" />
                  <span className="text-[10px] font-semibold text-warning">{repair.cause}</span>
                </div>
                <motion.div animate={{ opacity: active ? 1 : 0 }}>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </motion.div>
                <div className="flex items-center gap-1.5 bg-accent/10 rounded-lg px-2 py-1">
                  <CheckCircle2 className="h-3 w-3 text-accent" />
                  <span className="text-[10px] font-semibold text-accent">{repair.fix}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedRepairFlow;
