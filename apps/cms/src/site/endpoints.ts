/**
 * GET /api/site/*  — the website's data, in the exact shapes of packages/shared/src/site.ts.
 *
 * Security: every query runs WITHOUT a user (`overrideAccess: false`, no `req`), so only what the
 * public may read comes back — published documents only, never drafts, users, submissions or
 * audit logs — even when the caller is logged in to the CMS. Responses only contain the fields the
 * mappers copy, so emails, createdBy, wpId etc. never leave the CMS.
 */
import type { Endpoint, Payload, PayloadRequest, Where } from 'payload'

import { getServerURL, getSiteURL } from '../utilities/revalidate'
import { LEGAL_SLUGS } from '../collections/site/LegalPages'
import { toHomeData } from './home'
import { toListData, toPostData } from './post'
import {
  postResult,
  rankResults,
  searchTerms,
  toAdvertiseData,
  toAuthorData,
  toChromeData,
  toEpisode,
  toEvent,
  toIssue,
  toLegalData,
  toProvinceData,
  toResourceGroups,
  toSitemapGroups,
} from './pages'
import { offersOf, programsOf } from './home'
import { obj, rows, str, type Doc } from './common'

const PUBLIC = { overrideAccess: false as const, draft: false as const }
const PER_PAGE = 12
const CACHE = 'public, s-maxage=60, stale-while-revalidate=600'

const CARD_SELECT = {
  title: true,
  slug: true,
  excerpt: true,
  featuredImage: true,
  publishedAt: true,
  primaryCategory: true,
  categories: true,
  authors: true,
  readingTime: true,
  isSponsored: true,
} as const

const published: Where = { _status: { equals: 'published' } }
const and = (...w: (Where | undefined)[]): Where => ({ and: w.filter(Boolean) as Where[] })

const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': status === 200 ? CACHE : 'public, s-maxage=30' } })
const notFound = (what: string) => json({ error: `${what} not found` }, 404)

const param = (req: PayloadRequest, name: string) => (new URL(req.url || '', 'http://x').searchParams.get(name) || '').trim()
const slugParam = (req: PayloadRequest) => {
  const s = param(req, 'slug').toLowerCase()
  return /^[a-z0-9][a-z0-9-]{0,199}$/.test(s) ? s : ''
}
const pageParam = (req: PayloadRequest) => Math.min(1000, Math.max(1, Number(param(req, 'page')) || 1))

const ctx = () => ({ base: getServerURL(), site: getSiteURL() })

async function findOne(payload: Payload, collection: any, where: Where, depth = 1): Promise<Doc | null> {
  const r = await payload.find({ collection, where, limit: 1, depth, pagination: false, ...PUBLIC })
  return (r.docs[0] as Doc) ?? null
}
async function findAll(payload: Payload, collection: any, opts: { where?: Where; sort?: string; depth?: number; limit?: number } = {}) {
  const r = await payload.find({
    collection,
    where: opts.where,
    sort: opts.sort,
    depth: opts.depth ?? 1,
    limit: opts.limit ?? 200,
    pagination: false,
    ...PUBLIC,
  })
  return r.docs as Doc[]
}
const posts = (payload: Payload, where: Where | undefined, limit: number, page = 1) =>
  payload.find({
    collection: 'posts',
    where: and(published, where),
    sort: '-publishedAt',
    limit,
    page,
    depth: 1,
    select: CARD_SELECT,
    ...PUBLIC,
  })
const global = (payload: Payload, slug: any, depth = 1) => payload.findGlobal({ slug, depth, ...PUBLIC }) as Promise<Doc>

const handler =
  (fn: (req: PayloadRequest) => Promise<Response>) =>
  async (req: PayloadRequest): Promise<Response> => {
    try {
      return await fn(req)
    } catch (err) {
      req.payload.logger.error(`site api ${req.url}: ${(err as Error).message}`)
      return Response.json({ error: 'Server error' }, { status: 500 })
    }
  }

