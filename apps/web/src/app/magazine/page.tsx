import type { Metadata } from 'next'

import { getIssues } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { breadcrumbLd, fixed } from '@/lib/seo'
import Magazine from '@/ui/parts/Magazine'

export const revalidate = 60
export const metadata: Metadata = fixed('magArchive', '/magazine/')
export default async function Page() {
  const { issues } = await getIssues()
  return (
    <>
      <JsonLd data={breadcrumbLd([['Magazine', '/magazine/']])} />
      {await render('magArchive', <Magazine />, { issues })}
    </>
  )
}
