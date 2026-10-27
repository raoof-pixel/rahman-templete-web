import { lexicalToHtml, type ArticleExtras, type AuthorInfo, type ListData, type MorePost, type PostData, type PostFull } from '@canadiansme/shared'

import {
  articleCard,
  authorName,
  authorsOf,
  catTitle,
  categoryOf,
  fmtLong,
  fmtShort,
  initials,
  mediaAlt,
  mediaUrl,
  minutes,
  obj,
  postHref,
  rows,
  seoFor,
  str,
  type Doc,
} from './common'

/** Article body: the original (cleaned) WordPress HTML, or the editor content rendered to HTML. */
export const postHtml = (p: Doc) =>
  p.useLegacyHtml && p.legacyHtml ? str(p.legacyHtml) : lexicalToHtml(p.content) || str(p.legacyHtml)

const NEWSROOM: AuthorInfo = {
  name: 'CanadianSME Newsroom',
  role: 'Editorial team',
  bio: 'The CanadianSME editorial team covers the news, people and programmes shaping Canada’s small and medium-sized businesses.',
  slug: 'canadiansme',
  img: '',
}

export const authorInfo = (a: Doc | null, base: string): AuthorInfo =>
  a
    ? { name: str(a.name), role: str(a.jobTitle), bio: str(a.bio), slug: str(a.slug), img: mediaUrl(a.avatar, base, 'thumbnail') }
    : NEWSROOM

/** "AI & layout" group → the website's ArticleExtras (empty rows dropped). */
export const articleExtras = (p: Doc): ArticleExtras => {
  const x = obj(p.extras)
  if (!x) return {}
  const qr = obj(x.quickRead)
  const points = rows(qr?.points).map((r) => str(obj(r)?.text).trim()).filter(Boolean)
  const stats = rows(x.keyFigures)
    .map((r) => ({ value: str(obj(r)?.value).trim(), label: str(obj(r)?.label).trim() }))
    .filter((f) => f.value && f.label)
  const sections = rows(x.sections)
    .map((r) => ({ text: str(obj(r)?.heading).trim(), before: str(obj(r)?.before).trim() }))
    .filter((h) => h.text && h.before)
  const labels = rows(x.tocLabels)
    .map((r) => ({ heading: str(obj(r)?.heading).trim(), label: str(obj(r)?.label).trim() }))
    .filter((l) => l.heading && l.label)
  const out: ArticleExtras = {}
  if (points.length) out.quickRead = { points, reviewed: Boolean(qr?.reviewed) }
  if (str(x.pullQuote).trim()) out.pull = str(x.pullQuote).trim()
  if (stats.length) out.stats = stats
  if (sections.length) out.sections = sections
  if (labels.length) out.labels = labels
  return out
}

export const postFull = (p: Doc, base: string): PostFull => {
  const media = obj(p.featuredImage)
  const cat = catTitle(p)
  const c = categoryOf(p)
  const n = minutes(p)
  return {
    slug: str(p.slug),
    title: str(p.title),
    cat: p.isSponsored ? `Sponsored · ${cat}` : cat,
    catHref: c?.slug ? `/category/${c.slug}/` : '/latest/',
    date: fmtLong(p.publishedAt),
    dateISO: str(p.publishedAt),
    updatedISO: str(p.updatedAt),
    author: authorsOf(p)[0] ? authorName(p) : NEWSROOM.name,
    read: n ? `${n} min read` : '',
    img: mediaUrl(media, base, 'large'),
    alt: mediaAlt(media) || str(p.title),
    excerpt: str(p.excerpt),
    html: postHtml(p),
    source: str(p.sourceUrl),
    tags: rows(p.tags)
      .map(obj)
      .filter((t): t is Doc => Boolean(t?.slug))
      .map((t) => ({ href: `/tag/${t.slug}/`, label: str(t.title) })),
    imgWidth: Number(media?.width) || 0,
    imgHeight: Number(media?.height) || 0,
    imgLarge: obj(media?.sizes)?.xlarge?.url ? mediaUrl(media, base, 'xlarge') : '',
    audio: mediaUrl(p.audio, base),
    listen: !p.hideListen,
    extras: articleExtras(p),
  }
}

export const morePost = (p: Doc, base: string): MorePost => {
  const media = obj(p.featuredImage)
  const a = authorsOf(p)[0]
  const name = a ? str(a.name) : NEWSROOM.name
  const n = minutes(p)
  return {
    href: postHref(p),
    title: str(p.title),
    cat: catTitle(p),
    excerpt: str(p.excerpt),
    img: mediaUrl(media, base, 'card'),
    alt: mediaAlt(media) || str(p.title),
    author: name,
    initials: initials(name),
    meta: `${fmtShort(p.publishedAt)} · ${n ? `${n} min read` : ''}`,
  }
}

/** `sameCategory` and `newest` are candidate lists (current post may be in them; it's removed). */
export function toPostData(p: Doc, sameCategory: Doc[], newest: Doc[], base: string, site: string): PostData {
  const others = (list: Doc[]) => list.filter((x) => x && x.id !== p.id)
  const same = others(sameCategory)
  const seen = new Set(same.map((x) => x.id))
  const more = [...same, ...others(newest).filter((x) => !seen.has(x.id))].slice(0, 4)
  const post = postFull(p, base)
  const cat = catTitle(p)
  return {
    post,
    author: authorInfo(authorsOf(p)[0] ?? null, base),
    morePosts: more.map((x) => morePost(x, base)),
    moreHeading: same.length ? `More in ${cat}` : 'More from CanadianSME',
    seo: seoFor({
      title: post.title,
      description: post.excerpt,
      path: postHref(p),
      site,
      meta: obj(p.meta),
      image: mediaUrl(obj(p.meta)?.image, base, 'og') || mediaUrl(p.featuredImage, base, 'og'),
    }),
  }
}

export function toListData(opts: {
  kind: ListData['kind']
  term: Doc | null
  docs: Doc[]
  page: number
  totalPages: number
  total: number
  base: string
  site: string
}): ListData {
  const { kind, term } = opts
  const title = kind === 'latest' ? 'Latest' : str(term?.title)
  const path = kind === 'latest' ? '/latest/' : `/${kind}/${str(term?.slug)}/`
  const pagePath = opts.page > 1 ? `${path}page/${opts.page}/` : path
  const intro =
    str(term?.description) ||
    (kind === 'latest'
      ? 'Every CanadianSME article, newest first: news, guides and interviews for Canadian small business owners.'
      : `Reporting, analysis, and practical guidance for Canadian small and medium-sized businesses.`)
  return {
    kind,
    title,
    eyebrow: kind === 'latest' ? 'Latest' : kind === 'tag' ? 'Tag' : 'Category',
    intro,
    articles: opts.docs.map((d) => articleCard(d, opts.base)),
    page: opts.page,
    totalPages: opts.totalPages,
    total: opts.total,
    seo: seoFor({
      title: kind === 'latest' ? 'Latest articles' : `${title}: Canadian Small Business News`,
      description:
        kind === 'latest'
          ? intro
          : `The latest ${title} articles, guides and interviews for Canadian small business owners.`,
      path: pagePath,
      site: opts.site,
      meta: obj(term?.meta),
    }),
  }
}
