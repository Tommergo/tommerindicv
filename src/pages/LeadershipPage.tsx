import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import LeadershipSection from "@/components/portfolio/LeadershipSection";
import CreativeSection from "@/components/portfolio/CreativeSection";
import HowIWorkSection from "@/components/portfolio/HowIWorkSection";
import { SocialInitiativeContent } from "@/components/portfolio/ProjectsSection";
import { PageHeading, PolaroidGrid, leadershipProjects } from "@/components/journal/FieldNotes";

const LeadershipPage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <PageHeading stamp="Command Log" title="LEADERSHIP" subtitle="Projects I ran, not just analysed" />
        <PolaroidGrid items={leadershipProjects} />
      </div>
      <LeadershipSection />
      <section id="youth" className="container mx-auto px-4 max-w-6xl scroll-mt-24 pb-8">
        <SocialInitiativeContent />
      </section>
      <div id="band" className="scroll-mt-24">
        <CreativeSection />
      </div>
      <HowIWorkSection />
    </main>
    <Footer />
  </div>
);

export default LeadershipPage;
