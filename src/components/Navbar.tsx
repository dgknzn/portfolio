import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLang } from '../i18n/LanguageContext';

export default function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const links = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ];

  // Lock body scroll and close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <div className="flex w-full items-center justify-between gap-3 px-6 pt-6 md:px-10 md:pt-8">
        {/* Wide screens: the links sit inline. */}
        <div className="hidden flex-1 items-center justify-between gap-4 sm:flex sm:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-[44px] items-center text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Narrow screens: a menu button, so the language toggle always fits. */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.nav.menu}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>

        <LanguageToggle className="shrink-0" />
      </div>

      {/* Portalled to <body>: the nav sits inside a z-20 stacking context, so a
          drawer rendered in place would be painted under the hero content. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              className="fixed inset-0 z-50 flex flex-col bg-[#0C0C0C] sm:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={t.nav.menu}
          >
              <div className="flex justify-end px-6 pt-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t.nav.close}
                  autoFocus
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col items-center justify-center gap-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hero-heading flex min-h-[56px] items-center px-6 text-[9vw] font-black uppercase leading-none tracking-tight"
                  >
                    {link.label}
                  </a>
                ))}
                </nav>
              </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
