// ---------------------------------------------------------------------------
// Medaase Favors products, prices and options.
// All product data lives in this one file. Prices are GH₵ per piece.
// Options marked TBD still need the owner's confirmation.
// ---------------------------------------------------------------------------

// Medaase Favors prices (GH₵ per piece)
export const PRICES = {
  'pure-african-shea-butter': { 'Small 50g': 19, 'Medium 100g': 25, 'Large 250g': 45 },
  'body-butter': { 'Small 50g': 27, 'Medium 100g': 41, 'Large 250g': 86 },
  'shimmer-oil': { 'Small 30ml': 25, 'Medium 50ml': 33, 'Large 100ml': 52 },
  'hand-cream': { 'Small 30ml': 21, 'Medium 50ml': 28, 'Large 100ml': 43 },
  'hand-wash-gel': { 'Small 30ml': 19, 'Medium 50ml': 25, 'Large 100ml': 37 },
  'lip-balm': { 'One size 5g': 13 },
} as const;

export const ADD_ONS = {
  label: 1.5, // Label (front text or logo + date)
  bag: 2.5, // Drawstring organza bag
  card: 3, // Mount on printed card
  tag: 2, // Thank you tag
};

export const BUNDLE_DISCOUNT = 0.05;

export type Slug = keyof typeof PRICES;
export type Category = 'butters' | 'oils' | 'hand-care' | 'lip';

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'butters', label: 'Butters' },
  { id: 'oils', label: 'Oils' },
  { id: 'hand-care', label: 'Hand care' },
  { id: 'lip', label: 'Lip' },
];

// TBD: confirm scents, containers and lids per product.
const SCENTS = ['Unscented', 'Vanilla', 'Coconut', 'Rose'];
const TUBS = ['White tub', 'Clear tub', 'Pink tub'];
const TUB_LIDS = ['Gold', 'White', 'Pink', 'Navy'];
const OIL_BOTTLES = ['Amber dropper bottle', 'Clear bottle', 'Frosted bottle'];
const OIL_CAPS = ['Black dropper', 'Gold', 'White'];
const PUMP_BOTTLES = ['White bottle', 'Clear bottle', 'Pink bottle'];
const PUMP_CAPS = ['White pump', 'Gold pump', 'Pink flip cap', 'Navy flip cap'];
const BALM_TUBES = ['White tube', 'Pink tube', 'Navy tube'];

export const BAG_COLOURS = ['Pink', 'Navy', 'White', 'Gold', 'Mixed colours'];

