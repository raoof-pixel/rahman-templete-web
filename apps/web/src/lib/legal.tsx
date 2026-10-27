import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getLegal } from '@/lib/cms'
import { render } from '@/lib/render'
import { fromSeo } from '@/lib/seo'
import Legal from '@/ui/parts/Legal'

export async function legalPage(slug: string) {
  const legal = await getLegal(slug)
  if (!legal) notFound()
  return render('legal', <Legal />, { legal })
}
export async function legalMeta(slug: string): Promise<Metadata> {
  const legal = await getLegal(slug).catch(() => null)
  if (!legal) return {}
  return fromSeo(legal.seo, { title: legal.page.title, description: legal.page.intro, path: `/${slug}/` })
}
