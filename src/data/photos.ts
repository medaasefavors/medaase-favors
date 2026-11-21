// Real photos of Medaase Favors work. Astro converts these to AVIF/WebP at build
// time; metadata (including location) was stripped before they were added.
import type { ImageMetadata } from 'astro';
import LABEL_AREAS from './label-areas.json';
import amberDroppers from '../assets/photos/amber-dropper-bottles-shimmer-oil.jpg';
import sheaTubs from '../assets/photos/pure-shea-butter-black-tubs.jpg';
import thankYouCard from '../assets/photos/lip-balm-thank-you-card.jpg';
import kissCard from '../assets/photos/lip-balm-kiss-congratulations-card.jpg';
import kissInHand from '../assets/photos/lip-balm-kiss-in-hand.jpg';
import brideSquadCard from '../assets/photos/lip-balm-bride-squad-card.jpg';
import brideSquadRow from '../assets/photos/lip-balms-bride-squad-row.jpg';
import aluBlack from '../assets/packshots/aluminium-jar-black.jpg';
import aluGold from '../assets/packshots/aluminium-jar-gold.jpg';
import aluSilver from '../assets/packshots/aluminium-jar-silver.jpg';
import dropperClear from '../assets/packshots/dropper-clear-black.jpg';
import flipClear from '../assets/packshots/flip-bottle-clear.jpg';
import gelClearFilled from '../assets/packshots/gel-bottle-clear-filled.jpg';
import gelPhoto from '../assets/photos/hand-wash-gel-bottle.jpg';
import bodyButterWhipped from '../assets/photos/body-butter-whipped.jpg';
import bodyButterJars from '../assets/photos/body-butter-white-jars.jpg';
import handCreamFilled from '../assets/photos/hand-cream-bottles-filled.jpg';
import pumpsBoxed from '../assets/photos/pump-bottles-and-jars-boxed.jpg';
import blackCaps from '../assets/photos/lotion-and-wash-black-caps.jpg';
import whippedJars from '../assets/photos/whipped-butter-clear-jars.jpg';
import flipBlack from '../assets/packshots/flip-bottle-black.jpg';
import flipWhite from '../assets/packshots/flip-bottle-white.jpg';
import lotionOrder from '../assets/photos/lotion-and-hand-wash-order.jpg';
import bottlesFilled from '../assets/photos/lotion-and-gel-bottles-filled.jpg';
import dropperAmber from '../assets/packshots/dropper-amber-black.jpg';
import plasticClear from '../assets/packshots/plastic-jar-clear-black-lid.jpg';
import plasticWhite from '../assets/packshots/plastic-jar-white.jpg';
import plasticBlack from '../assets/packshots/plastic-jar-black.jpg';
import tubeWhite from '../assets/packshots/lip-balm-tube-white.jpg';
import tubeBlack from '../assets/packshots/lip-balm-tube-black.jpg';

export interface Photo { src: ImageMetadata; alt: string }

export const PHOTOS = {
  amberDroppers: {
    src: amberDroppers,
    alt: 'Amber glass dropper bottles of shimmer oil with black droppers, packed in a box and ready for labelling',
  },
  sheaTubs: {
    src: sheaTubs,
    alt: 'Freshly filled black jars of 100% pure African shea butter, seen from above',
  },
  thankYouCard: {
    src: thankYouCard,
    alt: 'Lip balm with a burgundy "Thank you" label mounted on a printed thank you card in a clear sleeve',
  },
  kissCard: {
    src: kissCard,
    alt: 'Pink "Kiss the Miss goodbye" lip balm on a printed "Congratulations!" card for a bridal shower',
  },
  kissInHand: {
    src: kissInHand,
    alt: 'Hand holding a pink custom lip balm labelled "Kiss the Miss goodbye"',
  },
  brideSquadCard: {
    src: brideSquadCard,
    alt: 'Sage green "Bride Squad" lip balm on a printed "My Bride Tribe" card',
  },
  brideSquadRow: {
    src: brideSquadRow,
    alt: 'A row of twelve sage green "Bride Squad" custom lip balms for a bridal party',
  },
} satisfies Record<string, Photo>;

/** Main photo per product. Products without one show the brand placeholder until photos arrive. */
export const PRODUCT_PHOTOS: Partial<Record<string, Photo>> = {
  'shimmer-oil': PHOTOS.amberDroppers,
  'pure-african-shea-butter': PHOTOS.sheaTubs,
  'lip-balm': PHOTOS.brideSquadCard,
  'body-butter': { src: bodyButterJars, alt: 'Rows of white jars filled with creamy body butter' },
  'hand-cream': { src: handCreamFilled, alt: 'Rows of freshly filled hand cream bottles' },
  'hand-wash-gel': { src: gelPhoto, alt: 'A bottle of hand wash gel with a clear flip cap' },
};

export interface Work {
  photo: Photo;
  title: string;
  occasion: string;
  note: string;
  product: string; // product slug
}

