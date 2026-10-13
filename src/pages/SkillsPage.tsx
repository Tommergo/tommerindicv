import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";

const ExperiencePage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <div className="pt-16">
      <ExperienceSection />
      <SkillsSection />
    </div>
    <Footer />
  </div>
);

export default ExperiencePage;
