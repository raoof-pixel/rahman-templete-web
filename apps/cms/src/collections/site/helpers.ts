import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, Field } from 'payload'

import { notifyFrontend } from '../../utilities/revalidate'
import { auditAfterChange, auditAfterDelete } from '../AuditLogs'

/** Admin sidebar groups, in the order the website shows its sections. */
/** Admin sidebar sections (kept few on purpose). */
export const GROUP = {
  articles: 'Newsroom',
  homepage: 'Website',
  partners: 'Website',
  pages: 'Website',
  magazine: 'Magazine & events',
  events: 'Magazine & events',
  guides: 'Guides',
  forms: 'Inbox',
  settings: 'Settings',
  admin: 'Settings',
} as const

type PathFn = (doc: any) => (string | null | undefined)[]

/**
 * afterChange/afterDelete hooks that tell the website what changed (cache tags + paths) and
 * write the activity log. Every collection that feeds a website section uses these.
 */
export const siteHooks = (collection: string, extraTags: (doc: any) => string[] = () => [], pathsOf: PathFn = () => []) => {
  const notify = async (req: any, doc: any, event: 'change' | 'delete') =>
    notifyFrontend(req, {
      collection,
      event,
      id: doc?.id,
      slug: doc?.slug ?? null,
      paths: pathsOf(doc).filter((p): p is string => typeof p === 'string' && p.startsWith('/')),
      tags: [collection, 'site', ...extraTags(doc)],
    })
  const afterChange: CollectionAfterChangeHook = async ({ doc, req }) => {
    await notify(req, doc, 'change')
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
    await notify(req, doc, 'delete')
    return doc
  }
  return { afterChange: [afterChange, auditAfterChange], afterDelete: [afterDelete, auditAfterDelete] }
}

/** https:// (or a site path starting with /) — never javascript:, data: etc. */
export const validUrl = (v: unknown) =>
  !v || (typeof v === 'string' && (/^https?:\/\/[^\s]+$/i.test(v) || /^\/[^\s]*$/.test(v) || /^#[\w-]+$/.test(v)))
    ? true
    : 'Use a full https:// link or a site path starting with /'

export const urlField = (name: string, description?: string, required = false): Field => ({
  name,
  type: 'text',
  required,
  validate: validUrl,
  admin: description ? { description } : undefined,
})

/** Hex colour like #C11A3A. */
export const colourField = (name: string, description?: string): Field => ({
  name,
  type: 'text',
  validate: (v: unknown) => (!v || (typeof v === 'string' && /^#[0-9a-f]{3,8}$/i.test(v)) ? true : 'Use a hex colour like #C11A3A'),
  admin: { description },
})

/** A list of short texts (stored as rows of { text }). */
export const textList = (name: string, label: string, description?: string, textarea = false): Field => ({
  name,
  type: 'array',
  label,
  admin: { description },
  fields: [{ name: 'text', type: textarea ? 'textarea' : 'text', required: true }],
})

export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 0,
  index: true,
  admin: { position: 'sidebar', description: 'Lower numbers show first.' },
}
