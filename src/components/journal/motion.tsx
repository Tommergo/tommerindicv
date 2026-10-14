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
