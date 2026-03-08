import { useState, useEffect } from "react";
import { BookOpen, Award, Clock, Compass, Flame, Settings, Database, Sun, Moon, Monitor } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProgress } from "@/hooks/useProgress";
import { getHighScores } from "@/hooks/useGameScores";
import { motion } from "framer-motion";

const PROFILE_KEY = "techprep-profile";

const avatars = [
  "👨‍💻", "👩‍💻", "🧑‍💻", "🔧", "🖥️", "💻", "🔌", "📡",
  "🛠️", "⚙️", "🔬", "📱", "🖨️", "💾", "🔋", "🌐",
];

interface ProfileData {
  avatar: string;
  displayName: string;
  streak: number;
}

const getProfile = (): ProfileData => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : { avatar: "👨‍💻", displayName: "Tech Student", streak: 0 };
  } catch {
    return { avatar: "👨‍💻", displayName: "Tech Student", streak: 0 };
  }
};

const saveProfile = (data: ProfileData) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
};

const ProfilePage = () => {
  const progress = useProgress();
  const [profile, setProfile] = useState<ProfileData>(getProfile);
  const [nameInput, setNameInput] = useState(profile.displayName);
  const [saved, setSaved] = useState(false);

  const scores = getHighScores();
  const badgesEarned = Object.keys(scores).length;

  useEffect(() => {
    saveProfile(profile);
    window.dispatchEvent(new Event("profile-updated"));
  }, [profile]);

  const handleSave = () => {
    setProfile((p) => ({ ...p, displayName: nameInput }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const stats = [
    { icon: BookOpen, value: progress.lessonsCompleted, label: "Lessons", color: "text-primary" },
    { icon: Award, value: badgesEarned, label: "Badges", color: "text-warning" },
    { icon: Clock, value: "0m", label: "Time Spent", color: "text-accent" },
    { icon: Compass, value: progress.topicsExplored, label: "Topics", color: "text-info" },
  ];

  const xpPercent = progress.xpToNext > 0 ? (progress.xp / progress.xpToNext) * 100 : 0;

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="text-center px-4 py-8">
        <h1 className="font-display text-3xl font-bold gradient-title mb-1">Your Profile</h1>
        <p className="text-muted-foreground text-sm">Customize your avatar and manage your preferences</p>
      </section>

      {/* Profile Card */}
      <section className="mx-auto max-w-2xl px-4 mb-6">
        <div className="rounded-2xl overflow-hidden border border-border">
          {/* Gradient Banner */}
          <div className="relative h-28 bg-gradient-to-r from-primary via-info to-accent">
            <div className="absolute -bottom-10 left-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-card text-4xl shadow-lg">
                {profile.avatar}
              </div>
            </div>
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                <Flame className="h-3 w-3" />
                {profile.streak} day streak
              </span>
            </div>
          </div>

          <div className="bg-card pt-14 pb-5 px-6">
            <h2 className="font-display font-bold text-xl text-card-foreground">{profile.displayName}</h2>
            <p className="text-sm text-muted-foreground">{progress.title} • Level {progress.level}</p>

            {/* Level Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-foreground">Level {progress.level} Progress</span>
                <span className="text-muted-foreground">{progress.xpToNext} XP to Level {progress.level + 1}</span>
              </div>
              <Progress value={xpPercent} className="h-2.5" />
              <p className="text-center text-xs text-muted-foreground mt-1.5">
                Total: <span className="font-bold text-warning">{progress.xp} XP</span>
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3 mt-5">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center rounded-xl border border-border bg-secondary/50 py-3">
                  <stat.icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-2xl px-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="profile" className="gap-1.5">
              <Settings className="h-3.5 w-3.5" /> Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-1.5">
              <Database className="h-3.5 w-3.5" /> Preferences
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-1.5">
              <Database className="h-3.5 w-3.5" /> Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-5 mt-5">
            {/* Avatar Selection */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-1">🎯 Avatar Selection</h3>
              <p className="text-xs text-muted-foreground mb-4">Choose an avatar that represents your tech journey</p>
              <div className="grid grid-cols-8 gap-2">
                {avatars.map((av) => (
                  <motion.button
                    key={av}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfile((p) => ({ ...p, avatar: av }))}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-all ${
                      profile.avatar === av
                        ? "ring-2 ring-primary bg-primary/10 shadow-sm"
                        : "hover:bg-secondary border border-border"
                    }`}
                  >
                    {av}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Display Name */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-1">Display Name</h3>
              <p className="text-xs text-muted-foreground mb-3">This is how you'll be identified in TechPrep</p>
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value.slice(0, 30))}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your name"
                />
                <p className="text-xs text-muted-foreground text-right">{nameInput.length}/30 characters</p>
              </div>
              <button
                onClick={handleSave}
                className="mt-3 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-5 space-y-5">
            {/* Theme Toggle */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-1">🎨 Appearance</h3>
              <p className="text-xs text-muted-foreground mb-4">Choose your preferred theme</p>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: "light", icon: Sun, label: "Light" },
                  { value: "dark", icon: Moon, label: "Dark" },
                  { value: "system", icon: Monitor, label: "System" },
                ] as const).map(({ value, icon: Icon, label }) => {
                  const current = (() => {
                    const root = document.documentElement;
                    if (root.classList.contains("dark")) {
                      return localStorage.getItem("techprep-theme") === "system" ? "system" : "dark";
                    }
                    return localStorage.getItem("techprep-theme") || "light";
                  })();
                  const isActive = current === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        localStorage.setItem("techprep-theme", value);
                        const root = document.documentElement;
                        if (value === "dark") {
                          root.classList.add("dark");
                        } else if (value === "light") {
                          root.classList.remove("dark");
                        } else {
                          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                          root.classList.toggle("dark", prefersDark);
                        }
                        // Force re-render
                        setProfile((p) => ({ ...p }));
                      }}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                        isActive
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-5">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">Your Data</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Total XP</span>
                  <span className="font-semibold text-foreground">{progress.xp}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Current Level</span>
                  <span className="font-semibold text-foreground">{progress.level}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Games High Scores</span>
                  <span className="font-semibold text-foreground">{Object.keys(scores).length}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Lessons Completed</span>
                  <span className="font-semibold text-foreground">{progress.lessonsCompleted}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ProfilePage;
