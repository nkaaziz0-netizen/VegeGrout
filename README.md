# VEGE·GROUT — Website

Next.js 14 (App Router) + TypeScript + Tailwind implementation of the VEGE-GROUT (VG3S)
marketing site, built from the architecture and design decisions in the project's
planning docs (`VEGE-GROUT_Website_Architecture.md`, `VEGE-GROUT_Website_Documentation.docx`).

## Stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS + a hand-written design-system stylesheet (`app/globals.css`)
  for the header, modals, cards, and the two signature animations — some of this UI
  (clip-path menu reveal, SVG root-growth draw, the injection-bloom grid) is easier to
  express in plain CSS/DOM than in utility classes, so the project uses both side by side.
- **Fonts:** Bricolage Grotesque (display), Inter (body), IBM Plex Mono (data/labels),
  loaded via `next/font/google` in `app/layout.tsx`.
- **Database:** Supabase (Postgres) — optional; the quote form still works (WhatsApp
  handoff) even with no Supabase project configured, it just won't persist the lead.
- **Hosting target:** Vercel.

## Pages

| Route | File | Content |
|---|---|---|
| `/` | `app/page.tsx` | Home — hero, cost-of-failure stats, monitoring teaser, sustainability |
| `/technology` | `app/technology/page.tsx` | MICP/bio-mineralization mechanism, formulation data, full 5-stage SOP |
| `/products` | `app/products/page.tsx` | The 4-part product/service bundle |
| `/projects` | `app/projects/page.tsx` | Case studies — featured NSE site + commercial project ledger |
| `/partners` | `app/partners/page.tsx` | Distributor/OEM model, commercial terms |
| `/about` | `app/about/page.tsx` | Team, R&D timeline, IP portfolio |

Header, overlay menu, quote modal, login/signup modal, and footer are shared across
every page via `components/SiteChrome.tsx` and `components/Footer.tsx`, mounted once
in `app/layout.tsx`.

## The two signature animations

- **`components/RootGrowthHero.tsx`** — the hero's SVG root system draws itself in via
  `stroke-dashoffset`, replaying every time the hero re-enters the viewport (in either
  scroll direction), used only on the homepage.
- **`components/InjectionBloomProcess.tsx`** — a generated grid of "injection points"
  blooms outward in a wave as the 5-stage SOP section scrolls into view; used on both
  the homepage (condensed) and `/technology` (full detail).

Both are self-contained client components using `IntersectionObserver` + tracked
`setTimeout` arrays so they reset cleanly on exit and never collide with themselves on
a fast scroll reversal — see the code comments in each file for the pattern.

## Opening the quote/login modals from any page

Pages are server components by default, so they can't hold `onClick` handlers
directly. Any button that needs to open the quote or login modal uses:

- `components/QuoteButton.tsx` — a small client component wrapping `openQuoteModal()`
- or, for anything more custom, import `openQuoteModal` / `openAuthModal` from
  `lib/events.ts` directly inside your own client component.

`SiteChrome` listens for these events regardless of which page fired them, so the
modals work correctly across the whole site without prop-drilling or a Context provider.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in Supabase + WhatsApp number
npm run dev
```

Visit `http://localhost:3000`.

The site works with **no environment variables set at all** — the quote form still
opens WhatsApp, it just skips the Supabase insert (see `app/api/inquiries/route.ts`,
which no-ops gracefully when `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`
aren't present).

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL — enables lead persistence |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase public client key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No (has a placeholder default) | Business WhatsApp number, international format, no `+`/spaces |
| `RESEND_API_KEY` | No | Not wired up yet — placeholder for a future email-notification step |

## Supabase schema (optional)

```sql
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text,
  phone text,
  message text,
  source text, -- 'contact_form' | 'whatsapp_click'
  created_at timestamptz default now()
);
```

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit — VEGE-GROUT website"
git branch -M main
git remote add origin https://github.com/<your-org>/<your-repo>.git
git push -u origin main
```

## Deploying

1. Import the repo into [Vercel](https://vercel.com/new).
2. Add the environment variables above under Project Settings → Environment Variables
   (mirror them across Production, Preview, and Development as needed).
3. Deploy — every push to `main` redeploys production, every PR gets a preview URL.

## Known gaps / next steps

- Replace the placeholder WhatsApp number (`60123456789`) everywhere via
  `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- Login/signup is intentionally a front-end-only simulation (in-memory state, resets on
  reload) — wire up real auth (Supabase Auth is the natural fit given the DB choice)
  before this goes anywhere near production.
- Swap placeholder project photography for real before/after site images.
- Run through the UAT test plan in `VEGE-GROUT_Website_Documentation.docx` (Section 11)
  before pointing DNS at production.
