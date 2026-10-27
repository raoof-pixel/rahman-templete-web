import type {
  Community,
  Deadline,
  FinderData,
  HomeData,
  Offer,
  Program,
  ProvinceHubItem,
  ProvinceLink,
  TopicCard,
} from '@canadiansme/shared'

import { articleCard, fmtMonthDay, fmtShort, mediaAlt, mediaUrl, obj, postHref, rows, str, torontoDay, type Doc } from './common'
import { story } from './story'

export const provinceHref = (p: Doc) => `/provinces/${str(p.slug)}/`
const categoryHref = (c: Doc | null) => (c?.slug ? `/category/${c.slug}/` : '')

export const deadlinesOf = (docs: Doc[], now: Date): Deadline[] => {
  const today = torontoDay(now)
  return docs
    .filter((d) => d.date && torontoDay(new Date(d.date)) >= today)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .map((d) => ({ date: fmtMonthDay(d.date), title: str(d.title), who: str(d.who), iso: str(d.date), source: str(d.source) }))
}

export const offersOf = (docs: Doc[], now: Date, base: string): Offer[] => {
  const today = torontoDay(now)
  return docs
    .filter((o) => o.active !== false && (!o.expiresAt || torontoDay(new Date(o.expiresAt)) >= today))
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .map((o, i) => ({
      cat: str(o.cat),
      partner: str(o.partner),
      value: str(o.value),
      title: str(o.title),
      desc: str(o.desc),
      expires: str(o.expiresLabel) || (o.expiresAt ? `Ends ${fmtShort(o.expiresAt)}` : ''),
      code: str(o.code),
      href: str(o.href) || '#',
      slot: `offer-${i + 1}`,
      logo: mediaUrl(o.logo, base, 'thumbnail'),
    }))
}

export const programsOf = (rowsIn: Doc[], base: string): Program[] =>
  rowsIn.map((r) => ({
    slot: str(r.slot),
    title: str(r.title),
    desc: str(r.desc),
    image: str(r.image),
    href: str(r.href),
    cta: str(r.cta),
    img: mediaUrl(r.photo, base, 'card'),
  }))

export const finderOf = (provinces: Doc[], needs: Doc[], programs: Doc[]): FinderData => {
  const agencies: Record<string, [string, string]> = {}
  for (const p of provinces) if (p.code) agencies[p.code] = [str(p.agencyName), str(p.agencyUrl)]
  return {
    agencies,
    provs: provinces
      .filter((p) => p.code)
      .map((p) => [str(p.code), str(p.name)] as [string, string])
      .sort((a, b) => a[0].localeCompare(b[0])),
    needs: needs.map((n) => [str(n.key), str(n.label)] as [string, string]),
    programs: [...programs]
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
      .map((p) => ({ need: rows<string>(p.need).map(str), tag: str(p.tag), name: str(p.name), desc: str(p.desc), href: str(p.href) })),
  }
}

export type HomeInput = {
  homepage: Doc
  /** The "Ads & partners" global (sidebar sponsored story). */
  ads?: Doc | null
  latest: Doc[] // newest published posts, depth 1
  deadlines: Doc[]
  provinces: Doc[] // sorted by `order`
  offers: Doc[]
  fundingPrograms: Doc[]
  /** Per topic card (same index): number of posts in its categories and the newest one. */
  topicStats: { count: number; latest: Doc | null }[]
  /** Per community (same index): newest posts of its category, used when no stories are picked. */
  communityPosts: Doc[][]
  now: Date
  base: string
}

