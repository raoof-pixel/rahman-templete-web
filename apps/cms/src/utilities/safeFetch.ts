/**
 * Fetch for server-side downloads of URLs that come from content (WordPress image URLs, seed data).
 * Guards against SSRF: https only (http allowed for the configured WordPress host), an allow-list of
 * hosts, redirects followed manually and re-checked, a size cap and a timeout. Never sends cookies
 * or credentials.
 */
const DEFAULT_HOSTS = [
  'canadiansme.ca',
  'www.canadiansme.ca',
  'i0.wp.com',
  'i1.wp.com',
  'i2.wp.com',
  'secure.gravatar.com',
  'smbpodcast.ca',
  'www.smbpodcast.ca',
]

export const allowedHosts = (): string[] => {
  const extra = (process.env.DOWNLOAD_ALLOWED_HOSTS || '').split(',').map((h) => h.trim().toLowerCase()).filter(Boolean)
  let wp: string[] = []
  try {
    if (process.env.WP_BASE_URL) wp = [new URL(process.env.WP_BASE_URL).hostname.toLowerCase()]
  } catch {
    wp = []
  }
  return [...new Set([...DEFAULT_HOSTS, ...wp, ...extra])]
}

export const isAllowedUrl = (raw: string): boolean => {
  let u: URL
  try {
    u = new URL(raw)
  } catch {
    return false
  }
  if (u.username || u.password) return false
  const host = u.hostname.toLowerCase()
  if (!allowedHosts().includes(host)) return false
  if (u.protocol === 'https:') return !u.port || u.port === '443'
  // Plain http only for the WordPress host the admin configured (e.g. a local backup server).
  const wp = process.env.WP_BASE_URL ? new URL(process.env.WP_BASE_URL) : null
  return u.protocol === 'http:' && Boolean(wp && wp.protocol === 'http:' && wp.hostname.toLowerCase() === host)
}

export async function safeDownload(
  url: string,
  opts: { maxBytes?: number; timeoutMs?: number } = {},
): Promise<{ data: Buffer; contentType: string; finalUrl: string } | null> {
  const maxBytes = opts.maxBytes ?? 50 * 1024 * 1024
  let current = url
  for (let hop = 0; hop < 4; hop++) {
    if (!isAllowedUrl(current)) {
      console.warn(`    blocked download (host not allowed): ${current}`)
      return null
    }
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 30_000)
    try {
      const res = await fetch(current, { method: 'GET', redirect: 'manual', signal: controller.signal, credentials: 'omit' })
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get('location')
        if (!loc) return null
        current = new URL(loc, current).toString()
        continue
      }
      if (!res.ok) {
        console.warn(`    download ${res.status}: ${current}`)
        return null
      }
      if (Number(res.headers.get('content-length') || 0) > maxBytes) return null
      const data = Buffer.from(await res.arrayBuffer())
      if (data.length > maxBytes) return null
      return { data, contentType: res.headers.get('content-type') || '', finalUrl: current }
    } catch (err) {
      console.warn(`    download failed (${(err as Error).name}): ${current}`)
      return null
    } finally {
      clearTimeout(timer)
    }
  }
  return null
}
