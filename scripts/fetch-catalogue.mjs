// Pulls the latest published catalogue (and its photos and PDFs) from the admin
// Google Sheet before the site is built. If anything fails, the committed
// catalogue is used, so a hiccup never takes the site down.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const path = (p) => new URL(p, root);
const admin = JSON.parse(await readFile(path('src/data/admin.json'), 'utf8'));
const api = process.env.ADMIN_API_URL || admin.apiUrl;

if (!api) {
  console.log('[catalogue] No admin link set yet; using the committed catalogue.');
  process.exit(0);
}

async function getJson(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

const extFor = (mime, name) => {
  const m = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf' }[mime];
  return m || (name.split('.').pop() || 'bin').toLowerCase();
};
const safe = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'file';

try {
  const cat = await getJson(`${api}?action=catalogue`);
  if (!cat || !Array.isArray(cat.products) || cat.products.length === 0) throw new Error('catalogue has no products');

  // Fresh copies of published files every build
  await rm(path('src/assets/cms'), { recursive: true, force: true });
  await rm(path('public/docs'), { recursive: true, force: true });
  await mkdir(path('src/assets/cms'), { recursive: true });
  await mkdir(path('public/docs'), { recursive: true });

  async function download(id, folder, base) {
    const f = await getJson(`${api}?action=file&id=${encodeURIComponent(id)}`);
    if (!f || !f.data) throw new Error(`file ${id} not available`);
    const name = `${base}.${extFor(f.mimeType, f.name || '')}`;
    await writeFile(path(`${folder}/${name}`), Buffer.from(f.data, 'base64'));
    return name;
  }

  for (const p of cat.products) {
    if (p.photo) p.photo = await download(p.photo, 'src/assets/cms', `product-${safe(p.slug)}`).catch((e) => (console.warn('[catalogue]', e.message), ''));
    for (const row of p.packaging || []) {
      if (row.photo) row.photo = await download(row.photo, 'src/assets/cms', `pack-${safe(p.slug)}-${safe(row.type)}-${safe(row.colour)}`).catch((e) => (console.warn('[catalogue]', e.message), ''));
    }
  }
  for (const d of cat.documents || []) {
    if (d.file) d.file = await download(d.file, 'public/docs', safe(d.title)).catch((e) => (console.warn('[catalogue]', e.message), ''));
  }

  await writeFile(path('src/data/catalogue.json'), JSON.stringify(cat, null, 1));
  console.log(`[catalogue] Using the catalogue published ${cat.publishedAt || '(no date)'} with ${cat.products.length} products.`);
} catch (e) {
  console.warn(`[catalogue] Could not load the published catalogue (${e.message}); using the committed one.`);
  if (!existsSync(path('src/data/catalogue.json'))) process.exit(1);
}
