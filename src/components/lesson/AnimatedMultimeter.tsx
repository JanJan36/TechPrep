import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const modes = [
  { name: "DC Voltage", symbol: "V⎓", reading: "12.04", unit: "V", desc: "Measuring PSU output" },
  { name: "AC Voltage", symbol: "V~", reading: "220.3", unit: "V", desc: "Measuring wall outlet" },
  { name: "Resistance", symbol: "Ω", reading: "4.7K", unit: "Ω", desc: "Testing a resistor" },
  { name: "Continuity", symbol: "🔊", reading: "BEEP", unit: "", desc: "Circuit is complete!" },
];

const AnimatedMultimeter = () => {
  const [modeIdx, setModeIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayValue, setDisplayValue] = useState("0.00");

  const cycle = () => {
    setIsAnimating(true);
    setModeIdx(0);
    setDisplayValue("---");
  };

  useEffect(() => {
    if (!isAnimating) return;
    const t1 = setTimeout(() => setDisplayValue(modes[modeIdx].reading), 600);
    const t2 = setTimeout(() => {
      if (modeIdx < modes.length - 1) {
        setModeIdx(i => i + 1);
        setDisplayValue("---");
      } else {
        setIsAnimating(false);
      }
    }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [modeIdx, isAnimating]);

  const mode = modes[modeIdx];

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🔧 Multimeter Readings</h4>
        <button
          onClick={cycle}
          disabled={isAnimating}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isAnimating ? "Testing..." : "▶ Test Components"}
        </button>
      </div>

      {/* Multimeter display */}
      <div className="bg-slate-800 rounded-xl p-4 mx-auto max-w-[220px]">
        <div className="bg-lime-300/90 rounded-lg p-3 text-center">
          <p className="text-[10px] text-slate-600 font-medium">{mode.name} ({mode.symbol})</p>
          <motion.p
            key={`${modeIdx}-${displayValue}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-3xl font-bold text-slate-900"
          >
            {displayValue}
          </motion.p>
          <p className="text-xs text-slate-600 font-medium">{mode.unit}</p>
        </div>

        {/* Dial indicator */}
        <div className="mt-3 flex justify-center gap-2">
          {modes.map((m, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === modeIdx ? 1.2 : 1,
                backgroundColor: i === modeIdx ? "#84cc16" : "#475569",
              }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
            >
              {m.symbol}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current reading explanation */}
      <motion.div
        key={modeIdx}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-medium text-foreground">{mode.name}</p>
        <p className="text-[11px] text-muted-foreground">{mode.desc}</p>
      </motion.div>
    </div>
  );
};

export default AnimatedMultimeter;
