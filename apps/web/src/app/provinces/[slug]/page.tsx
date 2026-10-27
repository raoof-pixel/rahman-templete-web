import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProvince } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { breadcrumbLd, fromSeo } from '@/lib/seo'
import Province from '@/ui/parts/Province'

export const revalidate = 60
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getProvince((await params).slug)
  if (!d) return {}
  const p = d.province
  return fromSeo(d.seo, { title: `${p.name}: Small Business Guide, Grants and Regulations`, description: p.intro, path: `/provinces/${p.slug}/` })
}
export default async function Page({ params }: Props) {
  const d = await getProvince((await params).slug)
  if (!d) notFound()
  const p = d.province
  const slots: Record<string, string> = {}
  if (p.premierImg) slots[`premier-${p.slug}`] = p.premierImg
  if (p.ministerImg) slots[`minister-${p.slug}`] = p.ministerImg
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebPage', name: `${p.name}: Small Business Guide`, about: { '@type': 'AdministrativeArea', name: p.name, containedInPlace: { '@type': 'Country', name: 'Canada' } } }} />
      <JsonLd data={breadcrumbLd([['Provinces', '/#provinces'], [p.name, `/provinces/${p.slug}/`]])} />
      {await render('province', <Province />, { province: d, slots, slotAlts: { [`premier-${p.slug}`]: `Premier ${p.premier}`, [`minister-${p.slug}`]: p.sbMin ? p.sbMin[0] : '' } })}
    </>
  )
}
