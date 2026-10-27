'use client'
import { Fragment } from 'react'

const box = { width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontFamily: 'Sora,sans-serif', fontWeight: '600', fontSize: '14px' } as const

/** "/category/x/" + n -> "/category/x/page/n/" (the WordPress pagination URL shape). */
export const pageHref = (base: string, n: number, query = '') => (n <= 1 ? base : `${base}page/${n}/`) + query

/** Pagination in the prototype's style: current page dark, others outlined, "Next →" / "← Prev". */
export function Pager({ base, page, totalPages, query = '' }: { base: string; page: number; totalPages: number; query?: string }) {
  if (totalPages <= 1) return null
  const nums: (number | '…')[] = []
  for (let n = 1; n <= totalPages; n++) {
    if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) nums.push(n)
    else if (nums[nums.length - 1] !== '…') nums.push('…')
  }
  return (
    <nav aria-label="Pagination" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '44px', flexWrap: 'wrap' }}>
      {page > 1 ? (
        <a href={pageHref(base, page - 1, query)} rel="prev" style={{ ...box, width: 'auto', padding: '0 18px', border: '1.5px solid #D0D5DD', color: '#101828' }} className="h_11a32a0">
          ← Prev
        </a>
      ) : null}
      {nums.map((n, i) => (
        <Fragment key={i}>
          {n === '…' ? (
            <span style={{ ...box, color: '#667085' }}>…</span>
          ) : n === page ? (
            <span aria-current="page" style={{ ...box, background: '#101828', color: '#fff' }}>
              {n}
            </span>
          ) : (
            <a href={pageHref(base, n, query)} style={{ ...box, border: '1.5px solid #D0D5DD', color: '#101828' }} className="h_11a32a0">
              {n}
            </a>
          )}
        </Fragment>
      ))}
      {page < totalPages ? (
        <a href={pageHref(base, page + 1, query)} rel="next" style={{ ...box, width: 'auto', padding: '0 18px', border: '1.5px solid #D0D5DD', color: '#101828' }} className="h_11a32a0">
          Next →
        </a>
      ) : null}
    </nav>
  )
}
