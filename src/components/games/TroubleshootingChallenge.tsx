import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, XCircle, Clock, Trophy, RotateCcw, ArrowRight } from "lucide-react";

interface Scenario {
  id: number;
  title: string;
  symptom: string;
  emoji: string;
  timeLimit: number;
  steps: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "PC Won't Turn On",
    symptom: "A user reports their desktop won't power on at all — no lights, no fans, nothing.",
    emoji: "🖥️",
    timeLimit: 45,
    steps: [
      {
        question: "What should you check FIRST?",
        options: ["Replace the motherboard", "Check if the power cable is plugged in", "Reinstall the OS", "Update BIOS"],
        correctIndex: 1,
        explanation: "Always start with the simplest fix — verify the power cable is connected and the outlet works.",
      },
      {
        question: "The cable is plugged in. The outlet works. What next?",
        options: ["Check the PSU switch is ON", "Open the case and reseat the CPU", "Buy a new PSU", "Flash the BIOS"],
        correctIndex: 0,
        explanation: "Many PSUs have a physical ON/OFF switch on the back. Check it before opening the case.",
      },
      {
        question: "PSU switch is ON but still nothing. What do you test?",
        options: ["Test the PSU with a multimeter or paperclip test", "Replace all RAM", "Swap the monitor cable", "Check Wi-Fi settings"],
        correctIndex: 0,
        explanation: "The PSU paperclip test or a multimeter confirms if the PSU is outputting power.",
      },
    ],
  },
  {
    id: 2,
    title: "Blue Screen of Death",
    symptom: "A workstation frequently crashes to a Blue Screen (BSOD) with error 'IRQL_NOT_LESS_OR_EQUAL'.",
    emoji: "💀",
    timeLimit: 40,
    steps: [
      {
        question: "This BSOD error is most commonly caused by?",
        options: ["Corrupted fonts", "Faulty RAM or incompatible drivers", "Screen resolution too high", "Slow internet"],
        correctIndex: 1,
        explanation: "IRQL_NOT_LESS_OR_EQUAL typically indicates bad RAM or a faulty/incompatible driver.",
      },
      {
        question: "What built-in tool tests RAM?",
        options: ["Disk Cleanup", "Windows Memory Diagnostic (mdsched.exe)", "Device Manager", "Task Scheduler"],
        correctIndex: 1,
        explanation: "Windows Memory Diagnostic (mdsched.exe) is the built-in RAM testing tool.",
      },
      {
        question: "RAM passes the test. What's the next step?",
        options: ["Replace the monitor", "Roll back recently updated drivers", "Defragment the SSD", "Reinstall Office"],
        correctIndex: 1,
        explanation: "If RAM is fine, the issue is likely a recently updated or incompatible driver. Rolling back resolves it.",
      },
    ],
  },
  {
    id: 3,
    title: "No Internet Access",
    symptom: "A laptop shows 'Connected, no internet' on Wi-Fi. Other devices on the same network work fine.",
    emoji: "📶",
    timeLimit: 40,
    steps: [
      {
        question: "Since other devices work, the problem is likely?",
        options: ["The ISP is down", "The router is broken", "A problem with this specific laptop", "The modem needs replacing"],
        correctIndex: 2,
        explanation: "If other devices work, the issue is isolated to this laptop — not the network or ISP.",
      },
      {
        question: "What's a quick first troubleshooting command?",
        options: ["format C:", "ipconfig /release && ipconfig /renew", "del /f /s *.*", "shutdown /s"],
        correctIndex: 1,
        explanation: "Releasing and renewing the IP address often fixes 'connected, no internet' issues.",
      },
      {
        question: "Still no internet after IP renewal. What next?",
        options: ["Reset TCP/IP stack with 'netsh int ip reset'", "Replace the Wi-Fi card", "Reinstall Windows", "Change the monitor"],
        correctIndex: 0,
        explanation: "Resetting the TCP/IP stack fixes corrupted network settings without hardware changes.",
      },
    ],
  },
  {
    id: 4,
    title: "Printer Not Responding",
    symptom: "A network printer shows 'Offline' in the print queue despite being powered on and connected.",
    emoji: "🖨️",
    timeLimit: 35,
    steps: [
      {
        question: "What do you check first?",
        options: ["Replace printer ink", "Ping the printer's IP address", "Reinstall the OS", "Change the paper tray"],
        correctIndex: 1,
        explanation: "Pinging the printer's IP confirms if there's network connectivity to the device.",
      },
      {
        question: "Ping succeeds. The printer is reachable. What's next?",
        options: ["Restart the Print Spooler service", "Buy a new printer", "Update the BIOS", "Change DNS settings"],
        correctIndex: 0,
        explanation: "A stuck or crashed Print Spooler service is the #1 cause of 'Offline' status when the printer is reachable.",
      },
    ],
  },
];

