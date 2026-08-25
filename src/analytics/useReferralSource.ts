import { useEffect } from 'react';
import { track } from '@vercel/analytics';

const STORAGE_KEY = 'du-ref';

/**
 * Records where a visitor arrived from.
 *
 * A `?ref=` value is our own tag, added to the links we hand out (the LinkedIn
 * profile, a CV sent to a specific company). Because each tag goes to a known
 * place, a hit tells us which channel produced the visit — never who the
 * visitor is.
 *
 * Falls back to the browser referrer when there is no tag, which covers people
 * who click through from LinkedIn's site without our tagged link.
 */
export function useReferralSource() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('ref')?.trim().slice(0, 40).toLowerCase();

    let source = tag || '';
    if (!source && document.referrer) {
      try {
        const host = new URL(document.referrer).hostname.replace(/^www\./, '');
        // Ignore self-referrals from in-page anchor navigation.
        if (host !== window.location.hostname) source = `referrer:${host}`;
      } catch {
        /* malformed referrer — ignore */
      }
    }

    if (!source) return;

    // Report once per browser session so anchor clicks and reloads don't
    // inflate the count for what is really a single visit.
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === source) return;
      sessionStorage.setItem(STORAGE_KEY, source);
    } catch {
      /* private mode — fall through and report anyway */
    }

    track('referral', { source });
  }, []);
}
