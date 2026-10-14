import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";

const DASH = (c: string) => `repeating-linear-gradient(90deg, hsl(${c}) 0 6px, transparent 6px 12px)`;

/** A dotted expedition route under the nav that fills as you scroll, ending at a red X. */
const RouteProgress = () => {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const tip = useTransform(p, (v) => `calc(${(v * 100).toFixed(2)}% - ${(v * 30).toFixed(1)}px)`);
  const xOpacity = useTransform(p, [0.9, 1], [0.35, 1]);
  const xScale = useTransform(p, [0.94, 1], [1, 1.35]);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const check = () => setScrollable(document.documentElement.scrollHeight - window.innerHeight > 200);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [pathname]);

  if (!scrollable) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-16 left-0 right-0 z-40 h-4 pointer-events-none"
      // Rendered outside the themed page wrapper, so the palette is set here.
      style={{ "--adv-leather": "24 45% 28%", "--adv-leather-dark": "22 50% 18%", "--adv-gold": "38 80% 42%", "--adv-red": "6 60% 40%" } as React.CSSProperties}
    >
      {/* faint full route */}
      <div className="absolute left-0 right-4 top-[6px] h-[3px] opacity-30" style={{ background: DASH("var(--adv-leather)") }} />
      {/* travelled route */}
      <motion.div
        className="absolute left-0 right-4 top-[6px] h-[3px] origin-left"
        style={{ scaleX: p, background: DASH("var(--adv-red)") }}
      />
      {/* the traveller */}
      <motion.span
        className="absolute top-[1px] w-3.5 h-3.5 rounded-full bg-[hsl(var(--adv-gold))] border-2 border-[hsl(var(--adv-leather-dark))] shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
        style={{ left: tip }}
      />
      {/* the destination */}
      <motion.span
        className="absolute right-0.5 top-0 font-adv-display font-extrabold text-base leading-none text-[hsl(var(--adv-red))]"
        style={{ opacity: xOpacity, scale: xScale }}
      >
        ✕
      </motion.span>
    </div>
  );
};

export default RouteProgress;
