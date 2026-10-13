import { useEffect, useId, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CaseFileProps {
  id: string;
  stamp: string;
  title: string;
  subtitle: string;
  teaser: string;
  thumb?: string;
  children: React.ReactNode;
}

/** A project folder that opens and closes in place. Opens automatically when the URL hash points to it. */
const CaseFile = ({ id, stamp, title, subtitle, teaser, thumb, children }: CaseFileProps) => {
  const { hash } = useLocation();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  useEffect(() => {
    if (hash === `#${id}`) setOpen(true);
  }, [hash, id]);

  return (
    <article id={id} className="adv-paper relative scroll-mt-24">
      <div className="adv-tape absolute -top-3 left-8 z-10 !w-20 !h-5" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-left p-5 md:p-7 flex flex-col sm:flex-row gap-5 items-start sm:items-center group"
      >
        {thumb && (
          <img src={thumb} alt="" width={160} height={116} loading="lazy" className="w-full sm:w-40 aspect-[4/3] object-cover rounded-sm border border-[hsl(var(--adv-leather)/0.35)] shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <span className="adv-stamp">{stamp}</span>
          <h2 className="font-adv-display font-extrabold text-2xl md:text-3xl mt-3">{title}</h2>
          <p className="font-adv-type adv-text-soft text-sm mt-1 uppercase tracking-widest">{subtitle}</p>
          <p className="text-base md:text-lg adv-text-soft leading-relaxed mt-3">{teaser}</p>
        </div>
        <span className="adv-btn adv-btn-leather !py-2 !px-4 !text-xs shrink-0 self-end sm:self-center">
          {open ? "Close File" : "Open File"}
          <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-7 pb-7 pt-1 border-t border-dashed border-[hsl(var(--adv-leather)/0.35)]">
              <div className="pt-6">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default CaseFile;
