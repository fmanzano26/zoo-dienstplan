# Zoo Club Availability

Modern, two‑page app for Zoo Club staff to send their availability. Built with **Next.js App Router + Tailwind** and **Google Sheets** as the data store.

- **Home** – matches your screenshot: neon "Zoo Club" on a dark gradient, "Staff" and "Manager" cards with glowing border on hover, language picker top‑right (DE default, ES toggle).
- **Staff** – Name and Position (required), calendar where only **Thu/Fri/Sat** can be selected, optional note. Submits to Google Sheets.
- **Manager** – password `zoo2025` (client‑gated). Lists submissions from Google Sheets and lets you **Export CSV**.

## Quick start

```bash
npm i
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub and import into Vercel.
2. Configure **Environment Variables** in Vercel (Project Settings → Environment Variables):

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=...@....gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id
```

> Important: keep the `\n` newlines in the private key exactly like above.

3. Redeploy. The Staff form will append rows to your sheet; Manager page will read from it.

## Google Sheets setup

1. Create a Google Cloud **Service Account**.
2. Generate a key (JSON) → copy **client_email** as `GOOGLE_SERVICE_ACCOUNT_EMAIL` and **private_key** as `GOOGLE_PRIVATE_KEY`.
3. Create a Google Sheet and copy the sheet ID (the long string in the URL) → `GOOGLE_SHEET_ID`.
4. **Share the sheet** with the service account email with **Editor** permission.
5. Add header row to columns A–E:

```
timestamp | name | position | dates | note
```

## Customization

- Colors are set in `tailwind.config.js` and `app/globals.css` to match the screenshot (neon cyan glow, dark gradient, rounded cards).
- The home cards glow on hover (`.card-hover`).
- German is default; Spanish toggle in the top right (LanguageSwitcher).

## Security note

- The Manager password is enforced client‑side and for the `/api/list` endpoint via a simple **Bearer token**. For stronger security, add real auth (e.g. NextAuth).
