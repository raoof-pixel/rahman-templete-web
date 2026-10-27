import type { MetadataRoute } from 'next'

import { absolute, NOINDEX } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/search/', '/_preview/', '/api/', '/wp-admin/'] },
    sitemap: [absolute('/sitemap.xml'), absolute('/news-sitemap.xml')],
  }
}
