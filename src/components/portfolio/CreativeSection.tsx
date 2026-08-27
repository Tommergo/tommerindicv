import { motion } from "framer-motion";
import { Music, Sparkles } from "lucide-react";
import bandBw from "@/assets/band-bw.png";
import bandLive from "@/assets/band-live.png";
import bandEvent from "@/assets/band-event.jpeg";
import barIlanStage from "@/assets/bar-ilan-stage.jpeg";

const CreativeSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold mb-6">
            <Sparkles size={14} /> Creative Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Creative Leadership</h2>
          <p className="text-body text-base md:text-lg leading-relaxed">
            Beyond analytics, I lead creative and production projects that require coordination, organization, and execution.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 card-shadow border border-border">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
              <Music className="text-primary" size={22} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg mb-2">Crocodile Bill</h3>
              <p className="text-body text-sm leading-relaxed">
                Band manager and guitarist of the blues-rock band Crocodile Bill, responsible for organizing performances, managing musicians, and producing live music events.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src={bandEvent} alt="Crocodile Bill live performance" className="w-full rounded-xl object-cover aspect-square border border-border" loading="lazy" />
            <img src={barIlanStage} alt="Performing on stage at Bar-Ilan University" className="w-full rounded-xl object-cover aspect-square border border-border" loading="lazy" />
            <img src={bandLive} alt="Tomer performing live with Crocodile Bill" className="w-full rounded-xl object-cover aspect-square border border-border" loading="lazy" />
            <img src={bandBw} alt="Crocodile Bill rehearsal" className="w-full rounded-xl object-cover aspect-square border border-border" loading="lazy" />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CreativeSection;
