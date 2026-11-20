// Real product photos. Astro converts these to WebP at build time and strips metadata.
import type { ImageMetadata } from 'astro';
import amberDroppers from '../assets/photos/amber-dropper-bottles-shimmer-oil.jpg';
import sheaTubs from '../assets/photos/pure-shea-butter-black-tubs.jpg';

export interface Photo { src: ImageMetadata; alt: string }

export const PHOTOS = {
  amberDroppers: {
    src: amberDroppers,
    alt: 'Amber glass dropper bottles of shimmer oil with black droppers, packed in a box and ready for labelling',
  },
  sheaTubs: {
    src: sheaTubs,
    alt: 'Freshly filled tubs of 100% pure African shea butter in black jars, seen from above',
  },
} satisfies Record<string, Photo>;

/** Main photo per product. Products without one show the brand placeholder until photos arrive. */
export const PRODUCT_PHOTOS: Partial<Record<string, Photo>> = {
  'shimmer-oil': PHOTOS.amberDroppers,
  'pure-african-shea-butter': PHOTOS.sheaTubs,
};
