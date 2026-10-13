import { Mail, Linkedin, Github } from "lucide-react";
import { PageHeading } from "@/components/journal/FieldNotes";

const ContactSection = () => (
  <section id="contact" className="section-padding">
    <div className="container mx-auto px-4 max-w-2xl">
      <PageHeading level={2} stamp="Get in Touch" title="LET'S WORK TOGETHER" subtitle="Hiring for a data role, or want to talk about a project? Send word." />
      <div className="flex flex-wrap justify-center gap-4">
        <a href="mailto:tommer1999@gmail.com" className="adv-btn"><Mail size={17} /> Email</a>
        <a href="https://www.linkedin.com/in/tommer-goldstein-6784a5248/" target="_blank" rel="noopener noreferrer" className="adv-btn adv-btn-leather"><Linkedin size={17} /> LinkedIn</a>
        <a href="https://github.com/Tommergo" target="_blank" rel="noopener noreferrer" className="adv-btn adv-btn-leather"><Github size={17} /> GitHub</a>
      </div>
    </div>
  </section>
);

export default ContactSection;
