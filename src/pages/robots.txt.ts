import type { APIRoute } from 'astro';
import { absolute, url } from '../lib/url';

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\nDisallow: ${url('/checkout')}\nDisallow: ${url('/order/')}\n\nSitemap: ${absolute('/sitemap-index.xml')}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
