import { motion } from "framer-motion";
import { useState } from "react";
import { Monitor, Cpu, Database, HardDrive, Battery, Fan } from "lucide-react";

const parts = [
  { id: "case", label: "Case", icon: Monitor, color: "hsl(var(--muted-foreground))", x: 0, y: 0, desc: "The enclosure that holds all parts" },
  { id: "mobo", label: "Motherboard", icon: Cpu, color: "hsl(var(--primary))", x: 0, y: 0, desc: "Main circuit board — install into case" },
  { id: "cpu", label: "CPU", icon: Cpu, color: "hsl(var(--destructive))", x: -30, y: -20, desc: "Processor — align triangle & lock in" },
  { id: "ram", label: "RAM", icon: Database, color: "hsl(var(--accent))", x: 30, y: -20, desc: "Memory sticks — push until clips lock" },
  { id: "storage", label: "SSD/HDD", icon: HardDrive, color: "hsl(var(--warning))", x: -30, y: 20, desc: "Storage drive — mount in drive bay" },
  { id: "psu", label: "PSU", icon: Battery, color: "hsl(var(--info))", x: 30, y: 20, desc: "Power supply — connect all cables" },
  { id: "cooler", label: "Cooler", icon: Fan, color: "hsl(var(--success))", x: 0, y: 30, desc: "CPU cooler — apply thermal paste first" },
];

const AnimatedPCAssembly = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    setStep(0);
    setIsPlaying(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= parts.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setStep(i);
      }
    }, 800);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🖥️ PC Assembly Order</h4>
        <button
          onClick={playAnimation}
          disabled={isPlaying}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPlaying ? "Assembling..." : "▶ Play Animation"}
        </button>
      </div>

      {/* Visual assembly area */}
      <div className="relative bg-secondary/50 rounded-lg p-6 min-h-[200px] flex items-center justify-center overflow-hidden">
        <div className="relative w-48 h-48">
          {parts.map((part, i) => {
            const isVisible = i <= step;
            const Icon = part.icon;
            const angle = (i / parts.length) * Math.PI * 2 - Math.PI / 2;
            const radius = i === 0 ? 0 : 70;
            const cx = Math.cos(angle) * radius;
            const cy = Math.sin(angle) * radius;

            return (
              <motion.div
                key={part.id}
                initial={{ opacity: 0, scale: 0, x: cx, y: -60 }}
                animate={isVisible ? {
                  opacity: 1,
                  scale: 1,
                  x: cx,
                  y: cy,
                } : { opacity: 0, scale: 0, x: cx, y: -60 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: i === step && isPlaying ? 0.1 : 0 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{ backgroundColor: `${part.color}`, color: "white" }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-semibold text-foreground whitespace-nowrap">{part.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Step indicator */}
      <div className="space-y-2">
        {parts.map((part, i) => (
          <motion.div
            key={part.id}
            initial={false}
            animate={{ opacity: i <= step ? 1 : 0.3 }}
            className="flex items-center gap-2 text-xs"
          >
            <motion.div
              animate={{
                backgroundColor: i <= step ? "hsl(var(--primary))" : "hsl(var(--muted))",
                scale: i === step ? 1.2 : 1,
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0"
            >
              {i + 1}
            </motion.div>
            <span className="font-medium text-foreground">{part.label}</span>
            <span className="text-muted-foreground">— {part.desc}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedPCAssembly;
