import { motion } from "framer-motion";
import { PageHeading, ICON_BADGE, CHIP } from "@/components/journal/FieldNotes";
import { BarChart3, LayoutDashboard, FlaskConical, Presentation } from "lucide-react";

const groups = [
  {
    icon: BarChart3,
    title: "Analysis",
    subtitle: "From raw data to a finding",
    skills: ["SQL", "Python", "pandas", "NumPy", "Excel", "Statistical Analysis"],
    color: "hsl(var(--primary))",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & BI",
    subtitle: "Dashboards people actually use",
    skills: ["Tableau", "Dashboard Design", "Data Visualization", "KPI Definition", "KPI Reporting"],
    color: "hsl(var(--adv-red))",
  },
  {
    icon: FlaskConical,
    title: "Analytics Methods",
    subtitle: "Measure, compare, recommend",
    skills: ["A/B Testing", "Correlation Analysis", "ROI Analysis", "Machine Learning", "PCA"],
    color: "hsl(var(--adv-jungle))",
  },
  {
    icon: Presentation,
    title: "Communication & Delivery",
    subtitle: "Analysis that lands",
    skills: ["Presenting to Leadership", "Teaching Tableau", "Project Management", "Stakeholder Management", "QA Testing"],
    color: "hsl(var(--adv-gold))",
  },
];

const SkillsSection = () => (
  <section id="skills" className="section-padding">
    <div className="container mx-auto px-4">
      <PageHeading level={2} stamp="Field Kit" title="SKILLS" subtitle="Tools and competencies I bring to a data team" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="adv-paper relative p-6"
          >
            <div className={`${ICON_BADGE} mb-4`}><g.icon size={20} /></div>
            <h3 className="font-adv-display font-bold text-lg mb-1">{g.title}</h3>
            <p className="adv-text-soft text-sm mb-4 leading-relaxed">{g.subtitle}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.skills.map((s) => (
                <span key={s} className={CHIP}>{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
