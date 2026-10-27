import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { JsonLd } from '@/lib/jsonld'
import { absolute, NOINDEX, SITE_NAME, SITE_URL } from '@/lib/seo'

import './proto-base.css'
import '../ui/states.css'
import './site.css'
import '../ui/article-tools.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'CanadianSME Small Business Magazine | Canadian Business Insights', template: '%s | CanadianSME' },
  description: 'Canadian small business news, CRA deadlines, federal and provincial funding, BDC and EDC financing, free tools and expert advice for owner-operators.',
  robots: NOINDEX ? { index: false, follow: false } : { index: true, follow: true, 'max-image-preview': 'large' },
  alternates: { types: { 'application/rss+xml': absolute('/feed/') } },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { themeColor: '#101828', width: 'device-width', initialScale: 1 }

const site = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'NewsMediaOrganization',
      '@id': absolute('/#org'),
      name: SITE_NAME,
      url: absolute('/'),
      logo: { '@type': 'ImageObject', url: absolute('/assets/canadiansme-logo.png') },
      parentOrganization: { '@type': 'Organization', name: 'Cmarketing Inc.', address: { '@type': 'PostalAddress', addressLocality: 'Mississauga', addressRegion: 'ON', addressCountry: 'CA' } },
      areaServed: 'CA',
      sameAs: ['https://smeawards.ca', 'https://smesummit.ca', 'https://smeexpo.ca', 'https://smbpodcast.ca'],
    },
    {
      '@type': 'WebSite',
      '@id': absolute('/#website'),
      url: absolute('/'),
      name: 'CanadianSME',
      inLanguage: 'en-CA',
      publisher: { '@id': absolute('/#org') },
      potentialAction: { '@type': 'SearchAction', target: absolute('/search/?q={search_term_string}'), 'query-input': 'required name=search_term_string' },
    },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" />
        <link rel="preload" as="image" href="/assets/canadiansme-logo.png" fetchPriority="high" />
        <JsonLd data={site} />
      </head>
      <body>{children}</body>
    </html>
  )
}
