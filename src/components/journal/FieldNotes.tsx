import { Link } from "react-router-dom";
import { FileText, Download, Mail, Linkedin, ArrowRight } from "lucide-react";
import imgSports from "@/assets/projects/sports-analytics.jpg";
import imgBadminton from "@/assets/projects/badminton-ml.jpg";
import imgMemory from "@/assets/projects/memory-game.jpg";
import imgFaces from "@/assets/projects/face-pca.jpg";
import imgYouth from "@/assets/projects/youth-volunteers.jpg";
import imgBand from "@/assets/projects/crocodile-bill.jpg";

export const RESUME_PDF = "/Tommer_Goldstein_CV.pdf";

export interface FieldNote { title: string; tag: string; note: string; to: string; img: string }

export const dataProjects: FieldNote[] = [
  { title: "Operational KPI Analysis, Meir Medical Center", tag: "Python · Tableau · KPIs", note: "Analysed real hospital data with management and found that reporting quality broke down during the war. The hospital built emergency data-collection protocols on the findings.", to: "/projects/meir-medical", img: imgSports },
  { title: "Sports Data Analytics", tag: "Tableau · Budget vs Results", note: "Analyzed 1,247 athletes and ₪1.43M budget to expose dropout points and pro-conversion gaps.", to: "/projects/sports-analytics", img: imgSports },
  { title: "Badminton Performance ML", tag: "Python · Regression", note: "Modeled player fatigue from match data with regression to predict performance drops.", to: "/projects/badminton-ml", img: imgBadminton },
  { title: "Memory Game: Music & Attention", tag: "Experiment · ANOVA", note: "Ran a controlled experiment on how music affects memory, tested with ANOVA.", to: "/projects/memory-game", img: imgMemory },
  { title: "Face Data Analysis (PCA)", tag: "ML · Eigenfaces", note: "Built eigenfaces from scratch and classified faces with K-Nearest Neighbors.", to: "/projects/face-pca", img: imgFaces },
];

export const leadershipProjects: FieldNote[] = [
  { title: "Youth Volunteers Initiative", tag: "Leadership · Ops", note: "Founded and ran a social initiative connecting youth volunteers with the community.", to: "/leadership#youth", img: imgYouth },
  { title: "Crocodile Bill", tag: "Band Manager", note: "Manage an independent band: logistics, budget, partners and promotion. Ran A/B tests on social post formats.", to: "/leadership#band", img: imgBand },
];

const TILTS = [-1.5, 1, -1, 1.5, -1, 1, -1.5];

export const PolaroidGrid = ({ items }: { items: FieldNote[] }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {items.map((p, i) => (
      <Link key={p.title} to={p.to} className="adv-paper relative block p-4 pb-5 hover:-translate-y-1.5 transition-transform duration-200" style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}>
        <div className="adv-tape absolute -top-3 left-1/2 -translate-x-1/2 z-10" />
        <div className="aspect-[4/3] overflow-hidden rounded-sm border border-[hsl(var(--adv-leather)/0.35)] mb-4">
          <img src={p.img} alt={p.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover" />
        </div>
        <p className="font-adv-type text-[11px] tracking-widest text-[hsl(var(--adv-red))] mb-1.5 uppercase">{p.tag}</p>
        <h3 className="font-adv-display font-bold text-lg leading-snug mb-2">{p.title}</h3>
        <p className="text-sm adv-text-soft leading-relaxed">{p.note}</p>
        <span className="inline-flex items-center gap-1.5 font-adv-display font-bold text-xs tracking-wider adv-text-gold mt-3 uppercase">Open File <ArrowRight size={13} /></span>
      </Link>
    ))}
  </div>
);

export const PageHeading = ({ stamp, title, subtitle }: { stamp: string; title: string; subtitle?: string }) => (
  <div className="text-center mb-10">
    <span className="adv-stamp">{stamp}</span>
    <h1 className="adv-title font-adv-display font-extrabold text-2xl md:text-4xl mt-4 mb-2">{title}</h1>
    {subtitle && <p className="font-adv-type adv-text-soft text-sm md:text-base">{subtitle}</p>}
  </div>
);

export const ExplorerCard = () => (
  <section className="max-w-3xl mx-auto">
    <div className="text-center mb-8">
      <span className="adv-stamp">Personnel File</span>
      <h2 className="adv-title font-adv-display font-extrabold text-2xl md:text-4xl mt-4">THE EXPLORER</h2>
    </div>
    <div className="adv-paper p-6 md:p-10 relative">
      <div className="adv-tape absolute -top-3 left-1/2 -translate-x-1/2" />
      <p className="text-base md:text-lg leading-relaxed">
        Hi, I'm <strong>Tommer Goldstein</strong>, a fourth-year Industrial Engineering and Information Systems student at
        Bar-Ilan University. I analyse real operational data, build Tableau dashboards, and present findings to the
        people who decide. I also build games in my own time: I designed and shipped this one from scratch.
        I'm looking for a Data Analyst role in gaming.
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      <Link to="/experience" className="adv-btn adv-btn-leather"><FileText size={17} /> See My Experience</Link>
      <a href={RESUME_PDF} download="Tommer_Goldstein_CV.pdf" className="adv-btn"><Download size={17} /> Download PDF</a>
    </div>
    <div className="flex flex-wrap justify-center gap-6 mt-8 font-adv-type text-sm">
      <a href="mailto:tommer1999@gmail.com" className="inline-flex items-center gap-2 adv-text-gold hover:underline"><Mail size={16} /> tommer1999@gmail.com</a>
      <a href="https://linkedin.com/in/tommer-goldstein-6784a5248" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 adv-text-gold hover:underline"><Linkedin size={16} /> LinkedIn</a>
    </div>
  </section>
);

