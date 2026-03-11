import { Link } from "react-router-dom";
import { BookOpen, Wrench, Gamepad2, Compass, ChevronRight, Sparkles, Flame } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useStreak, useActivityDays } from "@/hooks/useProgress";
import { useMemo } from "react";

const Dashboard = () => {
  const progress = useProgress();
  const streak = useStreak();
  const activityDays = useActivityDays();

  const weekDays = useMemo(() => {
    const result = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayLabel = d.toLocaleDateString("en", { weekday: "short" });
      result.push({ date: dateStr, label: dayLabel, active: activityDays.includes(dateStr) });
    }
    return result;
  }, [activityDays]);

  const navCards = [
    {
      title: "Learn",
      description: "Master computer servicing concepts with structured lessons",
      icon: BookOpen,
      path: "/learn",
      badgeClass: "icon-badge-learn",
    },
    {
      title: "Practice",
      description: "Hands-on exercises and simulations",
      icon: Wrench,
      path: "/practice",
      badgeClass: "icon-badge-practice",
    },
    {
      title: "Games",
      description: "Test your knowledge with fun quizzes and challenges",
      icon: Gamepad2,
      path: "/games",
      badgeClass: "icon-badge-games",
    },
    {
      title: "Explore",
      description: "Browse all competencies and learning paths",
      icon: Compass,
      path: "/explore",
      badgeClass: "icon-badge-explore",
      
    },
  ];

  const stats = [
    { label: "Lessons Completed", value: progress.lessonsCompleted, color: "text-primary" },
    { label: "Practices Done", value: progress.practicesDone, color: "text-accent" },
    { label: "Games Played", value: progress.gamesPlayed, color: "text-warning" },
    { label: "Topics Explored", value: progress.topicsExplored, color: "text-info" },
  ];

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-8 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            Welcome back, Future Technician!
          </div>
          <h1 className="font-display text-4xl font-bold gradient-title mb-2">TechPrep</h1>
          <p className="text-muted-foreground text-sm">
            Your interactive journey to becoming a certified Computer Technician starts here
          </p>
          <div className="mt-4 inline-flex items-center gap-3 text-sm">
            <span className="progress-pill bg-primary/10 text-primary font-semibold">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                {progress.level}
              </span>
              {progress.title}
            </span>
            <div className="h-4 w-px bg-border" />
            <span className="font-bold text-warning">{progress.xp} XP</span>
            <div className="h-4 w-px bg-border" />
            <span className="inline-flex items-center gap-1 font-bold text-destructive">
              <Flame className="h-4 w-4" />
              {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Nav Cards */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {navCards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="card-hover group relative flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className={`icon-badge ${card.badgeClass}`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-card-foreground">{card.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{card.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Progress Stats */}
      <section className="mx-auto max-w-4xl px-4 pb-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-3">Your Progress</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Activity */}
      <section className="mx-auto max-w-4xl px-4 pb-6">
        <h2 className="font-display font-semibold text-lg text-foreground mb-3">This Week</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-end justify-between gap-2">
            {weekDays.map((day) => (
              <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`h-10 w-full max-w-[3rem] rounded-lg transition-colors ${
                    day.active
                      ? "bg-primary shadow-sm"
                      : "bg-muted"
                  }`}
                />
                <span className={`text-[11px] font-medium ${day.active ? "text-primary" : "text-muted-foreground"}`}>
                  {day.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {weekDays.filter((d) => d.active).length} of 7 days active this week
          </p>
        </div>
      </section>


      <section className="mx-auto max-w-4xl px-4 pb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-5">
          <div>
            <h3 className="font-display font-semibold text-foreground">Ready to start learning?</h3>
            <p className="text-sm text-muted-foreground">Begin your journey with the core competencies</p>
          </div>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
          >
            Start Learning
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
