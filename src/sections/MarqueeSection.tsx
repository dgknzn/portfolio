import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';
import type { Tool } from '../i18n/content';

/** Tripled so a strip can loop by resetting one set-width without a visible seam. */
const tripled = <T,>(items: T[]): T[] => [...items, ...items, ...items];

/** JS % keeps the dividend's sign; strips need a always-positive wrap or they
    drift right and leave a gap at the left edge. */
const mod = (n: number, m: number) => ((n % m) + m) % m;

/** px per second each strip drifts on its own, before any scroll influence. */
const SPEED_TOP = 42;
const SPEED_BOTTOM = 30;

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollOffset = useRef(0);
  const [ready, setReady] = useState(false);
  const { t } = useLang();
  const reduce = useReducedMotion();

  // One "set" is a third of the tripled strip — the distance after which the
  // content repeats exactly, so wrapping on it is invisible.
  const setWidths = useRef({ top: 0, bottom: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      if (topRef.current) setWidths.current.top = topRef.current.scrollWidth / 3;
      if (bottomRef.current) setWidths.current.bottom = bottomRef.current.scrollWidth / 3;
      setReady(true);
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [t]);

  useEffect(() => {
    if (reduce || !ready) return;

    const onScroll = () => {
      const node = sectionRef.current;
      if (!node) return;
      scrollOffset.current =
        (window.scrollY - node.offsetTop + window.innerHeight) * 0.3 - 200;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const { top, bottom } = setWidths.current;

      if (topRef.current && top > 0) {
        // Drifts right: start one set back and walk forward, wrapping at set width.
        const x = mod(elapsed * SPEED_TOP + scrollOffset.current, top);
        topRef.current.style.transform = `translate3d(${x - top}px, 0, 0)`;
      }
      if (bottomRef.current && bottom > 0) {
        // Drifts left: mirror of the above.
        const x = mod(elapsed * SPEED_BOTTOM + scrollOffset.current, bottom);
        bottomRef.current.style.transform = `translate3d(${-x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduce, ready]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="flex flex-col gap-5 pb-10 pt-24 sm:gap-6 sm:pt-32 md:pt-40"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      {/* The strips repeat each item three times to loop seamlessly, so they are
          hidden from assistive tech and the real list is exposed once instead. */}
      <h2 id="skills-heading" className="sr-only">
        {t.skillsLabel}
      </h2>
      <ul className="sr-only">
        {[...t.marquee.row1, ...t.marquee.row2.map((tool) => tool.label)].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="flex flex-col gap-5 sm:gap-6">
        {/* Row 1 — capabilities */}
        <div
          ref={topRef}
          className="flex w-max items-center gap-6 sm:gap-8 md:gap-10"
          style={{ willChange: 'transform' }}
        >
          {tripled(t.marquee.row1).map((item, i) => (
            <span key={`row1-${i}`} className="flex shrink-0 items-center gap-6 sm:gap-8 md:gap-10">
              <span
                className="hero-heading whitespace-nowrap font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 5rem)' }}
              >
                {item}
              </span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#B600A8] sm:h-3 sm:w-3" />
            </span>
          ))}
        </div>

        {/* Row 2 — tools */}
        <div
          ref={bottomRef}
          className="flex w-max items-center gap-3 sm:gap-4"
          style={{ willChange: 'transform' }}
        >
          {tripled<Tool>(t.marquee.row2).map((tool, i) => (
            <span
              key={`row2-${i}`}
              {...(tool.brand ? { lang: 'en' } : {})}
              className="shrink-0 whitespace-nowrap rounded-full border border-[#D7E2EA]/25 px-5 py-2 font-light uppercase tracking-widest text-[#D7E2EA] sm:px-7 sm:py-3"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.15rem)' }}
            >
              {tool.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
