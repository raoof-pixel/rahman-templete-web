/**
 * Turns the design prototype's data (prototype-data.json) into CMS documents.
 *
 * Pure: no Payload, no database. Relations are written as refs ({ $ref, key }) that the seed script
 * (src/scripts/seed-prototype.ts) resolves to document IDs, and the round-trip test resolves to the
 * documents themselves. Homepage story slots only store an override when the prototype's value differs
 * from what the article itself would show, so editors can update articles and the homepage follows.
 */
import { protoHref, PROTO_EVENT } from '@canadiansme/shared'

import { story } from '../site/story'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Ref = { $ref: 'media' | 'categories' | 'authors' | 'posts'; key: string }
export type MediaSeed = { key: string; url?: string; file?: string; alt: string }
export type Proto = Record<string, any>

export const ref = ($ref: Ref['$ref'], key: string): Ref => ({ $ref, key })
export const isRef = (v: unknown): v is Ref => Boolean(v && typeof v === 'object' && '$ref' in (v as object))

const slugify = (v: string) =>
  v
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/['`"\p{Pi}\p{Pf}]/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Category titles in the prototype -> the live WordPress category slugs (keeps URLs). */
const CATEGORY_SLUGS: Record<string, string> = {
  Leadership: 'small-business-leadership',
  'Finance for Small Businesses': 'finance-for-small-businesses',
  'Small Business': 'small-business',
  'Latest News': 'latest-news',
  'Women Entrepreneurs': 'women-entrepreneurship',
  'Business Woman Of The Month': 'business-woman-of-the-month',
  Cybersecurity: 'cybersecurity-for-small-businesses',
  'LGBTQ+ Businesses': 'lgbtq-businesses',
  'UPS Small Business of the Day': 'ups-small-business-of-the-day',
}
export const categorySlug = (title: string) => CATEGORY_SLUGS[title] || slugify(title)
export const stripSponsored = (cat: string) => cat.replace(/^Sponsored · /, '')

/** Prototype links -> real URLs (adds the Tools page, which the prototype kept in another file). */
export const convHref = (href: string | undefined | null) => {
  if (!href) return ''
  const tool = href.match(/^CanadianSME Tools\.dc\.html#(\w+)$/)
  if (tool) return `/tools/${tool[1]}/`
  if (href === '#') return ''
  return protoHref(href)
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthIndex = (m: string) => MONTHS.findIndex((x) => x.toLowerCase().startsWith(m.slice(0, 3).toLowerCase()))
/** "October 9, 2026" / "Oct 9, 2026" -> ISO at noon Toronto time (so the day never shifts). */
export const isoFromText = (text: string): string | null => {
  const m = text.match(/^([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})$/)
  if (!m) return null
  const mi = monthIndex(m[1])
  if (mi < 0) return null
  return new Date(Date.UTC(Number(m[3]), mi, Number(m[2]), 16, 0, 0)).toISOString()
}
const minutesOf = (read: string) => Number((read || '').match(/(\d+)/)?.[1]) || null

export type Seed = {
  media: MediaSeed[]
  categories: { key: string; title: string; slug: string }[]
  authors: { key: string; name: string; slug: string; jobTitle: string; bio: string }[]
  posts: Record<string, any>[]
  provinces: Record<string, any>[]
  deadlines: Record<string, any>[]
  offers: Record<string, any>[]
  resources: Record<string, any>[]
  fundingPrograms: Record<string, any>[]
  issues: Record<string, any>[]
  episodes: Record<string, any>[]
  events: Record<string, any>[]
  legalPages: Record<string, any>[]
  globals: {
    homepage: Record<string, any>
    navigation: Record<string, any>
    siteSettings: Record<string, any>
    advertise: Record<string, any>
    ads: Record<string, any>
  }
  redirects: { from: string; to: string }[]
}

/** Local image files that ship with the seed (relative to src/seed/images). */
export type LocalFiles = { slots: string[]; covers: string[] }

export function transform(d: Proto, files: LocalFiles = { slots: [], covers: [] }): Seed {
  const media = new Map<string, MediaSeed>()
  const remote = (url: string, alt: string): Ref | null => {
    if (!url) return null
    if (!media.has(url)) media.set(url, { key: url, url, alt })
    return ref('media', url)
  }
  const local = (file: string, alt: string): Ref => {
    if (!media.has(file)) media.set(file, { key: file, file, alt })
    return ref('media', file)
  }
  const slotFile = (slot: string) => files.slots.find((f) => f.replace(/\.\w+$/, '') === slot)

  /* ---------- categories & authors ---------- */
  const catTitles = new Set<string>()
  Object.values<any>(d.POSTS).forEach((p) => catTitles.add(stripSponsored(p.cat || '')))
  d.TOPIC_CARDS.forEach((t: any) => t.cats.forEach((c: string) => catTitles.add(stripSponsored(c))))
  catTitles.delete('')
  const categories = [...catTitles].map((title) => ({ key: title, title, slug: categorySlug(title) }))

  const AUTHOR_INFO: Record<string, { name: string; role: string; bio: string }> = {
    ...d.AUTHORS,
    'SK Uddin': {
      name: 'SK Uddin',
      role: 'Editor & Publisher',
      bio: 'SK Uddin is the Editor & Publisher of CanadianSME Small Business Magazine, where he sets the editorial direction across the magazine, podcast, awards, and events. He writes on entrepreneurship, technology adoption, and the policy and financing decisions that shape Canadian small business growth.',
    },
  }
  const authorNames = new Set<string>(Object.values<any>(d.POSTS).map((p) => p.author).filter(Boolean))
  const authors = [...authorNames].map((key) => {
    const info = AUTHOR_INFO[key]
    const name = info?.name || key
    return { key, name, slug: key === 'CanadianSME' ? 'canadiansme' : slugify(name), jobTitle: info?.role || '', bio: info?.bio || '' }
  })

  /* ---------- posts ---------- */
  const posts = Object.entries<any>(d.POSTS).map(([slug, p], i) => {
    const cat = stripSponsored(p.cat || '')
    return {
      key: slug,
      slug,
      title: p.title,
      excerpt: p.excerpt || null,
      publishedAt: isoFromText(p.date) || new Date(Date.UTC(2026, 0, 1, 16)).toISOString(),
      legacyHtml: p.html || '',
      useLegacyHtml: true,
      sourceUrl: /^https?:\/\//.test(p.source || '') ? p.source : null,
      isSponsored: /^Sponsored/.test(p.cat || ''),
      readingTime: minutesOf(p.read),
      featuredImage: remote(p.img, p.alt || p.title),
      categories: cat ? [ref('categories', cat)] : [],
      primaryCategory: cat ? ref('categories', cat) : null,
      authors: p.author ? [ref('authors', p.author)] : [],
      _status: 'published',
      _order: i,
    }
  })
  const postBySlug = new Map(posts.map((p) => [p.slug, p]))
  const postSlugOf = (href: string) => (href?.startsWith('#post-') && postBySlug.has(href.slice(6)) ? href.slice(6) : null)

  /** Same view of a post the mappers get (relations populated), for override decisions. */
  const mediaView = (r: Ref | null) => (r ? { url: media.get(r.key)?.url || `/seed/${r.key}`, alt: media.get(r.key)?.alt || '' } : null)
  const catView = (r: Ref | null) => (r ? { title: r.key, slug: categorySlug(r.key) } : null)
  const postView = (slug: string) => {
    const p = postBySlug.get(slug)!
    return { ...p, featuredImage: mediaView(p.featuredImage), primaryCategory: catView(p.primaryCategory), categories: p.categories.map(catView) }
  }

  /** Story slot: pick the article and keep only the overrides that differ from it. */
  const slot = (item: any, fields: string[], opts: { dateFmt?: 'long' | 'short' } = {}) => {
    const slug = postSlugOf(item.href)
    const out: Record<string, any> = { post: slug ? ref('posts', slug) : null }
    const derived: Record<string, string> = slug ? story({ post: postView(slug) }, '', opts) : {}
    for (const f of fields) {
      const want = f === 'href' ? convHref(item.href) : item[f] ?? ''
      if (f === 'img') {
        if (item.img && derived.img !== item.img) {
          out.image = remote(item.img, item.alt || item.title || '')
        }
        continue
      }
      if (want !== (derived[f] ?? '')) out[f] = want
    }
    if (!slug && !out.href && item.href) out.href = convHref(item.href)
    return out
  }

  /* ---------- homepage ---------- */
  const homepage = {
    slides: d.SLIDES.map((s: any) => ({
      logo: remote(s.logo, s.logoAlt),
      logoAlt: s.logoAlt,
      lines: s.lines.join('\n'),
      cta: s.cta,
      href: convHref(s.href),
      bg: s.bg,
      image: remote(s.img, s.alt),
      alt: s.alt,
    })),
    hero: slot(d.HERO, ['cat', 'title', 'excerpt', 'date', 'read', 'img', 'alt', 'href'], { dateFmt: 'long' }),
    secondary: d.SECONDARY.map((s: any, i: number) => {
      const file = slotFile(`sec-${i + 1}`)
      return {
        sponsor: s.sponsor,
        cat: s.cat,
        title: s.title,
        excerpt: s.excerpt,
        placeholder: s.placeholder,
        href: convHref(s.href),
        image: file ? local(`slots/${file}`, s.placeholder) : null,
        post: null,
      }
    }),
    aiTopic: {
      lead: slot(d.AI_TOPIC.lead, ['title', 'excerpt', 'date', 'read', 'img', 'alt', 'href']),
      more: d.AI_TOPIC.more.map((m: any) => slot(m, ['title', 'excerpt', 'date', 'read', 'img', 'alt', 'href'])),
    },
    spotlight: slot(d.SPOTLIGHT, ['title', 'excerpt', 'img', 'alt', 'href']),
    mostRead: d.MOST_READ.map((m: any) => {
      const slug = postSlugOf(m.href)
      const own = slug ? postBySlug.get(slug)!.title : ''
      return { post: slug ? ref('posts', slug) : null, title: m.title !== own ? m.title : null, href: slug ? null : convHref(m.href) }
    }),
    wotm: {
      month: d.WOTM.month,
      name: d.WOTM.name,
      role: d.WOTM.role,
      kicker: d.WOTM.kicker,
      ...slot(d.WOTM, ['excerpt', 'img', 'alt', 'href']),
    },
    tools: d.TOOLS.map((t: any) => ({ mark: t.mark, title: t.title, desc: t.desc, href: convHref(t.href) })),
    topicCards: d.TOPIC_CARDS.map((t: any) => ({
      name: t.name,
      desc: t.desc,
      href: convHref(t.href),
      categories: t.cats.map((c: string) => ref('categories', stripSponsored(c))),
      ink: t.ink,
      tint: t.tint,
      line: t.line,
    })),
    communities: d.COMMUNITIES.map((c: any) => {
      const catKey = ({ '#women': 'Women Entrepreneurs', '#indigenous': 'Indigenous', '#lgbtq': 'LGBTQ+ Businesses' } as Record<string, string>)[c.href]
      return {
        heading: c.heading,
        slot: c.slot,
        category: catKey && catTitles.has(catKey) ? ref('categories', catKey) : null,
        href: convHref(c.href),
        lead: slot(c.lead, ['title', 'excerpt', 'img', 'alt', 'href']),
        more: c.more.map((m: any) => {
          const slug = postSlugOf(m.href)
          const own = slug ? postBySlug.get(slug)!.title : ''
          return { post: slug ? ref('posts', slug) : null, title: m.title !== own ? m.title : null, href: slug ? null : convHref(m.href) }
        }),
      }
    }),
    programs: d.PROGRAMS.map((p: any) => ({ slot: p.slot, title: p.title, desc: p.desc, image: p.image, href: convHref(p.href), cta: p.cta, photo: null })),
    finderNeeds: d.FINDER_NEEDS.map(([key, label]: [string, string]) => ({ key, label })),
  }

  /* ---------- provinces ---------- */
  const hub = new Map<string, string>(d.PROVINCE_HUB.map((h: any) => [h.href.slice(1), h.watch]))
  const provinces = Object.entries<any>(d.PROVINCE_PAGES).map(([slug, p], i) => ({
    key: slug,
    slug,
    name: p.name,
    code: p.code,
    order: i,
    intro: p.intro,
    hubSummary: hub.get(slug) || null,
    facts: p.facts.map(([label, value, note]: string[]) => ({ label, value, note })),
    watch: p.watch.map((text: string) => ({ text })),
    comply: p.comply,
    fund: p.fund,
    agencyName: d.FINDER_AGENCIES[p.code]?.[0] || null,
    agencyUrl: d.FINDER_AGENCIES[p.code]?.[1] || null,
    about: {
      cap: p.about.cap,
      city: p.about.city,
      ind: p.about.ind,
      stats: p.about.stats.map(([value, label, note]: string[]) => ({ value, label, note })),
      chamberName: p.about.chamber[0],
      chamberUrl: p.about.chamber[1],
    },
    premier: p.premier,
    cabinet: p.cabinet,
    sbMinName: p.sbMin ? p.sbMin[0] : null,
    sbMinRole: p.sbMin ? p.sbMin[1] : null,
    start: p.start.map((s: any) => ({ h: s.h, t: s.t, linkLabel: s.l?.label || null, linkHref: s.l?.href || null })),
    article: { title: p.article.title, sections: p.article.sections.map((s: any) => ({ h: s.h || null, ps: s.ps.map((text: string) => ({ text })) })) },
  }))

  /* ---------- deadlines (month-day only in the prototype: assign years in order) ---------- */
  let year = 2026
  let lastMonth = -1
  const deadlines = d.DEADLINES.map((x: any) => {
    const [mon, day] = x.date.split(/\s+/)
    const mi = monthIndex(mon)
    if (mi < lastMonth) year++
    lastMonth = mi
    return { key: `${x.date}|${x.title}`, date: new Date(Date.UTC(year, mi, Number(day), 16)).toISOString(), title: x.title, who: x.who }
  })

  /* ---------- offers, resources, funding ---------- */
  const offers = d.OFFERS.map((o: any, i: number) => {
    const iso = isoFromText(String(o.expires).replace(/^Ends\s+/, ''))
    return {
      key: o.slot,
      title: o.title,
      partner: o.partner,
      cat: o.cat,
      value: o.value,
      desc: o.desc,
      code: o.code,
      href: convHref(o.href) || null,
      expiresAt: iso,
      expiresLabel: iso ? null : o.expires,
      active: true,
      order: i,
    }
  })
  const GROUPS = ['start', 'money', 'growth', 'operations']
  let order = 0
  const resources = d.RESOURCE_GROUPS.flatMap((g: any, gi: number) =>
    g.items.map((it: any) => {
      const file = slotFile(it.slot)
      return {
        key: it.href.replace(/^#/, ''),
        slot: it.slot,
        externalUrl: convHref(it.href) === `/resources/${it.href}` ? null : convHref(it.href),
        title: it.title,
        group: GROUPS[gi],
        kind: it.kind,
        desc: it.desc,
        imageLabel: it.image,
        cover: file ? local(`slots/${file}`, it.image) : null,
        gated: true,
        order: order++,
      }
    }),
  )
  const fundingPrograms = d.FINDER_PROGRAMS.map((p: any, i: number) => ({ key: p.name, name: p.name, tag: p.tag, desc: p.desc, href: p.href, need: p.need, order: i }))

  /* ---------- magazine, podcast, events (from the prototype pages' text) ---------- */
  const cover = (n: number) => {
    const f = files.covers.find((c) => c.startsWith(`issue-${n}-`))
    return f ? local(`assets/covers/${f}`, `CanadianSME magazine, issue ${n}`) : null
  }
  const ISSUES = [
    [93, 'August 2026', 'Elect Respect: Leading with Civility in Business', 'Marianne Meed Ward'],
    [87, 'February 2026', 'Black History Month — Chelsea Jambo on Wellness, Women and Breaking Barriers', 'Chelsea Jambo'],
    [84, 'November 2025', 'Empowering Entrepreneurs: Gauvreau’s Growth Journey', ''],
    [81, 'August 2025', 'Breaking Barriers: Confidence and Representation in Leadership', ''],
    [37, 'December 2021', 'Up-Close: Personal Interaction with Shahrzad Rafati', 'Shahrzad Rafati'],
  ] as const
  const issues = ISSUES.map(([number, month, title, person]) => ({
    key: String(number),
    number,
    month,
    slug: slugify(month),
    issueDate: isoFromText(`${month.split(' ')[0]} 1, ${month.split(' ')[1]}`),
    title,
    desc: 'Interviews, practical growth advice, emerging trends, and stories from the entrepreneurs shaping Canada’s future.',
    cover: cover(number),
    coverAlt: `CanadianSME Small Business Magazine, ${month}${person ? `, featuring ${person}` : ''}`,
    readUrl: 'https://issuu.com/canadiansme',
    inside:
      number === 93
        ? [
            { title: 'From AI Curiosity to Business Results', meta: 'Cover story · 9 min', href: null },
            { title: 'Building Opportunity Through Inclusive Leadership', meta: 'Interview · 11 min', href: null },
            { title: 'Seven Cash-Flow Habits That Support Sustainable Growth', meta: 'Finance · 6 min', href: null },
            { title: 'Building an Export-Ready Canadian Business', meta: 'Global trade · 9 min', href: null },
          ]
        : [],
    _status: 'published',
  }))

  const EPISODES = [
    [142, 'Turning AI into a Practical Small Business Advantage', 'Aug 6, 2026', '34 min', '34:02', 'Picking a first pilot, setting a policy, and measuring the result in business terms.'],
    [141, 'Building a Brand Customers Remember', 'Jul 30, 2026', '29 min', '', 'What distinctive positioning looks like for a business without a marketing department.'],
    [140, 'Finding the Right Funding for Your Next Stage of Growth', 'Jul 23, 2026', '41 min', '', 'Debt, grants, and equity — matching the instrument to the stage of the business.'],
  ] as const
  const episodes = EPISODES.map(([number, title, date, duration, length, desc]) => ({
    key: String(number),
    number,
    title,
    slug: `${number}-${slugify(title)}`,
    date: isoFromText(date),
    duration,
    length: length || null,
    desc,
    notesIntro:
      number === 142
        ? 'The conversation covers how to choose a first use case, what governance a ten-person company actually needs, and why the second pilot usually goes better than the first.'
        : null,
    notes:
      number === 142
        ? [
            { t: '02:10', text: 'Where the returns actually show up' },
            { t: '11:48', text: 'Writing a one-page acceptable use policy' },
            { t: '21:05', text: 'Retiring a pilot without losing momentum' },
            { t: '29:30', text: 'What to tell your lender about AI spending' },
          ]
        : [],
    _status: 'published',
  }))

  const EXPECT = [
    'Keynotes from founders who have scaled across provinces',
    'Workshops on financing, AI adoption, hiring, and exporting',
    'One-to-one meetings with partners, lenders, and service providers',
    'An evening reception with the CanadianSME community',
  ].map((text) => ({ text }))
  const INTRO =
    'A full day built for owners and operators: practical sessions, candid panels, and structured networking with peers who run businesses of a similar size and stage.'
  const events = [
    {
      key: 'show',
      name: 'CanadianSME Small Business Show 2027',
      slug: PROTO_EVENT.show,
      kicker: 'MAY 21, 2027 · TORONTO',
      desc: 'Connecting entrepreneurs with solutions, resources, partners, and new opportunities on the exhibition floor.',
      imageAlt: 'Trade show floor',
      dateText: 'May 21, 2027',
      venue: 'Toronto',
    },
    {
      key: 'awards',
      name: 'CanadianSME Small Business Awards',
      slug: PROTO_EVENT.awards,
      kicker: 'June 2027 · Virtual event',
      desc: 'Celebrating the achievements and contributions of Canada’s outstanding small businesses. Nominations close September 30.',
      imageAlt: 'Awards stage',
      dateText: 'June 2027',
      venue: 'Virtual event',
    },
    {
      key: 'summit',
      name: 'CanadianSME Small Business Summit',
      slug: PROTO_EVENT.summit,
      kicker: 'October 2027 · Metro Toronto Convention Centre',
      desc: 'A full day of ideas, networking, expert discussions, and practical business education for owners and operators.',
      imageAlt: 'Summit audience',
      dateText: 'October 21, 2026 · 8:30 AM – 6:00 PM',
      venue: 'Metro Toronto Convention Centre',
      admission: 'From $149 · Group rates available',
    },
  ].map((e, i) => ({ intro: INTRO, expect: EXPECT, admission: null, status: 'scheduled', order: i, _status: 'published', ...e }))

  /* ---------- legal ---------- */
  const legalPages = Object.entries<any>(d.LEGAL).map(([slug, p]) => ({
    key: slug,
    slug,
    label: p.label,
    title: p.title,
    intro: p.intro,
    sections: p.sections.map((s: any) => ({ h: s.h, ps: s.ps.map((text: string) => ({ text })), items: s.items.map((text: string) => ({ text })) })),
  }))

  /* ---------- globals ---------- */
  const navigation = {
    megaMenus: Object.entries<any>(d.MENUS).map(([key, m]) => ({
      key,
      badge: m.badge,
      featured: m.featured,
      featuredHref: convHref(m.featuredHref),
      cols: m.cols.map((c: any) => ({ heading: c.heading, links: c.links.map((l: any) => ({ label: l.label, href: convHref(l.href) })) })),
    })),
  }
  const siteSettings = {
    sisterTitles: d.SISTER_TITLES.map((t: any) => ({ title: t.title, href: convHref(t.href) })),
    sitemapGroups: d.SITEMAP.map(([title, links]: [string, [string, string][] | null]) => ({
      title,
      provinces: links === null,
      links: (links || []).map(([label, href]) => ({ label, href: convHref(href) })),
    })),
  }
  const pairs = (v: [string, string][]) => v.map(([t, dd]) => ({ t, d: dd }))
  const list = (v: string[]) => v.map((text) => ({ text }))
  const advertise = {
    mediaKitUrl: d.ADV_MEDIA_KIT_URL || null,
    metrics: d.ADV_METRICS,
    audience: pairs(d.ADV_AUDIENCE),
    options: pairs(d.ADV_OPTIONS),
    goals: list(d.ADV_GOALS),
    why: pairs(d.ADV_WHY),
    faq: pairs(d.ADV_FAQ),
    interests: list(d.ADV_INTERESTS),
    budgets: list(d.ADV_BUDGETS),
    timing: list(d.ADV_TIMING),
  }

  /* ---------- ads & partners (assets that shipped with the design) ---------- */
  const WSIB = 'WSIB Ontario — Visit wsib.ca to make your workplace safer'
  const ADP = 'ADP — Trusted by over 40,000 small businesses across Canada. Preferred HR and payroll partner of CanadianSME.'
  const UPS = 'UPS — Turn challenges into opportunities. Start with 55% savings on UPS Small Package Shipping.'
  const adRow = (slot: string, file: string, alt: string, href: string) => ({ slot, show: true, image: local(`assets/${file}`, alt), alt, href })
  const ads = {
    slots: [
      adRow('home-sidebar-1', 'ads/wsib-300x250.png', WSIB, 'https://www.wsib.ca'),
      adRow('home-sidebar-2', 'ads/adp-300x234.png', ADP, 'https://www.adp.ca'),
      adRow('home-sidebar-3', 'ads/ups-300x600.png', UPS, 'https://www.ups.com/ca'),
      adRow('home-banner-1', 'sponsor-ups.png', UPS, 'https://www.ups.com/ca'),
      adRow('home-banner-2', 'sponsor-air-canada.png', 'Air Canada pour entreprise — Voyages d’affaires futés : ça commence ici.', ''),
      adRow(
        'home-subscribe-banner',
        'subscribe-banner.png',
        'Business insights. A stronger tomorrow. Subscribe to CanadianSME Small Business Magazine — expert advice and entrepreneur stories, delivered monthly.',
        '/#newsletter-form',
      ),
      adRow(
        'home-advertise-banner',
        'advertise-banner.png',
        'Put your brand in front of Canadian business leaders. Advertise with CanadianSME across magazine, digital, podcasts and events.',
        '/advertise-with-us/',
      ),
      adRow('post-sidebar-1', 'ads/ups-300x600.png', UPS, 'https://www.ups.com/ca'),
      adRow('post-sidebar-2', 'ads/wsib-300x250.png', WSIB, 'https://www.wsib.ca'),
      adRow('post-sidebar-3', 'ads/adp-300x234.png', 'ADP — Trusted by over 40,000 small businesses across Canada.', 'https://www.adp.ca'),
    ],
    partners: [
      ['Amazon Business', 'amazon-business.png'],
      ['UPS', 'ups.png'],
      ['ADP', 'adp.png'],
      ['Dell Technologies', 'dell.png'],
      ['Sage', 'sage.png'],
      ['Scotiabank', 'scotiabank.png'],
      ['Mirego', 'mirego.png'],
      ['BDC', 'bdc.png'],
      ['Road to EV', 'roadtoev.png'],
      ['Ingram Micro and Microsoft', 'ingram-microsoft.png'],
      ['Sun Life', 'sunlife.png'],
      ['Bell', 'bell.png'],
      ['EVCOR', 'evcor.png'],
    ].map(([name, file]) => ({ name, logo: local(`assets/partners/${file}`, name), href: null })),
    sidebarSponsored: {
      title: 'How Payment Automation Freed Up 12 Hours a Week',
      desc: 'Paid content presented by a CanadianSME financial partner.',
      href: null,
    },
  }

  /* ---------- redirects: old WordPress URLs -> new pages ---------- */
  const redirects = [
    ['/about-us/', '/about/'],
    ['/contact-us/', '/contact/'],
    ['/subscription/', '/newsletter/'],
    ['/privacy-policy/', '/privacy/'],
    ['/canadiansme-privacy-policy/', '/privacy/'],
    ['/terms-of-service/', '/terms/'],
    ['/home-new/', '/'],
    ['/strategic-partner/', '/strategic-partners/'],
    ...Object.keys(d.PROVINCE_PAGES).map((s) => [`/${s}/`, `/provinces/${s}/`]),
  ].map(([from, to]) => ({ from, to }))

  return {
    media: [...media.values()],
    categories,
    authors,
    posts,
    provinces,
    deadlines,
    offers,
    resources,
    fundingPrograms,
    issues,
    episodes,
    events,
    legalPages,
    globals: { homepage, navigation, siteSettings, advertise, ads },
    redirects,
  }
}

/** Replaces refs with values, e.g. the created document IDs (seed) or the documents (tests). */
export function resolveRefs<T>(value: T, lookup: (r: Ref) => unknown): T {
  const walk = (v: any): any => {
    if (isRef(v)) return lookup(v)
    if (Array.isArray(v)) return v.map(walk)
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]))
    return v
  }
  return walk(value)
}
