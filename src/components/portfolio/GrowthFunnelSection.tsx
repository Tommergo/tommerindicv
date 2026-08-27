import { motion } from "framer-motion";
import { Megaphone, MousePointerClick, Download, Repeat, Coins } from "lucide-react";

const steps = [
  { icon: Megaphone, label: "Impression", desc: "Creative & network mix", num: "01" },
  { icon: MousePointerClick, label: "Click", desc: "CTR, CPC, placement quality", num: "02" },
  { icon: Download, label: "Install", desc: "CPI, install-to-click rate", num: "03" },
  { icon: Repeat, label: "Retention", desc: "D1 / D7 cohort behaviour", num: "04" },
  { icon: Coins, label: "ROAS", desc: "LTV vs. spend, budget reallocation", num: "05" },
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
          How I think about <span className="text-gradient-play">user acquisition</span>
        </h2>
        <p className="text-body">
          The same analytical loop I use on any dataset, applied to a paid growth funnel.
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
