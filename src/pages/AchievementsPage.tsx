import { BookOpen, Wrench, Gamepad2, Flame, Star, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { defaultProgress } from "@/data/competencies";
import { getHighScores } from "@/hooks/useGameScores";
import { motion } from "framer-motion";

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  xp: number;
  category: string;
  target?: number;
  current?: number;
}

const achievements: Achievement[] = [
  // Learn
  { id: "first-lesson", icon: "🎯", title: "First Steps", description: "Complete your first lesson section", xp: 50, category: "learn", target: 1, current: 0 },
  { id: "hardware-master", icon: "🖥️", title: "Hardware Master", description: "Complete all Hardware Servicing lessons", xp: 200, category: "learn" },
  { id: "network-pro", icon: "🌐", title: "Network Pro", description: "Complete all Network Configuration lessons", xp: 200, category: "learn" },
  { id: "os-expert", icon: "💿", title: "OS Expert", description: "Complete all OS Installation lessons", xp: 200, category: "learn" },
  { id: "maintenance-guru", icon: "🔧", title: "Maintenance Guru", description: "Complete all System Maintenance lessons", xp: 200, category: "learn" },
  { id: "quiz-ace", icon: "💯", title: "Quiz Ace", description: "Score 100% on any quiz", xp: 100, category: "learn", target: 1, current: 0 },
  { id: "knowledge-seeker", icon: "📚", title: "Knowledge Seeker", description: "Complete 10 lesson sections", xp: 150, category: "learn", target: 10, current: 0 },

  // Practice
  { id: "lab-initiate", icon: "🔬", title: "Lab Initiate", description: "Complete your first practice simulation", xp: 75, category: "practice", target: 1, current: 0 },
  { id: "lab-regular", icon: "🧪", title: "Lab Regular", description: "Complete 5 practice simulations", xp: 200, category: "practice", target: 5, current: 0 },
  { id: "practice-master", icon: "👨‍🔬", title: "Practice Master", description: "Complete all practice simulations", xp: 500, category: "practice", target: 5, current: 0 },

  // Games
  { id: "game-on", icon: "🎮", title: "Game On!", description: "Play your first game", xp: 50, category: "games", target: 1, current: 0 },
  { id: "high-scorer", icon: "🏆", title: "High Scorer", description: "Score over 80% in any game", xp: 150, category: "games" },
  { id: "game-master", icon: "👑", title: "Game Master", description: "Play all 6 games", xp: 300, category: "games", target: 6, current: 0 },

  // Explore
  { id: "topic-hunter", icon: "🔎", title: "Topic Hunter", description: "Explore 5 topics", xp: 100, category: "explore", target: 5, current: 0 },
  { id: "curriculum-pioneer", icon: "🗺️", title: "Curriculum Pioneer", description: "Explore 15 topics", xp: 300, category: "explore", target: 15, current: 0 },
  { id: "full-explorer", icon: "🌟", title: "Full Explorer", description: "Explore all topics", xp: 500, category: "explore", target: 25, current: 0 },

  // Streak
  { id: "streak-starter", icon: "🔥", title: "Streak Starter", description: "Learn for 3 days in a row", xp: 75, category: "streak", target: 3, current: 0 },
  { id: "week-warrior", icon: "⚡", title: "Week Warrior", description: "Learn for 7 days in a row", xp: 200, category: "streak", target: 7, current: 0 },
  { id: "monthly-master", icon: "🌙", title: "Monthly Master", description: "Learn for 30 days in a row", xp: 500, category: "streak", target: 30, current: 0 },

  // Special
  { id: "xp-collector", icon: "✨", title: "XP Collector", description: "Earn 500 XP total", xp: 100, category: "special", target: 500, current: 0 },
  { id: "rising-star", icon: "⭐", title: "Rising Star", description: "Reach level 5", xp: 250, category: "special", target: 5, current: 1 },
  { id: "tech-champion", icon: "🏅", title: "Tech Champion", description: "Reach level 10", xp: 500, category: "special", target: 10, current: 1 },
  { id: "supreme-tech", icon: "🎖️", title: "Supreme Technician", description: "Reach level 20", xp: 1000, category: "special", target: 20, current: 1 },
];

