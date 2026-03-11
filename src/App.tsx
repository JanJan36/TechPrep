import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import TopBar from "@/components/TopBar";
import LessonPage from "@/pages/LessonPage";
import BottomNav from "@/components/BottomNav";
import Dashboard from "@/pages/Dashboard";
import LearnPage from "@/pages/LearnPage";
import PracticePage from "@/pages/PracticePage";
import PracticeSimulationPage from "@/pages/PracticeSimulationPage";
import ExplorePage from "@/pages/ExplorePage";
import GamesPage from "@/pages/GamesPage";
import GamePlayPage from "@/pages/GamePlayPage";
import ProfilePage from "@/pages/ProfilePage";
import AchievementsPage from "@/pages/AchievementsPage";
import NotFound from "./pages/NotFound";
import PageTransition from "@/components/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/learn" element={<PageTransition><LearnPage /></PageTransition>} />
        <Route path="/learn/:topicId" element={<PageTransition><LessonPage /></PageTransition>} />
        <Route path="/practice" element={<PageTransition><PracticePage /></PageTransition>} />
        <Route path="/practice/:simId" element={<PageTransition><PracticeSimulationPage /></PageTransition>} />
        <Route path="/games" element={<PageTransition><GamesPage /></PageTransition>} />
        <Route path="/games/:gameId" element={<PageTransition><GamePlayPage /></PageTransition>} />
        <Route path="/explore" element={<PageTransition><ExplorePage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        <Route path="/achievements" element={<PageTransition><AchievementsPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TopBar />
        <main className="min-h-screen">
          <AnimatedRoutes />
        </main>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
