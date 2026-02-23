import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HardDrive, Download, Settings, CheckCircle2 } from "lucide-react";

const installSteps = [
  { icon: HardDrive, label: "Boot from USB", desc: "BIOS loads installer", progress: 10 },
  { icon: Settings, label: "Partitioning", desc: "Creating disk partitions", progress: 25 },
  { icon: Download, label: "Copying Files", desc: "Installing system files...", progress: 55 },
  { icon: Download, label: "Installing Features", desc: "Setting up components...", progress: 75 },
  { icon: Settings, label: "Configuring", desc: "Finalizing settings...", progress: 90 },
  { icon: CheckCircle2, label: "Complete!", desc: "OS installed successfully", progress: 100 },
];

const AnimatedOSInstall = () => {
  const [step, setStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || step < 0) return;
    if (step >= installSteps.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep(s => s + 1), 1200);
    return () => clearTimeout(timer);
  }, [step, isPlaying]);

  const play = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const current = step >= 0 ? installSteps[step] : null;

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">💿 OS Installation Process</h4>
        <button
          onClick={play}
          disabled={isPlaying}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPlaying ? "Installing..." : "▶ Simulate Install"}
        </button>
      </div>

      {/* Simulated screen */}
      <div className="bg-slate-900 rounded-lg p-4 min-h-[120px] flex flex-col items-center justify-center">
        {current ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={step < installSteps.length - 1 ? { rotate: 360 } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <current.icon className={`h-8 w-8 mx-auto ${step === installSteps.length - 1 ? "text-green-400" : "text-blue-400"}`} />
            </motion.div>
            <p className="text-white text-sm font-medium mt-2">{current.label}</p>
            <p className="text-slate-400 text-xs mt-0.5">{current.desc}</p>

            {/* Progress bar */}
            <div className="mt-3 w-48 mx-auto h-2 rounded-full bg-slate-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${current.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${step === installSteps.length - 1 ? "bg-green-500" : "bg-blue-500"}`}
              />
            </div>
            <p className="text-slate-500 text-[10px] mt-1">{current.progress}%</p>
          </motion.div>
        ) : (
          <p className="text-slate-500 text-xs">Click "Simulate Install" to watch the process</p>
        )}
      </div>

      {/* Step checklist */}
      <div className="grid grid-cols-2 gap-1.5">
        {installSteps.map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i <= step ? 1 : 0.3 }}
            className="flex items-center gap-1.5 text-[11px]"
          >
            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${i <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
              {i < step ? "✓" : i + 1}
            </div>
            <span className="text-foreground">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedOSInstall;
