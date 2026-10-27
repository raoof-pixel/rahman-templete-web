import { postgresAdapter } from '@payloadcms/db-postgres'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { timingSafeEqual } from 'crypto'
import path from 'path'
import { buildConfig } from 'payload'
import type { PayloadRequest } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { hasRole, isStaff } from './access'
import { AuditLogs } from './collections/AuditLogs'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { healthEndpoint, resolveEndpoint } from './endpoints/resolve'
import { securityScanEndpoint } from './endpoints/securityScan'
import { sitePreviewEndpoint } from './endpoints/sitePreview'
import { wpImportEndpoint } from './endpoints/wpImport'
import { Navigation, SiteSettings } from './globals/SiteSettings'
import { Advertise } from './globals/Advertise'
import { Ads } from './globals/Ads'
import { Homepage } from './globals/Homepage'
import {
  Deadlines,
  Events,
  FundingPrograms,
  LegalPages,
  MagazineIssues,
  Offers,
  PodcastEpisodes,
  Provinces,
  Resources,
  Submissions,
} from './collections/site'
import { formsEndpoint } from './forms/endpoint'
import { siteEndpoints } from './site/endpoints'
import { getDeploymentURL, getServerURL, getSiteURL, notifyFrontend } from './utilities/revalidate'

// Refuse to start in production with a weak or missing secret (it signs every login).
const secret = process.env.PAYLOAD_SECRET || ''
if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build' && secret.length < 32) {
  throw new Error('PAYLOAD_SECRET must be set to a random string of at least 32 characters.')
}

const storageEnabled = Boolean(process.env.S3_BUCKET)

/**
 * Public URL of a file in the Supabase bucket (the bucket must be set to "public"):
 * https://<project-ref>.supabase.co/storage/v1/object/public/<bucket>/<prefix>/<filename>
 */
const publicFileURL = (filename: string, prefix?: string) => {
  const base = (process.env.SUPABASE_URL || '').replace(/\/$/, '')
  const key = [prefix, filename].filter((x): x is string => Boolean(x)).map((x) => encodeURIComponent(x)).join('/')
  return `${base}/storage/v1/object/public/${process.env.S3_BUCKET}/${key}`
}

