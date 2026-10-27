/**
 * Round trip: prototype data -> seed documents -> /api/site mappers -> must equal the prototype data
 * (with "#hash" links turned into real URLs). Run: pnpm --filter @canadiansme/cms test:site
 */
import assert from 'node:assert/strict'
import { test } from 'node:test'

import { convHref, stripSponsored } from '../../seed/transform'
import { toHomeData } from '../home'
import { toPostData } from '../post'
import { toAdvertiseData, toChromeData, toLegalData, toProvinceData, toResourceGroups } from '../pages'
import { newestPosts, populated, posts, proto, seed } from './fixtures'

/* eslint-disable @typescript-eslint/no-explicit-any */
const conv = (o: any) => ({ ...o, href: convHref(o.href) })
const pick = (o: any, keys: string[]) => Object.fromEntries(keys.map((k) => [k, o[k]]))

const home = () => {
  const homepage = populated(seed.globals.homepage)
  const all = newestPosts()
  const topicStats = homepage.topicCards.map((t: any) => {
    const titles = t.categories.map((c: any) => c.title)
    const hits = all.filter((p) => p.categories.some((c: any) => titles.includes(c.title)))
    return { count: hits.length, latest: hits[0] ?? null }
  })
  return toHomeData({
    homepage,
    ads: populated(seed.globals.ads),
    latest: all.slice(0, 12),
    deadlines: seed.deadlines,
    provinces: seed.provinces,
    offers: seed.offers,
    fundingPrograms: seed.fundingPrograms,
    topicStats,
    communityPosts: homepage.communities.map(() => []),
    now: new Date('2026-01-01T12:00:00Z'),
    base: '',
  })
}

test('home: slides, hero, stories, lists', () => {
  const h = home()
  assert.deepEqual(h.slides, proto.SLIDES.map(conv))
  assert.deepEqual(h.hero, conv(proto.HERO))
  assert.deepEqual(h.aiTopic.lead, conv(proto.AI_TOPIC.lead))
  assert.deepEqual(h.aiTopic.more, proto.AI_TOPIC.more.map(conv))
  assert.deepEqual(h.spotlight, conv(proto.SPOTLIGHT))
  assert.deepEqual(h.mostRead, proto.MOST_READ.map(conv))
  assert.deepEqual(h.wotm, conv(proto.WOTM))
  assert.deepEqual(h.tools, proto.TOOLS.map(conv))
  assert.deepEqual(h.programs.map((p) => pick(p, ['slot', 'title', 'desc', 'image', 'href', 'cta'])), proto.PROGRAMS.map(conv))
  assert.deepEqual(
    h.secondary.map((s) => pick(s, ['slot', 'sponsor', 'cat', 'title', 'excerpt', 'placeholder', 'href'])),
    proto.SECONDARY.map(conv),
  )
  assert.deepEqual(
    h.communities,
    proto.COMMUNITIES.map((c: any) => ({ ...conv(c), lead: conv(c.lead), more: c.more.map(conv) })),
  )
  assert.equal(h.articles.length, 12)
  assert.equal(h.sidebarSponsored?.title, 'How Payment Automation Freed Up 12 Hours a Week')
})

test('home: deadlines, offers, provinces, finder, topic cards', () => {
  const h = home()
  assert.deepEqual(h.deadlines.map((d) => pick(d, ['date', 'title', 'who'])), proto.DEADLINES)
  assert.deepEqual(h.offers.map((o) => { const { logo, ...rest } = o; return rest }), proto.OFFERS.map((o: any) => ({ ...o, href: convHref(o.href) || '#' })))
  assert.deepEqual(h.provinces, proto.PROVINCES.map(conv))
  assert.deepEqual(h.provinceHub, proto.PROVINCE_HUB.map(conv))
  assert.deepEqual(h.finder.agencies, proto.FINDER_AGENCIES)
  assert.deepEqual(h.finder.provs, proto.FINDER_PROVS)
  assert.deepEqual(h.finder.needs, proto.FINDER_NEEDS)
  assert.deepEqual(h.finder.programs, proto.FINDER_PROGRAMS)
  // Topic cards: the prototype's own computation (newest post of the card's categories).
  const P = proto.POSTS
  const keys = Object.keys(P)
  const expected = proto.TOPIC_CARDS.map((t: any) => {
    const ks = keys
      .filter((k) => t.cats.map(stripSponsored).includes(stripSponsored(P[k].cat)))
      .sort((x, y) => +new Date(P[y].date) - +new Date(P[x].date))
    const L = P[ks[0]] || {}
    const { cats, ...rest } = conv(t)
    return {
      ...rest,
      countLabel: ks.length + (ks.length === 1 ? ' story' : ' stories'),
      img: L.img || '',
      alt: L.alt || L.title || '',
      latestTitle: L.title || '',
      latestHref: ks[0] ? `/${ks[0]}/` : convHref(t.href),
    }
  })
  assert.deepEqual(h.topicCards, expected)
})

