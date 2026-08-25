import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Absolute site URL, needed by canonical/OG tags and the sitemap.
 * Set SITE_URL to override; on Vercel the production domain is picked up
 * automatically, and local builds fall back to the default deployment name.
 */
function siteUrl(): string {
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return 'https://dogukanuzun.vercel.app';
}

/** Injects the resolved site URL into index.html and emits robots + sitemap. */
function siteMeta() {
  const url = siteUrl();
  return {
    name: 'site-meta',
    transformIndexHtml(html: string) {
      return html.replaceAll('__SITE_URL__', url);
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${url}/</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${url}/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="tr" href="${url}/?lang=tr"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}/"/>
  </url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
});
