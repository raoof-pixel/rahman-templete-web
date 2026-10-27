import type { Metadata } from 'next'

import { meta } from '@/lib/seo'
import { Tools } from '@/ui/tools/Tools'

export const metadata: Metadata = meta({
  title: 'Free Small Business Calculators',
  description: 'Free calculators built on Canadian rules: GST/HST, payroll deductions, 13-week cash flow and loan payments. No sign-up, nothing stored.',
  path: '/tools/',
})

export default function Page() {
  return <Tools view="index" />
}
