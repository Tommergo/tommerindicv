import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () =>
<section id="contact" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto text-center">
      
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-6">
          <Sparkles size={14} /> Get In Touch
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-body text-base md:text-lg mb-8">
          Interested in collaboration, data projects, or analytics roles? Let's connect.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <a href="mailto:tommer1999@gmail.com">
              <Mail size={18} /> Email
            </a>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <a href="https://www.linkedin.com/in/tommer-goldstein-6784a5248/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            

          
          </Button>
        </div>
      </motion.div>
    </div>
  </section>;


export default ContactSection;