/** Our work gallery, in display order. The first five also feed the home page slideshow. */
export const WORKS: Work[] = [
  { photo: PHOTOS.brideSquadCard, title: 'Bride Squad', occasion: 'Bridal party', note: 'Sage green lip balms on "My Bride Tribe" cards, one for every bridesmaid.', product: 'lip-balm' },
  { photo: PHOTOS.thankYouCard, title: 'Thank you', occasion: 'Customer gift', note: 'A burgundy lip balm on a printed card with a sweet prayer for every guest.', product: 'lip-balm' },
  { photo: PHOTOS.kissCard, title: 'Kiss the Miss goodbye', occasion: 'Bridal shower', note: 'Hot pink lip balms on "Congratulations!" cards for the bride\'s last night out.', product: 'lip-balm' },
  { photo: PHOTOS.brideSquadRow, title: 'The whole squad', occasion: 'Wedding', note: 'Twelve matching lip balms, lined up and ready for the bridal train.', product: 'lip-balm' },
  { photo: PHOTOS.sheaTubs, title: 'Pure shea, freshly poured', occasion: 'In the making', note: '100% pure African shea butter, poured into black jars before labelling.', product: 'pure-african-shea-butter' },
  { photo: { src: lotionOrder, alt: 'A box of finished hand lotion and hand wash bottles with custom labels, packed for delivery' }, title: 'Lotion and hand wash', occasion: 'Packed and ready', note: 'Labelled bottles of hand lotion and hand wash, boxed for delivery.', product: 'hand-cream' },
  { photo: { src: bottlesFilled, alt: 'Rows of freshly filled hand lotion and hand wash gel bottles' }, title: 'Freshly filled', occasion: 'In the making', note: 'Hand lotion and hand wash gel, filled and waiting for their labels.', product: 'hand-wash-gel' },
  { photo: { src: bodyButterWhipped, alt: 'Freshly whipped body butter, soft and glossy' }, title: 'Freshly whipped', occasion: 'In the making', note: 'Body butter straight from the mixer, light and glossy.', product: 'body-butter' },
  { photo: { src: whippedJars, alt: 'Clear jars filled with whipped body butter' }, title: 'Whipped to order', occasion: 'In the making', note: 'Soft whipped body butter, piped into clear jars.', product: 'body-butter' },
  { photo: { src: blackCaps, alt: 'Bottles of hand lotion and hand wash gel with black flip caps' }, title: 'Lotion and wash, side by side', occasion: 'In the making', note: 'Hand lotion and hand wash gel with black flip caps, ready for labels.', product: 'hand-wash-gel' },
  { photo: { src: pumpsBoxed, alt: 'Black pump bottles and black jars packed in a box' }, title: 'Boxed and ready', occasion: 'Packed and ready', note: 'Black pump bottles and jars, boxed for a client.', product: 'body-butter' },
  { photo: PHOTOS.kissInHand, title: 'Pocket sized', occasion: 'Bridal shower', note: 'Small enough for any clutch, pretty enough to keep.', product: 'lip-balm' },
  { photo: PHOTOS.amberDroppers, title: 'Shimmer oil, ready to dress', occasion: 'In the making', note: 'Amber dropper bottles of golden shimmer oil, waiting for their labels.', product: 'shimmer-oil' },
];

export const HERO_SLIDES = WORKS.slice(0, 5);

/** Single product photos per packaging choice, keyed "<container name>" or "<slug>|<container name>". */
const PACKSHOTS: Record<string, Photo> = {
  'Aluminium jar · Black': { src: aluBlack, alt: 'Black aluminium jar with screw lid' },
  'Aluminium jar · Gold': { src: aluGold, alt: 'Gold aluminium jar with screw lid' },
  'Aluminium jar · Silver': { src: aluSilver, alt: 'Silver aluminium jar with screw lid' },
  'Plastic jar · Clear': { src: plasticClear, alt: 'Clear plastic jar with screw lid' },
  'Plastic jar · White': { src: plasticWhite, alt: 'White plastic jar with screw lid' },
  'Plastic jar · Black': { src: plasticBlack, alt: 'Black plastic jar with screw lid' },
  'lip-balm|Tube · White': { src: tubeWhite, alt: 'White lip balm tube' },
  'lip-balm|Tube · Black': { src: tubeBlack, alt: 'Black lip balm tube' },
  'Dropper bottle · Clear': { src: dropperClear, alt: 'Clear glass dropper bottle' },
  'hand-wash-gel|Bottle · Clear': { src: gelClearFilled, alt: 'Clear bottle of hand wash gel with a flip cap' },
  'Bottle · Clear': { src: flipClear, alt: 'Clear bottle with a flip cap' },
  'Bottle · Black': { src: flipBlack, alt: 'Black bottle with a flip cap' },
  'Bottle · White': { src: flipWhite, alt: 'White bottle with a flip cap' },
  'Dropper bottle · Amber': { src: dropperAmber, alt: 'Amber glass dropper bottle with a black dropper' },
};

export type LabelArea =
  | { kind: 'band'; xs: number[]; top: number[]; bot: number[] }
  | { kind: 'ellipse'; cx: number; cy: number; rx: number; ry: number };

/** Packaging photos for a product, each with the label area the owner marked on it. */
export function packshotsFor(slug: string, containers: string[]) {
  const areas = LABEL_AREAS as Record<string, LabelArea>;
  const out: { container: string; photo: Photo; area?: LabelArea }[] = [];
  for (const c of containers) {
    const ph = PACKSHOTS[`${slug}|${c}`] ?? PACKSHOTS[c];
    if (ph) out.push({ container: c, photo: ph, area: areas[`${slug}|${c}`] ?? areas[c] });
  }
  return out;
}
