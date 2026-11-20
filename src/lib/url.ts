import { SITE } from '../data/site';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Internal link that respects the deploy base path. url('/faq') -> /medaase-favors/faq */
export function url(path = '/') {
  if (path === '/' || path === '') return BASE + '/';
  return BASE + (path.startsWith('/') ? path : '/' + path);
}

/** Absolute URL for canonical tags, sitemap and structured data. */
export function absolute(path = '/') {
  return new URL(url(path), import.meta.env.SITE).toString();
}

export { SITE };
