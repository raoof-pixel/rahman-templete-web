import type { Metadata } from 'next'
import { notFound, permanentRedirect, redirect } from 'next/navigation'

import { getPost, resolve } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { absolute, breadcrumbLd, fromSeo } from '@/lib/seo'
import Post from '@/ui/parts/Post'

/**
 * Articles live at /<slug>/ exactly as on WordPress. Any other unknown URL is checked against the
 * CMS redirects (old WordPress URLs), then 404s.
 */
export const revalidate = 60
export const dynamicParams = true
export const generateStaticParams = async () => [] as { path: string[] }[]

type Props = { params: Promise<{ path: string[] }> }

/** A single URL segment that could be an article slug (WordPress slugs may contain non-ASCII letters). */
const slugOf = (path: string[]) => {
  if (path.length !== 1) return null
  let s = path[0]
  try {
    s = decodeURIComponent(s)
  } catch {
    return null
  }
  return /^[\p{L}\p{N}][\p{L}\p{N}_.-]{0,199}$/u.test(s) ? s.toLowerCase() : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params
  const slug = slugOf(path)
  const data = slug ? await getPost(slug) : null
  if (!data) return { robots: { index: false, follow: true } }
  const p = data.post
  return fromSeo(data.seo, { title: p.title, description: p.excerpt, path: `/${p.slug}/`, image: p.img, type: 'article' })
}

export default async function CatchAll({ params }: Props) {
  const { path } = await params
  const slug = slugOf(path)
  const data = slug ? await getPost(slug) : null
  if (data) {
    const p = data.post
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: p.title.slice(0, 110),
      description: p.excerpt,
      image: p.img ? [p.img] : undefined,
      datePublished: p.dateISO,
      dateModified: p.updatedISO || p.dateISO,
      author: data.author.name && !/newsroom/i.test(data.author.name) ? { '@type': 'Person', name: data.author.name, url: data.author.slug ? absolute(`/author/${data.author.slug}/`) : undefined } : { '@type': 'Organization', name: 'CanadianSME' },
      publisher: { '@id': absolute('/#org') },
      mainEntityOfPage: absolute(`/${p.slug}/`),
      inLanguage: 'en-CA',
      articleSection: p.cat.replace(/^Sponsored · /, ''),
      ...(/^Sponsored/.test(p.cat) ? { sponsor: { '@type': 'Organization', name: data.author.name } } : {}),
    }
    return (
      <>
        <JsonLd data={ld} />
        <JsonLd data={breadcrumbLd([[p.cat.replace(/^Sponsored · /, '') || 'Articles', p.catHref || '/latest/'], [p.title, `/${p.slug}/`]])} />
        {await render('post', <Post />, { post: data })}
      </>
    )
  }
  // Old WordPress URL? The CMS keeps the redirect list.
  const wanted = '/' + path.map(encodeURIComponent).join('/') + '/'
  const r = await resolve(wanted).catch(() => null)
  if (r?.type === 'redirect' && r.to && r.to !== wanted) {
    if (Number(r.status) === 302) redirect(r.to)
    permanentRedirect(r.to)
  }
  notFound()
}
