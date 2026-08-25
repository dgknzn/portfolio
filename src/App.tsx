import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from './i18n/LanguageContext';
import { useReferralSource } from './analytics/useReferralSource';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';

/**
 * The /_vercel/insights route only exists on a Vercel deployment. Off-platform
 * we run the SDK in development mode, which logs events instead of fetching a
 * script that would 404.
 */
const isVercelHost = !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(
  window.location.hostname
);

export default function App() {
  useReferralSource();

  return (
    <LanguageProvider>
      <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      {/* Served from the deployment's own domain (/_vercel/insights), so the
          page keeps making zero third-party requests. */}
      <Analytics mode={isVercelHost ? 'production' : 'development'} />
    </LanguageProvider>
  );
}
