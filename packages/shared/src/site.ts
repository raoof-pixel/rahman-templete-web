/**
 * THE CONTRACT between the CMS (apps/cms) and the website (apps/web).
 *
 * The website's design came from a Claude Design prototype whose page logic consumed static data
 * objects (SLIDES, ARTICLES, WOTM, PROVINCE_PAGES, ...). The website reuses that logic unchanged, so
 * the CMS serves exactly those shapes from its `/api/site/*` endpoints. Field names below match the
 * prototype; the only differences are:
 *   - every `href` is a real URL path ("/my-article/", "/category/technology/") or an absolute https URL,
 *     never a "#hash" route;
 *   - every image (`img`, `logo`, `cover`, ...) is an absolute URL (Supabase Storage) or "" when missing;
 *   - a few derived fields the prototype computed in the browser are computed by the CMS instead
 *     (marked "computed").
 *
 * Endpoints (GET, public, published content only, JSON):
 *   /api/site/chrome                     -> ChromeData
 *   /api/site/home                       -> HomeData
 *   /api/site/post?slug=                 -> PostData            (404 if no published post)
 *   /api/site/list?kind=&slug=&page=     -> ListData            kind: latest | category | tag
 *   /api/site/author?slug=&page=         -> AuthorData
 *   /api/site/issues                     -> { issues: Issue[] }
 *   /api/site/issue?slug=                -> IssueData
 *   /api/site/episodes                   -> { episodes: Episode[]; links: PodcastLinks }
 *   /api/site/episode?slug=              -> EpisodeData
 *   /api/site/events                     -> { events: EventItem[] }
 *   /api/site/event?slug=                -> { event: EventItem }
 *   /api/site/resources                  -> { resourceGroups: ResourceGroup[] }
 *   /api/site/offers                     -> { offers: Offer[] }
 *   /api/site/province?slug=             -> ProvinceData
 *   /api/site/legal?slug=                -> LegalData           slug: privacy | terms | terms-of-use | accessibility
 *   /api/site/about                      -> { programs: Program[] }
 *   /api/site/advertise                  -> AdvertiseData
 *   /api/site/search?q=&limit=           -> { results: SearchResult[]; total: number }
 *   /api/site/sitemap-groups             -> { groups: SitemapGroup[] }
 *
 * Form submissions (server-to-server only; the website proxies the browser's POST):
 *   POST /api/forms/:type   type: newsletter | popup | contact | advertise | gate | offer
 *   headers: x-forms-secret: FORMS_SECRET, x-client-ip: <visitor ip>
 *   -> { ok: true } | { ok: false, error: string, fields?: Record<string, string> }
 */

export type Link = { href: string; label: string }

/* ---------------------------------------------------------------- chrome (header, footer, popups) */
export type MegaMenu = { badge: string; featured: string; featuredHref: string; cols: { heading: string; links: Link[] }[] }
/** An ad or sponsor creative placed in a fixed slot of the design (see AD_SLOTS). */
export type AdCreative = { img: string; alt: string; href: string }
export type Partner = { name: string; logo: string; href: string }

/**
 * Ad/sponsor slots in the design. If a slot is missing from ChromeData.ads the website shows the
 * prototype's default creative; if it is present but null, the slot is hidden.
 */
export const AD_SLOTS = [
  'home-sidebar-1', // 300x250 (WSIB in the prototype)
  'home-sidebar-2', // 300x234 (ADP)
  'home-sidebar-3', // 300x600 (UPS)
  'home-banner-1', // 2500x750 sponsor banner (UPS)
  'home-banner-2', // 2500x750 sponsor banner (Air Canada)
  'home-subscribe-banner', // house ad -> newsletter form
  'home-advertise-banner', // house ad -> advertise page
  'post-sidebar-1', // 300x600 (UPS)
  'post-sidebar-2', // 300x250 (WSIB)
  'post-sidebar-3', // 300x234 (ADP)
] as const
export type AdSlot = (typeof AD_SLOTS)[number]

