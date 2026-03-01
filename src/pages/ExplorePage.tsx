import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { competencies } from "@/data/competencies";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Monitor, Network, Server, Settings, Shield, Calculator,
  FileText, Wrench as WrenchIcon, Zap, TestTube, MessageSquare, Users,
  Briefcase, HardHat, Lightbulb, ChevronRight, Lock, CheckCircle2,
  BookOpen, Gamepad2, Target, X, Search as SearchIcon
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "install-configure": Monitor, "setup-networks": Network, "setup-servers": Server,
  "maintain-repair": Settings, "quality-standards": Shield, "computer-operations": Monitor,
  "mensuration": Calculator, "technical-drawings": FileText, "hand-tools": WrenchIcon,
  "electrical-wiring": Zap, "test-components": TestTube, "communication": MessageSquare,
  "teamwork": Users, "professionalism": Briefcase, "ohs": HardHat,
  "problem-solving": Lightbulb, "innovation": SearchIcon,
};

const categoryConfig = {
  core: { label: "Core", color: "bg-primary/15 text-primary", badge: "icon-badge-learn" },
  common: { label: "Common", color: "bg-accent/15 text-accent", badge: "icon-badge-practice" },
  basic: { label: "Basic", color: "bg-warning/15 text-warning", badge: "icon-badge-games" },
};

