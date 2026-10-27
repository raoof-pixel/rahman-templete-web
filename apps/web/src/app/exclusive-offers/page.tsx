import type { Metadata } from 'next'

import { getOffers } from '@/lib/cms'
import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import Offers from '@/ui/parts/Offers'

export const revalidate = 60
export const metadata: Metadata = fixed('offersPage', '/exclusive-offers/')
export default async function Page() {
  const { offers } = await getOffers()
  const slots: Record<string, string> = {}
  for (const o of offers) if (o.slot && o.logo) slots[o.slot] = o.logo
  return render('offersPage', <Offers />, { offers, slots })
}
