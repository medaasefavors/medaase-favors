# Medaase Favors

Website for **Medaase Favors**, custom skincare souvenirs for weddings, funerals, naming ceremonies, birthdays, church events and corporate gifts in Accra, Ghana.

Built with [Astro](https://astro.build): every page is plain HTML first, with interactive and 3D pieces added on top.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321/medaase-favors
npm run build    # outputs to dist/
```

## Where things live

| What | File |
|---|---|
| Prices, add ons, product copy and options | `src/data/products.ts` |
| Business settings (WhatsApp, email, delivery fee, rush rules, minimum order) | `src/data/site.ts` |
| FAQ | `src/data/faq.ts` |
| Event pages (weddings, funerals …) | `src/data/events.ts` |
| Guides | `src/data/guides.ts` |
| Brand colours and fonts | `src/styles/global.css` |

Every value still waiting for the owner is marked `TBD` in those files.

## Deploying

Every push to `main` builds the site and publishes it to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site is served at `https://medaasefavors.github.io/medaase-favors`. When a custom domain is ready, add repository variables `SITE_URL` (for example `https://medaasefavors.com`) and `BASE_PATH` = `/`, then add the domain under Settings → Pages.

Secrets (Settings → Secrets and variables → Actions), needed from Phase 5:

- `PUBLIC_PAYSTACK_KEY`: Paystack public key (test key first, then live)
- `PUBLIC_ORDER_API_URL`: Google Apps Script web app URL

The Paystack **secret** key never goes in this repo or the website. It lives only in Apps Script Script Properties.

## Build phases

1. **Foundation** (done): all pages, real HTML content, SEO tags, structured data, sitemap, robots.txt, llms.txt
2. Hero (done): photo slideshow of real work
3. **Products and order builder** (done): live prices, plastic or aluminium jars, label fields with a label preview (round on aluminium lids), Add to order, order page with the 5% bundle rule
4. **Cart and bundles** (done): bundle panel after Add to order, suggested bundles, edit a line
5. **Checkout and backend** (done, waiting for keys): checkout form, rush and delivery, Paystack, orders and logos saved via the admin sheet's script, confirmation emails. Switch on by adding the web app link and Paystack public key to `src/data/admin.json`
6. Scroll story and polish
7. Content and SEO polish
8. Launch

## Owner to-do list

**Information needed**

1. WhatsApp business number and business email
2. Scent list, container and lid options per product
3. Delivery outside Accra, pickup location and business hours
4. Rush policy (20% under 7 working days, block under 5?)
5. Refund and cancellation policy; sample policy
6. Logo (or approve the "MF" monogram)
7. Photos: real tubs, jars, bottles, tubes and drawstring bags; finished labelled favours; event photos
8. Paystack account approval and keys
9. Domain name, when ready

**Off-site, for Google and AI visibility**

- Create a Google Business Profile (category: Gift shop) with photos, products and the website link
- Ask every customer for a Google review
- Get listed by Ghanaian event planners, decorators and wedding pages
- Keep Instagram active and link to the site in the bio
- Verify the site in Google Search Console and submit `sitemap-index.xml`