/** Supabase Postgres needs TLS. Its CA certificate can be given to verify the server fully. */
const databaseSSL = process.env.DATABASE_CA_CERT
  ? { ca: process.env.DATABASE_CA_CERT.replace(/\\n/g, '\n'), rejectUnauthorized: true }
  : undefined

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Origins allowed to call the API from a browser (the public website, previews). */
const allowedOrigins = [
  getServerURL(),
  getDeploymentURL(),
  getSiteURL(),
  ...(process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
].filter(Boolean)

export default buildConfig({
  serverURL: getServerURL().startsWith('http://localhost') ? undefined : getServerURL(),
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' - CanadianSME CMS' },
    theme: 'light', // matches the website; no dark mode
    components: {
      graphics: {
        Logo: '/components/Logo#Logo',
        Icon: '/components/Icon#Icon',
      },
      beforeLogin: ['/components/BeforeLogin#BeforeLogin'],
      afterNavLinks: ['/components/SecurityNavLink#SecurityNavLink'],
      views: {
        // Replaces Payload's grid of collection cards with our own, quieter home page.
        dashboard: { Component: '/components/Dashboard#Dashboard' },
        // /admin/security: page-by-page security scan of all content (admins only, read-only).
        securityScan: {
          Component: '/components/SecurityScanView#SecurityScanView',
          path: '/security',
          exact: true,
          meta: { title: 'Security scan' },
        },
      },
    },
  },
  // Order = admin sidebar order within each group.
  collections: [
    Posts,
    Categories,
    Tags,
    Authors,
    Media,
    Deadlines,
    MagazineIssues,
    PodcastEpisodes,
    Events,
    Provinces,
    Resources,
    FundingPrograms,
    Offers,
    Pages,
    LegalPages,
    Submissions,
    Users,
    AuditLogs,
  ],
  globals: [Homepage, Ads, Advertise, SiteSettings, Navigation],
  editor: lexicalEditor(),
  secret,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: {
      // Supabase: use the Supavisor pooler string (Project > Connect). See README.
      connectionString: process.env.DATABASE_URL || '',
      // Serverless functions each open their own pool; keep it small so the pooler isn't exhausted.
      max: Number(process.env.DATABASE_POOL_MAX || 5),
      ...(databaseSSL ? { ssl: databaseSSL } : {}),
    },
    // Schema changes only ever happen through reviewed migration files (pnpm migrate),
    // never by auto-pushing, so a dev machine can't silently alter the live database.
    push: false,
  }),
  sharp,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  // Limit how deep a single API request can pull related data (stops expensive abuse).
  maxDepth: 4,
  defaultDepth: 1,
  graphQL: {
    disablePlaygroundInProduction: true,
    disableIntrospectionInProduction: true,
    maxComplexity: 1000,
  },
  upload: {
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB per file (article audio, short videos)
    abortOnLimit: true,
    safeFileNames: true,
  },
  endpoints: [resolveEndpoint, healthEndpoint, wpImportEndpoint, sitePreviewEndpoint, securityScanEndpoint, formsEndpoint, ...siteEndpoints],
  plugins: [
    seoPlugin({
      collections: ['posts', 'pages', 'categories'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => (doc as { title?: string })?.title || '',
      generateDescription: ({ doc }) => (doc as { excerpt?: string })?.excerpt || '',
      generateURL: ({ doc }) => {
        const s = (doc as { slug?: string })?.slug
        return s ? `${getSiteURL()}/${s}/` : getSiteURL()
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'canonicalUrl',
          type: 'text',
          admin: { description: 'Leave empty to use the article URL.' },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'Hide from Google (noindex)',
        },
      ],
    }),
    redirectsPlugin({
      collections: ['posts', 'pages'],
      redirectTypes: ['301', '302'],
      overrides: {
        admin: { group: 'Settings' },
        access: { read: () => true, create: isStaff, update: isStaff, delete: isStaff },
        // The website caches redirect lookups; refresh them as soon as a redirect changes.
        hooks: {
          afterChange: [
            async ({ doc, req }) => {
              await notifyFrontend(req, {
                collection: 'redirects',
                event: 'change',
                paths: [String(doc.from || '')].filter((p) => p.startsWith('/')),
                tags: ['redirects'],
              })
              return doc
            },
          ],
        },
      },
    }),
    // Files live in a Supabase Storage bucket, reached through its S3-compatible API.
    // Off when S3_BUCKET is empty (local dev / CI), then files go to apps/cms/public/media.
    s3Storage({
      enabled: storageEnabled,
      // Keep the storage columns in the schema even when the plugin is off, so migrations
      // made on a laptop always match production.
      alwaysInsertFields: true,
      // Browsers upload straight to Supabase with a signed URL, so large files (MP3, MP4)
      // don't hit Vercel's 4.5 MB request limit.
      clientUploads: storageEnabled,
      collections: {
        media: {
          // Serve files straight from Supabase's CDN instead of proxying them through the CMS.
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => publicFileURL(filename, prefix),
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT, // https://<project-ref>.storage.supabase.co/storage/v1/s3
        region: process.env.S3_REGION || 'ca-central-1',
        forcePathStyle: true, // required by Supabase
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
  jobs: {
    // Scheduled publishing. On AWS, an EventBridge Scheduler rule calls
    // GET /api/payload-jobs/run every 5 minutes with "Authorization: Bearer CRON_SECRET" (see README).
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Admins (from the admin panel) or the scheduler with the shared secret.
        if (req.user) return hasRole(req.user as never, 'admin')
        const secret = process.env.CRON_SECRET || ''
        if (secret.length < 32) return false
        const sent = Buffer.from(req.headers.get('authorization') || '')
        const want = Buffer.from(`Bearer ${secret}`)
        return sent.length === want.length && timingSafeEqual(sent, want)
      },
    },
    tasks: [],
  },
})
