// ---------------------------------------------------------------------------
// Medaase Favors site settings.
// Every value marked TBD still needs the owner's confirmation. Change it here
// and the whole site updates; no component holds its own copy.
// ---------------------------------------------------------------------------

export const SITE = {
  name: 'Medaase Favors',
  tagline: "Say medaase in a way they'll remember",
  description:
    'Custom skincare souvenirs for weddings, funerals, naming ceremonies, birthdays, church events and corporate gifts in Accra, Ghana. Your names or logo and the date on every label.',
  locale: 'en-GH',
  whatsapp: '233XXXXXXXXX', // TBD: WhatsApp business number, digits only
  whatsappReady: false, // TBD: set true once the real number is in
  email: 'hello@medaasefavors.com', // TBD
  instagram: 'https://instagram.com/medaase.favors',
  instagramHandle: '@medaase.favors',
  pickupArea: 'Accra', // TBD: pickup location
  businessHours: 'Monday to Saturday, 9am to 6pm', // TBD
  telephone: '', // TBD: leave empty until confirmed (kept out of structured data)
  deliveryFeeAccra: 60, // TBD
  deliveryOutsideAccra: 'TBD', // TBD: delivery policy outside Accra
  samplePolicy: 'TBD', // TBD: can customers get a sample before ordering?
  minPerItem: 25,
  qtyStep: 5,
  rushRate: 0.2, // TBD: 20% rush fee
  rushWorkingDays: 7, // TBD: rush fee applies under this many working days
  blockWorkingDays: 5, // TBD: checkout blocked under this many working days
  turnaround: '5 to 7 working days',
  designRounds: 2,
  googleReviewUrl: '', // TBD: once the Google Business Profile exists
};

// Ghana public holidays (YYYY-MM-DD), excluded from working-day counts. TBD: confirm each year.
export const PUBLIC_HOLIDAYS: string[] = [
  '2026-12-04', // Farmers' Day
  '2026-12-25', // Christmas Day
  '2026-12-26', // Boxing Day
  '2027-01-01', // New Year's Day
  '2027-01-07', // Constitution Day
  '2027-03-06', // Independence Day
];

export const EVENTS = [
  { slug: 'weddings', name: 'Weddings', short: 'Weddings' },
  { slug: 'funerals', name: 'Funerals', short: 'Funerals' },
  { slug: 'naming-ceremonies', name: 'Naming ceremonies', short: 'Naming ceremonies' },
  { slug: 'birthdays', name: 'Birthdays', short: 'Birthdays' },
  { slug: 'church-events', name: 'Church events', short: 'Church events' },
  { slug: 'corporate-gifts', name: 'Corporate gifts', short: 'Corporate gifts' },
] as const;

export function whatsappLink(text = 'Hello Medaase Favors! I would like to ask about souvenirs.') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}
