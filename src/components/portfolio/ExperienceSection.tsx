import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Server, GraduationCap, Gamepad2 } from "lucide-react";
import redisLogo from "@/assets/redis-logo.png";

const experiences = [
  {
    icon: GraduationCap,
    title: "Teaching Assistant, Interfaces & Information Presentation",
    desc: "Bar-Ilan University. Tableau is part of the syllabus.",
    responsibilities: [
      "Teach Tableau, dashboard design and KPI definition to 60 engineering students across two classes",
      "Review and grade student dashboards: what reads at a glance, what misleads, and what a decision-maker actually needs",
    ],
    skills: ["Tableau", "Dashboard Design", "KPIs", "Teaching"],
  },
  {
    icon: Gamepad2,
    title: "QA Game Tester, Faculty of Education",
    desc: "Bar-Ilan University. Tested an educational game in development.",
    responsibilities: [
      "Reproduced and documented bugs, and verified fixes across release cycles",
      "Proposed improvements to the game itself and saw those suggestions acted on",
    ],
    skills: ["QA Testing", "Analytical Thinking", "Attention to Detail"],
  },
  {
    icon: Server,
    title: "Help Desk & System Administrator, Redis",
    desc: "Global high-tech company. Site-wide technical support across departments and R&D.",
    responsibilities: [
      "Wrote SQL daily against user data to find duplicates and anomalies",
      "Used Python to automate repetitive work",
      "Managed user accounts, permissions and access",
    ],
    skills: ["SQL", "Python", "Data Management"],
    logo: redisLogo,
  },
];

const ExperienceSection = () => (
  <section id="experience" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-6">
          <Briefcase size={14} /> Experience
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Professional Experience</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 md:p-8 card-shadow hover:card-shadow-hover transition-all duration-300 border border-border hover:border-primary/30"
          >
            {"logo" in exp && exp.logo ? (
              <img src={exp.logo} alt={exp.title} className="w-11 h-11 rounded-xl object-contain mb-4" />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <exp.icon className="text-primary" size={22} />
              </div>
            )}
            <h3 className="font-display font-semibold text-lg mb-2">{exp.title}</h3>
            <p className="text-body text-base mb-4">{exp.desc}</p>

            <div className="space-y-2 mb-5">
              {exp.responsibilities.map((r) => (
                <div key={r} className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={14} />
                  <span className="text-body text-base">{r}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium">
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

export default ExperienceSection;
