import type { APIRoute } from 'astro';
import { absolute, url } from '../lib/url';

// Search engines and AI assistants are welcome everywhere except checkout and
// order pages. AI crawlers are named so a host's default rules cannot block them.
const AI_BOTS = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
];

const rules = `Allow: /\nDisallow: ${url('/checkout')}\nDisallow: ${url('/order/')}\nDisallow: ${url('/card-styles')}`;

export const GET: APIRoute = () =>
  new Response(
    [
      ...AI_BOTS.map((b) => `User-agent: ${b}`),
      'User-agent: *',
      rules,
      '',
      `Sitemap: ${absolute('/sitemap-index.xml')}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
