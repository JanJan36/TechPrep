import { motion } from "framer-motion";
import { useState } from "react";
import { Ruler, Zap, HardDrive } from "lucide-react";

const measurements = [
  { label: "Cable Length", value: 3.5, unit: "meters", icon: Ruler, color: "text-primary", barColor: "bg-primary" },
  { label: "Voltage", value: 12.1, unit: "V DC", icon: Zap, color: "text-warning", barColor: "bg-warning" },
  { label: "Storage", value: 256, unit: "GB", icon: HardDrive, color: "text-accent", barColor: "bg-accent" },
];

const AnimatedMeasurements = () => {
  const [measuring, setMeasuring] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">📏 Measurements & Units</h4>
        <button
          onClick={() => setMeasuring(!measuring)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {measuring ? "Reset" : "▶ Measure"}
        </button>
      </div>

      <div className="space-y-3">
        {measurements.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={i}
              animate={{ opacity: measuring ? 1 : 0.3 }}
              transition={{ delay: i * 0.3 }}
              className="rounded-lg bg-secondary/50 p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`h-4 w-4 ${m.color}`} />
                <span className="text-xs font-semibold text-foreground">{m.label}</span>
                <motion.span
                  animate={measuring ? { opacity: 1 } : { opacity: 0 }}
                  className={`ml-auto text-sm font-bold font-mono ${m.color}`}
                >
                  {m.value} {m.unit}
                </motion.span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  animate={{ width: measuring ? `${(m.value / (m.label === "Storage" ? 512 : m.label === "Voltage" ? 24 : 10)) * 100}%` : "0%" }}
                  transition={{ delay: i * 0.3 + 0.2, duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${m.barColor}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedMeasurements;
