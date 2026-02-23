import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const T568B = [
  { color: "bg-orange-200", stripe: true, label: "White/Orange" },
  { color: "bg-orange-500", stripe: false, label: "Orange" },
  { color: "bg-green-200", stripe: true, label: "White/Green" },
  { color: "bg-blue-500", stripe: false, label: "Blue" },
  { color: "bg-blue-200", stripe: true, label: "White/Blue" },
  { color: "bg-green-500", stripe: false, label: "Green" },
  { color: "bg-amber-800", stripe: true, label: "White/Brown" },
  { color: "bg-amber-900", stripe: false, label: "Brown" },
];

const steps = [
  { title: "Strip jacket", desc: "Remove 2 inches of outer jacket" },
  { title: "Untwist pairs", desc: "Separate and untwist all wire pairs" },
  { title: "Arrange wires", desc: "Order wires per T568B standard" },
  { title: "Trim evenly", desc: "Cut wires to 0.5 inches" },
  { title: "Insert into RJ-45", desc: "Push wires into connector" },
  { title: "Crimp!", desc: "Use crimping tool to secure" },
];

const AnimatedCableCrimping = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentStep(i);
      }
    }, 1200);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🔌 Cable Crimping — T568B</h4>
        <button
          onClick={playAnimation}
          disabled={isPlaying}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPlaying ? "Crimping..." : "▶ Play Animation"}
        </button>
      </div>

      {/* Wire color order */}
      <div className="bg-secondary/50 rounded-lg p-4">
        <p className="text-xs font-medium text-muted-foreground mb-3">T568B Wire Order (Pin 1→8):</p>
        <div className="flex gap-1.5 justify-center">
          {T568B.map((wire, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                animate={{
                  height: currentStep >= 2 ? 48 : 32,
                  width: currentStep >= 3 ? 8 : 6,
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`rounded-full ${wire.color} ${wire.stripe ? "border border-gray-300" : ""} shadow-sm`}
              />
              <span className="text-[8px] text-muted-foreground font-medium w-8 text-center leading-tight">{wire.label}</span>
            </motion.div>
          ))}
        </div>

        {/* RJ-45 connector visual */}
        <AnimatePresence>
          {currentStep >= 4 && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-3 mx-auto w-24 h-8 rounded-b-lg border-2 border-muted-foreground/30 bg-muted/50 flex items-center justify-center"
            >
              <div className="flex gap-0.5">
                {T568B.map((wire, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: 16 }}
                    transition={{ delay: i * 0.08 }}
                    className={`w-1 rounded-sm ${wire.color}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep >= 5 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-2 text-xs font-bold text-accent"
          >
            ✅ Cable crimped successfully!
          </motion.p>
        )}
      </div>

      {/* Step progress */}
      <div className="space-y-1.5">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: i <= currentStep ? 1 : 0.3,
              x: i === currentStep ? 4 : 0,
            }}
            className="flex items-center gap-2 text-xs"
          >
            <motion.div
              animate={{
                backgroundColor: i < currentStep ? "hsl(var(--accent))" : i === currentStep ? "hsl(var(--primary))" : "hsl(var(--muted))",
                scale: i === currentStep ? 1.15 : 1,
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            >
              {i < currentStep ? "✓" : i + 1}
            </motion.div>
            <span className="font-medium text-foreground">{s.title}</span>
            <span className="text-muted-foreground hidden sm:inline">— {s.desc}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCableCrimping;
