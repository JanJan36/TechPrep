import { motion } from "framer-motion";
import { useState } from "react";

const components = [
  { label: "PSU", x: 10, y: 50, w: 60, h: 30 },
  { label: "MOBO", x: 90, y: 30, w: 80, h: 60 },
  { label: "CPU", x: 105, y: 42, w: 30, h: 20 },
  { label: "RAM", x: 145, y: 42, w: 15, h: 20 },
  { label: "GPU", x: 105, y: 70, w: 50, h: 12 },
  { label: "SSD", x: 190, y: 50, w: 45, h: 25 },
];

const connections = [
  { x1: 70, y1: 65, x2: 90, y2: 60 },
  { x1: 170, y1: 60, x2: 190, y2: 62 },
  { x1: 135, y1: 52, x2: 145, y2: 52 },
];

const AnimatedSchematic = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">📐 System Schematic</h4>
        <button
          onClick={() => setRevealed(!revealed)}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {revealed ? "Reset" : "▶ Show Diagram"}
        </button>
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 overflow-hidden">
        <svg viewBox="0 0 250 110" className="w-full h-auto">
          {/* Connection lines */}
          {connections.map((conn, i) => (
            <motion.line
              key={`c-${i}`}
              x1={conn.x1} y1={conn.y1} x2={conn.x2} y2={conn.y2}
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              animate={{ opacity: revealed ? 1 : 0, pathLength: revealed ? 1 : 0 }}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
            />
          ))}
          {/* Components */}
          {components.map((comp, i) => (
            <motion.g
              key={i}
              animate={{ opacity: revealed ? 1 : 0.1, scale: revealed ? 1 : 0.8 }}
              transition={{ delay: i * 0.15, type: "spring" }}
            >
              <rect
                x={comp.x} y={comp.y} width={comp.w} height={comp.h}
                rx="4"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                opacity={0.8}
              />
              <text
                x={comp.x + comp.w / 2} y={comp.y + comp.h / 2 + 3}
                textAnchor="middle"
                fontSize="7"
                fontWeight="bold"
                fill="hsl(var(--foreground))"
              >
                {comp.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {revealed && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[11px] text-muted-foreground text-center">
          Schematic shows component layout and power/data connections
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedSchematic;
