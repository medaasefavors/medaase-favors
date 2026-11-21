// ---------------------------------------------------------------------------
// Medaase Favors products, prices and options.
// The editable catalogue (products, sizes and prices, scents, shades, packaging
// and stock, charges, card designs) lives in catalogue.json. It is published
// from the admin Google Sheet; this file turns it into what the pages use.
// ---------------------------------------------------------------------------
import catalogue from './catalogue.json';

export type Slug = string;
export type Category = 'butters' | 'oils' | 'hand-care' | 'lip';

type CatProduct = (typeof catalogue)['products'][number];

const charge = (key: string, fallback: number) =>
  Number(catalogue.charges.find((c) => c.key === key)?.price ?? fallback);

/** Added to every piece of every product (built into all prices shown). */
export const PER_PIECE_CHARGE = Number(catalogue.settings.perPieceCharge ?? 0);

export const ADD_ONS = {
  label: charge('label', 1.5),
  bag: charge('bag', 2.5),
  card: charge('card', 3),
  shape: charge('shape', 3),
  tag: charge('tag', 2),
};

export const BUNDLE_DISCOUNT = Number(catalogue.settings.bundleDiscount ?? 0.05);

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'butters', label: 'Butters' },
  { id: 'oils', label: 'Oils' },
  { id: 'hand-care', label: 'Hand care' },
  { id: 'lip', label: 'Lip' },
];

// Packaging: each product offers one or more packaging types, each with colours.
// labelStyle: 'wrap' = label around the body, 'lid' = round label on the lid,
// 'tube' = label around the tube, read horizontally.
export interface Packaging {
  type: string;
  colours: string[];
  lids: string[];
  labelStyle: 'wrap' | 'lid' | 'tube';
  /** Colours currently out of stock: shown but not selectable. */
  outOfStock?: string[];
}

/** "Aluminium jar · Gold" */
export function containerName(p: Packaging, colour: string) {
  return `${p.type} · ${colour}`;
}

// Presentation
export const CARD_SHAPES = catalogue.cardShapes.filter((s) => s.show).map((s) => s.name);
export const CARD_DESIGNS = catalogue.cardDesigns
  .filter((d) => d.show)
  .map((d) => ({ id: d.illustration || 'none', name: d.name, note: d.note }));

export interface Product {
  slug: Slug;
  name: string;
  shortName: string;
  category: Category;
  blurb: string;
  description: string;
  kicker?: string;
  scents: string[];
  shades?: { name: string; note: string; swatch: string }[];
  packaging: Packaging[];
  cardMount: boolean;
  cardMountSizes: string[];
  faqs: { q: string; a: string }[];
  longCopy: string[];
  imageAlt: string;
  photo?: string; // file name of a photo published from the admin sheet
}

// Product questions are written for each product; new products start without any.
const PRODUCT_FAQS: Record<string, { q: string; a: string }[]> = {
  "pure-african-shea-butter": [
    {
      "q": "Is your shea butter really 100% pure?",
      "a": "Yes. It is 100% pure, unrefined African shea butter. If you choose a scent, a small amount of fragrance is added; choose Plain Jane to keep it completely plain."
    },
    {
      "q": "Which size is best for wedding guests?",
      "a": "Most couples choose the small 50g jar for guests and the large 250g jar for the bridal party and parents."
    },
    {
      "q": "Will it melt in the heat?",
      "a": "Shea butter softens in strong heat and firms up again when it cools. Keep boxes out of direct sun at the venue and it will look its best."
    }
  ],
  "body-butter": [
    {
      "q": "How is body butter different from shea butter?",
      "a": "Our shea butter is pure and firm. Body butter is whipped to a lighter, fluffier texture that spreads more easily and feels more like a pampering treat."
    },
    {
      "q": "Does it leave skin greasy?",
      "a": "No. It melts in and leaves a soft finish that lasts through the evening."
    }
  ],
  "shimmer-oil": [
    {
      "q": "Is the shimmer very sparkly?",
      "a": "No. It is a fine golden shimmer that gives skin a soft glow, not chunky glitter."
    },
    {
      "q": "Which bottle looks most premium?",
      "a": "The amber dropper bottle with a black dropper is the most popular. Frosted bottles look soft and modern."
    },
    {
      "q": "Can men use it?",
      "a": "Of course. Choose the Pure Blend shade, our signature oil blend with no shimmer colour."
    }
  ],
  "hand-cream": [
    {
      "q": "Is it good for corporate gifts?",
      "a": "Yes. It is practical, used daily, and looks smart with a company logo on the label."
    },
    {
      "q": "Will it feel greasy?",
      "a": "No. It is a light cream that sinks in quickly."
    }
  ],
  "hand-wash-gel": [
    {
      "q": "Is the hand wash gel gentle on skin?",
      "a": "Yes. It cleans without leaving hands tight or dry."
    },
    {
      "q": "Is it a good funeral souvenir?",
      "a": "Many families choose it because it is practical and used daily, a quiet way for guests to remember your loved one."
    }
  ],
  "lip-balm": [
    {
      "q": "Is it good for children's parties?",
      "a": "Yes. It is small, safe to carry and a hit with all ages."
    }
  ]
};

