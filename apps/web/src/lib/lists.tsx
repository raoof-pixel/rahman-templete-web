import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'

import { getAuthor, getChrome, getList } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { pageNum, render } from '@/lib/render'
import { breadcrumbLd, fromSeo, SEO_PAGES } from '@/lib/seo'
import Category from '@/ui/parts/Category'
import Contributor from '@/ui/parts/Contributor'

/**
 * Article lists: /latest/, /category/<slug>/, /tag/<slug>/ and their /page/<n>/ pages (the WordPress
 * URL shapes), plus author pages. All use the prototype's Category and Contributor templates.
 */
type Kind = 'latest' | 'category' | 'tag'
const baseOf = (kind: Kind, slug: string) => (kind === 'latest' ? '/latest/' : `/${kind}/${slug}/`)
const sortOf = (sort?: string) => (sort === 'picks' ? 'picks' : undefined)

export async function listPage(kind: Kind, slug: string, n: string | undefined, sortParam?: string) {
  const page = pageNum(n)
  if (page === null) notFound()
  const base = baseOf(kind, slug)
  if (n === '1') permanentRedirect(base)
  const sort = sortOf(sortParam)
  const data = await getList(kind, slug, page, sort)
  if (!data || (page > 1 && page > data.totalPages)) notFound()
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: data.title }} />
      {kind !== 'latest' ? <JsonLd data={breadcrumbLd([[data.title, base]])} /> : null}
      {await render('category', <Category />, { list: { ...data, base, sort } as never })}
    </>
  )
}

export async function listMeta(kind: Kind, slug: string, n?: string, sortParam?: string): Promise<Metadata> {
  const page = pageNum(n) || 1
  const data = await getList(kind, slug, page, sortOf(sortParam)).catch(() => null)
  if (!data) return {}
  const base = baseOf(kind, slug)
  const path = page > 1 ? `${base}page/${page}/` : base
  const title = kind === 'latest' ? 'Latest Articles' : `${data.title}: Canadian Small Business News`
  const meta = fromSeo(data.seo, {
    title: page > 1 ? `${title} (Page ${page})` : title,
    description: data.intro || `The latest ${data.title} articles, guides and interviews for Canadian small business owners.`,
    path,
  })
  // Sorted views are duplicates of the list; keep them out of the index.
  if (sortParam) meta.robots = { index: false, follow: true }
  return meta
}

export async function authorPage(slug: string, n?: string) {
  const page = pageNum(n)
  if (page === null) notFound()
  const base = `/author/${slug}/`
  if (n === '1') permanentRedirect(base)
  const data = await getAuthor(slug, page)
  if (!data || (page > 1 && page > data.totalPages)) notFound()
  const ld = { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: { '@type': 'Person', name: data.author.name, jobTitle: data.author.role || undefined, description: data.author.bio || undefined, image: data.author.img || undefined } }
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbLd([['Contributors', '/contributors/'], [data.author.name, base]])} />
      {await render('contributor', <Contributor />, { author: { ...data, base } as never })}
    </>
  )
}

export async function authorMeta(slug: string, n?: string): Promise<Metadata> {
  const page = pageNum(n) || 1
  const data = await getAuthor(slug, page).catch(() => null)
  if (!data) return {}
  const base = `/author/${slug}/`
  return fromSeo(data.seo, {
    title: page > 1 ? `${data.author.name} (Page ${page})` : data.author.name,
    description: data.author.bio || SEO_PAGES.contributor[1],
    path: page > 1 ? `${base}page/${page}/` : base,
    image: data.author.img,
  })
}

export const editorSlug = async () => (await getChrome()).editorSlug || 'sk-uddin'
