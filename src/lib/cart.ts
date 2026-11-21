// Order (cart) state, pricing and storage. Runs in the browser only.
// Lines live in localStorage; uploaded logos live in IndexedDB (too big for localStorage).
import { PRICES, ADD_ONS, BUNDLE_DISCOUNT, PER_PIECE_CHARGE, type Slug } from '../data/products';

export interface LineOptions {
  size: string;
  scent?: string;
  container: string;
  lid?: string;
  label: boolean;
  front?: 'text' | 'logo';
  frontText?: string;
  logoName?: string; // file name; the file itself is in IndexedDB under the line id
  eventDate?: string; // YYYY-MM-DD
  themeColours?: string[]; // up to 3 hex codes, e.g. #1B2A4E
  bag: boolean; // organza bag
  card: boolean;
  cardShape?: string;
  cardDesign?: string;
  tag: boolean;
}

export interface CartLine extends LineOptions {
  id: string;
  slug: Slug;
  qty: number;
}

const KEY = 'mf-cart';

export function unitPrice(slug: Slug, o: LineOptions) {
  const sizes = PRICES[slug] as Record<string, number>;
  let u = (sizes[o.size] ?? Math.min(...Object.values(sizes))) + PER_PIECE_CHARGE;
  if (o.label) u += ADD_ONS.label;
  if (o.bag) u += ADD_ONS.bag;
  if (o.card) u += ADD_ONS.card + (o.cardShape === 'Custom shape' ? ADD_ONS.shape : 0);
  if (o.tag) u += ADD_ONS.tag;
  return Math.round(u * 100) / 100;
}

export function lineTotal(l: CartLine) {
  return Math.round(unitPrice(l.slug, l) * l.qty * 100) / 100;
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((t, l) => t + lineTotal(l), 0);
  const distinct = new Set(lines.map((l) => l.slug)).size;
  const discount = distinct >= 2 ? Math.round(subtotal * BUNDLE_DISCOUNT * 100) / 100 : 0;
  return { subtotal, discount, total: subtotal - discount, distinct };
}

/** "12.12.2026" from "2026-12-12". */
export function labelDate(iso?: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return d && m && y ? `${d}.${m}.${y}` : '';
}

export function labelSummary(l: LineOptions) {
  if (!l.label) return 'No label';
  const front = l.front === 'logo' ? 'logo' : l.frontText || '';
  return `Label: ${[front, labelDate(l.eventDate)].filter(Boolean).join(' · ')}`;
}

export function loadCart(): CartLine[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function saveCart(lines: CartLine[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable: the order lasts for this page only */
  }
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
    el.textContent = String(lines.length);
    el.hidden = lines.length === 0;
  });
  window.dispatchEvent(new CustomEvent('mf:cart', { detail: lines }));
}

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ---- logo files in IndexedDB ------------------------------------------------

function db(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('mf', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('logos');
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveLogo(id: string, file: Blob) {
  try {
    const d = await db();
    await new Promise<void>((res, rej) => {
      const tx = d.transaction('logos', 'readwrite');
      tx.objectStore('logos').put(file, id);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
    return true;
  } catch {
    return false;
  }
}

export async function getLogo(id: string): Promise<Blob | undefined> {
  try {
    const d = await db();
    return await new Promise((res) => {
      const r = d.transaction('logos').objectStore('logos').get(id);
      r.onsuccess = () => res(r.result as Blob | undefined);
      r.onerror = () => res(undefined);
    });
  } catch {
    return undefined;
  }
}

export async function deleteLogo(id: string) {
  try {
    const d = await db();
    d.transaction('logos', 'readwrite').objectStore('logos').delete(id);
  } catch {
    /* ignore */
  }
}
