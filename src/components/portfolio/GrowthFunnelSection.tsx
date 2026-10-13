import { motion } from "framer-motion";
import { HelpCircle, Database, Search, LayoutDashboard, Presentation } from "lucide-react";

const steps = [
  { icon: HelpCircle, label: "Question", desc: "What decision does this data need to support?", num: "01" },
  { icon: Database, label: "Data", desc: "Pull it with SQL, clean it in Python", num: "02" },
  { icon: Search, label: "Analysis", desc: "Find the pattern, the gap, the correlation", num: "03" },
  { icon: LayoutDashboard, label: "Dashboard", desc: "Build it in Tableau so it reads at a glance", num: "04" },
  { icon: Presentation, label: "Decision", desc: "Present to leadership, advise on what to do next", num: "05" },
];

const GrowthFunnelSection = () => (
  <section id="funnel" className="section-padding bg-card/30 border-y border-border">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-3">
          How I think about <span className="text-gradient-play">data work</span>
        </h2>
        <p className="text-body">
          The same loop on every dataset, from a hospital to a game.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative text-center"
          >
            <div className="w-16 h-16 rounded-2xl gradient-play flex items-center justify-center shadow-lg mx-auto mb-4">
              <s.icon className="text-primary-foreground" size={26} />
            </div>
            <span className="text-xs font-display font-bold text-primary/50 mb-1 block">{s.num}</span>
            <p className="font-display font-semibold text-sm mb-1">{s.label}</p>
            <p className="text-body text-xs leading-relaxed">{s.desc}</p>

            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-border" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GrowthFunnelSection;
