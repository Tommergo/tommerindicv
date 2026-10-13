import { motion } from "framer-motion";
import { ArrowDown, Mail, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const badges = [
  "SQL",
  "Python (pandas, NumPy)",
  "Tableau",
  "KPI Definition",
  "A/B Testing",
  "Presenting to Stakeholders",
];

const stats = [
  { label: "Students I teach Tableau to", value: "60" },
  { label: "Final project grade, Meir Medical Center", value: "95" },
  { label: "Shark Tank competition", value: "2nd place" },
];

const HeroSection = () => {
  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 grid-noise opacity-40" />
      <div className="absolute -top-20 right-0 w-[32rem] h-[32rem] bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -left-16 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 pt-12 pb-20 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-bold mb-6 uppercase tracking-wide">
              <BarChart3 size={14} /> Data Analyst · Gaming &amp; Product Analytics
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Tommer
              <br />
              <span className="text-gradient-play">Goldstein</span>
            </h1>

            <p className="text-xl md:text-2xl font-display font-medium mb-4 text-foreground/90">
              Industrial &amp; Information Systems Engineering, Bar-Ilan University. I turn data into decisions people act on.
            </p>
            <p className="text-body text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              I build dashboards in Tableau and teach it at Bar-Ilan, I have presented KPIs to a hospital's senior
              management, and I build games in my own time. Looking for a Data Analyst role in gaming.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button variant="hero" size="lg" asChild>
                <Link to="/projects">
                  <TrendingUp size={18} /> See the data work
                </Link>
              </Button>
              <Button variant="hero-ghost" size="lg" asChild>
                <Link to="/contact">
                  <Mail size={18} /> Let's talk
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary/70 text-foreground/80 border border-border"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stat panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/80 backdrop-blur border border-border rounded-3xl p-6 md:p-8 card-shadow gold-glow"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
              Candidate snapshot
            </p>
            <div className="space-y-5">
              {stats.map((s) => (
                <div key={s.label} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <p className="text-2xl md:text-3xl font-display font-bold text-gradient-play">{s.value}</p>
                  <p className="text-body text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-primary/10 border border-primary/30 p-4">
              <p className="text-sm text-foreground/90 leading-relaxed">
                Available for a full-time, long-term Data Analyst role in Tel Aviv.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="text-primary/60" size={20} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
