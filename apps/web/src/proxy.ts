import { NextResponse, type NextRequest } from 'next/server'

/**
 * Old WordPress query-string URLs on the homepage:
 *   /?p=123        → the article that had WordPress ID 123
 *   /?page_id=45   → /latest/ (pages are few; add exact redirects in the CMS if needed)
 *   /?s=grants     → /search/?q=grants
 */
const CMS_URL = (process.env.CMS_URL || 'http://localhost:3000').replace(/\/$/, '')

export async function proxy(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const s = searchParams.get('s')
  if (s !== null) return NextResponse.redirect(new URL(`/search/?q=${encodeURIComponent(s)}`, req.url), 301)

  const p = searchParams.get('p')
  if (p && /^\d+$/.test(p)) {
    try {
      const res = await fetch(
        `${CMS_URL}/api/posts?where[wpId][equals]=${p}&limit=1&depth=0&select[slug]=true`,
        { next: { revalidate: 86400, tags: ['posts'] } },
      )
      const slug = res.ok ? ((await res.json()) as { docs?: { slug?: string }[] }).docs?.[0]?.slug : null
      if (slug) return NextResponse.redirect(new URL(`/${slug}/`, req.url), 301)
    } catch {
      // fall through to the homepage
    }
  }
  if (searchParams.has('page_id')) return NextResponse.redirect(new URL('/latest/', req.url), 301)
  return NextResponse.next()
}

// Only the homepage needs this; every other URL skips the proxy entirely.
export const config = { matcher: ['/'] }