const TroubleshootingChallenge = () => {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(scenarios[0].timeLimit);
  const [timedOut, setTimedOut] = useState(false);
  const [finished, setFinished] = useState(false);

  const scenario = scenarios[scenarioIdx];
  const step = scenario.steps[stepIdx];

  useEffect(() => {
    if (showExplanation || finished) return;
    if (timeLeft <= 0) {
      setTimedOut(true);
      setShowExplanation(true);
      setTotalSteps((t) => t + 1);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, showExplanation, finished]);

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    setTotalSteps((t) => t + 1);
    if (idx === step.correctIndex) setTotalCorrect((c) => c + 1);
  };

  const handleNext = () => {
    setTimedOut(false);
    if (stepIdx + 1 < scenario.steps.length) {
      setStepIdx((s) => s + 1);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(scenario.timeLimit);
    } else if (scenarioIdx + 1 < scenarios.length) {
      setScenarioIdx((s) => s + 1);
      setStepIdx(0);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(scenarios[scenarioIdx + 1].timeLimit);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setScenarioIdx(0);
    setStepIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setTotalCorrect(0);
    setTotalSteps(0);
    setTimeLeft(scenarios[0].timeLimit);
    setTimedOut(false);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((totalCorrect / totalSteps) * 100);
    return (
      <div className="text-center py-10 animate-fade-in">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${pct >= 70 ? "bg-accent/10" : "bg-destructive/10"}`}
        >
          <Trophy className={`h-10 w-10 ${pct >= 70 ? "text-accent" : "text-destructive"}`} />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {pct >= 70 ? "Diagnostic Expert! 🔧" : "More practice needed!"}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {totalCorrect}/{totalSteps} correct ({pct}%)
        </p>
        {pct >= 70 && (
          <p className="mt-1 text-sm font-semibold text-warning">+30 XP earned!</p>
        )}
        <button
          onClick={handleRestart}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Scenario header */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{scenario.emoji}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">{scenario.title}</h3>
              <div className={`flex items-center gap-1 text-xs font-bold ${timeLeft <= 10 ? "text-destructive animate-pulse" : "text-muted-foreground"}`}>
                <Clock className="h-3.5 w-3.5" />
                {timeLeft}s
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{scenario.symptom}</p>
          </div>
        </div>
        {/* Time bar */}
        <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            animate={{ width: `${(timeLeft / scenario.timeLimit) * 100}%` }}
            className={`h-full rounded-full ${timeLeft <= 10 ? "bg-destructive" : "bg-accent"}`}
          />
        </div>
      </div>

      {/* Step progress dots */}
      <div className="flex items-center gap-1.5 mb-4 justify-center">
        {scenario.steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i < stepIdx ? "bg-accent" : i === stepIdx ? "bg-primary scale-125" : "bg-muted"
            }`}
          />
        ))}
        <span className="ml-2 text-[10px] text-muted-foreground">
          Scenario {scenarioIdx + 1}/{scenarios.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${scenarioIdx}-${stepIdx}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
        >
          <h3 className="font-display font-semibold text-foreground mb-3">{step.question}</h3>

          {timedOut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4 shrink-0" /> Time's up! The correct answer is shown below.
            </motion.div>
          )}

          <div className="space-y-2">
            {step.options.map((opt, idx) => {
              let style = "border-border bg-card hover:bg-secondary cursor-pointer";
              if (showExplanation) {
                if (idx === step.correctIndex) style = "border-accent bg-accent/10";
                else if (idx === selected) style = "border-destructive bg-destructive/10";
                else style = "border-border bg-card opacity-40";
              }
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleSelect(idx)}
                  disabled={showExplanation}
                  className={`w-full flex items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all ${style}`}
                >
                  <span className="text-foreground flex-1">{opt}</span>
                  {showExplanation && idx === step.correctIndex && (
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  )}
                  {showExplanation && idx === selected && idx !== step.correctIndex && (
                    <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-xl border border-info/30 bg-info/5 p-3"
            >
              <p className="text-xs text-foreground">
                <strong className="text-info">Why:</strong> {step.explanation}
              </p>
            </motion.div>
          )}

          {showExplanation && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 flex items-center justify-center gap-2"
            >
              {stepIdx + 1 < scenario.steps.length
                ? "Next Step"
                : scenarioIdx + 1 < scenarios.length
                ? "Next Scenario"
                : "See Results"}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TroubleshootingChallenge;