export interface Product {
  slug: Slug;
  name: string;
  shortName: string;
  category: Category;
  blurb: string;
  description: string;
  kicker?: string;
  scents: string[];
  containers: string[];
  lids: string[];
  lidLabel: string;
  cardMount: boolean; // which sizes allow mounting on a printed card
  cardMountSizes: string[];
  included: string[];
  faqs: { q: string; a: string }[];
  longCopy: string[];
  imageAlt: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'pure-african-shea-butter',
    name: '100% Pure African Shea Butter',
    shortName: 'Shea Butter',
    category: 'butters',
    blurb: 'Pure, unrefined shea, dressed in your colours and names.',
    description:
      'Pure, unrefined shea, soft enough to scoop and rich enough for elbows, heels and dry hands. We dress each tub in your colours and names, so it stays on the dressing table long after the party.',
    kicker: 'The favour every auntie actually uses.',
    scents: SCENTS,
    containers: TUBS,
    lids: TUB_LIDS,
    lidLabel: 'Lid',
    cardMount: true,
    cardMountSizes: ['Small 50g'],
    included: [
      'A tub of 100% pure, unrefined African shea butter in the size you choose',
      'Your choice of tub and lid colour',
      'A label with your names or logo and the event date, if you add one',
      'A free label design matched to your theme, with two rounds of changes',
    ],
    longCopy: [
      'Shea butter is the souvenir Ghanaian guests reach for again and again. It goes on dry hands after the dishes, on heels before bed and on a baby\'s skin after the bath. That is why a little tub with your names on it does not end up in a drawer. It ends up on the dressing table, next to the mirror, where it reminds someone of your day every single morning.',
      'Ours is always 100% pure African shea butter, unrefined, so it keeps its natural richness and its soft, nutty smell. You can keep it unscented or add a gentle vanilla, coconut or rose scent. The small 50g tub is the classic party favour, the medium 100g feels generous for close family, and the large 250g makes a proper gift for bridesmaids, chief mourners or the people who helped you plan.',
      'Choose a tub and lid in colours that match your theme, then add a label with the couple\'s names, the celebrant\'s name, the baby\'s name or your company logo, with the event date printed underneath. We design the label for free and send it to you on WhatsApp to approve before anything is made.',
    ],
    faqs: [
      { q: 'Is your shea butter really 100% pure?', a: 'Yes. It is 100% pure, unrefined African shea butter. If you choose a scent, a small amount of fragrance is added; choose Unscented to keep it completely plain.' },
      { q: 'Which size is best for wedding guests?', a: 'Most couples choose the small 50g tub for guests and the large 250g tub for the bridal party and parents.' },
      { q: 'Will it melt in the heat?', a: 'Shea butter softens in strong heat and firms up again when it cools. Keep boxes out of direct sun at the venue and it will look its best.' },
      { q: 'Can I mount the small tub on a card?', a: 'Yes. The small 50g tub can be mounted on a printed card that carries your names, the date and a short thank you message.' },
    ],
    imageAlt: 'Small tub of 100% pure African shea butter with a custom wedding label',
  },
  {
    slug: 'body-butter',
    name: 'Body Butter',
    shortName: 'Body Butter',
    category: 'butters',
    blurb: 'Whipped light and melting, a little indulgent every day.',
    description:
      'Whipped light in the jar, melting into skin with a soft finish that lasts through the evening. A gift that feels a little indulgent and gets used every single day.',
    scents: SCENTS,
    containers: TUBS,
    lids: TUB_LIDS,
    lidLabel: 'Lid',
    cardMount: false,
    cardMountSizes: [],
    included: [
      'A jar of whipped body butter in the size you choose',
      'Your choice of jar and lid colour',
      'A label with your names or logo and the event date, if you add one',
      'A free label design matched to your theme, with two rounds of changes',
    ],
    longCopy: [
      'Body butter is the souvenir that feels like a treat. It is whipped until it is soft and airy, so it glides on easily and sinks in without leaving skin sticky. Guests open the jar, smell it, and it instantly feels more special than the usual party favour.',
      'It works beautifully for weddings, milestone birthdays and bridal showers, and as a thoughtful gift for the women who stood with you through a funeral or a naming ceremony. Pick from unscented, vanilla, coconut or rose, then choose a jar and lid that match your colours.',
      'Add a label with your names or logo and the date, and we will design it for free and send it on WhatsApp for your approval. The small 50g jar is a lovely guest favour; the medium and large sizes make generous gifts for the bridal party, hosts and helpers.',
    ],
    faqs: [
      { q: 'How is body butter different from shea butter?', a: 'Our shea butter is pure and firm. Body butter is whipped to a lighter, fluffier texture that spreads more easily and feels more like a pampering treat.' },
      { q: 'What scents can I choose?', a: 'Unscented, vanilla, coconut or rose. If you want something else, ask us on WhatsApp.' },
      { q: 'Does it leave skin greasy?', a: 'No. It melts in and leaves a soft finish that lasts through the evening.' },
    ],
    imageAlt: 'Jar of whipped body butter with a pink lid and a personalised label',
  },
  {
    slug: 'shimmer-oil',
    name: 'Shimmer Oil',
    shortName: 'Shimmer Oil',
    category: 'oils',
    blurb: 'Silky body oil with a fine golden shimmer.',
    description:
      'Silky body oil with a fine golden shimmer that catches the light on shoulders and collarbones. For the guest who plans to shine at the after party.',
    scents: SCENTS,
    containers: OIL_BOTTLES,
    lids: OIL_CAPS,
    lidLabel: 'Cap',
    cardMount: false,
    cardMountSizes: [],
    included: [
      'A bottle of shimmer body oil in the size you choose',
      'Your choice of bottle and cap',
      'A label with your names or logo and the event date, if you add one',
      'A free label design matched to your theme, with two rounds of changes',
    ],
    longCopy: [
      'Shimmer oil is the favour guests show each other. A few drops on the shoulders, arms or collarbones and the skin catches the light with a fine golden glow. It is a playful, glamorous souvenir that suits weddings, birthdays, bridal showers and any party that goes late.',
      'The oil feels silky rather than sticky, and the shimmer is fine, never glittery or loud. It comes in an amber dropper bottle, a clear bottle or a frosted bottle, so you can choose the look that fits your theme, from classic and warm to clean and modern.',
      'Add a label with your names or logo and the date. We design it for free and send it to you on WhatsApp before we print. Pair it with a lip balm and a small body butter and you have The Glow Set, with 5% off your whole order.',
    ],
    faqs: [
      { q: 'Is the shimmer very sparkly?', a: 'No. It is a fine golden shimmer that gives skin a soft glow, not chunky glitter.' },
      { q: 'Which bottle looks most premium?', a: 'The amber dropper bottle with a black dropper is the most popular. Frosted bottles look soft and modern.' },
      { q: 'Can men use it?', a: 'Of course. Choose Unscented for a neutral feel.' },
    ],
    imageAlt: 'Amber dropper bottle of golden shimmer oil with a custom label',
  },
  {
    slug: 'hand-cream',
    name: 'Hand Cream',
    shortName: 'Hand Cream',
    category: 'hand-care',
    blurb: 'Light, quick to sink in, never greasy.',
    description:
      'Light and quick to sink in, with no greasy feel. Kind to the hands that hugged you all day.',
    scents: SCENTS,
    containers: PUMP_BOTTLES,
    lids: PUMP_CAPS,
    lidLabel: 'Pump or cap',
    cardMount: false,
    cardMountSizes: [],
    included: [
      'A bottle of hand cream in the size you choose',
      'Your choice of bottle and pump or cap',
      'A label with your names or logo and the event date, if you add one',
      'A free label design matched to your theme, with two rounds of changes',
    ],
    longCopy: [
      'Hand cream is the quiet hero of souvenirs. It slips into a handbag, sits on an office desk and gets used every day, so your names and date are seen again and again. It is light and quick to absorb, so guests can use it straight away without leaving marks on their clothes or phones.',
      'It is a thoughtful choice for corporate gifts and church events, where you want something useful and polished, and a gentle option for funerals, where a practical keepsake feels more fitting than something flashy.',
      'Choose a bottle and a pump or flip cap, pick a scent, and add a label with your names or logo and the date. We design the label for free and send it on WhatsApp for your approval.',
    ],
    faqs: [
      { q: 'What sizes does the hand cream come in?', a: 'Small 30ml, medium 50ml and large 100ml. The small size fits easily in a handbag.' },
      { q: 'Is it good for corporate gifts?', a: 'Yes. It is practical, used daily, and looks smart with a company logo on the label.' },
      { q: 'Will it feel greasy?', a: 'No. It is a light cream that sinks in quickly.' },
    ],
    imageAlt: 'White bottle of hand cream with a gold pump and a personalised label',
  },
  {
    slug: 'hand-wash-gel',
    name: 'Hand Wash Gel',
    shortName: 'Hand Wash Gel',
    category: 'hand-care',
    blurb: 'A gentle, practical keepsake for every sink.',
    description:
      'A gentle gel that leaves hands clean and soft. A practical keepsake that brings your celebration to mind at every sink.',
    scents: [], // TBD: confirm whether hand wash gel has scent options
    containers: PUMP_BOTTLES,
    lids: PUMP_CAPS,
    lidLabel: 'Pump or cap',
    cardMount: false,
    cardMountSizes: [],
    included: [
      'A bottle of gentle hand wash gel in the size you choose',
      'Your choice of bottle and pump or cap',
      'A label with your names or logo and the event date, if you add one',
      'A free label design matched to your theme, with two rounds of changes',
    ],
    longCopy: [
      'Hand wash gel is the souvenir that never gets wasted. It goes straight to the kitchen or bathroom sink, and every time someone washes their hands they see your names and your date. For many families it is the most practical, most used favour of all.',
      'The gel is gentle and leaves hands clean and soft rather than dry. It suits funerals and church events particularly well, where guests appreciate something useful, and it is a smart, affordable choice for large corporate orders.',
      'Choose your bottle and a pump or flip cap, then add a label with your names or logo and the date. Our design is free, and we send it on WhatsApp so you can approve it before we make anything.',
    ],
    faqs: [
      { q: 'Is the hand wash gel gentle on skin?', a: 'Yes. It cleans without leaving hands tight or dry.' },
      { q: 'Is it a good funeral souvenir?', a: 'Many families choose it because it is practical and used daily, a quiet way for guests to remember your loved one.' },
      { q: 'Can I order a large quantity for a company?', a: 'Yes. Orders start from 25 pieces and we can make much larger quantities. Message us for big orders so we can plan the timing with you.' },
    ],
    imageAlt: 'Clear bottle of hand wash gel with a white pump and a custom label',
  },
  {
    slug: 'lip-balm',
    name: 'Lip Balm',
    shortName: 'Lip Balm',
    category: 'lip',
    blurb: 'Pocket sized and always welcome.',
    description:
      'Pocket sized and always welcome. A smooth, nourishing balm that slips into any clutch, and looks especially sweet mounted on a printed card.',
    scents: SCENTS,
    containers: BALM_TUBES,
    lids: [], // TBD: confirm cap colour options
    lidLabel: 'Cap',
    cardMount: true,
    cardMountSizes: ['One size 5g'],
    included: [
      'A lip balm tube',
      'Your choice of tube colour',
      'A label with your names or logo and the event date, if you add one',
      'A free label design matched to your theme, with two rounds of changes',
    ],
    longCopy: [
      'Lip balm is the friendliest souvenir there is. It is small, light, affordable and everyone uses it, from the grandmother in the front row to the teenage cousins at the back. Guests slip it into a pocket or clutch and it goes everywhere with them.',
      'It looks especially sweet mounted on a printed card. The card carries your names, the date and a short message such as "Thank you for coming", and the balm sits right in the middle.',
      'Pick a flavour, choose your tube colour and add a label with your names or logo and the date. Pair it with a small shea butter for The Sweet Pair, or with a small body butter and shimmer oil for The Glow Set, and save 5% on your whole order.',
    ],
    faqs: [
      { q: 'What is the cheapest souvenir you make?', a: 'The lip balm, which starts from GH₵ 13 per piece.' },
      { q: 'Can I mount the lip balm on a card?', a: 'Yes. We mount it on a printed card with your names, the date and a short message of your choice.' },
      { q: 'Is it good for children\'s parties?', a: 'Yes. It is small, safe to carry and a hit with all ages.' },
    ],
    imageAlt: 'Pink lip balm tube mounted on a printed thank you card',
  },
];

