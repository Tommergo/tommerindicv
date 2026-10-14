import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ResponsiveContainer as RechartsContainer } from "recharts";

/**
 * Drop-in replacement for recharts' ResponsiveContainer: the chart mounts only when it scrolls into
 * view, so recharts' draw-in animation plays where the reader can see it. Space is reserved up front.
 */
export const ResponsiveContainer = (props: React.ComponentProps<typeof RechartsContainer>) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const h = props.height ?? "100%";
  return (
    <div ref={ref} style={{ width: "100%", height: h }}>
      {inView && <RechartsContainer {...props} height="100%" />}
    </div>
  );
};

/** Counts the number inside a string ("₪1.43M", "1,247", "34%", "1.631") up from zero once in view. */
export const CountUp = ({ value, duration = 1.4 }: { value: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  // Only plain figures count up; ranks and phrases like "2nd place" stay as written.
  const m = /\s|st|nd|rd|th/.test(value) ? null : value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!m || reduce || !inView) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const commas = num.includes(",");
    const fmt = (n: number) => {
      const s = n.toFixed(decimals);
      return commas ? Number(s).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : s;
    };
    setShown(pre + fmt(0) + post);
    const ctrl = animate(0, target, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setShown(pre + fmt(v) + post) });
    return () => ctrl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return <span ref={ref} className="tabular-nums">{shown}</span>;
};

/** A photo that "develops" from a faded sepia print into full colour the first time it is seen. */
export const DevelopImg = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const reduce = useReducedMotion();
  if (reduce) return <img {...props} />;
  const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...rest } = props;
  return (
    <motion.img
      {...rest}
      initial={{ filter: "sepia(0.9) blur(3px) brightness(1.15) contrast(0.85)" }}
      whileInView={{ filter: "sepia(0) blur(0px) brightness(1) contrast(1)" }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 1.3, ease: "easeOut" }}
    />
  );
};

/** A rubber stamp that thumps onto the paper once it scrolls into view. */
export const Stamp = ({ children, className = "", rotate = -12, delay = 0.2 }: { children: React.ReactNode; className?: string; rotate?: number; delay?: number }) => (
  <motion.span
    aria-hidden="true"
    initial={{ opacity: 0, scale: 2.4, rotate: rotate - 8 }}
    whileInView={{ opacity: 1, scale: 1, rotate }}
    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    transition={{ type: "spring", stiffness: 420, damping: 18, delay }}
    className={`pointer-events-none select-none inline-block font-adv-display font-extrabold tracking-[0.2em] uppercase border-[3px] rounded px-3 py-1 text-[hsl(var(--adv-red))] border-[hsl(var(--adv-red))] bg-[hsl(var(--adv-paper)/0.4)] mix-blend-multiply ${className}`}
  >
    {children}
  </motion.span>
);

/** A check mark drawn in ink once it is in view. */
export const InkCheck = ({ size = 28, delay = 0 }: { size?: number; delay?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
    <motion.path
      d="M5 17 C 9 20, 11 23, 13 26 C 17 17, 22 10, 28 5"
      fill="none"
      stroke="hsl(var(--adv-red))"
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    />
  </svg>
);

/**
 * Reveals the blocks of a long section one by one as they scroll into view.
 * Grids reveal their cells, alternating from the left and the right.
 * Uses the CSS `translate` property so it never fights a block's own transform.
 */
export const RevealScope = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scope = ref.current;
    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = scope.children.length === 1 ? (scope.firstElementChild as HTMLElement) : scope;
    const items: HTMLElement[] = [];
    Array.from(root.children).forEach((el) => {
      const h = el as HTMLElement;
      const isGrid = /\bgrid\b/.test(h.className) && h.children.length > 1 && h.children.length <= 8;
      if (isGrid) Array.from(h.children).forEach((c, i) => { (c as HTMLElement).dataset.revealSide = i % 2 ? "r" : "l"; (c as HTMLElement).style.transitionDelay = `${(i % 4) * 90}ms`; items.push(c as HTMLElement); });
      else items.push(h);
    });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.reveal = "shown"; io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((el) => {
      // anything already on screen stays put; only what is below the fold waits for the reader
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      el.dataset.reveal = "hidden";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
};

/** A hand-inked underline drawn beneath a heading when it comes into view. */
export const InkUnderline = ({ width = 220, className = "" }: { width?: number; className?: string }) => (
  <svg width={width} height={14} viewBox="0 0 220 14" aria-hidden="true" className={`mx-auto block ${className}`}>
    <motion.path
      d="M4 9 C 40 3, 80 12, 118 7 S 190 4, 216 8"
      fill="none"
      stroke="hsl(var(--adv-gold))"
      strokeWidth={3}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
    />
  </svg>
);
