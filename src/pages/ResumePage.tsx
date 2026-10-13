import Navbar from "@/components/portfolio/Navbar";
import RoleFitSection from "@/components/portfolio/RoleFitSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import { ExplorerCard } from "@/components/journal/FieldNotes";

const ResumePage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="pt-24">
      <div className="container mx-auto px-4 pb-6">
        <ExplorerCard />
      </div>
      <RoleFitSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default ResumePage;