export type ChromeData = {
  /** Mega menus keyed by nav item: business, technology, about, leadership, finance. */
  menus: Record<string, MegaMenu>
  /** Sister titles shown in the footer ("Also from Cmarketing Inc."). */
  sisterTitles: { title: string; href: string }[]
  social: { linkedin: string; youtube: string; instagram: string; facebook: string; x: string; spotify?: string; apple?: string }
  /** Link to the latest magazine issue (pop-up "Read Now" etc.). */
  latestIssueHref: string
  /** Creatives per ad slot (see AD_SLOTS). */
  ads?: Partial<Record<AdSlot, AdCreative | null>>
  /** "Proudly supported by" / "Community Partners" logo strips, in display order. */
  partners?: Partner[]
  /** Author slug shown on /contributors/ (the editor's profile). */
  editorSlug?: string
}

/* ---------------------------------------------------------------- shared cards */
/** Article card (prototype ARTICLES). Also used for category/tag/author/latest lists. */
export type ArticleCard = {
  slot: string // stable key, e.g. "art-<postId>"
  cat: string // primary category title
  title: string
  excerpt: string
  date: string // "Oct 9, 2026"
  read: string // "6 min read" or ""
  byline: string // "By SK Uddin"
  img: string
  alt: string
  href: string // "/<slug>/"
  sponsored?: boolean
}

/* ---------------------------------------------------------------- home */
export type Slide = { logo: string; logoAlt: string; lines: string[]; cta: string; href: string; bg: string; img: string; alt: string }
export type Hero = { cat: string; title: string; excerpt: string; date: string; read: string; img: string; alt: string; href: string }
export type Secondary = { slot: string; sponsor: string; cat: string; title: string; excerpt: string; placeholder: string; href: string; img: string; date?: string; read?: string }
export type TopicStory = { title: string; excerpt: string; date: string; read: string; img: string; alt: string; href: string }
export type Wotm = { month: string; name: string; role: string; kicker: string; excerpt: string; img: string; alt: string; href: string }
export type Tool = { mark: string; title: string; desc: string; href: string }
export type Deadline = { date: string; title: string; who: string; iso?: string; source?: string }
export type ProvinceLink = { href: string; label: string }
export type ProvinceHubItem = { href: string; label: string; watch: string }
export type Community = {
  heading: string
  slot: string
  href: string
  lead: { title: string; excerpt: string; img: string; alt: string; href: string }
  more: { title: string; href: string }[]
}
export type TopicCard = {
  name: string
  href: string
  desc: string
  ink: string
  tint: string
  line: string
  // computed from the newest post in the card's categories:
  countLabel: string
  img: string
  alt: string
  latestTitle: string
  latestHref: string
}
export type Offer = { cat: string; partner: string; value: string; title: string; desc: string; expires: string; code: string; href: string; slot: string; logo?: string }
export type Program = { slot: string; title: string; desc: string; image: string; href: string; cta: string; img?: string }
export type FinderProgram = { need: string[]; tag: string; name: string; desc: string; href: string }
export type FinderData = {
  /** province code -> [agency name, agency url] */
  agencies: Record<string, [string, string]>
  /** [code, name] */
  provs: [string, string][]
  /** [id, label] */
  needs: [string, string][]
  programs: FinderProgram[]
}
export type HomeData = {
  slides: Slide[]
  hero: Hero
  secondary: Secondary[]
  articles: ArticleCard[] // 12 newest
  aiTopic: { lead: TopicStory; more: TopicStory[] }
  spotlight: { title: string; excerpt: string; img: string; alt: string; href: string }
  mostRead: { n: number; title: string; href: string }[]
  wotm: Wotm
  tools: Tool[]
  deadlines: Deadline[]
  provinces: ProvinceLink[]
  provinceHub: ProvinceHubItem[]
  communities: Community[]
  topicCards: TopicCard[]
  offers: Offer[]
  programs: Program[]
  finder: FinderData
  /** Sponsored-content card in the "Latest" sidebar. */
  sidebarSponsored?: { title: string; desc: string; href: string }
}

/* ---------------------------------------------------------------- article */
export type PostFull = {
  slug: string
  title: string
  cat: string // "Interviews" or "Sponsored · Finance for Small Businesses"
  catHref: string
  date: string // "October 9, 2026"
  dateISO: string
  updatedISO: string
  author: string // display name
  read: string // "6 min read"
  img: string
  alt: string
  excerpt: string
  /** Cleaned article HTML (legacy WordPress HTML or rendered editor content). */
  html: string
  source: string // original press-release URL or ""
  tags: Link[]
}
export type AuthorInfo = { name: string; role: string; bio: string; slug: string; img: string }
export type MorePost = { href: string; title: string; cat: string; excerpt: string; img: string; alt: string; author: string; initials: string; meta: string }
export type Seo = { title: string; description: string; canonical: string; noIndex: boolean; image: string }
export type PostData = { post: PostFull; author: AuthorInfo; morePosts: MorePost[]; moreHeading: string; seo: Seo }

