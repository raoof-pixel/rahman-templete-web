import type { Metadata } from 'next'

import { getAbout } from '@/lib/cms'
import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import About from '@/ui/parts/About'

export const revalidate = 60
export const metadata: Metadata = fixed('about', '/about/')
export default async function Page() {
  const { programs } = await getAbout()
  const slots: Record<string, string> = {}
  for (const p of programs) if (p.slot && p.img) slots[p.slot] = p.img
  return render('about', <About />, { programs, slots })
}
