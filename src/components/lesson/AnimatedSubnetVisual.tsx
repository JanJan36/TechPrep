import { motion } from "framer-motion";
import { useState } from "react";
import { Monitor, Wifi } from "lucide-react";

const AnimatedSubnetVisual = () => {
  const [showDetails, setShowDetails] = useState(false);

  const devices = [
    { ip: "192.168.1.1", label: "Router", isRouter: true },
    { ip: "192.168.1.10", label: "PC 1", isRouter: false },
    { ip: "192.168.1.11", label: "PC 2", isRouter: false },
    { ip: "192.168.1.12", label: "Laptop", isRouter: false },
    { ip: "192.168.1.20", label: "Printer", isRouter: false },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🔢 Subnet Visualization</h4>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {showDetails ? "Hide Details" : "▶ Show Network"}
        </button>
      </div>

      {/* IP address breakdown */}
      <div className="bg-secondary/50 rounded-lg p-4 text-center">
        <p className="text-xs text-muted-foreground mb-2">IP Address Structure (192.168.1.0/24)</p>
        <div className="flex justify-center gap-0.5 font-mono text-sm">
          <motion.span
            animate={{ backgroundColor: showDetails ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
            className="px-3 py-1.5 rounded-l-lg text-primary-foreground font-bold"
          >
            192.168.1
          </motion.span>
          <motion.span
            animate={{ backgroundColor: showDetails ? "hsl(var(--accent))" : "hsl(var(--muted))" }}
            className="px-3 py-1.5 rounded-r-lg text-accent-foreground font-bold"
          >
            .X
          </motion.span>
        </div>
        <div className="flex justify-center gap-8 mt-1">
          <span className="text-[10px] text-primary font-semibold">Network Part</span>
          <span className="text-[10px] text-accent font-semibold">Host Part</span>
        </div>
      </div>

      {/* Devices on subnet */}
      {showDetails && (
        <div className="space-y-2">
          {devices.map((device, i) => (
            <motion.div
              key={device.ip}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
              className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.3 }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${device.isRouter ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"}`}
              >
                {device.isRouter ? <Wifi className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
              </motion.div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-foreground">{device.label}</span>
              </div>
              <code className="text-xs font-mono bg-card px-2 py-0.5 rounded border border-border">
                <span className="text-primary">192.168.1.</span>
                <span className="text-accent font-bold">{device.ip.split('.')[3]}</span>
              </code>
            </motion.div>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-[11px] text-muted-foreground text-center pt-1"
          >
            All devices share the same network prefix (192.168.1) — only the host part changes!
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default AnimatedSubnetVisual;
