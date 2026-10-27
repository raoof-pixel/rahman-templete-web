import type { Metadata } from 'next'

import { search } from '@/lib/cms'
import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import Search from '@/ui/parts/Search'

export const metadata: Metadata = fixed('search', '/search/', true)

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q
  const q = (Array.isArray(raw) ? raw[0] : raw || '').trim().slice(0, 100)
  const res = q ? await search(q, 60).catch(() => ({ results: [], total: 0 })) : { results: [], total: 0 }
  return render('search', <Search />, { search: { q, results: res.results, total: res.total } })
}
