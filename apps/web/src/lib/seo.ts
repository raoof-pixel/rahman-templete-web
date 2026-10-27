import type { Metadata } from 'next'

import type { Seo } from '@canadiansme/shared'

export const SITE_URL = (process.env.SITE_URL || 'https://canadiansme.ca').replace(/\/$/, '')
export const NOINDEX = process.env.SITE_NOINDEX === 'true'
export const SITE_NAME = 'CanadianSME Small Business Magazine'
export const DEFAULT_IMAGE = 'https://canadiansme.ca/wp-content/uploads/2026/10/CanadianSME-Small-Business-Magazine-October-2026.jpg'

export const absolute = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`)

/** Titles and descriptions of the fixed pages (from the design prototype's SEO_PAGES). */
export const SEO_PAGES = {
  home: ['CanadianSME Small Business Magazine | Canadian Business Insights', 'Canadian small business news, CRA deadlines, federal and provincial funding, BDC and EDC financing, free tools and expert advice for owner-operators.'],
  search: ['Search', 'Search CanadianSME articles, provinces, policies, guides and tools for Canadian small businesses.'],
  magArchive: ['Magazine Archive: Every Issue', 'Read every issue of CanadianSME Small Business Magazine, free. Interviews, guides and insight for Canadian entrepreneurs.'],
  podArchive: ['Small Business Podcast: Every Episode', 'Conversations with Canadian founders, lenders and policy experts on growing a small business in Canada.'],
  events: ['Upcoming Events for Canadian Small Businesses', 'The CanadianSME Small Business Summit, Awards and Expo: dates, venues and registration.'],
  resources: ['Free Business Resources and Guides', 'Free guides, templates and checklists for Canadian small businesses: registration, tax, funding, hiring, exporting and more.'],
  offersPage: ['Exclusive Offers for Canadian Small Businesses', 'Partner discounts on banking, software, shipping, travel and insurance for CanadianSME readers.'],
  about: ['About CanadianSME', 'CanadianSME Small Business Magazine is published by Cmarketing Inc. in Mississauga, Ontario, for Canadian small business owners.'],
  advertising: ['Advertise With Us', 'Advertise with CanadianSME: magazine, website, sponsored content, email, podcast and event partnerships that reach Canadian small business owners.'],
  contact: ['Contact CanadianSME', 'Contact the CanadianSME editorial, advertising and events teams.'],
  upsPage: ['UPS Small Business of the Day', 'Apply to be featured as UPS Small Business of the Day, powered by CanadianSME: free national promotion for Canadian small businesses.'],
  contributor: ['Contributors', 'Meet the editors and contributors behind CanadianSME Small Business Magazine.'],
  subscribe: ['Subscribe to the Newsletter', 'Free weekly briefing for Canadian small business owners: funding deadlines, CRA dates, new magazine issues and events.'],
  sitemap: ['Sitemap', 'Every page on CanadianSME, in one place.'],
  notFound: ['Page Not Found', 'This page could not be found.'],
} as const

const clip = (d: string) => {
  const t = (d || '').replace(/\s+/g, ' ').trim()
  return t.length > 158 ? t.slice(0, 155).replace(/\s+\S*$/, '') + '…' : t
}

/** Page metadata in the format the developer guide specifies (section 9.1). */
export function meta(opts: { title: string; description: string; path: string; image?: string; type?: 'website' | 'article'; noIndex?: boolean; canonical?: string; absoluteTitle?: boolean; published?: string; modified?: string }): Metadata {
  const url = opts.canonical || absolute(opts.path)
  const title = opts.absoluteTitle ? opts.title : `${opts.title} | CanadianSME`
  const description = clip(opts.description)
  const image = opts.image || DEFAULT_IMAGE
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: NOINDEX || opts.noIndex ? { index: false, follow: !NOINDEX } : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type: opts.type || 'website',
      siteName: SITE_NAME,
      locale: 'en_CA',
      title,
      description,
      url,
      images: [{ url: image }],
      ...(opts.type === 'article' ? { publishedTime: opts.published, modifiedTime: opts.modified } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export const fromSeo = (seo: Seo | undefined, fallback: { title: string; description: string; path: string; image?: string; type?: 'website' | 'article' }) =>
  meta({
    title: seo?.title || fallback.title,
    description: seo?.description || fallback.description,
    path: fallback.path,
    canonical: seo?.canonical || undefined,
    noIndex: seo?.noIndex,
    image: seo?.image || fallback.image,
    type: fallback.type,
  })

export const fixed = (key: keyof typeof SEO_PAGES, path: string, noIndex = false) =>
  meta({ title: SEO_PAGES[key][0], description: SEO_PAGES[key][1], path, absoluteTitle: key === 'home', noIndex })

/** BreadcrumbList JSON-LD (developer guide 9.2) — rendered next to the visible breadcrumb. */
export function breadcrumbLd(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'] as [string, string], ...items].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absolute(path) })),
  }
}
