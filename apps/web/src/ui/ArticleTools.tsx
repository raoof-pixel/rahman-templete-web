'use client'
/* Quick Read (AI summary) + Listen (read the article aloud) for article pages.
   Ported from the design template's article-tools.js. Styles: ui/article-tools.css.
   Listen plays the article's own recording when the CMS has one (PostFull.audio, e.g. the MP3s
   imported from WordPress). Otherwise it uses the browser's own speech engine (no cost, no network):
   it reads the title, intro and article body, highlights the paragraph being read and skips anything
   marked data-csme-noread. */
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import type { QuickRead } from '@/lib/articleFormat'

const RATES = [0.75, 1, 1.25, 1.5, 2]

const store = {
  get<T>(k: string, d: T): T {
    try {
      const v = localStorage.getItem(k)
      return v == null ? d : (JSON.parse(v) as T)
    } catch {
      return d
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(k, JSON.stringify(v))
    } catch {
      /* private mode */
    }
  },
}

const ttsAvailable = () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

function pickVoice(): SpeechSynthesisVoice | null {
  const vs = window.speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang))
  if (!vs.length) return null
  const score = (v: SpeechSynthesisVoice) =>
    (/en[-_]CA/i.test(v.lang) ? 6 : 0) + (/natural|neural|online|google|premium|enhanced/i.test(v.name) ? 5 : 0) + (/en[-_](US|GB)/i.test(v.lang) ? 2 : 0) + (v.localService === false ? 1 : 0)
  return [...vs].sort((a, b) => score(b) - score(a))[0]
}

/** Sentence-sized chunks: Chrome stops long utterances and this keeps highlighting accurate. */
function chunks(text: string): string[] {
  const parts = text.match(/[^.!?…]+[.!?…]+["”’)]*\s*|[^.!?…]+$/g) || [text]
  const out: string[] = []
  let cur = ''
  for (const p of parts) {
    if ((cur + p).length > 220 && cur) {
      out.push(cur.trim())
      cur = ''
    }
    cur += p
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

type Item = { node: Element; text: string }

function buildQueue(root: HTMLElement): Item[] {
  const article = root.closest('article')
  const column = root.parentElement
  const q: Item[] = []
  const h1 = article?.querySelector('h1')
  if (h1) q.push({ node: h1, text: (h1.textContent || '').trim() })
  const lead = h1?.nextElementSibling
  if (lead && lead.tagName === 'P') q.push({ node: lead, text: (lead.textContent || '').trim() })
  column?.querySelectorAll('h2,h3,h4,p,li,blockquote').forEach((n) => {
    if (n.closest('[data-csme-tools],[data-csme-noread]')) return
    if (n.tagName === 'P' && n.closest('blockquote,li')) return
    const t = (n.textContent || '').replace(/\s+/g, ' ').trim()
    if (t.length < 2) return
    for (const c of chunks(t)) q.push({ node: n, text: c })
  })
  return q
}

const Icon = {
  spark: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M10 2l1.9 5.1L17 9l-5.1 1.9L10 16l-1.9-5.1L3 9l5.1-1.9zM18 13l.9 2.6 2.6.9-2.6.9L18 20l-.9-2.6-2.6-.9 2.6-.9zM18 2l.6 1.4 1.4.6-1.4.6L18 6l-.6-1.4L16 4l1.4-.6z" />
    </svg>
  ),
  chev: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  ),
  pause: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  ),
  stop: (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path fill="currentColor" d="M6 6h12v12H6z" />
    </svg>
  ),
  head: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 15v-3a8 8 0 0116 0v3" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" fill="currentColor" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" fill="currentColor" />
    </svg>
  ),
}

