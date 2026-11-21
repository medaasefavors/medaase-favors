/**
 * Medaase Favors · Admin
 * Lives inside the admin Google Sheet (Extensions → Apps Script).
 *
 * Menu "Medaase Favors":
 *   Set up the sheet (first time)  fills every tab from the live website
 *   Check for problems             lists anything that would stop publishing
 *   Publish website                saves what is in the sheet and updates the site
 *
 * The website reads what you publish through this script's web app link
 * (Deploy → Web app, Execute as: Me, Who has access: Anyone).
 */

const SITE_URL = 'https://medaasefavors.github.io/medaase-favors';
const REPO = 'medaasefavors/medaase-favors';
const PUBLISHED_FILE = 'medaase-favors-published-catalogue.json';

const TABS = {
  Settings: ['Setting', 'Value', 'What it means'],
  Products: ['Slug', 'Show on site', 'Name', 'Short name', 'Category', 'Card line', 'Description', 'One-liner', 'Why guests love it (paragraph 1)', 'Why guests love it (paragraph 2)', 'Photo (Google Drive link)', 'Photo description'],
  Sizes: ['Product slug', 'Size', 'Price per piece (GH₵)', 'Can be mounted on a card'],
  Scents: ['Product slug', 'Scent'],
  Shades: ['Product slug', 'Shade', 'Description', 'Swatch colour (hex)'],
  Packaging: ['Product slug', 'Packaging type', 'Colour', 'Lid colours (comma separated)', 'Label style', 'In stock', 'Photo (Google Drive link)'],
  Charges: ['Key', 'Name', 'Price per piece (GH₵)'],
  'Card designs': ['Name', 'Description', 'Illustration', 'Show on site'],
  'Card shapes': ['Name', 'Extra charge applies', 'Show on site'],
  Documents: ['Title', 'PDF (Google Drive link)', 'Show on site'],
};

const SETTING_NOTES = {
  email: 'Email shown on the site',
  instagram: 'Instagram link',
  instagramHandle: 'Instagram name shown on the site',
  pickupArea: 'Pickup area',
  businessHours: 'Office hours',
  pickupHours: 'Pickup hours',
  deliveryAccra: 'How delivery within Accra works',
  deliveryFeeOutsideAccra: 'Flat delivery fee outside Accra (GH₵)',
  minPerItem: 'Minimum pieces per product',
  qtyStep: 'Quantity goes up in steps of',
  turnaround: 'How long orders take after design approval',
  designRounds: 'Free rounds of design changes',
  rushRate: 'Rush fee (0.2 = 20%)',
  rushWorkingDays: 'Rush fee applies under this many working days',
  blockWorkingDays: 'Customers must email first under this many working days',
  perPieceCharge: 'Added to every piece of every product (GH₵), built into prices',
  bundleDiscount: 'Bundle discount for 2+ different products (0.05 = 5%)',
  publicHolidays: 'Public holidays, YYYY-MM-DD separated by commas (not counted as working days)',
};

const NUMBER_SETTINGS = ['deliveryFeeOutsideAccra', 'minPerItem', 'qtyStep', 'designRounds', 'rushRate', 'rushWorkingDays', 'blockWorkingDays', 'perPieceCharge', 'bundleDiscount'];
const CATEGORIES = ['butters', 'oils', 'hand-care', 'lip'];
const LABEL_STYLES = ['wrap', 'lid', 'tube'];
const ILLUSTRATIONS = ['wax-seal', 'calendar', 'ribbon', 'none'];

// ---------------------------------------------------------------------------
// Menu

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Medaase Favors')
    .addItem('Publish website', 'publishWebsite')
    .addItem('Check for problems', 'checkForProblems')
    .addSeparator()
    .addItem('Set up the sheet (first time)', 'setUpSheet')
    .addToUi();
}

// ---------------------------------------------------------------------------
// First-time setup: fill the tabs from the live website

