import { motion } from "framer-motion";
import { Target, BarChart3, Table2, Users, Languages, Gamepad2, Layers } from "lucide-react";

const fits = [
  {
    icon: BarChart3,
    req: "Conduct data analysis — trends, opportunities & discrepancies",
    proof:
      "Built statistical and ML analyses (logistic regression, PCA, retention & dropout modelling) on real datasets, always ending with a decision, not a chart.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Table2,
    req: "Profound MS-Office knowledge, Excel in particular",
    proof:
      "Daily Excel work: pivot tables, lookups, budget models and dashboards used to track spend and performance across projects.",
    color: "hsl(var(--amber))",
  },
  {
    icon: Layers,
    req: "Multiple fast-paced projects, tight schedules, within budget",
    proof:
      "Ran parallel academic, work and community projects — budget planning, timelines and stakeholders — without dropping deadlines.",
    color: "hsl(var(--magenta))",
  },
  {
    icon: Users,
    req: "Build relationships with partners & collaborate cross-team",
    proof:
      "Led faculty committees, student organizations and a live band's production — negotiating with vendors, venues and public organizations.",
    color: "hsl(var(--violet))",
  },
  {
    icon: Target,
    req: "BSc in Industrial Engineering / Economics / Statistics",
    proof:
      "3rd-year Industrial Engineering & Information Systems student at Bar-Ilan University — statistics, optimization and operations research core.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Gamepad2,
    req: "Passion for marketing and mobile games",
    proof:
      "QA tester on a Unity game project and a lifelong gamer — I understand the funnel from ad creative to first session and D1 retention.",
    color: "hsl(var(--magenta))",
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
          Why I fit <span className="text-gradient-play">Junior UA Manager</span>
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
            <p className="text-body text-sm leading-relaxed">{f.proof}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-6 rounded-3xl border border-border bg-card/60 p-6 flex flex-wrap items-center gap-4 justify-between"
      >
        <div className="flex items-center gap-3">
          <Languages className="text-primary" size={20} />
          <p className="text-body text-sm">
            Fluent English (verbal &amp; written) · Native Hebrew · Comfortable presenting to stakeholders
          </p>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-accent">Tel Aviv · Full time</span>
      </motion.div>
    </div>
  </section>
);

export default RoleFitSection;
