import { recentPosts } from '@/lib/cms'
import { absolute } from '@/lib/seo'
import { xml } from '@/lib/sitemap'

/** Google News sitemap: articles from the last 48 hours (developer guide 9.3). */
export const revalidate = 900

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function GET() {
  const since = new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  const data = await recentPosts(100, since)
  return xml(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${(data?.docs || [])
      .map((p) => `<url><loc>${absolute(`/${p.slug}/`)}</loc><news:news><news:publication><news:name>CanadianSME</news:name><news:language>en</news:language></news:publication><news:publication_date>${new Date(p.publishedAt || p.createdAt).toISOString()}</news:publication_date><news:title>${esc(p.title)}</news:title></news:news></url>`)
      .join('')}</urlset>`,
  )
}