const pathways = [
  { id: "hardware", title: "Hardware Specialist", icon: Monitor, description: "PC assembly, repair, and maintenance", competencyIds: ["install-configure", "maintain-repair", "hand-tools", "test-components"], color: "icon-badge-learn" },
  { id: "networking", title: "Network Technician", icon: Network, description: "Cables, configuration, and servers", competencyIds: ["setup-networks", "setup-servers", "electrical-wiring"], color: "icon-badge-practice" },
  { id: "workplace", title: "Workplace Ready", icon: Briefcase, description: "Communication, safety, and professionalism", competencyIds: ["communication", "teamwork", "professionalism", "ohs", "problem-solving", "innovation"], color: "icon-badge-games" },
  { id: "foundations", title: "Technical Foundations", icon: Calculator, description: "Measurements, drawings, and quality", competencyIds: ["quality-standards", "computer-operations", "mensuration", "technical-drawings"], color: "icon-badge-explore" },
];

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "core" | "common" | "basic">("all");
  const [view, setView] = useState<"competencies" | "pathways" | "tools">("competencies");

  const filtered = useMemo(() => {
    return competencies.filter((c) => {
      const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
      const matchesSearch = search === "" ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.topics.some(t => t.title.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [search, categoryFilter]);

  const totalTopics = competencies.reduce((sum, c) => sum + c.topics.length, 0);
  const completedTopics = competencies.reduce((sum, c) => sum + c.topics.filter(t => t.completed).length, 0);
  const overallPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const tools = [
    { name: "Screwdriver Set", icon: WrenchIcon, category: "Hand Tools", lessons: ["assemble-hardware", "plan-maintenance"] },
    { name: "Crimping Tool", icon: WrenchIcon, category: "Network Tools", lessons: ["network-cables"] },
    { name: "Multimeter", icon: TestTube, category: "Testing", lessons: ["multimeter-testing", "diagnose-faults"] },
    { name: "Cable Tester", icon: Network, category: "Network Tools", lessons: ["network-cables", "test-network"] },
    { name: "Anti-Static Wrist Strap", icon: Shield, category: "Safety", lessons: ["assemble-hardware", "hazard-control"] },
    { name: "Bootable USB Drive", icon: Monitor, category: "Software", lessons: ["bootable-devices", "install-os"] },
    { name: "Network Switch", icon: Network, category: "Network Hardware", lessons: ["network-config", "routers-wifi"] },
    { name: "Thermal Paste", icon: Zap, category: "Components", lessons: ["assemble-hardware", "rectify-defects"] },
  ];

  const filteredTools = tools.filter(t =>
    search === "" || t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-[hsl(280_65%_55%/0.08)] via-background to-primary/5 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-bold text-foreground">Explore</h1>
          <p className="text-sm text-muted-foreground mt-1">Browse competencies, learning paths, and tools</p>

          {/* Overall progress */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-lg font-bold text-primary">{overallPct}%</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Overall Mastery</p>
              <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{completedTopics} of {totalTopics} topics completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="mx-auto max-w-4xl px-4 pt-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search competencies, topics, tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* View tabs */}
        <div className="flex gap-2">
          {([
            { key: "competencies", label: "Competencies", icon: BookOpen },
            { key: "pathways", label: "Learning Paths", icon: Target },
            { key: "tools", label: "Tools & Equipment", icon: WrenchIcon },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                view === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-3 w-3" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category filter (competencies view) */}
        {view === "competencies" && (
          <div className="flex gap-1.5">
            {(["all", "core", "common", "basic"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  categoryFilter === cat
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All" : categoryConfig[cat].label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 pt-4 space-y-3">
        <AnimatePresence mode="wait">
          {view === "competencies" && (
            <motion.div key="comp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <p className="text-xs text-muted-foreground">{filtered.length} competencies found</p>
              {filtered.map((comp, i) => {
                const Icon = iconMap[comp.id] || Monitor;
                const done = comp.topics.filter(t => t.completed).length;
                const total = comp.topics.length;
                const pct = total > 0 ? (done / total) * 100 : 0;
                const catCfg = categoryConfig[comp.category];

                return (
                  <motion.div
                    key={comp.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`icon-badge ${catCfg.badge}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-display font-semibold text-sm text-card-foreground">{comp.title}</h3>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${catCfg.color}`}>
                              {catCfg.label}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{comp.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[10px] font-medium text-muted-foreground">{done}/{total}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pl-[60px] space-y-1">
                        {comp.topics.map(topic => (
                          topic.locked ? (
                            <div key={topic.id} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-muted-foreground/50">
                              <Lock className="h-3 w-3 shrink-0" />
                              <span className="line-through">{topic.title}</span>
                            </div>
                          ) : (
                            <Link
                              key={topic.id}
                              to={`/learn/${topic.id}`}
                              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                                topic.completed ? "bg-success/10 text-foreground" : "bg-secondary hover:bg-muted text-foreground"
                              }`}
                            >
                              {topic.completed ? (
                                <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                              ) : (
                                <div className="h-3.5 w-3.5 rounded-full border-2 border-primary/40 shrink-0" />
                              )}
                              <span>{topic.title}</span>
                              <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <Search className="mx-auto h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">No competencies match your search</p>
                </div>
              )}
            </motion.div>
          )}

          {view === "pathways" && (
            <motion.div key="paths" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <p className="text-xs text-muted-foreground">{pathways.length} learning paths</p>
              {pathways.map((path, i) => {
                const pathComps = competencies.filter(c => path.competencyIds.includes(c.id));
                const pathTopics = pathComps.reduce((s, c) => s + c.topics.length, 0);
                const pathDone = pathComps.reduce((s, c) => s + c.topics.filter(t => t.completed).length, 0);
                const pathPct = pathTopics > 0 ? Math.round((pathDone / pathTopics) * 100) : 0;

                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`icon-badge ${path.color}`}>
                        <path.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-sm text-card-foreground">{path.title}</h3>
                        <p className="text-xs text-muted-foreground">{path.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                              initial={{ width: 0 }}
                              animate={{ width: `${pathPct}%` }}
                              transition={{ duration: 0.6, delay: i * 0.1 }}
                            />
                          </div>
                          <span className="text-xs font-bold text-primary">{pathPct}%</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {pathComps.map(c => {
                            const Icon = iconMap[c.id] || Monitor;
                            const done = c.topics.filter(t => t.completed).length === c.topics.length;
                            return (
                              <span
                                key={c.id}
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                  done ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"
                                }`}
                              >
                                <Icon className="h-2.5 w-2.5" />
                                {c.title.length > 25 ? c.title.slice(0, 22) + "…" : c.title}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {view === "tools" && (
            <motion.div key="tools" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <p className="text-xs text-muted-foreground">{filteredTools.length} tools & equipment</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredTools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="icon-badge icon-badge-explore">
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-semibold text-card-foreground">{tool.name}</h4>
                        <span className="text-[10px] font-medium text-muted-foreground">{tool.category}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {tool.lessons.map(lessonId => {
                        const topic = competencies.flatMap(c => c.topics).find(t => t.id === lessonId);
                        return topic ? (
                          <Link
                            key={lessonId}
                            to={topic.locked ? "#" : `/learn/${lessonId}`}
                            className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {topic.completed ? <CheckCircle2 className="h-2.5 w-2.5 text-success" /> : topic.locked ? <Lock className="h-2.5 w-2.5" /> : <BookOpen className="h-2.5 w-2.5" />}
                            {topic.title}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
              {filteredTools.length === 0 && (
                <div className="py-12 text-center">
                  <WrenchIcon className="mx-auto h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">No tools match your search</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExplorePage;
