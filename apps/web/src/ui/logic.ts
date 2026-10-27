// @ts-nocheck — ported verbatim (with minimal changes) from the design prototype's page logic, which the
// generated markup in ./parts renders against. Behaviour is the prototype's; types are loose by design.
/* eslint-disable */
import { createElement, createRef } from 'react'
import { extrasFor, formatArticle } from '@/lib/articleFormat'

import type { SiteProps } from './types'

/**
 * SiteLogic = the prototype's `Component` class, adapted for the real site:
 *  - the page comes from the URL (`props.route`), not from a "#hash";
 *  - data comes from the CMS (`props.D`) instead of static arrays;
 *  - search, forms and navigation talk to the server instead of the in-memory prototype data;
 *  - SEO tags are rendered by Next.js on the server (the prototype's applySeo is gone).
 */
const DEFAULT_PARTNERS = [
  ['amazon-business', 'Amazon Business'],
  ['ups', 'UPS'],
  ['adp', 'ADP'],
  ['dell', 'Dell Technologies'],
  ['sage', 'Sage'],
  ['scotiabank', 'Scotiabank'],
  ['mirego', 'Mirego'],
  ['bdc', 'BDC'],
  ['roadtoev', 'Road to EV'],
  ['ingram-microsoft', 'Ingram Micro and Microsoft'],
  ['sunlife', 'Sun Life'],
  ['bell', 'Bell'],
  ['evcor', 'EVCOR'],
].map(([f, name]) => ({ name, logo: `/assets/partners/${f}.png`, href: '' }))

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TZ = 'America/Toronto'

/** POST a form through the website's own API (which forwards it to the CMS). */
async function postForm(type: string, data: Record<string, unknown>) {
  try {
    const res = await fetch(`/api/forms/${type}/`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...data, source: typeof location !== 'undefined' ? location.pathname : '' }),
    })
    const json = await res.json().catch(() => ({}))
    return res.ok && json.ok ? { ok: true, download: typeof json.download === 'string' ? json.download : '' } : { ok: false, error: json.error || 'Something went wrong. Please try again.' }
  } catch {
    return { ok: false, error: 'Network error. Please try again.' }
  }
}

const go = (href: string) => {
  if (typeof window !== 'undefined') window.location.assign(href)
}

export class SiteLogic {
  props: SiteProps
  state: any
  __host: any
  C: any

  /** (Re)load page data; called on construction and when a new page's data arrives. */
  setProps(props: SiteProps) {
    this.props = props
    const D = props.D || {}
    const home = D.home || {}
    const chrome = D.chrome || {}
    // The prototype's static data, now from the CMS.
    this.C = {
      SLIDES: home.slides || [],
      ARTICLES: home.articles || [],
      TOOLS: home.tools || [],
      WOTM: home.wotm || {},
      HERO: home.hero || {},
      SECONDARY: home.secondary || [],
      AI_TOPIC: home.aiTopic || { lead: {}, more: [] },
      SPOTLIGHT: home.spotlight || {},
      MOST_READ: home.mostRead || [],
      DEADLINES: home.deadlines || [],
      PROVINCES: home.provinces || [],
      PROVINCE_HUB: home.provinceHub || [],
      COMMUNITIES: home.communities || [],
      TOPIC_CARDS: home.topicCards || [],
      OFFERS: (D.offers || home.offers || []).filter(Boolean),
      PROGRAMS: D.programs || home.programs || [],
      RESOURCE_GROUPS: D.resourceGroups || [],
      FINDER: home.finder || { agencies: {}, provs: [], needs: [], programs: [] },
      MENUS: chrome.menus || {},
      SISTER_TITLES: chrome.sisterTitles || [],
      ADV: D.advertise || { mediaKitUrl: '', metrics: [], interests: [], options: [], audience: [], goals: [], why: [], faq: [], budgets: [], timing: [] },
    }
  }

  constructor(props: SiteProps) {
    this.setProps(props)
    this.gridRef = createRef()
    this.searchRef = createRef()
    this.firstRef = createRef()
    this.emailRef = createRef()
    this.provRef = createRef()
    this.stageRef = createRef()
    this.consentRef = createRef()
    this.pageSearchRef = createRef()
    this.cNameRef = createRef()
    this.cEmailRef = createRef()
    this.cTopicRef = createRef()
    this.cMsgRef = createRef()
    this.barRef = createRef()
    this.popEmailRef = createRef()
    this.popMagRef = createRef()
    this.popNewsRef = createRef()
    this.state = {
      mega: '', drawer: false, cat: 'All', q: '', shown: (this.C.ARTICLES || []).length, msg: '', ok: false, share: '', cMsg: '', cOk: false,
      // Same width on the server and on the first client render (no hydration mismatch); measured after mount.
      w: 1280,
      sq: '', sOpen: false, hdrResults: [],
    }
  }

  setState(update, cb?) {
    this.__host && this.__host.__setLogicState(update, cb)
  }

  route() {
    return this.props.route
  }
  d(name) {
    return this.route() === name ? 'block' : 'none'
  }

  /* ---------------------------------------------------------------- legal + sitemap */
  legalVals() {
    const L = this.props.D.legal
    const p = L ? L.page : { title: '', label: '', intro: '', sections: [] }
    const md = (t) =>
      String(t)
        .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)
        .filter(Boolean)
        .map((x, i) => {
          if (/^\*\*/.test(x)) return createElement('strong', { key: i, style: { color: '#101828' } }, x.slice(2, -2))
          const m = x.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
          if (m) {
            const href = /^(https?:|mailto:|tel:|\/|#)/i.test(m[2]) ? m[2] : '#'
            return createElement('a', { key: i, href, target: href[0] === '/' || href[0] === '#' ? undefined : '_blank', rel: 'noopener', style: { color: '#1E5AA8', textDecoration: 'underline' } }, m[1])
          }
          return x
        })
    return {
      legalTitle: p.title,
      legalLabel: p.label,
      legalIntro: p.intro,
      legalSections: (p.sections || []).map((sec) => ({
        ...sec,
        hasItems: (sec.items || []).length > 0,
        paras: (sec.ps || []).map((t) => ({ c: md(t) })),
        list: (sec.items || []).map((t) => ({ c: md(t) })),
        go: () => {
          const el = document.getElementById(sec.id)
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' })
        },
      })),
      legalOthers: L ? L.others : [],
      sitemapGroups: this.props.D.sitemapGroups || [],
    }
  }

