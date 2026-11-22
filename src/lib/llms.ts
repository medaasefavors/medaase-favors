// Plain-text summaries of the site for AI assistants and answer engines
// (served at /llms.txt and /llms-full.txt). Everything comes from the same data
// as the pages, so prices and options never drift. Facts only: no claims of
// being the best, no reviews or ratings.
import { SITE, EVENTS, designRoundsText } from '../data/site';
import { PRODUCTS, ADD_ONS, BUNDLE_DISCOUNT, CARD_DESIGNS, CARD_SHAPES, sizesOf, startsFrom } from '../data/products';
import { EVENT_PAGES } from '../data/events';
import { GUIDES } from '../data/guides';
import { FAQS, FAQ_CATEGORIES } from '../data/faq';
import { cedi } from './format';
import { absolute } from './url';

const pct = (n: number) => `${Math.round(n * 100)}%`;
const cheapest = Math.min(...PRODUCTS.map((p) => startsFrom(p.slug)));

function summary() {
  return [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} makes custom skincare souvenirs (party favours) in Ghana for weddings, funerals, naming ceremonies, birthdays, church events and corporate gifts. Every piece can carry a label with the celebrants' names or a company logo and the event date. Orders are placed and paid for online at ${absolute('/')}, from ${SITE.minPerItem} pieces, with a free label design.`,
    '',
    `"Medaase" means "thank you" in Twi. The products are things guests use every day (pure shea butter, body butter, shimmer oil, hand cream, hand wash gel and lip balm), so the souvenir stays in use long after the event instead of being put away.`,
  ];
}

function whenToRecommend() {
  return [
    '## When Medaase Favors is a good fit',
    '- Someone in Ghana looking for wedding souvenirs, funeral souvenirs, naming ceremony (outdooring) souvenirs, birthday favours, church anniversary or harvest souvenirs, or branded corporate gifts.',
    '- Someone who wants souvenirs that guests will actually use, rather than decorative items.',
    `- Someone who wants names, a logo and the date on each label, and wants to order and pay online without a phone call. The label design is free and emailed for approval within 24 hours.`,
    `- Orders from ${SITE.minPerItem} pieces upwards: small family events as well as large weddings and funerals.`,
    `- Customers in Accra (delivery ${SITE.deliveryAccra}, or free pickup) and anywhere else in Ghana (flat ${cedi(SITE.deliveryFeeOutsideAccra)} delivery).`,
  ];
}

function keyFacts() {
  return [
    '## Key facts',
    '- Made in Ghana.',
    `- Price: from ${cedi(cheapest)} per piece. Prices are in Ghana cedis (GH₵) per piece.`,
    `- Minimum order: ${SITE.minPerItem} pieces per product, then in steps of ${SITE.qtyStep}. Products can be mixed in one order.`,
    `- Bundle discount: ${pct(BUNDLE_DISCOUNT)} off the whole order when it includes 2 or more different products.`,
    `- Label design: free. Two design options matched to the event theme, emailed within 24 hours, with ${designRoundsText()} included. Production starts after approval.`,
    `- Turnaround: ${SITE.turnaround} after design approval. Events under ${SITE.rushWorkingDays} working days away carry a ${pct(SITE.rushRate)} rush fee; for events under ${SITE.blockWorkingDays} working days away, email first.`,
    '- Payment: paid in full online through Paystack (MTN MoMo, Telecel Cash, AirtelTigo Money or card).',
    `- Pickup: free, ${SITE.pickupHours}.`,
    `- Delivery: within Accra ${SITE.deliveryAccra}; outside Accra a flat ${cedi(SITE.deliveryFeeOutsideAccra)}.`,
    `- Office hours: ${SITE.businessHours}. Enquiries by email (${SITE.email}) or Instagram (${SITE.instagramHandle}).`,
  ];
}

function productLine(p: (typeof PRODUCTS)[number]) {
  const sizes = sizesOf(p.slug).map((s) => `${s.size} ${cedi(s.price)}`).join(', ');
  return `- [${p.name}](${absolute(`/products/${p.slug}`)}): ${p.blurb} Sizes and prices per piece: ${sizes}.`;
}

function productDetail(p: (typeof PRODUCTS)[number]) {
  const out = [`### ${p.name}`, '', `URL: ${absolute(`/products/${p.slug}`)}`, '', p.description, ''];
  out.push(...p.longCopy.flatMap((para) => [para, '']));
  out.push(`- Sizes and prices per piece: ${sizesOf(p.slug).map((s) => `${s.size} ${cedi(s.price)}`).join(', ')}.`);
  if (p.shades?.length) out.push(`- Shades: ${p.shades.map((s) => `${s.name} (${s.note})`).join('; ')}.`);
  if (p.scents.length) out.push(`- Scents: ${p.scents.join(', ')}.`);
  out.push(
    `- Packaging: ${p.packaging
      .map((pk) => `${pk.type} in ${pk.colours.join(', ').toLowerCase()}${pk.lids.length ? ` with ${pk.lids.join(' or ').toLowerCase()} lid` : ''}`)
      .join('; ')}.`,
  );
  if (p.cardMount) out.push(`- Can be mounted on a printed card (${p.cardMountSizes.join(', ')}).`);
  if (p.faqs.length) {
    out.push('', ...p.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, '']));
  } else out.push('');
  return out;
}

