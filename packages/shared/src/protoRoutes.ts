/**
 * The design prototype linked pages with "#hash" routes (href="#business", "#post-my-article").
 * The real site uses URL paths. `protoHref` translates one into the other; the CMS uses it when
 * seeding prototype content, and the website uses it for links written into the converted markup.
 */
import { PAGES } from './paths'

/** Prototype category keys -> WordPress category slugs (the live site's real categories). */
export const PROTO_CATEGORY: Record<string, string> = {
  business: 'small-business',
  entrepreneurship: 'entrepreneurship',
  technology: 'technology',
  leadership: 'small-business-leadership',
  finance: 'finance-for-small-businesses',
  diversity: 'diversity-and-inclusion',
  women: 'women-entrepreneurship',
  sustainability: 'sustainability',
  marketing: 'marketing',
  ai: 'artificial-intelligence',
  cyber: 'cybersecurity-for-small-businesses',
  digital: 'technology',
  economy: 'economy',
  scaling: 'small-business',
  operations: 'small-business',
  export: 'small-business',
  hiring: 'workplace',
  inclusion: 'diversity-and-inclusion',
  culture: 'workplace',
  funding: 'finance-for-small-businesses',
  productivity: 'small-business',
  entrepreneurs: 'interviews',
  interviews: 'interviews',
  indigenous: 'indigenous',
  black: 'black-business',
  lgbtq: 'diversity-and-inclusion',
}

/** Prototype event keys -> event slugs. */
export const PROTO_EVENT: Record<string, string> = {
  summit: 'small-business-summit',
  awards: 'small-business-awards',
  show: 'small-business-show',
  register: 'small-business-summit',
}

export const PROVINCE_SLUGS = [
  'ontario',
  'quebec',
  'british-columbia',
  'alberta',
  'manitoba',
  'saskatchewan',
  'nova-scotia',
  'new-brunswick',
  'newfoundland-and-labrador',
  'prince-edward-island',
  'yukon',
  'northwest-territories',
  'nunavut',
] as const

const HOME_ANCHORS = new Set([
  'offers',
  'main',
  'newsletter-form',
  'topics',
  'spotlight',
  'ai-coverage',
  'deadlines',
  'provinces',
  'communities',
  'woman-of-the-month',
  'nominate-woman',
  'editorial',
  'sponsored',
])

const RESOURCE_KEYS = new Set([
  'starting', 'plans', 'grants', 'digital-guides', 'marketing-res', 'hr', 'cyber-checklists', 'exporting',
  'marketing-playbook', 'registration', 'licences', 'tax', 'financing', 'cashflow', 'pricing', 'procurement',
  'ecommerce', 'ai-adoption', 'sustainability-guide', 'succession',
])

const FIXED: Record<string, string> = {
  '': PAGES.home,
  home: PAGES.home,
  latest: PAGES.latest,
  'all-articles': PAGES.latest,
  search: PAGES.search,
  magazine: PAGES.magazine,
  'past-issues': PAGES.magazine,
  'read-magazine': PAGES.magazine,
  podcast: PAGES.podcast,
  'all-podcasts': PAGES.podcast,
  'latest-episode': PAGES.podcast,
  ep1: PAGES.podcast,
  ep2: PAGES.podcast,
  ep3: PAGES.podcast,
  events: PAGES.events,
  upcoming: PAGES.events,
  resources: PAGES.resources,
  about: PAGES.about,
  team: `${PAGES.about}#team`,
  careers: `${PAGES.about}#careers`,
  community: `${PAGES.about}#community`,
  privacy: PAGES.privacy,
  terms: PAGES.terms,
  'terms-of-use': PAGES.termsOfUse,
  accessibility: PAGES.accessibility,
  sitemap: PAGES.sitemap,
  'advertise-with-us': PAGES.advertise,
  advertise: PAGES.advertise,
  'become-partner': `${PAGES.advertise}#adv-form`,
  'event-partner': `${PAGES.advertise}#adv-form`,
  'media-kit': PAGES.advertise,
  partners: PAGES.advertise,
  contact: PAGES.contact,
  submit: `${PAGES.contact}#contact-form`,
  contributors: PAGES.contributors,
  'ups-small-business': PAGES.ups,
  'ups-smb-of-the-day': PAGES.ups,
  'newsletter-page': PAGES.newsletter,
  newsletter: PAGES.newsletter,
  'exclusive-offers': PAGES.offers,
  'all-offers': PAGES.offers,
  tools: PAGES.tools,
}

/** "#business" -> "/category/small-business/", "#post-x" -> "/x/", "https://..." unchanged. */
export function protoHref(href: string | null | undefined, social: Partial<Record<string, string>> = {}): string {
  if (!href) return '#'
  if (!href.startsWith('#')) return href
  const h = href.slice(1).replace(/^\//, '')
  if (h.startsWith('post-')) return `/${h.slice(5)}/`
  if (h in FIXED) return FIXED[h]
  if (h in PROTO_CATEGORY) return `/category/${PROTO_CATEGORY[h]}/`
  if (h in PROTO_EVENT) return `${PAGES.events}${PROTO_EVENT[h]}/`
  if ((PROVINCE_SLUGS as readonly string[]).includes(h)) return `/provinces/${h}/`
  if (RESOURCE_KEYS.has(h)) return `${PAGES.resources}#${h}`
  if (HOME_ANCHORS.has(h)) return `/#${h}`
  if (['linkedin', 'youtube', 'instagram', 'facebook', 'x', 'spotify', 'apple'].includes(h)) return social[h] || '#'
  return href // in-page anchor (e.g. "#main", "#adv-form")
}
