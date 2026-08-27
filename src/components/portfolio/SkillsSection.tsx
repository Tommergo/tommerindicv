import { motion } from "framer-motion";
import { BarChart3, Cpu, FolderKanban, Rocket } from "lucide-react";

const groups = [
  {
    icon: BarChart3,
    title: "Analytics",
    subtitle: "Machine Learning • Statistical Analysis • Experiments",
    skills: ["Python", "Pandas", "Statistical Analysis", "Data Visualization", "Machine Learning", "PCA"],
    color: "hsl(43, 96%, 56%)",
  },
  {
    icon: FolderKanban,
    title: "Leadership",
    subtitle: "Faculty committees • Student organizations",
    skills: ["Project Leadership", "Strategic Thinking", "Cross-team Collaboration", "Problem Solving"],
    color: "hsl(217, 91%, 60%)",
  },
  {
    icon: Rocket,
    title: "Execution",
    subtitle: "Social initiative adopted by municipality • Band management • Event production",
    skills: ["Social Innovation", "Event Production", "Band Management", "Community Impact"],
    color: "hsl(160, 84%, 39%)",
  },
  {
    icon: Cpu,
    title: "Technical",
    subtitle: "Web development • QA testing • Data analysis",
    skills: ["Web Development", "QA Testing", "Data Collection Systems", "Experiment Design", "Data Processing"],
    color: "hsl(271, 81%, 56%)",
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
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Skills</h2>
        <p className="text-body">Tools, domains, and competencies I bring to every project.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border hover:border-primary/30 group"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${g.color}20` }}>
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
