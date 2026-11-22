// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the deploy workflow.
// The site lives on the custom domain medaasefavors.com (public/CNAME), so the base is "/".
const site = process.env.SITE_URL || 'https://medaasefavors.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(checkout|order\/|card-styles)/.test(page) && !/404/.test(page),
    }),
  ],
});
