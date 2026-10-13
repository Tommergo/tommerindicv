import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import CrocodileBillSection from "@/components/portfolio/CrocodileBillSection";
import { leadershipItems } from "@/components/portfolio/LeadershipSection";
import CaseFile from "@/components/journal/CaseFile";
import { PageHeading } from "@/components/journal/FieldNotes";
import crocCover from "@/assets/projects/crocodile-bill-inc.jpg";
import youthCover from "@/assets/projects/youth-initiative-map.jpg";
import youthPhoto from "@/assets/youth-initiative.jpeg";

const youthFacts = [
  { label: "Problem", text: "Youth at risk require trained mentors." },
  { label: "Approach", text: "Developed a training program for National Service volunteers to work with at-risk youth." },
  { label: "Impact", text: "The initiative was adopted by the Jerusalem Municipality." },
];

const ProjectManagementPage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <PageHeading stamp="Command Log" title="PROJECT MANAGEMENT" subtitle="Projects I ran end to end: clients, suppliers, people and budgets" />

        <div className="space-y-10">
          <CaseFile
            id="band"
            stamp="Founder & Manager"
            title="Crocodile Bill Inc."
            subtitle="Live music & sound services"
            teaser="A registered business I founded and run alongside my degree: live shows, sound for events and equipment rental, about 3 events a month."
            thumb={crocCover}
          >
            <CrocodileBillSection />
          </CaseFile>

          <CaseFile
            id="youth"
            stamp="Social Initiative"
            title="Training National Service Volunteers"
            subtitle="Program design · Leadership"
            teaser="A training program that prepares National Service volunteers to mentor at-risk youth. The Jerusalem Municipality adopted it."
            thumb={youthCover}
          >
            <figure className="adv-paper p-3 pb-4 mb-6" style={{ transform: "rotate(0.6deg)" }}>
              <img src={youthCover} alt="Training National Service Volunteers: problem, approach and impact" width={1024} height={732} loading="lazy" className="w-full h-auto rounded-sm border border-[hsl(var(--adv-leather)/0.35)]" />
            </figure>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {youthFacts.map((f) => (
                <div key={f.label} className="rounded border border-[hsl(var(--adv-leather)/0.3)] bg-[hsl(var(--adv-parchment)/0.6)] p-5">
                  <p className="font-adv-display font-bold text-sm uppercase tracking-wider text-[hsl(var(--adv-red))] mb-1">{f.label}</p>
                  <p className="text-base adv-text-soft leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
            <img src={youthPhoto} alt="Presenting the volunteer training program" loading="lazy" className="w-full rounded-sm border border-[hsl(var(--adv-leather)/0.35)] object-cover max-h-80" />
          </CaseFile>

          <CaseFile
            id="student-leadership"
            stamp="Campus"
            title="Student Leadership"
            subtitle="Bar-Ilan University"
            teaser="Faculty of Engineering committee, student event planning council and the Bar-Ilan Student Union."
          >
            <div className="grid md:grid-cols-3 gap-5">
              {leadershipItems.map((item) => (
                <div key={item.title} className="rounded border border-[hsl(var(--adv-leather)/0.3)] bg-[hsl(var(--adv-parchment)/0.6)] p-5 text-center">
                  <img src={item.logo} alt="" className="h-12 object-contain mx-auto mb-4" />
                  <h3 className="font-adv-display font-bold mb-2">{item.title}</h3>
                  <p className="text-base adv-text-soft leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </CaseFile>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ProjectManagementPage;
