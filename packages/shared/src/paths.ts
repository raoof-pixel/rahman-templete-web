/**
 * Public URL shapes of canadiansme.ca. They mirror the WordPress permalinks exactly so Google
 * rankings carry over. Used by the CMS (what to refresh on publish) and the website (links).
 */
export const paths = {
  post: (slug?: string | null) => (slug ? `/${slug}/` : null),
  page: (slug?: string | null) => (slug ? `/${slug}/` : null),
  category: (slug?: string | null) => (slug ? `/category/${slug}/` : null),
  tag: (slug?: string | null) => (slug ? `/tag/${slug}/` : null),
  author: (slug?: string | null) => (slug ? `/author/${slug}/` : null),
  province: (slug?: string | null) => (slug ? `/provinces/${slug}/` : null),
  issue: (slug?: string | null) => (slug ? `/magazine/${slug}/` : null),
  episode: (slug?: string | null) => (slug ? `/podcast/${slug}/` : null),
  event: (slug?: string | null) => (slug ? `/events/${slug}/` : null),
  legal: (slug?: string | null) => (slug ? `/${slug}/` : null),
}

/** Fixed pages of the new site (Developer Handoff Guide, section 3). */
export const PAGES = {
  home: '/',
  latest: '/latest/',
  search: '/search/',
  magazine: '/magazine/',
  podcast: '/podcast/',
  events: '/events/',
  resources: '/resources/',
  offers: '/exclusive-offers/',
  about: '/about/',
  contributors: '/contributors/',
  advertise: '/advertise-with-us/',
  contact: '/contact/',
  newsletter: '/newsletter/',
  tools: '/tools/',
  ups: '/ups-small-business/',
  sitemap: '/sitemap/',
  privacy: '/privacy/',
  terms: '/terms/',
  termsOfUse: '/terms-of-use/',
  accessibility: '/accessibility/',
} as const

/** Cache tags shared by the CMS webhook and the website's fetches. */
export const tags = {
  posts: 'posts',
  post: (slug: string) => `post:${slug}`,
  pages: 'pages',
  page: (slug: string) => `page:${slug}`,
  categories: 'categories',
  tags: 'tags',
  authors: 'authors',
  navigation: 'navigation',
  siteSettings: 'site-settings',
  redirects: 'redirects',
  home: 'home',
  site: 'site',
}

/** Body sent by the CMS to the website's /api/revalidate endpoint. */
export type RevalidatePayload = {
  collection: string
  event: 'change' | 'delete'
  paths: string[]
  tags: string[]
  id?: number | string
  slug?: string | null
}
