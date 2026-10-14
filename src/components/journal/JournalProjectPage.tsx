import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Target, Wrench, BookOpen, Award, Search, ScrollText } from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { DevelopImg, Stamp, RevealScope, InkUnderline } from "@/components/journal/motion";
import { takeFlight } from "@/components/journal/heroFlight";

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

type Chapter = "summary" | "evidence";
type TabKey = "mission" | "journey" | "tools";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "mission", label: "The Mission", icon: Target },
  { key: "journey", label: "The Journey", icon: BookOpen },
  { key: "tools", label: "Tools", icon: Wrench },
];

const useIsDesktop = () => {
  const [d, setD] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setD(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
};

/** Flies the polaroid photo the reader clicked into this page's hero frame. */
const HeroFlight = ({ src, targetRef, onLanded }: { src: string; targetRef: React.RefObject<HTMLElement>; onLanded: () => void }) => {
  const reduce = useReducedMotion();
  const [flight] = useState(() => (reduce ? null : takeFlight(src)));
  const [landed, setLanded] = useState(false);
  const ghost = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const finish = () => { onLanded(); setLanded(true); };
    if (!flight) { finish(); return; }
    window.scrollTo(0, 0);
    const el = targetRef.current;
    const g = ghost.current;
    if (!el || !g || !g.animate) { finish(); return; }
    const t = el.getBoundingClientRect();
    const px = (r: { top: number; left: number; width: number; height: number }) =>
      ({ top: `${r.top}px`, left: `${r.left}px`, width: `${r.width}px`, height: `${r.height}px` });
    const anim = g.animate(
      [{ ...px(flight.rect), transform: "rotate(0deg)" }, { ...px(t), transform: "rotate(-1deg)" }],
      { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
    );
    anim.finished.then(finish, finish);
    return () => anim.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!flight || landed) return null;
  return createPortal(
    <img
      ref={ghost}
      src={src}
      alt=""
      aria-hidden="true"
      className="fixed z-[60] object-cover rounded-sm pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
      style={{ top: flight.rect.top, left: flight.rect.left, width: flight.rect.width, height: flight.rect.height }}
    />,
    document.body,
  );
};

/** The relic is buried under a cloth that is pulled away as the reader scrolls to it. */
const RelicReveal = ({ outcome }: { outcome: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const cover = useTransform(scrollYProgress, [0.15, 0.85], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const glow = useTransform(scrollYProgress, [0.6, 1], ["0 0 0px hsl(42 90% 60% / 0)", "0 0 36px hsl(42 90% 60% / 0.55)"]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y: lift }} className="relative mt-10">
      <motion.div style={reduce ? undefined : { boxShadow: glow }} className="adv-paper relative overflow-hidden p-6 md:p-8 border-2 border-[hsl(var(--adv-gold)/0.55)]">
        <Stamp className="absolute top-4 right-4 md:top-5 md:right-6 text-sm md:text-lg z-10" delay={0.5}>Found</Stamp>
        <h2 className="font-adv-display font-bold text-lg md:text-xl flex items-center gap-3 mb-4">
          <span className="adv-text-gold"><Award size={22} /></span> The Relic Found
        </h2>
        <p className="text-base md:text-lg leading-relaxed adv-text-soft">{outcome}</p>
        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ scaleY: cover }}
            className="absolute inset-0 origin-top bg-[hsl(var(--adv-leather))] flex items-end justify-center pb-4 [background-image:repeating-linear-gradient(45deg,hsl(var(--adv-leather-dark)/0.35)_0_2px,transparent_2px_9px)]"
          >
            <span className="font-adv-type text-xs tracking-[0.3em] uppercase text-[hsl(var(--adv-gold-light)/0.85)]">Keep digging</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

/** Big photo on the left page, tabbed notes on the right page. */
const Spread = ({ project, heroRef, heroVisible }: { project: JournalProject; heroRef: React.RefObject<HTMLDivElement>; heroVisible: boolean }) => {
  const [tab, setTab] = useState<TabKey>("mission");
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 700], [0, -40]);

  return (
    <div className="adv-spread grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-0 relative">
      {/* left page: the photograph */}
      <div className="md:pr-8">
        <div className="adv-paper md:shadow-none p-3 pb-4 relative" style={{ transform: "rotate(-1deg)" }}>
          <div className="adv-tape absolute -top-3 left-1/2 -translate-x-1/2 z-10" />
          <div ref={heroRef} className="aspect-[4/3] overflow-hidden rounded-sm border border-[hsl(var(--adv-leather)/0.35)]" style={{ opacity: heroVisible ? 1 : 0 }}>
            <motion.div style={reduce ? undefined : { y: parallax, scale: 1.12 }} className="w-full h-full">
              <DevelopImg src={project.image} alt={project.title} width={1024} height={768} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* right page: tabbed field notes */}
      <div className="md:pl-8 flex flex-col">
        <div role="tablist" aria-label="Field notes" className="flex gap-1.5 -mb-px relative z-10">
          {TABS.map((t) => {
            const on = tab === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={on}
                aria-controls={`tab-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`relative flex-1 inline-flex items-center justify-center gap-1.5 font-adv-display font-bold text-xs md:text-sm tracking-wide px-2 py-2.5 rounded-t-md border border-b-0 transition-colors ${
                  on
                    ? "bg-[hsl(var(--adv-paper))] border-[hsl(var(--adv-leather)/0.4)] text-[hsl(var(--adv-ink))]"
                    : "bg-[hsl(var(--adv-parchment-dark))] border-[hsl(var(--adv-leather)/0.25)] adv-text-soft hover:text-[hsl(var(--adv-ink))]"
                }`}
              >
                <t.icon size={15} className={on ? "adv-text-gold" : ""} /> {t.label}
                {on && <motion.span layoutId="journal-tab-ink" className="absolute left-3 right-3 top-0 h-[3px] rounded-b bg-[hsl(var(--adv-red))]" />}
              </button>
            );
          })}
        </div>
        <div className="flex-1 bg-[hsl(var(--adv-paper))] border border-[hsl(var(--adv-leather)/0.4)] rounded-b-md rounded-tr-md p-5 md:p-6 min-h-[16rem] overflow-hidden [background-image:repeating-linear-gradient(transparent_0_31px,hsl(205_40%_50%/0.12)_31px_32px)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              id={`tab-${tab}`}
              role="tabpanel"
              initial={{ opacity: 0, x: 24, rotate: 0.6 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -24, rotate: -0.6 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {tab === "mission" && <p className="text-base md:text-lg leading-relaxed adv-text-soft">{project.goal}</p>}
              {tab === "journey" && (
                <ol className="space-y-4">
                  {project.story.map((p, i) => (
                    <motion.li key={i} className="flex gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i + 0.1 }}>
                      <span className="font-adv-display font-extrabold adv-text-gold text-lg leading-7 shrink-0">{i + 1}.</span>
                      <p className="text-base leading-relaxed adv-text-soft">{p}</p>
                    </motion.li>
                  ))}
                </ol>
              )}
              {tab === "tools" && (
                <div className="flex flex-wrap gap-2.5">
                  {project.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: -14, rotate: i % 2 ? 4 : -4 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.04 * i }}
                      className="font-adv-type text-sm tracking-wider px-3 py-1.5 rounded border border-[hsl(var(--adv-leather)/0.4)] bg-[hsl(var(--adv-parchment-dark))]"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const JournalProjectPage = ({ project, evidence, backTo = { href: "/projects", label: "Back to Field Notes" } }: JournalProps) => {
  const { hash } = useLocation();
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const [chapter, setChapter] = useState<Chapter>(evidence && hash === "#evidence" ? "evidence" : "summary");
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (evidence) setChapter(hash === "#evidence" ? "evidence" : "summary");
  }, [hash, evidence]);

  const turnTo = (c: Chapter) => {
    if (c === chapter) return;
    setChapter(c);
    history.replaceState(null, "", c === "evidence" ? "#evidence" : location.pathname);
    const top = (bookRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 90;
    if (window.scrollY > top) window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const forward = chapter === "evidence";
  const flip = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : desktop
      ? {
          initial: { rotateY: forward ? 75 : -75, opacity: 0, transformOrigin: forward ? "left center" : "right center" },
          animate: { rotateY: 0, opacity: 1, transformOrigin: forward ? "left center" : "right center" },
          exit: { rotateY: forward ? -75 : 75, opacity: 0, transformOrigin: forward ? "left center" : "right center" },
        }
      : {
          initial: { x: forward ? "60%" : "-60%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: forward ? "-60%" : "60%", opacity: 0 },
        };

  return (
    <div className="adv-theme min-h-screen overflow-x-clip">
      <Navbar />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Link to={backTo.href} className="inline-flex items-center gap-2 font-adv-display font-bold text-xs tracking-wider uppercase adv-text-gold hover:underline mb-8">
            <ArrowLeft size={14} /> {backTo.label}
          </Link>

          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <span className="adv-stamp">{project.stamp}</span>
            <h1 className="adv-title font-adv-display font-extrabold text-3xl md:text-5xl mt-4 mb-2">{project.title}</h1>
            <p className="font-adv-type adv-text-soft text-sm md:text-base uppercase tracking-widest">{project.tag}</p>
            <InkUnderline className="mt-3" />
          </motion.div>

          {evidence && (
            <div role="tablist" aria-label="Journal chapters" className="flex justify-center gap-2 mb-6">
              {([["summary", "The Expedition", ScrollText], ["evidence", "Field Evidence", Search]] as const).map(([key, label, Icon]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={chapter === key}
                  onClick={() => turnTo(key)}
                  className={`adv-btn !text-xs md:!text-sm !py-2 !px-4 ${chapter === key ? "" : "adv-btn-leather"}`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div ref={bookRef} className="[perspective:1800px] scroll-mt-24">
          <AnimatePresence mode="wait" initial={false}>
            {chapter === "summary" ? (
              <motion.div key="summary" {...flip} transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.4, 0, 0.2, 1] }} className="max-w-5xl mx-auto">
                <Spread project={project} heroRef={heroRef} heroVisible={heroVisible} />
                <div className="max-w-4xl mx-auto">
                  <RelicReveal outcome={project.outcome} />
                  {evidence && (
                    <div className="text-center mt-12">
                      <button onClick={() => turnTo("evidence")} className="adv-btn group">
                        Turn the page: The Data Behind It <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.section key="evidence" id="field-evidence" {...flip} transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.4, 0, 0.2, 1] }} className="max-w-6xl mx-auto" aria-labelledby="field-evidence-title">
                <div className="text-center mb-8">
                  <span className="adv-stamp">Field Evidence</span>
                  <h2 id="field-evidence-title" className="adv-title font-adv-display font-extrabold text-2xl md:text-4xl mt-4 mb-2 flex items-center justify-center gap-3">
                    <Search size={26} className="adv-text-gold" /> The Data Behind It
                  </h2>
                  <p className="font-adv-type adv-text-soft text-sm md:text-base">Charts, findings and recommendations from the original analysis</p>
                </div>
                <RevealScope>{evidence}</RevealScope>
                <div className="text-center mt-12">
                  <button onClick={() => turnTo("summary")} className="adv-btn adv-btn-leather group">
                    <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" /> Back to the expedition summary
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="adv-divider my-10" />
          <p className="text-center font-adv-type text-xs adv-text-soft">Recorded in the field journal of Tommer Goldstein</p>
        </div>
      </main>
      <Footer />
      {/* last in the tree so the hero frame ref is attached before the flight measures it */}
      <HeroFlight src={project.image} targetRef={heroRef} onLanded={() => setHeroVisible(true)} />
    </div>
  );
};

export default JournalProjectPage;