  /* ---------------------------------------------------------------- search (header + page) */
  searchVals() {
    const sq = this.state.sq || ''
    const hits = this.state.hdrResults || []
    const S = this.props.D.search || { q: '', results: [], total: 0 }
    const toSearch = (q) => go('/search/?q=' + encodeURIComponent(q))
    return {
      hdrQuery: sq,
      hdrInput: (e) => {
        const value = e.target.value
        this.setState({ sq: value, sOpen: true })
        this.queueSearch(value)
      },
      hdrFocus: () => this.setState({ sOpen: true }),
      hdrBlur: () => setTimeout(() => this.setState({ sOpen: false }), 180),
      hdrKey: (e) => {
        if (e.key === 'Escape') this.setState({ sOpen: false })
      },
      hdrSubmit: (e) => {
        e.preventDefault()
        const q = (this.state.sq || '').trim()
        if (q) toSearch(q)
      },
      hdrDropDisplay: this.state.sOpen && sq.trim().length > 1 ? 'block' : 'none',
      hdrHits: hits.map((h) => ({ ...h, go: () => go(h.href) })),
      hdrNone: hits.length === 0,
      hdrSome: hits.length > 0,
      hdrAll: 'See all results for “' + sq.trim() + '”',
      searchResults: (S.results || []).map((h) => ({ ...h, label: h.kind + (h.meta ? ' · ' + h.meta : '') })),
      searchEmpty: !!S.q && (S.results || []).length === 0,
      searchIntro: !S.q,
      pageQuery: S.q,
    }
  }
  /** Live header suggestions from /api/search (debounced; ignores out-of-order replies). */
  queueSearch(value) {
    clearTimeout(this.searchT)
    const q = (value || '').trim()
    if (q.length < 2) return this.setState({ hdrResults: [] })
    this.searchT = setTimeout(async () => {
      const ticket = (this.searchTicket = (this.searchTicket || 0) + 1)
      try {
        const res = await fetch('/api/search/?q=' + encodeURIComponent(q) + '&limit=6')
        const json = res.ok ? await res.json() : { results: [] }
        if (ticket === this.searchTicket) this.setState({ hdrResults: json.results || [] })
      } catch {
        /* keep previous suggestions */
      }
    }, 180)
  }

  /* ---------------------------------------------------------------- hero slider */
  goSlide(i) {
    const n = this.C.SLIDES.length || 1
    this.setState({ slide: ((i % n) + n) % n })
    this.startSlides()
  }
  startSlides() {
    clearInterval(this.slideTimer)
    if (this.route() !== 'home' || this.C.SLIDES.length < 2) return
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
    this.slideTimer = setInterval(() => {
      if (!this.slidePaused && !document.hidden && window.pageYOffset < 900) this.setState((s) => ({ slide: ((s.slide || 0) + 1) % this.C.SLIDES.length }))
    }, 6000)
  }

