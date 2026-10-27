import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getEvent } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { absolute, breadcrumbLd, meta } from '@/lib/seo'
import Event from '@/ui/parts/Event'

export const revalidate = 60
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getEvent((await params).slug)
  if (!d) return {}
  return meta({ title: d.event.name, description: d.event.intro || d.event.desc, path: d.event.href, image: d.event.img })
}
export default async function Page({ params }: Props) {
  const d = await getEvent((await params).slug)
  if (!d) notFound()
  const e = d.event
  const status = { cancelled: 'EventCancelled', postponed: 'EventPostponed' }[e.status as string] || 'EventScheduled'
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.name,
    description: e.intro || e.desc,
    startDate: e.startISO || undefined,
    endDate: e.endISO || undefined,
    eventStatus: `https://schema.org/${status}`,
    eventAttendanceMode: /virtual/i.test(e.kicker + e.venue) ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    location: e.venue ? { '@type': 'Place', name: e.venue, address: { '@type': 'PostalAddress', streetAddress: e.address || undefined, addressCountry: 'CA' } } : undefined,
    image: e.img ? [e.img] : undefined,
    organizer: { '@id': absolute('/#org') },
    offers: e.registerUrl ? { '@type': 'Offer', url: e.registerUrl, priceCurrency: 'CAD', availability: 'https://schema.org/InStock' } : undefined,
  }
  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbLd([['Events', '/events/'], [e.name, e.href]])} />
      {await render('event', <Event />, { event: e })}
    </>
  )
}
