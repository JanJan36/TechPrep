import { motion } from "framer-motion";
import { Info, AlertTriangle, Lightbulb, CheckCircle2, BookOpen } from "lucide-react";
import type { LessonSection } from "@/data/lessonContents";

const calloutConfig = {
  info: {
    icon: Info,
    bg: "bg-info/8",
    border: "border-info/20",
    iconColor: "text-info",
    label: "Did You Know?",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-warning/8",
    border: "border-warning/20",
    iconColor: "text-warning",
    label: "⚠️ Important",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-accent/8",
    border: "border-accent/20",
    iconColor: "text-accent",
    label: "💡 Pro Tip",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export const LessonTextCard = ({ content, index }: { content: string; index: number }) => {
  const lines = content.split("\n");

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm"
    >
      <div className="space-y-3">
        {lines.map((line, j) => {
          if (line.startsWith("## "))
            return (
              <h2 key={j} className="font-display text-lg font-bold text-foreground flex items-center gap-2 mt-2">
                <BookOpen className="h-5 w-5 text-primary shrink-0" />
                {line.replace("## ", "")}
              </h2>
            );
          if (line.startsWith("### "))
            return (
              <h3 key={j} className="font-display text-base font-semibold text-foreground mt-3 mb-1">
                {line.replace("### ", "")}
              </h3>
            );
          if (line.match(/^\d+\.\s\*\*/)) {
            const parts = line.match(/^(\d+\.)\s\*\*(.+?)\*\*\s*(.*)$/);
            if (parts)
              return (
                <div key={j} className="flex items-start gap-3 ml-1">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                    {parts[1].replace(".", "")}
                  </span>
                  <p className="text-sm text-foreground">
                    <strong>{parts[2]}</strong> {parts[3]}
                  </p>
                </div>
              );
          }
          if (line.startsWith("- **")) {
            const parts = line.match(/^-\s\*\*(.+?)\*\*\s*[—–-]\s*(.*)$/);
            if (parts)
              return (
                <div key={j} className="flex items-start gap-2.5 ml-1">
                  <div className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-foreground">
                    <strong className="text-foreground">{parts[1]}</strong>
                    <span className="text-muted-foreground"> — {parts[2]}</span>
                  </p>
                </div>
              );
          }
          if (line.startsWith("- "))
            return (
              <div key={j} className="flex items-start gap-2.5 ml-1">
                <div className="mt-2 h-2 w-2 rounded-full bg-primary/60 shrink-0" />
                <p className="text-sm text-foreground">{line.replace("- ", "")}</p>
              </div>
            );
          if (line.trim() === "") return <div key={j} className="h-1" />;
          return (
            <p key={j} className="text-sm text-foreground/90 leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    </motion.div>
  );
};

export const LessonCalloutCard = ({
  content,
  variant = "info",
  index,
}: {
  content: string;
  variant?: "info" | "warning" | "tip";
  index: number;
}) => {
  const config = calloutConfig[variant];
  const Icon = config.icon;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`rounded-2xl border ${config.border} ${config.bg} p-5 shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-5 w-5 ${config.iconColor}`} />
        <span className={`text-xs font-bold uppercase tracking-wide ${config.iconColor}`}>{config.label}</span>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{content}</p>
    </motion.div>
  );
};

export const LessonListCard = ({ items, index }: { items: string[]; index: number }) => {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="space-y-2.5">
        {items.map((item, j) => {
          const boldMatch = item.match(/^\*\*(.+?)\*\*\s*[—–-]\s*(.*)$/);
          return (
            <motion.div
              key={j}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: j * 0.08 + 0.2 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
              {boldMatch ? (
                <p className="text-sm">
                  <strong className="text-foreground">{boldMatch[1]}</strong>
                  <span className="text-muted-foreground"> — {boldMatch[2]}</span>
                </p>
              ) : (
                <p className="text-sm text-foreground">{item}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export const LessonKeyTakeaways = ({ items, index }: { items: string[]; index: number }) => {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-accent/20 bg-accent/5 p-5 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-5 w-5 text-accent" />
        <span className="text-sm font-bold text-accent">Key Takeaways</span>
      </div>
      <div className="space-y-2">
        {items.map((item, j) => (
          <motion.div
            key={j}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: j * 0.1 + 0.3 }}
            className="flex items-start gap-2.5"
          >
            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
