import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import RoleFitSection from "@/components/portfolio/RoleFitSection";
import GrowthFunnelSection from "@/components/portfolio/GrowthFunnelSection";
import AboutSection from "@/components/portfolio/AboutSection";
import GameShowcaseSection from "@/components/portfolio/GameShowcaseSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
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

export default Index;
