// "Bundle it with" panel: shown after Add to order. Offers every other product,
// set up like the line just added (same quantity, label, presentation, tag),
// with size, shade and scent editable inline and the 5% saving shown live.
import { PRODUCTS, BUNDLE_DISCOUNT, containerName, startsFrom, sizesOf, getProduct } from '../data/products';
import { loadCart, saveCart, newId, unitPrice, cartTotals, getLogo, saveLogo, type CartLine } from './cart';
import { cedi } from './format';

function defaultContainer(slug: string) {
  const p = getProduct(slug)!;
  for (const pk of p.packaging) {
    const colour = pk.colours.find((c) => !(pk.outOfStock ?? []).includes(c));
    if (colour) return { container: containerName(pk, colour), lid: pk.lids[0] };
  }
  return null;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, text?: string) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (text !== undefined) e.textContent = text;
  return e;
}

function select(name: string, label: string, options: string[], value?: string) {
  const wrap = el('label', { class: 'bp__field' }, label);
  const s = el('select', { name });
  options.forEach((o) => {
    const opt = el('option', { value: o }, o);
    if (o === value) opt.selected = true;
    s.appendChild(opt);
  });
  wrap.appendChild(s);
  return wrap;
}

export function openBundlePanel(root: HTMLElement, base: CartLine, preselect: { slug: string; size: string }[] = []) {
  const inCart = new Set(loadCart().map((l) => l.slug));
  const candidates = PRODUCTS.filter((p) => !inCart.has(p.slug) && defaultContainer(p.slug));
  if (!candidates.length) return;

  root.replaceChildren();
  root.hidden = false;
  const head = el('div', { class: 'bp__head' });
  head.append(el('h2', { class: 'bp__title' }, `Bundle it and save ${Math.round(BUNDLE_DISCOUNT * 100)}% on your whole order`));
  head.append(el('p', { class: 'bp__sub' }, `Each one comes with the same quantity (${base.qty}), label and presentation as your ${getProduct(base.slug)!.shortName}. Change the size or scent below.`));
  root.append(head);

  const list = el('ul', { class: 'bp__list' });
  candidates.forEach((p) => {
    const pre = preselect.find((x) => x.slug === p.slug);
    const li = el('li', { class: 'bp__item', 'data-slug': p.slug });
    const top = el('label', { class: 'bp__pick' });
    const cb = el('input', { type: 'checkbox', name: 'pick' }) as HTMLInputElement;
    cb.checked = !!pre;
    const name = el('span', { class: 'bp__name' });
    name.append(el('strong', {}, p.name), el('small', {}, `Starts from ${cedi(startsFrom(p.slug))}`));
    top.append(cb, name);
    li.append(top);
    const opts = el('div', { class: 'bp__opts' });
    opts.append(select('size', 'Size', sizesOf(p.slug).map((s) => s.size), pre?.size));
    if (p.shades?.length) opts.append(select('shade', 'Shade', p.shades.map((s) => s.name)));
    if (p.scents.length) opts.append(select('scent', 'Scent', p.scents));
    opts.hidden = !cb.checked;
    li.append(opts);
    list.append(li);
  });
  root.append(list);

  const saving = el('p', { class: 'bp__saving', 'aria-live': 'polite' });
  const actions = el('div', { class: 'btn-row' });
  const add = el('button', { type: 'button', class: 'btn' }, 'Add to my order');
  const skip = el('button', { type: 'button', class: 'btn btn--ghost' }, 'No thanks');
  actions.append(add, skip);
  root.append(saving, actions);

  function linesFromPanel(): CartLine[] {
    return Array.from(list.querySelectorAll<HTMLLIElement>('.bp__item')).flatMap((li) => {
      if (!li.querySelector<HTMLInputElement>('input[name="pick"]')!.checked) return [];
      const slug = li.dataset.slug!;
      const p = getProduct(slug)!;
      const get = (n: string) => li.querySelector<HTMLSelectElement>(`select[name="${n}"]`)?.value;
      const size = get('size')!;
      const pack = defaultContainer(slug)!;
      const card = base.card && p.cardMountSizes.includes(size);
      return [{
        ...base,
        id: newId(),
        slug,
        size,
        shade: get('shade'),
        scent: get('scent'),
        container: pack.container,
        lid: pack.lid,
        card,
        cardShape: card ? base.cardShape : undefined,
        cardDesign: card ? base.cardDesign : undefined,
      }];
    });
  }

  function update() {
    list.querySelectorAll<HTMLLIElement>('.bp__item').forEach((li) => {
      li.querySelector<HTMLElement>('.bp__opts')!.hidden = !li.querySelector<HTMLInputElement>('input[name="pick"]')!.checked;
    });
    const extra = linesFromPanel();
    const before = cartTotals(loadCart());
    const after = cartTotals([...loadCart(), ...extra]);
    add.toggleAttribute('disabled', extra.length === 0);
    if (!extra.length) saving.textContent = 'Tick a product to add it.';
    else saving.textContent = after.discount > 0
      ? `Adds ${cedi(after.subtotal - before.subtotal)}. You save ${cedi(after.discount)} on your whole order.`
      : `Adds ${cedi(after.subtotal - before.subtotal)}.`;
  }
  root.addEventListener('change', update);
  update();

  add.addEventListener('click', async () => {
    const extra = linesFromPanel();
    if (!extra.length) return;
    // Bundled items share the same logo
    if (base.logoName) {
      const blob = await getLogo(base.id);
      if (blob) await Promise.all(extra.map((l) => saveLogo(l.id, blob)));
    }
    saveCart([...loadCart(), ...extra]);
    const t = cartTotals(loadCart());
    root.replaceChildren(
      el('p', { class: 'bp__done' }, `Bundled! ${extra.length} more product${extra.length > 1 ? 's' : ''} added.${t.discount ? ` You're saving ${cedi(t.discount)}.` : ''}`),
    );
  });
  skip.addEventListener('click', () => {
    root.hidden = true;
  });
  root.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
