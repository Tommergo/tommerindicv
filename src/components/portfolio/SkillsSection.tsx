import { motion } from "framer-motion";
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
    color: "hsl(var(--magenta))",
  },
  {
    icon: FlaskConical,
    title: "Analytics Methods",
    subtitle: "Measure, compare, recommend",
    skills: ["A/B Testing", "Correlation Analysis", "ROI Analysis", "Machine Learning", "PCA"],
    color: "hsl(var(--violet))",
  },
  {
    icon: Presentation,
    title: "Communication & Delivery",
    subtitle: "Analysis that lands",
    skills: ["Presenting to Leadership", "Teaching Tableau", "Project Management", "Stakeholder Management", "QA Testing"],
    color: "hsl(var(--amber))",
  },
];

const SkillsSection = () => (
  <section id="skills" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-3">
          Skills built for <span className="text-gradient-play">product analytics</span>
        </h2>
        <p className="text-body">Tools and competencies I bring to a data team.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-3xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border hover:border-primary/40 group"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: `color-mix(in srgb, ${g.color} 18%, transparent)` }}
            >
              <g.icon size={22} style={{ color: g.color }} />
            </div>
            <h3 className="font-display font-semibold text-lg mb-1">{g.title}</h3>
            <p className="text-body text-xs mb-3 leading-relaxed">{g.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
