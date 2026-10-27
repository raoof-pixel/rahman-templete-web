import type { Metadata } from 'next'

import { getResources } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { breadcrumbLd, fixed } from '@/lib/seo'
import Resources from '@/ui/parts/Resources'

export const revalidate = 60
export const metadata: Metadata = fixed('resources', '/resources/')
export default async function Page() {
  const { resourceGroups } = await getResources()
  const slots: Record<string, string> = {}
  for (const g of resourceGroups) for (const it of g.items) if (it.slot && it.img) slots[it.slot] = it.img
  return (
    <>
      <JsonLd data={breadcrumbLd([['Resources', '/resources/']])} />
      {await render('resources', <Resources />, { resourceGroups, slots })}
    </>
  )
}
