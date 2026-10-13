import { motion } from "framer-motion";
import { Target, Database, LayoutDashboard, Gauge, FlaskConical, Presentation, Code2 } from "lucide-react";

const fits = [
  {
    icon: Database,
    req: "Strong SQL",
    proof: "Wrote SQL daily at Redis against user data to find duplicates and anomalies.",
    color: "hsl(var(--primary))",
  },
  {
    icon: LayoutDashboard,
    req: "Dashboarding experience (Tableau)",
    proof:
      "Built the Tableau dashboard for Bnei Herzliya's budget-vs-results analysis and the KPI dashboard for Meir Medical Center's senior management. I also teach Tableau at Bar-Ilan.",
    color: "hsl(var(--adv-gold))",
  },
  {
    icon: Gauge,
    req: "Experience with KPI frameworks",
    proof:
      "Defined and presented the KPIs at Meir Medical Center that led the hospital to build emergency data-collection protocols.",
    color: "hsl(var(--adv-red))",
  },
  {
    icon: FlaskConical,
    req: "Experimentation and A/B tests",
    proof:
      "Ran A/B tests on post formats for my band's social channels and kept the formats that performed. Studied experimental design in my degree.",
    color: "hsl(var(--adv-jungle))",
  },
  {
    icon: Presentation,
    req: "Presenting insights to non-technical stakeholders",
    proof:
      "Presented wartime findings to a hospital's senior management, and a budget-vs-results analysis to a sports club's leadership. 2nd place in a Shark Tank competition judged by entrepreneurs and academics.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Code2,
    req: "Python and a gaming mindset",
    proof:
      "Python (pandas, NumPy) for data preparation and analysis. Built a complete 2D browser game in JavaScript, and tested an educational game as a QA tester.",
    color: "hsl(var(--adv-red))",
  },
];

const RoleFitSection = () => (
  <section id="fit" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 grid-noise opacity-20" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent text-xs font-bold mb-6 uppercase tracking-wide">
          <Target size={14} /> Role fit
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Why I fit <span className="text-gradient-play">Data Analyst, Gaming</span>
        </h2>
        <p className="text-body">
          Every requirement in the job description, matched to something I have already done.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {fits.map((f, i) => (
          <motion.div
            key={f.req}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="bg-card rounded-3xl p-6 border border-border card-shadow hover:card-shadow-hover hover:border-primary/40 transition-all duration-300"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: `color-mix(in srgb, ${f.color} 18%, transparent)` }}
            >
              <f.icon size={22} style={{ color: f.color }} />
            </div>
            <h3 className="font-display font-semibold text-base mb-3 leading-snug">{f.req}</h3>
            <p className="text-body text-base leading-relaxed">{f.proof}</p>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default RoleFitSection;
