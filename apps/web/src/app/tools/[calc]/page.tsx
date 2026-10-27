import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { meta } from '@/lib/seo'
import { Tools, type ToolKey } from '@/ui/tools/Tools'

const TOOLS: Record<string, [string, string]> = {
  gst: ['GST/HST Calculator', 'Work out GST, HST, PST or QST for any province or territory, or back the tax out of a total.'],
  payroll: ['Payroll Deductions Estimator', 'Estimate CPP, EI and income tax withheld per pay period, plus the employer contributions, by province.'],
  cashflow: ['13-Week Cash-Flow Forecaster', 'Project your bank balance week by week, including payroll runs and GST/HST remittances.'],
  loan: ['Loan Payment Calculator', 'Compare a term loan, an operating line and equipment financing for the same amount.'],
}

export const dynamicParams = false
export const generateStaticParams = () => Object.keys(TOOLS).map((calc) => ({ calc }))

type Props = { params: Promise<{ calc: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = TOOLS[(await params).calc]
  return t ? meta({ title: t[0], description: t[1], path: `/tools/${(await params).calc}/` }) : {}
}

export default async function Page({ params }: Props) {
  const { calc } = await params
  if (!TOOLS[calc]) notFound()
  return <Tools view={calc as ToolKey} />
}
