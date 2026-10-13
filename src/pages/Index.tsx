import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeX, Maximize, HelpCircle, Play, FileText, Download, Mail, Linkedin, X, ArrowRight, Compass } from "lucide-react";
import imgSports from "@/assets/projects/sports-analytics.jpg";
import imgBadminton from "@/assets/projects/badminton-ml.jpg";
import imgMemory from "@/assets/projects/memory-game.jpg";
import imgFaces from "@/assets/projects/face-pca.jpg";
import imgYouth from "@/assets/projects/youth-volunteers.jpg";
import imgBand from "@/assets/projects/crocodile-bill.jpg";

const GAME_URL = "/games/temple-of-the-serpent.html";
const RESUME_PDF = "/resume.pdf";

type Tab = "play" | "about" | "projects";
const tabs: { id: Tab; label: string }[] = [
  { id: "play", label: "Play Game" },
  { id: "about", label: "About & Resume" },
  { id: "projects", label: "Other Projects" },
];

const projects = [
  { title: "Sports Data Analytics", tag: "Dashboards · Budget", note: "Analyzed 1,247 athletes and ₪1.43M budget to expose dropout points and pro-conversion gaps.", to: "/projects/sports-analytics", img: imgSports },
  { title: "Badminton Performance ML", tag: "Python · Regression", note: "Modeled player fatigue from match data with regression to predict performance drops.", to: "/projects", img: imgBadminton },
  { title: "Memory Game: Music & Attention", tag: "Experiment · ANOVA", note: "Ran a controlled experiment on how music affects memory, tested with ANOVA.", to: "/projects", img: imgMemory },
  { title: "Face Data Analysis (PCA)", tag: "ML · Eigenfaces", note: "Built eigenfaces from scratch and classified faces with K-Nearest Neighbors.", to: "/projects", img: imgFaces },
  { title: "Youth Volunteers Initiative", tag: "Leadership · Ops", note: "Founded and ran a social initiative connecting youth volunteers with the community.", to: "/leadership", img: imgYouth },
  { title: "Crocodile Bill", tag: "Band Manager", note: "Manage and play guitar in a blues-rock band: booking shows and producing live events.", to: "/leadership", img: imgBand },
];

