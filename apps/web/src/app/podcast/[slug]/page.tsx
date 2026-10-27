import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getEpisode, getEpisodes } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { absolute, breadcrumbLd, fromSeo } from '@/lib/seo'
import Episode from '@/ui/parts/Episode'

export const revalidate = 60
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getEpisode((await params).slug)
  if (!d) return {}
  return fromSeo(d.seo, { title: `Episode ${d.episode.number}: ${d.episode.title}`, description: d.episode.desc, path: d.episode.href, image: d.episode.art, type: 'article' })
}
export default async function Page({ params }: Props) {
  const [d, list] = await Promise.all([getEpisode((await params).slug), getEpisodes()])
  if (!d) notFound()
  const e = d.episode
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: e.title,
    episodeNumber: e.number,
    datePublished: e.dateISO || undefined,
    description: e.desc,
    url: absolute(e.href),
    associatedMedia: e.audioUrl ? { '@type': 'MediaObject', contentUrl: e.audioUrl } : undefined,
    partOfSeries: { '@type': 'PodcastSeries', name: 'CanadianSME Small Business Podcast', url: absolute('/podcast/') },
  }
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbLd([['Podcast', '/podcast/'], [`Episode ${e.number}`, e.href]])} />
      {await render('episode', <Episode />, { episode: e, podcastLinks: list.links })}
    </>
  )
}
