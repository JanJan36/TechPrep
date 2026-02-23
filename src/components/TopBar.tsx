import { defaultProgress } from "@/data/competencies";
import { Trophy, Bell, User } from "lucide-react";

const TopBar = () => {
  const progress = defaultProgress;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm">
            CS
          </div>
          <span className="font-display font-bold text-lg text-foreground">TechPrep</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Lv.{progress.level}</span>
          <div className="h-3 w-px bg-border" />
          <span className="text-xs font-bold text-warning">{progress.xp} XP</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary transition-colors">
            <Trophy className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
