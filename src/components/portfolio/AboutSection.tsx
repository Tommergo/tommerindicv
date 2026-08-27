import { motion } from "framer-motion";
import { User, Zap } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-6">
            <User size={14} /> About Me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
        </div>
        <div className="bg-card rounded-2xl p-8 card-shadow border border-border gold-glow">
          <p className="text-body text-base md:text-lg leading-relaxed">
            I am a third-year Industrial Engineering & Information Systems student at Bar-Ilan University with a strong interest in data analysis, machine learning, and project leadership. My projects focus on solving real problems using data — from sports analytics and behavioral experiments to social initiatives adopted by public organizations.
          </p>
          <div className="h-px bg-border my-6" />
          <div className="flex items-start gap-3">
            <Zap size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-body text-base md:text-lg leading-relaxed">
              Beyond analytics, I actively lead initiatives in student organizations and community projects, combining analytical thinking with leadership and execution.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
