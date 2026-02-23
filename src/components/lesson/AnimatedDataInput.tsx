import { motion } from "framer-motion";
import { useState } from "react";
import { Folder, File, FolderOpen, ArrowRight } from "lucide-react";

const fileTree = [
  { name: "Documents/", type: "folder", children: ["Report.docx", "Budget.xlsx"] },
  { name: "Projects/", type: "folder", children: ["Client_A/", "Client_B/"] },
  { name: "Backup/", type: "folder", children: ["2024-01/", "2024-02/"] },
];

const AnimatedDataInput = () => {
  const [expanded, setExpanded] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  const play = () => {
    setShowAll(true);
    setExpanded(-1);
    fileTree.forEach((_, i) => {
      setTimeout(() => setExpanded(i), (i + 1) * 800);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-sm text-foreground">📁 File Management Structure</h4>
        <button
          onClick={play}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {showAll ? "↻ Replay" : "▶ Show Structure"}
        </button>
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 font-mono text-xs space-y-1">
        <p className="text-muted-foreground text-[10px] mb-2">C:\Users\Admin\</p>
        {fileTree.map((folder, i) => (
          <motion.div
            key={i}
            animate={{ opacity: showAll ? 1 : 0.2, x: showAll ? 0 : -10 }}
            transition={{ delay: i * 0.3, type: "spring" }}
          >
            <div className="flex items-center gap-1.5 text-primary">
              {i <= expanded ? (
                <FolderOpen className="h-3.5 w-3.5" />
              ) : (
                <Folder className="h-3.5 w-3.5" />
              )}
              <span className="font-semibold">{folder.name}</span>
            </div>
            {i <= expanded && (
              <div className="ml-5 space-y-0.5 mt-0.5">
                {folder.children.map((child, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.15 }}
                    className="flex items-center gap-1.5 text-muted-foreground"
                  >
                    {child.endsWith("/") ? (
                      <Folder className="h-3 w-3 text-primary/60" />
                    ) : (
                      <File className="h-3 w-3" />
                    )}
                    <span className="text-[11px]">{child}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {expanded >= fileTree.length - 1 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-muted-foreground text-center">
          Organized folder structure makes files easy to find and back up!
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedDataInput;
