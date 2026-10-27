/**
 * Pure helpers shared by the /api/site mappers. No Payload imports here: everything takes plain
 * documents (as Payload returns them, relations populated) and returns plain JSON, so the mappers
 * can be unit-tested without a database (see __tests__).
 */
import type { ArticleCard, Seo } from '@canadiansme/shared'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Doc = Record<string, any>

export const obj = (v: unknown): Doc | null => (v && typeof v === 'object' ? (v as Doc) : null)
export const str = (v: unknown): string => (typeof v === 'string' ? v : v == null ? '' : String(v))
export const rows = <T = Doc>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])
export const texts = (v: unknown): string[] => rows<Doc>(v).map((r) => str(r?.text)).filter(Boolean)

/** Absolute URL of a media document (or a size of it). Local-storage URLs are relative to the CMS. */
export const mediaUrl = (m: unknown, base: string, size?: 'thumbnail' | 'card' | 'large' | 'og'): string => {
  const d = obj(m)
  if (!d) return ''
  const u = str((size && d.sizes?.[size]?.url) || d.url || d.wpUrl)
  if (!u) return ''
  return u.startsWith('/') ? `${base.replace(/\/$/, '')}${u}` : u
}
export const mediaAlt = (m: unknown): string => str(obj(m)?.alt)

const TZ = 'America/Toronto'
const parts = (iso: unknown) => {
  const s = str(iso)
  if (!s) return null
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return null
  return d
}
/** "October 9, 2026" (Toronto time). */
export const fmtLong = (iso: unknown) => {
  const d = parts(iso)
  return d ? d.toLocaleDateString('en-US', { timeZone: TZ, month: 'long', day: 'numeric', year: 'numeric' }) : ''
}
/** "Oct 9, 2026" (Toronto time). */
export const fmtShort = (iso: unknown) => {
  const d = parts(iso)
  return d ? d.toLocaleDateString('en-US', { timeZone: TZ, month: 'short', day: 'numeric', year: 'numeric' }) : ''
}
/** "Oct 31" (Toronto time). */
export const fmtMonthDay = (iso: unknown) => {
  const d = parts(iso)
  return d ? d.toLocaleDateString('en-US', { timeZone: TZ, month: 'short', day: 'numeric' }) : ''
}
/** "August 2026". */
export const fmtMonthYear = (iso: unknown) => {
  const d = parts(iso)
  return d ? d.toLocaleDateString('en-US', { timeZone: TZ, month: 'long', year: 'numeric' }) : ''
}
/** YYYY-MM-DD of a moment in Toronto. */
export const torontoDay = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: TZ })

export const postHref = (p: unknown) => {
  const s = str(obj(p)?.slug)
  return s ? `/${s}/` : ''
}
export const categoryOf = (p: Doc | null): Doc | null =>
  obj(p?.primaryCategory) ?? rows(p?.categories).map(obj).find(Boolean) ?? null
export const catTitle = (p: Doc | null) => str(categoryOf(p)?.title)
export const authorsOf = (p: Doc | null) => rows(p?.authors).map(obj).filter((a): a is Doc => Boolean(a))
export const authorName = (p: Doc | null) => str(authorsOf(p)[0]?.name) || 'CanadianSME'
export const minutes = (p: Doc | null) => Number(p?.readingTime) || 0
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/** Article card (prototype ARTICLES shape). */
export const articleCard = (p: Doc, base: string): ArticleCard => {
  const media = obj(p.featuredImage)
  const n = minutes(p)
  const authors = authorsOf(p)
  return {
    slot: `art-${p.id}`,
    cat: catTitle(p),
    title: str(p.title),
    excerpt: str(p.excerpt),
    date: fmtShort(p.publishedAt),
    read: n ? `${n} min read` : '',
    byline: authors.length ? `By ${authors.map((a) => str(a.name)).join(', ')}` : '',
    img: mediaUrl(media, base, 'card'),
    alt: mediaAlt(media) || str(p.title),
    href: postHref(p),
    sponsored: Boolean(p.isSponsored) || undefined,
  }
}

export const clip = (s: string, n = 158) => {
  const t = s.replace(/\s+/g, ' ').trim()
  return t.length > n ? t.slice(0, n - 3).replace(/\s+\S*$/, '') + '…' : t
}

export const seoFor = (opts: { title: string; description?: string; path: string; site: string; meta?: Doc | null; image?: string }): Seo => ({
  title: str(opts.meta?.title) || opts.title,
  description: clip(str(opts.meta?.description) || str(opts.description)),
  canonical: str(opts.meta?.canonicalUrl) || `${opts.site.replace(/\/$/, '')}${opts.path}`,
  noIndex: Boolean(opts.meta?.noIndex),
  image: opts.image || '',
})
