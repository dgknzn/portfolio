# Doğukan Uzun — Portfolio

Personal portfolio site. React + TypeScript + Vite + Tailwind + Framer Motion,
bilingual (Turkish / English), fully self-hosted assets.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Deploying to Vercel

The repo ships a `vercel.json` (framework preset, cache headers, security
headers), so the defaults work as-is.

```bash
npm i -g vercel
vercel            # first run links the project
vercel --prod     # production deploy
```

Or connect the Git repository at <https://vercel.com/new> — Vercel detects Vite
automatically and runs `npm run build`.

### Site URL

Canonical/OG tags, `robots.txt` and `sitemap.xml` need the absolute site URL.
It is resolved at build time in this order:

1. `SITE_URL` environment variable — set this if you use a custom domain
2. `VERCEL_PROJECT_PRODUCTION_URL` — provided automatically by Vercel
3. `https://dogukanuzun.vercel.app` — local fallback

For a custom domain, add an environment variable in the Vercel project settings:

```
SITE_URL = https://your-domain.com
```

Then redeploy so the meta tags and sitemap pick it up.

## Content

All copy lives in [`src/i18n/content.ts`](src/i18n/content.ts) — both languages
side by side. Editing text does not require touching any component.

Language resolution order: `?lang=tr` / `?lang=en` in the URL → saved choice in
`localStorage` → browser language. The URL is kept in sync when the visitor
switches, so a link can carry a specific language.

## Assets

- `public/img/*.webp` — avatar and decorative 3D props, self-hosted
- `public/fonts/*.woff2` — Kanit, weights 300/400/500/900, latin + latin-ext
- `public/og.png` — social preview card (1200×630)

The page makes **no third-party requests** at runtime.

## Visitor analytics

Vercel Web Analytics is wired up (`@vercel/analytics`). Its script is served
from the deployment's own domain (`/_vercel/insights/`), so the page still makes
no third-party requests, and it sets no cookies — no consent banner needed.

**It has to be switched on in the dashboard as well**: Vercel project →
Analytics → Enable. The package alone does not turn it on.

Off-platform (localhost, `vite preview`) the SDK runs in development mode: it
logs events to the console instead of sending them, and pulls its debug script
from `va.vercel-scripts.com`. That one external request exists only locally —
a real deployment stays same-origin.

### Tagged links

`src/analytics/useReferralSource.ts` reports where a visit came from. It reads a
`?ref=` tag from the URL and falls back to the browser referrer when there is no
tag. It fires once per browser session, so anchor clicks and reloads do not
inflate a single visit.

Hand out a different link per place it is published:

| Where the link lives | Link | Shows up as |
| --- | --- | --- |
| LinkedIn — Featured section | `https://SITE/li` | page `/li` |
| LinkedIn — contact info | `https://SITE/lic` | page `/lic` |
| CV sent to a company | `https://SITE/r/<company>` | page `/r/<company>` |
| Anywhere else | `https://SITE/?ref=<tag>` | custom event (Pro plan only) |

`vercel.json` rewrites `/li`, `/lic` and `/r/:code` to the same single page, so those
paths appear in the Analytics **Pages** list — page views are recorded on every
plan, unlike custom events, which need Pro.

The `?ref=` custom event in `useReferralSource.ts` stays in place and starts
reporting if the project is ever upgraded; it also records the browser referrer
when no tag is present.

A link is our own label on something we handed out, so it identifies the
channel — which company opened the CV — never the person visiting.

## Notes

- Animations respect `prefers-reduced-motion`.
- The site is a client-rendered SPA; `index.html` carries a `<noscript>` block
  with the contact details for JavaScript-less clients.
