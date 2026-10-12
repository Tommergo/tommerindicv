import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeX, Maximize, HelpCircle, Play, FileText, Download, Mail, Linkedin, X, ArrowRight } from "lucide-react";

const GAME_URL = "/games/temple-of-the-serpent.html";
const RESUME_PDF = "/resume.pdf";

type Tab = "play" | "about" | "projects";
const tabs: { id: Tab; label: string }[] = [
  { id: "play", label: "Play Game" },
  { id: "about", label: "About & Resume" },
  { id: "projects", label: "Other Projects" },
];

const projects = [
  { title: "Sports Data Analytics", tag: "Dashboards · Budget", note: "Analyzed 1,247 athletes and ₪1.43M budget to expose dropout points and pro-conversion gaps.", to: "/projects/sports-analytics" },
  { title: "Badminton Performance ML", tag: "Python · Regression", note: "Modeled player fatigue from match data with regression to predict performance drops.", to: "/projects" },
  { title: "Memory Game: Music & Attention", tag: "Experiment · ANOVA", note: "Ran a controlled experiment on how music affects memory, tested with ANOVA.", to: "/projects" },
  { title: "Face Data Analysis (PCA)", tag: "ML · Eigenfaces", note: "Built eigenfaces from scratch and classified faces with K-Nearest Neighbors.", to: "/projects" },
  { title: "Youth Volunteers Initiative", tag: "Leadership · Ops", note: "Founded and ran a social initiative connecting youth volunteers with the community.", to: "/leadership" },
  { title: "Crocodile Bill", tag: "Band Manager", note: "Manage and play guitar in a blues-rock band: booking shows and producing live events.", to: "/leadership" },
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
      <div className="text-center mb-6">
        <p className="font-pixel text-[10px] md:text-xs px-text-sand mb-3">A WEB GAME BY TOMMER GOLDSTEIN</p>
        <h1 className="px-title text-xl md:text-4xl leading-relaxed">INDY &amp; THE TEMPLE<br />OF THE SERPENT</h1>
      </div>

      <div ref={frameRef} className="px-stone-frame relative">
        <div className="relative aspect-video bg-[hsl(var(--px-night))] border-4 border-[hsl(var(--px-ink))]">
          {started ? (
            <iframe ref={iframeRef} src={GAME_URL} title="Indy & the Temple of the Serpent" className="w-full h-full" allow="fullscreen; autoplay; gamepad" allowFullScreen />
          ) : (
            <button onClick={() => setStarted(true)} className="absolute inset-0 flex flex-col items-center justify-center gap-6 group">
              <span className="font-pixel text-xs md:text-sm px-text-gold px-blink">PRESS START</span>
              <span className="px-btn text-sm md:text-base"><Play size={18} /> START GAME</span>
              <span className="font-pixel-body text-xl px-text-sand">Click to enter the temple</span>
            </button>
          )}
          {help && (
            <div className="absolute inset-0 bg-[hsl(var(--px-night)/0.9)] flex items-center justify-center p-4">
              <div className="px-parchment p-6 max-w-md font-pixel-body text-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs !text-[hsl(var(--px-ink))]">FIELD GUIDE</h3>
                  <button onClick={() => setHelp(false)} aria-label="Close help"><X size={20} /></button>
                </div>
                <p>Click inside the game to focus it. Use the keyboard (arrows / WASD) or touch controls. Explore, dodge traps, and find the relic. Press fullscreen for the full adventure.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-5">
          <button className="px-btn px-btn-stone" onClick={toggleMute} aria-label="Mute">{muted ? <VolumeX size={16} /> : <Volume2 size={16} />} {muted ? "MUTED" : "SOUND"}</button>
          <button className="px-btn px-btn-stone" onClick={fullscreen} aria-label="Fullscreen"><Maximize size={16} /> FULL</button>
          <button className="px-btn px-btn-stone" onClick={() => setHelp(true)} aria-label="Help"><HelpCircle size={16} /> HELP</button>
        </div>
      </div>

      <p className="text-center font-pixel-body text-2xl px-text-sand mt-8 max-w-2xl mx-auto">
        I designed and built this whole game myself, using modern AI tools, to push my creativity and learn fast.
      </p>
    </section>
  );
};

const AboutTab = () => (
  <section className="max-w-3xl mx-auto">
    <h2 className="px-title text-lg md:text-2xl text-center mb-8">THE EXPLORER</h2>
    <div className="px-parchment p-6 md:p-10">
      <p className="font-pixel-body text-2xl md:text-[28px] leading-snug">
        Hi, I'm <strong>Tommer Goldstein</strong>. I'm a 4th-year student in Industrial Engineering and Information Systems at
        Bar-Ilan University, specializing in data analysis and operations research. I have a huge passion for Indiana Jones,
        the Call of Cthulhu mythos, and game design. During my free time, I challenged myself to build a complete web game
        using modern AI tools to showcase my creativity, technical problem-solving, and fast learning capabilities.
        I'm currently seeking my next big career challenge!
      </p>
    </div>
    <div className="flex flex-wrap justify-center gap-6 mt-10">
      <Link to="/resume" className="px-btn px-btn-leather"><FileText size={18} /> VIEW FULL RESUME</Link>
      <a href={RESUME_PDF} download="Tommer_Goldstein_Resume.pdf" className="px-btn"><Download size={18} /> DOWNLOAD PDF</a>
    </div>
    <div className="flex flex-wrap justify-center gap-6 mt-8 font-pixel-body text-2xl">
      <a href="mailto:tommer1999@gmail.com" className="inline-flex items-center gap-2 px-text-gold hover:underline"><Mail size={18} /> tommer1999@gmail.com</a>
      <a href="https://linkedin.com/in/tommer-goldstein-6784a5248" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-text-gold hover:underline"><Linkedin size={18} /> LinkedIn</a>
    </div>
  </section>
);

const ProjectsTab = () => (
  <section className="max-w-6xl mx-auto">
    <h2 className="px-title text-lg md:text-2xl text-center mb-3">FIELD NOTES</h2>
    <p className="text-center font-pixel-body text-2xl px-text-sand mb-10">Expeditions in data, research and leadership</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((p, i) => (
        <Link key={p.title} to={p.to} className="px-polaroid relative block" style={{ transform: `rotate(${[-2, 1.5, -1, 2, -1.5, 1][i]}deg)` }}>
          <div className="px-clip absolute -top-4 left-1/2 -translate-x-1/2" />
          <div className="aspect-[4/3] px-panel flex items-center justify-center mb-4">
            <span className="font-pixel text-2xl px-text-gold">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <p className="font-pixel text-[9px] text-[hsl(var(--px-red))] mb-2">{p.tag.toUpperCase()}</p>
          <h3 className="text-[11px] leading-relaxed !text-[hsl(var(--px-ink))] mb-2">{p.title}</h3>
          <p className="font-pixel-body text-xl leading-tight">{p.note}</p>
          <span className="inline-flex items-center gap-1 font-pixel text-[9px] mt-3">OPEN FILE <ArrowRight size={12} /></span>
        </Link>
      ))}
    </div>
  </section>
);

const Index = () => {
  const [tab, setTab] = useState<Tab>("play");
  return (
    <div className="pixel-theme min-h-screen">
      <header className="px-panel !border-x-0 !border-t-0 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-pixel text-sm px-text-gold">TOMMER<span className="px-text-sand">.EXE</span></span>
          <nav className="flex flex-wrap justify-center gap-3 pb-1.5">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} data-active={tab === t.id}
                className={`px-btn !text-[10px] md:!text-xs ${tab === t.id ? "" : "px-btn-leather"}`}>
                {t.label.toUpperCase()}
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
      <footer className="text-center font-pixel text-[9px] px-text-sand pb-8">© 2026 TOMMER GOLDSTEIN · ALL RELICS RESERVED</footer>
    </div>
  );
};

export default Index;
