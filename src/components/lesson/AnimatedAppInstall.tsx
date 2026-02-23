import { motion } from "framer-motion";
import { useState } from "react";
import { Package, Shield, Settings, CheckCircle2 } from "lucide-react";

const apps = [
  { name: "Browser", size: "85 MB", icon: "🌐" },
  { name: "Office Suite", size: "1.2 GB", icon: "📝" },
  { name: "Antivirus", size: "340 MB", icon: "🛡️" },
  { name: "Driver Pack", size: "210 MB", icon: "⚙️" },
];

const AnimatedAppInstall = () => {
  const [installing, setInstalling] = useState(false);
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);

  const play = () => {
    setInstalling(true);
    setProgress([0, 0, 0, 0]);
    apps.forEach((_, i) => {
      const start = i * 600;
      const steps = 5;
      for (let s = 1; s <= steps; s++) {
        setTimeout(() => {
          setProgress((prev) => {
            const next = [...prev];
            next[i] = Math.min((s / steps) * 100, 100);
            return next;
          });
        }, start + s * 200);
      }
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">📦 Application Installation</h4>
        <button
          onClick={play}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {installing ? "↻ Replay" : "▶ Install All"}
        </button>
      </div>

      <div className="space-y-2.5">
        {apps.map((app, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: installing ? 1 : 0.4 }}
            transition={{ delay: i * 0.15 }}
            className="rounded-lg bg-secondary/50 px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-lg">{app.icon}</span>
              <div className="flex-1">
                <span className="text-xs font-semibold text-foreground">{app.name}</span>
                <span className="text-[10px] text-muted-foreground ml-2">{app.size}</span>
              </div>
              {progress[i] >= 100 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </motion.div>
              )}
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                animate={{ width: `${progress[i]}%` }}
                className="h-full rounded-full bg-primary"
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedAppInstall;
