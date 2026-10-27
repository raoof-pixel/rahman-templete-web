import type { Metadata } from 'next'

import { meta } from '@/lib/seo'
import { Tools } from '@/ui/tools/Tools'

export const metadata: Metadata = meta({
  title: 'Free Small Business Calculators',
  description: 'Free GST/HST, payroll, self-employed tax, import landed cost, pricing and break-even, cash-flow and loan calculators built on current 2026 Canadian federal and provincial rates. No sign-up, nothing stored.',
  path: '/tools/',
})

export default function Page() {
  return <Tools view="index" />
}
