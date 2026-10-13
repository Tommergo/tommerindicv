import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { Maximize2 } from "lucide-react";

const GAME_URL = "/games/temple-of-the-serpent.html";

const GamePage = () => (
  <div className="adv-theme min-h-screen">
    <Navbar />
    <main className="pt-24 pb-16 container mx-auto px-4">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <span className="adv-stamp">An original web game</span>
        <h1 className="adv-title font-adv-display font-extrabold text-3xl md:text-5xl mt-4 mb-3">
          Indy &amp; the <span className="text-gradient-play">Temple of the Serpent</span>
        </h1>
        <p className="font-adv-type adv-text-soft text-sm md:text-base">
          A game I designed and built from scratch. Click inside the game to start playing.
        </p>
      </div>
      <div className="max-w-6xl mx-auto adv-frame">
        <div className="rounded overflow-hidden border border-[hsl(var(--adv-gold)/0.4)] aspect-video bg-[hsl(var(--adv-leather-dark))]">
          <iframe
            src={GAME_URL}
            title="Indy and the Temple of the Serpent"
            className="w-full h-full"
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
          />
        </div>
      </div>
      <div className="text-center mt-5">
        <a href={GAME_URL} target="_blank" rel="noreferrer" className="adv-btn adv-btn-ghost !py-2 !px-4 !text-xs">
          <Maximize2 size={15} /> Open in full screen
        </a>
      </div>
    </main>
    <Footer />
  </div>
);

export default GamePage;