export const SUGGESTED_BUNDLES = [
  {
    id: 'sweet-pair',
    name: 'The Sweet Pair',
    blurb: 'A lip balm and a small shea butter. Small, sweet and always used.',
    items: [
      { slug: 'lip-balm' as Slug, size: 'One size 5g' },
      { slug: 'pure-african-shea-butter' as Slug, size: 'Small 50g' },
    ],
  },
  {
    id: 'glow-set',
    name: 'The Glow Set',
    blurb: 'Lip balm, small body butter and small shimmer oil, for guests who love to glow.',
    items: [
      { slug: 'lip-balm' as Slug, size: 'One size 5g' },
      { slug: 'body-butter' as Slug, size: 'Small 50g' },
      { slug: 'shimmer-oil' as Slug, size: 'Small 30ml' },
    ],
  },
];

// ---- helpers ---------------------------------------------------------------

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function sizesOf(slug: Slug): { size: string; price: number }[] {
  return Object.entries(PRICES[slug]).map(([size, price]) => ({ size, price }));
}

/** Lowest possible unit price: smallest size, no label, no add ons. */
export function startsFrom(slug: Slug) {
  return Math.min(...Object.values(PRICES[slug]));
}

export function highestUnit(slug: Slug) {
  const p = getProduct(slug)!;
  const top = Math.max(...Object.values(PRICES[slug]));
  const card = p.cardMount ? ADD_ONS.card : 0;
  return top + ADD_ONS.label + ADD_ONS.bag + ADD_ONS.tag + card;
}

export function bundleStartsFrom(items: { slug: Slug; size: string }[]) {
  const sum = items.reduce((t, i) => t + (PRICES[i.slug] as Record<string, number>)[i.size], 0);
  return sum * (1 - BUNDLE_DISCOUNT);
}
