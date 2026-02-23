import { motion } from "framer-motion";
import { useState } from "react";
import { Monitor, Cpu, HardDrive, Wifi, CheckCircle2, XCircle } from "lucide-react";

const checks = [
  { component: "CPU", icon: Cpu, status: "OK", temp: "42°C", detail: "Within normal range" },
  { component: "Storage", icon: HardDrive, status: "OK", temp: "36°C", detail: "SMART: Healthy" },
  { component: "Network", icon: Wifi, status: "OK", temp: "—", detail: "Ping: 2ms" },
  { component: "Display", icon: Monitor, status: "OK", temp: "—", detail: "1920×1080 @ 60Hz" },
];

const AnimatedSystemInspect = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState<number[]>([]);

  const play = () => {
    setScanning(true);
    setScanned([]);
    checks.forEach((_, i) => {
      setTimeout(() => setScanned((prev) => [...prev, i]), (i + 1) * 700);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🔍 System Inspection</h4>
        <button
          onClick={play}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {scanning ? "↻ Re-scan" : "▶ Run Inspection"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {checks.map((check, i) => {
          const Icon = check.icon;
          const done = scanned.includes(i);
          return (
            <motion.div
              key={i}
              animate={{ opacity: done ? 1 : 0.3, scale: done ? 1 : 0.9 }}
              transition={{ type: "spring" }}
              className="rounded-lg bg-secondary/50 p-3 flex flex-col items-center gap-1.5"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-bold text-foreground">{check.component}</span>
              {done && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-accent" />
                  <span className="text-[10px] text-accent font-semibold">{check.status}</span>
                </motion.div>
              )}
              {done && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-muted-foreground">
                  {check.detail}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>

      {scanned.length === checks.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-[11px] text-accent font-semibold">✅ All components passed inspection</p>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedSystemInspect;
