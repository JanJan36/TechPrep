import { Link } from "react-router-dom";
import { Wrench, Cpu, Cable, Network, Search, Monitor, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const simulations = [
  {
    id: "pc-assembly",
    title: "PC Assembly",
    description: "Drag & drop components in the correct assembly order",
    icon: Cpu,
    difficulty: "Beginner",
    xp: 25,
    color: "primary",
  },
  {
    id: "cable-crimping",
    title: "Cable Crimping — T568B",
    description: "Arrange 8 wires in the correct T568B color order",
    icon: Cable,
    difficulty: "Beginner",
    xp: 25,
    color: "accent",
  },
  {
    id: "network-config",
    title: "Network Configuration",
    description: "Configure IP addresses, subnets, and VLANs for real scenarios",
    icon: Network,
    difficulty: "Intermediate",
    xp: 30,
    color: "info",
  },
  {
    id: "troubleshooting",
    title: "Diagnose & Fix",
    description: "Walk through real troubleshooting scenarios step-by-step",
    icon: Search,
    difficulty: "Intermediate",
    xp: 35,
    color: "warning",
  },
  {
    id: "os-install",
    title: "OS Installation",
    description: "Walk through a complete OS install from BIOS to post-setup",
    icon: Monitor,
    difficulty: "Beginner",
    xp: 30,
    color: "primary",
  },
];

const colorMap: Record<string, { badge: string; iconBg: string; iconText: string }> = {
  primary: { badge: "bg-primary/10 text-primary", iconBg: "bg-primary/10", iconText: "text-primary" },
  accent: { badge: "bg-accent/10 text-accent", iconBg: "bg-accent/10", iconText: "text-accent" },
  info: { badge: "bg-info/10 text-info", iconBg: "bg-info/10", iconText: "text-info" },
  warning: { badge: "bg-warning/10 text-warning", iconBg: "bg-warning/10", iconText: "text-warning" },
};

const PracticePage = () => {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-background to-primary/5 px-4 py-8 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3 w-3" />
            Hands-On Practice
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Practice Lab</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Test your skills with interactive simulations. Drag, configure, and diagnose like a real technician.
          </p>
        </div>
      </section>

      {/* Simulation cards */}
      <section className="mx-auto max-w-3xl px-4 py-6">
        <div className="grid gap-3">
          {simulations.map((sim, i) => {
            const colors = colorMap[sim.color];
            const Icon = sim.icon;
            return (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/practice/${sim.id}`}
                  className="card-hover group flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <div className={`icon-badge ${colors.iconBg}`}>
                    <Icon className={`h-6 w-6 ${colors.iconText}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-foreground">{sim.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.badge}`}>
                        {sim.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{sim.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-bold text-warning">+{sim.xp} XP</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PracticePage;
