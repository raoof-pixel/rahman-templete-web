import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/** Image and media hosts the site may load (Supabase Storage, the old WordPress uploads during the move). */
const mediaHosts = [
  process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).origin : '',
  process.env.CMS_URL ? new URL(process.env.CMS_URL).origin : '',
  'https://canadiansme.ca',
  'https://i0.wp.com',
  'https://smbpodcast.ca',
].filter(Boolean)

/**
 * Content-Security-Policy. Inline styles are part of the design (the prototype uses them throughout);
 * scripts are limited to this site plus Google Analytics/Tag Manager. Embeds in old articles
 * (YouTube, Vimeo, Spotify, Issuu) are allowed as frames only.
 */
const csp = [
  "default-src 'self'",
  `img-src 'self' data: blob: ${mediaHosts.join(' ')} https://*.supabase.co https://www.googletagmanager.com https://www.google-analytics.com`,
  `media-src 'self' ${mediaHosts.join(' ')} https://*.supabase.co`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // Next.js needs inline bootstrap scripts; 'unsafe-eval' is not allowed.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  'frame-src https://www.youtube-nocookie.com https://www.youtube.com https://player.vimeo.com https://open.spotify.com https://issuu.com https://challenges.cloudflare.com',
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // WordPress URLs end with a slash (/my-article/); keep exactly the same URLs.
  trailingSlash: true,
  transpilePackages: ['@canadiansme/shared'],
  turbopack: { root: path.resolve(dirname, '../..') },
  images: { unoptimized: true },
  async headers() {
    const staging = process.env.SITE_NOINDEX === 'true'
    return [
      { source: '/:path*', headers: staging ? [...securityHeaders, { key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : securityHeaders },
      // The CMS preview loads this template from another origin.
      { source: '/_preview/', headers: [{ key: 'Access-Control-Allow-Origin', value: process.env.CMS_URL || '*' }] },
      { source: '/assets/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }] },
    ]
  },
  async redirects() {
    return [
      // Old WordPress addresses with a fixed new home. Article-level redirects live in the CMS.
      { source: '/about-us/', destination: '/about/', permanent: true },
      { source: '/contact-us/', destination: '/contact/', permanent: true },
      { source: '/subscription/', destination: '/newsletter/', permanent: true },
      { source: '/privacy-policy/', destination: '/privacy/', permanent: true },
      { source: '/canadiansme-privacy-policy/', destination: '/privacy/', permanent: true },
      { source: '/terms-of-service/', destination: '/terms/', permanent: true },
      { source: '/home-new/', destination: '/', permanent: true },
      { source: '/home-new-2/', destination: '/', permanent: true },
      { source: '/site-map/', destination: '/sitemap/', permanent: true },
      { source: '/ups-smb-of-the-day/', destination: '/ups-small-business/', permanent: true },
      { source: '/advertise/', destination: '/advertise-with-us/', permanent: true },
      { source: '/feed/rss2/', destination: '/feed/', permanent: true },
      { source: '/comments/feed/', destination: '/feed/', permanent: true },
      { source: '/category/:slug/feed/', destination: '/feed/', permanent: true },
      { source: '/:slug/amp/', destination: '/:slug/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: false },
      { source: '/wp-login.php', destination: '/', permanent: false },
      // Province pages moved under /provinces/.
      ...['ontario', 'quebec', 'british-columbia', 'alberta', 'manitoba', 'saskatchewan', 'nova-scotia', 'new-brunswick', 'newfoundland-and-labrador', 'prince-edward-island', 'yukon', 'northwest-territories', 'nunavut'].map((p) => ({
        source: `/${p}/`,
        destination: `/provinces/${p}/`,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
