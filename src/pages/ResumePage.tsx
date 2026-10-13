import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import RoleFitSection from "@/components/portfolio/RoleFitSection";
import GrowthFunnelSection from "@/components/portfolio/GrowthFunnelSection";
import AboutSection from "@/components/portfolio/AboutSection";
import GameShowcaseSection from "@/components/portfolio/GameShowcaseSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import { ExplorerCard } from "@/components/journal/FieldNotes";

const ResumePage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <ExplorerCard />
      </div>
      <HeroSection />
      <RoleFitSection />
      <GrowthFunnelSection />
      <GameShowcaseSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default ResumePage;
