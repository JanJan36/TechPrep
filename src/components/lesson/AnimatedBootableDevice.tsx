import { motion } from "framer-motion";
import { useState } from "react";
import { Usb, HardDrive, Download, CheckCircle2 } from "lucide-react";

const steps = [
  { label: "Download ISO", icon: Download, desc: "Get the OS image file (.iso)" },
  { label: "Insert USB", icon: Usb, desc: "Plug in a USB drive (8GB+)" },
  { label: "Flash Drive", icon: HardDrive, desc: "Use Rufus/Etcher to write ISO" },
  { label: "Ready!", icon: CheckCircle2, desc: "Bootable installer created" },
];

const AnimatedBootableDevice = () => {
  const [currentStep, setCurrentStep] = useState(-1);

  const play = () => {
    setCurrentStep(0);
    steps.forEach((_, i) => {
      setTimeout(() => setCurrentStep(i), (i + 1) * 800);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">💾 Bootable USB Creation</h4>
        <button
          onClick={play}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {currentStep >= 0 ? "↻ Replay" : "▶ Play"}
        </button>
      </div>

      <div className="flex items-center justify-between gap-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const active = i <= currentStep;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  scale: active ? [0.8, 1.15, 1] : 0.8,
                  opacity: active ? 1 : 0.3,
                }}
                transition={{ duration: 0.4, type: "spring" }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <motion.p
                animate={{ opacity: active ? 1 : 0.3 }}
                className="text-[10px] font-semibold text-foreground text-center"
              >
                {step.label}
              </motion.p>
              <motion.p
                animate={{ opacity: active ? 0.7 : 0 }}
                className="text-[9px] text-muted-foreground text-center leading-tight"
              >
                {step.desc}
              </motion.p>
            </div>
          );
        })}
      </div>

      {/* Connection lines */}
      <div className="flex items-center justify-center gap-1 -mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scaleX: i < currentStep ? 1 : 0,
              backgroundColor: i < currentStep ? "hsl(var(--primary))" : "hsl(var(--muted))",
            }}
            className="h-0.5 w-12 origin-left rounded-full"
            transition={{ delay: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBootableDevice;
