# Admin panel (Google Sheet)

You manage the website from one Google Sheet. Edit it, then choose **Medaase Favors → Publish website**.

## What each tab does

| Tab | What you can change |
|---|---|
| Settings | Email, Instagram, hours, pickup and delivery wording, delivery fee outside Accra, minimum order, steps, rush rules, the per-piece charge and the bundle discount |
| Products | Add, edit or hide a product: name, category, card line, description, one-liner, the two "why guests love it" paragraphs, main photo |
| Sizes | Each product's sizes and price per piece, and whether that size can be mounted on a card |
| Scents | Which scents each product offers |
| Shades | Shimmer shades (name, description, swatch colour) |
| Packaging | Each packaging type and colour per product, lid colours, label style, **In stock** tick box, and an optional photo |
| Charges | Label, organza bag, card, custom shape and thank-you tag prices |
| Card designs | Card design names, descriptions, illustration, show or hide |
| Card shapes | Card shapes, whether the extra charge applies, show or hide |
| Documents | PDFs to offer on the Contact page (Google Drive link) |

Photos and PDFs: put the file in your Google Drive and paste its link. It stays private; only the website build can read it, and only after you publish.

Removing something: untick **Show on site** (products, card designs, shapes, documents), untick **In stock** (packaging), or delete the row.

## One-time setup (about 10 minutes)

1. Open the admin sheet. Go to **Extensions → Apps Script**.
2. Delete anything in the editor, paste the whole of `Admin.gs`, and click **Save**.
3. Go back to the sheet and reload the page. A **Medaase Favors** menu appears.
4. Choose **Medaase Favors → Set up the sheet (first time)**. Google asks you to allow access the first time; allow it. Every tab fills in from the website.
5. In Apps Script, click **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy** and copy the **Web app URL**.
6. Send that URL to your developer (it goes in `src/data/admin.json`). It only shows what you have published.

### Optional: instant publishing

Without this, the website picks up what you publish within 30 minutes. For updates in about 2 minutes:

1. On GitHub: **Settings → Developer settings → Fine-grained tokens → Generate new token**. Repository access: only `medaasefavors/medaase-favors`. Permissions: **Actions: Read and write**.
2. In Apps Script: **Project Settings → Script properties → Add**. Name `GITHUB_TOKEN`, value: the token.

## If something goes wrong

- **Medaase Favors → Check for problems** lists anything that would stop publishing (a price that isn't a number, a product with no sizes, a broken Drive link…). Nothing goes live until it's fixed.
- If the website cannot reach the sheet, it keeps showing the last good version.
