import Navbar from "@/components/portfolio/Navbar";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import Footer from "@/components/portfolio/Footer";

const SkillsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-16">
      <SkillsSection />
      <ExperienceSection />
    </div>
    <Footer />
  </div>
);

export default SkillsPage;
