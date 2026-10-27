import type { Metadata } from 'next'

import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import Contact from '@/ui/parts/Contact'

export const revalidate = 60
export const metadata: Metadata = fixed('contact', '/contact/')
export default async function Page() {
  return render('contact', <Contact />)
}