function setUpSheet() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActive();
  const hasData = ss.getSheetByName('Products') && ss.getSheetByName('Products').getLastRow() > 1;
  if (hasData) {
    const r = ui.alert('Set up again?', 'This replaces everything in the tabs with what is on the website now. Continue?', ui.ButtonSet.YES_NO);
    if (r !== ui.Button.YES) return;
  }
  const cat = JSON.parse(UrlFetchApp.fetch(SITE_URL + '/catalogue.json').getContentText());

  const rows = {
    Settings: Object.keys(SETTING_NOTES).map((k) => [k, k in cat.settings ? cat.settings[k] : '', SETTING_NOTES[k]]),
    Products: cat.products.map((p) => [p.slug, p.show !== false, p.name, p.shortName, p.category, p.blurb, p.description, p.kicker || '', (p.why || [])[0] || '', (p.why || [])[1] || '', '', p.imageAlt || '']),
    Sizes: cat.products.flatMap((p) => p.sizes.map((s) => [p.slug, s.size, s.price, !!s.cardMount])),
    Scents: cat.products.flatMap((p) => (p.scents || []).map((s) => [p.slug, s])),
    Shades: cat.products.flatMap((p) => (p.shades || []).map((s) => [p.slug, s.name, s.note, s.swatch])),
    Packaging: cat.products.flatMap((p) => p.packaging.map((r) => [p.slug, r.type, r.colour, (r.lids || []).join(', '), r.labelStyle, r.inStock !== false, ''])),
    Charges: cat.charges.map((c) => [c.key, c.name, c.price]),
    'Card designs': cat.cardDesigns.map((d) => [d.name, d.note, d.illustration || 'none', d.show !== false]),
    'Card shapes': cat.cardShapes.map((s) => [s.name, !!s.extra, s.show !== false]),
    Documents: [],
  };

  Object.keys(TABS).forEach((name) => {
    let sh = ss.getSheetByName(name) || ss.insertSheet(name);
    sh.clear();
    sh.getRange(1, 1, sh.getMaxRows(), sh.getMaxColumns()).clearDataValidations();
    const head = TABS[name];
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#1B2A4E').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
    const data = rows[name];
    if (data.length) sh.getRange(2, 1, data.length, head.length).setValues(data);
    sh.autoResizeColumns(1, head.length);
  });

  // Tick boxes and dropdowns
  const tick = (tab, col) => ss.getSheetByName(tab).getRange(2, col, 500, 1).insertCheckboxes();
  const list = (tab, col, values) => ss.getSheetByName(tab).getRange(2, col, 500, 1)
    .setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(values, true).setAllowInvalid(false).build());
  const slugList = (tab) => ss.getSheetByName(tab).getRange(2, 1, 500, 1)
    .setDataValidation(SpreadsheetApp.newDataValidation().requireValueInRange(ss.getSheetByName('Products').getRange('A2:A200'), true).setAllowInvalid(false).build());
  tick('Products', 2); tick('Sizes', 4); tick('Packaging', 6); tick('Card designs', 4); tick('Card shapes', 2); tick('Card shapes', 3); tick('Documents', 3);
  list('Products', 5, CATEGORIES); list('Packaging', 5, LABEL_STYLES); list('Card designs', 3, ILLUSTRATIONS);
  ['Sizes', 'Scents', 'Shades', 'Packaging'].forEach(slugList);
  ['Products', 'Sizes', 'Packaging'].forEach((t) => ss.getSheetByName(t).getRange('A:A').setFontFamily('Roboto Mono'));

  const first = ss.getSheets().find((s) => !TABS[s.getName()]);
  if (first && first.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(first);
  ss.setActiveSheet(ss.getSheetByName('Products'));
  ui.alert('All set', 'Every tab now matches the website. Make your changes, then use Medaase Favors → Publish website.', ui.ButtonSet.OK);
}

// ---------------------------------------------------------------------------
// Read the sheet into the catalogue the website uses

function rowsOf(name) {
  const sh = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, TABS[name].length).getValues()
    .filter((r) => r.some((v) => v !== '' && v !== false));
}

function driveId(link) {
  const m = String(link || '').match(/[-\w]{25,}/);
  return m ? m[0] : '';
}

const text = (v) => String(v == null ? '' : v).trim();
const yes = (v) => v === true || /^(yes|true|y|1|✓)$/i.test(text(v));

