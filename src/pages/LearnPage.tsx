import { Link } from "react-router-dom";
import { competencies } from "@/data/competencies";
import { ChevronRight, Lock, CheckCircle2, Monitor, Network, Server, Settings, Shield, Calculator, FileText, Wrench as WrenchIcon, Zap, TestTube, MessageSquare, Users, Briefcase, HardHat, Lightbulb, Search } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  "install-configure": Monitor,
  "setup-networks": Network,
  "setup-servers": Server,
  "maintain-repair": Settings,
  "quality-standards": Shield,
  "computer-operations": Monitor,
  "mensuration": Calculator,
  "technical-drawings": FileText,
  "hand-tools": WrenchIcon,
  "electrical-wiring": Zap,
  "test-components": TestTube,
  "communication": MessageSquare,
  "teamwork": Users,
  "professionalism": Briefcase,
  "ohs": HardHat,
  "problem-solving": Lightbulb,
  "innovation": Search,
};

const categoryLabels = {
  core: { label: "Core Competencies", description: "Technical skills specific to Computer Technicians", color: "text-primary", bg: "bg-primary/10" },
  common: { label: "Common Competencies", description: "Skills across electronics and ICT trades", color: "text-accent", bg: "bg-accent/10" },
  basic: { label: "Basic Competencies", description: "21st-century workplace skills", color: "text-warning", bg: "bg-warning/10" },
};

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState<"core" | "common" | "basic">("core");
  const filtered = competencies.filter((c) => c.category === activeTab);
  const cat = categoryLabels[activeTab];

  return (
    <div className="pb-24">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-2xl font-bold text-foreground">Learn</h1>
          <p className="text-sm text-muted-foreground mt-1">Master the competencies to become a certified Computer Technician</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="mx-auto max-w-4xl px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(Object.keys(categoryLabels) as Array<"core" | "common" | "basic">).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {categoryLabels[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Category header */}
      <div className="mx-auto max-w-4xl px-4 pt-4 pb-2">
        <p className="text-sm text-muted-foreground">{cat.description}</p>
      </div>

      {/* Competency list */}
      <div className="mx-auto max-w-4xl px-4 space-y-3">
        {filtered.map((comp) => {
          const Icon = iconMap[comp.id] || Monitor;
          const completedTopics = comp.topics.filter((t) => t.completed).length;
          const totalTopics = comp.topics.length;
          const progressPct = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

          return (
            <div
              key={comp.id}
              className="card-hover rounded-xl border border-border bg-card overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`icon-badge ${activeTab === "core" ? "icon-badge-learn" : activeTab === "common" ? "icon-badge-practice" : "icon-badge-games"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-sm text-card-foreground">{comp.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{comp.description}</p>
                    {/* Progress bar */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {completedTopics}/{totalTopics}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mt-3 ml-15 space-y-1.5 pl-[60px]">
                  {comp.topics.map((topic) => {
                    const inner = (
                      <>
                        {topic.locked ? (
                          <Lock className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                        ) : topic.completed ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                        ) : (
                          <div className="h-3.5 w-3.5 rounded-full border-2 border-primary/40 shrink-0" />
                        )}
                        <span className={topic.locked ? "line-through" : ""}>{topic.title}</span>
                        {!topic.locked && !topic.completed && (
                          <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                        )}
                      </>
                    );
                    const baseClass = `flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors ${
                      topic.locked
                        ? "text-muted-foreground/50"
                        : topic.completed
                        ? "bg-success/10 text-foreground"
                        : "bg-secondary hover:bg-muted cursor-pointer text-foreground"
                    }`;
                    return topic.locked ? (
                      <div key={topic.id} className={baseClass}>{inner}</div>
                    ) : (
                      <Link key={topic.id} to={`/learn/${topic.id}`} className={baseClass}>{inner}</Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearnPage;
