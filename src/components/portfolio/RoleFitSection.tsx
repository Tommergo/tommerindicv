import { motion } from "framer-motion";
import { PageHeading, ICON_BADGE } from "@/components/journal/FieldNotes";
import { Database, LayoutDashboard, Gauge, FlaskConical, Presentation, Code2 } from "lucide-react";

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
      "Defined and presented KPIs at Meir Medical Center that informed changes to the hospital's data-collection process.",
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
      "Presented findings to a hospital's senior management, and a budget-vs-results analysis to a sports club's leadership. 2nd place in the Sharks Innovation Competition, judged by entrepreneurs and academics.",
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
  <section id="fit" className="section-padding">
    <div className="container mx-auto px-4">
      <PageHeading level={2} stamp="Role Fit" title="WHY I FIT: DATA ANALYST, GAMING" subtitle="Every requirement in the job description, matched to something I have already done" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {fits.map((f, i) => (
          <motion.div
            key={f.req}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="adv-paper relative p-6"
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-dashed border-[hsl(var(--adv-leather)/0.3)]">
              <div className={ICON_BADGE}><f.icon size={20} /></div>
              <h3 className="font-adv-display font-bold text-lg leading-snug">{f.req}</h3>
            </div>
            <p className="adv-text-soft text-base leading-relaxed">{f.proof}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default RoleFitSection;
