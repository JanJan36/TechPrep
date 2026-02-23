import { Link } from "react-router-dom";
import { Gamepad2, Layers, Keyboard, AlertTriangle, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    id: "speed-typing",
    title: "Speed Typing: Commands",
    description: "Type technical commands as fast as you can in 60 seconds",
    icon: Keyboard,
    difficulty: "Intermediate",
    xp: 25,
    color: "accent",
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
];

const colorMap: Record<string, { badge: string; iconBg: string; iconText: string }> = {
  primary: { badge: "bg-primary/10 text-primary", iconBg: "bg-primary/10", iconText: "text-primary" },
  accent: { badge: "bg-accent/10 text-accent", iconBg: "bg-accent/10", iconText: "text-accent" },
  warning: { badge: "bg-warning/10 text-warning", iconBg: "bg-warning/10", iconText: "text-warning" },
};

const GamesPage = () => {
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

      {/* Game cards */}
      <section className="mx-auto max-w-3xl px-4 py-6">
        <div className="grid gap-3">
          {games.map((game, i) => {
            const colors = colorMap[game.color];
            const Icon = game.icon;
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