const categoryConfig: Record<string, { label: string; icon: React.ElementType; gradient: string }> = {
  learn: { label: "Learn", icon: BookOpen, gradient: "from-primary to-primary/80" },
  practice: { label: "Practice", icon: Wrench, gradient: "from-accent to-accent/80" },
  games: { label: "Games", icon: Gamepad2, gradient: "from-warning to-warning/80" },
  explore: { label: "Explore", icon: Star, gradient: "from-info to-info/80" },
  streak: { label: "Streak", icon: Flame, gradient: "from-destructive to-destructive/80" },
  special: { label: "Special", icon: Trophy, gradient: "from-primary to-accent" },
};

const AchievementsPage = () => {
  const progress = defaultProgress;
  const scores = getHighScores();

  // Compute dynamic current values
  const gamesPlayed = Object.keys(scores).length;
  const hasHighScore = Object.values(scores).some((s) => s.percentage >= 80);

  const enriched = achievements.map((a) => {
    let current = a.current ?? 0;
    if (a.id === "game-on") current = Math.min(gamesPlayed, 1);
    if (a.id === "game-master") current = gamesPlayed;
    if (a.id === "xp-collector") current = progress.xp;
    if (a.id === "rising-star") current = progress.level;
    if (a.id === "tech-champion") current = progress.level;
    if (a.id === "supreme-tech") current = progress.level;
    const unlocked = a.target ? current >= a.target : (a.id === "high-scorer" ? hasHighScore : false);
    return { ...a, current, unlocked };
  });

  const totalAchievements = enriched.length;
  const unlockedCount = enriched.filter((a) => a.unlocked).length;
  const lockedCount = totalAchievements - unlockedCount;
  const xpEarned = enriched.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  const categories = ["learn", "practice", "games", "explore", "streak", "special"];

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="text-center px-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Trophy className="h-7 w-7 text-warning" />
          <h1 className="font-display text-3xl font-bold gradient-title">Achievements</h1>
        </div>
        <p className="text-muted-foreground text-sm">Track your progress and unlock badges</p>
      </section>

      {/* Summary Stats */}
      <section className="mx-auto max-w-2xl px-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">{unlockedCount}</p>
              <p className="text-xs text-muted-foreground">Unlocked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{lockedCount}</p>
              <p className="text-xs text-muted-foreground">Locked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{xpEarned}</p>
              <p className="text-xs text-muted-foreground">XP Earned</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium text-foreground">{unlockedCount}/{totalAchievements}</span>
          </div>
          <Progress value={(unlockedCount / totalAchievements) * 100} className="h-2.5" />
        </div>
      </section>

      {/* Achievement Categories */}
      <section className="mx-auto max-w-2xl px-4 space-y-5">
        {categories.map((cat) => {
          const config = categoryConfig[cat];
          const catAchievements = enriched.filter((a) => a.category === cat);
          const catUnlocked = catAchievements.filter((a) => a.unlocked).length;

          return (
            <div key={cat}>
              {/* Category Header */}
              <div className={`flex items-center justify-between rounded-t-xl bg-gradient-to-r ${config.gradient} px-4 py-3`}>
                <div className="flex items-center gap-2 text-white">
                  <config.icon className="h-4 w-4" />
                  <span className="font-display font-semibold text-sm capitalize">{config.label}</span>
                </div>
                <span className="text-xs font-medium text-white/80">{catUnlocked}/{catAchievements.length}</span>
              </div>

              {/* Achievement Cards */}
              <div className="space-y-0 border-x border-b border-border rounded-b-xl overflow-hidden">
                {catAchievements.map((achievement, i) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-4 px-4 py-4 bg-card ${
                      i < catAchievements.length - 1 ? "border-b border-border" : ""
                    } ${achievement.unlocked ? "" : "opacity-70"}`}
                  >
                    {/* Icon */}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
                      achievement.unlocked ? "bg-accent/10" : "bg-muted"
                    }`}>
                      {achievement.unlocked ? achievement.icon : "🔒"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-card-foreground">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      {achievement.target && (
                        <div className="mt-1.5">
                          <div className="flex items-center justify-between text-[10px] mb-0.5">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-muted-foreground">{achievement.current}/{achievement.target}</span>
                          </div>
                          <Progress
                            value={Math.min((achievement.current! / achievement.target) * 100, 100)}
                            className="h-1.5"
                          />
                        </div>
                      )}
                    </div>

                    {/* XP */}
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-warning">+{achievement.xp}</span>
                      <p className="text-[10px] text-muted-foreground">XP</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default AchievementsPage;
