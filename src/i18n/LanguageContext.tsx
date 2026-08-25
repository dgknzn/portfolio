import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CONTENT } from './content';
import type { Content, Lang } from './content';

interface LanguageValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageValue | null>(null);
const STORAGE_KEY = 'du-lang';

const isLang = (v: unknown): v is Lang => v === 'tr' || v === 'en';

/** URL wins (so a link can carry a language), then the saved choice, then the browser. */
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage can throw in private mode — fall through to the browser hint */
  }
  return navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en';
}

function setMeta(selector: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = value;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const { meta } = CONTENT[lang];

    document.documentElement.lang = lang;
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:locale"]', lang === 'tr' ? 'tr_TR' : 'en_US');
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);

    // Keep the language shareable without adding a history entry per toggle.
    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') !== lang) {
      url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url);
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* non-fatal */
    }
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: CONTENT[lang] }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
