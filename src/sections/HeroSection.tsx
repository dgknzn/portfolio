import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import Navbar from '../components/Navbar';
import { useFitText } from '../components/FitText';
import { useLang } from '../i18n/LanguageContext';
import { AVATAR } from '../assets';

export default function HeroSection() {
  const { t, lang } = useLang();
  // Re-fit when the language changes — the two greetings differ in length.
  const headingRef = useFitText<HTMLHeadingElement>([lang]);


  return (
    <section
      className="relative flex h-screen flex-col"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      {/* z-30: the heading below is pulled up by -mt-5 and its line box overlaps
          this row. Same stacking context means the later sibling would win hit
          testing and swallow every nav click. */}
      <FadeIn as="nav" delay={0} y={-20} className="relative z-30 w-full">
        <Navbar />
      </FadeIn>

      {/* Hero heading */}
      {/* overflow-x-clip, not overflow-hidden: the heading is pulled up by
          -mt-5 and its diacritics (Ğ, İ) sit above the leading-none line box,
          so vertical overflow has to stay visible. */}
      <div className="pointer-events-none relative z-20 w-full overflow-x-clip">
        <FadeIn
          as="h1"
          key={lang}
          delay={0.15}
          y={40}
          innerRef={headingRef as never}
          className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]"
        >
          {t.hero.greeting}
        </FadeIn>
      </div>

      {/* Portrait — positioning lives on this plain wrapper so Framer Motion's
          inline transform on the FadeIn cannot clobber the centering. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[190px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[250px] sm:translate-y-0 md:w-[300px] lg:w-[355px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            magnetStrength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={AVATAR.src}
              width={AVATAR.width}
              height={AVATAR.height}
              alt="Doğukan Uzun"
              // React 18 passes unknown camelCase props straight through; the
              // HTML attribute is all-lowercase.
              {...{ fetchpriority: 'high' }}
              className="h-auto w-full select-none"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          {t.hero.tagline}
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
