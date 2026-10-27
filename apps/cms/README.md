# CanadianSME CMS (backend)

The content backend that will replace WordPress for canadiansme.ca: an admin panel where the team
writes, edits and publishes articles, plus an API the new public website reads from.

Built on [Payload CMS 3](https://payloadcms.com) (Next.js) with Supabase: Postgres for data, Supabase Storage for files.
This is `apps/cms` in the CanadianSME monorepo; the public website is `apps/web` (see the root README).

> **The live WordPress site is never changed by this project.** The importer only *reads* from
> WordPress. Nothing points at this backend until you decide to switch.

## What's inside

| Area | What it is |
| --- | --- |
| **Articles** (`posts`) | Title, slug, excerpt, featured image, rich-text body, categories + primary category, tags, authors, featured / editor's pick / sponsored flags, source URL, related articles, reading time. Drafts, autosave, revision history and **scheduled publishing**. |
| **Pages** | About, Advertise, Contact, etc. |
| **Categories / Tags / Authors** | Public taxonomies and bylines (`/category/x/`, `/tag/x/`, `/author/x/`). |
| **Media** | Image library with alt text, caption, credit, focal point and resized versions. Stored in a Supabase Storage bucket in production. |
| **SEO** | Every article/page/category has an SEO tab: meta title, description, share image, canonical URL, noindex. |
| **Redirects** | Manage 301/302 redirects from the admin. |
| **Settings** | Site name, logo, social links, SEO defaults, header/footer menus. |
| **Users & roles** | Admin, Editor (all articles), Author (own articles only), Automation (API key for scripts like the Newswire workflow; drafts only by default). |
| **Security** | Login lockout, strong passwords, HTML cleaning, upload restrictions, security headers and a tamper-proof activity log. See [SECURITY.md](SECURITY.md). |

URLs match WordPress exactly (`https://canadiansme.ca/<post-slug>/`), so Google rankings are kept.

## Run it locally

Requires Node 22.12+ (or 24) and pnpm. Run commands from the repo root.

```bash
cp apps/cms/.env.example apps/cms/.env   # fill in DATABASE_URL (Supabase staging project) and PAYLOAD_SECRET
pnpm install
pnpm migrate
pnpm dev:cms               # open http://localhost:3000/admin and create the first user (becomes Admin)
```

Create the database tables with `pnpm migrate` (also after pulling changes that add migrations).

## Import from WordPress (read-only)

```bash
pnpm import:wp --limit=100      # test: categories, tags, authors + newest 100 articles
pnpm import:wp                  # full import (all ~8,750 articles + pages); can take a few hours
pnpm import:wp --only=posts --since=2026-10-20   # catch up on recent changes
pnpm import:wp --skip-media     # quick run without downloading images
```

- It only sends GET requests to WordPress and downloads image files. It never writes to WordPress.
- Safe to re-run: records are matched by WordPress ID and updated, never duplicated.
- Published content is public via the REST API. To also copy drafts, add a WordPress
  Application Password in `.env` (`WP_USERNAME`, `WP_APP_PASSWORD`).
- SEO titles/descriptions from All in One SEO are carried over.
- Author bylines come from `src/data/wp-authors.json` (public name, slug and website of the 447 WordPress
  authors, no emails), because the site's user list isn't public.
- Raw HTML is cleaned on import, so scripts or spam links injected into old posts are not copied over.
- Each article keeps its original WordPress HTML. If it contains things the editor can't show 1:1
  (inline images, embeds, tables), the "Show the original WordPress HTML" box is ticked so the website
  renders it exactly as today. Editing the article in the editor switches it over automatically.

## API for the website

REST lives at `/api`, GraphQL at `/api/graphql`. Published content is public; drafts need a login or API key.

| Need | Request |
| --- | --- |
| What's at a URL (post, page, category, tag, author, redirect) | `GET /api/resolve?path=/some-slug/` |
| Latest articles | `GET /api/posts?sort=-publishedAt&limit=12&depth=1` |
| Articles in a category | `GET /api/posts?where[categories][in]=<id>&sort=-publishedAt` |
| Sitemap data | `GET /api/posts?select[slug]=true&select[updatedAt]=true&limit=1000&page=1` |
| Settings / menus | `GET /api/globals/site-settings`, `GET /api/globals/navigation` |
| Health check | `GET /api/health` |

The website in `apps/web` imports these types with `import type { Post } from '@canadiansme/cms/types'`.

Article bodies come as Lexical JSON (`content`); render them with
`@payloadcms/richtext-lexical/react` (`<RichText data={doc.content} />`). If `useLegacyHtml` is true,
render `legacyHtml` instead.

**Cache refresh:** when content is published/changed, the CMS POSTs
`{ collection, event, paths, tags, slug }` to `FRONTEND_REVALIDATE_URL` with header
`x-revalidate-secret`. The website's endpoint calls `revalidatePath`/`revalidateTag`.

**Previews:** the admin's "Preview" button renders the draft inside the website's own article design
(the website's `/_preview/` template, filled in by `src/endpoints/sitePreview.ts`), so nothing on the
website needs draft mode.

**Automation (Newswire):** create a user with the *Automation* role, enable its API key, then
`POST /api/posts` with header `Authorization: users API-Key <key>`.

## Website data API (`/api/site/*`)

Everything the website shows comes from these GET endpoints, in the exact shapes of
`packages/shared/src/site.ts`. They are built from pure mapper functions in `src/site/` and only ever
read public, published data (no drafts, users, emails or form entries), even for a logged-in caller.

`chrome`, `home`, `post?slug=`, `list?kind=latest|category|tag&slug=&page=&sort=picks`, `author?slug=&page=`,
`issues`, `issue?slug=`, `episodes`, `episode?slug=`, `events`, `event?slug=`, `resources`, `offers`,
`province?slug=`, `legal?slug=`, `about`, `advertise`, `search?q=&limit=`, `sitemap-groups`.

Responses carry `Cache-Control: public, s-maxage=60, stale-while-revalidate=600`.

## Website forms (`POST /api/forms/:type`)

`newsletter | popup | contact | advertise | gate | offer`. Called only by the website server with the
`x-forms-secret` header (`FORMS_SECRET`, same value in both apps) and the visitor's IP in `x-client-ip`.
Validated with the same rules and messages as the design, honeypot `company_website`, 5 per minute per IP,
10 KB max. Entries land in **Forms › Form submissions** with the consent wording and time (CASL). With
`MAILCHIMP_API_KEY` + `MAILCHIMP_AUDIENCE_ID` set, people who opted in are added to Mailchimp as
"pending", so Mailchimp sends its confirmation email (double opt-in). `gate` returns `{ ok, download }`.

## Load the design's content (seed)

```bash
pnpm --filter @canadiansme/cms seed:prototype          # downloads the prototype's canadiansme.ca images
pnpm --filter @canadiansme/cms seed:prototype --skip-remote
```

Loads everything the design prototype showed — 43 sample articles, homepage sections, menus, provinces,
deadlines, offers, resources, magazine issues, podcast episodes, events, legal pages, ads and partner logos —
plus 301 redirects from old WordPress URLs. Re-running updates instead of duplicating.
`pnpm --filter @canadiansme/cms test:site` checks (without a database) that this content comes back out of
`/api/site/*` exactly as the prototype had it.

## Database migrations — generate one before first run

The new website sections added many collections and globals. Their migration must be **generated**, not
hand-written, so that Payload's schema snapshot stays in step. Once, on your machine:

```bash
# an empty local Postgres or a fresh Supabase *staging* project in DATABASE_URL
pnpm migrate                                                    # applies the two existing migrations
pnpm --filter @canadiansme/cms payload migrate:create site_sections
pnpm migrate                                                    # applies the new one
git add apps/cms/src/migrations && git commit -m "Migration: website sections"
```

Check the generated file creates `homepage`, `ads`, `advertise`, `provinces`, `deadlines`, `offers`,
`resources`, `funding_programs`, `magazine_issues`, `podcast_episodes`, `events`, `legal_pages`,
`submissions` (+ their array tables) and replaces `navigation_header*` / `navigation_footer*` with
`navigation_mega_menus*`. CI then fails if a later schema change has no migration.

## Deploy (AWS Amplify + Supabase)

1. **Supabase:** create the project (Canada region if available). *Storage*: a **public** bucket `media`;
   *Storage › S3 Connection*: an access key. *Connect › Session pooler* string → `DATABASE_URL`.
2. **Amplify app for the CMS** (Hosting › Host web app › your Git provider › monorepo):
   - App root: `apps/cms` (Amplify sets `AMPLIFY_MONOREPO_APP_ROOT=apps/cms`)
   - Build image: Amazon Linux 2023, Node 22 (or 24)
   - Build settings (`amplify.yml`, appRoot `apps/cms`):
     ```yaml
     preBuild:  [ "corepack enable", "corepack prepare pnpm@10 --activate", "pnpm install --frozen-lockfile" ]
     build:     [ "pnpm run ci" ]          # payload migrate, then next build
     artifacts: baseDirectory .next, files **/*
     cache:     .next/cache/**/*, node_modules/**/*
     ```
   - Environment variables: everything in `.env.example` (`DATABASE_URL`, `PAYLOAD_SECRET`,
     `NEXT_PUBLIC_SERVER_URL=https://cms.canadiansme.ca`, `NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL`, `S3_*`,
     `CRON_SECRET`, `FORMS_SECRET`, `WEBSITE_URL`, optional `MAILCHIMP_*`). Amplify only passes env vars to the
     Next.js server if they are written at build time: add `env | grep -E '^(DATABASE_URL|PAYLOAD_SECRET|S3_|SUPABASE_URL|CRON_SECRET|FORMS_SECRET|MAILCHIMP_|WEBSITE_URL|NEXT_PUBLIC_|CORS_ORIGINS|AUTOMATION_CAN_PUBLISH|DATABASE_POOL_MAX|DATABASE_CA_CERT)' >> .env.production`
     as the first build command.
   - Custom domain: `cms.canadiansme.ca`.
   - `payload migrate` runs in every build, so the database is migrated before the new code goes live.
3. **Scheduled publishing:** Amplify has no cron. Create an **EventBridge Scheduler** schedule (rate 5 minutes)
   with an *API destination* target: `GET https://cms.canadiansme.ca/api/payload-jobs/run`, connection with
   API-key auth, header `Authorization`, value `Bearer <CRON_SECRET>`.
4. **On-demand revalidation:** Amplify doesn't support it, so leave `FRONTEND_REVALIDATE_URL` empty; the
   website refreshes its pages on a short timer instead.
5. Long jobs (WordPress import, seed) run from your machine against the production database, not on Amplify.

## Automated tests

Every push to `main` runs `.github/workflows/ci.yml` on GitHub: install, dependency audit, type-check,
database migration, production build, 29 security and function tests (`tests/smoke.mjs`), and a
read-only test import of the 15 newest WordPress articles. Results are published to the `ci-results` branch.