const PlayTab = () => {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [help, setHelp] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try {
      iframeRef.current?.contentDocument?.querySelectorAll("audio,video").forEach((m) => ((m as HTMLMediaElement).muted = next));
    } catch { /* ignore */ }
  };
  const fullscreen = () => frameRef.current?.requestFullscreen?.();

  return (
    <section className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <span className="adv-stamp mb-4">A web game by Tommer Goldstein</span>
        <h1 className="adv-title font-adv-display font-extrabold text-3xl md:text-5xl leading-tight mt-4">
          INDIANA JONES<br />AND THE CALL OF CTHULHU
        </h1>
        <p className="font-adv-type adv-text-soft mt-3 text-sm md:text-base">An original adventure — designed &amp; built from scratch</p>
      </div>

      <div ref={frameRef} className="adv-frame relative">
        <div className="relative aspect-video bg-[hsl(var(--adv-leather-dark))] rounded overflow-hidden border border-[hsl(var(--adv-gold)/0.4)]">
          {started ? (
            <iframe ref={iframeRef} src={GAME_URL} title="Indiana Jones and the Call of Cthulhu" className="w-full h-full" allow="fullscreen; autoplay; gamepad" allowFullScreen />
          ) : (
            <button onClick={() => setStarted(true)} className="absolute inset-0 flex flex-col items-center justify-center gap-6 group">
              <Compass size={44} className="text-[hsl(var(--adv-gold-light))] group-hover:rotate-45 transition-transform duration-500" />
              <span className="adv-btn text-sm md:text-base"><Play size={18} /> Start the Adventure</span>
              <span className="font-adv-type text-sm text-[hsl(var(--adv-parchment)/0.8)]">Click to enter the temple</span>
            </button>
          )}
          {help && (
            <div className="absolute inset-0 bg-[hsl(var(--adv-leather-dark)/0.92)] flex items-center justify-center p-4">
              <div className="adv-paper p-6 max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-adv-display font-bold text-lg">Field Guide</h3>
                  <button onClick={() => setHelp(false)} aria-label="Close help"><X size={20} /></button>
                </div>
                <p className="font-adv-type text-sm leading-relaxed">Click inside the game to focus it. Use the keyboard (arrows / WASD) or touch controls. Explore, dodge traps, and find the relic. Press fullscreen for the full adventure.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-5">
          <button className="adv-btn adv-btn-ghost !py-2 !px-4 !text-xs" onClick={toggleMute} aria-label="Mute">{muted ? <VolumeX size={15} /> : <Volume2 size={15} />} {muted ? "Muted" : "Sound"}</button>
          <button className="adv-btn adv-btn-ghost !py-2 !px-4 !text-xs" onClick={fullscreen} aria-label="Fullscreen"><Maximize size={15} /> Fullscreen</button>
          <button className="adv-btn adv-btn-ghost !py-2 !px-4 !text-xs" onClick={() => setHelp(true)} aria-label="Help"><HelpCircle size={15} /> Help</button>
        </div>
      </div>

      <p className="text-center font-adv-type adv-text-soft mt-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        I designed and built this whole game myself, using modern AI tools, to push my creativity and learn fast.
      </p>
    </section>
  );
};

const AboutTab = () => (
  <section className="max-w-3xl mx-auto">
    <div className="text-center mb-8">
      <span className="adv-stamp">Expedition File №1</span>
      <h2 className="adv-title font-adv-display font-extrabold text-2xl md:text-4xl mt-4">THE EXPLORER</h2>
    </div>
    <div className="adv-paper p-6 md:p-10 relative">
      <div className="adv-tape absolute -top-3 left-1/2 -translate-x-1/2" />
      <p className="text-base md:text-lg leading-relaxed">
        Hi, I'm <strong>Tommer Goldstein</strong>. I'm a 4th-year student in Industrial Engineering and Information Systems at
        Bar-Ilan University, specializing in data analysis and operations research. I have a huge passion for Indiana Jones,
        the Call of Cthulhu mythos, and game design. During my free time, I challenged myself to build a complete web game
        using modern AI tools to showcase my creativity, technical problem-solving, and fast learning capabilities.
        I'm currently seeking my next big career challenge!
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      <Link to="/resume" className="adv-btn adv-btn-leather"><FileText size={17} /> View Full Resume</Link>
      <a href={RESUME_PDF} download="Tommer_Goldstein_Resume.pdf" className="adv-btn"><Download size={17} /> Download PDF</a>
    </div>
    <div className="flex flex-wrap justify-center gap-6 mt-8 font-adv-type text-sm">
      <a href="mailto:tommer1999@gmail.com" className="inline-flex items-center gap-2 adv-text-gold hover:underline"><Mail size={16} /> tommer1999@gmail.com</a>
      <a href="https://linkedin.com/in/tommer-goldstein-6784a5248" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 adv-text-gold hover:underline"><Linkedin size={16} /> LinkedIn</a>
    </div>
  </section>
);

const ProjectsTab = () => (
  <section className="max-w-6xl mx-auto">
    <div className="text-center mb-10">
      <span className="adv-stamp">Archive of Expeditions</span>
      <h2 className="adv-title font-adv-display font-extrabold text-2xl md:text-4xl mt-4 mb-2">FIELD NOTES</h2>
      <p className="font-adv-type adv-text-soft text-sm md:text-base">Expeditions in data, research and leadership</p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p, i) => (
        <Link key={p.title} to={p.to} className="adv-paper relative block p-4 pb-5 hover:-translate-y-1.5 transition-transform duration-200" style={{ transform: `rotate(${[-1.5, 1, -1, 1.5, -1, 1][i]}deg)` }}>
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
  </section>
);

const Index = () => {
  const [tab, setTab] = useState<Tab>("play");
  return (
    <div className="adv-theme min-h-screen">
      <header className="adv-leather-panel sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-adv-display font-bold text-lg text-[hsl(var(--adv-gold-light))] tracking-widest">TOMMER GOLDSTEIN</span>
          <nav className="flex flex-wrap justify-center gap-3">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} data-active={tab === t.id}
                className={`adv-btn !text-[11px] !py-2.5 !px-4 ${tab === t.id ? "" : "adv-btn-leather"}`}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10 md:py-14">
        {tab === "play" && <PlayTab />}
        {tab === "about" && <AboutTab />}
        {tab === "projects" && <ProjectsTab />}
      </main>
      <footer className="text-center font-adv-type text-xs adv-text-soft pb-8">© 2026 Tommer Goldstein · All relics reserved</footer>
    </div>
  );
};

export default Index;
