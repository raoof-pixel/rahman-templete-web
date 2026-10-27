import type { Metadata } from 'next'

import { getEvents } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { breadcrumbLd, fixed } from '@/lib/seo'
import Events from '@/ui/parts/Events'

export const revalidate = 60
export const metadata: Metadata = fixed('events', '/events/')
export default async function Page() {
  const { events } = await getEvents()
  return (
    <>
      <JsonLd data={breadcrumbLd([['Events', '/events/']])} />
      {await render('events', <Events />, { events })}
    </>
  )
}
