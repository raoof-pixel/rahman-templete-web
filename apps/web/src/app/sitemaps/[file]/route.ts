import { PAGES } from '@canadiansme/shared'

import { sitemapCollection, sitemapPosts } from '@/lib/cms'
import { absolute } from '@/lib/seo'
import { urlset, xml } from '@/lib/sitemap'

export const revalidate = 3600

/** collection name in the CMS -> URL prefix on the site */
const COLLECTIONS: Record<string, [string, string]> = {
  categories: ['categories', '/category/'],
  tags: ['tags', '/tag/'],
  authors: ['authors', '/author/'],
  provinces: ['provinces', '/provinces/'],
  magazine: ['magazine-issues', '/magazine/'],
  podcast: ['podcast-episodes', '/podcast/'],
  events: ['events', '/events/'],
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const posts = file.match(/^posts-(\d{1,4})\.xml$/)
  if (posts) {
    const data = await sitemapPosts(Number(posts[1]))
    if (!data?.docs.length) return new Response('Not found', { status: 404 })
    return xml(urlset(data.docs.map((p) => ({ loc: absolute(`/${p.slug}/`), lastmod: p.updatedAt }))))
  }
  const name = file.replace(/\.xml$/, '')
  if (name === 'pages') {
    const fixed = Object.values(PAGES).filter((p) => p !== '/search/')
    return xml(urlset(fixed.map((p) => ({ loc: absolute(p) }))))
  }
  const c = COLLECTIONS[name]
  if (!c) return new Response('Not found', { status: 404 })
  const data = await sitemapCollection(c[0]).catch(() => null)
  return xml(urlset((data?.docs ?? []).map((d) => ({ loc: absolute(`${c[1]}${d.slug}/`), lastmod: d.updatedAt }))))
}
