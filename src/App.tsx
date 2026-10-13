import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import SportsAnalyticsPage from "./pages/SportsAnalyticsPage";
import LeadershipPage from "./pages/LeadershipPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import GamePage from "./pages/GamePage";
import ResumePage from "./pages/ResumePage";
import BadmintonPage from "./pages/projects/BadmintonPage";
import MemoryGamePage from "./pages/projects/MemoryGamePage";
import FacePcaPage from "./pages/projects/FacePcaPage";
import MeirMedicalPage from "./pages/projects/MeirMedicalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/meir-medical" element={<MeirMedicalPage />} />
          <Route path="/projects/sports-analytics" element={<SportsAnalyticsPage />} />
          <Route path="/projects/badminton-ml" element={<BadmintonPage />} />
          <Route path="/projects/memory-game" element={<MemoryGamePage />} />
          <Route path="/projects/face-pca" element={<FacePcaPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
