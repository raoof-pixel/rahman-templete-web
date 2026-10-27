import type { Metadata } from 'next'

import { getAdvertise } from '@/lib/cms'
import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import Advertise from '@/ui/parts/Advertise'

export const revalidate = 60
export const metadata: Metadata = fixed('advertising', '/advertise-with-us/')
export default async function Page() {
  return render('advertising', <Advertise />, { advertise: await getAdvertise() })
}
