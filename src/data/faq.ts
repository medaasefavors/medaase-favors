import { SITE } from './site';
import { ADD_ONS, BUNDLE_DISCOUNT, PRODUCTS, startsFrom } from './products';
import { cedi } from '../lib/format';

const cheapest = Math.min(...PRODUCTS.map((p) => startsFrom(p.slug)));
const priceList = PRODUCTS.map((p) => `${p.shortName} from ${cedi(startsFrom(p.slug))}`).join(', ');

export const FAQ_CATEGORIES = [
  { id: 'ordering', label: 'Ordering and prices' },
  { id: 'design', label: 'Labels and design' },
  { id: 'timing', label: 'Timing and rush orders' },
  { id: 'payment', label: 'Payment and delivery' },
  { id: 'events', label: 'Products and events' },
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number]['id'];

export const FAQS: { cat: FaqCategory; q: string; a: string }[] = [
  {
    cat: 'ordering',
    q: 'What is the minimum order?',
    a: `${SITE.minPerItem} pieces per product, then in steps of ${SITE.qtyStep}. You can mix products in one order.`,
  },
  {
    cat: 'ordering',
    q: 'How much do souvenirs cost?',
    a: `From ${cedi(cheapest)} per piece. ${priceList}. A printed label adds ${cedi(ADD_ONS.label)}.`,
  },
  {
    cat: 'timing',
    q: 'How long does it take to make my souvenirs?',
    a: `${SITE.turnaround} after you approve your label design.`,
  },
  {
    cat: 'timing',
    q: 'Can I order souvenirs for an event this weekend?',
    a: `Under ${SITE.rushWorkingDays} working days away: yes, with a ${Math.round(SITE.rushRate * 100)}% rush fee. Under ${SITE.blockWorkingDays}: message us on WhatsApp first.`,
  },
  {
    cat: 'design',
    q: 'Is the label design free?',
    a: `Yes, matched to your theme, with ${SITE.designRounds} free rounds of changes.`,
  },
  {
    cat: 'design',
    q: 'Can I put our names, a photo or a logo on the label?',
    a: 'Yes. Names or your own logo or image on the front, with the date underneath (for example 12.12.2026).',
  },
  {
    cat: 'events',
    q: 'Do you make funeral souvenirs?',
    a: 'Yes, with calm, respectful "In loving memory" labels.',
  },
  {
    cat: 'events',
    q: 'Do you make naming ceremony (outdooring) souvenirs?',
    a: 'Yes. Shea butter and lip balm with the baby\'s name are the favourites.',
  },
  {
    cat: 'events',
    q: 'Do you make corporate gifts?',
    a: 'Yes, with your company logo on any product.',
  },
  {
    cat: 'ordering',
    q: 'What is the bundle discount?',
    a: `${Math.round(BUNDLE_DISCOUNT * 100)}% off your whole order when you choose two or more different products. Applied automatically.`,
  },
  {
    cat: 'payment',
    q: 'How do I pay?',
    a: 'In full when you order, through Paystack: MTN MoMo, Telecel Cash, AirtelTigo Money or card.',
  },
  {
    cat: 'payment',
    q: 'Do you deliver outside Accra?',
    a: `Within Accra it is ${cedi(SITE.deliveryFeeAccra)}, or pick up for free. Outside Accra, message us and we will arrange it.`,
  },
  {
    cat: 'events',
    q: 'What is in your shea butter?',
    a: '100% pure, unrefined African shea butter. Scented options add a little fragrance.',
  },
  {
    cat: 'ordering',
    q: 'Can I see a sample before ordering?',
    a: 'Message us on WhatsApp and we will let you know.',
  },
  {
    cat: 'ordering',
    q: 'What if I need to change my order?',
    a: 'Message us on WhatsApp with your order reference. Changes are easy before you approve the design, but may not be possible after.',
  },
  {
    cat: 'design',
    q: 'Can I add a drawstring bag?',
    a: `Yes, ${cedi(ADD_ONS.bag)} each in pink, navy, white, gold or mixed. Each guest's favours go in one bag.`,
  },
  {
    cat: 'design',
    q: 'Can I choose the colours of the tubs and lids?',
    a: 'Yes, for every product.',
  },
  {
    cat: 'design',
    q: 'How will I know my design is right before you print?',
    a: 'We send it on WhatsApp within 24 hours. Nothing is printed until you approve it.',
  },
];

export const FAQ_PREVIEW = [
  'What is the minimum order?',
  'How much do souvenirs cost?',
  'How long does it take to make my souvenirs?',
  'Is the label design free?',
  'What is the bundle discount?',
].map((q) => FAQS.find((f) => f.q === q)!);

export function faqsIn(cat: FaqCategory) {
  return FAQS.filter((f) => f.cat === cat);
}