test('post', () => {
  const slug = 'building-high-trust-teams-through-emotional-intelligence'
  const p = proto.POSTS[slug]
  const d = toPostData(posts.get(slug), newestPosts(), newestPosts(), '', 'https://canadiansme.ca')
  assert.deepEqual(pick(d.post, ['title', 'cat', 'date', 'read', 'img', 'alt', 'excerpt', 'html']), pick(p, ['title', 'cat', 'date', 'read', 'img', 'alt', 'excerpt', 'html']))
  assert.equal(d.post.source, p.source)
  assert.equal(d.morePosts.length, 4)
  assert.ok(!d.morePosts.some((m) => m.href === `/${slug}/`))
  const sponsored = toPostData(posts.get('duca-pfg-financial'), [], newestPosts(), '', 'https://canadiansme.ca')
  assert.equal(sponsored.post.cat, proto.POSTS['duca-pfg-financial'].cat)
  const au = proto.AUTHORS['DUCA Financial Services Credit Union Ltd.']
  assert.deepEqual(pick(sponsored.author, ['name', 'role', 'bio']), au)
  assert.equal(sponsored.seo.canonical, 'https://canadiansme.ca/duca-pfg-financial/')
})

test('province', () => {
  for (const [slug, p] of Object.entries<any>(proto.PROVINCE_PAGES)) {
    const doc = seed.provinces.find((x) => x.slug === slug)!
    const d = toProvinceData(doc, seed.provinces, '', 'https://canadiansme.ca')
    const { slug: s, premierImg, ministerImg, ...page } = d.province
    assert.equal(s, slug)
    assert.deepEqual(page, { ...p, sbMin: p.sbMin || null, start: p.start.map((x: any) => ({ ...x, l: x.l || null })) })
    assert.deepEqual(d.agency, proto.FINDER_AGENCIES[p.code])
    assert.equal(d.others.length, 12)
  }
})

test('legal', () => {
  for (const [slug, p] of Object.entries<any>(proto.LEGAL)) {
    const d = toLegalData(seed.legalPages.find((x) => x.slug === slug)!, seed.legalPages, 'https://canadiansme.ca')
    assert.deepEqual(d.page, p)
    assert.equal(d.others.length, 3)
  }
})

test('resources', () => {
  const groups = toResourceGroups(populated(seed.resources), '')
  assert.deepEqual(
    groups.map((g) => ({ heading: g.heading, sub: g.sub, items: g.items.map((i) => pick(i, ['slot', 'kind', 'title', 'desc', 'image', 'href'])) })),
    proto.RESOURCE_GROUPS.map((g: any) => ({ ...g, items: g.items.map(conv) })),
  )
  assert.ok(groups.every((g) => g.items.every((i) => i.gated && i.file === '')))
})

test('advertise', () => {
  const a = toAdvertiseData(seed.globals.advertise, '')
  assert.deepEqual(a, {
    mediaKitUrl: proto.ADV_MEDIA_KIT_URL,
    metrics: proto.ADV_METRICS,
    interests: proto.ADV_INTERESTS,
    options: proto.ADV_OPTIONS,
    audience: proto.ADV_AUDIENCE,
    goals: proto.ADV_GOALS,
    why: proto.ADV_WHY,
    faq: proto.ADV_FAQ,
    budgets: proto.ADV_BUDGETS,
    timing: proto.ADV_TIMING,
  })
})

test('chrome', () => {
  const issues = [...seed.issues].sort((a, b) => b.number - a.number)
  const c = toChromeData(seed.globals.navigation, { ...seed.globals.siteSettings, social: {} }, issues[0], populated(seed.globals.ads), '')
  const menus = Object.fromEntries(
    Object.entries<any>(proto.MENUS).map(([k, m]) => [
      k,
      { ...m, featuredHref: convHref(m.featuredHref), cols: m.cols.map((col: any) => ({ ...col, links: col.links.map(conv) })) },
    ]),
  )
  assert.deepEqual(c.menus, menus)
  assert.deepEqual(c.sisterTitles, proto.SISTER_TITLES.map(conv))
  assert.equal(c.latestIssueHref, '/magazine/august-2026/')
  assert.equal(Object.keys(c.ads || {}).length, 10)
  assert.equal(c.partners?.length, 13)
  assert.equal(c.editorSlug, 'sk-uddin')
})
