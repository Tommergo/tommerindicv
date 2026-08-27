import { motion } from "framer-motion";
import { BarChart3, Cpu, FolderKanban, Rocket } from "lucide-react";

const groups = [
  {
    icon: BarChart3,
    title: "Data & Analytics",
    subtitle: "Trends, discrepancies, opportunities — then a recommendation",
    skills: ["Excel (Pivot, Lookups)", "Python", "Pandas", "Statistical Analysis", "Data Visualization", "Machine Learning", "PCA"],
    color: "hsl(var(--primary))",
  },
  {
    icon: Rocket,
    title: "Marketing & Growth",
    subtitle: "Funnel thinking, campaign metrics, budget allocation",
    skills: ["Campaign Metrics (CPI, CTR, ROAS)", "A/B Testing", "Budget Tracking", "Reporting", "Presentation"],
    color: "hsl(var(--magenta))",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    subtitle: "Multiple projects, tight schedules, clear owners",
    skills: ["Prioritization", "Stakeholder Management", "Cross-team Collaboration", "Problem Solving", "Event Production"],
    color: "hsl(var(--violet))",
  },
  {
    icon: Cpu,
    title: "Tools & Platforms",
    subtitle: "Quick to learn any third-party dashboard",
    skills: ["MS-Office Suite", "BI Dashboards", "QA Testing", "Data Collection Systems", "Web Development"],
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
          Skills built for <span className="text-gradient-play">performance marketing</span>
        </h2>
        <p className="text-body">Tools, domains, and competencies I bring to a growth team.</p>
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
