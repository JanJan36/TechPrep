import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { competencies } from "@/data/competencies";
import {
  Search, X, Compass, Wrench, Map, Zap, ArrowRight,
  ChevronRight, CheckCircle2, Lock, BookOpen,
  Monitor, Network, Server, Settings, Shield, Calculator,
  FileText, Wrench as WrenchIcon, Zap as ZapIcon, TestTube,
  MessageSquare, Users, Briefcase, HardHat, Lightbulb,
} from "lucide-react";

// ── Icon map ──────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  "install-configure": Monitor, "setup-networks": Network, "setup-servers": Server,
  "maintain-repair": Settings, "quality-standards": Shield, "computer-operations": Monitor,
  mensuration: Calculator, "technical-drawings": FileText, "hand-tools": WrenchIcon,
  "electrical-wiring": ZapIcon, "test-components": TestTube, communication: MessageSquare,
  teamwork: Users, professionalism: Briefcase, ohs: HardHat, "problem-solving": Lightbulb,
  innovation: Compass,
};

// ── Enrichment data ───────────────────────────────────────────────────────────
const competencyTags: Record<string, string[]> = {
  "install-configure":   ["hardware", "os", "software", "setup"],
  "setup-networks":      ["networking", "cables", "wifi", "hardware"],
  "setup-servers":       ["server", "networking", "admin"],
  "maintain-repair":     ["repair", "hardware", "diagnostic"],
  "quality-standards":   ["qa", "standards"],
  "computer-operations": ["software", "data", "files"],
  mensuration:           ["math", "measurement", "electrical"],
  "technical-drawings":  ["schematics", "diagrams"],
  "hand-tools":          ["tools", "hands-on"],
  "electrical-wiring":   ["electrical", "wiring", "hands-on"],
  "test-components":     ["electrical", "testing", "multimeter"],
  communication:         ["soft-skills", "workplace"],
  teamwork:              ["soft-skills", "workplace"],
  professionalism:       ["soft-skills", "career"],
  ohs:                   ["safety", "workplace"],
  "problem-solving":     ["soft-skills", "logic"],
  innovation:            ["soft-skills", "workplace"],
};

const competencyTools: Record<string, { name: string; icon: string }[]> = {
  "install-configure":   [{ name: "Screwdriver Set", icon: "🪛" }, { name: "Bootable USB", icon: "💾" }, { name: "POST Tester", icon: "🖥️" }],
  "setup-networks":      [{ name: "Crimping Tool", icon: "🔧" }, { name: "Cable Tester", icon: "🔌" }, { name: "Router", icon: "📡" }],
  "setup-servers":       [{ name: "Active Directory", icon: "🗂️" }, { name: "DHCP Server", icon: "🌐" }, { name: "DNS Server", icon: "🔗" }],
  "maintain-repair":     [{ name: "Diagnostic Software", icon: "💻" }, { name: "Multimeter", icon: "⚡" }, { name: "Thermal Paste", icon: "🌡️" }],
  "quality-standards":   [{ name: "Checklist", icon: "✅" }, { name: "Test Reports", icon: "📋" }],
  "computer-operations": [{ name: "OS Interface", icon: "🖱️" }, { name: "File Manager", icon: "📁" }],
  mensuration:           [{ name: "Calipers", icon: "📏" }, { name: "Calculator", icon: "🔢" }],
  "technical-drawings":  [{ name: "Schematics", icon: "📐" }, { name: "Network Diagrams", icon: "🗺️" }],
  "hand-tools":          [{ name: "Screwdrivers", icon: "🪛" }, { name: "Pliers", icon: "🔧" }, { name: "Crimpers", icon: "✂️" }],
  "electrical-wiring":   [{ name: "Wire Stripper", icon: "✂️" }, { name: "Soldering Iron", icon: "🔥" }],
  "test-components":     [{ name: "Multimeter", icon: "⚡" }, { name: "Oscilloscope", icon: "📊" }],
  communication:         [{ name: "Reports", icon: "📝" }, { name: "Presentations", icon: "🎤" }],
  teamwork:              [{ name: "Collaboration Tools", icon: "👥" }],
  professionalism:       [{ name: "Portfolio", icon: "💼" }],
  ohs:                   [{ name: "Safety Gear", icon: "🦺" }, { name: "Hazard Signs", icon: "⚠️" }],
  "problem-solving":     [{ name: "Troubleshooting Guide", icon: "📖" }],
  innovation:            [{ name: "Process Map", icon: "🗺️" }],
};

