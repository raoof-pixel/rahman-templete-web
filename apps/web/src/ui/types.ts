import type {
  AdvertiseData,
  AuthorData,
  ChromeData,
  Episode,
  EventItem,
  HomeData,
  Issue,
  LegalData,
  Link,
  ListData,
  Offer,
  PodcastLinks,
  PostData,
  Program,
  ProvinceData,
  ResourceGroup,
  SearchResult,
  SitemapGroup,
} from '@canadiansme/shared'

/** Which prototype page template to render (the prototype's route names). */
export type RouteKey =
  | 'home'
  | 'post'
  | 'category'
  | 'search'
  | 'magArchive'
  | 'issue'
  | 'podArchive'
  | 'episode'
  | 'events'
  | 'event'
  | 'resources'
  | 'province'
  | 'offersPage'
  | 'about'
  | 'advertising'
  | 'contact'
  | 'upsPage'
  | 'contributor'
  | 'subscribe'
  | 'legal'
  | 'sitemap'
  | 'notFound'

/** Everything a page can hand to the client view; each page fills only what it needs. */
export type SiteDataBundle = {
  chrome: ChromeData
  home?: HomeData
  post?: PostData
  list?: ListData
  author?: AuthorData
  issues?: Issue[]
  issue?: Issue
  episodes?: Episode[]
  podcastLinks?: PodcastLinks
  episode?: Episode
  events?: EventItem[]
  event?: EventItem
  resourceGroups?: ResourceGroup[]
  offers?: Offer[]
  programs?: Program[]
  province?: ProvinceData
  legal?: LegalData
  advertise?: AdvertiseData
  search?: { q: string; results: SearchResult[]; total: number }
  sitemapGroups?: SitemapGroup[]
  finderProv?: string
  /** image-slot id -> image URL (and alt text) */
  slots?: Record<string, string>
  slotAlts?: Record<string, string>
  breadcrumbs?: Link[]
}

export type SiteProps = { route: RouteKey; D: SiteDataBundle }