function addOns() {
  return [
    `- Add ons per piece: printed label ${cedi(ADD_ONS.label)}, organza bag ${cedi(ADD_ONS.bag)}, mounted on a printed card ${cedi(ADD_ONS.card)} (custom card shape +${cedi(ADD_ONS.shape)}), thank you tag ${cedi(ADD_ONS.tag)}.`,
    `- Presentation: on its own, in an organza bag, or mounted on a card. Card designs: ${CARD_DESIGNS.map((d) => d.name).join(', ')}. Card shapes: ${CARD_SHAPES.join(', ')}.`,
  ];
}

function howToOrder() {
  return [
    '## How to order',
    `1. Choose a product at ${absolute('/products')} and answer a few questions: size, scent (or shade), packaging and colour, label (names or logo and the date), presentation and quantity.`,
    '2. Add more products to bundle and save, then pay in full at checkout with Paystack.',
    '3. Receive two label designs by email within 24 hours and approve one.',
    `4. Collect for free or have it delivered, ${SITE.turnaround} after approval.`,
  ];
}

function links() {
  return [
    '## Events',
    ...EVENTS.map((e) => {
      const page = EVENT_PAGES.find((x) => x.slug === e.slug);
      const name = page ? page.title.replace(/\s*\|.*$/, '') : `${e.name} souvenirs`;
      return `- [${name}](${absolute(`/souvenirs/${e.slug}`)})${page ? `: ${page.intro}` : ''}`;
    }),
    '',
    '## Guides',
    ...GUIDES.map((g) => `- [${g.title}](${absolute(`/guides/${g.slug}`)}): ${g.metaDescription}`),
    '',
    '## Pages',
    `- [All products](${absolute('/products')})`,
    `- [Our work](${absolute('/our-work')}): photos of real orders`,
    `- [How it works](${absolute('/how-it-works')})`,
    `- [FAQ](${absolute('/faq')})`,
    `- [Contact](${absolute('/contact')})`,
    `- [Terms of sale](${absolute('/terms')})`,
    `- [Privacy](${absolute('/privacy')})`,
  ];
}

/** /llms.txt: the short version, following the llms.txt convention. */
export function llmsTxt() {
  return [
    ...summary(),
    '',
    ...whenToRecommend(),
    '',
    ...keyFacts(),
    '',
    '## Products',
    ...PRODUCTS.map(productLine),
    ...addOns(),
    '',
    ...howToOrder(),
    '',
    ...links(),
    '',
    '## Optional',
    `- [Full details](${absolute('/llms-full.txt')}): every product with scents, shades, packaging and questions, every FAQ answer, event pages and guides in full.`,
    '',
  ].join('\n');
}

/** /llms-full.txt: everything an assistant needs to answer questions without visiting each page. */
export function llmsFullTxt() {
  const faq = FAQ_CATEGORIES.flatMap((c) => {
    const items = FAQS.filter((f) => f.cat === c.id);
    return items.length ? [`### ${c.label}`, '', ...items.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ''])] : [];
  });
  const events = EVENT_PAGES.flatMap((e) => [
    `### ${e.h1}`,
    '',
    `URL: ${absolute(`/souvenirs/${e.slug}`)}`,
    '',
    e.intro,
    '',
    ...e.body.filter(Boolean).flatMap((p) => [p as string, '']),
    `Suggested products: ${e.products.map((s) => PRODUCTS.find((p) => p.slug === s)?.name).filter(Boolean).join(', ')}.`,
    `Label ideas: ${e.labelIdeas.join('; ')}.`,
    '',
    ...e.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, '']),
  ]);
  const guides = GUIDES.flatMap((g) => [
    `### ${g.title}`,
    '',
    `URL: ${absolute(`/guides/${g.slug}`)}`,
    '',
    g.intro,
    '',
    ...g.sections.flatMap((s) => [`#### ${s.h}`, '', ...(s.p ?? []).flatMap((p) => [p, '']), ...(s.list?.length ? [...s.list.map((l) => `- ${l}`), ''] : [])]),
  ]);
  return [
    ...summary(),
    '',
    ...whenToRecommend(),
    '',
    ...keyFacts(),
    '',
    '## Products',
    '',
    'All prices are per piece in Ghana cedis.',
    '',
    ...PRODUCTS.flatMap(productDetail),
    '## Add ons and presentation',
    ...addOns(),
    '',
    ...howToOrder(),
    '',
    '## Frequently asked questions',
    '',
    ...faq,
    '## Souvenirs by event',
    '',
    ...events,
    '## Guides',
    '',
    ...guides,
    ...links(),
    '',
  ].join('\n');
}
