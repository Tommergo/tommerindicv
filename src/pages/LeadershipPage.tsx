import Navbar from "@/components/portfolio/Navbar";
import HowIWorkSection from "@/components/portfolio/HowIWorkSection";
import LeadershipSection from "@/components/portfolio/LeadershipSection";
import CreativeSection from "@/components/portfolio/CreativeSection";
import Footer from "@/components/portfolio/Footer";

const LeadershipPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-16">
      <LeadershipSection />
      <CreativeSection />
      <HowIWorkSection />
    </div>
    <Footer />
  </div>
);

export default LeadershipPage;
