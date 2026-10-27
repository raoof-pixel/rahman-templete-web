import 'server-only'

import type {
  AdvertiseData,
  AuthorData,
  ChromeData,
  EpisodeData,
  EventItem,
  HomeData,
  Issue,
  IssueData,
  LegalData,
  ListData,
  Offer,
  PodcastLinks,
  PostData,
  Program,
  ProvinceData,
  ResourceGroup,
  SearchResult,
  SitemapGroup,
  Episode,
} from '@canadiansme/shared'
import { cache } from 'react'

/**
 * Everything the website shows comes from the CMS's /api/site/* endpoints (apps/cms/src/site).
 *
 * Caching: AWS Amplify Hosting supports time-based ISR but not on-demand revalidation, so every
 * CMS response is cached for REVALIDATE seconds; a publish appears on the site within about a minute.
 */
export const REVALIDATE = 60

const CMS_URL = (process.env.CMS_URL || 'http://localhost:3000').replace(/\/$/, '')

export class CmsNotFound extends Error {}

async function site<T>(path: string, params: Record<string, string | number | undefined> = {}, opts: { noStore?: boolean } = {}): Promise<T> {
  const url = new URL(`${CMS_URL}/api/site/${path}`)
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '') url.searchParams.set(k, String(v))
  const res = await fetch(url, {
    headers: { accept: 'application/json' },
    ...(opts.noStore ? { cache: 'no-store' as const } : { next: { revalidate: REVALIDATE, tags: ['site', `site:${path}`] } }),
        signal: AbortSignal.timeout(process.env.NODE_ENV === 'production' ? 10_000 : 120_000),
  })
  if (res.status === 404) throw new CmsNotFound(url.pathname)
  if (!res.ok) throw new Error(`CMS ${res.status} for ${url.pathname}`)
  return (await res.json()) as T
}

/** Returns null instead of throwing when the CMS says 404. */
async function maybe<T>(p: Promise<T>): Promise<T | null> {
  try {
    return await p
  } catch (e) {
    if (e instanceof CmsNotFound) return null
    throw e
  }
}

export const getChrome = cache(() => site<ChromeData>('chrome'))
export const getHome = cache(() => site<HomeData>('home'))
export const getPost = cache((slug: string) => maybe(site<PostData>('post', { slug })))
export const getList = cache((kind: 'latest' | 'category' | 'tag', slug: string, page: number, sort?: string) =>
  maybe(site<ListData>('list', { kind, slug, page, sort })),
)
export const getAuthor = cache((slug: string, page: number) => maybe(site<AuthorData>('author', { slug, page })))
export const getIssues = cache(() => site<{ issues: Issue[] }>('issues'))
export const getIssue = cache((slug: string) => maybe(site<IssueData>('issue', { slug })))
export const getEpisodes = cache(() => site<{ episodes: Episode[]; links: PodcastLinks }>('episodes'))
export const getEpisode = cache((slug: string) => maybe(site<EpisodeData>('episode', { slug })))
export const getEvents = cache(() => site<{ events: EventItem[] }>('events'))
export const getEvent = cache((slug: string) => maybe(site<{ event: EventItem }>('event', { slug })))
export const getResources = cache(() => site<{ resourceGroups: ResourceGroup[] }>('resources'))
export const getOffers = cache(() => site<{ offers: Offer[] }>('offers'))
export const getProvince = cache((slug: string) => maybe(site<ProvinceData>('province', { slug })))
export const getLegal = cache((slug: string) => maybe(site<LegalData>('legal', { slug })))
export const getAbout = cache(() => site<{ programs: Program[] }>('about'))
export const getAdvertise = cache(() => site<AdvertiseData>('advertise'))
export const getSitemapGroups = cache(() => site<{ groups: SitemapGroup[] }>('sitemap-groups'))
export const search = (q: string, limit = 60) => site<{ results: SearchResult[]; total: number }>('search', { q, limit }, { noStore: true })

/* ---------------------------------------------------------------- raw Payload REST (feeds, sitemaps, redirects) */

type Paginated<T> = { docs: T[]; totalDocs: number; totalPages: number; page: number }

export async function payload<T>(path: string, params: Record<string, string | number> = {}, revalidate = 900) {
  const url = new URL(`${CMS_URL}/api/${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v))
  const res = await fetch(url, { next: { revalidate, tags: ['site'] }, signal: AbortSignal.timeout(15_000) })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`CMS ${res.status} for ${url.pathname}`)
  return (await res.json()) as T
}

export type SlimPost = { slug: string; title: string; excerpt?: string | null; publishedAt?: string | null; updatedAt: string; createdAt: string }

export const recentPosts = (limit: number, sinceISO?: string) =>
  payload<Paginated<SlimPost>>('posts', {
    sort: '-publishedAt',
    limit,
    depth: 0,
    'select[slug]': 'true',
    'select[title]': 'true',
    'select[excerpt]': 'true',
    'select[publishedAt]': 'true',
    'select[updatedAt]': 'true',
    ...(sinceISO ? { 'where[publishedAt][greater_than]': sinceISO } : {}),
  })

export const sitemapPosts = (page: number) =>
  payload<Paginated<SlimPost>>('posts', { sort: '-publishedAt', limit: 1000, page, depth: 0, 'select[slug]': 'true', 'select[updatedAt]': 'true' }, 3600)

export const sitemapCollection = (collection: string) =>
  payload<Paginated<{ slug: string; updatedAt: string }>>(collection, { limit: 1000, depth: 0, 'select[slug]': 'true', 'select[updatedAt]': 'true' }, 3600)

/** Old URLs that the CMS redirects (from WordPress). */
export const resolve = (path: string) =>
  payload<{ type: string; to?: string; status?: number }>('resolve', { path }, REVALIDATE)

export const cmsUrl = () => CMS_URL
