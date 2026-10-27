import { Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import type { Payload } from 'payload'
import React from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
type User = { name?: string | null; email?: string; roles?: string[] } | null | undefined
type Props = { payload?: Payload; user?: User; initPageResult?: { req?: { payload?: Payload; user?: User } } }

const TZ = 'America/Toronto'

const safe = async <T,>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn()
  } catch {
    return fallback
  }
}

const count = (payload: Payload, collection: any, where?: any) =>
  safe(async () => (await payload.count({ collection, where, overrideAccess: true })).totalDocs, 0)

const shortDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', timeZone: TZ }) : ''

/**
 * The admin home page (replaces Payload's grid of collection cards): a quiet greeting, four figures,
 * the latest edited articles and shortcuts to the website sections people actually edit.
 */
export const Dashboard = async (props: Props) => {
  const payload = props.payload ?? props.initPageResult?.req?.payload
  const user = props.user ?? props.initPageResult?.req?.user
  const first = (user?.name || user?.email || 'there').split(/[\s@]/)[0]
  const isAdmin = Array.isArray(user?.roles) && user!.roles!.includes('admin')

  const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString()
  const [published, drafts, media, inbox, recent] = payload
    ? await Promise.all([
        count(payload, 'posts', { _status: { equals: 'published' } }),
        count(payload, 'posts', { _status: { equals: 'draft' } }),
        count(payload, 'media'),
        count(payload, 'submissions', { and: [{ status: { equals: 'new' } }, { createdAt: { greater_than: weekAgo } }] }),
        safe(
          async () =>
            (
              await payload.find({
                collection: 'posts',
                sort: '-updatedAt',
                limit: 6,
                depth: 1,
                draft: true,
                overrideAccess: true,
              })
            ).docs as any[],
          [] as any[],
        ),
      ])
    : [0, 0, 0, 0, [] as any[]]

  const now = new Date()
  const hour = Number(now.toLocaleString('en-CA', { hour: 'numeric', hourCycle: 'h23', timeZone: TZ }))
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const today = now.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', timeZone: TZ })
  const fmt = (n: number) => n.toLocaleString('en-CA')

  const stats = [
    { label: 'Published', value: fmt(published), href: '/admin/collections/posts?where[_status][equals]=published' },
    { label: 'Drafts', value: fmt(drafts), href: '/admin/collections/posts?where[_status][equals]=draft' },
    { label: 'Media files', value: fmt(media), href: '/admin/collections/media' },
    { label: 'New sign-ups this week', value: fmt(inbox), href: '/admin/collections/submissions?where[status][equals]=new' },
  ]

  const sections = [
    {
      title: 'Website',
      links: [
        { label: 'Homepage', href: '/admin/globals/homepage' },
        { label: 'Menus', href: '/admin/globals/navigation' },
        { label: 'Ads & partners', href: '/admin/globals/ads' },
        { label: 'Site settings', href: '/admin/globals/site-settings' },
      ],
    },
    {
      title: 'Publishing',
      links: [
        { label: 'Magazine issues', href: '/admin/collections/magazine-issues' },
        { label: 'Podcast episodes', href: '/admin/collections/podcast-episodes' },
        { label: 'Events', href: '/admin/collections/events' },
        { label: 'Province guides', href: '/admin/collections/provinces' },
      ],
    },
  ]

  return (
    <Gutter>
    <div className="csme-home">
      <header className="csme-home__head">
        <div>
          <p className="csme-home__date">{today}</p>
          <h1 className="csme-home__title">
            {greeting}, {first}
          </h1>
        </div>
        <div className="csme-home__actions">
          <Link className="csme-link" href="/admin/collections/media/create">
            Upload media
          </Link>
          <Link className="csme-btn csme-btn--primary" href="/admin/collections/posts/create">
            New article
          </Link>
        </div>
      </header>

      <section className="csme-home__stats" aria-label="At a glance">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="csme-home__stat">
            <span className="csme-home__stat-value">{s.value}</span>
            <span className="csme-home__stat-label">{s.label}</span>
          </Link>
        ))}
      </section>

      <div className="csme-home__grid">
        <section className="csme-panel">
          <div className="csme-panel__head">
            <h2 className="csme-panel__title">Recently edited</h2>
            <Link className="csme-link" href="/admin/collections/posts">
              All articles
            </Link>
          </div>
          {recent.length ? (
            <ul className="csme-recent">
              {recent.map((p: any) => {
                const author = (p.authors || []).find((a: any) => a && typeof a === 'object')?.name
                const live = p._status === 'published'
                return (
                  <li key={p.id}>
                    <Link href={`/admin/collections/posts/${p.id}`} className="csme-recent__row">
                      <span className="csme-recent__title">{p.title || 'Untitled'}</span>
                      <span className="csme-recent__meta">
                        <span className={`csme-dot${live ? ' csme-dot--live' : ''}`} aria-hidden />
                        {live ? 'Published' : 'Draft'}
                        {author ? <span className="csme-recent__sep">{author}</span> : null}
                        <span className="csme-recent__sep">{shortDate(p.updatedAt)}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="csme-panel__empty">No articles yet.</p>
          )}
        </section>

        <aside className="csme-home__side">
          {sections.map((sec) => (
            <section key={sec.title} className="csme-panel">
              <h2 className="csme-panel__title">{sec.title}</h2>
              <ul className="csme-shortcuts">
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      {l.label}
                      <span aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {isAdmin && (
            <p className="csme-home__admin">
              <Link className="csme-link" href="/admin/collections/audit-logs">
                Activity log
              </Link>
              <span aria-hidden>·</span>
              <Link className="csme-link" href="/admin/security">
                Security scan
              </Link>
              <span aria-hidden>·</span>
              <Link className="csme-link" href="/admin/collections/users">
                Users
              </Link>
            </p>
          )}
        </aside>
      </div>
    </div>
    </Gutter>
  )
}

export default Dashboard
