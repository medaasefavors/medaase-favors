# Medaase Favors: Website Blueprint

**For:** Claude Code
**Owner:** Medaase Favors
**Status:** Approved for build. Prices are final (§4.1). Items marked **TBD** need input from the owner; build with the placeholder shown and keep every TBD value in one config file so it can be changed without touching components.

---

## 0. Read this first

You are building the website for **Medaase Favors**, a new business in Accra, Ghana that sells custom skincare souvenirs ("favours") for events: weddings, funerals, naming ceremonies, birthdays, church events and corporate gifts. Customers choose products, customise labels with names or a logo and the event date, bundle products together, and pay the full amount upfront online with Paystack.

Three goals, in this order:

1. **Found without effort.** Google and AI assistants (ChatGPT, Gemini, Perplexity, Claude) should understand the business and recommend it. Every page must be fully readable as plain HTML before any JavaScript runs.
2. **Feels premium and alive.** A 3D, animated experience: floating 3D products, giant layered typography, moving shader gradients, liquid glass panels, a liquid metal logo and a cinematic scroll story. The owner explicitly rejected a flat, plain site.
3. **Easy to order.** Clear "Starts from" prices, a live product customiser, bundles with a discount, and a fast checkout on mobile data.

### Hard rules

* **No connection to any lab, manufacturer or other company.** Never write "our lab", "made in our lab", "Lueur", "LCL" or any reference to a parent business anywhere: copy, metadata, code comments, repo names, commit messages, structured data, image alt text or file names. Medaase Favors stands alone.
* Host on a **new, separate GitHub account or organisation** created for Medaase Favors.
* Never invent testimonials, reviews, ratings, awards, customer counts or certifications. Leave review sections out until real reviews exist.
* Brand copy uses British spelling for "favours" in sentences, but the brand name is always **Medaase Favors** (no "u").
* Copy tone: warm, playful, human and evocative. Never mechanical feature lists.

---

## 1. Brand

