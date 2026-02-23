import { motion } from "framer-motion";
import { useState } from "react";
import { Server, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const tests = [
  { name: "DNS Resolution", command: "nslookup server.local", pass: true },
  { name: "DHCP Lease", command: "ipconfig /renew", pass: true },
  { name: "File Share Access", command: "net use \\\\server\\shared", pass: true },
  { name: "User Authentication", command: "runas /user:domain\\admin cmd", pass: true },
  { name: "Backup Verification", command: "wbadmin get status", pass: false },
];

const AnimatedServerTesting = () => {
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  const play = () => {
    setRunning(true);
    setCompleted([]);
    tests.forEach((_, i) => {
      setTimeout(() => setCompleted((prev) => [...prev, i]), (i + 1) * 900);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🖥️ Pre-Deployment Tests</h4>
        <button
          onClick={play}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {running ? "↻ Re-run" : "▶ Run Tests"}
        </button>
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 font-mono text-[11px] space-y-1.5">
        {tests.map((test, i) => {
          const isCompleted = completed.includes(i);
          const isCurrent = running && !isCompleted && (i === 0 || completed.includes(i - 1));
          return (
            <motion.div
              key={i}
              animate={{ opacity: isCompleted || isCurrent ? 1 : 0.3 }}
              className="flex items-center gap-2"
            >
              {isCompleted ? (
                test.pass ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  </motion.div>
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <XCircle className="h-3.5 w-3.5 text-destructive shrink-0" />
                  </motion.div>
                )
              ) : isCurrent ? (
                <Loader2 className="h-3.5 w-3.5 text-primary animate-spin shrink-0" />
              ) : (
                <div className="h-3.5 w-3.5 rounded-full border border-border shrink-0" />
              )}
              <span className="text-foreground">{test.name}</span>
              {isCompleted && (
                <motion.code
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-muted-foreground ml-auto text-[9px]"
                >
                  {test.command}
                </motion.code>
              )}
            </motion.div>
          );
        })}
      </div>

      {completed.length === tests.length && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-warning/30 bg-warning/5 p-2.5 text-center"
        >
          <p className="text-xs text-foreground">
            <strong className="text-warning">4/5 passed</strong> — Backup config needs attention before deployment
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedServerTesting;
