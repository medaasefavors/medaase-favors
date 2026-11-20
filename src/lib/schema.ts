import { SITE } from '../data/site';
import { absolute } from './url';

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absolute('/') + '#organization',
    name: SITE.name,
    url: absolute('/'),
    logo: absolute('/logo.png'),
    sameAs: [SITE.instagram],
    email: SITE.email,
  };
}

export function store() {
  const s: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': absolute('/') + '#store',
    name: SITE.name,
    description: SITE.description,
    url: absolute('/'),
    image: absolute('/og/default.png'),
    logo: absolute('/logo.png'),
    sameAs: [SITE.instagram],
    priceRange: 'GH₵',
    currenciesAccepted: 'GHS',
    paymentAccepted: 'Mobile Money, Card',
    areaServed: { '@type': 'Country', name: 'Ghana' },
    address: { '@type': 'PostalAddress', addressLocality: 'Accra', addressCountry: 'GH' },
  };
  if (SITE.telephone) s.telephone = SITE.telephone;
  return s;
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: absolute('/'),
    inLanguage: SITE.locale,
    publisher: { '@id': absolute('/') + '#organization' },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
