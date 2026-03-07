import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply saved theme on load
const savedTheme = localStorage.getItem("techprep-theme") || "light";
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else if (savedTheme === "system") {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", prefersDark);
}

createRoot(document.getElementById("root")!).render(<App />);
