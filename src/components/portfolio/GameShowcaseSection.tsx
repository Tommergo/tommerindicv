import { motion } from "framer-motion";
import { Gamepad2, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GameShowcaseSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-10 card-shadow border border-border gold-glow grid md:grid-cols-[1fr_auto] gap-6 items-center"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wide">
            <Gamepad2 size={14} /> I build games too
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Indy &amp; the <span className="text-gradient-play">Temple of the Serpent</span>
          </h2>
          <p className="text-body text-base md:text-lg leading-relaxed">
            A 2D browser game I designed and built from scratch: 11 levels, whip-swing physics, enemy AI, a dialogue
            engine and a three-phase boss fight. Loving games is not just a line on my CV. Give it a try.
          </p>
        </div>
        <Button variant="hero" size="lg" asChild>
          <Link to="/game">
            <Play size={18} /> Play now
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default GameShowcaseSection;
