import Navbar from "@/components/portfolio/Navbar";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import Footer from "@/components/portfolio/Footer";

const ProjectsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-16">
      <ProjectsSection />
    </div>
    <Footer />
  </div>
);

export default ProjectsPage;
