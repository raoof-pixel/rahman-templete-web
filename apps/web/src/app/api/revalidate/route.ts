import { timingSafeEqual } from 'crypto'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { RevalidatePayload } from '@canadiansme/shared'

/**
 * POST /api/revalidate — called by the CMS after a publish. Instant refresh works when the site runs
 * on `next start` (local, EC2, containers). AWS Amplify Hosting ignores on-demand revalidation; there
 * pages refresh on their 60-second timer instead, so this endpoint is harmless there.
 */
const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET || ''
  if (!secret || !safeEqual(req.headers.get('x-revalidate-secret') || '', secret)) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  let body: RevalidatePayload
  try {
    body = (await req.json()) as RevalidatePayload
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }
  const paths = (body.paths || []).filter((p) => typeof p === 'string' && p.startsWith('/')).slice(0, 100)
  // All CMS data is fetched under the "site" tag, so one tag refreshes every page's data.
  revalidateTag('site')
  for (const p of paths) revalidatePath(p)
  return Response.json({ ok: true, revalidated: paths })
}
