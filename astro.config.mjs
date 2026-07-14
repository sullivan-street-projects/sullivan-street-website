// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// Static marketing site. Every page is prerendered at build time — this is
// the AEO fix: crawlers get real HTML, no JS required. Conventions mirror
// ../ssp-blog (The Brief), which already ships this stack on the same host.
export default defineConfig({
  site: 'https://sullivanstreetprojects.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  // Self-hosted fonts via the Fonts API — replaces the render-blocking
  // fonts.googleapis.com <link> and keeps font delivery first-party.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Libre Baskerville',
      cssVariable: '--font-libre-baskerville',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Times New Roman', 'Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Sans',
      cssVariable: '--font-instrument-sans',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  integrations: [
    react(),
    // lastmod = build time: static site, every deploy re-emits all pages.
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
