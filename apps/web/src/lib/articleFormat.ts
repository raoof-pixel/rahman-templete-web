/**
 * Article formatter: gives any imported WordPress article the #a1 layout from the design template
 * without changing its words.
 *  1. cleans stray markdown (**, *) and styles "Interview by …" credit lines
 *  2. turns bold interview questions / short bold lines into headings (sidebar "In this article")
 *  3. adds editorial extras from `article-extras.json` (made per article, checked against the text):
 *     section headings for articles without any, short sidebar labels, a verbatim pull quote,
 *     verbatim key figures. Anything that does not match the article text is skipped.
 * Styles live in app/site.css (.csme-prose …).
 */
import extrasData from '@/data/article-extras.json'

export type QuickRead = { points: string[]; reviewed: boolean }
export type ArticleExtras = {
  quickRead?: QuickRead
  pull?: string
  stats?: { value: string; label: string }[]
  /** short sidebar label, keyed by textKey(heading) */
  labels?: Record<string, string>
  /** section headings for articles without any, placed before the paragraph whose textKey matches */
  sections?: { before: string; text: string }[]
}
export type TocItem = { id: string; label: string }
export type FormattedArticle = { html: string; toc: TocItem[] }

const EXTRAS = extrasData as Record<string, ArticleExtras>

export const extrasFor = (slug: string | undefined): ArticleExtras => (slug && EXTRAS[slug]) || {}

const ENT: Record<string, string> = { '&nbsp;': ' ', '&amp;': '&', '&#8217;': '’', '&#8216;': '‘', '&#8220;': '“', '&#8221;': '”', '&#8211;': '–', '&#8212;': '—', '&quot;': '"', '&#39;': "'" }

export const plainText = (html: string): string =>
  (html || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&[#a-z0-9]+;/gi, (m) => ENT[m] ?? m)
    .replace(/\s+/g, ' ')
    .trim()

/** Stable key for matching headings/paragraphs by their text. */
export const textKey = (t: string): string =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 80)

const esc = (t: string) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const BLOCKS = /<(p|h2|h3|h4|ul|ol|blockquote|figure|div|table)\b[\s\S]*?<\/\1>/g
const CREDIT = /^\*?\s*Interview(?:ed)? by /i

const isBoldOnly = (block: string) => {
  const inner = block.replace(/^<p[^>]*>|<\/p>$/g, '').trim()
  return /^<(strong|b)\b/.test(inner) && plainText(inner.replace(/<(strong|b)\b[^>]*>[\s\S]*?<\/\1>/g, '')) === ''
}

const cache = new Map<string, FormattedArticle>()

export function formatArticle(html: string, slug?: string): FormattedArticle {
  const cacheKey = (slug || '') + ':' + (html || '').length
  const hit = cache.get(cacheKey)
  if (hit) return hit

  const extras = extrasFor(slug)
  // Split into known blocks; anything between them (h5/h6, hr, embeds, stray text) is kept untouched.
  const src = html || ''
  const blocks: string[] = []
  let last = 0
  for (const m of src.matchAll(BLOCKS)) {
    const gap = src.slice(last, m.index)
    if (gap.trim()) blocks.push(gap)
    blocks.push(m[0])
    last = (m.index ?? 0) + m[0].length
  }
  if (src.slice(last).trim()) blocks.push(src.slice(last))
  const fullText = plainText(html)
  const sections = new Map((extras.sections || []).map((s) => [s.before, s.text]))
  const labels = extras.labels || {}
  const toc: TocItem[] = []
  const out: string[] = []
  let n = 0
  const hasQuote = blocks.some((b) => b.trimStart().startsWith('<blockquote'))

  const heading = (text: string, inner: string, question: boolean) => {
    const id = 'sec-' + ++n
    const label = labels[textKey(text)] || (text.length > 60 ? text.slice(0, 56).replace(/\s+\S*$/, '') + '…' : text)
    toc.push({ id, label })
    return `<h2 id="${id}"${question ? ' class="csme-q"' : ''}>${inner}</h2>`
  }

  blocks.forEach((b, ix) => {
    const tag = (b.match(/^<(p|h2|h3|h4|ul|ol|blockquote|figure|div|table)\b/) || [])[1]
    const raw = plainText(b)
    const t = raw.replace(/\*+/g, '').trim()
    const added = tag === 'p' ? sections.get(textKey(t)) : undefined
    if (added) out.push(heading(added, esc(added), false))
    if (tag === 'p' && CREDIT.test(raw)) {
      out.push(`<p class="csme-credit">${esc(t)}</p>`)
      return
    }
    if (tag === 'h2') {
      if (!t) return
      const inner = b.replace(/^<h2\b[^>]*>|<\/h2>$/g, '').replace(/\*+/g, '')
      out.push(heading(t, inner, /\?$/.test(t)))
      return
    }
    if (tag === 'p' && t && isBoldOnly(b)) {
      if (ix === 0) {
        out.push(`<p class="csme-lead">${esc(t)}</p>`)
        return
      }
      const question = /\?$/.test(t) && t.length <= 170
      if (question || (t.length <= 90 && !/[.:;,]$/.test(t) && !/^[“"]/.test(t))) {
        out.push(heading(t, esc(t), question))
        return
      }
    }
    out.push(b.replace(/\*\*/g, ''))
  })

  // Key figures after the second paragraph, only when every shown value appears in the text.
  const stats = (extras.stats || []).filter((s) => s?.value && fullText.includes(s.value)).slice(0, 3)
  if (stats.length >= 2) {
    out.splice(
      Math.min(2, out.length),
      0,
      `<div class="csme-stats" role="group" aria-label="Key figures" data-csme-noread>${stats
        .map((s) => `<div><span class="csme-stat-v">${esc(s.value)}</span><span class="csme-stat-l">${esc(s.label)}</span></div>`)
        .join('')}</div>`,
    )
  }

  // Pull quote near the middle, at least 4 blocks from the paragraph it repeats; verbatim only.
  const pull = extras.pull
  if (pull && !hasQuote && fullText.includes(pull) && out.length >= 8) {
    const src = out.findIndex((b) => plainText(b).includes(pull))
    const place = (start: number) => {
      for (let k = start; k < Math.min(out.length, start + 6); k++) if (out[k].startsWith('<h2')) return k
      return start
    }
    let at = place(Math.floor(out.length * 0.45))
    if (src !== -1 && Math.abs(at - src) < 4) at = place(src > out.length / 2 ? Math.floor(out.length * 0.2) : Math.floor(out.length * 0.72))
    if (src === -1 || Math.abs(at - src) >= 4) {
      out.splice(at, 0, `<blockquote class="csme-pull" aria-hidden="true" data-csme-noread>“${esc(pull.replace(/^[“"]|[”"]$/g, ''))}”</blockquote>`)
    }
  }

  const result = { html: out.join(''), toc }
  cache.set(cacheKey, result)
  return result
}

/** "Interview by SK Uddin" → "SK Uddin" (used to show the right author when the CMS has none). */
export function creditName(html: string): string {
  const m = plainText(html).match(/\*?\s*Interview(?:ed)? by ([A-Z][A-Za-z.'’-]+(?: [A-Z][A-Za-z.'’-]+){0,2})/i)
  return m ? m[1].trim() : ''
}