const ep = (name: string, fn: (req: PayloadRequest) => Promise<Response>): Endpoint => ({
  path: `/site/${name}`,
  method: 'get',
  handler: handler(fn),
})

export const siteEndpoints: Endpoint[] = [
  ep('chrome', async (req) => {
    const p = req.payload
    const [nav, settings, issue, ads] = await Promise.all([
      global(p, 'navigation', 0),
      global(p, 'site-settings', 1),
      findAll(p, 'magazine-issues', { where: published, sort: '-number', limit: 1, depth: 0 }).then((d) => d[0] ?? null),
      global(p, 'ads', 1),
    ])
    return json(toChromeData(nav, settings, issue, ads, ctx().base))
  }),

  ep('home', async (req) => {
    const p = req.payload
    const { base } = ctx()
    const [homepage, ads, latest, deadlines, provinces, offers, fundingPrograms] = await Promise.all([
      global(p, 'homepage', 2),
      global(p, 'ads', 0),
      posts(p, undefined, 12).then((r) => r.docs as Doc[]),
      findAll(p, 'deadlines', { sort: 'date', depth: 0 }),
      findAll(p, 'provinces', { sort: 'order', depth: 0, limit: 50 }),
      findAll(p, 'offers', { sort: 'order', depth: 1, limit: 100 }),
      findAll(p, 'funding-programs', { sort: 'order', depth: 0 }),
    ])
    const idsOf = (v: unknown) => rows(v).map((c) => (obj(c) ? obj(c)!.id : c)).filter(Boolean)
    const topicStats = await Promise.all(
      rows(homepage.topicCards).map(async (t) => {
        const ids = idsOf(t.categories)
        if (!ids.length) return { count: 0, latest: null }
        const r = await posts(p, { categories: { in: ids } }, 1)
        return { count: r.totalDocs, latest: (r.docs[0] as Doc) ?? null }
      }),
    )
    const communityPosts = await Promise.all(
      rows(homepage.communities).map(async (c) => {
        const id = obj(c.category)?.id ?? c.category
        const picked = obj(c.lead)?.post || rows(c.more).length
        if (!id || picked) return []
        return (await posts(p, { categories: { in: [id] } }, 3)).docs as Doc[]
      }),
    )
    return json(
      toHomeData({ homepage, ads, latest, deadlines, provinces, offers, fundingPrograms, topicStats, communityPosts, now: new Date(), base }),
    )
  }),

  ep('post', async (req) => {
    const slug = slugParam(req)
    if (!slug) return notFound('Article')
    const p = req.payload
    const { base, site } = ctx()
    const post = await findOne(p, 'posts', and(published, { slug: { equals: slug } }), 2)
    if (!post) return notFound('Article')
    const catId = obj(post.primaryCategory)?.id ?? obj(rows(post.categories)[0])?.id
    const [same, newest] = await Promise.all([
      catId ? posts(p, { categories: { in: [catId] } }, 5).then((r) => r.docs as Doc[]) : Promise.resolve([]),
      posts(p, undefined, 5).then((r) => r.docs as Doc[]),
    ])
    return json(toPostData(post, same, newest, base, site))
  }),

  ep('list', async (req) => {
    const kind = param(req, 'kind')
    const page = pageParam(req)
    const p = req.payload
    const { base, site } = ctx()
    if (kind !== 'latest' && kind !== 'category' && kind !== 'tag') return json({ error: 'kind must be latest, category or tag' }, 400)
    let term: Doc | null = null
    let where: Where | undefined = param(req, 'sort') === 'picks' ? { isEditorsPick: { equals: true } } : undefined
    if (kind !== 'latest') {
      const slug = slugParam(req)
      term = slug ? await findOne(p, kind === 'category' ? 'categories' : 'tags', { slug: { equals: slug } }, 0) : null
      if (!term) return notFound(kind === 'category' ? 'Category' : 'Tag')
      where = and({ [kind === 'category' ? 'categories' : 'tags']: { in: [term.id] } }, where)
    }
    const r = await posts(p, where, PER_PAGE, page)
    if (page > 1 && page > r.totalPages) return notFound('Page')
    return json(toListData({ kind, term, docs: r.docs as Doc[], page, totalPages: r.totalPages, total: r.totalDocs, base, site }))
  }),

  ep('author', async (req) => {
    const slug = slugParam(req)
    const p = req.payload
    const { base, site } = ctx()
    const author = slug ? await findOne(p, 'authors', { slug: { equals: slug } }, 1) : null
    if (!author) return notFound('Author')
    const page = pageParam(req)
    const [r, contributors] = await Promise.all([
      posts(p, { authors: { in: [author.id] } }, PER_PAGE, page),
      findAll(p, 'authors', { where: { jobTitle: { exists: true } }, sort: 'name', depth: 1, limit: 21 }),
    ])
    return json(toAuthorData(author, r.docs as Doc[], contributors.slice(0, 20), page, r.totalPages, base, site))
  }),

  ep('issues', async (req) => {
    const { base } = ctx()
    const docs = await findAll(req.payload, 'magazine-issues', { where: published, sort: '-number', limit: 200 })
    return json({ issues: docs.map((d) => toIssue(d, base)) })
  }),
  ep('issue', async (req) => {
    const slug = slugParam(req)
    const { base, site } = ctx()
    const d = slug ? await findOne(req.payload, 'magazine-issues', and(published, { slug: { equals: slug } })) : null
    if (!d) return notFound('Issue')
    const issue = toIssue(d, base)
    return json({ issue, seo: { title: `${issue.title} — ${issue.month}`, description: issue.desc, canonical: `${site}${issue.href}`, noIndex: false, image: issue.cover } })
  }),

  ep('episodes', async (req) => {
    const { base } = ctx()
    const [docs, settings] = await Promise.all([
      findAll(req.payload, 'podcast-episodes', { where: published, sort: '-number', limit: 200 }),
      global(req.payload, 'site-settings', 0),
    ])
    const s = obj(settings.social) || {}
    return json({ episodes: docs.map((d) => toEpisode(d, base)), links: { spotify: str(s.spotify), apple: str(s.apple), youtube: str(s.podcastYoutube) } })
  }),
  ep('episode', async (req) => {
    const slug = slugParam(req)
    const { base, site } = ctx()
    const d = slug ? await findOne(req.payload, 'podcast-episodes', and(published, { slug: { equals: slug } })) : null
    if (!d) return notFound('Episode')
    const episode = toEpisode(d, base)
    return json({ episode, seo: { title: `Episode ${episode.number}: ${episode.title}`, description: episode.desc, canonical: `${site}${episode.href}`, noIndex: false, image: episode.art } })
  }),

  ep('events', async (req) => {
    const { base } = ctx()
    const docs = await findAll(req.payload, 'events', { where: published, sort: 'order', limit: 100 })
    return json({ events: docs.map((d) => toEvent(d, base)) })
  }),
  ep('event', async (req) => {
    const slug = slugParam(req)
    const { base } = ctx()
    const d = slug ? await findOne(req.payload, 'events', and(published, { slug: { equals: slug } })) : null
    if (!d) return notFound('Event')
    return json({ event: toEvent(d, base) })
  }),

  ep('resources', async (req) => {
    const { base } = ctx()
    const docs = await findAll(req.payload, 'resources', { sort: 'order', limit: 300 })
    return json({ resourceGroups: toResourceGroups(docs, base) })
  }),

  ep('offers', async (req) => {
    const { base } = ctx()
    const docs = await findAll(req.payload, 'offers', { sort: 'order', limit: 200 })
    return json({ offers: offersOf(docs, new Date(), base) })
  }),

  ep('province', async (req) => {
    const slug = slugParam(req)
    const { base, site } = ctx()
    const all = await findAll(req.payload, 'provinces', { sort: 'order', depth: 1, limit: 50 })
    const d = all.find((x) => x.slug === slug)
    if (!d) return notFound('Province')
    return json(toProvinceData(d, all, base, site))
  }),

  ep('legal', async (req) => {
    const slug = param(req, 'slug')
    const { site } = ctx()
    if (!(LEGAL_SLUGS as readonly string[]).includes(slug)) return notFound('Page')
    const all = await findAll(req.payload, 'legal-pages', { depth: 0, limit: 10 })
    const order = (s: string) => (LEGAL_SLUGS as readonly string[]).indexOf(s)
    all.sort((a, b) => order(a.slug) - order(b.slug))
    const d = all.find((x) => x.slug === slug)
    if (!d) return notFound('Page')
    return json(toLegalData(d, all, site))
  }),

  ep('about', async (req) => {
    const { base } = ctx()
    const h = await global(req.payload, 'homepage', 1)
    return json({ programs: programsOf(rows(h.programs), base) })
  }),

  ep('advertise', async (req) => {
    const { base } = ctx()
    return json(toAdvertiseData(await global(req.payload, 'advertise', 1), base))
  }),

  ep('sitemap-groups', async (req) => {
    const [settings, provinces] = await Promise.all([
      global(req.payload, 'site-settings', 0),
      findAll(req.payload, 'provinces', { sort: 'name', depth: 0, limit: 50 }),
    ])
    return json({ groups: toSitemapGroups(settings, provinces) })
  }),

  ep('search', async (req) => {
    const q = param(req, 'q').slice(0, 100)
    const limit = Math.min(60, Math.max(1, Number(param(req, 'limit')) || 20))
    const terms = searchTerms(q)
    if (!terms.length) return json({ results: [], total: 0 })
    const p = req.payload
    // Every term must appear in the title or the excerpt (Postgres ILIKE through Payload's `like`).
    const match: Where = { and: terms.map((t): Where => ({ or: [{ title: { like: t } } as Where, { excerpt: { like: t } } as Where] })) }
    const [r, provinces, legal, settings] = await Promise.all([
      posts(p, match, 60),
      findAll(p, 'provinces', { depth: 0, limit: 50 }),
      findAll(p, 'legal-pages', { depth: 0, limit: 10 }),
      global(p, 'site-settings', 0),
    ])
    const fixed = toSitemapGroups(settings, []).flatMap((g) =>
      g.links.map((l) => ({ kind: 'Page', meta: g.title, title: l.label, desc: '', href: l.href, body: g.title })),
    )
    const others = [
      ...provinces.map((d) => ({
        kind: 'Province guide',
        meta: 'Start a business · statistics · resources',
        title: `${str(d.name)}: business guide`,
        desc: str(obj(d.about)?.ind),
        href: `/provinces/${str(d.slug)}/`,
        body: `${str(d.intro)} ${rows(d.watch).map((w) => str(w.text)).join(' ')} ${str(d.hubSummary)}`,
      })),
      ...legal.map((d) => ({
        kind: 'Policy',
        meta: 'Legal',
        title: str(d.title),
        desc: `${str(d.intro).slice(0, 160)}…`,
        href: `/${str(d.slug)}/`,
        body: rows(d.sections).map((s) => `${str(s.h)} ${rows(s.ps).map((x) => str(x.text)).join(' ')}`).join(' '),
      })),
      ...fixed,
    ]
    const postItems = (r.docs as Doc[]).map((d) => ({ ...postResult(d), body: '' }))
    const ranked = rankResults(q, [...postItems, ...others], limit)
    const otherHits = rankResults(q, others, 1000).length
    return json({ results: ranked, total: r.totalDocs + otherHits })
  }),
]
