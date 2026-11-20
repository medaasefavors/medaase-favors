import { SITE } from './site';
import { ADD_ONS, BUNDLE_DISCOUNT, PRODUCTS, startsFrom } from './products';
import { cedi } from '../lib/format';

const cheapest = Math.min(...PRODUCTS.map((p) => startsFrom(p.slug)));
const priceList = PRODUCTS.map((p) => `${p.shortName} from ${cedi(startsFrom(p.slug))}`).join(', ');

export const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is the minimum order?',
    a: `${SITE.minPerItem} pieces per product. You can order more in steps of ${SITE.qtyStep}, and you can mix different products in one order.`,
  },
  {
    q: 'How much do souvenirs cost?',
    a: `Our souvenirs start from ${cedi(cheapest)} per piece. ${priceList}. Prices are per piece and include a free label design. A printed label adds ${cedi(ADD_ONS.label)} per piece.`,
  },
  {
    q: 'How long does it take to make my souvenirs?',
    a: `Your favours are ready ${SITE.turnaround} after you approve your label design. We send the design on WhatsApp within 24 hours of your order.`,
  },
  {
    q: 'Can I order souvenirs for an event this weekend?',
    a: `If your event is less than ${SITE.rushWorkingDays} working days away, we can usually still help with a rush fee of ${Math.round(SITE.rushRate * 100)}%. If it is less than ${SITE.blockWorkingDays} working days away, please message us on WhatsApp first so we can check if we can make it in time.`,
  },
  {
    q: 'Is the label design free?',
    a: `Yes. We design your label for free, matched to your event theme and colours, and you get ${SITE.designRounds} rounds of changes at no cost.`,
  },
  {
    q: 'Can I put our names, a photo or a logo on the label?',
    a: 'Yes. The front of the label can carry typed text, such as the couple\'s names, the celebrant\'s name or the baby\'s name, or an uploaded logo or image. The event date is printed underneath, for example 12.12.2026.',
  },
  {
    q: 'Do you make funeral souvenirs?',
    a: 'Yes. Many families choose shea butter, hand cream or hand wash gel with a label that reads "In loving memory of" with their loved one\'s name and dates. We keep the design calm and respectful.',
  },
  {
    q: 'Do you make naming ceremony (outdooring) souvenirs?',
    a: 'Yes. Small shea butter tubs and lip balms with the baby\'s name and the date are our most popular naming ceremony favours.',
  },
  {
    q: 'Do you make corporate gifts?',
    a: 'Yes. We put your company logo on hand cream, shea butter, lip balm and more, for staff, clients, conferences and end of year gifts.',
  },
  {
    q: 'What is the bundle discount?',
    a: `Order two or more different products and you get ${Math.round(BUNDLE_DISCOUNT * 100)}% off your whole order. It is our only discount, and it applies automatically at checkout.`,
  },
  {
    q: 'How do I pay?',
    a: 'You pay the full amount upfront when you place your order, through Paystack. You can pay with MTN MoMo, Telecel Cash, AirtelTigo Money or a bank card.',
  },
  {
    q: 'Do you deliver outside Accra?',
    a: `We deliver within Accra for a flat fee of ${cedi(SITE.deliveryFeeAccra)}, or you can pick up for free. For delivery outside Accra, please message us on WhatsApp and we will arrange it with you.`,
  },
  {
    q: 'What is in your shea butter?',
    a: 'Our shea butter is 100% pure, unrefined African shea butter. If you choose a scent, a small amount of fragrance is added. Choose Unscented to keep it completely plain.',
  },
  {
    q: 'Can I see a sample before ordering?',
    a: 'Please message us on WhatsApp about samples and we will let you know what is possible for your order.',
  },
  {
    q: 'What if I need to change my order?',
    a: 'Message us on WhatsApp with your order reference as soon as possible. Changes to the label are free before you approve the design. After approval, production starts, so changes may not be possible.',
  },
  {
    q: 'Can I add a drawstring organza bag?',
    a: `Yes. Sheer drawstring organza bags cost ${cedi(ADD_ONS.bag)} per piece, in pink, navy, white, gold or mixed colours. If you order more than one product, each guest's favours are packed together in one organza bag.`,
  },
  {
    q: 'Can I choose the colours of the tubs and lids?',
    a: 'Yes. You choose the container and lid or cap colour for each product, so your souvenirs match your event theme.',
  },
  {
    q: 'How will I know my design is right before you print?',
    a: 'We send you the label design on WhatsApp within 24 hours of your order. Nothing is printed until you approve it.',
  },
];

export const FAQ_PREVIEW = FAQS.slice(0, 5);
