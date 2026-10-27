import type { Metadata } from 'next'

import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import NotFound from '@/ui/parts/NotFound'

export const metadata: Metadata = fixed('notFound', '/404/', true)

export default async function NotFoundPage() {
  return render('notFound', <NotFound />)
}
