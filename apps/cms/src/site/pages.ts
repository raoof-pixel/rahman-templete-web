import type {
  AdvertiseData,
  AuthorData,
  ChromeData,
  EventItem,
  Issue,
  Episode,
  LegalData,
  ProvinceData,
  ProvincePage,
  ResourceGroup,
  SearchResult,
  SitemapGroup,
} from '@canadiansme/shared'

import { RESOURCE_GROUPS } from '../collections/site/Resources'
import { authorInfo } from './post'
import { catTitle, fmtShort, mediaAlt, mediaUrl, obj, postHref, rows, seoFor, str, texts, type Doc } from './common'
import { provinceHref } from './home'

/* ---------------------------------------------------------------- chrome */
export const adsOf = (ads: Doc | null, base: string): NonNullable<ChromeData['ads']> => {
  const out: NonNullable<ChromeData['ads']> = {}
  for (const r of rows(ads?.slots)) {
    const key = str(r.slot) as keyof typeof out
    if (!key) continue
    const img = mediaUrl(r.image, base)
    out[key] = r.show === false || !img ? null : { img, alt: str(r.alt) || mediaAlt(r.image), href: str(r.href) }
  }
  return out
}
export const partnersOf = (ads: Doc | null, base: string) =>
  rows(ads?.partners).map((p) => ({ name: str(p.name), logo: mediaUrl(p.logo, base), href: str(p.href) }))

export function toChromeData(nav: Doc, settings: Doc, newestIssue: Doc | null, ads: Doc | null = null, base = ''): ChromeData {
  const menus: ChromeData['menus'] = {}
  for (const m of rows(nav?.megaMenus)) {
    menus[str(m.key)] = {
      badge: str(m.badge),
      featured: str(m.featured),
      featuredHref: str(m.featuredHref),
      cols: rows(m.cols).map((c) => ({ heading: str(c.heading), links: rows(c.links).map((l) => ({ href: str(l.href), label: str(l.label) })) })),
    }
  }
  const s = obj(settings?.social) || {}
  return {
    menus,
    sisterTitles: rows(settings?.sisterTitles).map((t) => ({ title: str(t.title), href: str(t.href) })),
    social: {
      linkedin: str(s.linkedin),
      youtube: str(s.youtube),
      instagram: str(s.instagram),
      facebook: str(s.facebook),
      x: str(s.x),
      spotify: str(s.spotify),
      apple: str(s.apple),
    },
    latestIssueHref: str(settings?.latestIssueHref) || (newestIssue ? `/magazine/${newestIssue.slug}/` : '/magazine/'),
    ads: adsOf(ads, base),
    partners: partnersOf(ads, base),
    editorSlug: str(obj(settings?.editorAuthor)?.slug) || 'sk-uddin',
  }
}

/* ---------------------------------------------------------------- author */
export function toAuthorData(a: Doc, posts: Doc[], contributors: Doc[], page: number, totalPages: number, base: string, site: string): AuthorData {
  const info = authorInfo(a, base)
  return {
    author: info,
    recent: posts.map((p) => {
      const m = obj(p.featuredImage)
      return { cat: catTitle(p), title: str(p.title), href: postHref(p), img: mediaUrl(m, base, 'card'), alt: mediaAlt(m) || str(p.title) }
    }),
    contributors: contributors
      .filter((c) => c.id !== a.id)
      .map((c) => ({ name: str(c.name), role: str(c.jobTitle), href: `/author/${str(c.slug)}/`, img: mediaUrl(c.avatar, base, 'thumbnail') })),
    page,
    totalPages,
    seo: seoFor({ title: `${info.name}, ${info.role || 'Contributor'}`, description: info.bio, path: `/author/${info.slug}/`, site, image: info.img }),
  }
}

/* ---------------------------------------------------------------- magazine, podcast, events */
export const toIssue = (d: Doc, base: string): Issue => ({
  slug: str(d.slug),
  number: Number(d.number) || 0,
  month: str(d.month),
  title: str(d.title),
  desc: str(d.desc),
  cover: mediaUrl(d.cover, base, 'large'),
  coverAlt: str(d.coverAlt) || mediaAlt(d.cover) || `CanadianSME magazine, ${str(d.month)}`,
  readUrl: str(d.readUrl),
  href: `/magazine/${str(d.slug)}/`,
  inside: rows(d.inside).map((r) => ({ title: str(r.title), meta: str(r.meta), href: str(r.href) })),
})