function buildCatalogue() {
  const problems = [];
  const settings = {};
  rowsOf('Settings').forEach(([k, v]) => {
    const key = text(k);
    if (!key) return;
    if (NUMBER_SETTINGS.indexOf(key) >= 0) {
      const n = Number(v);
      if (v === '' || isNaN(n)) problems.push(`Settings: "${key}" must be a number.`);
      settings[key] = n;
    } else settings[key] = text(v);
  });

  const products = rowsOf('Products').map((r, i) => {
    const slug = text(r[0]).toLowerCase();
    if (!/^[a-z0-9-]+$/.test(slug)) problems.push(`Products row ${i + 2}: slug "${r[0]}" may only use lowercase letters, numbers and dashes.`);
    if (!text(r[2])) problems.push(`Products row ${i + 2}: name is empty.`);
    if (CATEGORIES.indexOf(text(r[4])) < 0) problems.push(`Products row ${i + 2}: category must be one of ${CATEGORIES.join(', ')}.`);
    return {
      slug, show: yes(r[1]), name: text(r[2]), shortName: text(r[3]) || text(r[2]), category: text(r[4]),
      blurb: text(r[5]), description: text(r[6]), kicker: text(r[7]), why: [text(r[8]), text(r[9])].filter(Boolean),
      photo: driveId(r[10]), imageAlt: text(r[11]) || text(r[2]),
      sizes: [], scents: [], shades: [], packaging: [],
    };
  });
  const bySlug = {};
  products.forEach((p) => {
    if (bySlug[p.slug]) problems.push(`Products: "${p.slug}" appears twice.`);
    bySlug[p.slug] = p;
  });
  const owner = (tab, i, slug) => {
    const p = bySlug[text(slug).toLowerCase()];
    if (!p) problems.push(`${tab} row ${i + 2}: no product with slug "${slug}".`);
    return p;
  };

  rowsOf('Sizes').forEach((r, i) => {
    const p = owner('Sizes', i, r[0]); if (!p) return;
    const price = Number(r[2]);
    if (!text(r[1])) problems.push(`Sizes row ${i + 2}: size is empty.`);
    if (r[2] === '' || isNaN(price) || price < 0) problems.push(`Sizes row ${i + 2}: price must be a number.`);
    p.sizes.push({ size: text(r[1]), price, cardMount: yes(r[3]) });
  });
  rowsOf('Scents').forEach((r, i) => { const p = owner('Scents', i, r[0]); if (p && text(r[1])) p.scents.push(text(r[1])); });
  rowsOf('Shades').forEach((r, i) => {
    const p = owner('Shades', i, r[0]); if (!p) return;
    const hex = text(r[3]).toUpperCase();
    if (hex && !/^#[0-9A-F]{6}$/.test(hex)) problems.push(`Shades row ${i + 2}: swatch colour must look like #D7A861.`);
    p.shades.push({ name: text(r[1]), note: text(r[2]), swatch: hex || '#EEEEEE' });
  });
  rowsOf('Packaging').forEach((r, i) => {
    const p = owner('Packaging', i, r[0]); if (!p) return;
    if (!text(r[1]) || !text(r[2])) problems.push(`Packaging row ${i + 2}: packaging type and colour are both needed.`);
    const style = text(r[4]) || 'wrap';
    if (LABEL_STYLES.indexOf(style) < 0) problems.push(`Packaging row ${i + 2}: label style must be wrap, lid or tube.`);
    p.packaging.push({
      type: text(r[1]), colour: text(r[2]),
      lids: text(r[3]) ? text(r[3]).split(',').map((s) => s.trim()).filter(Boolean) : [],
      labelStyle: style, inStock: yes(r[5]), photo: driveId(r[6]),
    });
  });

  products.forEach((p) => {
    if (!p.show) return;
    if (!p.sizes.length) problems.push(`"${p.name}" is shown on the site but has no sizes.`);
    if (!p.packaging.length) problems.push(`"${p.name}" is shown on the site but has no packaging.`);
    if (p.packaging.length && !p.packaging.some((x) => x.inStock)) problems.push(`"${p.name}": every packaging option is out of stock.`);
  });

  const charges = rowsOf('Charges').map((r, i) => {
    const price = Number(r[2]);
    if (r[2] === '' || isNaN(price)) problems.push(`Charges row ${i + 2}: price must be a number.`);
    return { key: text(r[0]), name: text(r[1]), price };
  });
  ['label', 'bag', 'card', 'shape', 'tag'].forEach((k) => {
    if (!charges.some((c) => c.key === k)) problems.push(`Charges: the "${k}" row is missing.`);
  });
  const cardDesigns = rowsOf('Card designs').map((r) => ({ name: text(r[0]), note: text(r[1]), illustration: text(r[2]) || 'none', show: yes(r[3]) }));
  const cardShapes = rowsOf('Card shapes').map((r) => ({ name: text(r[0]), extra: yes(r[1]), show: yes(r[2]) }));
  const documents = rowsOf('Documents').map((r, i) => {
    const id = driveId(r[1]);
    if (!id) problems.push(`Documents row ${i + 2}: paste a Google Drive link to the PDF.`);
    return { title: text(r[0]), file: id, show: yes(r[2]) };
  });

  return {
    problems,
    catalogue: { version: 1, publishedAt: new Date().toISOString(), settings, charges, cardDesigns, cardShapes, products, documents },
  };
}

function checkForProblems() {
  const { problems } = buildCatalogue();
  const ui = SpreadsheetApp.getUi();
  if (!problems.length) ui.alert('No problems found', 'Everything is ready to publish.', ui.ButtonSet.OK);
  else ui.alert('Please fix these first', problems.slice(0, 25).join('\n'), ui.ButtonSet.OK);
}

// ---------------------------------------------------------------------------
// Publish

function publishedFile() {
  const it = DriveApp.getFilesByName(PUBLISHED_FILE);
  return it.hasNext() ? it.next() : null;
}

function publishWebsite() {
  const ui = SpreadsheetApp.getUi();
  const { problems, catalogue } = buildCatalogue();
  if (problems.length) {
    ui.alert('Not published yet. Please fix these first', problems.slice(0, 25).join('\n'), ui.ButtonSet.OK);
    return;
  }
  // Photos and PDFs must be files this account can open
  const ids = [];
  catalogue.products.forEach((p) => { if (p.photo) ids.push(p.photo); p.packaging.forEach((r) => r.photo && ids.push(r.photo)); });
  catalogue.documents.forEach((d) => d.file && ids.push(d.file));
  const missing = ids.filter((id) => { try { DriveApp.getFileById(id); return false; } catch (e) { return true; } });
  if (missing.length) {
    ui.alert('Not published yet', 'These Drive links could not be opened:\n' + missing.join('\n'), ui.ButtonSet.OK);
    return;
  }

  const json = JSON.stringify(catalogue);
  const f = publishedFile();
  if (f) f.setContent(json); else DriveApp.createFile(PUBLISHED_FILE, json, MimeType.PLAIN_TEXT);

  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  let msg = 'Saved. The website picks up your changes within 30 minutes.';
  if (token) {
    const res = UrlFetchApp.fetch(`https://api.github.com/repos/${REPO}/actions/workflows/deploy.yml/dispatches`, {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' },
      payload: JSON.stringify({ ref: 'main' }),
    });
    msg = res.getResponseCode() === 204
      ? 'Published. The website will show your changes in about 2 minutes.'
      : 'Saved, but the instant update did not start (' + res.getResponseCode() + '). The website will still update within 30 minutes.';
  }
  SpreadsheetApp.getActive().toast(msg, 'Medaase Favors', 10);
  ui.alert('Publish website', msg, ui.ButtonSet.OK);
}

// ---------------------------------------------------------------------------
// Web app: the website reads the published catalogue and its files from here

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'catalogue';
  const f = publishedFile();
  if (!f) return json_({ error: 'Nothing published yet' });
  const cat = JSON.parse(f.getBlob().getDataAsString());
  if (action === 'catalogue') return json_(cat);
  if (action === 'file') {
    const id = e.parameter.id;
    // Only files that are part of the published catalogue can be read
    const allowed = [];
    cat.products.forEach((p) => { if (p.photo) allowed.push(p.photo); p.packaging.forEach((r) => r.photo && allowed.push(r.photo)); });
    cat.documents.forEach((d) => d.file && allowed.push(d.file));
    if (allowed.indexOf(id) < 0) return json_({ error: 'Not part of the published catalogue' });
    const file = DriveApp.getFileById(id);
    const blob = file.getBlob();
    return json_({ name: file.getName(), mimeType: blob.getContentType(), data: Utilities.base64Encode(blob.getBytes()) });
  }
  return json_({ error: 'Unknown action' });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
