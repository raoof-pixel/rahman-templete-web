/**
 * POST /api/forms/:type  — server-to-server only (the website's /api/forms route proxies the browser).
 *
 *  - x-forms-secret must equal FORMS_SECRET (compared in constant time); without it nothing is stored
 *  - body ≤ 10 KB JSON, validated per form (./validate.ts), honeypot `company_website` must be empty
 *  - at most 5 submissions per visitor IP per minute (counted in the database, so it works across
 *    serverless instances); the IP is stored only as a salted hash
 *  - stored in `submissions` (admin/editor-only); newsletter-type forms with consent are synced to
 *    Mailchimp as "pending" (double opt-in). A Mailchimp failure never loses the submission.
 */
import { createHash, timingSafeEqual } from 'crypto'
import type { Endpoint, PayloadRequest } from 'payload'

import { FORM_TYPES, type FormType } from '@canadiansme/shared'
import { clientIp } from '../collections/AuditLogs'
import { getServerURL } from '../utilities/revalidate'
import { mailchimpUpsert } from './mailchimp'
import { validate } from './validate'

const MAX_BYTES = 10 * 1024
const PER_MINUTE = 5

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y)
}
const hashIp = (ip: string) => createHash('sha256').update(`${process.env.PAYLOAD_SECRET || ''}|${ip}`).digest('hex').slice(0, 32)
const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export const formsEndpoint: Endpoint = {
  path: '/forms/:type',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    const secret = process.env.FORMS_SECRET || ''
    if (secret.length < 32 || !safeEqual(req.headers.get('x-forms-secret') || '', secret)) return reply({ ok: false, error: 'Forbidden' }, 403)

    const type = String(req.routeParams?.type || '') as FormType
    if (!(FORM_TYPES as readonly string[]).includes(type)) return reply({ ok: false, error: 'Unknown form' }, 404)

    if (Number(req.headers.get('content-length') || 0) > MAX_BYTES) return reply({ ok: false, error: 'Too large' }, 413)
    let body: Record<string, unknown>
    try {
      const text = req.text ? await req.text() : ''
      if (text.length > MAX_BYTES) return reply({ ok: false, error: 'Too large' }, 413)
      const parsed = JSON.parse(text || '{}')
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object')
      body = parsed
    } catch {
      return reply({ ok: false, error: 'Invalid request' }, 400)
    }

    // The website forwards the visitor's IP; only trusted because the shared secret matched.
    const ip = (req.headers.get('x-client-ip') || clientIp(req) || 'unknown').slice(0, 64)
    const ipHash = hashIp(ip)
    const payload = req.payload

    const since = new Date(Date.now() - 60_000).toISOString()
    const recent = await payload.count({
      collection: 'submissions',
      where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: since } }] },
      overrideAccess: true,
    })
    if (recent.totalDocs >= PER_MINUTE) return reply({ ok: false, error: 'Too many attempts. Please wait a minute and try again.' }, 429)

    const result = validate(type, body)
    if (!result.ok) {
      // Honeypot hits look like success to the bot, but nothing is stored.
      if (result.error === 'Spam check failed.') return reply({ ok: true })
      return reply(result, 400)
    }
    const v = result.value

    const doc = await payload.create({
      collection: 'submissions',
      data: {
        type,
        email: v.email || undefined,
        name: v.name || undefined,
        data: v.data,
        consent: { given: v.consentGiven, text: v.consentText || undefined, at: v.consentGiven ? new Date().toISOString() : undefined },
        source: typeof v.data.source === 'string' ? v.data.source : undefined,
        ipHash,
        userAgent: (req.headers.get('x-client-ua') || req.headers.get('user-agent') || '').slice(0, 300),
        status: 'new',
      } as any,
      overrideAccess: true,
      context: { disableRevalidate: true },
    })

    if (v.subscribe && v.consentGiven && v.email) {
      const [first, ...rest] = (v.name || String(v.data.first || '')).split(' ')
      const status = await mailchimpUpsert(v.email, first || '', rest.join(' '), v.tags)
      await payload
        .update({ collection: 'submissions', id: doc.id, data: { mailchimp: status } as any, overrideAccess: true, context: { disableRevalidate: true } })
        .catch(() => undefined)
    }

    // Gated downloads: hand back the file only after a valid form.
    if (type === 'gate' && typeof v.data.resource === 'string' && v.data.resource) {
      const r = await payload.find({
        collection: 'resources',
        where: { key: { equals: v.data.resource } },
        limit: 1,
        depth: 1,
        overrideAccess: false,
      })
      const res: any = r.docs[0]
      const raw = res?.file && typeof res.file === 'object' ? String(res.file.url || '') : ''
      const file = raw.startsWith('/') ? `${getServerURL()}${raw}` : raw
      return reply({ ok: true, download: file || res?.externalUrl || '' })
    }
    return reply({ ok: true })
  },
}
