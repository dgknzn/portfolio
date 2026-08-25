import type { ReactNode } from 'react';

interface GhostButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

/** Outline pill used for secondary links (GitHub, LinkedIn, e-mail). */
export default function GhostButton({
  children,
  href,
  className = '',
}: GhostButtonProps) {
  const classes = `inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-300 hover:bg-[#D7E2EA]/10 sm:px-8 sm:py-3.5 sm:text-base ${className}`;

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
