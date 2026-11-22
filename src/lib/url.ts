import { SITE } from '../data/site';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Internal link that respects the deploy base path. url('/faq') -> /faq (or /<base>/faq if a base path is set) */
export function url(path = '/') {
  if (path === '/' || path === '') return BASE + '/';
  return BASE + (path.startsWith('/') ? path : '/' + path);
}

/** Absolute URL for canonical tags, sitemap and structured data. */
export function absolute(path = '/') {
  return new URL(url(path), import.meta.env.SITE).toString();
}

export { SITE };
