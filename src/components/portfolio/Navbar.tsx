import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Play Game", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Leadership", href: "/leadership" },
  { label: "About & Resume", href: "/resume" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 adv-leather-panel">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-adv-display font-bold text-lg tracking-widest text-[hsl(var(--adv-gold-light))]">
          TOMMER GOLDSTEIN
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`adv-btn !text-[11px] !py-2 !px-3.5 ${isActive(location.pathname, l.href) ? "" : "adv-btn-leather"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[hsl(var(--adv-parchment))]" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[hsl(var(--adv-leather-dark))] border-b border-[hsl(var(--adv-gold)/0.4)]"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`font-adv-display text-xs font-bold tracking-wider uppercase transition-colors py-2 ${
                    isActive(location.pathname, l.href)
                      ? "text-[hsl(var(--adv-gold-light))]"
                      : "text-[hsl(var(--adv-parchment)/0.75)] hover:text-[hsl(var(--adv-gold-light))]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
