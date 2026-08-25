import FadeIn from '../components/FadeIn';
import { useLang } from '../i18n/LanguageContext';

export default function ExperienceSection() {
  const { t } = useLang();

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 rounded-t-[40px] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ background: '#FFFFFF', overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.experience.heading}
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {t.experience.items.map((item, i) => (
          <FadeIn
            key={item.number}
            delay={i * 0.1}
            y={30}
            className="flex flex-col gap-4 py-8 sm:flex-row sm:gap-8 sm:py-10 md:gap-12 md:py-12"
            style={{
              borderTop: '1px solid rgba(12, 12, 12, 0.15)',
              ...(i === t.experience.items.length - 1
                ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }
                : {}),
            }}
          >
            <span
              className="shrink-0 font-black leading-none text-[#0C0C0C]"
              style={{
                fontSize: 'clamp(3rem, 10vw, 140px)',
                width: 'clamp(4.5rem, 15vw, 200px)',
              }}
            >
              {item.number}
            </span>

            <div className="flex flex-col gap-3 pt-1 sm:gap-4">
              <div className="flex flex-col gap-1">
                <h3
                  className="font-medium uppercase leading-tight text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {item.role}
                </h3>
                <p
                  className="font-medium uppercase tracking-wide text-[#0C0C0C] opacity-70"
                  style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.35rem)' }}
                >
                  {item.company}
                </p>
                <p
                  className="font-light uppercase tracking-widest text-[#0C0C0C] opacity-50"
                  style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)' }}
                >
                  {item.meta}
                </p>
              </div>

              <ul className="flex max-w-2xl flex-col gap-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5 font-light leading-relaxed text-[#0C0C0C] opacity-60 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#0C0C0C]"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
