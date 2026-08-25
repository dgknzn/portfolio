import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import { useLang } from '../i18n/LanguageContext';
import type { Project } from '../i18n/content';

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
}

function ProjectCard({ project, index, totalCards, progress }: ProjectCardProps) {
  // Cards further up the stack settle at a smaller scale, creating the deck look.
  const reduce = useReducedMotion();
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scrolledScale = useTransform(progress, [index / totalCards, 1], [1, targetScale]);
  const scale = reduce ? 1 : scrolledScale;

  return (
    <div className="sticky top-24 h-[74vh] min-h-[440px] md:top-32">
      <motion.div
        className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] p-6 sm:gap-8 sm:rounded-[50px] sm:p-8 md:rounded-[60px] md:p-10"
        style={{
          background: '#0C0C0C',
          scale,
          top: `${index * 28}px`,
          transformOrigin: 'top center',
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(2.75rem, 9vw, 130px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <span className="rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] sm:px-8 sm:py-3 sm:text-sm">
            {project.meta}
          </span>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col justify-between gap-6">
          <p
            className="max-w-3xl font-light leading-relaxed text-[#D7E2EA] opacity-70"
            style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.3rem)' }}
          >
            {project.description}
          </p>

          <div className="flex flex-col gap-5 sm:gap-6">
            {/* Highlights */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 sm:gap-x-12">
              {project.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="hero-heading font-black uppercase leading-none tracking-tight"
                  style={{ fontSize: 'clamp(1rem, 2.4vw, 2rem)' }}
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#D7E2EA]/25 px-4 py-1.5 text-xs font-light tracking-widest text-[#D7E2EA] opacity-80 sm:px-5 sm:py-2 sm:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 scroll-mt-24 rounded-t-[40px] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ background: '#0C0C0C', overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {t.projects.heading}
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-6xl">
        {t.projects.items.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            totalCards={t.projects.items.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
