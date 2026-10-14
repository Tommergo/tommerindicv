import { Link } from "react-router-dom";
import { ArrowLeft, Target, Wrench, BookOpen, Award, Search } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { DevelopImg, Stamp } from "@/components/journal/motion";

export interface JournalProject {
  title: string;
  stamp: string;
  tag: string;
  image: string;
  goal: string;
  story: string[];
  skills: string[];
  outcome: string;
}

interface JournalProps {
  project: JournalProject;
  evidence?: React.ReactNode;
  backTo?: { href: string; label: string };
}

const Section = ({ icon, title, children, extra }: { icon: React.ReactNode; title: string; children: React.ReactNode; extra?: React.ReactNode }) => (
  <div className="adv-paper relative p-6 md:p-8">
    {extra}
    <h2 className="font-adv-display font-bold text-lg md:text-xl flex items-center gap-3 mb-4">
      <span className="adv-text-gold">{icon}</span> {title}
    </h2>
    {children}
  </div>
);

const JournalProjectPage = ({ project, evidence, backTo = { href: "/projects", label: "Back to Field Notes" } }: JournalProps) => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="pt-24 pb-16 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <Link to={backTo.href} className="inline-flex items-center gap-2 font-adv-display font-bold text-xs tracking-wider uppercase adv-text-gold hover:underline mb-8">
          <ArrowLeft size={14} /> {backTo.label}
        </Link>

        <div className="text-center mb-10">
          <span className="adv-stamp">{project.stamp}</span>
          <h1 className="adv-title font-adv-display font-extrabold text-3xl md:text-5xl mt-4 mb-2">{project.title}</h1>
          <p className="font-adv-type adv-text-soft text-sm md:text-base uppercase tracking-widest">{project.tag}</p>
        </div>

        <div className="adv-paper p-4 pb-5 mb-8 relative" style={{ transform: "rotate(-1deg)" }}>
          <div className="adv-tape absolute -top-3 left-1/2 -translate-x-1/2 z-10" />
          <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm border border-[hsl(var(--adv-leather)/0.35)]">
            <DevelopImg src={project.image} alt={project.title} width={1024} height={768} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid gap-6">
          <Section icon={<Target size={20} />} title="The Mission">
            <p className="text-base md:text-lg leading-relaxed adv-text-soft">{project.goal}</p>
          </Section>

          <Section icon={<BookOpen size={20} />} title="The Journey">
            <div className="space-y-4">
              {project.story.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed adv-text-soft">{p}</p>
              ))}
            </div>
          </Section>

          <Section icon={<Wrench size={20} />} title="Tools & Skills">
            <div className="flex flex-wrap gap-2.5">
              {project.skills.map((s) => (
                <span key={s} className="font-adv-type text-sm tracking-wider px-3 py-1.5 rounded border border-[hsl(var(--adv-leather)/0.4)] bg-[hsl(var(--adv-parchment-dark))]">
                  {s}
                </span>
              ))}
            </div>
          </Section>

          <Section icon={<Award size={20} />} title="The Relic Found" extra={<Stamp className="absolute top-4 right-4 md:top-5 md:right-6 text-sm md:text-lg">Found</Stamp>}>
            <p className="text-base md:text-lg leading-relaxed adv-text-soft">{project.outcome}</p>
          </Section>
        </div>

      </div>

      {evidence && (
        <section className="max-w-6xl mx-auto mt-16" aria-labelledby="field-evidence">
          <div className="text-center mb-8">
            <span className="adv-stamp">Field Evidence</span>
            <h2 id="field-evidence" className="adv-title font-adv-display font-extrabold text-2xl md:text-4xl mt-4 mb-2 flex items-center justify-center gap-3">
              <Search size={26} className="adv-text-gold" /> The Data Behind It
            </h2>
            <p className="font-adv-type adv-text-soft text-sm md:text-base">Charts, findings and recommendations from the original analysis</p>
          </div>
          {evidence}
        </section>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="adv-divider my-10" />
        <p className="text-center font-adv-type text-xs adv-text-soft">Recorded in the field journal of Tommer Goldstein</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default JournalProjectPage;
