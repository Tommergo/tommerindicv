import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { Maximize2 } from "lucide-react";

const GAME_URL = "/games/temple-of-the-serpent.html";

const GamePage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16 container mx-auto px-4">
      <div className="max-w-5xl mx-auto text-center mb-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Indy &amp; the <span className="text-gradient-play">Temple of the Serpent</span>
        </h1>
        <p className="text-body">
          A game I designed and built from scratch. Click inside the game to start playing.
        </p>
      </div>
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-border card-shadow bg-card aspect-video">
        <iframe
          src={GAME_URL}
          title="Indy & the Temple of the Serpent"
          className="w-full h-full"
          allow="fullscreen; autoplay; gamepad"
          allowFullScreen
        />
      </div>
      <div className="text-center mt-4">
        <a href={GAME_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
          <Maximize2 size={16} /> Open in full screen
        </a>
      </div>
    </main>
    <Footer />
  </div>
);

export default GamePage;
