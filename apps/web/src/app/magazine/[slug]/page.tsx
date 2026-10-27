import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getIssue } from '@/lib/cms'
import { JsonLd } from '@/lib/jsonld'
import { render } from '@/lib/render'
import { breadcrumbLd, fromSeo } from '@/lib/seo'
import Issue from '@/ui/parts/Issue'

export const revalidate = 60
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getIssue((await params).slug)
  if (!d) return {}
  return fromSeo(d.seo, { title: `${d.issue.title} — ${d.issue.month} Issue`, description: d.issue.desc, path: d.issue.href, image: d.issue.cover, type: 'article' })
}
export default async function Page({ params }: Props) {
  const d = await getIssue((await params).slug)
  if (!d) notFound()
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'PublicationIssue', issueNumber: String(d.issue.number), name: d.issue.title, image: d.issue.cover || undefined, isPartOf: { '@type': 'Periodical', name: 'CanadianSME Small Business Magazine' } }} />
      <JsonLd data={breadcrumbLd([['Magazine', '/magazine/'], [d.issue.month, d.issue.href]])} />
      {await render('issue', <Issue />, { issue: d.issue })}
    </>
  )
}
