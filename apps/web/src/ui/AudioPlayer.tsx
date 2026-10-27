'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return '0:00'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  return (h ? h + ':' + String(m).padStart(2, '0') : String(m)) + ':' + String(sec).padStart(2, '0')
}

/** The prototype's episode player (red play button, progress bar, times), backed by a real <audio>. */
export function AudioPlayer({ src, length, title }: { src: string; length?: string; title: string }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [d, setD] = useState(0)
  useEffect(() => {
    const a = audio.current
    if (!a) return
    const on = () => setT(a.currentTime)
    const meta = () => setD(a.duration)
    const end = () => setPlaying(false)
    a.addEventListener('timeupdate', on)
    a.addEventListener('loadedmetadata', meta)
    a.addEventListener('ended', end)
    return () => {
      a.removeEventListener('timeupdate', on)
      a.removeEventListener('loadedmetadata', meta)
      a.removeEventListener('ended', end)
    }
  }, [])
  const toggle = () => {
    const a = audio.current
    if (!a || !src) return
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    else {
      a.pause()
      setPlaying(false)
    }
  }
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audio.current
    if (!a || !d) return
    const r = e.currentTarget.getBoundingClientRect()
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * d
  }
  const pct = d ? (t / d) * 100 : 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#161E32', border: '1px solid #262E44', borderRadius: '10px', padding: '14px 18px', maxWidth: '520px' }}>
      {src ? <audio ref={audio} src={src} preload="metadata" /> : null}
      <button
        type="button"
        onClick={toggle}
        disabled={!src}
        aria-label={(playing ? 'Pause ' : 'Play ') + title}
        style={{ width: '48px', height: '48px', flexShrink: '0', borderRadius: '50%', border: '0', background: '#D71920', color: '#fff', cursor: src ? 'pointer' : 'default', fontSize: '15px', opacity: src ? 1 : 0.6 }}
        className="h_58d1318"
      >
        {playing ? '❚❚' : '▶'}
      </button>
      <div style={{ flex: '1', minWidth: '0' }}>
        <div
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(d) || 0}
          aria-valuenow={Math.round(t)}
          tabIndex={src ? 0 : -1}
          onClick={seek}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            const a = audio.current
            if (!a) return
            if (e.key === 'ArrowRight') a.currentTime = Math.min(d, a.currentTime + 10)
            if (e.key === 'ArrowLeft') a.currentTime = Math.max(0, a.currentTime - 10)
          }}
          style={{ height: '6px', borderRadius: '3px', background: '#262E44', overflow: 'hidden', cursor: src ? 'pointer' : 'default' }}
        >
          <div style={{ width: pct + '%', height: '100%', background: '#D71920' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#98A2B3', marginTop: '8px' }}>
          <span>{fmt(t)}</span>
          <span>{d ? fmt(d) : length || ''}</span>
        </div>
      </div>
    </div>
  )
}
