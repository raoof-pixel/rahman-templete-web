import { recentPosts } from '@/lib/cms'
import { absolute } from '@/lib/seo'

/** /feed/ — RSS 2.0 at the same address WordPress used, so existing subscribers keep receiving posts. */
export const revalidate = 900

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function GET() {
  const data = await recentPosts(30)
  const items = (data?.docs || [])
    .map((p) => {
      const url = absolute(`/${p.slug}/`)
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid>${p.publishedAt ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : ''}<description>${esc(p.excerpt || '')}</description></item>`
    })
    .join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>CanadianSME Small Business Magazine</title><link>${absolute('/')}</link><atom:link href="${absolute('/feed/')}" rel="self" type="application/rss+xml"/><description>News, guides and interviews for Canadian small business owners.</description><language>en-CA</language>${items}</channel></rss>`
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } })
}
