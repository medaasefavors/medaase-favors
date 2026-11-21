/**
 * Medaase Favors · Orders
 * Same Apps Script project as Admin.gs. The website posts to the web app link:
 *   upload  a customer's logo  → saved in Drive: Medaase Favors / Logos / <reference>
 *   order   the order details  → priced here from the published catalogue, saved to Orders + Lines
 *   verify  after Paystack     → payment checked with Paystack, order marked Paid, emails sent
 *
 * Script properties (Project Settings → Script properties):
 *   PAYSTACK_SECRET_KEY  sk_test_... first, then sk_live_...
 *   OWNER_EMAIL          where new-order alerts go
 *   DRIVE_FOLDER_ID      optional: folder for logos (default: a "Medaase Favors" folder in My Drive)
 */

const ORDER_HEAD = ['Reference', 'Created', 'Status', 'Customer', 'Phone', 'Email', 'Event type', 'Event date', 'Delivery', 'Address', 'Notes', 'Items', 'Subtotal', 'Bundle discount', 'Rush fee', 'Delivery fee', 'Total', 'Amount paid', 'Paystack reference', 'Paid at', 'Logo links'];
const LINE_HEAD = ['Reference', 'Product', 'Size', 'Shade', 'Scent', 'Packaging', 'Lid', 'Label', 'Front text', 'Logo link', 'Date on label', 'Theme colours', 'Presentation', 'Card design', 'Card shape', 'Thank-you tag', 'Qty', 'Unit (GH₵)', 'Line total (GH₵)', 'Line ID'];
const MAX_LOGO_BYTES = 5 * 1024 * 1024;

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'Bad request' }); }
  try {
    if (body.action === 'upload') return json_(uploadLogo_(body));
    if (body.action === 'order') return json_(createOrder_(body));
    if (body.action === 'verify') return json_(verifyPayment_(body));
    return json_({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

// ---------------------------------------------------------------------------
// Helpers shared with the website's pricing (src/lib/cart.ts)

const round2_ = (n) => Math.round(n * 100) / 100;
const prop_ = (k) => PropertiesService.getScriptProperties().getProperty(k);
const validRef_ = (r) => /^MF\d{7,}$/.test(String(r || ''));

/** Next order number: MF2026001, MF2026002 … starting again at 001 each year. Call inside the script lock. */
function nextRef_() {
  const year = Utilities.formatDate(new Date(), 'Africa/Accra', 'yyyy');
  const props = PropertiesService.getScriptProperties();
  const key = 'ORDER_COUNT_' + year;
  const n = Number(props.getProperty(key) || 0) + 1;
  props.setProperty(key, String(n));
  return 'MF' + year + String(n).padStart(3, '0');
}

function catalogue_() {
  const f = publishedFile();
  if (!f) throw new Error('The shop is not published yet');
  return JSON.parse(f.getBlob().getDataAsString());
}

function holidays_(cat) {
  return String(cat.settings.publicHolidays || '').split(',').map((s) => s.trim()).filter((s) => /^\d{4}-\d{2}-\d{2}$/.test(s));
}

function workingDaysUntil_(eventIso, fromIso, holidays) {
  const p = (s) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
  let n = 0;
  for (let t = p(fromIso) + 864e5; t < p(eventIso); t += 864e5) {
    const d = new Date(t);
    const day = d.getUTCDay();
    if (day !== 0 && day !== 6 && holidays.indexOf(d.toISOString().slice(0, 10)) < 0) n++;
  }
  return n;
}

function charge_(cat, key) {
  const c = cat.charges.filter((x) => x.key === key)[0];
  return c ? Number(c.price) : 0;
}

/** Price one line from the published catalogue and check every choice is real and available. */
function priceLine_(cat, l) {
  const p = cat.products.filter((x) => x.slug === l.slug && x.show !== false)[0];
  if (!p) throw new Error('Unknown product: ' + l.slug);
  const size = p.sizes.filter((s) => s.size === l.size)[0];
  if (!size) throw new Error(p.name + ': unknown size ' + l.size);
  const pack = p.packaging.filter((r) => r.type + ' · ' + r.colour === l.container)[0];
  if (!pack) throw new Error(p.name + ': unknown packaging ' + l.container);
  if (pack.inStock === false) throw new Error(l.container + ' is out of stock');
  const min = Number(cat.settings.minPerItem), step = Number(cat.settings.qtyStep);
  const qty = Number(l.qty);
  if (!(qty >= min) || qty % step !== 0) throw new Error(p.name + ': quantity must be at least ' + min + ', in steps of ' + step);
  if (l.card && !size.cardMount) throw new Error(p.name + ' ' + l.size + ' cannot be mounted on a card');
  let unit = Number(size.price) + Number(cat.settings.perPieceCharge || 0);
  if (l.label) unit += charge_(cat, 'label');
  if (l.bag) unit += charge_(cat, 'bag');
  if (l.card) unit += charge_(cat, 'card') + (l.cardShape === 'Custom shape' ? charge_(cat, 'shape') : 0);
  if (l.tag) unit += charge_(cat, 'tag');
  unit = round2_(unit);
  return { product: p, unit: unit, total: round2_(unit * qty) };
}

/** Mirrors orderTotals in src/lib/cart.ts. */
function orderTotals_(cat, lines, eventDate, delivery, fromIso) {
  const priced = lines.map((l) => priceLine_(cat, l));
  const subtotal = round2_(priced.reduce((t, x) => t + x.total, 0));
  const distinct = lines.map((l) => l.slug).filter((s, i, a) => a.indexOf(s) === i).length;
  const discount = distinct >= 2 ? round2_(subtotal * Number(cat.settings.bundleDiscount)) : 0;
  const wd = eventDate ? workingDaysUntil_(eventDate, fromIso, holidays_(cat)) : Infinity;
  const blocked = wd < Number(cat.settings.blockWorkingDays);
  const rush = !blocked && wd < Number(cat.settings.rushWorkingDays) ? round2_((subtotal - discount) * Number(cat.settings.rushRate)) : 0;
  const deliveryFee = delivery === 'outside' ? Number(cat.settings.deliveryFeeOutsideAccra) : 0;
  return { priced: priced, subtotal: subtotal, discount: discount, rush: rush, deliveryFee: deliveryFee, total: round2_(subtotal - discount + rush + deliveryFee), blocked: blocked };
}

// ---------------------------------------------------------------------------
// Sheets and folders

function tab_(name, head) {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#1B2A4E').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
  }
  const have = sh.getRange(1, 1, 1, head.length).getValues()[0];
  if (have.join('|') !== head.join('|')) sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#1B2A4E').setFontColor('#FFFFFF');
  return sh;
}

function findOrderRow_(ref) {
  const sh = tab_('Orders', ORDER_HEAD);
  const refs = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map((r) => r[0]) : [];
  const i = refs.indexOf(ref);
  return i < 0 ? null : { sh: sh, row: i + 2 };
}

function folder_(path) {
  const id = prop_('DRIVE_FOLDER_ID');
  let f = id ? DriveApp.getFolderById(id) : null;
  if (!f) {
    const it = DriveApp.getFoldersByName('Medaase Favors');
    f = it.hasNext() ? it.next() : DriveApp.createFolder('Medaase Favors');
  }
  path.forEach((name) => {
    const it = f.getFoldersByName(name);
    f = it.hasNext() ? it.next() : f.createFolder(name);
  });
  return f;
}

// ---------------------------------------------------------------------------
// Actions

function uploadLogo_(b) {
  if (!validRef_(b.ref)) throw new Error('Bad reference');
  const bytes = Utilities.base64Decode(String(b.data || ''));
  if (!bytes.length || bytes.length > MAX_LOGO_BYTES) throw new Error('Logo must be under 5 MB');
  const type = String(b.mimeType || '');
  if (['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'].indexOf(type) < 0) throw new Error('Logo must be PNG, JPG, SVG or PDF');
  const name = String(b.name || 'logo').replace(/[^\w.\- ]+/g, '_').slice(0, 80);
  const found = findOrderRow_(b.ref);
  if (!found) throw new Error('Order not found');
  const file = folder_(['Logos', b.ref]).createFile(Utilities.newBlob(bytes, type, name));
  const url = file.getUrl();
  // Put the link on the matching line and on the order
  const lines = tab_('Lines', LINE_HEAD);
  if (lines.getLastRow() > 1) {
    const vals = lines.getRange(2, 1, lines.getLastRow() - 1, LINE_HEAD.length).getValues();
    vals.forEach((r, i) => {
      if (r[0] === b.ref && r[LINE_HEAD.indexOf('Line ID')] === b.lineId) lines.getRange(i + 2, LINE_HEAD.indexOf('Logo link') + 1).setValue(url);
    });
  }
  const cell = found.sh.getRange(found.row, ORDER_HEAD.indexOf('Logo links') + 1);
  cell.setValue([cell.getValue(), url].filter(String).join('\n'));
  return { ok: true, url: url };
}

function createOrder_(b) {
  const c = b.customer || {}, ev = b.event || {}, del = b.delivery || {};
  if (!String(c.name || '').trim()) throw new Error('Name is missing');
  if (!/^\S+@\S+\.\S+$/.test(String(c.email || ''))) throw new Error('Email is not valid');
  if (!/^\+233\d{9}$/.test(String(c.phone || ''))) throw new Error('Phone number is not valid');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(ev.date || ''))) throw new Error('Event date is missing');
  if (['pickup', 'accra', 'outside'].indexOf(del.method) < 0) throw new Error('Choose a delivery option');
  if (!Array.isArray(b.lines) || !b.lines.length) throw new Error('The order is empty');

  const cat = catalogue_();
  const today = Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd');
  const t = orderTotals_(cat, b.lines, ev.date, del.method, today);
  if (t.blocked) throw new Error('Your event is too soon to order online. Please email us first.');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let ref;
  try {
    ref = nextRef_();
    b.ref = ref;
    const items = b.lines.map((l, i) => t.priced[i].product.name + ' × ' + l.qty).join(', ');
    tab_('Orders', ORDER_HEAD).appendRow([
      b.ref, new Date(), 'Pending payment', String(c.name).trim(), c.phone, c.email, ev.type || '', ev.date,
      { pickup: 'Pickup', accra: 'Accra (Yango or Uber)', outside: 'Outside Accra' }[del.method], del.address || '', b.notes || '',
      items, t.subtotal, t.discount, t.rush, t.deliveryFee, t.total, '', '', '',
      '',
    ]);
    const lines = tab_('Lines', LINE_HEAD);
    b.lines.forEach((l, i) => {
      const pres = l.card ? 'Card' : l.bag ? 'Organza bag' : 'On its own';
      lines.appendRow([
        b.ref, t.priced[i].product.name, l.size, l.shade || '', l.scent || '', l.container, l.lid || '',
        l.label ? 'Yes' : 'No', l.frontText || '', l.logoName ? '(uploading…)' : '', l.eventDate || '', (l.themeColours || []).join(', '),
        pres, l.cardDesign || '', l.cardShape || '', l.tag ? 'Yes' : 'No', l.qty, t.priced[i].unit, t.priced[i].total, String(l.id || ''),
      ]);
    });
  } finally {
    lock.releaseLock();
  }
  return { ok: true, ref: ref, total: t.total, amount: Math.round(t.total * 100), currency: 'GHS' };
}