const catStyle = {
  core:   { dot: "bg-primary",  text: "text-primary",  bg: "bg-primary/8",   pill: "bg-primary/10 text-primary",   border: "border-primary/20"  },
  common: { dot: "bg-accent",   text: "text-accent",   bg: "bg-accent/8",    pill: "bg-accent/10 text-accent",     border: "border-accent/20"   },
  basic:  { dot: "bg-warning",  text: "text-warning",  bg: "bg-warning/8",   pill: "bg-warning/10 text-warning",   border: "border-warning/20"  },
} as const;

const ALL_TAGS = Array.from(new Set(Object.values(competencyTags).flat())).sort();

type ViewMode = "directory" | "roadmap" | "tools";

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ExplorePage() {
  const [view, setView]               = useState<ViewMode>("directory");
  const [query, setQuery]             = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setSelectedTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return competencies.filter((c) => {
      const tags = competencyTags[c.id] ?? [];
      const matchTag = !selectedTags.length || selectedTags.some((t) => tags.includes(t));
      const matchQ   = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
        || c.topics.some((t) => t.title.toLowerCase().includes(q));
      return matchTag && matchQ;
    });
  }, [query, selectedTags]);

  const totalTopics = competencies.reduce((a, c) => a + c.topics.length, 0);
  const doneTopics  = competencies.reduce((a, c) => a + c.topics.filter((t) => t.completed).length, 0);
  const pct         = Math.round((doneTopics / totalTopics) * 100);

  const nextTopic = useMemo(() => {
    for (const c of competencies) {
      const t = c.topics.find((t) => !t.locked && !t.completed);
      if (t) return { topic: t, comp: c };
    }
    return null;
  }, []);

  return (
    <div className="pb-24">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[hsl(280,65%,55%)]/10 via-background to-primary/5 px-4 pt-6 pb-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-1">
            <Compass className="h-5 w-5 text-[hsl(280,65%,55%)]" />
            <h1 className="font-display text-2xl font-bold text-foreground">Explore</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Discover topics, tools, and your full certification path</p>

          {/* Overall mastery bar */}
          <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Overall mastery</span>
                <span className="font-bold">{doneTopics}/{totalTopics} topics</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-[hsl(280,65%,55%)] to-accent transition-all"
                  style={{ width: `${pct || 2}%` }}
                />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-[hsl(280,65%,55%)]">{pct}%</p>
              <p className="text-[10px] text-muted-foreground">complete</p>
            </div>
          </div>

          {/* Up Next banner */}
          {nextTopic && (
            <Link
              to={`/learn/${nextTopic.topic.id}`}
              className="mt-3 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 hover:bg-primary/10 transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary flex-shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Up Next</p>
                <p className="text-sm font-semibold text-foreground truncate">{nextTopic.topic.title}</p>
                <p className="text-[11px] text-muted-foreground truncate">{nextTopic.comp.title}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </Link>
          )}
        </div>
      </section>

      {/* ── Tab bar ── */}
      <div className="sticky top-[57px] z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 py-2 flex gap-1">
          {([ 
            { id: "directory" as ViewMode, label: "Directory", icon: Search },
            { id: "roadmap"   as ViewMode, label: "Roadmap",   icon: Map    },
            { id: "tools"     as ViewMode, label: "Tools",     icon: Wrench },
          ]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                view === id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-5">

        {/* ══════════════════════════════════════════════════════════
            DIRECTORY — searchable flat topic grid with tag filters
            ══════════════════════════════════════════════════════════ */}
        {view === "directory" && (
          <div className="space-y-5">

            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics, keywords…"
                className="w-full rounded-xl border border-border bg-card pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Tag cloud */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-semibold text-muted-foreground self-center mr-1">Filter:</span>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-[hsl(280,65%,55%)] text-white border-transparent scale-105"
                      : "bg-card border-border text-muted-foreground hover:border-foreground/40"
                  }`}
                >
                  #{tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-destructive/10 border border-destructive/20 text-destructive"
                >
                  ✕ clear
                </button>
              )}
            </div>

            {/* Count */}
            <p className="text-[11px] text-muted-foreground">
              Showing {filtered.length} competenc{filtered.length !== 1 ? "ies" : "y"}
              {selectedTags.length > 0 && ` · ${selectedTags.join(", ")}`}
            </p>

            {/* Results — topics laid out as chips under each competency */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <Search className="h-10 w-10 text-muted-foreground/30 mb-3" />
                <p className="font-semibold text-foreground mb-1">Nothing found</p>
                <button
                  onClick={() => { setQuery(""); setSelectedTags([]); }}
                  className="text-xs text-primary underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filtered.map((comp) => {
                  const Icon = iconMap[comp.id] ?? Compass;
                  const cs = catStyle[comp.category];
                  const tags = competencyTags[comp.id] ?? [];
                  const doneCount = comp.topics.filter((t) => t.completed).length;

                  return (
                    <div key={comp.id}>
                      {/* Competency header */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${cs.bg}`}>
                          <Icon className={`h-4 w-4 ${cs.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-display font-bold text-foreground leading-tight">{comp.title}</p>
                          <p className="text-[11px] text-muted-foreground">{doneCount}/{comp.topics.length} topics done</p>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cs.pill}`}>
                          {comp.category}
                        </span>
                      </div>

                      {/* Tag badges */}
                      <div className="flex flex-wrap gap-1 mb-2 pl-[42px]">
                        {tags.map((t) => (
                          <span
                            key={t}
                            onClick={() => toggleTag(t)}
                            className={`cursor-pointer rounded-full px-2 py-0.5 text-[10px] border transition-colors ${
                              selectedTags.includes(t)
                                ? "bg-[hsl(280,65%,55%)]/10 border-[hsl(280,65%,55%)]/40 text-[hsl(280,65%,55%)]"
                                : "border-border/60 text-muted-foreground hover:border-foreground/30"
                            }`}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Topic chips grid */}
                      <div className="pl-[42px] grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {comp.topics.map((topic) => {
                          if (topic.locked) {
                            return (
                              <div
                                key={topic.id}
                                className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5 opacity-45"
                              >
                                <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                <span className="text-xs text-muted-foreground truncate">{topic.title}</span>
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={topic.id}
                              to={`/learn/${topic.id}`}
                              className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-all hover:shadow-sm group ${
                                topic.completed
                                  ? "border-success/30 bg-success/5 hover:bg-success/10"
                                  : `border-border bg-card hover:${cs.border} hover:${cs.bg}`
                              }`}
                            >
                              {topic.completed
                                ? <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                : <div className={`h-2 w-2 rounded-full flex-shrink-0 ${cs.dot}`} />
                              }
                              <span className="text-xs font-medium text-foreground flex-1 truncate">{topic.title}</span>
                              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            ROADMAP — visual linear certification path
            ══════════════════════════════════════════════════════════ */}
        {view === "roadmap" && (
          <div>
            <p className="text-xs text-muted-foreground mb-6">
              Your NC II certification path. Complete each track to unlock the next level.
            </p>

            {(["core", "common", "basic"] as const).map((cat) => {
              const catComps  = competencies.filter((c) => c.category === cat);
              const cs        = catStyle[cat];
              const trackDone = catComps.filter((c) => c.topics.every((t) => t.completed)).length;
              const trackLabels = {
                core:   { emoji: "🖥️", name: "Core Track",   sub: "Technical computer skills" },
                common: { emoji: "🔧", name: "Common Track",  sub: "Shared trade skills"       },
                basic:  { emoji: "🤝", name: "Basic Track",   sub: "21st-century workplace"    },
              };
              const tl = trackLabels[cat];

              return (
                <div key={cat} className="mb-8">
                  {/* Track header */}
                  <div className={`rounded-xl border ${cs.border} ${cs.bg} px-4 py-3 mb-1 flex items-center justify-between`}>
                    <div>
                      <p className={`font-display font-bold text-sm ${cs.text}`}>{tl.emoji} {tl.name}</p>
                      <p className="text-[11px] text-muted-foreground">{tl.sub}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${cs.text}`}>{trackDone}/{catComps.length}</p>
                      <p className="text-[10px] text-muted-foreground">done</p>
                    </div>
                  </div>

                  {/* Nodes */}
                  <div className="border border-border rounded-xl overflow-hidden bg-card divide-y divide-border">
                    {catComps.map((comp, idx) => {
                      const Icon      = iconMap[comp.id] ?? Compass;
                      const done      = comp.topics.filter((t) => t.completed).length;
                      const total     = comp.topics.length;
                      const allDone   = done === total;
                      const anyDone   = done > 0;
                      const allLocked = comp.topics.every((t) => t.locked);
                      const firstOpen = comp.topics.find((t) => !t.locked && !t.completed);

                      return (
                        <div key={comp.id} className={`flex items-start gap-3 px-4 py-4 ${allLocked ? "opacity-50" : ""}`}>
                          {/* Connector */}
                          <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                            <div className={`h-9 w-9 rounded-full flex items-center justify-center border-2 ${
                              allDone   ? "border-success bg-success/10"
                              : anyDone ? `border-primary bg-primary/10`
                              : allLocked ? "border-border bg-muted"
                              : `bg-card ${cs.border}`
                            }`}>
                              {allDone    ? <CheckCircle2 className="h-4 w-4 text-success" />
                               : allLocked ? <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                               : <Icon className={`h-4 w-4 ${cs.text}`} />}
                            </div>
                            {idx < catComps.length - 1 && (
                              <div className={`w-0.5 h-6 mt-1 ${allDone ? "bg-success/40" : "bg-border"}`} />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{comp.title}</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">{comp.description}</p>
                              </div>
                              {allDone && (
                                <span className="flex-shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">✓ Done</span>
                              )}
                            </div>

                            {/* Progress bar */}
                            {!allLocked && (
                              <div className="mt-2.5 flex items-center gap-2">
                                <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${cs.dot} transition-all`}
                                    style={{ width: `${Math.round((done / total) * 100)}%` }}
                                  />
                                </div>
                                <span className="text-[10px] text-muted-foreground font-medium">{done}/{total}</span>
                              </div>
                            )}

                            {/* CTA to first open topic */}
                            {!allDone && firstOpen && (
                              <Link
                                to={`/learn/${firstOpen.id}`}
                                className={`mt-2 inline-flex items-center gap-1.5 rounded-lg ${cs.bg} ${cs.border} border px-3 py-1.5 text-xs font-semibold ${cs.text} hover:opacity-80 transition-opacity`}
                              >
                                <BookOpen className="h-3 w-3" />
                                {done === 0 ? "Start: " : "Continue: "}{firstOpen.title}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TOOLS — reference directory of all tools & equipment
            ══════════════════════════════════════════════════════════ */}
        {view === "tools" && (
          <div>
            <p className="text-xs text-muted-foreground mb-5">
              All tools and equipment across your NC II training — tap any competency to start learning.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <p className="text-lg font-bold text-primary">{Object.values(competencyTools).flat().length}</p>
                <p className="text-[10px] text-muted-foreground">Total Tools</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <p className="text-lg font-bold text-accent">
                  {Object.values(competencyTools).filter((t) => t.length > 0).length}
                </p>
                <p className="text-[10px] text-muted-foreground">Categories</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3 text-center">
                <p className="text-lg font-bold text-warning">
                  {competencies.filter((c) => !c.topics.every((t) => t.locked)).length}
                </p>
                <p className="text-[10px] text-muted-foreground">Accessible</p>
              </div>
            </div>

            <div className="space-y-3">
              {competencies.map((comp) => {
                const tools = competencyTools[comp.id] ?? [];
                if (!tools.length) return null;
                const Icon    = iconMap[comp.id] ?? Compass;
                const cs      = catStyle[comp.category];
                const locked  = comp.topics.every((t) => t.locked);
                const done    = comp.topics.every((t) => t.completed);
                const firstOpen = comp.topics.find((t) => !t.locked && !t.completed);

                return (
                  <div key={comp.id} className={`rounded-xl border border-border bg-card overflow-hidden ${locked ? "opacity-55" : ""}`}>
                    {/* Header */}
                    <div className={`flex items-center gap-3 px-4 py-3 ${cs.bg} border-b border-border`}>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card/70 flex-shrink-0">
                        <Icon className={`h-4.5 w-4.5 ${cs.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-display font-bold ${cs.text}`}>{comp.title}</p>
                        <p className="text-[11px] text-muted-foreground">{tools.length} tool{tools.length > 1 ? "s" : ""} used</p>
                      </div>
                      {locked ? (
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Lock className="h-3 w-3" /> Locked
                        </span>
                      ) : done ? (
                        <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold text-success">
                          ✓ Done
                        </span>
                      ) : firstOpen ? (
                        <Link
                          to={`/learn/${firstOpen.id}`}
                          className={`rounded-full ${cs.dot} px-2.5 py-1 text-[10px] font-bold text-white flex items-center gap-1`}
                        >
                          Learn <ChevronRight className="h-3 w-3" />
                        </Link>
                      ) : null}
                    </div>

                    {/* Tool chips */}
                    <div className="px-4 py-3 flex flex-wrap gap-2">
                      {tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-2"
                        >
                          <span className="text-base leading-none">{tool.icon}</span>
                          <span className="text-xs font-medium text-foreground">{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