export const toEpisode = (d: Doc, base: string): Episode => ({
  slug: str(d.slug),
  number: Number(d.number) || 0,
  title: str(d.title),
  desc: str(d.desc),
  date: fmtShort(d.date),
  dateISO: str(d.date),
  duration: str(d.duration),
  length: str(d.length),
  art: mediaUrl(d.art, base, 'card'),
  audioUrl: mediaUrl(d.audio, base) || str(d.audioUrl),
  href: `/podcast/${str(d.slug)}/`,
  notesIntro: str(d.notesIntro),
  notes: rows(d.notes).map((n) => ({ t: str(n.t), text: str(n.text) })),
  spotify: str(d.spotify),
  apple: str(d.apple),
  youtube: str(d.youtube),
})

export const toEvent = (d: Doc, base: string): EventItem => ({
  slug: str(d.slug),
  name: str(d.name),
  kicker: str(d.kicker),
  desc: str(d.desc),
  intro: str(d.intro),
  img: mediaUrl(d.image, base, 'large'),
  imgAlt: str(d.imageAlt) || mediaAlt(d.image),
  href: `/events/${str(d.slug)}/`,
  expect: texts(d.expect),
  dateText: str(d.dateText),
  startISO: str(d.start),
  endISO: str(d.end),
  venue: str(d.venue),
  address: str(d.address),
  admission: str(d.admission),
  registerUrl: str(d.registerUrl),
  partnerUrl: str(d.partnerUrl),
  status: (['scheduled', 'cancelled', 'postponed', 'past'].includes(d.status) ? d.status : 'scheduled') as EventItem['status'],
})

/* ---------------------------------------------------------------- resources */
export function toResourceGroups(docs: Doc[], base: string): ResourceGroup[] {
  const sorted = [...docs].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
  return RESOURCE_GROUPS.map((g) => ({
    heading: g.heading,
    sub: g.sub,
    items: sorted
      .filter((d) => d.group === g.value)
      .map((d) => {
        const file = mediaUrl(d.file, base)
        return {
          slot: str(d.slot) || `res-${str(d.key)}`,
          kind: str(d.kind),
          title: str(d.title),
          desc: str(d.desc),
          image: str(d.imageLabel),
          href: str(d.externalUrl) || `/resources/#${str(d.key)}`,
          img: mediaUrl(d.cover, base, 'card'),
          gated: d.gated !== false,
          // The file URL is only given out after the gate form (see /api/forms/gate).
          file: d.gated !== false ? '' : file,
        }
      }),
  })).filter((g) => g.items.length > 0)
}

/* ---------------------------------------------------------------- province */
export const toProvincePage = (d: Doc, base: string): ProvincePage => {
  const about = obj(d.about) || {}
  const article = obj(d.article) || {}
  return {
    slug: str(d.slug),
    code: str(d.code),
    name: str(d.name),
    intro: str(d.intro),
    facts: rows(d.facts).map((f) => [str(f.label), str(f.value), str(f.note)] as [string, string, string]),
    watch: texts(d.watch),
    comply: rows(d.comply).map((l) => ({ label: str(l.label), desc: str(l.desc), href: str(l.href) })),
    fund: rows(d.fund).map((l) => ({ label: str(l.label), desc: str(l.desc), href: str(l.href) })),
    about: {
      cap: str(about.cap),
      city: str(about.city),
      ind: str(about.ind),
      stats: rows(about.stats).map((s) => [str(s.value), str(s.label), str(s.note)] as [string, string, string]),
      chamber: [str(about.chamberName), str(about.chamberUrl)],
    },
    article: {
      title: str(article.title),
      sections: rows(article.sections).map((s) => ({ h: str(s.h), ps: texts(s.ps) })),
    },
    premier: str(d.premier),
    cabinet: str(d.cabinet),
    sbMin: d.sbMinName ? [str(d.sbMinName), str(d.sbMinRole)] : null,
    start: rows(d.start).map((s) => ({
      h: str(s.h),
      t: str(s.t),
      l: s.linkHref ? { label: str(s.linkLabel), href: str(s.linkHref) } : null,
    })),
    premierImg: mediaUrl(d.premierPhoto, base, 'thumbnail'),
    ministerImg: mediaUrl(d.ministerPhoto, base, 'thumbnail'),
  }
}

