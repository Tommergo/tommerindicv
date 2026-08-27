import { motion } from "framer-motion";
import { User, Zap, Rocket } from "lucide-react";

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-bold mb-6 uppercase tracking-wide">
            <User size={14} /> About me
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Analyst brain, <span className="text-gradient-play">marketer energy</span>
          </h2>
        </div>
        <div className="bg-card rounded-3xl p-8 card-shadow border border-border gold-glow">
          <p className="text-body text-base md:text-lg leading-relaxed">
            I am a third-year Industrial Engineering &amp; Information Systems student at Bar-Ilan University.
            My work lives where numbers meet decisions: cleaning and manipulating large datasets, finding the
            trend or the discrepancy hiding inside them, and presenting it so a team can act the same day.
          </p>
          <div className="h-px bg-border my-6" />
          <div className="flex items-start gap-3 mb-5">
            <Zap size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-body text-base md:text-lg leading-relaxed">
              I juggle several projects at once — studies, work and community initiatives — and I stay organized
              under tight schedules and real budgets.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Rocket size={20} className="text-accent shrink-0 mt-0.5" />
            <p className="text-body text-base md:text-lg leading-relaxed">
              Mobile games are the product category I actually care about. Joining a growth team at a company
              like Moon Active means optimizing something millions of people open every day.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
