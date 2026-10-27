import type { Metadata } from 'next'

import { getSitemapGroups } from '@/lib/cms'
import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import Sitemap from '@/ui/parts/Sitemap'

export const revalidate = 60
export const metadata: Metadata = fixed('sitemap', '/sitemap/')
export default async function Page() {
  const { groups } = await getSitemapGroups()
  return render('sitemap', <Sitemap />, { sitemapGroups: groups })
}
