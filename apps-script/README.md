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

## Orders and payments

Orders use the same Apps Script project. Add `Orders.gs` next to `Admin.gs` (in Apps Script: **+ → Script**, name it `Orders`, paste the file).

1. **Script properties** (Project Settings → Script properties):
   - `PAYSTACK_SECRET_KEY`: your Paystack secret key (`sk_test_…` while testing, then `sk_live_…`). Never put this anywhere else.
   - `OWNER_EMAIL`: where new-order alerts go.
   - `DRIVE_FOLDER_ID` (optional): the Drive folder for customer logos. Without it, a "Medaase Favors" folder is created in your Drive.
2. **Deploy → Manage deployments → Edit → New version → Deploy** so the web app includes the order code. The link stays the same.
3. Send your developer your Paystack **public** key (`pk_test_…`, later `pk_live_…`). It goes in `src/data/admin.json` and is safe to be public.

What happens when someone pays:

1. Their logos are saved in Drive under **Medaase Favors / Logos / <order reference>**.
2. The order is priced again here from the published catalogue (so nobody can change a price in their browser) and saved to the **Orders** and **Lines** tabs as *Pending payment*.
3. Paystack opens. When the payment succeeds, this script asks Paystack to confirm the amount, marks the order **Paid**, and emails the customer and you.

The **Orders** tab is yours to work from: add your own columns to the right (for example Design sent, Approved, Ready, Delivered).
