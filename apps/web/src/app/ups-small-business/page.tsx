import type { Metadata } from 'next'

import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import Ups from '@/ui/parts/Ups'

export const revalidate = 60
export const metadata: Metadata = fixed('upsPage', '/ups-small-business/')
export default async function Page() {
  return render('upsPage', <Ups />)
}
