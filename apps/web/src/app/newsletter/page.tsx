import type { Metadata } from 'next'

import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import Subscribe from '@/ui/parts/Subscribe'

export const revalidate = 60
export const metadata: Metadata = fixed('subscribe', '/newsletter/')
export default async function Page() {
  return render('subscribe', <Subscribe />)
}
