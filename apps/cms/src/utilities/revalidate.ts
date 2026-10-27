import type { PayloadRequest } from 'payload'
import { paths, type RevalidatePayload } from '@canadiansme/shared'

export { paths }
export type { RevalidatePayload }


/**
 * Tells the public website (apps/web in this repo) that content changed, so it can
 * refresh its cache. Configure on the website side an endpoint that accepts this JSON.
 *
 *   FRONTEND_REVALIDATE_URL=https://canadiansme.ca/api/revalidate
 *   REVALIDATE_SECRET=<shared secret>  (sent as the x-revalidate-secret header)
 *
 * Never throws: a website that is down must not block editors from saving.
 * Skipped when req.context.disableRevalidate is true (bulk imports).
 */
export const notifyFrontend = async (req: PayloadRequest, body: RevalidatePayload) => {
  if (req.context?.disableRevalidate) return
  const url = process.env.FRONTEND_REVALIDATE_URL
  if (!url) return

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET || '',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    clearTimeout(timer)
    if (!res.ok) {
      req.payload.logger.warn(`Frontend revalidate returned ${res.status} for ${body.paths.join(', ')}`)
    }
  } catch (err) {
    req.payload.logger.warn(`Frontend revalidate failed: ${(err as Error).message}`)
  }
}


export const getSiteURL = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://canadiansme.ca').replace(/\/$/, '')

/**
 * The website that shows this content (used for "View on website" and draft previews).
 * While canadiansme.ca still runs on WordPress this is the test copy, e.g.
 * WEBSITE_URL=https://canadiansme-web.vercel.app
 */
export const getWebsiteURL = () => (process.env.WEBSITE_URL || getSiteURL()).replace(/\/$/, '')

/** Where this CMS runs. On Vercel the project's own address is detected automatically. */
export const getServerURL = () =>
  (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    'http://localhost:3000'
  ).replace(/\/$/, '')

/** This deployment's own address on Vercel (differs per deployment), if any. */
export const getDeploymentURL = () => (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')