function verifyPayment_(b) {
  if (!validRef_(b.ref)) throw new Error('Bad reference');
  const found = findOrderRow_(b.ref);
  if (!found) throw new Error('Order not found');
  const sh = found.sh, row = found.row;
  const get = (col) => sh.getRange(row, ORDER_HEAD.indexOf(col) + 1).getValue();
  const set = (col, v) => sh.getRange(row, ORDER_HEAD.indexOf(col) + 1).setValue(v);
  if (get('Status') === 'Paid') return { ok: true, ref: b.ref, already: true };

  const secret = prop_('PAYSTACK_SECRET_KEY');
  if (!secret) throw new Error('Payments are not switched on yet');
  const res = UrlFetchApp.fetch('https://api.paystack.co/transaction/verify/' + encodeURIComponent(b.ref), {
    headers: { Authorization: 'Bearer ' + secret }, muteHttpExceptions: true,
  });
  const data = JSON.parse(res.getContentText());
  const tx = data && data.data;
  const expected = Math.round(Number(get('Total')) * 100);
  if (!tx || tx.status !== 'success') throw new Error('Payment not completed');
  if (tx.currency !== 'GHS' || Number(tx.amount) !== expected) throw new Error('Payment amount does not match the order');

  set('Status', 'Paid');
  set('Amount paid', tx.amount / 100);
  set('Paystack reference', tx.reference);
  set('Paid at', new Date());
  try { sendOrderEmails_(b.ref); } catch (err) { /* the order stays Paid even if email fails */ }
  return { ok: true, ref: b.ref };
}

