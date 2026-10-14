import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PageHeading, ICON_BADGE, CHIP } from "@/components/journal/FieldNotes";
import { CheckCircle2, Server, GraduationCap, Gamepad2 } from "lucide-react";
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
      "Used SQL queries and Excel on user data in the IT department to find duplicate accounts and anomalies",
      "Used Python to automate repetitive work",
      "Managed user accounts, permissions and access",
    ],
    skills: ["SQL", "Python", "Data Management"],
    logo: redisLogo,
  },
];

const ExperienceSection = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
  <section id="experience" className="section-padding">
    <div className="container mx-auto px-4">
      <PageHeading stamp="Expedition Log" title="EXPERIENCE" subtitle="Where I have worked, and what I did there" />

      <ol ref={listRef} className="relative max-w-3xl mx-auto">
        <span aria-hidden="true" className="absolute left-[21px] top-2 bottom-2 border-l-2 border-dashed border-[hsl(var(--adv-leather)/0.2)]" />
        <motion.span aria-hidden="true" style={{ scaleY: drawn }} className="absolute left-[21px] top-2 bottom-2 origin-top border-l-2 border-dashed border-[hsl(var(--adv-red)/0.7)]" />
        {experiences.map((exp, i) => (
          <motion.li
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-16 pb-10 last:pb-0"
          >
            <motion.div
              className={`${ICON_BADGE} absolute left-0 top-1 overflow-hidden`}
              initial={{ y: -60, scale: 1.35, opacity: 0 }}
              whileInView={{ y: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 380, damping: 14, delay: i * 0.1 + 0.15 }}
            >
              {"logo" in exp && exp.logo ? (
                <img src={exp.logo} alt="" className="w-7 h-7 object-contain" />
              ) : (
                <exp.icon size={20} />
              )}
            </motion.div>
            <div className="adv-paper p-6 md:p-7">
              <h3 className="font-adv-display font-bold text-xl mb-1 leading-snug">{exp.title}</h3>
              <p className="font-adv-type adv-text-soft text-sm mb-4">{exp.desc}</p>
              <ul className="space-y-2 mb-5">
                {exp.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <CheckCircle2 className="adv-text-gold shrink-0 mt-1" size={15} />
                    <span className="adv-text-soft text-base leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((s) => (
                  <span key={s} className={CHIP}>{s}</span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
  );
};

export default ExperienceSection;
