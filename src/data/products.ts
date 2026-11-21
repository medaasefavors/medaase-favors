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

// Added to every piece of every product (owner's costing for PDF materials).
// Built into all prices customers see; not shown as a separate line.
export const PER_PIECE_CHARGE = 1.5;

export const ADD_ONS = {
  label: 1.5, // Label (front text or logo + date)
  bag: 2.5, // Organza bag
  card: 3, // Mount on printed card
  shape: 3, // Custom shape (extra)
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

// Confirmed by the owner.
const SCENTS = ['Plain Jane', 'Choco', 'Caramel', 'Strawberry'];
// Packaging. Each product offers one or more packaging types, each with its colours.
// labelStyle: 'wrap' = label around the body, 'lid' = round label on the lid,
// 'tube' = label around the tube, read horizontally.
export interface Packaging {
  type: string;
  colours: string[];
  lids: string[];
  labelStyle: 'wrap' | 'lid' | 'tube';
  /** Colours currently out of stock. Shown but not selectable. Managed from the admin panel. */
  outOfStock?: string[];
}
const PLASTIC_JAR: Packaging = { type: 'Plastic jar', colours: ['Clear', 'White', 'Black'], lids: ['Black', 'White'], labelStyle: 'wrap' };
const ALUMINIUM_JAR: Packaging = { type: 'Aluminium jar', colours: ['Black', 'Silver', 'Gold'], lids: [], labelStyle: 'lid' };
// Bottles and tubes come as one colour, body and cap together.
const BOTTLE: Packaging = { type: 'Bottle', colours: ['Clear', 'Black', 'White'], lids: [], labelStyle: 'wrap' };
const TUBE: Packaging = { type: 'Tube', colours: ['Clear', 'Black', 'White'], lids: [], labelStyle: 'tube' }; // TBD: confirm tube colours

/** "Aluminium jar · Gold" */
export function containerName(p: Packaging, colour: string) {
  return `${p.type} · ${colour}`;
}

// Presentation: how each favour is handed out.
export const CARD_SHAPES = ['Rectangle', 'Circle', 'Custom shape'];
export const CARD_DESIGNS = [
  { id: 'wax-seal', name: 'Wax seal', note: 'A wax seal above your names, date and a thank-you line' },
  { id: 'calendar', name: 'Save the date', note: 'A calendar with your date circled, your initials and a ribbon' },
  { id: 'ribbon', name: 'Ribbon and stripes', note: 'A striped border, a framed panel and a bow on top' },
];

export interface Product {
  slug: Slug;
  name: string;
  shortName: string;
  category: Category;
  blurb: string;
  description: string;
  kicker?: string;
  scents: string[];
  /** Colour of the product itself (shimmer oil). */
  shades?: { name: string; note: string; swatch: string }[];
  packaging: Packaging[];
  cardMount: boolean; // which sizes allow mounting on a printed card
  cardMountSizes: string[];
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
      'Pure, unrefined shea, soft enough to scoop and rich enough for elbows, heels and dry hands. We dress each jar in your colours and names, so it stays on the dressing table long after the party.',
    kicker: 'The favour every auntie actually uses.',
    scents: SCENTS,
    packaging: [PLASTIC_JAR, ALUMINIUM_JAR],
    cardMount: true,
    cardMountSizes: ['Small 50g'],
    longCopy: [
      "Shea butter is the favour Ghanaian guests actually use: on dry hands, heels and a baby's skin after the bath. So your jar ends up on the dressing table, not in a drawer.",
      "Ours is always 100% pure and unrefined. Small jars suit guests; large jars make a proper thank you for bridesmaids, chief mourners and helpers.",
    ],
    faqs: [
      { q: 'Is your shea butter really 100% pure?', a: 'Yes. It is 100% pure, unrefined African shea butter. If you choose a scent, a small amount of fragrance is added; choose Plain Jane to keep it completely plain.' },
      { q: 'Which size is best for wedding guests?', a: 'Most couples choose the small 50g jar for guests and the large 250g jar for the bridal party and parents.' },
      { q: 'Will it melt in the heat?', a: 'Shea butter softens in strong heat and firms up again when it cools. Keep boxes out of direct sun at the venue and it will look its best.' },
    ],
    imageAlt: 'Small jar of 100% pure African shea butter with a custom wedding label',
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
    packaging: [PLASTIC_JAR, ALUMINIUM_JAR],
    cardMount: false,
    cardMountSizes: [],
    longCopy: [
      "Whipped soft and airy, it glides on and sinks in without feeling sticky. Guests open the jar, smell it, and it instantly feels special.",
      "Lovely for weddings, milestone birthdays and bridal showers, and as a thank you to the women who helped you plan.",
    ],
    faqs: [
      { q: 'How is body butter different from shea butter?', a: 'Our shea butter is pure and firm. Body butter is whipped to a lighter, fluffier texture that spreads more easily and feels more like a pampering treat.' },
      { q: 'Does it leave skin greasy?', a: 'No. It melts in and leaves a soft finish that lasts through the evening.' },
    ],
    imageAlt: 'Jar of whipped body butter with a white lid and a personalised label',
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
    shades: [
      { name: 'Plain Jane', note: 'Our signature oil blend, no shimmer colour', swatch: '#F3E3B5' },
      { name: 'Golden Bronze', note: 'A warm golden shimmer', swatch: '#C08A3E' },
      { name: 'Chocolate Bronze', note: 'A deep chocolate shimmer', swatch: '#6B3F26' },
    ],
    packaging: [BOTTLE],
    cardMount: false,
    cardMountSizes: [],
    longCopy: [
      "A few drops on the shoulders and skin catches the light with a fine golden glow. Silky, never sticky, and never glittery or loud.",
      "Pair it with a lip balm and a small body butter for The Glow Set.",
    ],
    faqs: [
      { q: 'Is the shimmer very sparkly?', a: 'No. It is a fine golden shimmer that gives skin a soft glow, not chunky glitter.' },
      { q: 'Which bottle looks most premium?', a: 'The amber dropper bottle with a black dropper is the most popular. Frosted bottles look soft and modern.' },
      { q: 'Can men use it?', a: 'Of course. Choose the Plain Jane shade for our signature oil blend with no shimmer colour.' },
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
    packaging: [BOTTLE],
    cardMount: false,
    cardMountSizes: [],
    longCopy: [
      "It slips into a handbag, sits on a desk and gets used every day, so your names are seen again and again.",
      "A polished choice for corporate gifts and church events, and a gentle one for funerals.",
    ],
    faqs: [
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
    packaging: [BOTTLE],
    cardMount: false,
    cardMountSizes: [],
    longCopy: [
      "The souvenir that never gets wasted: it goes straight to the sink, and your names are seen every time someone washes their hands.",
      "Practical for funerals and church events, and affordable for large corporate orders.",
    ],
    faqs: [
      { q: 'Is the hand wash gel gentle on skin?', a: 'Yes. It cleans without leaving hands tight or dry.' },
      { q: 'Is it a good funeral souvenir?', a: 'Many families choose it because it is practical and used daily, a quiet way for guests to remember your loved one.' },
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
      'Pocket sized and always welcome. A smooth, nourishing balm that slips into any clutch, and looks especially sweet mounted on a card in the shape of your choice.',
    scents: SCENTS,
    packaging: [TUBE],
    cardMount: true,
    cardMountSizes: ['One size 5g'],
    longCopy: [
      "Small, affordable and loved by everyone from grandma to the cousins. It goes everywhere in a pocket or clutch.",
      "Mount it on a printed card in a rectangle, circle, heart or a custom shape for an extra special touch.",
    ],
    faqs: [
      { q: 'Is it good for children\'s parties?', a: 'Yes. It is small, safe to carry and a hit with all ages.' },
    ],
    imageAlt: 'Pink lip balm tube mounted on a heart shaped printed card',
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
  return Object.entries(PRICES[slug]).map(([size, price]) => ({ size, price: price + PER_PIECE_CHARGE }));
}

/** Lowest possible unit price: smallest size, no label, no add ons. */
export function startsFrom(slug: Slug) {
  return Math.min(...Object.values(PRICES[slug])) + PER_PIECE_CHARGE;
}

export function highestUnit(slug: Slug) {
  const p = getProduct(slug)!;
  const top = Math.max(...Object.values(PRICES[slug])) + PER_PIECE_CHARGE;
  const card = p.cardMount ? ADD_ONS.card + ADD_ONS.shape : 0;
  return top + ADD_ONS.label + ADD_ONS.bag + ADD_ONS.tag + card;
}

export function bundleStartsFrom(items: { slug: Slug; size: string }[]) {
  const sum = items.reduce((t, i) => t + (PRICES[i.slug] as Record<string, number>)[i.size] + PER_PIECE_CHARGE, 0);
  return sum * (1 - BUNDLE_DISCOUNT);
}