// ---------------------------------------------------------------------------
// Emails

function sendOrderEmails_(ref) {
  const found = findOrderRow_(ref);
  const vals = found.sh.getRange(found.row, 1, 1, ORDER_HEAD.length).getValues()[0];
  const o = {};
  ORDER_HEAD.forEach((h, i) => (o[h] = vals[i]));
  const lines = tab_('Lines', LINE_HEAD);
  const rows = lines.getLastRow() > 1 ? lines.getRange(2, 1, lines.getLastRow() - 1, LINE_HEAD.length).getValues().filter((r) => r[0] === ref) : [];
  const cat = catalogue_();
  const money = (n) => 'GH₵ ' + Number(n).toLocaleString('en-GH', { minimumFractionDigits: Number(n) % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const itemRows = rows.map((r) => `<tr><td style="padding:8px 0;border-bottom:1px solid #EEF1F8">${esc(r[1])} · ${esc(r[2])}<br><span style="color:#4A5675;font-size:13px">${esc([r[5], r[7] === 'Yes' ? 'Label: ' + (r[8] || 'logo') : 'No label', r[12]].join(' · '))}</span></td><td style="padding:8px 0;border-bottom:1px solid #EEF1F8;text-align:right;white-space:nowrap">${r[16]} × ${money(r[17])}</td></tr>`).join('');
  const totalsRows = [['Subtotal', o['Subtotal']], o['Bundle discount'] ? ['Bundle saving', -o['Bundle discount']] : null, o['Rush fee'] ? ['Rush fee', o['Rush fee']] : null, o['Delivery fee'] ? ['Delivery', o['Delivery fee']] : null]
    .filter(Boolean).map((x) => `<tr><td style="padding:4px 0;color:#4A5675">${x[0]}</td><td style="text-align:right">${money(x[1])}</td></tr>`).join('');
  const shell = (title, inner) => `<div style="background:#EEF1F8;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1B2A4E"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><div style="background:#1B2A4E;padding:20px 24px;color:#fff;font-size:20px;font-weight:bold">Medaase <span style="color:#FFB8D1">Favors</span></div><div style="padding:24px"><h1 style="font-size:22px;margin:0 0 12px">${title}</h1>${inner}</div></div></div>`;
  const summary = `<table style="width:100%;border-collapse:collapse;font-size:15px">${itemRows}</table><table style="width:100%;margin-top:12px;font-size:15px">${totalsRows}<tr><td style="padding-top:8px;font-weight:bold">Total paid</td><td style="padding-top:8px;text-align:right;font-weight:bold">${money(o['Total'])}</td></tr></table>`;

  const first = String(o['Customer']).split(' ')[0];
  MailApp.sendEmail({
    to: o['Email'],
    subject: 'Medaase! Your Medaase Favors order ' + ref,
    name: 'Medaase Favors',
    replyTo: cat.settings.email || prop_('OWNER_EMAIL') || '',
    htmlBody: shell('Thank you, ' + esc(first) + '!', `<p>Your order <strong>${ref}</strong> is confirmed and paid.</p>${summary}<h2 style="font-size:17px;margin:24px 0 8px">What happens next</h2><ol style="padding-left:18px;margin:0"><li>Within 24 hours we email you two label designs to choose from.</li><li>You get one round of changes for free.</li><li>Your favours are ready ${esc(cat.settings.turnaround || '5 to 7 working days')} after you approve.</li></ol><p style="margin-top:20px">Questions? Just reply to this email.</p>`),
  });

  const owner = prop_('OWNER_EMAIL');
  if (owner) {
    MailApp.sendEmail({
      to: owner,
      subject: 'New paid order ' + ref + ' · ' + money(o['Total']),
      name: 'Medaase Favors website',
      htmlBody: shell('New paid order', `<p><strong>${ref}</strong><br>${esc(o['Customer'])} · ${esc(o['Phone'])} · ${esc(o['Email'])}<br>${esc(o['Event type'])} on ${esc(o['Event date'])}<br>Delivery: ${esc(o['Delivery'])}${o['Address'] ? ' · ' + esc(o['Address']) : ''}${o['Notes'] ? '<br>Notes: ' + esc(o['Notes']) : ''}</p>${summary}<p>Full details are in the Orders and Lines tabs.</p>`),
    });
  }
}
