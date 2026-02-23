import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Monitor, Router, Globe, Server } from "lucide-react";

const nodes = [
  { id: "pc", label: "Your PC", icon: Monitor, x: 10, y: 50 },
  { id: "router", label: "Router", icon: Router, x: 38, y: 50 },
  { id: "server", label: "DNS Server", icon: Server, x: 65, y: 25 },
  { id: "internet", label: "Internet", icon: Globe, x: 65, y: 75 },
];

const AnimatedNetworkFlow = () => {
  const [activePacket, setActivePacket] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = () => {
    setIsPlaying(true);
    setActivePacket(0);
  };

  useEffect(() => {
    if (activePacket < 0 || !isPlaying) return;
    const timer = setTimeout(() => {
      if (activePacket >= 3) {
        setIsPlaying(false);
        setActivePacket(-1);
      } else {
        setActivePacket(activePacket + 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [activePacket, isPlaying]);

  const packetPaths = [
    { from: nodes[0], to: nodes[1], label: "Request sent to router" },
    { from: nodes[1], to: nodes[2], label: "DNS lookup" },
    { from: nodes[2], to: nodes[1], label: "IP resolved" },
    { from: nodes[1], to: nodes[3], label: "Connected to internet!" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">🌐 Network Packet Flow</h4>
        <button
          onClick={playAnimation}
          disabled={isPlaying}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPlaying ? "Sending..." : "▶ Send Packet"}
        </button>
      </div>

      <div className="relative bg-secondary/50 rounded-lg p-4 h-48 overflow-hidden">
        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive =
            isPlaying &&
            activePacket >= 0 &&
            (packetPaths[activePacket]?.from.id === node.id || packetPaths[activePacket]?.to.id === node.id);

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
              animate={{ scale: isActive ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{
                  boxShadow: isActive ? "0 0 20px hsl(var(--primary) / 0.5)" : "0 2px 8px rgba(0,0,0,0.1)",
                  borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                }}
                className="w-12 h-12 rounded-xl bg-card border-2 flex items-center justify-center"
              >
                <Icon className="h-5 w-5 text-primary" />
              </motion.div>
              <span className="text-[10px] font-semibold text-foreground">{node.label}</span>
            </motion.div>
          );
        })}

        {/* Animated packet */}
        {isPlaying && activePacket >= 0 && activePacket < packetPaths.length && (
          <motion.div
            key={activePacket}
            initial={{
              left: `${packetPaths[activePacket].from.x}%`,
              top: `${packetPaths[activePacket].from.y}%`,
              opacity: 1,
            }}
            animate={{
              left: `${packetPaths[activePacket].to.x}%`,
              top: `${packetPaths[activePacket].to.y}%`,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-3 h-3 bg-warning rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 10 }}
          />
        )}
      </div>

      {/* Status message */}
      <div className="text-center h-6">
        {isPlaying && activePacket >= 0 && activePacket < packetPaths.length && (
          <motion.p
            key={activePacket}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium text-primary"
          >
            📦 {packetPaths[activePacket].label}
          </motion.p>
        )}
        {!isPlaying && activePacket === -1 && (
          <p className="text-xs text-muted-foreground">Click "Send Packet" to see how data flows through a network</p>
        )}
      </div>
    </div>
  );
};

export default AnimatedNetworkFlow;
