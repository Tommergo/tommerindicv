import { motion } from "framer-motion";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const badges = ["Python", "Machine Learning", "Data Analytics", "Project Management", "QA Testing"];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-6">
              <Sparkles size={14} /> Data Analytics • Project Leadership • QA Testing
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">Tommer<br />
              <span className="text-primary">Goldstein</span>
            </h1>
            <p className="text-body text-lg md:text-xl max-w-xl mb-2 leading-relaxed">
              Industrial Engineering & Information Systems Student at Bar-Ilan University
            </p>
            <p className="text-primary font-display font-medium text-base mb-4">
              Turning data into insights and insights into action
            </p>
            <p className="text-body text-base max-w-xl mb-8 leading-relaxed opacity-70">
              I specialize in data analysis, machine learning, and real-world problem solving in domains such as sports analytics, behavioral experiments, and social initiatives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-10">
            
            <Button variant="hero" size="lg" asChild>
              <Link to="/projects">View Projects</Link>
            </Button>
            <Button variant="hero-ghost" size="lg" asChild>
              <Link to="/contact"><Mail size={18} /> Contact Me</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-2">
            
            {badges.map((b) =>
            <span
              key={b}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              
                {b}
              </span>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}>
        
        <ArrowDown className="text-primary/50" size={20} />
      </motion.div>
    </section>);

};

export default HeroSection;