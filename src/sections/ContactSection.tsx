import { Github, Linkedin, Mail } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import GhostButton from '../components/GhostButton';
import { useFitText } from '../components/FitText';
import { useLang } from '../i18n/LanguageContext';
import { LINKS } from '../i18n/content';

/** Assembled at runtime so naive address scrapers do not pick it up from the HTML. */
const EMAIL_USER = LINKS.email.split('@')[0];
const EMAIL_HOST = LINKS.email.split('@')[1];

export default function ContactSection() {
  const { t, lang } = useLang();
  const mailRef = useFitText<HTMLAnchorElement>([lang]);
  const address = `${EMAIL_USER}@${EMAIL_HOST}`;

  return (
    <section
      id="contact"
      className="relative z-10 -mt-10 flex scroll-mt-24 flex-col items-center gap-12 rounded-t-[40px] px-5 py-20 sm:-mt-12 sm:gap-16 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.contact.heading}
      </FadeIn>

      <FadeIn
        as="p"
        delay={0.1}
        y={20}
        className="max-w-[520px] text-center font-light uppercase leading-snug tracking-wide text-[#D7E2EA] opacity-70"
        style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
      >
        {t.contact.body}
      </FadeIn>

      {/* E-mail as the primary action */}
      <div className="w-full max-w-5xl overflow-hidden">
        <FadeIn delay={0.2} y={30} className="w-full">
          <a
            ref={mailRef}
            href={`mailto:${address}`}
            className="hero-heading block w-full whitespace-nowrap text-center text-[7vw] font-black lowercase leading-none tracking-tight transition-opacity duration-200 hover:opacity-80"
          >
            {address}
          </a>
        </FadeIn>
      </div>

      <FadeIn delay={0.3} y={20} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <GhostButton href={`mailto:${address}`}>
          <Mail className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
          {t.contact.emailLabel}
        </GhostButton>
        <GhostButton href={LINKS.linkedin}>
          <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
          LinkedIn
        </GhostButton>
        <GhostButton href={LINKS.github}>
          <Github className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
          GitHub
        </GhostButton>
      </FadeIn>

      <FadeIn
        as="p"
        delay={0.4}
        y={20}
        className="pt-6 text-center text-xs font-light uppercase tracking-widest text-[#D7E2EA] opacity-40 sm:text-sm"
      >
        © {new Date().getFullYear()} · {t.footer}
      </FadeIn>
    </section>
  );
}