  /* ---------------------------------------------------------------- deadlines */
  nextDeadline() {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: TZ }))
    now.setHours(0, 0, 0, 0)
    let best = null
    this.C.DEADLINES.forEach((d) => {
      let t = d.iso ? new Date(d.iso + 'T00:00:00') : new Date(d.date + ' ' + now.getFullYear())
      if (isNaN(t)) return
      if (!d.iso && t < now) t = new Date(d.date + ' ' + (now.getFullYear() + 1))
      if (t < now) return
      if (!best || t < best.t) best = { t, d }
    })
    if (!best) return { date: '', title: '', days: '' }
    const n = Math.round((best.t - now) / 86400000)
    return { date: best.d.date, title: best.d.title, days: n === 0 ? 'today' : n === 1 ? 'tomorrow' : 'in ' + n + ' days' }
  }

  categories() {
    const seen = []
    this.C.ARTICLES.forEach((a) => {
      if (seen.indexOf(a.cat) === -1) seen.push(a.cat)
    })
    return seen
  }
  visibleArticles() {
    const q = (this.state.q || '').trim().toLowerCase()
    return this.C.ARTICLES.filter((a) => {
      const catOk = this.state.cat === 'All' || a.cat === this.state.cat
      const text = (a.title + ' ' + a.excerpt + ' ' + a.cat).toLowerCase()
      return catOk && (!q || text.includes(q))
    })
  }
  apply() {
    this.setState({ shown: this.visibleArticles().length })
  }

  /* ---------------------------------------------------------------- lifecycle */
  componentDidMount() {
    const measure = () => {
      const el = this.barRef && this.barRef.current
      const w = Math.round(el ? el.getBoundingClientRect().width : window.innerWidth)
      if (w !== this.state.w) this.setState({ w })
    }
    if (typeof ResizeObserver !== 'undefined' && this.barRef.current) {
      this.ro = new ResizeObserver(measure)
      this.ro.observe(this.barRef.current)
    }
    measure()
    this.onResize = measure
    window.addEventListener('resize', this.onResize)
    const popSeen = () => {
      try {
        const t = +localStorage.getItem('csme-pop-dismissed')
        return t && Date.now() - t < 7 * 864e5
      } catch (e) {
        return false
      }
    }
    this.openPop = () => {
      if (this.popShown || popSeen()) return
      this.popShown = true
      this.setState({ pop: true })
    }
    this.onScrollUI = () => {
      if (this.scrollRaf) return
      this.scrollRaf = requestAnimationFrame(() => {
        this.scrollRaf = 0
        this.scrollTick()
      })
    }
    this.scrollTick = () => {
      const y = window.pageYOffset
      if ((y > 600) !== !!this.state.showTop) this.setState({ showTop: y > 600 })
      const max = this.popShown ? 0 : document.documentElement.scrollHeight - window.innerHeight
      if (!this.popShown && max > 0 && y / max > 0.4) this.openPop()
    }
    window.addEventListener('scroll', this.onScrollUI, { passive: true })
    this.popTimer = setTimeout(this.openPop, 25000)
    this.onPopKey = (ev) => {
      if (ev.key !== 'Escape') return
      if (this.state.offer) this.setState({ offer: null })
      else if (this.state.gate) this.setState({ gate: null })
      else if (this.state.pop) this.dismissPop()
      else if (this.state.drawer || this.state.mega) this.setState({ drawer: false, mega: '' })
    }
    window.addEventListener('keydown', this.onPopKey)
    this.startSlides()
    // "/?finder=ON#provinces" (from a province page) preselects the funding finder.
    const finder = new URLSearchParams(location.search).get('finder')
    if (finder && /^[A-Z]{2}$/.test(finder)) this.setState({ finderProv: finder })
  }
  componentWillUnmount() {
    clearInterval(this.slideTimer)
    clearTimeout(this.popTimer)
    clearTimeout(this.searchT)
    this.ro && this.ro.disconnect()
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.onScrollUI)
    window.removeEventListener('keydown', this.onPopKey)
  }

  /* ---------------------------------------------------------------- province */
  provinceVals() {
    const P = this.props.D.province
    if (!P) return { pv: {}, pvOthers: [] }
    const p = P.province
    const ag = P.agency || ['', '#']
    const fed = [
      { label: ag[0], desc: 'Your federal regional development agency', href: ag[1] },
      { label: 'CRA My Business Account', desc: 'GST/HST, payroll and corporate tax online', href: 'https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/business-account.html' },
      { label: 'BDC', desc: 'Loans and advisory for Canadian entrepreneurs', href: 'https://www.bdc.ca/en' },
    ]
    return {
      pv: {
        name: p.name,
        intro: p.intro,
        factList: (p.facts || []).map(([k, v, d]) => ({ k, v, d })),
        watchList: (p.watch || []).map((t, i) => ({ t, n: String(i + 1).padStart(2, '0') })),
        statList: (p.about?.stats || []).map(([v, l, d]) => ({ v, l, d })),
        cap: p.about?.cap,
        city: p.about?.city,
        ind: p.about?.ind,
        premier: p.premier,
        cabinet: p.cabinet,
        premierSlot: 'premier-' + p.slug,
        ministerSlot: 'minister-' + p.slug,
        sbName: p.sbMin ? p.sbMin[0] : 'See current cabinet',
        sbRole: p.sbMin ? p.sbMin[1] : 'Portfolio varies by government',
        artTitle: p.article?.title,
        artSections: (p.article?.sections || []).map((sec) => ({ h: sec.h, hasH: !!sec.h, ps: (sec.ps || []).map((t) => ({ t })) })),
        startSteps: (p.start || []).map((st, i) => ({ ...st, n: i + 1 })),
        groups: [
          { heading: 'Register and stay compliant', links: p.comply || [] },
          { heading: 'Provincial funding and support', links: p.fund || [] },
          { heading: 'Federal support in ' + p.name, links: fed },
          {
            heading: 'Business networks and data',
            links: [
              { label: p.about?.chamber?.[0] || 'Chamber of Commerce', desc: 'Advocacy, events and member benefits', href: p.about?.chamber?.[1] || '#' },
              { label: 'CFIB', desc: 'Canadian Federation of Independent Business — research and advisers', href: 'https://www.cfib-fcei.ca/en' },
              { label: 'Key Small Business Statistics', desc: 'ISED’s official SME data, source for the figures above', href: 'https://ised-isde.canada.ca/site/sme-research-statistics/en/key-small-business-statistics/key-small-business-statistics-2025' },
            ],
          },
        ],
        openFinder: () => go('/?finder=' + p.code + '#provinces'),
      },
      pvOthers: P.others || [],
    }
  }

  /* ---------------------------------------------------------------- offers */
  offerVals() {
    this.offerEmailRef = this.offerEmailRef || createRef()
    const cat = this.state.offerCat || 'All',
      o = this.state.offer
    const OFFERS = this.C.OFFERS
    const cats = ['All', ...Array.from(new Set(OFFERS.map((x) => x.cat)))]
    return {
      offerCats: cats.map((c) => {
        const a = c === cat
        return { label: c, active: a, bg: a ? '#101828' : '#fff', fg: a ? '#fff' : '#101828', border: a ? '#101828' : '#E4C9CC', onClick: () => this.setState({ offerCat: c }) }
      }),
      offerCount: (() => {
        const n = OFFERS.filter((x) => cat === 'All' || x.cat === cat).length
        return n + (n === 1 ? ' offer' : ' offers') + (cat === 'All' ? ' available' : ' in ' + cat)
      })(),
      offers: OFFERS.filter((x) => cat === 'All' || x.cat === cat).map((x) => ({ ...x, claim: () => this.setState({ offer: x, offerDone: false, offerMsg: '' }) })),
      offerDisplay: o ? 'flex' : 'none',
      offerTitle: o ? o.title : '',
      offerPartner: o ? o.partner : '',
      offerCode: o ? o.code : '',
      offerHref: o ? o.href : '#',
      offerDone: !!this.state.offerDone,
      offerForm: !this.state.offerDone,
      offerMsg: this.state.offerMsg || '',
      offerEmailRef: this.offerEmailRef,
      closeOffer: () => this.setState({ offer: null }),
      closeOfferBg: (ev) => {
        if (ev.target === ev.currentTarget) this.setState({ offer: null })
      },
      onOfferSubmit: async (ev) => {
        ev.preventDefault()
        const form = ev.currentTarget
        const v = ((this.offerEmailRef.current || {}).value || '').trim()
        if (!EMAIL.test(v)) return this.setState({ offerMsg: 'Please enter a valid email address.' })
        const r = await postForm('offer', { email: v, offer: o ? o.slot : '', partner: o ? o.partner : '', optIn: false, company_website: form?.company_website?.value || '' })
        if (!r.ok) return this.setState({ offerMsg: r.error })
        this.setState({ offerDone: true, offerMsg: '' })
      },
    }
  }

  /* ---------------------------------------------------------------- gated downloads */
  openGate(it) {
    ;['gFirstRef', 'gLastRef', 'gEmailRef', 'gBizRef', 'gProvRef', 'gNewsRef'].forEach((k) => {
      this[k] = this[k] || createRef()
    })
    this.setState({ gate: it, gateDone: false, gateMsg: '', gateDownload: '' })
  }
  gateVals() {
    const g = this.state.gate
    ;['gFirstRef', 'gLastRef', 'gEmailRef', 'gBizRef', 'gProvRef', 'gNewsRef'].forEach((k) => {
      this[k] = this[k] || createRef()
    })
    const v = (k) => ((this[k].current || {}).value || '').trim()
    return {
      gateDisplay: g ? 'flex' : 'none',
      gateTitle: g ? g.title : '',
      gateDesc: g ? g.desc : '',
      gateKind: g ? String(g.kind || '').split(' · ')[0].toLowerCase() : '',
      // Gated files are only revealed after the form is submitted (the CMS returns the link).
      gateHref: g ? this.state.gateDownload || g.file || g.href : '#',
      gateDone: !!this.state.gateDone,
      gateForm: !this.state.gateDone,
      gateMsg: this.state.gateMsg || '',
      gateName: this.state.gateName || '',
      gFirstRef: this.gFirstRef,
      gLastRef: this.gLastRef,
      gEmailRef: this.gEmailRef,
      gBizRef: this.gBizRef,
      gProvRef: this.gProvRef,
      gNewsRef: this.gNewsRef,
      closeGate: () => this.setState({ gate: null }),
      closeGateBg: (ev) => {
        if (ev.target === ev.currentTarget) this.setState({ gate: null })
      },
      onGateSubmit: async (ev) => {
        ev.preventDefault()
        const form = ev.currentTarget
        if (v('gFirstRef').length < 2) return this.setState({ gateMsg: 'Please enter your first name.' })
        if (v('gLastRef').length < 1) return this.setState({ gateMsg: 'Please enter your last name.' })
        if (!EMAIL.test(v('gEmailRef'))) return this.setState({ gateMsg: 'Please enter a valid email address.' })
        if (v('gBizRef').length < 2) return this.setState({ gateMsg: 'Please enter your business name.' })
        if (!v('gProvRef')) return this.setState({ gateMsg: 'Please select your province or territory.' })
        const r = await postForm('gate', {
          first: v('gFirstRef'),
          last: v('gLastRef'),
          email: v('gEmailRef'),
          business: v('gBizRef'),
          province: v('gProvRef'),
          newsletter: !!(this.gNewsRef.current || {}).checked,
          resource: g ? g.slot || g.title : '',
          company_website: form?.company_website?.value || '',
        })
        if (!r.ok) return this.setState({ gateMsg: r.error })
        this.setState({ gateDone: true, gateMsg: '', gateName: v('gFirstRef'), gateDownload: r.download || '' })
      },
    }
  }

  /* ---------------------------------------------------------------- pop-up, back to top */
  dismissPop() {
    try {
      localStorage.setItem('csme-pop-dismissed', String(Date.now()))
    } catch (e) {}
    this.setState({ pop: false })
  }
  uiVals() {
    const top = !!this.state.showTop
    return {
      // The prototype's floating "Back" pill was a navigation aid for its #hash pages; browsers have Back.
      backDisplay: 'none',
      goBack: () => history.back(),
      topOpacity: top ? 1 : 0,
      topEvents: top ? 'auto' : 'none',
      topShift: top ? '0' : '12px',
      toTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      popDisplay: this.state.pop ? 'flex' : 'none',
      popSkip: this.state.popLink ? 'No thanks, continue reading' : 'No thanks',
      popDone: !!this.state.popDone,
      popForm: !this.state.popDone,
      popMsg: this.state.popMsg || '',
      popEmailRef: this.popEmailRef,
      popMagRef: this.popMagRef,
      popNewsRef: this.popNewsRef,
      closePop: () => {
        const l = this.state.popLink
        if (l) {
          this.setState({ pop: false, popLink: '' })
          window.open(l, '_blank', 'noopener')
        } else this.dismissPop()
      },
      closePopBg: (ev) => {
        if (ev.target === ev.currentTarget) {
          if (this.state.popLink) this.setState({ pop: false, popLink: '' })
          else this.dismissPop()
        }
      },
      onPopSubmit: async (ev) => {
        ev.preventDefault()
        const form = ev.currentTarget
        const email = ((this.popEmailRef.current || {}).value || '').trim()
        const magazine = !!(this.popMagRef.current || {}).checked
        const newsletter = !!(this.popNewsRef.current || {}).checked
        if (!EMAIL.test(email)) return this.setState({ popMsg: 'Please enter a valid email address.' })
        if (!magazine && !newsletter) return this.setState({ popMsg: 'Choose the magazine, the newsletter, or both.' })
        const r = await postForm('popup', { email, magazine, newsletter, company_website: form?.company_website?.value || '' })
        if (!r.ok) return this.setState({ popMsg: r.error })
        try {
          localStorage.setItem('csme-pop-dismissed', String(Date.now() + 365 * 864e5))
        } catch (e) {}
        const l = this.state.popLink
        if (l) window.open(l, '_blank', 'noopener')
        this.setState({ popDone: true, popMsg: '', popLink: '' })
        setTimeout(() => this.setState({ pop: false }), 2600)
      },
    }
  }

  /* ---------------------------------------------------------------- advertise */
  static advB(x, y, w, hh, bg, t, fg, fs, r) {
    return { x: x + '%', y: y + '%', w: w + '%', h: hh + '%', bg, t: t || '', fg: fg || '#fff', fs: (fs || 3) + 'cqw', r: r || '4px' }
  }
  static advGalleryData() {
    const B = SiteLogic.advB,
      L = '#E4E7EC',
      D = '#D0D5DD',
      BL = '#1E5AA8'
    const lines = (x, y0, w, n, step) => Array.from({ length: n }, (_, i) => B(x, y0 + i * step, i === n - 1 ? w * 0.7 : w, 2.6, L))
    return [
      { t: 'Magazine advertising', d: 'A full-page placement facing editorial in the digital edition.', bg: '#F4F6F8', blocks: [B(4, 6, 44, 88, '#fff'), B(8, 12, 30, 5, D), ...lines(8, 22, 36, 4, 6), B(8, 50, 36, 22, L), ...lines(8, 77, 36, 2, 6), B(52, 6, 44, 88, BL, 'Full-page ad', '#fff', 4)] },
      { t: 'Website banner placements', d: 'Leaderboard and sidebar display units on CanadianSME pages.', bg: '#fff', blocks: [B(0, 0, 100, 8, '#101828', '', '#fff', 2, '0'), B(15, 13, 70, 11, BL, 'Leaderboard', '#fff', 3), B(5, 30, 58, 6, D), B(5, 40, 58, 28, L), ...lines(5, 72, 58, 3, 6), B(68, 30, 27, 40, BL, 'Display unit', '#fff', 2.8)] },
      { t: 'Sponsored article layouts', d: 'A labelled sponsored article that names the partner.', bg: '#fff', blocks: [B(8, 8, 40, 7, '#FDECEC', 'SPONSORED · PARTNER', '#B42318', 2.2, '999px'), B(8, 20, 82, 7, D), B(8, 29, 56, 7, D), B(8, 42, 84, 28, L), ...lines(8, 75, 84, 3, 6)] },
      { t: 'Email campaign creatives', d: 'A dedicated partner message sent to opted-in subscribers.', bg: '#F4F6F8', blocks: [B(20, 5, 60, 90, '#fff'), B(20, 5, 60, 10, '#101828', 'CanadianSME', '#fff', 2.6, '4px 4px 0 0'), B(24, 20, 52, 28, BL, 'Partner message', '#fff', 3.2), ...lines(24, 53, 52, 3, 6), B(36, 75, 28, 8, '#D71920', 'Learn more', '#fff', 2.4, '999px')] },
      { t: 'Podcast or video sponsorship', d: 'Sponsor recognition within a podcast episode or video.', bg: '#101828', blocks: [B(8, 8, 84, 60, '#1D2939', '▶', '#98A2B3', 7, '8px'), B(8, 72, 84, 10, BL, 'Presented by partner', '#fff', 2.8), B(8, 88, 84, 2, '#344054', '', '#fff', 2, '999px'), B(8, 88, 30, 2, '#D71920', '', '#fff', 2, '999px')] },
      { t: 'Event branding', d: 'Partner recognition on stage, signage and event materials.', bg: '#F4F6F8', blocks: [B(6, 8, 88, 56, '#101828', '', '#fff', 2, '6px'), B(30, 16, 40, 12, BL, 'Partner logo', '#fff', 2.8), B(22, 34, 56, 10, 'transparent', 'CanadianSME event', '#fff', 3.4), B(0, 64, 100, 36, D, '', '#fff', 2, '0'), B(42, 54, 16, 30, '#344054', '', '#fff', 2, '4px 4px 0 0'), B(44, 60, 12, 6, BL, 'Logo', '#fff', 1.8, '2px')] },
    ]
  }
  advScroll(id, focusRef) {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
    if (focusRef && focusRef.current) setTimeout(() => focusRef.current && focusRef.current.focus({ preventScroll: true }), 450)
  }
  advVals() {
    if (this.route() !== 'advertising') return {}
    const A = this.C.ADV,
      st = this.state
    if (!this.advR) {
      this.advR = {}
      ;['name', 'company', 'email', 'website', 'phone', 'objective', 'budget', 'timing', 'details', 'consent'].forEach((k) => {
        this.advR[k] = createRef()
      })
    }
    const R = this.advR,
      err = st.advErr || {},
      ints = st.advInt || [],
      status = st.advStatus || ''
    const gal = this.advGal || (this.advGal = SiteLogic.advGalleryData())
    const lb = typeof st.advLb === 'number' ? st.advLb : -1
    const toForm = (pre) => () => {
      if (pre) this.setState((s) => ({ advInt: (s.advInt || []).includes(pre) ? s.advInt : [...(s.advInt || []), pre] }))
      this.advScroll('adv-form', R.name)
    }
    const kit = A.mediaKitUrl
    const out = {
      advKitReady: !!kit,
      advKitMissing: !kit,
      advKitUrl: kit,
      advToForm: toForm(null),
      advToFormIntegrated: toForm('Integrated Campaign / Not Sure Yet'),
      advAudience: A.audience.map(([t, d]) => ({ t, d })),
      advHasMetrics: A.metrics.length > 0,
      advMetrics: A.metrics,
      advOptions: A.options.map(([t, d], i) => ({ t, d, n: '0' + (i + 1), enquire: toForm(t) })),
      advGoals: A.goals.map((t, i) => ({ t, n: '0' + (i + 1) })),
      advWhy: A.why.map(([t, d]) => ({ t, d })),
      advFaq: A.faq.map(([q, a]) => ({ q, a })),
      advGallery: gal.map((g, i) => ({
        ...g,
        open: () => {
          this.advLbReturn = document.activeElement
          this.setState({ advLb: i })
        },
      })),
      advLbOn: lb >= 0,
      advLb: lb >= 0 ? gal[lb] : { t: '', d: '', bg: '#fff', blocks: [] },
      advLbCount: lb + 1 + ' of ' + gal.length,
      advLbClose: () => this.advLbShut(),
      advLbBackdrop: (e) => {
        if (e.target === e.currentTarget) this.advLbShut()
      },
      advLbPrev: () => this.setState({ advLb: (lb - 1 + gal.length) % gal.length }),
      advLbNext: () => this.setState({ advLb: (lb + 1) % gal.length }),
      advLbKey: (e) => {
        if (e.key === 'Escape') this.advLbShut()
        else if (e.key === 'ArrowLeft') this.setState({ advLb: (lb - 1 + gal.length) % gal.length })
        else if (e.key === 'ArrowRight') this.setState({ advLb: (lb + 1) % gal.length })
      },
      advInterests: A.interests.map((t) => {
        const on = ints.includes(t)
        return {
          t,
          checked: on,
          bd: on ? '#1E5AA8' : '#D0D5DD',
          bg: on ? '#EEF4FB' : '#fff',
          toggle: () =>
            this.setState((s) => {
              const cur = s.advInt || []
              return { advInt: cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t] }
            }),
        }
      }),
      advObjectiveOpts: [...A.goals, 'Other'],
      advBudgetOpts: A.budgets,
      advTimingOpts: A.timing,
      advShowOk: status === 'ok',
      advShowFail: status === 'fail',
      advShowSummary: status === 'invalid',
      advSummary: 'Please fix ' + Object.keys(err).length + (Object.keys(err).length === 1 ? ' field' : ' fields') + ' marked below.',
      advSending: status === 'sending',
      advBtnLabel: status === 'sending' ? 'Sending…' : 'Request a Campaign Proposal',
      advBtnOpacity: status === 'sending' ? 0.7 : 1,
      advSubmit: (e) => this.advSubmit(e),
      mediaKitHref: kit || '/advertise-with-us/',
    }
    ;['name', 'company', 'email', 'website', 'phone', 'details', 'objective', 'budget', 'timing', 'consent'].forEach((k) => {
      out['advRef' + k] = R[k]
      out['advErr' + k] = err[k] || ''
      out['advInv' + k] = err[k] ? 'true' : 'false'
      out['advBd' + k] = err[k] ? '#B42318' : '#D0D5DD'
    })
    return out
  }
  advLbShut() {
    this.setState({ advLb: -1 })
    const r = this.advLbReturn
    if (r && r.focus) setTimeout(() => r.focus(), 0)
  }
  async advSubmit(e) {
    e.preventDefault()
    const R = this.advR,
      form = e.currentTarget
    const v = (k) => ((R[k].current || {}).value || '').trim()
    const d = { name: v('name'), company: v('company'), email: v('email'), website: v('website'), phone: v('phone'), objective: v('objective'), budget: v('budget'), timing: v('timing'), details: v('details') }
    const err = {}
    if (d.name.length < 2) err.name = 'Enter your full name.'
    if (d.company.length < 2) err.company = 'Enter your company or agency name.'
    if (!d.email) err.email = 'Enter your work email.'
    else if (!EMAIL.test(d.email)) err.email = 'Enter a valid email address, like name@company.ca.'
    if (d.website && !/^(https?:\/\/)?[^\s.\/]+(\.[^\s.\/]+)+(\/\S*)?$/i.test(d.website)) err.website = 'Enter a valid website, like company.ca.'
    if (d.phone && d.phone.replace(/\D/g, '').length < 10) err.phone = 'Enter a 10-digit phone number, or leave this blank.'
    if (!d.details) err.details = 'Tell us about your campaign.'
    else if (d.details.length < 20) err.details = 'Add a little more detail (at least 20 characters).'
    const keys = Object.keys(err)
    if (keys.length) {
      this.setState({ advErr: err, advStatus: 'invalid' })
      const first = R[keys[0]].current
      if (first) first.focus()
      return
    }
    this.setState({ advErr: {}, advStatus: 'sending' })
    const r = await postForm('advertise', { ...d, interests: this.state.advInt || [], newsletterOptIn: !!(R.consent.current && R.consent.current.checked), company_website: form?.company_website?.value || '' })
    if (r.ok) {
      form.reset()
      this.setState({ advStatus: 'ok', advInt: [] })
    } else this.setState({ advStatus: 'fail' })
  }

  /* ---------------------------------------------------------------- funding finder */
  finderVals() {
    const F = this.C.FINDER
    if (!F.provs.length) return { finderProv: '', onFinderProv: () => {}, finderProvOptions: [], finderNeeds: [], finderResults: [], finderCount: '' }
    const prov = this.state.finderProv || this.props.D.finderProv || 'ON',
      need = this.state.finderNeed || 'all'
    const [ag, agHref] = F.agencies[prov] || ['', '#']
    const provName = (F.provs.find((p) => p[0] === prov) || [prov, prov])[1]
    const regional = { tag: 'Regional agency · ' + provName, name: ag, desc: 'Your federal regional development agency funds growth, productivity and expansion projects in ' + provName + '.', href: agHref }
    let list = F.programs.filter((p) => need === 'all' || p.need.includes(need))
    if (ag && (need === 'all' || need === 'loans')) list = [regional, ...list]
    return {
      finderProv: prov,
      onFinderProv: (e) => this.setState({ finderProv: e.target.value }),
      finderProvOptions: F.provs.map(([value, label]) => ({ value, label })),
      finderNeeds: F.needs.map(([id, label]) => {
        const a = id === need
        return { label, active: a, bg: a ? '#101828' : '#fff', fg: a ? '#fff' : '#101828', border: a ? '#101828' : '#D0D5DD', onClick: () => this.setState({ finderNeed: id }) }
      }),
      finderResults: list,
      finderCount: list.length + (list.length === 1 ? ' programme' : ' programmes') + ' for ' + provName,
    }
  }

  today() {
    return new Date().toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: TZ })
  }

  /* ---------------------------------------------------------------- the view-model */
  renderVals() {
    const C = this.C
    const D = this.props.D
    const compact = this.state.w < 1240
    const menu = C.MENUS[this.state.mega] || null
    const nextDeadline = this.nextDeadline()
    const P = D.post
    const post0 = P ? P.post : { title: '', cat: '', date: '', author: '', read: '', img: '', alt: '', excerpt: '', html: '', source: '' }
    const au = P ? P.author : { name: '', role: '', bio: '' }
    const catShort = (post0.cat || '').replace(/^Sponsored · /, '')
    const post = {
      ...post0,
      catShort,
      sponsored: /^Sponsored/.test(post0.cat || ''),
      authorName: au.name,
      authorRole: au.role,
      authorBio: au.bio,
      initials: (au.name || '')
        .split(/\s+/)
        .filter((w) => /^[A-Z]/.test(w))
        .slice(0, 2)
        .map((w) => w[0])
        .join(''),
      shortDate: post0.dateISO ? new Date(post0.dateISO).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric', timeZone: TZ }) : '',
      // #a1 article layout (design template): breadcrumb, category pill, meta line, image caption
      crumb: (post0.title || '').length > 60 ? post0.title.slice(0, 60).replace(/\s+\S*$/, '') + '…' : post0.title || '',
      pill: /^Sponsored/.test(post0.cat || '') ? 'Sponsored · ' + catShort : catShort,
      metaLine: [post0.date ? 'Published ' + post0.date : '', post0.read].filter(Boolean).join(' · '),
      caption: post0.alt && post0.alt.trim() !== (post0.title || '').trim() ? post0.alt : '',
      authorHref: P && P.author.slug ? '/author/' + P.author.slug + '/' : '/contributors/',
    }
    // Article body in the #a1 structure + Quick Read; see lib/articleFormat.ts
    const article = formatArticle(post0.html || '', post0.slug)
    const extras = extrasFor(post0.slug)
    const slides = C.SLIDES
    const slideN = slides.length || 1
    const slideI = (((this.state.slide || 0) % slideN) + slideN) % slideN
    const rt = this.route(),
      on = {}
    ;['home', 'post', 'article', 'category', 'search', 'magArchive', 'issue', 'podArchive', 'episode', 'events', 'event', 'resources', 'province', 'offersPage', 'about', 'advertising', 'contact', 'contributor', 'upsPage', 'subscribe', 'legal', 'sitemap', 'news', 'notFound'].forEach((k) => {
      on[k + 'On'] = rt === k
    })
    return {
      ...on,
      ...this.finderVals(),
      ...this.legalVals(),
      ...this.searchVals(),
      ...this.uiVals(),
      ...this.gateVals(),
      ...this.offerVals(),
      topicCards: C.TOPIC_CARDS,
      ...this.advVals(),
      // data the static prototype pages hard-coded, now from the CMS (see parts/*):
      list: D.list,
      author: D.author,
      issues: D.issues || [],
      latestIssue: (D.issues || [])[0],
      issue: D.issue,
      episodes: D.episodes || [],
      podcastLinks: D.podcastLinks || { spotify: '', apple: '', youtube: '' },
      episode: D.episode,
      events: D.events || [],
      event: D.event,
      slots: D.slots || {},
      slotAlts: D.slotAlts || {},
      social: D.chrome?.social || {},
      partners: D.chrome?.partners?.length ? D.chrome.partners : DEFAULT_PARTNERS,
      sidebarSponsored: D.home?.sidebarSponsored,
      /** Renders an ad slot: CMS creative, else the prototype's default; null in the CMS hides it. */
      ad: (slot, fallback, render) => {
        const ads = D.chrome?.ads || {}
        if (Object.prototype.hasOwnProperty.call(ads, slot)) return ads[slot] && ads[slot].img ? render(ads[slot]) : null
        return render(fallback)
      },
      latestIssueHref: D.chrome?.latestIssueHref || '/magazine/',
      morePosts: P ? P.morePosts : [],
      moreHeading: P ? P.moreHeading : '',
      slides: slides.map((sl, i) => ({
        ...sl,
        bg: sl.bg || 'transparent',
        onRead: (ev) => {
          ev.preventDefault()
          this.popShown = true
          this.setState({ pop: true, popLink: sl.href, popDone: false, popMsg: '' })
        },
        lineItems: (sl.lines || []).map((t) => ({ t })),
        active: i === slideI ? 'true' : 'false',
        hidden: i !== slideI,
        dotBg: i === slideI ? '#D71920' : 'rgba(255,255,255,0.35)',
        dotW: i === slideI ? '28px' : '10px',
        go: () => this.goSlide(i),
        label: 'Go to slide ' + (i + 1),
      })),
      slideOffset: 'translateX(-' + slideI * 100 + '%)',
      slideCount: slideI + 1 + ' / ' + slideN,
      prevSlide: () => this.goSlide(slideI - 1),
      nextSlide: () => this.goSlide(slideI + 1),
      pauseSlides: () => {
        this.slidePaused = true
      },
      resumeSlides: () => {
        this.slidePaused = false
      },
      post,
      postDisplay: this.d('post'),
      // Article HTML is cleaned by the CMS (sanitize-html allow-list) before it is stored; the formatter
      // only adds headings/classes and verified extras around it.
      postBody: createElement('div', { style: { maxWidth: '68ch' }, className: 'csme-prose', dangerouslySetInnerHTML: { __html: article.html } }),
      postCols: this.state.w < 960 ? 'minmax(0,1fr)' : 'minmax(0,1fr) 300px',
      postHasToc: article.toc.length > 1,
      postToc: article.toc.slice(0, 10).map((t) => ({
        label: t.label,
        href: '#' + t.id,
        go: (ev: { preventDefault: () => void }) => {
          ev.preventDefault()
          const el = document.getElementById(t.id)
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
        },
      })),
      postQuickRead: extras.quickRead,
      nextDeadline,
      today: this.today(),
      homeDisplay: this.d('home'),
      categoryDisplay: this.d('category'),
      searchDisplay: this.d('search'),
      magArchiveDisplay: this.d('magArchive'),
      issueDisplay: this.d('issue'),
      podArchiveDisplay: this.d('podArchive'),
      episodeDisplay: this.d('episode'),
      eventsDisplay: this.d('events'),
      eventDisplay: this.d('event'),
      resourcesDisplay: this.d('resources'),
      aboutDisplay: this.d('about'),
      legalDisplay: this.d('legal'),
      sitemapDisplay: this.d('sitemap'),
      offersPageDisplay: this.d('offersPage'),
      provinceDisplay: this.d('province'),
      ...this.provinceVals(),
      advertisingDisplay: this.d('advertising'),
      contactDisplay: this.d('contact'),
      contributorDisplay: this.d('contributor'),
      subscribeDisplay: this.d('subscribe'),
      notFoundDisplay: this.d('notFound'),
      categoryName: D.list ? D.list.title : 'Latest',
      eventName: D.event ? D.event.name : '',
      shareMessage: this.state.share,
      searchSummary: D.search && D.search.q ? D.search.total + (D.search.total === 1 ? ' result' : ' results') + ' for “' + D.search.q + '”' : 'Search every article, interview, province guide, resource and policy on CanadianSME.',
      contactMessage: this.state.cMsg,
      contactColor: this.state.cOk ? '#0B7A47' : '#B42318',
      pageSearchRef: this.pageSearchRef,
      cNameRef: this.cNameRef,
      cEmailRef: this.cEmailRef,
      cTopicRef: this.cTopicRef,
      cMsgRef: this.cMsgRef,
      share: (e) => {
        const kind = e.currentTarget.getAttribute('data-share')
        const url = location.href.split('#')[0]
        const title = document.title
        const targets = {
          facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
          x: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title),
          linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url),
          whatsapp: 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url),
          email: 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url),
        }
        if (kind === 'link') {
          ;(navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
            .then(() => this.setState({ share: 'Link copied to clipboard.' }))
            .catch(() => this.setState({ share: 'Copy this link: ' + url }))
          return
        }
        const t = targets[String(kind).toLowerCase()]
        if (t) window.open(t, '_blank', 'noopener,width=640,height=560')
      },
      onSearchPage: (e) => {
        e.preventDefault()
        const q = ((this.pageSearchRef.current || {}).value || '').trim()
        if (q) go('/search/?q=' + encodeURIComponent(q))
      },
      onContact: async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const name = ((this.cNameRef.current || {}).value || '').trim()
        const email = ((this.cEmailRef.current || {}).value || '').trim()
        const topic = (this.cTopicRef.current || {}).value || ''
        const msg = ((this.cMsgRef.current || {}).value || '').trim()
        if (name.length < 2) return this.setState({ cOk: false, cMsg: 'Please enter your name.' })
        if (!EMAIL.test(email)) return this.setState({ cOk: false, cMsg: 'Please enter a valid email address.' })
        if (!topic) return this.setState({ cOk: false, cMsg: 'Please choose a reason for contact.' })
        if (msg.length < 10) return this.setState({ cOk: false, cMsg: 'Please add a little more detail to your message.' })
        this.setState({ cOk: true, cMsg: 'Sending…' })
        const r = await postForm('contact', { name, email, topic, message: msg, company_website: form?.company_website?.value || '' })
        if (!r.ok) return this.setState({ cOk: false, cMsg: r.error })
        form.reset()
        this.setState({ cOk: true, cMsg: 'Thanks, ' + name + '. We’ll be in touch within two business days.' })
      },
      navDisplay: 'flex',
      navFlex: compact ? '1 1 100%' : '1 1 0',
      navOrder: compact ? 10 : 0,
      navMl: compact ? '0' : 'auto',
      navBorder: compact ? '1px solid #E4E7EC' : '0',
      navPad: compact ? '6px' : '0',
      burgerDisplay: 'inline-flex',
      barRef: this.barRef,
      secondaryCtaDisplay: this.state.w < 640 ? 'none' : 'inline-block',
      drawerOpen: this.state.drawer,
      megaDisplay: menu && !compact ? 'block' : 'none',
      megaCols: menu ? menu.cols : [],
      megaBadge: menu ? menu.badge : '',
      megaFeatured: menu ? menu.featured : '',
      megaFeaturedHref: menu ? menu.featuredHref : '#',
      drawerDisplay: this.state.drawer ? 'block' : 'none',
      latest: this.visibleArticles(),
      communities: C.COMMUNITIES,
      provinces: C.PROVINCES,
      provinceHub: C.PROVINCE_HUB,
      deadlines: C.DEADLINES,
      sisterTitles: C.SISTER_TITLES,
      tools: C.TOOLS,
      wotm: C.WOTM,
      hero: C.HERO,
      secondary: C.SECONDARY,
      aiLead: C.AI_TOPIC.lead || {},
      aiMore: C.AI_TOPIC.more || [],
      spotlight: C.SPOTLIGHT,
      mostRead: C.MOST_READ,
      catChips: this.categories(),
      resourceGroups: C.RESOURCE_GROUPS.map((g) => ({
        ...g,
        items: g.items.map((it) => ({
          ...it,
          openGate: () => this.openGate(it),
          gateKey: (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault()
              this.openGate(it)
            }
          },
        })),
      })),
      programs: C.PROGRAMS,
      resultLabel: !this.state.q && this.state.cat === 'All' ? 'Showing the ' + C.ARTICLES.length + ' most recent articles' : this.state.shown + (this.state.shown === 1 ? ' article matches' : ' articles match'),
      formMessage: this.state.msg,
      formColor: this.state.ok ? '#7BE2A8' : '#FF9AA0',
      gridRef: this.gridRef,
      searchRef: this.searchRef,
      firstRef: this.firstRef,
      emailRef: this.emailRef,
      provRef: this.provRef,
      stageRef: this.stageRef,
      consentRef: this.consentRef,
      openMega: (e) => this.setState({ mega: e.currentTarget.getAttribute('data-mega') || '' }),
      closeMega: () => this.setState({ mega: '' }),
      toggleDrawer: () => this.setState((s) => ({ drawer: !s.drawer })),
      closeDrawer: () => {
        clearTimeout(this.drawerT)
        this.drawerCool = Date.now()
        this.setState({ drawer: false })
      },
      openDrawerNow: () => {
        clearTimeout(this.drawerT)
        this.setState({ drawer: true })
      },
      leaveDrawer: () => {
        clearTimeout(this.drawerT)
        this.drawerT = setTimeout(() => this.setState({ drawer: false }), 300)
        this.drawerCool = Date.now()
      },
      stayDrawer: () => {
        clearTimeout(this.drawerT)
      },
      openDrawer: () => {
        if (this.state.drawer || Date.now() - (this.drawerCool || 0) < 900) return
        clearTimeout(this.drawerT)
        this.drawerT = setTimeout(() => this.setState({ drawer: true }), 150)
      },
      focusSearch: () => {
        const el = this.searchRef.current
        if (el) {
          el.focus()
          el.select && el.select()
        }
      },
      onSearch: (e) => {
        this.setState({ q: e.target.value }, () => this.apply())
      },
      onFilter: (e) => {
        const btn = e.currentTarget
        const val = btn.getAttribute('data-chip')
        const chips = btn.parentElement.querySelectorAll('[data-chip]')
        chips.forEach((c) => {
          const active = c === btn
          c.style.background = active ? '#101828' : '#fff'
          c.style.color = active ? '#fff' : '#101828'
          c.style.borderColor = active ? '#101828' : '#D0D5DD'
          c.setAttribute('aria-pressed', active ? 'true' : 'false')
        })
        this.setState({ cat: val }, () => this.apply())
      },
      toggleBookmark: (e) => {
        const b = e.currentTarget
        const on = b.getAttribute('aria-pressed') === 'true'
        b.setAttribute('aria-pressed', on ? 'false' : 'true')
        b.textContent = on ? '♡' : '♥'
        b.style.color = on ? '#98A2B3' : '#D71920'
        b.setAttribute('aria-label', on ? 'Bookmark this article' : 'Remove bookmark')
      },
      onSubscribe: async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const first = (this.firstRef.current || {}).value || ''
        const email = (this.emailRef.current || {}).value || ''
        const prov = (this.provRef.current || {}).value || ''
        const stage = (this.stageRef.current || {}).value || ''
        const consent = (this.consentRef.current || {}).checked
        if (first.trim().length < 2) return this.setState({ ok: false, msg: 'Please enter your first name.' })
        if (!EMAIL.test(email.trim())) return this.setState({ ok: false, msg: 'Please enter a valid email address.' })
        if (!prov) return this.setState({ ok: false, msg: 'Please select your province.' })
        if (!stage) return this.setState({ ok: false, msg: 'Please select your business stage.' })
        if (!consent) return this.setState({ ok: false, msg: 'Please confirm you agree to receive communications.' })
        const r = await postForm('newsletter', { first: first.trim(), email: email.trim(), province: prov, stage, consent: true, company_website: form?.company_website?.value || '' })
        if (!r.ok) return this.setState({ ok: false, msg: r.error })
        form.reset()
        this.setState({ ok: true, msg: 'Thanks, ' + first.trim() + '. Check your inbox to confirm your subscription.' })
      },
    }
  }
}
