# CanadianSME — website + CMS monorepo

One repository for everything behind **canadiansme.ca**:

| Folder | What it is | Will run at |
| --- | --- | --- |
| `apps/web` | Public website, Next.js 15. A 1:1 port of the CanadianSME design prototype, filled with CMS data | `canadiansme.ca` |
| `apps/cms` | Our own CMS dashboard + API, Payload 3 on Next.js 15, login required | `cms.canadiansme.ca` |
| `packages/shared` | Code both apps use: the data contract (`site.ts`), URL shapes, article HTML renderer | — |

Both apps use **one Supabase project**: Postgres for all content, users and form submissions; Supabase
Storage (bucket `media`) for images, audio, video and PDFs. Only the CMS talks to the database. The website
only reads published content from the CMS API and posts forms to it.

```
Editors ──log in──▶ cms.canadiansme.ca (Amplify) ──▶ Supabase Postgres + Storage
                            ▲  /api/site/*  (published content, shaped for each page)
                            │  /api/forms/* (server-to-server, shared FORMS_SECRET)
Readers ──visit──▶ canadiansme.ca (Amplify) ── pages refresh from the CMS every 60 s
```

## Run it locally (do this first)

Needs Node 22.12+ (24 recommended, `.nvmrc`) and pnpm 10 (`corepack enable`).
Use an empty local Postgres or a **staging** Supabase project, never production, while testing.

```bash
pnpm install                                   # creates pnpm-lock.yaml: commit it
cp apps/cms/.env.example apps/cms/.env         # DATABASE_URL, PAYLOAD_SECRET, FORMS_SECRET, ...
cp apps/web/.env.example apps/web/.env         # CMS_URL=http://localhost:3000, same FORMS_SECRET
pnpm migrate                                   # applies the existing migrations
pnpm --filter @canadiansme/cms payload migrate:create site_sections   # once: website-sections tables
pnpm migrate                                   # applies it
pnpm generate                                  # CMS types (used by the website) + admin import map
pnpm --filter @canadiansme/cms seed:prototype  # loads the design's content, images, menus, ads
pnpm dev                                       # CMS http://localhost:3000/admin · website http://localhost:3001
```

- The first account created at `/admin` becomes the Admin.
- `FORMS_SECRET` must be the **same** random string (32+ characters) in both `.env` files:
  `openssl rand -hex 32`.
- Leave `S3_BUCKET` empty locally and uploads go to `apps/cms/public/media`.

| Command (repo root) | Does |
| --- | --- |
| `pnpm dev` / `pnpm dev:cms` / `pnpm dev:web` | Run both apps / one app |
| `pnpm build` | Build everything (Turborepo) |
| `pnpm typecheck` | Type-check shared, CMS and website |
| `pnpm migrate` | Apply CMS database migrations |
| `pnpm generate` | Regenerate CMS types and the admin import map |
| `pnpm --filter @canadiansme/cms test` | Security-rule tests and data round-trip tests (no database needed) |

## How the website and the CMS stay in sync

- Every website section has a matching place in the CMS: **Homepage** (hero, slides, spotlight, tools,
  topic cards…), **Navigation** (mega menus), **Ads & partners** (every ad slot + partner logos),
  **Advertise** page, **Site settings** (social, podcast links, sister titles, footer, editor), and
  collections for posts, authors, categories, provinces, deadlines, offers, resources, funding programs,
  magazine issues, podcast episodes, events, legal pages and form submissions.
- The website asks the CMS for `GET /api/site/<page>`; the shapes are defined once in
  `packages/shared/src/site.ts`, so a change in one app that breaks the other fails type-checking.
- Published changes appear on the website within about a minute (time-based refresh: Amplify does not
  support on-demand revalidation).
- **Preview** in the CMS shows a draft inside the real article design (`/_preview/` template).

## Security in brief

- Website: strict Content-Security-Policy, HSTS, no-sniff, frame-deny, referrer policy; forms go through
  the website's own `/api/forms/*` proxy (origin check, size cap, honeypot) and on to the CMS with a
  shared secret, so the CMS form endpoint can't be hit directly from the internet.
- CMS: login required, roles, account lock after 5 failed logins, rate-limited forms, SSRF-safe outbound
  fetches, sanitised article HTML, CASL consent stored with every newsletter sign-up.
  Details: `apps/cms/SECURITY.md`.

## Deploy later (AWS Amplify)

Two Amplify apps from this one repo; build settings are in `amplify.yml` (already in the repo).

| Amplify app | Monorepo app root | Domain (only after sign-off) | Env vars |
| --- | --- | --- | --- |
| `canadiansme-cms` | `apps/cms` | `cms.canadiansme.ca` | `apps/cms/.env.example` |
| `canadiansme-web` | `apps/web` | `canadiansme.ca` (+ `www` → apex) | `apps/web/.env.example` |

1. Supabase: public bucket `media`, an S3 access key, and the **Session pooler** connection string.
2. Create both Amplify apps from the company Git repo (monorepo, app roots above). Deploy the CMS first.
   The CMS build runs `payload migrate` before building, so the database is always migrated.
3. Until the domain switch, use the Amplify default URLs and set `SITE_NOINDEX=true` on the website.
4. Scheduled publishing: an EventBridge Scheduler (every 5 min) calling
   `GET https://<cms>/api/payload-jobs/run` with header `Authorization: Bearer <CRON_SECRET>`.
5. Full steps: `apps/cms/README.md` › "Deploy". If the CMS later needs a long-running server, the same
   app runs on EC2 with `pnpm --filter @canadiansme/cms build && pnpm --filter @canadiansme/cms start`.

## Last phase: WordPress content and files

After the design, flow and sync are signed off: load the downloaded WordPress backup (articles, authors,
categories, tags, media) into the CMS, upload the media files to Supabase Storage, then compare page by
page with the live WordPress site before switching the domain. The existing importer (`apps/cms/README.md` › "Import from WordPress") reads the live site; it will be
adapted to read the local backup in that phase.