function groupPackaging(p: CatProduct): Packaging[] {
  const out: Packaging[] = [];
  for (const row of p.packaging) {
    let pk = out.find((x) => x.type === row.type);
    if (!pk) {
      pk = { type: row.type, colours: [], lids: row.lids ?? [], labelStyle: (row.labelStyle as Packaging['labelStyle']) || 'wrap', outOfStock: [] };
      out.push(pk);
    }
    pk.colours.push(row.colour);
    if (row.inStock === false) pk.outOfStock!.push(row.colour);
  }
  return out;
}

const visible = catalogue.products.filter((p) => p.show !== false && p.sizes.length > 0);

/** GH₵ per piece before the per-piece charge, by product and size. */
export const PRICES: Record<string, Record<string, number>> = Object.fromEntries(
  visible.map((p) => [p.slug, Object.fromEntries(p.sizes.map((s) => [s.size, Number(s.price)]))]),
);

export const PRODUCTS: Product[] = visible.map((p) => {
  const cardMountSizes = p.sizes.filter((s) => s.cardMount).map((s) => s.size);
  return {
    slug: p.slug,
    name: p.name,
    shortName: p.shortName || p.name,
    category: (p.category as Category) || 'butters',
    blurb: p.blurb,
    description: p.description,
    kicker: p.kicker || undefined,
    scents: p.scents ?? [],
    shades: p.shades?.length ? p.shades : undefined,
    packaging: groupPackaging(p),
    cardMount: cardMountSizes.length > 0,
    cardMountSizes,
    faqs: PRODUCT_FAQS[p.slug] ?? [],
    longCopy: (p.why ?? []).filter(Boolean),
    imageAlt: p.imageAlt || p.name,
    photo: p.photo || undefined,
  };
});

const RAW_BUNDLES: { id: string; name: string; blurb: string; items: { slug: string; size: string }[] }[] = [
  {
    "id": "sweet-pair",
    "name": "The Sweet Pair",
    "blurb": "A lip balm and a small shea butter. Small, sweet and always used.",
    "items": [
      {
        "slug": "lip-balm",
        "size": "One size 5g"
      },
      {
        "slug": "pure-african-shea-butter",
        "size": "Small 50g"
      }
    ]
  },
  {
    "id": "glow-set",
    "name": "The Glow Set",
    "blurb": "Lip balm, small body butter and small shimmer oil, for guests who love to glow.",
    "items": [
      {
        "slug": "lip-balm",
        "size": "One size 5g"
      },
      {
        "slug": "body-butter",
        "size": "Small 50g"
      },
      {
        "slug": "shimmer-oil",
        "size": "Small 30ml"
      }
    ]
  }
];

/** Suggested bundles, kept only while every product and size in them is on sale. */
export const SUGGESTED_BUNDLES = RAW_BUNDLES.filter((b) => b.items.every((i) => PRICES[i.slug]?.[i.size] !== undefined));

// ---- helpers ---------------------------------------------------------------

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function sizesOf(slug: Slug): { size: string; price: number }[] {
  return Object.entries(PRICES[slug] ?? {}).map(([size, price]) => ({ size, price: price + PER_PIECE_CHARGE }));
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
  const sum = items.reduce((t, i) => t + (PRICES[i.slug]?.[i.size] ?? 0) + PER_PIECE_CHARGE, 0);
  return sum * (1 - BUNDLE_DISCOUNT);
}
