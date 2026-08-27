import { motion } from "framer-motion";
import { CircleDot, Database, BarChart3, Lightbulb, Rocket } from "lucide-react";

const steps = [
  { icon: CircleDot, label: "Define the Problem", desc: "Understand the real-world challenge and define measurable goals.", num: "01" },
  { icon: Database, label: "Collect Data", desc: "Build datasets or collect experimental data.", num: "02" },
  { icon: BarChart3, label: "Analyze", desc: "Use statistics, machine learning, and visualization.", num: "03" },
  { icon: Lightbulb, label: "Extract Insights", desc: "Identify patterns and actionable conclusions.", num: "04" },
  { icon: Rocket, label: "Implement Solutions", desc: "Translate insights into practical recommendations or systems.", num: "05" },
];

const HowIWorkSection = () => (
  <section id="process" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">How I Work</h2>
        <p className="text-body">A structured approach from question to action.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative text-center"
          >
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-md mx-auto mb-4">
              <s.icon className="text-accent-foreground" size={26} />
            </div>
            <span className="text-xs font-display font-bold text-primary/40 mb-1 block">{s.num}</span>
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

export default HowIWorkSection;
