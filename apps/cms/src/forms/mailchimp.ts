import { createHash } from 'crypto'

/**
 * Adds or updates a Mailchimp audience member with status "pending" for new people, so Mailchimp
 * sends its confirmation email (double opt-in, CASL). Existing subscribers keep their status.
 * Only runs when MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID are set. Never throws.
 */
export async function mailchimpUpsert(email: string, firstName: string, lastName: string, tags: string[]): Promise<string> {
  const key = process.env.MAILCHIMP_API_KEY
  const list = process.env.MAILCHIMP_AUDIENCE_ID
  if (!key || !list) return 'skipped (not configured)'
  const dc = key.split('-')[1]
  if (!dc || !/^[a-z]+\d+$/.test(dc) || !/^[a-z0-9]+$/i.test(list)) return 'error: bad Mailchimp key or audience id'
  const hash = createHash('md5').update(email.toLowerCase()).digest('hex')
  const base = `https://${dc}.api.mailchimp.com/3.0/lists/${list}/members/${hash}`
  const auth = 'Basic ' + Buffer.from(`any:${key}`).toString('base64')
  const call = async (url: string, method: string, body: unknown) => {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 6000)
    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: auth, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
        redirect: 'error',
      })
      return res
    } finally {
      clearTimeout(t)
    }
  }
  try {
    const res = await call(base, 'PUT', {
      email_address: email,
      status_if_new: 'pending',
      merge_fields: { FNAME: firstName.slice(0, 80), LNAME: lastName.slice(0, 80) },
    })
    if (!res.ok) return `error: ${res.status}`
    if (tags.length) {
      await call(`${base}/tags`, 'POST', { tags: tags.map((name) => ({ name: name.slice(0, 100), status: 'active' })) })
    }
    return 'ok (pending confirmation if new)'
  } catch (err) {
    return `error: ${(err as Error).name}`
  }
}