export function toProvinceData(d: Doc, all: Doc[], base: string, site: string): ProvinceData {
  const page = toProvincePage(d, base)
  return {
    province: page,
    others: all.filter((o) => o.slug !== d.slug).map((o) => ({ href: provinceHref(o), label: str(o.name) })),
    agency: [str(d.agencyName), str(d.agencyUrl)],
    seo: seoFor({ title: `${page.name}: Small Business Guide, Grants and Regulations`, description: page.intro, path: provinceHref(d), site }),
  }
}

/* ---------------------------------------------------------------- legal */
export function toLegalData(d: Doc, all: Doc[], site: string): LegalData {
  const slug = str(d.slug)
  return {
    page: {
      label: str(d.label),
      title: str(d.title),
      intro: str(d.intro),
      sections: rows(d.sections).map((s, i) => ({ h: str(s.h), id: `lg-${slug}-${i + 1}`, n: i + 1, ps: texts(s.ps), items: texts(s.items) })),
    },
    others: all.filter((o) => o.slug !== slug).map((o) => ({ href: `/${str(o.slug)}/`, label: str(o.label) })),
    seo: seoFor({ title: str(d.title), description: str(d.intro), path: `/${slug}/`, site }),
  }
}

/* ---------------------------------------------------------------- advertise */
export function toAdvertiseData(g: Doc, base: string): AdvertiseData {
  const pairs = (v: unknown) => rows(v).map((r) => [str(r.t), str(r.d)] as [string, string])
  return {
    mediaKitUrl: mediaUrl(g?.mediaKit, base) || str(g?.mediaKitUrl),
    metrics: rows(g?.metrics).map((m) => ({ v: str(m.v), l: str(m.l), source: str(m.source) || undefined })),
    interests: texts(g?.interests),
    options: pairs(g?.options),
    audience: pairs(g?.audience),
    goals: texts(g?.goals),
    why: pairs(g?.why),
    faq: pairs(g?.faq),
    budgets: texts(g?.budgets),
    timing: texts(g?.timing),
  }
}

/* ---------------------------------------------------------------- sitemap & search */
export function toSitemapGroups(settings: Doc, provinces: Doc[]): SitemapGroup[] {
  return rows(settings?.sitemapGroups).map((g) => ({
    title: str(g.title),
    links: g.provinces
      ? provinces.map((p) => ({ href: provinceHref(p), label: str(p.name) }))
      : rows(g.links).map((l) => ({ href: str(l.href), label: str(l.label) })),
  }))
}

const words = (q: string) =>
  q
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1)
    .slice(0, 8)

/** Score like the prototype: title hit 8, meta/description 3, body 1; every term must match somewhere. */
export function rankResults(q: string, items: (SearchResult & { body?: string })[], limit: number): SearchResult[] {
  const terms = words(q)
  if (!terms.length) return []
  const scored: { r: SearchResult; s: number }[] = []
  for (const it of items) {
    const t = it.title.toLowerCase()
    const m = `${it.meta} ${it.desc}`.toLowerCase()
    const b = (it.body || '').toLowerCase()
    let s = 0
    let ok = true
    for (const term of terms) {
      const a = t.includes(term) ? 8 : 0
      const c = m.includes(term) ? 3 : 0
      const d = b.includes(term) ? 1 : 0
      if (!a && !c && !d) {
        ok = false
        break
      }
      s += a + c + d
    }
    if (ok) scored.push({ r: { kind: it.kind, meta: it.meta, title: it.title, desc: it.desc, href: it.href }, s })
  }
  return scored.sort((x, y) => y.s - x.s).slice(0, limit).map((x) => x.r)
}

export const searchTerms = words

export const postResult = (p: Doc) => ({
  kind: p.isSponsored ? 'Sponsored' : 'Article',
  meta: [catTitle(p), fmtShort(p.publishedAt)].filter(Boolean).join(' · '),
  title: str(p.title),
  desc: str(p.excerpt),
  href: postHref(p),
})
