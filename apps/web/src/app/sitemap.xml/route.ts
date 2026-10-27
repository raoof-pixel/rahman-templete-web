import { sitemapPosts } from '@/lib/cms'
import { absolute } from '@/lib/seo'
import { xml } from '@/lib/sitemap'

/** /sitemap.xml — index of the split sitemaps (developer guide 9.3). */
export const revalidate = 3600

export async function GET() {
  const first = await sitemapPosts(1)
  const postFiles = Math.max(1, first?.totalPages ?? 1)
  const files = [...Array.from({ length: postFiles }, (_, i) => `posts-${i + 1}.xml`), 'pages.xml', 'categories.xml', 'tags.xml', 'authors.xml', 'provinces.xml', 'magazine.xml', 'podcast.xml', 'events.xml']
  const now = new Date().toISOString()
  return xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${files.map((f) => `<sitemap><loc>${absolute(`/sitemaps/${f}`)}</loc><lastmod>${now}</lastmod></sitemap>`).join('')}<sitemap><loc>${absolute('/news-sitemap.xml')}</loc></sitemap></sitemapindex>`)
}
