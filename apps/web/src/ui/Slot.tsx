'use client'
import type { CSSProperties } from 'react'

import { useV } from './context'

type Props = { id?: string; shape?: string; radius?: string; placeholder?: string; style?: CSSProperties; src?: string; alt?: string }

/**
 * Image slot from the prototype (<image-slot>). Shows the CMS image for this slot id when there is
 * one; otherwise a quiet placeholder (mist fill, dashed outline) as the design guide specifies.
 * The prototype's editor captions ("Drop article image") are never shown to readers.
 */
export function Slot({ id, shape, radius, placeholder, style, src, alt }: Props) {
  const v = useV()
  const url = src || (id ? v.slots?.[id] : '') || ''
  const r = shape === 'circle' ? '50%' : shape === 'rounded' ? `${radius || 12}px` : undefined
  const box: CSSProperties = { display: 'block', position: 'relative', width: '100%', height: '100%', aspectRatio: '3 / 2', ...style }
  if (url) {
    return (
      <span style={{ ...box, overflow: 'hidden', borderRadius: r }}>
        <img
          src={url}
          alt={alt ?? v.slotAlts?.[id || ''] ?? placeholder ?? ''}
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </span>
    )
  }
  return (
    <span aria-hidden="true" style={{ ...box, overflow: 'hidden', borderRadius: r, background: 'rgba(127,127,127,.08)' }}>
      <span style={{ position: 'absolute', inset: 0, border: '1.5px dashed currentColor', opacity: 0.2, borderRadius: r }} />
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.35 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </span>
    </span>
  )
}
