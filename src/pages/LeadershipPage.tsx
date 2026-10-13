import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import LeadershipSection from "@/components/portfolio/LeadershipSection";
import CrocodileBillSection from "@/components/portfolio/CrocodileBillSection";
import { SocialInitiativeContent } from "@/components/portfolio/ProjectsSection";
import { PageHeading } from "@/components/journal/FieldNotes";

const ProjectManagementPage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="pt-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <PageHeading stamp="Command Log" title="PROJECT MANAGEMENT" subtitle="Projects I ran end to end: clients, suppliers, people and budgets" />
        <div id="band" className="scroll-mt-24">
          <CrocodileBillSection />
        </div>
        <section id="youth" className="scroll-mt-24 mt-14">
          <SocialInitiativeContent />
        </section>
      </div>
      <LeadershipSection />
    </main>
    <Footer />
  </div>
);

export default ProjectManagementPage;
