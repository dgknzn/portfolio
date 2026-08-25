import { GraduationCap, Languages, Sparkles } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { useLang } from '../i18n/LanguageContext';

export default function EducationSection() {
  const { t } = useLang();
  const e = t.education;

  return (
    <section
      className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ background: '#FFFFFF', overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {e.heading}
      </FadeIn>

      <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:gap-12">
        <FadeIn
          delay={0}
          y={30}
          className="flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-start sm:gap-8 sm:pt-10"
          style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
        >
          <GraduationCap className="h-8 w-8 shrink-0 text-[#0C0C0C] sm:h-10 sm:w-10" strokeWidth={1.5} />
          <div className="flex flex-col gap-1">
            <h3
              className="font-medium uppercase leading-tight text-[#0C0C0C]"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
            >
              {e.degree}
            </h3>
            <p
              className="font-medium uppercase tracking-wide text-[#0C0C0C] opacity-70"
              style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.35rem)' }}
            >
              {e.school}
            </p>
            <p
              className="font-light uppercase tracking-widest text-[#0C0C0C] opacity-50"
              style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)' }}
            >
              {e.meta}
            </p>
          </div>
        </FadeIn>

        <FadeIn
          delay={0.1}
          y={30}
          className="flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-start sm:gap-8 sm:pt-10"
          style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
        >
          <Languages className="h-8 w-8 shrink-0 text-[#0C0C0C] sm:h-10 sm:w-10" strokeWidth={1.5} />
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium uppercase tracking-widest text-[#0C0C0C] opacity-50">
              {e.languagesLabel}
            </h3>
            <p
              className="font-light text-[#0C0C0C] opacity-70"
              style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.3rem)' }}
            >
              {e.languages}
            </p>
          </div>
        </FadeIn>

        <FadeIn
          delay={0.2}
          y={30}
          className="flex flex-col gap-4 border-y py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10"
          style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
        >
          <Sparkles className="h-8 w-8 shrink-0 text-[#0C0C0C] sm:h-10 sm:w-10" strokeWidth={1.5} />
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium uppercase tracking-widest text-[#0C0C0C] opacity-50">
              {e.skillsLabel}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {e.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border px-4 py-1.5 text-xs font-light uppercase tracking-widest text-[#0C0C0C] opacity-70 sm:px-5 sm:py-2 sm:text-sm"
                  style={{ borderColor: 'rgba(12, 12, 12, 0.25)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
