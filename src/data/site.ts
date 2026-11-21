// ---------------------------------------------------------------------------
// Medaase Favors site settings.
// Every value marked TBD still needs the owner's confirmation. Change it here
// and the whole site updates; no component holds its own copy.
// ---------------------------------------------------------------------------

import catalogue from './catalogue.json';

const DEFAULTS = {
  name: 'Medaase Favors',
  tagline: "Say medaase in a way they'll remember",
  description:
    'Custom skincare souvenirs for weddings, funerals, naming ceremonies, birthdays, church events and corporate gifts in Ghana. Your names or logo and the date on every label.',
  locale: 'en-GH',
  whatsapp: '233XXXXXXXXX', // TBD: number to come. Not shown anywhere on the site (owner: no WhatsApp ordering)
  email: 'hello@medaasefavors.com', // TBD
  instagram: 'https://instagram.com/medaase.favors',
  instagramHandle: '@medaase.favors',
  pickupArea: 'Accra', // TBD: exact pickup location
  businessHours: 'Monday to Friday, 9am to 5pm',
  pickupHours: 'Monday to Friday, 9:30am to 4:30pm, except public holidays',
  telephone: '', // TBD: leave empty until confirmed (kept out of structured data)
  deliveryAccra: 'by Yango or Uber, priced by your location',
  deliveryFeeOutsideAccra: 60, // flat fee, GH₵
  samplePolicy: 'TBD', // TBD: can customers get a sample before ordering?
  minPerItem: 25,
  qtyStep: 5,
  rushRate: 0.2, // TBD: 20% rush fee
  rushWorkingDays: 7, // TBD: rush fee applies under this many working days
  blockWorkingDays: 5, // TBD: checkout blocked under this many working days
  turnaround: '5 to 7 working days',
  designRounds: 1,
  googleReviewUrl: '', // TBD: once the Google Business Profile exists
};

/** Site settings: defaults above, overridden by whatever the admin sheet publishes. */
export const SITE: typeof DEFAULTS = { ...DEFAULTS, ...(catalogue.settings as Partial<typeof DEFAULTS>) };

// Ghana public holidays (YYYY-MM-DD), excluded from working-day counts. Edited in the admin sheet (Settings → publicHolidays).
export const PUBLIC_HOLIDAYS: string[] = String((SITE as { publicHolidays?: string }).publicHolidays ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter((s) => /^\d{4}-\d{2}-\d{2}$/.test(s));

export const EVENTS = [
  { slug: 'weddings', name: 'Weddings', short: 'Weddings' },
  { slug: 'funerals', name: 'Funerals', short: 'Funerals' },
  { slug: 'naming-ceremonies', name: 'Naming ceremonies', short: 'Naming ceremonies' },
  { slug: 'birthdays', name: 'Birthdays', short: 'Birthdays' },
  { slug: 'church-events', name: 'Church events', short: 'Church events' },
  { slug: 'corporate-gifts', name: 'Corporate gifts', short: 'Corporate gifts' },
] as const;

/** Email link with a prefilled subject. */
export function emailLink(subject = 'Souvenir enquiry') {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}

/** "one round" / "two rounds" of design changes. */
export function designRoundsText() {
  const words = ['no', 'one', 'two', 'three'];
  const n = SITE.designRounds;
  return `${words[n] ?? n} round${n === 1 ? '' : 's'} of changes`;
}
