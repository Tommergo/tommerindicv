import { Link } from "react-router-dom";
import { FileText, Download, ArrowRight } from "lucide-react";
import imgSports from "@/assets/projects/sports-analytics.jpg";
import imgMeir from "@/assets/projects/meir-medical.jpg";
import imgBadminton from "@/assets/projects/badminton-ml.jpg";
import imgMemory from "@/assets/projects/memory-game.jpg";
import imgFaces from "@/assets/projects/face-pca.jpg";

export const RESUME_PDF = "/Tommer_Goldstein_CV.pdf";

export interface FieldNote { title: string; tag: string; note: string; to: string; img: string }

export const dataProjects: FieldNote[] = [
  { title: "Operational KPI Analysis, Meir Medical Center", tag: "Python · Tableau · KPIs", note: "Analysed real hospital data with management and found that reporting quality broke down during the war. The hospital built emergency data-collection protocols on the findings.", to: "/projects/meir-medical", img: imgMeir },
  { title: "Sports Data Analytics", tag: "Tableau · Budget vs Results", note: "Analyzed 1,247 athletes and ₪1.43M budget to expose dropout points and pro-conversion gaps.", to: "/projects/sports-analytics", img: imgSports },
  { title: "Badminton Performance Analytics", tag: "Python · Logistic Regression", note: "Used BWF World Tour data to find the in-match moments that decide who wins, and turned them into actions for coaches and players.", to: "/projects/badminton-ml", img: imgBadminton },
  { title: "Memory Game: Music & Attention", tag: "Experiment · ANOVA", note: "Built a memory game and ran a 30-person within-subjects experiment on music and attention, tested with repeated measures ANOVA.", to: "/projects/memory-game", img: imgMemory },
  { title: "Face Data Analysis (PCA)", tag: "ML · Eigenfaces", note: "Implemented PCA from scratch, matched MATLAB's built-in PCA exactly (77.59% accuracy) and classified faces with Nearest Neighbor.", to: "/projects/face-pca", img: imgFaces },
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

const STATS = [
  { value: "60", label: "Students I teach Tableau to" },
  { value: "95", label: "Final project grade, Meir Medical Center" },
  { value: "2nd", label: "Place, Shark Tank competition" },
];

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
    <div className="grid grid-cols-3 gap-3 md:gap-5 mt-10">
      {STATS.map((st) => (
        <div key={st.label} className="adv-paper p-4 text-center">
          <p className="font-adv-display font-extrabold text-2xl md:text-3xl adv-text-gold">{st.value}</p>
          <p className="text-xs md:text-sm adv-text-soft mt-1 leading-snug">{st.label}</p>
        </div>
      ))}
    </div>
    <p className="text-center font-adv-type text-sm adv-text-soft mt-6">Available for a full-time, long-term Data Analyst role in Tel Aviv.</p>
  </section>
);

