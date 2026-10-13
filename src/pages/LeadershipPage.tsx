import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import LeadershipSection from "@/components/portfolio/LeadershipSection";
import CrocodileBillSection from "@/components/portfolio/CrocodileBillSection";
import { SocialInitiativeContent } from "@/components/portfolio/ProjectsSection";
import { PageHeading } from "@/components/journal/FieldNotes";
import youthCover from "@/assets/projects/youth-initiative-map.jpg";

const ProjectManagementPage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="pt-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <PageHeading stamp="Command Log" title="PROJECT MANAGEMENT" subtitle="Projects I ran end to end: clients, suppliers, people and budgets" />
        <div id="band" className="scroll-mt-24">
          <CrocodileBillSection />
        </div>
        <section id="youth" className="scroll-mt-24 mt-16">
          <figure className="adv-paper p-3 pb-4 mb-6 relative max-w-4xl mx-auto" style={{ transform: "rotate(0.6deg)" }}>
            <div className="adv-tape absolute -top-3 left-1/2 -translate-x-1/2 z-10" aria-hidden="true" />
            <img src={youthCover} alt="Training National Service Volunteers: problem, approach and impact" width={1024} height={732} loading="lazy" className="w-full h-auto rounded-sm border border-[hsl(var(--adv-leather)/0.35)]" />
          </figure>
          <SocialInitiativeContent />
        </section>
      </div>
      <LeadershipSection />
    </main>
    <Footer />
  </div>
);

export default ProjectManagementPage;
