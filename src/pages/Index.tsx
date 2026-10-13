import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeX, Maximize, Minimize, HelpCircle, Play, X, Compass, BarChart3, Download } from "lucide-react";
import { RESUME_PDF } from "@/components/journal/FieldNotes";
import Navbar from "@/components/portfolio/Navbar";

const GAME_URL = "/games/temple-of-the-serpent.html";
// The game keeps its own mute setting here (same origin as the site).
const MUTE_KEY = "indy_serpent_muted";
const readMuted = () => {
  try { return localStorage.getItem(MUTE_KEY) === "1"; } catch { return false; }
};

const PlayTab = () => {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(readMuted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [help, setHelp] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // The game plays sound through Web Audio, so muting <audio> tags does nothing.
  // Its own mute toggle is bound to the O key: send that key to the game.
  const toggleMute = () => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      try {
        win.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyO", key: "o", bubbles: true }));
        win.dispatchEvent(new KeyboardEvent("keyup", { code: "KeyO", key: "o", bubbles: true }));
      } catch { /* ignore */ }
      setMuted(readMuted());
    } else {
      // Game not started yet: store the choice so it starts muted or unmuted.
      const next = !muted;
      try { localStorage.setItem(MUTE_KEY, next ? "1" : "0"); } catch { /* ignore */ }
      setMuted(next);
    }
    focusGame();
  };
  // The game listens for keys on its own window, so the iframe must hold keyboard focus.
  const focusGame = () => {
    const frame = iframeRef.current;
    if (!frame) return;
    frame.focus({ preventScroll: true });
    try {
      frame.contentWindow?.focus();
      (frame.contentDocument?.getElementById("game") as HTMLElement | null)?.focus({ preventScroll: true });
    } catch { /* ignore */ }
  };
  // The game cancels pointerdown, which stops the browser from moving focus into the iframe on click,
  // so focus it ourselves whenever the player presses inside the game.
  const onGameLoad = () => {
    focusGame();
    try {
      iframeRef.current?.contentDocument?.addEventListener("pointerdown", focusGame, true);
    } catch { /* ignore */ }
  };
  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await frameRef.current?.requestFullscreen?.();
    } catch { /* ignore */ }
    focusGame();
  };

  useEffect(() => {
    const onFs = () => setIsFullscreen(document.fullscreenElement === frameRef.current);
    // Pressing O inside the game changes its mute setting; the game window writes it to storage.
    const onStorage = (e: StorageEvent) => { if (e.key === MUTE_KEY) setMuted(e.newValue === "1"); };
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("storage", onStorage);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <span className="adv-stamp mb-4">A web game by Tommer Goldstein</span>
        <h1 className="adv-title font-adv-display font-extrabold text-3xl md:text-5xl leading-tight mt-4">
          INDIANA JONES<br />AND THE CALL OF CTHULHU
        </h1>
        <p className="font-adv-type adv-text-soft mt-3 text-sm md:text-base">An original adventure, designed and built from scratch</p>
      </div>

      <div ref={frameRef} className={`adv-frame relative ${isFullscreen ? "!rounded-none flex flex-col items-center justify-center h-screen w-screen bg-[hsl(var(--adv-leather-dark))]" : ""}`}>
        <div
          className="relative aspect-video bg-[hsl(var(--adv-leather-dark))] rounded overflow-hidden border border-[hsl(var(--adv-gold)/0.4)]"
          style={isFullscreen ? { width: "min(100%, calc((100vh - 6rem) * 16 / 9))" } : undefined}
        >
          {started ? (
            <iframe ref={iframeRef} src={GAME_URL} title="Indiana Jones and the Call of Cthulhu" className="w-full h-full" allow="fullscreen; autoplay; gamepad" allowFullScreen onLoad={onGameLoad} />
          ) : (
            <button onClick={() => setStarted(true)} className="absolute inset-0 flex flex-col items-center justify-center gap-6 group">
              <Compass size={44} className="text-[hsl(var(--adv-gold-light))] group-hover:rotate-45 transition-transform duration-500" />
              <span className="adv-btn text-sm md:text-base"><Play size={18} /> Start the Adventure</span>
              <span className="font-adv-type text-sm text-[hsl(var(--adv-parchment)/0.8)]">Click to enter the temple</span>
            </button>
          )}
          {isFullscreen && (
            <button
              onClick={fullscreen}
              aria-label="Exit fullscreen"
              className="absolute top-3 right-3 z-20 adv-btn !py-1.5 !px-3 !text-[11px] opacity-80 hover:opacity-100"
            >
              <Minimize size={14} /> Exit
            </button>
          )}
          {help && (
            <div className="absolute inset-0 bg-[hsl(var(--adv-leather-dark)/0.92)] flex items-center justify-center p-4">
              <div className="adv-paper p-6 max-w-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-adv-display font-bold text-lg">Field Guide</h3>
                  <button onClick={() => { setHelp(false); focusGame(); }} aria-label="Close help"><X size={20} /></button>
                </div>
                <p className="font-adv-type text-sm leading-relaxed">Use the keyboard (arrows / WASD) or touch controls. Explore, dodge traps, and find the relic. Press O or the Sound button to mute. Press Fullscreen for the full adventure, and Esc or Exit to leave it.</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-5">
          <button className="adv-btn adv-btn-ghost !py-2 !px-4 !text-xs" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />} {muted ? "Muted" : "Sound"}</button>
          <button className="adv-btn adv-btn-ghost !py-2 !px-4 !text-xs" onClick={fullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>{isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />} {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</button>
          <button className="adv-btn adv-btn-ghost !py-2 !px-4 !text-xs" onClick={() => setHelp(true)} aria-label="Help"><HelpCircle size={15} /> Help</button>
        </div>
      </div>

      <p className="text-center font-adv-type adv-text-soft mt-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        I designed and built this whole game myself, using modern AI tools for the soundtrack and the art, to push my creativity and learn fast.
      </p>

      <div className="adv-paper relative max-w-3xl mx-auto mt-12 p-6 md:p-8 text-center">
        <div className="adv-tape absolute -top-3 left-1/2 -translate-x-1/2" aria-hidden="true" />
        <p className="font-adv-type text-xs tracking-widest uppercase text-[hsl(var(--adv-red))]">The explorer behind the game</p>
        <h2 className="font-adv-display font-extrabold text-2xl md:text-3xl mt-2">Tommer Goldstein · Data Analyst, Gaming</h2>
        <p className="adv-text-soft text-base md:text-lg leading-relaxed mt-3">
          Industrial Engineering &amp; Information Systems student at Bar-Ilan. I turn real operational data into dashboards and KPIs people act on.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link to="/projects" className="adv-btn"><BarChart3 size={17} /> See the Data Work</Link>
          <a href={RESUME_PDF} download="Tommer_Goldstein_CV.pdf" className="adv-btn adv-btn-leather"><Download size={17} /> Download CV</a>
        </div>
      </div>
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
