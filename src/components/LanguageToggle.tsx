import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/content';

const OPTIONS: Lang[] = ['tr', 'en'];

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  const reduce = useReducedMotion();

  return (
    <LayoutGroup id="language-toggle">
      <div
        className={`relative flex items-center gap-1 rounded-full border border-[#D7E2EA]/30 p-1 ${className}`}
        role="group"
        aria-label="Language"
      >
        {OPTIONS.map((option) => {
          const active = lang === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setLang(option)}
              aria-pressed={active}
              className="relative flex h-9 min-w-[2.5rem] items-center justify-center rounded-full px-3"
            >
              {/* The pill is a single shared element, so switching sides slides it
                  from wherever it currently is instead of cross-fading. */}
              {active && (
                <motion.span
                  layoutId="language-pill"
                  className="absolute inset-0 rounded-full bg-[#D7E2EA]"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }
                  }
                />
              )}
              <span
                className={`relative z-10 text-xs font-medium uppercase tracking-wider transition-colors duration-200 ${
                  active ? 'text-[#0C0C0C]' : 'text-[#D7E2EA]'
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
