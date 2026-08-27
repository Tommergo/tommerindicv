import { motion } from "framer-motion";
import { Briefcase, Music, CheckCircle2, Server } from "lucide-react";
import redisLogo from "@/assets/redis-logo.png";
import unityLogo from "@/assets/unity-logo.png";

const experiences = [
  {
    icon: Server,
    title: "IT Help Desk – Redis",
    desc: "Worked at Redis as IT Help Desk, managing user account data and infrastructure.",
    responsibilities: [
      "Managing and maintaining user account data",
      "Identifying and resolving duplicate accounts",
      "Handling physical connections and hardware setup",
      "Account provisioning and access management",
    ],
    skills: ["Data Management", "IT Support", "Problem Solving", "Account Administration"],
    logo: redisLogo,
  },
  {
    icon: Server,
    title: "QA Tester – Computer Game",
    logo: unityLogo,
    desc: "Performed Quality Assurance testing for a computer game project.",
    responsibilities: [
      "Identifying bugs and unexpected behavior",
      "Testing gameplay mechanics and system stability",
      "Writing structured feedback and bug reports",
      "Collaborating with developers to improve product quality",
    ],
    skills: ["Analytical Thinking", "Attention to Detail", "Systematic Testing"],
  },
  {
    icon: Music,
    title: "Band Manager & Producer – Crocodile Bill",
    desc: "Organizer and manager of the blues-rock band Crocodile Bill.",
    responsibilities: [
      "Managing rehearsals and live performances",
      "Coordinating musicians and logistics",
      "Organizing concerts and events",
      "Branding, promotion, and audience engagement",
    ],
    skills: ["Leadership", "Event Production", "Team Coordination", "Project Management"],
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
            <p className="text-body text-sm mb-4">{exp.desc}</p>

            <div className="space-y-2 mb-5">
              {exp.responsibilities.map((r) => (
                <div key={r} className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={14} />
                  <span className="text-body text-sm">{r}</span>
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
