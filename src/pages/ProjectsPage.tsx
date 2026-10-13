import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { PageHeading, PolaroidGrid, dataProjects } from "@/components/journal/FieldNotes";

const ProjectsPage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-16 max-w-6xl">
      <PageHeading stamp="Archive of Expeditions" title="FIELD NOTES" subtitle="Data projects: open any file for the summary and the charts behind it" />
      <PolaroidGrid items={dataProjects} />
    </main>
    <Footer />
  </div>
);

export default ProjectsPage;