| Item | Value |
|---|---|
| Name | Medaase Favors ("medaase" is Twi for "thank you") |
| Instagram | @medaase.favors (https://instagram.com/medaase.favors) |
| Feeling | Fun, joyful, grateful, premium but approachable |
| Primary | Navy `#1B2A4E` |
| Ground | White `#FFFFFF` |
| Secondary | Candy pink `#FFB8D1` |
| Accent | Hot pink `#E8508A` (small accents only) |
| Display font | Young Serif (Google Fonts) |
| Body font | DM Sans 400 / 500 / 700 (Google Fonts) |
| Shapes | Soft, generously rounded corners (about 24px), pill buttons |
| Imagery | Real photos and real 3D only. **No flat illustrations or clip art.** |
| Logo | **Gift tag** (final): "medaase" with FAVORS beneath on a gift tag with an eyelet and satin ribbon. Files go in `public/brand/` (logo-primary, logo-on-navy, logo-on-pink, logo-mono-navy, logo-mono-white, icon; SVG and PNG). Use logo-on-navy in the navy header, logo-primary on white, icon for favicon and app icon. |

**Tagline options** (use the first by default):
1. Say medaase in a way they'll remember
2. Little thank yous your guests will keep
3. Thank you, wrapped in shea

**Instagram bio (approved style):**
> Say medaase in a way they'll remember ✨
> Custom skincare souvenirs for every event
> Free design to match your theme
> 📍 Accra | DM to order

---

## 2. Tech stack

Use an architecture that is **static HTML first with interactive islands**, so search engines and AI crawlers get complete content and the 3D loads on top.

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro** with React islands | Every route is pre-rendered to static HTML at build time. |
| 3D | **React Three Fiber** (`@react-three/fiber`) + `@react-three/drei` + `three` | Used only inside client-side islands. |
| Background | **Shader Gradient** (`@shadergradient/react`) | Navy to pink animated gradient. |
| Logo effect | **Paper Design shaders** (`@paper-design/shaders-react`, Liquid Metal) | Pink chrome logo mark. |
| Glass UI | **Liquid Glass JS** (dashersw) or a CSS `backdrop-filter` fallback | Glass cards and panels. |
| Scroll motion | **GSAP + ScrollTrigger**, or drei `ScrollControls` inside the canvas | Cinematic scroll story. |
| Styling | Plain CSS or Tailwind; your call | Must support the brand tokens above. |
| Payments | **Paystack Inline (Popup)** | Currency GHS. |
| Backend | **Google Apps Script** web app + **Google Sheet** + **Google Drive** folder | No paid servers. |
| Hosting | **GitHub Pages** via GitHub Actions | Free. Custom domain later (see §12). |

**Before installing:** confirm the current package names, versions and APIs of each library on npm or GitHub, since some of these move quickly. Pin exact versions.

---

## 3. Site map and URLs

All pages are indexable unless marked otherwise. Use clean, lowercase, hyphenated URLs with trailing slashes off.

```
/                                   Home
/products                           All products
/products/pure-african-shea-butter  Product page (one per product, see §5)
/products/body-butter
/products/shimmer-oil
/products/hand-cream
/products/hand-wash-gel
/products/lip-balm
/souvenirs/weddings                 Event landing pages (SEO, see §9)
/souvenirs/funerals
/souvenirs/naming-ceremonies
/souvenirs/birthdays
/souvenirs/church-events
/souvenirs/corporate-gifts
/how-it-works
/faq
/guides                             Guide index (monthly articles)
/guides/<slug>
/contact
/checkout                           noindex
/order/thank-you                    noindex
/privacy
/terms
```

**Header menu:** Home · All products · Souvenirs for (dropdown of event pages) · How it works · FAQ · Order (cart icon with item count).
On mobile: a "Menu" button opens a full-screen glass menu.

**Footer:** logo, tagline, product links, event links, FAQ, contact (WhatsApp, email, Instagram), privacy, terms, © year Medaase Favors.

---

## 4. Products

All product data lives in **one file**: `src/data/products.ts`. All prices are **TBD**; use the placeholders below and mark them clearly in the config.

### 4.1 Catalogue

| Product | Slug | Sizes | Price per piece (GH₵) |
|---|---|---|---|
| **100% Pure African Shea Butter** | `pure-african-shea-butter` | Small 50g · Medium 100g · Large 250g | 19 · 25 · 45 |
| Body Butter | `body-butter` | Small 50g · Medium 100g · Large 250g | 27 · 41 · 86 |
| Shimmer Oil | `shimmer-oil` | Small 30ml · Medium 50ml · Large 100ml | 25 · 33 · 52 |
| Hand Cream | `hand-cream` | Small 30ml · Medium 50ml · Large 100ml (**confirm sizes**) | 21 · 28 · 43 |
| Hand Wash Gel | `hand-wash-gel` | Small 30ml · Medium 50ml · Large 100ml | 19 · 25 · 37 |
| Lip Balm | `lip-balm` | One size 5g (tube) | 13 |

These are the owner's approved prices. Put them in `src/data/prices.ts` exactly as below and read every price from there:

```ts
// Medaase Favors prices (GH₵ per piece)
export const PRICES = {
  'pure-african-shea-butter': { 'Small 50g': 19, 'Medium 100g': 25, 'Large 250g': 45 },
  'body-butter': { 'Small 50g': 27, 'Medium 100g': 41, 'Large 250g': 86 },
  'shimmer-oil': { 'Small 30ml': 25, 'Medium 50ml': 33, 'Large 100ml': 52 },
  'hand-cream': { 'Small 30ml': 21, 'Medium 50ml': 28, 'Large 100ml': 43 },
  'hand-wash-gel': { 'Small 30ml': 19, 'Medium 50ml': 25, 'Large 100ml': 37 },
  'lip-balm': { 'One size 5g': 13 },
};
export const ADD_ONS = {
  label: 1.5, // Label (front text or logo + date)
  bag: 2.5,   // Drawstring organza bag
  card: 3,    // Mount on printed card
  tag: 2,     // Thank you tag
};
export const BUNDLE_DISCOUNT = 0.05;
export const MIN_PER_ITEM = 25;
```

Do not use the name "raw shea butter" anywhere. The product is always **100% Pure African Shea Butter**.

### 4.2 Options per product

Every product page shows these sections, in this order. Hide a section if the product has no options for it.

1. **Size:** Small, Medium, Large (or one size).
2. **Scent:** Unscented, Vanilla, Coconut, Rose (**TBD, confirm list**). Not shown for Hand Wash Gel unless confirmed.
3. **Container:** e.g. White tub, Clear tub, Pink tub; Amber dropper bottle, Clear bottle, Frosted bottle for oils (**TBD, confirm per product**).
4. **Lid or cap:** e.g. Gold, White, Pink, Navy; Black dropper for amber bottles (**TBD**).
5. **Label** (see §4.3).
6. **Add ons** (see §4.4).
7. **Quantity:** stepper with typed input. Minimum **25**. Steps of 5.

### 4.3 Label rules

Two choices, shown as large toggle cards:

* **No label:** plain product. Cheapest option.
* **Add label** (+ GH₵ 1.50 per piece):
  * **Front:** choose one:
    * **Type text:** the event name, the person's name, or the couple's names. Max 32 characters. Example placeholder: "Esi & Kwame".
    * **Upload logo:** PNG, JPG, SVG or PDF, max 5 MB. Show a preview.
  * **Below the front:** the **event date**. Date picker, shown on the label as `12.12.2026`.
  * That is all. No other label fields.

The label text, logo and date **render live on the 3D product** (see §6.3).

### 4.4 Add ons (per piece)

Each add on shows a **small square photo** (about 64px, rounded corners) beside its name and a one line explanation, so customers can see what they are choosing. Photos live in `public/images/addons/`. Until the owner supplies real photos, show a soft pink placeholder square with the add on's name; never use illustrations or clip art.

| Add on | What it is (show this line on the product page) | Options | Price per piece | Photo file |
|---|---|---|---|---|
| Drawstring organza bag | A sheer organza pouch with a drawstring, holding the favour (or a guest's whole bundle) | Pink, Navy, White, Gold, Mixed colours | GH₵ 2.50 | `organza-bag.jpg` |
| Card mounting | The product is attached to a printed card with your names and date, so it is presented like a gift card | Lip Balm and Small Shea Butter only | GH₵ 3 | `card-mounting.jpg` |
| Thank you tag | A small printed tag tied to the product or bag, carrying a thank you message and the label front text | One style | GH₵ 2 | `thank-you-tag.jpg` |

The label (§4.3) also gets a photo: `label.jpg`, showing a labelled tub.

Rules:
* Card mounting uses one standard rectangular card with a simple, clean design. There are no shape options.
* When card mounting is ticked, show **"What should your card say?"** with:
  * **Main text:** names or event name (defaults to the label front text if a label was added). Max 40 characters.
  * **Date:** defaults to the label date.
  * **Message:** max 80 characters, default "Thank you for celebrating with us". Offer quick picks: "Thank you for coming", "With love and gratitude", "In loving memory" (funerals), "Welcome to the world" (naming ceremonies).
  * **Special style (optional):** a note field: "Want a special card? Tell us the style number from our card styles page, or describe it, and we'll quote it on WhatsApp." Link it to the hidden `/card-styles` page.
* **Hidden card styles page (`/card-styles`):** not in the menu, footer or sitemap, and `noindex`. Seven numbered styles, each with what it works with and the events it suits (data in `src/data/cardStyles.ts`). Photos go in `public/card-styles/01.jpg` to `07.jpg` and must be the owner's own photos; until then a soft placeholder shows the style name.
* The card text renders live on the 3D card preview, like the label.
* Organza bags in a bundle: one bag per guest holds all their favours.

### 4.5 "Starts from" pricing

* Every product card and every product page heading shows **"Starts from GH₵ X"** where X is the **lowest possible unit price**: smallest size, no label, no add ons.
* Make the price large and friendly so it feels affordable. Example: **Starts from GH₵ 13** (Lip Balm).
* On the product page, a sticky price bar shows the **live unit price** and **line total** as options change, e.g. "GH₵ 27 each · GH₵ 810 for 30".

Unit price formula:

```
unit = sizePrice + (label ? labelFee : 0) + sum(selected add ons)
lineTotal = unit × qty
```

### 4.6 Product copy (use as written, refine freely in the same voice)

* **100% Pure African Shea Butter:** Pure, unrefined shea, soft enough to scoop and rich enough for elbows, heels and dry hands. We dress each tub in your colours and names, so it stays on the dressing table long after the party. *The favour every auntie actually uses.*
* **Body Butter:** Whipped light in the jar, melting into skin with a soft finish that lasts through the evening. A gift that feels a little indulgent and gets used every single day.
* **Shimmer Oil:** Silky body oil with a fine golden shimmer that catches the light on shoulders and collarbones. For the guest who plans to shine at the after party.
* **Hand Cream:** Light and quick to sink in, with no greasy feel. Kind to the hands that hugged you all day.
* **Hand Wash Gel:** A gentle gel that leaves hands clean and soft. A practical keepsake that brings your celebration to mind at every sink.
* **Lip Balm:** Pocket sized and always welcome. A smooth, nourishing balm that slips into any clutch, and looks especially sweet mounted on a printed card.

---

## 5. Ordering flow and bundles

### 5.1 Flow

1. Customer opens a product page and customises it.
2. Taps **Add to order**.
3. A **"Bundle it with"** panel slides up (glass sheet on mobile, side panel on desktop).
4. Customer ticks other products, adjusts each one's size and scent inline, and taps **Create bundle**, or **No thanks, continue**.
5. Cart drawer opens with a **Checkout** button.

### 5.2 "Bundle it with" panel

* Lists every product **not already in the cart**, each with photo or mini 3D thumbnail, name and "Starts from" price.
* Each selected product shows compact inline options: size and scent.
* **Defaults for bundled items** (all editable):
  * Quantity = the quantity of the product just added.
  * Label = same choice, same front text or logo, and same date as the product just added.
  * Add ons = same organza bag choice as the product just added; card mounting only where allowed.
* Headline above the list: **"Bundle it and save 5% on your whole order"**.
* Show the running saving live: "You save GH₵ 54".

### 5.3 Bundle discount

* **Rule:** if the cart contains **2 or more different products**, apply **5% off the entire order** (all product lines and add ons; not delivery, not rush fee).
* In the cart and checkout, when only one product is in the cart, show a nudge: **"Add one more product and save 5% on everything"** with a link to the bundle panel.
* The bundle 5% is the **only** discount. No volume tiers.
* If organza bags are selected, note at checkout: "Each guest's favours are packed together in one organza bag."

### 5.4 Suggested bundles (shortcuts, not separate products)

Two cards on Home and All products that pre-fill the bundle panel:
* **The Sweet Pair:** Lip Balm + Small Shea Butter
* **The Glow Set:** Lip Balm + Small Body Butter + Small Shimmer Oil

### 5.5 Cart

* Stored in `localStorage` (wrapped in try/catch) so it survives refreshes.
* Each line shows: product, size, scent, container, lid, label summary ("Label: Esi & Kwame · 12.12.2026" or "Label: logo · 12.12.2026" or "No label"), add ons, quantity, line total.
* Edit (reopens product page with options pre-filled), change quantity, remove.
* Validation: each line ≥ 25 pieces.

---

## 6. 3D and motion

### 6.1 Principles

* **HTML first, 3D second.** Every page renders full content and a poster image with no JavaScript. 3D islands hydrate after first paint (`client:visible` or `client:idle` in Astro).
* **Performance budget:** most visitors use mid-range Android phones on 4G or mobile data.
  * LCP under 2.5s on a mid-range Android over 4G.
  * Initial JS for any page (excluding the lazy 3D chunk) under about 150 KB gzipped.
  * Each 3D model generated in code; no large .glb downloads in v1.
* **Fallback to a still image** (poster) when any of these are true: `prefers-reduced-motion`, `navigator.connection.saveData`, `navigator.deviceMemory <= 2`, `navigator.hardwareConcurrency <= 4`, WebGL unavailable. Also offer a small "Turn off effects" toggle in the footer, remembered in localStorage.
* Pause rendering when the canvas is off screen or the tab is hidden. Cap device pixel ratio at 1.5 on mobile.

### 6.2 Procedural 3D models

Build each package in Three.js using `LatheGeometry` and simple primitives so they look like the real packaging:

| Model | Build |
|---|---|
| Amber dropper bottle | Lathe body, amber `MeshPhysicalMaterial` with transmission, roughness ~0.05, IOR ~1.5, thickness; black rubber bulb + black collar |
| Shea / body butter tub | Short wide cylinder with rounded edges, tinted plastic; screw lid in chosen colour |
| Hand cream / hand wash bottle | Lathe body with pump or flip cap |
| Lip balm tube | Slim cylinder with cap |
| Organza drawstring bag | Sheer, slightly translucent cloth shape (subdivided, slightly noisy geometry) with a satin cord |

The owner will supply photos of the real tubs, jars, bottles and bags; match proportions and colours to those photos. Lighting: drei `Environment` with a soft studio preset, plus `ContactShadows`.

### 6.3 Live 3D product customiser (product pages)

* The product rotates slowly and responds to drag (orbit, limited angles) and gentle mouse or tilt parallax.
* Changing **container** or **lid** swaps the material colour instantly with a short tween.
* **Label:** render the label to a `CanvasTexture` and wrap it on the label area of the model:
  * Background: white with a thin navy border, or kraft if a finish option is added later.
  * Front text in Young Serif, auto-fitted to the width; or the uploaded logo, contain-fitted.
  * Date below in DM Sans.
  * Re-render the texture as the customer types (debounced ~120ms).
  * "No label" removes the label mesh.
* A poster image of each product (rendered from the 3D scene at build time or supplied photo) is the no-JS and low-power fallback.

### 6.4 Home hero

Composition, back to front:
1. **Shader Gradient** background filling the hero: navy `#1B2A4E` flowing into candy pink `#FFB8D1`, slow movement.
2. **Giant "MEDAASE"** in Young Serif, pink, about 19vw wide, letters rising in one by one on load (70ms stagger).
3. **3D amber dropper bottle** (or a shea tub with a "Esi & Kwame · 12.12.2026" label) floating in front of the giant word, slowly rotating, tilting toward the cursor or device tilt.
4. **"favors"** in large white italic overlapping the bottom right of the product, rotated about -6°.
5. Below: H1 "Say medaase in a way they'll remember", one line of copy, fact pills (From 25 pieces · Free theme design · 5 to 7 working days · Pay with MoMo or card), buttons **Shop all products** and **How it works**.

The H1 and copy are real HTML text, not part of the canvas.

### 6.5 Liquid metal logo

The Medaase Favors gift tag icon (`public/brand/icon.svg`) rendered with the Paper Design Liquid Metal shader in a pink chrome tint, used as a decorative accent in the hero and footer. The header always uses the flat logo SVG so it stays sharp and readable.

### 6.6 Scroll story (Home, below the hero)

A pinned 3D section, about 3 screens of scroll:
1. A shea tub, a lip balm and a shimmer oil sit on a soft pink surface.
2. As the user scrolls, the camera glides around them; a label prints onto the tub ("Esi & Kwame · 12.12.2026").
3. The three products drop into a pink organza drawstring bag that cinches closed.
4. End frame text: **"One bag. One thank you. Every guest."** with a **Start your order** button.

Each step has a short HTML caption beside it so the story reads without the 3D. Low-power fallback: three stacked photos with the same captions.

### 6.7 Glass and motion everywhere else

* Product cards and panels: liquid glass over a soft, slow gradient, rounded 24px corners.
* Marquee ribbon under the hero (pink band, navy Young Serif text): Weddings ✦ Funerals ✦ Naming ceremonies ✦ Birthdays ✦ Church events ✦ Corporate gifts, scrolling slowly and infinitely.
* Giant outlined background words behind sections (FAVOURS, THANK YOU, SHOP, EASY), stroke only, very light.
* Reveal on scroll: headings, cards and steps rise 28px and fade in, staggered 80ms.
* Product cards: lift and slight tilt on hover; the photo or 3D thumbnail zooms gently.
* Page transitions: Astro View Transitions with a short fade and slide.
* Every animation is disabled under `prefers-reduced-motion`.

---

## 7. Pages in detail

### 7.1 Home
1. Hero (§6.4)
2. Marquee ribbon
3. **Guest favourites:** 4 product cards (Shea Butter, Shimmer Oil, Lip Balm, Body Butter) with "Starts from" prices
4. **Suggested bundles:** The Sweet Pair, The Glow Set, with "Save 5%" badges
5. Scroll story (§6.6)
6. **Made for every gathering:** 6 photo tiles linking to the event pages
7. **How it works:** 4 steps (Choose · Pay · Approve design · Collect)
8. **FAQ preview:** 5 questions, link to /faq
9. Closing call to action band: "Ready to say medaase?" + **Start your order**

### 7.2 All products
* H1 "All products", short intro.
* Filter chips: All · Butters · Oils · Hand care · Lip.
* Grid of product cards: photo or 3D thumbnail, name, one line blurb, **Starts from GH₵ X**.
* Suggested bundles row.

### 7.3 Product page
* Breadcrumb: All products / Product name.
* Left (sticky on desktop): 3D customiser (§6.3) with 3 photo thumbnails below (close up, labelled, at an event).
* Right: name, **Starts from** price, evocative description, then the option sections (§4.2), then the sticky price bar with **Add to order**.
* Below: "What's included", "How long it takes", product FAQ (3 to 4 questions), and "Bundle it with" suggestions.
* Each product page must contain at least 250 words of useful, unique text for SEO.

### 7.4 Event landing pages (`/souvenirs/<event>`)
Each one has unique copy (400 to 700 words), a hero photo, recommended products and bundles for that event, ideas for label text (e.g. weddings: couple's names and date; funerals: "In loving memory of …" with dates; naming ceremonies: the baby's name), tone matched to the event (funerals are respectful and gentle, not playful), FAQs specific to the event, and a call to action.

### 7.5 How it works
1. **Choose:** customise your favours and add them to your order.
2. **Pay:** pay in full with MoMo or card to lock in your date.
3. **Approve your design:** we send your label design on WhatsApp within 24 hours. Two rounds of changes are free.
4. **Collect:** ready in 5 to 7 working days after approval. Pick up or get it delivered.

### 7.6 FAQ (also used for FAQ structured data)
Write at least 15 questions in plain language, the way people ask Google and AI assistants. Must include:
* What is the minimum order? (25 pieces per product)
* How much do souvenirs cost? (Starts from prices)
* How long does it take? (5 to 7 working days after design approval)
* Can I order souvenirs for an event this weekend? (rush policy, §8.4)
* Is the label design free? (Yes, two rounds of changes)
* Can I put our names, a photo or a logo on the label? (Names or logo, plus the date)
* Do you make funeral souvenirs? / naming ceremony souvenirs? / corporate gifts?
* What is the bundle discount? (5% off the whole order for 2 or more different products)
* How do I pay? (Full payment upfront via Paystack: MTN MoMo, Telecel Cash, AirtelTigo Money or card)
* Do you deliver outside Accra? (**TBD**)
* What is in the shea butter? (100% pure, unrefined African shea butter)
* Can I see a sample before ordering? (**TBD**)
* What if I need to change my order?

### 7.7 Checkout (`/checkout`, noindex)
Two columns on desktop, stacked on mobile; summary sticks to the bottom as a slim bar on mobile.
* **Your order:** cart lines (editable).
* **Your event:** event type (select), event date (date picker).
* **Your details:** full name, WhatsApp number (+233 format validation), email.
* **Delivery:** Pickup (free, location **TBD**) or Delivery within Accra (flat fee **TBD**, placeholder GH₵ 60).
* **Notes** (optional).
* **Summary:** line items, bundle discount line ("Bundle saving 5%"), rush fee (if any), delivery, **Total to pay** in large type.
* **Pay GH₵ X with Paystack** button (shows the full total).
* Under it: "MTN MoMo, Telecel Cash, AirtelTigo Money or card."

### 7.8 Thank you page (`/order/thank-you`, noindex)
Order reference, what happens next (design on WhatsApp within 24 hours), a WhatsApp button to message about the order, and an Instagram follow link.

### 7.9 Contact
WhatsApp click-to-chat button (`https://wa.me/<number>?text=<prefilled>`), email, Instagram, pickup area (**TBD**), business hours (**TBD**). Embed no maps until a pickup location is confirmed.

### 7.10 Privacy and Terms
Plain-language pages covering: data collected at checkout (name, phone, email, event details, uploaded logo), why it is used (fulfilling the order, sending the design), payment handled by Paystack, full payment upfront, refunds and cancellations (**TBD**), changes after design approval, rush orders, delivery. Mark as needing the owner's review before launch.

---

## 8. Business rules

| Rule | Value |
|---|---|
| Minimum order | 25 pieces per product line |
| Design | Free, matched to the event theme; 2 rounds of changes |
| Turnaround | 5 to 7 working days from design approval |
| Payment | 100% upfront at checkout via Paystack. No deposits, no balances. |
| Bundle discount | 5% off the entire order for 2 or more different products |
| Currency | Ghana cedi, displayed as `GH₵ 1,234` (no decimals unless needed) |

### 8.4 Rush orders (**TBD, confirm**)
Default to build:
* Event date under 7 working days away: show a notice and add a **20% rush fee** on products and add ons.
* Under 5 working days: block checkout and show "Please message us on WhatsApp so we can check if we can make it in time" with the WhatsApp button.
* Working days exclude Saturdays and Sundays. Add Ghana public holidays to a config list.

---

## 9. SEO and AI visibility (critical)

### 9.1 Technical
* Pre-rendered static HTML for every page. No content that only appears after JavaScript.
* One H1 per page; logical H2/H3 structure.
* Unique `<title>` (under 60 characters) and meta description (under 155) per page. Templates:
  * Product: `{Product} Souvenirs in Ghana | Medaase Favors`
  * Event: `{Event} Souvenirs in Ghana | Custom Favours | Medaase Favors`
* Canonical URLs, `lang="en-GH"`, Open Graph and Twitter card tags with a 1200×630 image per page.
* `sitemap.xml` (Astro sitemap integration) and `robots.txt` pointing to it; checkout and thank-you excluded.
* `llms.txt` at the root: a short plain-text summary of who Medaase Favors is, what it sells, minimum order, turnaround, price ranges, event types, ordering steps, contact, and links to key pages.
* Images: WebP or AVIF, explicit width and height, descriptive alt text, lazy loading below the fold.
* Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile.
* 404 page with links to products and events.

### 9.2 Structured data (JSON-LD)
* **Organization** and **Store** (LocalBusiness) on every page: name, url, logo, sameAs (Instagram), areaServed Ghana, address locality Accra (no street address until confirmed), telephone (**TBD**), priceRange "GH₵".
* **WebSite** on Home.
* **Product** on each product page with `brand: Medaase Favors`, description, images, and an `AggregateOffer` (`lowPrice`, `highPrice`, `priceCurrency: GHS`, `availability: InStock`). No `aggregateRating` until real reviews exist.
* **FAQPage** on /faq and on any page with an FAQ block.
* **BreadcrumbList** on product, event and guide pages.
* **Article** on guides.

### 9.3 Content and keywords
Target phrases (use naturally in headings and copy, never stuffed):
* souvenirs in Ghana, custom souvenirs Accra, wedding souvenirs Ghana, funeral souvenirs Ghana, naming ceremony souvenirs, party favours Ghana, customised shea butter souvenirs, shea butter wedding favours, personalised souvenirs with names, corporate gifts Accra, cheap souvenirs Ghana, souvenir ideas for funerals in Ghana.

**Guides** (`/guides`): launch with 3, then one per month. Each 800 to 1,200 words, helpful first, with a soft call to action. Launch set:
1. How many souvenirs should I order for my wedding?
2. Funeral souvenir ideas in Ghana that families actually keep
3. What to write on souvenir labels: 30 ideas for weddings, funerals and naming ceremonies

### 9.4 Off-site (owner actions, list them in the README)
* Create a **Google Business Profile** (category: Gift shop) with photos, products and the website link. Write the description from the brand copy.
* Ask every customer for a Google review (see §10.4).
* Get listed by Ghanaian event planners, decorators and wedding pages (backlinks).
* Keep Instagram active and link to the site in the bio.

---

## 10. Backend: orders, payments, uploads

### 10.1 Configuration
`src/data/site.ts` (all **TBD** values here):
```ts
export const SITE = {
  name: 'Medaase Favors',
  url: 'https://<github-username>.github.io',   // later the custom domain
  whatsapp: '233XXXXXXXXX',                      // TBD
  email: 'hello@medaasefavors.com',              // TBD
  instagram: 'https://instagram.com/medaase.favors',
  pickupArea: 'Accra',                           // TBD
  deliveryFeeAccra: 60,                          // TBD
  labelFee: 1.5,
  minPerItem: 25,
  bundleDiscount: 0.05,
  rushRate: 0.2,                                 // TBD
  rushWorkingDays: 7,
  blockWorkingDays: 5,
};
```
Environment variables (GitHub Actions secrets, exposed at build as public):
* `PUBLIC_PAYSTACK_KEY` (test key first, then live)
* `PUBLIC_ORDER_API_URL` (Apps Script web app URL)

The **Paystack secret key never goes in the website.** It lives only in Apps Script Script Properties.

### 10.2 Checkout sequence
1. Customer taps **Pay**. Validate everything client side.
2. Generate a reference `MF-<base36 timestamp>-<4 random chars>`.
3. **Upload logos first** (if any line has a logo): POST each file as base64 to the Apps Script endpoint, which saves it to a Google Drive folder `Medaase Favors / Logos / <reference>` and returns the file URL.
4. POST the order (status `Pending payment`) to Apps Script, which writes it to the Orders sheet.
5. Open Paystack Popup: `key`, `email`, `amount` (order total × 100, in pesewas), `currency: 'GHS'`, `ref`, `metadata.custom_fields` (customer name, WhatsApp, event date, event type).
6. On Paystack `callback`: POST `{reference}` to Apps Script `?action=verify`. Apps Script calls `GET https://api.paystack.co/transaction/verify/<reference>` with the secret key, checks `status === 'success'`, amount and currency match the stored order total, then marks the order `Paid`, and sends the confirmation email. Redirect to `/order/thank-you?ref=<reference>`.
7. On `onClose` without payment: show "No money was taken. You can try again whenever you are ready."

Use `Content-Type: text/plain` for POSTs to Apps Script to avoid CORS preflight; parse JSON on the server.

**Optional backup:** set a Paystack webhook to the Apps Script URL. Because Apps Script cannot read request headers to check the signature, never trust the webhook body; use it only as a trigger to re-run the verify API call for that reference.

### 10.3 Google Sheet structure
**Orders** tab, one row per order:
`Reference | Created | Status | Customer | WhatsApp | Email | Event type | Event date | Delivery | Notes | Items (JSON) | Items (readable) | Subtotal | Bundle discount | Rush fee | Delivery fee | Total | Amount paid | Paystack ref | Logo links | Design sent | Approved | Ready | Delivered | Review requested`

**Status values:** Pending payment → Paid → Design sent → Approved → In production → Ready → Delivered → Review requested.

**Lines** tab, one row per product line (for production): `Reference | Product | Size | Scent | Container | Lid | Label | Front text | Logo link | Date on label | Bag | Card | Shape | Tag | Qty | Unit | Line total`.

### 10.4 Emails (sent from Apps Script via `MailApp`)
* **Order confirmation** (on Paid): thank you, reference, items, total paid, what happens next, WhatsApp link.
* **Owner alert** (on Paid): new order summary to the owner's email.
* **Review request** (time-driven trigger, daily): 2 days after status becomes Delivered, send a short, warm email with the Google review link (**TBD** once the Business Profile exists), then set status Review requested.

Write all email copy in the brand voice. HTML emails, navy and pink, simple and mobile friendly.

### 10.5 Deliver the Apps Script code
Put the Apps Script in `/apps-script/Code.gs` in the repo with a setup README: create the Sheet, paste the script, set Script Properties (`PAYSTACK_SECRET_KEY`, `OWNER_EMAIL`, `DRIVE_FOLDER_ID`, `SHEET_ID`), deploy as a web app (Execute as: Me, Access: Anyone), copy the URL into the GitHub secret.

---

## 11. Accessibility and quality

* WCAG 2.1 AA contrast. Navy on white and white on navy for all body text; pink is never used for small text on white.
* All controls 44px minimum touch targets, visible focus states, keyboard reachable.
* Form inputs 16px or larger (prevents iOS zoom), clear labels, inline error messages.
* Canvas elements have `aria-hidden="true"`; every 3D visual has an HTML equivalent nearby.
* Test at 360px, 390px, 768px, 1024px and 1440px widths. No horizontal scroll at any width.
* Lighthouse mobile targets: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.

---

## 12. Hosting and domain

* GitHub organisation **medaasefavors**, repo `medaase-favors`. GitHub Actions builds Astro and deploys to GitHub Pages on every push to `main`.
* **Domain: medaasefavors.com** (registered at Namecheap). `public/CNAME` holds the domain; base path is `/`.
* DNS at Namecheap: four A records for `@` (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and a `www` CNAME to `medaasefavors.github.io`. HTTPS enforced in Settings → Pages.
* **Email: Zoho Mail Forever Free** on the same domain, address hello@medaasefavors.com (MX, SPF and DKIM records at Namecheap, Mail Settings set to Custom MX).

## 13. Build phases and acceptance

| Phase | Deliver | Done when |
|---|---|---|
| 1. Foundation | Astro project, routes, layout, header and menu, footer, brand tokens, fonts, product data file, all pages with real HTML content and SEO meta | Every URL renders full content with JavaScript off; Lighthouse SEO 100 |
| 2. Hero preview | Home hero with shader gradient, giant MEDAASE, floating 3D bottle, "favors" overlay, marquee, fallback poster | Owner approves the look on a phone and a laptop |
| 3. Products and customiser | All products page, product pages, procedural 3D models, live label texture, options, sticky price bar | Label text, logo and date appear on the 3D product live; "Starts from" prices correct |
| 4. Cart and bundles | Cart drawer, "Bundle it with" panel, suggested bundles, 5% rule, nudges | 2+ different products always apply 5%; single product shows the nudge |
| 5. Checkout and backend | Checkout page, Paystack test mode, Apps Script, Sheet, Drive uploads, emails | A test MoMo payment creates a verified "Paid" row and both emails arrive |
| 6. Story and polish | Scroll story, liquid metal logo, glass panels, reveals, transitions, low-power fallbacks | Smooth on a mid-range Android; reduced motion respected |
| 7. Content and SEO | Event pages, FAQ, 3 guides, JSON-LD, sitemap, robots, llms.txt, OG images | Rich Results Test passes for Product, FAQPage, Breadcrumb, Organization |
| 8. Launch | Live Paystack key, privacy and terms reviewed, Google Search Console verified, sitemap submitted, Google Business Profile linked | First real order completes end to end |

---

## 14. Open items for the owner

* **Possible new product:** Pot lip balm (lip balm in a small round pot). Owner is deciding; build the product data so a second lip balm format can be added without code changes.

1. Confirm hand cream sizes (built as 30ml, 50ml, 100ml)
2. Scent list, container and lid options per product
3. Delivery fee, delivery areas outside Accra, pickup location and business hours
4. Rush policy (20% under 7 working days, block under 5?)
5. WhatsApp business number and business email
6. Photos: real tubs, jars, bottles, tubes and organza bags (for 3D matching); finished labelled favours; event photos; one photo per add on (organza bag, card mounting, thank you tag, label)
7. Paystack account approval and keys (display name: Medaase Favors)
8. Domain name, when ready
9. Sample policy (can customers get a sample before ordering?)

---

## 15. Quick summary

* Static, SEO-first Astro site with React Three Fiber islands, hosted free on GitHub Pages, completely separate from any other business.
* Navy, white and pink; Young Serif and DM Sans; no illustrations, only real photos and real 3D.
* Home: shader gradient, giant MEDAASE behind a floating 3D bottle, liquid metal logo, cinematic scroll story.
* Products: Starts from prices, live 3D customiser where names, logo and date appear on the label.
* Labels: No label or Add label (text or logo on the front, date below).
* Bundles: "Bundle it with" after adding a product; 2 or more different products = 5% off the whole order.
* Checkout: full payment upfront through Paystack, verified by Apps Script, logged to Google Sheets, confirmation emails, review requests.
* SEO and AI: event landing pages, 15+ FAQs, guides, full structured data, sitemap and llms.txt.
