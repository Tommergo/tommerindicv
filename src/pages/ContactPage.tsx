import Navbar from "@/components/portfolio/Navbar";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-16">
      <ContactSection />
    </div>
    <Footer />
  </div>
);

export default ContactPage;
