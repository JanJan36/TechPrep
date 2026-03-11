import { Link } from "react-router-dom";
import { Gamepad2, Layers, Keyboard, AlertTriangle, ChevronRight, Sparkles, Cable, Usb, Binary, Trophy, Star, BookOpen, Terminal, Cpu, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { getHighScores, type GameScore } from "@/hooks/useGameScores";
const games = [
  {
    id: "flashcards",
    title: "Component Flashcards",
    description: "Identify hardware components from visual clues — test your knowledge!",
    icon: Layers,
    difficulty: "Beginner",
    xp: 20,
    color: "primary",
  },
  {
    id: "cable-match",
    title: "Cable Match",
    description: "Match cable types to their correct uses — how well do you know your cables?",
    icon: Cable,
    difficulty: "Beginner",
    xp: 20,
    color: "accent",
  },
  {
    id: "port-identifier",
    title: "Port Identifier",
    description: "Identify ports by their descriptions — master every connector!",
    icon: Usb,
    difficulty: "Intermediate",
    xp: 20,
    color: "primary",
  },
  {
    id: "speed-typing",
    title: "Speed Typing: Commands",
    description: "Type technical commands as fast as you can in 60 seconds",
    icon: Keyboard,
    difficulty: "Intermediate",
    xp: 25,
    color: "accent",
  },
  {
    id: "binary-quiz",
    title: "Binary & Subnetting Quiz",
    description: "Convert binary/decimal and solve subnetting questions under pressure!",
    icon: Binary,
    difficulty: "Advanced",
    xp: 30,
    color: "warning",
  },
  {
    id: "troubleshooting",
    title: "Timed Troubleshooting",
    description: "Diagnose and fix issues under time pressure — think fast!",
    icon: AlertTriangle,
    difficulty: "Advanced",
    xp: 30,
    color: "warning",
  },
  {
    id: "acronym-decoder",
    title: "Acronym Decoder",
    description: "Match IT acronyms like CPU, DHCP, and RAID to their full meanings",
    icon: BookOpen,
    difficulty: "Beginner",
    xp: 20,
    color: "primary",
  },
  {
    id: "os-commands",
    title: "OS Command Quiz",
    description: "Match Windows & Linux commands to what they actually do",
    icon: Terminal,
    difficulty: "Intermediate",
    xp: 25,
    color: "accent",
  },
  {
    id: "hardware-specs",
    title: "Hardware Specs Match",
    description: "Identify components from real hardware specifications",
    icon: Cpu,
    difficulty: "Advanced",
    xp: 25,
    color: "accent",
  },
  {
    id: "safety-first",
    title: "Safety First!",
    description: "Test your knowledge of ESD prevention and workplace safety",
    icon: ShieldCheck,
    difficulty: "Beginner",
    xp: 25,
    color: "warning",
  },
];

const colorMap: Record<string, { badge: string; iconBg: string; iconText: string }> = {
  primary: { badge: "bg-primary/10 text-primary", iconBg: "bg-primary/10", iconText: "text-primary" },
  accent: { badge: "bg-accent/10 text-accent", iconBg: "bg-accent/10", iconText: "text-accent" },
  warning: { badge: "bg-warning/10 text-warning", iconBg: "bg-warning/10", iconText: "text-warning" },
};

const GamesPage = () => {
  const highScores = getHighScores();
  const hasAnyScores = Object.keys(highScores).length > 0;

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warning/5 via-background to-primary/5 px-4 py-8 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-warning/20 bg-warning/5 px-3 py-1 text-xs font-medium text-warning">
            <Sparkles className="h-3 w-3" />
            Challenge Yourself
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <Gamepad2 className="h-7 w-7 text-warning" /> Game Arcade
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Test your skills with fun, timed challenges. Earn XP and prove you're ready for the real thing.
          </p>
        </div>
      </section>

      {/* Personal Best Scores */}
      {hasAnyScores && (
        <section className="mx-auto max-w-3xl px-4 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4 text-warning" />
            <h2 className="font-display text-sm font-bold text-foreground">Personal Bests</h2>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {games.map((game) => {
              const hs = highScores[game.id];
              return (
                <div key={game.id} className="rounded-xl border border-border bg-card p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground truncate mb-1">{game.title.split(":")[0]}</p>
                  {hs ? (
                    <>
                      <p className="text-lg font-bold text-primary">{hs.percentage}%</p>
                      <p className="text-[9px] text-muted-foreground">{hs.score}/{hs.total}</p>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-muted-foreground/30">—</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Game cards */}
      <section className="mx-auto max-w-3xl px-4 py-6">
        <div className="grid gap-3">
          {games.map((game, i) => {
            const colors = colorMap[game.color];
            const Icon = game.icon;
            const hs = highScores[game.id];
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/games/${game.id}`}
                  className="card-hover group flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <div className={`icon-badge ${colors.iconBg}`}>
                    <Icon className={`h-6 w-6 ${colors.iconText}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-foreground">{game.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.badge}`}>
                        {game.difficulty}
                      </span>
                      {hs && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-bold text-warning">
                          <Star className="h-2.5 w-2.5 fill-warning" /> {hs.percentage}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{game.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-bold text-warning">+{game.xp} XP</span>
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

export default GamesPage;
