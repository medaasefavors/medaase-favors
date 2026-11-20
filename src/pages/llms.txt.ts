import type { APIRoute } from 'astro';
import { SITE, EVENTS, designRoundsText } from '../data/site';
import { PRODUCTS, ADD_ONS, BUNDLE_DISCOUNT, sizesOf, startsFrom } from '../data/products';
import { GUIDES } from '../data/guides';
import { cedi } from '../lib/format';
import { absolute } from '../lib/url';

export const GET: APIRoute = () => {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} ("medaase" is Twi for "thank you") makes custom skincare souvenirs (favours) in Ghana for weddings, funerals, naming ceremonies, birthdays, church events and corporate gifts. Each favour can carry a label with names or a logo and the event date.`,
    '',
    '## Key facts',
    `- Made in Ghana. Free pickup, ${SITE.pickupHours}. Delivery within Accra ${SITE.deliveryAccra}; outside Accra a flat ${cedi(SITE.deliveryFeeOutsideAccra)}.`,
    `- Office hours: ${SITE.businessHours}.`,
    `- Minimum order: ${SITE.minPerItem} pieces per product.`,
    `- Turnaround: ${SITE.turnaround} after the customer approves the label design.`,
    `- Label design: free, matched to the event theme, ${designRoundsText()}, emailed within 24 hours.`,
    '- Payment: full payment upfront online through Paystack (MTN MoMo, Telecel Cash, AirtelTigo Money or card).',
    `- Bundle discount: ${Math.round(BUNDLE_DISCOUNT * 100)}% off the whole order for 2 or more different products.`,
    `- Rush orders: events under ${SITE.rushWorkingDays} working days away add a ${Math.round(SITE.rushRate * 100)}% rush fee.`,
    '',
    '## Products and prices (GH₵ per piece)',
    ...PRODUCTS.map(
      (p) => `- [${p.name}](${absolute(`/products/${p.slug}`)}): starts from ${cedi(startsFrom(p.slug))}. Sizes: ${sizesOf(p.slug).map((s) => `${s.size} ${cedi(s.price)}`).join(', ')}.`,
    ),
    `- Add ons per piece: label ${cedi(ADD_ONS.label)}, drawstring organza bag ${cedi(ADD_ONS.bag)}, printed card ${cedi(ADD_ONS.card)} (lip balm and small shea butter only; carries names, date and a short message), thank you tag ${cedi(ADD_ONS.tag)}.`,
    '',
    '## How to order',
    '1. Choose products and customise size, scent, container, lid and label.',
    '2. Pay in full online with Paystack.',
    '3. Approve the free label design by email.',
    '4. Collect or get it delivered.',
    '',
    '## Events',
    ...EVENTS.map((e) => `- [${e.name}](${absolute(`/souvenirs/${e.slug}`)})`),
    '',
    '## Pages',
    `- [All products](${absolute('/products')})`,
    `- [Our work: photos of real orders](${absolute('/our-work')})`,
    `- [How it works](${absolute('/how-it-works')})`,
    `- [FAQ](${absolute('/faq')})`,
    `- [Contact](${absolute('/contact')})`,
    ...GUIDES.map((g) => `- [${g.title}](${absolute(`/guides/${g.slug}`)})`),
    '',
    '## Contact',
    `- Instagram: ${SITE.instagram}`,
    `- Email: ${SITE.email}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
