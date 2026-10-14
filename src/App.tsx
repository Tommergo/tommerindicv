import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ScrollManager from "./components/ScrollManager";
import RouteProgress from "./components/journal/RouteProgress";
import { MotionConfig } from "framer-motion";
import ExperiencePage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import SportsAnalyticsPage from "./pages/SportsAnalyticsPage";
import ProjectManagementPage from "./pages/LeadershipPage";
import NotFound from "./pages/NotFound";
import ResumePage from "./pages/ResumePage";
import BadmintonPage from "./pages/projects/BadmintonPage";
import MemoryGamePage from "./pages/projects/MemoryGamePage";
import FacePcaPage from "./pages/projects/FacePcaPage";
import MeirMedicalPage from "./pages/projects/MeirMedicalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
        <RouteProgress />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<Navigate to="/experience" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/meir-medical" element={<MeirMedicalPage />} />
          <Route path="/projects/sports-analytics" element={<SportsAnalyticsPage />} />
          <Route path="/projects/badminton-ml" element={<BadmintonPage />} />
          <Route path="/projects/memory-game" element={<MemoryGamePage />} />
          <Route path="/projects/face-pca" element={<FacePcaPage />} />
          <Route path="/management" element={<ProjectManagementPage />} />
          <Route path="/leadership" element={<Navigate to="/management" replace />} />
          <Route path="/contact" element={<Navigate to="/resume#contact" replace />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/game" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
