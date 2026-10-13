import { useRef, useState } from "react";
import { Volume2, VolumeX, Maximize, HelpCircle, Play, X, Compass } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";

const GAME_URL = "/games/temple-of-the-serpent.html";

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
          INDY &amp; THE TEMPLE<br />OF THE SERPENT
        </h1>
        <p className="font-adv-type adv-text-soft mt-3 text-sm md:text-base">An original adventure, designed and built from scratch</p>
      </div>

      <div ref={frameRef} className="adv-frame relative">
        <div className="relative aspect-video bg-[hsl(var(--adv-leather-dark))] rounded overflow-hidden border border-[hsl(var(--adv-gold)/0.4)]">
          {started ? (
            <iframe ref={iframeRef} src={GAME_URL} title="Indy and the Temple of the Serpent" className="w-full h-full" allow="fullscreen; autoplay; gamepad" allowFullScreen />
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
        I designed and built this whole game myself, using modern AI tools for the soundtrack and the art, to push my creativity and learn fast.
      </p>
    </section>
  );
};

const Index = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-10 md:pb-14">
      <PlayTab />
    </main>
    <footer className="text-center font-adv-type text-xs adv-text-soft pb-8">© 2026 Tommer Goldstein · All relics reserved</footer>
  </div>
);

export default Index;