export function toHomeData(i: HomeInput): HomeData {
  const h = i.homepage || {}
  const base = i.base
  const hero = story(h.hero, base, { dateFmt: 'long' })
  const ai = obj(h.aiTopic) || {}
  const pick = <T extends object>(s: T, keys: (keyof T)[]) => Object.fromEntries(keys.map((k) => [k, s[k]])) as Pick<T, (typeof keys)[number]>

  const topicCards: TopicCard[] = rows(h.topicCards).map((t, idx) => {
    const st = i.topicStats[idx] || { count: 0, latest: null }
    const L = st.latest
    const media = obj(L?.featuredImage)
    return {
      name: str(t.name),
      href: str(t.href),
      desc: str(t.desc),
      ink: str(t.ink),
      tint: str(t.tint),
      line: str(t.line),
      countLabel: `${st.count}${st.count === 1 ? ' story' : ' stories'}`,
      img: mediaUrl(media, base, 'card'),
      alt: mediaAlt(media) || str(L?.title),
      latestTitle: str(L?.title),
      latestHref: L ? postHref(L) : str(t.href),
    }
  })

  const communities: Community[] = rows(h.communities).map((c, idx) => {
    const cat = obj(c.category)
    const auto = i.communityPosts[idx] || []
    const leadSlot = obj(c.lead)?.post || obj(c.lead)?.title ? c.lead : auto[0] ? { post: auto[0] } : c.lead
    const lead = story(leadSlot, base)
    const picked = rows(c.more)
    const more = (picked.length ? picked : auto.slice(1, 3).map((p): Doc => ({ post: p }))).map((m: Doc) => ({
      title: str(m.title) || str(obj(m.post)?.title),
      href: str(m.href) || postHref(m.post),
    }))
    return {
      heading: str(c.heading),
      slot: str(c.slot) || `comm-${idx + 1}`,
      href: str(c.href) || categoryHref(cat),
      lead: pick(lead, ['title', 'excerpt', 'img', 'alt', 'href']),
      more,
    }
  })

  const provinces: ProvinceLink[] = [...i.provinces]
    .sort((a, b) => str(a.name).localeCompare(str(b.name)))
    .map((p) => ({ href: provinceHref(p), label: str(p.name) }))
  const provinceHub: ProvinceHubItem[] = i.provinces.map((p) => ({ href: provinceHref(p), label: str(p.name), watch: str(p.hubSummary) }))

  const w = obj(h.wotm) || {}
  const ws = story(w, base)

  return {
    slides: rows(h.slides).map((s) => ({
      logo: mediaUrl(s.logo, base),
      logoAlt: str(s.logoAlt),
      lines: str(s.lines).split(/\r?\n/).map((l) => l.trim()).filter(Boolean),
      cta: str(s.cta),
      href: str(s.href),
      bg: str(s.bg),
      img: mediaUrl(s.image, base, 'large'),
      alt: str(s.alt),
    })),
    hero: pick(hero, ['cat', 'title', 'excerpt', 'date', 'read', 'img', 'alt', 'href']),
    secondary: rows(h.secondary).map((s, idx) => {
      const st = story(s, base)
      return {
        slot: `hs-${idx + 1}`,
        sponsor: str(s.sponsor),
        cat: st.cat,
        title: st.title,
        excerpt: st.excerpt,
        placeholder: str(s.placeholder),
        href: st.href,
        img: st.img,
        date: st.date,
        read: st.read,
      }
    }),
    articles: i.latest.slice(0, 12).map((p) => articleCard(p, base)),
    aiTopic: {
      lead: pick(story(ai.lead, base), ['title', 'excerpt', 'date', 'read', 'img', 'alt', 'href']),
      more: rows(ai.more).map((m) => pick(story(m, base), ['title', 'excerpt', 'date', 'read', 'img', 'alt', 'href'])),
    },
    spotlight: pick(story(h.spotlight, base), ['title', 'excerpt', 'img', 'alt', 'href']),
    mostRead: rows(h.mostRead).map((m, idx) => ({ n: idx + 1, title: str(m.title) || str(obj(m.post)?.title), href: str(m.href) || postHref(m.post) })),
    wotm: {
      month: str(w.month),
      name: str(w.name),
      role: str(w.role),
      kicker: str(w.kicker),
      excerpt: ws.excerpt,
      img: ws.img,
      alt: ws.alt,
      href: ws.href,
    },
    tools: rows(h.tools).map((t) => ({ mark: str(t.mark), title: str(t.title), desc: str(t.desc), href: str(t.href) })),
    deadlines: deadlinesOf(i.deadlines, i.now),
    provinces,
    provinceHub,
    communities,
    topicCards,
    offers: offersOf(i.offers, i.now, base),
    programs: programsOf(rows(h.programs), base),
    finder: finderOf(i.provinces, rows(h.finderNeeds), i.fundingPrograms),
    ...(obj(i.ads?.sidebarSponsored)?.title
      ? {
          sidebarSponsored: {
            title: str(i.ads!.sidebarSponsored.title),
            desc: str(i.ads!.sidebarSponsored.desc),
            href: str(i.ads!.sidebarSponsored.href),
          },
        }
      : {}),
  }
}
