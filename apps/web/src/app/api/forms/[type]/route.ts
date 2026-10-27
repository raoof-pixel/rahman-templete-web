import { FORM_TYPES, type FormType } from '@canadiansme/shared'

import { cmsUrl } from '@/lib/cms'
import { SITE_URL } from '@/lib/seo'

/**
 * POST /api/forms/<type> — the browser posts forms here; this forwards them to the CMS with a shared
 * secret, so the CMS form endpoint is never reachable directly from the internet.
 * Checks here are a first line of defence; the CMS validates everything again and rate-limits per IP.
 */
const MAX_BYTES = 10_000

const allowedOrigins = () => {
  const list = [SITE_URL, ...(process.env.FORMS_ALLOWED_ORIGINS || '').split(',')].map((s) => s.trim().replace(/\/$/, '')).filter(Boolean)
  if (process.env.NODE_ENV !== 'production') list.push('http://localhost:3001')
  return list
}

export async function POST(req: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  if (!(FORM_TYPES as readonly string[]).includes(type)) return Response.json({ ok: false, error: 'Unknown form.' }, { status: 404 })

  // Same-origin only (blocks other sites posting forms through a visitor's browser).
  const origin = req.headers.get('origin')
  if (!origin || !allowedOrigins().includes(origin.replace(/\/$/, ''))) {
    return Response.json({ ok: false, error: 'Forbidden.' }, { status: 403 })
  }
  if (!(req.headers.get('content-type') || '').includes('application/json')) {
    return Response.json({ ok: false, error: 'Unsupported content type.' }, { status: 415 })
  }
  const text = await req.text()
  if (text.length > MAX_BYTES) return Response.json({ ok: false, error: 'Too much data.' }, { status: 413 })
  let body: Record<string, unknown>
  try {
    body = JSON.parse(text)
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error()
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
  // Honeypot: real people never fill this hidden field. Pretend success so bots learn nothing.
  if (typeof body.company_website === 'string' && body.company_website.trim()) return Response.json({ ok: true })

  const secret = process.env.FORMS_SECRET
  if (!secret) return Response.json({ ok: false, error: 'Forms are not configured yet.' }, { status: 503 })

  // Visitor IP for rate limiting. CloudFront's own viewer-address header can't be forged by the client;
  // x-forwarded-for is only a fallback (its first entry can be supplied by the visitor).
  const viewer = req.headers.get('cloudfront-viewer-address') || ''
  const ip = (viewer ? viewer.replace(/:\d+$/, '').replace(/^\[|\]$/g, '') : '') || (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || ''
  try {
    const res = await fetch(`${cmsUrl()}/api/forms/${type as FormType}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forms-secret': secret, 'x-client-ip': ip, 'x-client-ua': (req.headers.get('user-agent') || '').slice(0, 300) },
      body: text,
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string>; download?: string }
    if (res.status === 429) return Response.json({ ok: false, error: 'Too many attempts. Please try again in a minute.' }, { status: 429 })
    return Response.json({ ok: Boolean(json.ok), error: json.ok ? undefined : json.error || 'Please check the form and try again.', fields: json.fields, download: json.ok ? json.download : undefined }, { status: res.ok ? 200 : res.status === 400 ? 400 : 502 })
  } catch {
    return Response.json({ ok: false, error: 'We could not send your form. Please try again.' }, { status: 502 })
  }
}
