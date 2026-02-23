import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Check, RotateCcw, Zap, ChevronRight } from "lucide-react";

interface Step {
  title: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const installSteps: Step[] = [
  {
    title: "Boot Priority",
    question: "You've inserted a bootable USB. What do you need to change in BIOS to boot from it?",
    options: ["Disable Secure Boot", "Set USB as first boot device", "Enable virtualization", "Change SATA mode to AHCI"],
    correct: 1,
    explanation: "The boot order must prioritize USB so the system loads the installer from the USB drive instead of the HDD/SSD.",
  },
  {
    title: "Partition Setup",
    question: "During Windows installation, you see an unallocated 500GB drive. What should you do?",
    options: ["Format it as FAT32", "Create a new partition and format as NTFS", "Leave it unallocated and continue", "Convert to dynamic disk"],
    correct: 1,
    explanation: "Windows requires an NTFS partition. Creating and formatting a new partition prepares the drive for the OS installation.",
  },
  {
    title: "Edition Selection",
    question: "For a business workstation that needs to join a domain, which Windows edition is appropriate?",
    options: ["Windows Home", "Windows Pro", "Windows S Mode", "Windows Education"],
    correct: 1,
    explanation: "Windows Pro supports domain joining, Group Policy, and BitLocker — essential features for business environments.",
  },
  {
    title: "Driver Installation",
    question: "After OS installation, the display is at low resolution and ethernet doesn't work. What's the priority?",
    options: ["Install Office first", "Install chipset and network drivers from motherboard manufacturer", "Run Windows Update only", "Install antivirus immediately"],
    correct: 1,
    explanation: "Chipset drivers enable core motherboard features, and network drivers allow you to connect online for remaining updates.",
  },
  {
    title: "Post-Install",
    question: "OS and drivers are installed. What's the essential final step before handing off the PC?",
    options: ["Install games", "Run Windows Update and verify all devices in Device Manager", "Change the wallpaper", "Overclock the CPU"],
    correct: 1,
    explanation: "Windows Update patches security vulnerabilities and may install remaining drivers. Device Manager confirms all hardware is recognized.",
  },
];

const OSInstallSimulation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = installSteps[currentStep];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
    if (index === step.correct) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (currentStep < installSteps.length - 1) {
      setCurrentStep((s) => s + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setAnswered(false);
    setCorrectCount(0);
    setCompleted(false);
  };

  const progress = ((currentStep + (answered ? 1 : 0)) / installSteps.length) * 100;

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <Monitor className="h-3.5 w-3.5" />
            OS Installation Walkthrough
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Install an Operating System</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Walk through a complete OS installation from BIOS to post-install configuration.
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
            <span>Step {currentStep + 1} of {installSteps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-primary" transition={{ duration: 0.4 }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-4"
            >
              {/* Step title */}
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                  {step.title}
                </p>
                <p className="font-semibold text-foreground">{step.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {step.options.map((option, i) => {
                  const isCorrect = i === step.correct;
                  const isSelected = i === selectedOption;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                      whileTap={!answered ? { scale: 0.98 } : {}}
                      className={`w-full text-left rounded-xl border p-3.5 flex items-center gap-3 transition-colors ${
                        answered
                          ? isCorrect ? "border-accent bg-accent/10" : isSelected ? "border-destructive bg-destructive/5" : "border-border bg-card opacity-40"
                          : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        answered && isCorrect ? "bg-accent text-accent-foreground" :
                        answered && isSelected ? "bg-destructive text-destructive-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {answered && isCorrect ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-sm text-foreground">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {answered && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-xl border border-info/30 bg-info/5 p-4">
                  <p className="text-xs font-semibold text-info mb-1">💡 Why?</p>
                  <p className="text-sm text-muted-foreground">{step.explanation}</p>
                </motion.div>
              )}

              {answered && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext} className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2">
                  {currentStep < installSteps.length - 1 ? "Next Step" : "See Results"} <ChevronRight className="h-4 w-4" />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className={`rounded-xl border p-6 text-center space-y-3 ${correctCount === installSteps.length ? "border-accent bg-accent/5" : "border-warning bg-warning/5"}`}>
                <div className="text-4xl">{correctCount === installSteps.length ? "💻" : "📝"}</div>
                <p className="font-display font-bold text-xl text-foreground">{correctCount} / {installSteps.length} Correct</p>
                <p className="text-sm text-muted-foreground">
                  {correctCount === installSteps.length ? "You can install an OS like a pro!" : "Review the steps and try again."}
                </p>
                {correctCount === installSteps.length && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                    <Zap className="h-3 w-3" /> +30 XP
                  </div>
                )}
              </div>
              <button onClick={handleReset} className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2">
                <RotateCcw className="h-4 w-4" /> Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OSInstallSimulation;
