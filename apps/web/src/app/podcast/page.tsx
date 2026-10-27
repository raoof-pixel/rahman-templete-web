import type { Metadata } from 'next'

import { getEpisodes } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { absolute, breadcrumbLd, fixed } from '@/lib/seo'
import Podcast from '@/ui/parts/Podcast'

export const revalidate = 60
export const metadata: Metadata = fixed('podArchive', '/podcast/')
export default async function Page() {
  const { episodes, links } = await getEpisodes()
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'PodcastSeries', name: 'CanadianSME Small Business Podcast', url: absolute('/podcast/'), webFeed: undefined }} />
      <JsonLd data={breadcrumbLd([['Podcast', '/podcast/']])} />
      {await render('podArchive', <Podcast />, { episodes, podcastLinks: links })}
    </>
  )
}
