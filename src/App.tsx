import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TopBar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:topicId" element={<LessonPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/:simId" element={<PracticeSimulationPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:gameId" element={<GamePlayPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
