import { Link, useLocation } from "react-router-dom";
import { BookOpen, Wrench, Gamepad2, Compass } from "lucide-react";

const navItems = [
  { label: "Learn", icon: BookOpen, path: "/learn" },
  { label: "Practice", icon: Wrench, path: "/practice" },
  { label: "Games", icon: Gamepad2, path: "/games" },
  { label: "Explore", icon: Compass, path: "/explore" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
