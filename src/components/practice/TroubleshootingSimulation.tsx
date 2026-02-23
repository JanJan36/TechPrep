import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, X, Zap, RotateCcw, ChevronRight } from "lucide-react";

interface Scenario {
  id: string;
  title: string;
  symptom: string;
  steps: { question: string; options: string[]; correct: number; explanation: string }[];
}

const scenarios: Scenario[] = [
  {
    id: "no-display",
    title: "No Display Output",
    symptom: "A user reports their PC turns on (fans spin, LEDs light up) but there's no display output on the monitor.",
    steps: [
      {
        question: "What should you check FIRST?",
        options: ["Replace the GPU", "Check monitor cable connections", "Reinstall the OS", "Replace the motherboard"],
        correct: 1,
        explanation: "Always check the simplest solution first — loose or disconnected cables are the most common cause.",
      },
      {
        question: "The cable is secure but still no display. What next?",
        options: ["Test with a different monitor or cable", "Open the case and reseat the RAM", "Flash the BIOS", "Replace the PSU"],
        correct: 0,
        explanation: "Testing with known-good equipment helps isolate whether the issue is the monitor, cable, or the PC itself.",
      },
      {
        question: "Different monitor works. What was the issue?",
        options: ["Faulty GPU", "Faulty original monitor", "Bad RAM", "OS corruption"],
        correct: 1,
        explanation: "Since a different monitor works, the original monitor is faulty. No internal PC repair needed.",
      },
    ],
  },
  {
    id: "slow-pc",
    title: "Slow Performance",
    symptom: "A workstation that used to be fast is now extremely slow. Applications take minutes to open.",
    steps: [
      {
        question: "What's your first diagnostic step?",
        options: ["Format and reinstall", "Check Task Manager for resource usage", "Add more RAM", "Replace the hard drive"],
        correct: 1,
        explanation: "Task Manager shows CPU, memory, and disk usage — this pinpoints the bottleneck before making any changes.",
      },
      {
        question: "Disk usage shows 100% constantly. What's the likely cause?",
        options: ["CPU overheating", "Failing HDD or heavy disk I/O", "Network congestion", "Bad GPU driver"],
        correct: 1,
        explanation: "Constant 100% disk usage often means a failing/slow HDD, malware scan, or Windows Update running.",
      },
      {
        question: "The HDD shows SMART warnings. Best solution?",
        options: ["Defragment the drive", "Replace with SSD and clone data", "Increase virtual memory", "Disable antivirus"],
        correct: 1,
        explanation: "SMART warnings indicate imminent drive failure. Replace with an SSD for reliability and speed improvement.",
      },
    ],
  },
  {
    id: "no-internet",
    title: "No Internet Connection",
    symptom: "A PC is connected to the network via Ethernet but cannot access the internet. Other PCs on the same network work fine.",
    steps: [
      {
        question: "What command helps diagnose the issue?",
        options: ["ipconfig /all", "format c:", "diskpart", "sfc /scannow"],
        correct: 0,
        explanation: "ipconfig /all shows your IP configuration — you can check if you have a valid IP, gateway, and DNS.",
      },
      {
        question: "The PC has IP 169.254.x.x. What does this mean?",
        options: ["Normal static IP", "APIPA — failed to get IP from DHCP", "IPv6 address", "VPN address"],
        correct: 1,
        explanation: "169.254.x.x is an APIPA address, meaning the PC couldn't reach the DHCP server to get a proper IP.",
      },
      {
        question: "How do you fix the DHCP issue?",
        options: ["Assign a static IP", "Run ipconfig /release then ipconfig /renew", "Replace the NIC", "Reinstall Windows"],
        correct: 1,
        explanation: "Releasing and renewing forces the PC to request a new IP from the DHCP server.",
      },
    ],
  },
];

const TroubleshootingSimulation = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios[currentScenario];
  const step = scenario.steps[currentStep];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);
    if (index === step.correct) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep((s) => s + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleNewScenario = (i: number) => {
    setCurrentScenario(i);
    setCurrentStep(0);
    setSelectedOption(null);
    setAnswered(false);
    setCorrectCount(0);
    setCompleted(false);
  };

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-warning/20 bg-warning/5 px-4 py-1.5 text-xs font-semibold text-warning">
            <Search className="h-3.5 w-3.5" />
            Troubleshooting Simulation
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Diagnose & Fix</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Walk through real troubleshooting scenarios step-by-step. Choose the best action at each stage.
          </p>
        </div>

        {/* Scenario selector */}
        <div className="flex gap-2 justify-center flex-wrap">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleNewScenario(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                i === currentScenario
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={`${currentScenario}-${currentStep}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-4"
            >
              {/* Symptom */}
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                <p className="text-xs font-semibold text-destructive mb-1">🚨 Reported Issue</p>
                <p className="text-sm text-foreground">{scenario.symptom}</p>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2">
                {scenario.steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i < currentStep ? "bg-accent" : i === currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground mb-1">Step {currentStep + 1} of {scenario.steps.length}</p>
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
                      className={`w-full text-left rounded-xl border p-4 flex items-center gap-3 transition-colors ${
                        answered
                          ? isCorrect
                            ? "border-accent bg-accent/10"
                            : isSelected
                              ? "border-destructive bg-destructive/5"
                              : "border-border bg-card opacity-50"
                          : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                        answered && isCorrect ? "bg-accent text-accent-foreground" :
                        answered && isSelected ? "bg-destructive text-destructive-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {answered && isCorrect ? <Check className="h-3.5 w-3.5" /> :
                         answered && isSelected ? <X className="h-3.5 w-3.5" /> :
                         String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-sm text-foreground">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-xl border border-info/30 bg-info/5 p-4"
                  >
                    <p className="text-xs font-semibold text-info mb-1">💡 Explanation</p>
                    <p className="text-sm text-muted-foreground">{step.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              {answered && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleNext}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {currentStep < scenario.steps.length - 1 ? "Next Step" : "See Results"}
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className={`rounded-xl border p-6 text-center space-y-3 ${
                correctCount === scenario.steps.length ? "border-accent bg-accent/5" : "border-warning bg-warning/5"
              }`}>
                <div className="text-4xl">{correctCount === scenario.steps.length ? "🏆" : "📝"}</div>
                <p className="font-display font-bold text-xl text-foreground">
                  {correctCount} / {scenario.steps.length} Correct
                </p>
                <p className="text-sm text-muted-foreground">
                  {correctCount === scenario.steps.length
                    ? "Expert troubleshooter! You diagnosed the issue perfectly."
                    : "Good effort! Review the explanations and try again."}
                </p>
                {correctCount === scenario.steps.length && (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                    <Zap className="h-3 w-3" /> +35 XP
                  </div>
                )}
              </div>
              <button
                onClick={() => handleNewScenario(currentScenario)}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TroubleshootingSimulation;
