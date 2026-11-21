// Real photos of Medaase Favors work. Astro converts these to AVIF/WebP at build
// time; metadata (including location) was stripped before they were added.
import type { ImageMetadata } from 'astro';
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
  'shimmer-oil|Bottle · Clear': { src: dropperClear, alt: 'Clear glass dropper bottle with black dropper' },
};

export function packshotsFor(slug: string, containers: string[]) {
  const out: { container: string; photo: Photo }[] = [];
  for (const c of containers) {
    const ph = PACKSHOTS[`${slug}|${c}`] ?? PACKSHOTS[c];
    if (ph) out.push({ container: c, photo: ph });
  }
  return out;
}
