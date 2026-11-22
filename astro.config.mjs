// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the deploy workflow.
// While the site lives at <org>.github.io/medaase-favors the base is "/medaase-favors".
// When a custom domain is connected, set BASE_PATH to "/" and SITE_URL to the domain.
const site = process.env.SITE_URL || 'https://medaasefavors.github.io';
const base = process.env.BASE_PATH || '/medaase-favors';

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
