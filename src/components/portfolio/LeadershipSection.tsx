import { motion } from "framer-motion";
import engineeringCouncilLogo from "@/assets/engineering-council-logo.jpeg";
import engineeringFacultyLogo from "@/assets/engineering-faculty-logo.png";
import studentUnionLogo from "@/assets/student-union-logo.png";

const items = [
  {
    logo: engineeringFacultyLogo,
    title: "Faculty Engineering Committee",
    desc: "Active member representing students and participating in academic decision processes.",
  },
  {
    logo: engineeringCouncilLogo,
    title: "Student Event Planning Council",
    desc: "Planning large-scale student events and coordinating between different teams.",
  },
  {
    logo: studentUnionLogo,
    title: "Bar-Ilan Student Union",
    desc: "Involved in initiatives improving student experience and campus life.",
  },
];

const LeadershipSection = () => (
  <section id="leadership" className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Leadership & Organizational Experience</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 text-center border border-border hover:border-primary/30"
          >
            <img src={item.logo} alt={item.title} className="h-12 object-contain mx-auto mb-4" />
            <h3 className="font-display font-semibold mb-2">{item.title}</h3>
            <p className="text-body text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LeadershipSection;