function QuickReadBox({ data, speak }: { data: QuickRead; speak?: (text: string) => void }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(store.get('csme-qr-open', false)), [])
  const toggle = () => {
    setOpen((o) => {
      store.set('csme-qr-open', !o)
      return !o
    })
  }
  return (
    <section className="csme-qr" data-open={open} aria-label="Quick Read summary">
      <div className="csme-qr-in">
        <button type="button" className="csme-qr-btn" aria-expanded={open} aria-controls={id} onClick={toggle}>
          <span className="csme-qr-ic">{Icon.spark}</span>
          <span>
            <span className="csme-qr-t">{open ? 'Quick Read' : 'Show Quick Read'}</span>
            <span className="csme-qr-s">{data.reviewed ? 'Summary is AI-generated, newsroom-reviewed' : 'Summary is AI-generated · check the full article for details'}</span>
          </span>
          <span className="csme-qr-chev">{Icon.chev}</span>
        </button>
        <div className="csme-qr-body" id={id} hidden={!open}>
          <ul>
            {data.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="csme-qr-foot">
            <span>Key points only. The full article has the details.</span>
            {speak ? (
              <button type="button" onClick={() => speak('Quick read. ' + data.points.join('. ') + '.')}>
                Read summary aloud
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ArticleTools({ quickRead, readTime, listen = true, audio = '' }: { quickRead?: QuickRead; readTime?: string; listen?: boolean; audio?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [tts, setTts] = useState(false)
  const [state, setState] = useState<'idle' | 'playing' | 'paused'>('idle')
  const [pct, setPct] = useState(0)
  const [rate, setRate] = useState(1)
  const [note, setNote] = useState('')
  const s = useRef({ queue: [] as Item[], i: 0, playing: false, paused: false, fails: 0, noVoice: false, rate: 1, hi: null as Element | null })

  useEffect(() => {
    setTts(ttsAvailable())
    const r = store.get('csme-tts-rate', 1)
    setRate(r)
    s.current.rate = r
  }, [])

  const highlight = useCallback((node: Element | null) => {
    const st = s.current
    if (st.hi === node) return
    st.hi?.classList.remove('csme-reading')
    st.hi = node
    if (node) {
      node.classList.add('csme-reading')
      const r = node.getBoundingClientRect()
      if (r.top < 90 || r.bottom > window.innerHeight - 40) window.scrollTo({ top: window.scrollY + r.top - 140, behavior: 'smooth' })
    }
  }, [])

  const sync = useCallback(() => {
    const st = s.current
    setState(st.paused ? 'paused' : st.playing ? 'playing' : 'idle')
    setPct(st.playing || st.paused ? Math.round((st.i / (st.queue.length || 1)) * 100) : 0)
  }, [])

  const stop = useCallback(() => {
    const st = s.current
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    if (ttsAvailable()) window.speechSynthesis.cancel()
    st.playing = false
    st.paused = false
    st.i = 0
    highlight(null)
    sync()
  }, [highlight, sync])

  const next = useCallback(() => {
    const st = s.current
    if (!st.playing || st.paused) return
    if (st.i >= st.queue.length) {
      stop()
      return
    }
    const item = st.queue[st.i]
    highlight(item.node)
    const u = new SpeechSynthesisUtterance(item.text)
    const v = st.noVoice ? null : pickVoice()
    if (v) {
      u.voice = v
      u.lang = v.lang
    } else u.lang = 'en-CA'
    u.rate = st.rate
    u.onend = () => {
      if (!st.playing || st.paused) return
      st.fails = 0
      st.i++
      sync()
      next()
    }
    u.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return
      // A network voice can fail before it has loaded: retry with the default voice first.
      st.fails++
      if (st.fails === 1 && !st.noVoice) {
        st.noVoice = true
        setTimeout(next, 80)
        return
      }
      if (st.fails > 3) {
        stop()
        setNote('Audio is not available in this browser')
        return
      }
      st.i++
      setTimeout(next, 80)
    }
    window.speechSynthesis.speak(u)
    sync()
  }, [highlight, stop, sync])

  const playPause = () => {
    const st = s.current
    setNote('')
    const a = audioRef.current
    if (audio && a) {
      if (a.paused) {
        a.playbackRate = st.rate
        a.play().catch(() => setNote('The recording could not be played. Try again.'))
      } else a.pause()
      return
    }
    if (st.playing && !st.paused) {
      st.paused = true
      window.speechSynthesis.cancel()
      sync()
      return
    }
    if (st.paused) {
      st.paused = false
      next()
      return
    }
    window.speechSynthesis.cancel()
    st.queue = rootRef.current ? buildQueue(rootRef.current) : []
    st.i = 0
    st.fails = 0
    st.playing = true
    st.paused = false
    setTimeout(next, 80)
  }

  const speak = useCallback(
    (text: string) => {
      if (!ttsAvailable()) return
      stop()
      const u = new SpeechSynthesisUtterance(text)
      const v = pickVoice()
      if (v) u.voice = v
      u.rate = s.current.rate
      window.speechSynthesis.speak(u)
    },
    [stop],
  )

  const changeRate = (r: number) => {
    setRate(r)
    s.current.rate = r
    store.set('csme-tts-rate', r)
    if (audioRef.current) audioRef.current.playbackRate = r
    if (s.current.playing && !s.current.paused) {
      window.speechSynthesis.cancel()
      setTimeout(next, 60)
    }
  }

  // Stop reading when leaving the page.
  useEffect(() => {
    const onHide = () => stop()
    window.addEventListener('pagehide', onHide)
    return () => {
      window.removeEventListener('pagehide', onHide)
      stop()
    }
  }, [stop])

  const idle = (audio ? 'Hear the audio version of this article' : 'Hear the full article read aloud') + (readTime ? ' · about ' + readTime.replace(/\s*read$/, '') : '')
  const status = note || (state === 'paused' ? `Paused · ${pct}% read` : state === 'playing' ? `Reading aloud · ${pct}%` : idle)

  return (
    <div ref={rootRef} data-csme-tools="">
      {quickRead?.points?.length ? <QuickReadBox data={quickRead} speak={tts ? speak : undefined} /> : null}
      {audio ? (
        <audio
          ref={audioRef}
          src={audio}
          preload="none"
          onPlay={() => {
            s.current.playing = true
            s.current.paused = false
            setState('playing')
          }}
          onPause={() => {
            const a = audioRef.current
            s.current.paused = Boolean(a && a.currentTime > 0 && !a.ended)
            s.current.playing = s.current.paused
            setState(s.current.paused ? 'paused' : 'idle')
          }}
          onEnded={() => {
            s.current.playing = false
            s.current.paused = false
            setState('idle')
            setPct(0)
          }}
          onTimeUpdate={() => {
            const a = audioRef.current
            if (a && a.duration) setPct(Math.round((a.currentTime / a.duration) * 100))
          }}
          onError={() => setNote('The recording could not be loaded.')}
        />
      ) : null}
      {listen && (audio || tts) ? (
        <div className="csme-ls" role="region" aria-label="Listen to this article">
          <button type="button" className="csme-ls-play" onClick={playPause} aria-label={state === 'playing' ? 'Pause reading' : state === 'paused' ? 'Resume reading' : 'Listen to this article'}>
            {state === 'playing' ? Icon.pause : Icon.play}
          </button>
          <div className="csme-ls-meta">
            <span className="csme-ls-t">{Icon.head} Listen to this article</span>
            <span className="csme-ls-s" aria-live="polite">
              {status}
            </span>
            <div className="csme-ls-bar" aria-hidden="true">
              <i style={{ width: pct + '%' }} />
            </div>
          </div>
          {state !== 'idle' ? (
            <button type="button" className="csme-ls-stop" onClick={stop} aria-label="Stop reading">
              {Icon.stop}
            </button>
          ) : null}
          <select aria-label="Reading speed" value={String(rate)} onChange={(e) => changeRate(parseFloat(e.target.value))}>
            {RATES.map((r) => (
              <option key={r} value={String(r)}>
                {r}×
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  )
}
