import { search } from '@/lib/cms'

/** GET /api/search?q=&limit= — header search suggestions (proxied to the CMS). */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = (url.searchParams.get('q') || '').trim().slice(0, 100)
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 6, 1), 10)
  if (q.length < 2) return Response.json({ results: [], total: 0 })
  try {
    const res = await search(q, limit)
    return Response.json(res, { headers: { 'cache-control': 'public, s-maxage=60, stale-while-revalidate=300' } })
  } catch {
    return Response.json({ results: [], total: 0 }, { status: 502 })
  }
}