/* ---------------------------------------------------------------- lists */
export type ListData = {
  kind: 'latest' | 'category' | 'tag'
  title: string // "Business"
  eyebrow: string // "Category" | "Tag" | "Latest"
  intro: string
  articles: ArticleCard[]
  page: number
  totalPages: number
  total: number
  seo: Seo
}
export type AuthorData = {
  author: AuthorInfo
  recent: { cat: string; title: string; href: string; img: string; alt: string }[]
  contributors: { name: string; role: string; href: string; img: string }[]
  page: number
  totalPages: number
  seo: Seo
}

/* ---------------------------------------------------------------- magazine, podcast, events */
export type Issue = {
  slug: string // "august-2026"
  number: number // 93
  month: string // "August 2026"
  title: string
  desc: string
  cover: string
  coverAlt: string
  readUrl: string // Issuu or PDF
  href: string // "/magazine/august-2026/"
  inside: { title: string; meta: string; href: string }[]
}
export type IssueData = { issue: Issue; seo: Seo }
export type Episode = {
  slug: string // "142-turning-ai-into-a-practical-small-business-advantage"
  number: number
  title: string
  desc: string
  date: string // "Aug 6, 2026"
  dateISO: string
  duration: string // "34 min"
  length: string // "34:02"
  art: string
  audioUrl: string
  href: string // "/podcast/<slug>/"
  notesIntro: string
  notes: { t: string; text: string }[]
  spotify: string
  apple: string
  youtube: string
}
export type PodcastLinks = { spotify: string; apple: string; youtube: string }
export type EpisodeData = { episode: Episode; seo: Seo }
export type EventItem = {
  slug: string
  name: string
  kicker: string // "MAY 21, 2027 · TORONTO"
  desc: string // short (card)
  intro: string // long (detail page)
  img: string
  imgAlt: string
  href: string // "/events/<slug>/"
  expect: string[]
  dateText: string // "October 21, 2026 · 8:30 AM – 6:00 PM"
  startISO: string
  endISO: string
  venue: string
  address: string
  admission: string
  registerUrl: string
  partnerUrl: string
  status: 'scheduled' | 'cancelled' | 'postponed' | 'past'
}

/* ---------------------------------------------------------------- resources, province, legal, advertise */
export type ResourceItem = { slot: string; kind: string; title: string; desc: string; image: string; href: string; img: string; gated: boolean; file: string }
export type ResourceGroup = { heading: string; sub: string; items: ResourceItem[] }

/** Prototype PROVINCE_PAGES entry. */
export type ProvincePage = {
  slug: string
  code: string
  name: string
  intro: string
  facts: [string, string, string][]
  watch: string[]
  comply: { label: string; desc: string; href: string }[]
  fund: { label: string; desc: string; href: string }[]
  about: { cap: string; city: string; ind: string; stats: [string, string, string][]; chamber: [string, string] }
  article: { title: string; sections: { h: string; ps: string[] }[] }
  premier: string
  cabinet: string
  sbMin: [string, string] | null
  start: { h: string; t: string; l: { label: string; href: string } | null }[]
  premierImg: string
  ministerImg: string
}
export type ProvinceData = { province: ProvincePage; others: Link[]; agency: [string, string]; seo: Seo }

export type LegalSection = { h: string; id: string; n: number; ps: string[]; items: string[] }
export type LegalPage = { label: string; title: string; intro: string; sections: LegalSection[] }
export type LegalData = { page: LegalPage; others: Link[]; seo: Seo }

export type AdvertiseData = {
  mediaKitUrl: string
  metrics: { v: string; l: string; source?: string }[]
  interests: string[]
  options: [string, string][]
  audience: [string, string][]
  goals: string[]
  why: [string, string][]
  faq: [string, string][]
  budgets: string[]
  timing: string[]
}

export type SearchResult = { kind: string; meta: string; title: string; desc: string; href: string }
export type SitemapGroup = { title: string; links: Link[] }

/* ---------------------------------------------------------------- forms */
export const FORM_TYPES = ['newsletter', 'popup', 'contact', 'advertise', 'gate', 'offer'] as const
export type FormType = (typeof FORM_TYPES)[number]
