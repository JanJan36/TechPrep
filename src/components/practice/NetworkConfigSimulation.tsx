import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Check, RotateCcw, Zap, AlertTriangle } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  scenario: string;
  fields: { label: string; placeholder: string; answer: string; hint: string }[];
}

const challenges: Challenge[] = [
  {
    id: "basic-ip",
    title: "Basic IP Configuration",
    scenario: "A workstation needs to join a 192.168.1.0/24 network. The gateway is 192.168.1.1 and DNS is 8.8.8.8. Assign it IP address 192.168.1.50.",
    fields: [
      { label: "IP Address", placeholder: "e.g. 192.168.x.x", answer: "192.168.1.50", hint: "The scenario specifies this address" },
      { label: "Subnet Mask", placeholder: "e.g. 255.255.255.0", answer: "255.255.255.0", hint: "/24 means all 24 bits → 255.255.255.0" },
      { label: "Default Gateway", placeholder: "e.g. 192.168.x.x", answer: "192.168.1.1", hint: "The router's IP on this subnet" },
      { label: "DNS Server", placeholder: "e.g. 8.8.8.8", answer: "8.8.8.8", hint: "Google's public DNS" },
    ],
  },
  {
    id: "subnet-calc",
    title: "Subnet Calculation",
    scenario: "Your company uses 10.0.0.0/16. A department needs a /24 subnet starting at 10.0.5.0. What's the broadcast address and usable host range?",
    fields: [
      { label: "Network Address", placeholder: "e.g. 10.0.5.0", answer: "10.0.5.0", hint: "The starting address of the subnet" },
      { label: "Subnet Mask", placeholder: "e.g. 255.255.255.0", answer: "255.255.255.0", hint: "/24 = 255.255.255.0" },
      { label: "Broadcast Address", placeholder: "e.g. 10.0.5.255", answer: "10.0.5.255", hint: "Last address in the /24 block" },
      { label: "First Usable Host", placeholder: "e.g. 10.0.5.1", answer: "10.0.5.1", hint: "Network address + 1" },
    ],
  },
  {
    id: "vlan-setup",
    title: "VLAN Configuration",
    scenario: "Set up VLAN 10 for the Sales department. The VLAN uses 172.16.10.0/24, gateway 172.16.10.1. Assign the first workstation IP 172.16.10.10.",
    fields: [
      { label: "VLAN ID", placeholder: "e.g. 10", answer: "10", hint: "Given in the scenario" },
      { label: "Workstation IP", placeholder: "e.g. 172.16.10.10", answer: "172.16.10.10", hint: "First workstation IP assigned" },
      { label: "Subnet Mask", placeholder: "e.g. 255.255.255.0", answer: "255.255.255.0", hint: "/24 subnet" },
      { label: "Gateway", placeholder: "e.g. 172.16.10.1", answer: "172.16.10.1", hint: "VLAN's default gateway" },
    ],
  },
];

const NetworkConfigSimulation = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const challenge = challenges[currentChallenge];

  const handleSubmit = () => {
    const r = challenge.fields.map((f, i) => answers[i].trim() === f.answer);
    setResults(r);
    setSubmitted(true);
  };

  const handleNext = () => {
    setCurrentChallenge((c) => Math.min(c + 1, challenges.length - 1));
    setAnswers(Array(4).fill(""));
    setSubmitted(false);
    setResults([]);
    setShowHints(false);
  };

  const handleReset = () => {
    setAnswers(Array(4).fill(""));
    setSubmitted(false);
    setResults([]);
    setShowHints(false);
  };

  const allCorrect = results.length > 0 && results.every(Boolean);
  const score = results.filter(Boolean).length;

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-info/20 bg-info/5 px-4 py-1.5 text-xs font-semibold text-info">
            <Network className="h-3.5 w-3.5" />
            Network Configuration
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Network Config Exercises</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Configure network settings for real-world scenarios. Fill in the correct values!
          </p>
        </div>

        {/* Challenge selector */}
        <div className="flex gap-2 justify-center">
          {challenges.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setCurrentChallenge(i);
                setAnswers(Array(4).fill(""));
                setSubmitted(false);
                setResults([]);
                setShowHints(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                i === currentChallenge
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {i + 1}. {c.title}
            </button>
          ))}
        </div>

        {/* Scenario */}
        <AnimatePresence mode="wait">
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-border bg-secondary/30 p-4">
              <p className="text-xs font-semibold text-foreground mb-2">📋 Scenario</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{challenge.scenario}</p>
            </div>

            {/* Input fields styled as terminal */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <span className="text-[10px] text-muted-foreground ml-2 font-mono">network-config.sh</span>
              </div>
              <div className="p-4 space-y-4">
                {challenge.fields.map((field, i) => (
                  <div key={field.label} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-foreground">{field.label}</label>
                      {submitted && (
                        <span className={`text-[10px] font-bold ${results[i] ? "text-accent" : "text-destructive"}`}>
                          {results[i] ? "✓ Correct" : `✗ Expected: ${field.answer}`}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={answers[i]}
                      onChange={(e) => {
                        const next = [...answers];
                        next[i] = e.target.value;
                        setAnswers(next);
                      }}
                      disabled={submitted}
                      placeholder={field.placeholder}
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        submitted
                          ? results[i]
                            ? "border-accent/50 bg-accent/5 text-foreground"
                            : "border-destructive/30 bg-destructive/5 text-foreground"
                          : "border-border bg-background text-foreground placeholder:text-muted-foreground"
                      }`}
                    />
                    {showHints && !submitted && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[11px] text-info flex items-center gap-1"
                      >
                        <AlertTriangle className="h-3 w-3" /> {field.hint}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl border p-5 text-center space-y-3 ${
                allCorrect ? "border-accent bg-accent/5" : "border-warning bg-warning/5"
              }`}
            >
              <div className="text-3xl">{allCorrect ? "🌐" : "⚙️"}</div>
              <p className="font-display font-bold text-lg text-foreground">
                {allCorrect ? "Network Configured!" : `${score} / ${challenge.fields.length} Correct`}
              </p>
              {allCorrect && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning">
                  <Zap className="h-3 w-3" /> +30 XP
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-3">
          {!submitted && (
            <>
              <button
                onClick={() => setShowHints(!showHints)}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {showHints ? "Hide Hints" : "💡 Hints"}
              </button>
              <button
                onClick={handleSubmit}
                disabled={answers.some((a) => !a.trim())}
                className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Submit Configuration
              </button>
            </>
          )}
          {submitted && (
            <>
              <button
                onClick={handleReset}
                className="flex-1 rounded-xl border border-border bg-card py-3 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Retry
              </button>
              {currentChallenge < challenges.length - 1 && (
                <button
                  onClick={handleNext}
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Next Challenge →
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkConfigSimulation;
