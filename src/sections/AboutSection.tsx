import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import { useLang } from '../i18n/LanguageContext';
import { DECOR } from '../assets';

const PROPS = [
  { asset: DECOR.moon, delay: 0.1, x: -80, cls: 'left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]' },
  { asset: DECOR.lego, delay: 0.15, x: 80, cls: 'right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]' },
  { asset: DECOR.orb, delay: 0.25, x: -80, cls: 'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]' },
  { asset: DECOR.cursor, delay: 0.3, x: 80, cls: 'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]' },
];

export default function AboutSection() {
  const { t, lang } = useLang();

  return (
    <section
      id="about"
      className="relative flex min-h-screen scroll-mt-24 flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      {PROPS.map((d) => (
        <FadeIn
          key={d.asset.src}
          delay={d.delay}
          x={d.x}
          y={0}
          duration={0.9}
          className={`pointer-events-none absolute ${d.cls}`}
        >
          <img
            src={d.asset.src}
            width={d.asset.width}
            height={d.asset.height}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            {t.about.heading}
          </FadeIn>

          {/* key={lang} remounts the per-character scroll animation on language change */}
          <AnimatedText
            key={lang}
            text={t.about.body}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
