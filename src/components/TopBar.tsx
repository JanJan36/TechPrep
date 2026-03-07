import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { defaultProgress } from "@/data/competencies";
import { Trophy, Bell, User } from "lucide-react";

const PROFILE_KEY = "techprep-profile";

const TopBar = () => {
  const progress = defaultProgress;
  const [avatar, setAvatar] = useState("👨‍💻");

  useEffect(() => {
    const loadAvatar = () => {
      try {
        const raw = localStorage.getItem(PROFILE_KEY);
        if (raw) setAvatar(JSON.parse(raw).avatar || "👨‍💻");
      } catch {}
    };
    loadAvatar();
    window.addEventListener("storage", loadAvatar);
    window.addEventListener("profile-updated", loadAvatar);
    return () => {
      window.removeEventListener("storage", loadAvatar);
      window.removeEventListener("profile-updated", loadAvatar);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
            <img 
              src="/icon-192.png" 
              alt="TechPrep Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-display font-bold text-lg text-foreground">TechPrep</span>
        </Link>

        <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Lv.{progress.level}</span>
          <div className="h-3 w-px bg-border" />
          <span className="text-xs font-bold text-warning">{progress.xp} XP</span>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/achievements" className="rounded-full p-2 text-muted-foreground hover:bg-secondary transition-colors">
            <Trophy className="h-4 w-4" />
          </Link>
          <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <Link to="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm">
            {avatar}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
