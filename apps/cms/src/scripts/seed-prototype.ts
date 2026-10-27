/**
 * Loads the design prototype's content into the CMS, so the new website looks exactly like the
 * prototype before any WordPress content is imported. Safe to re-run: every record is matched by a
 * natural key (slug, number, URL...) and updated, never duplicated.
 *
 *   pnpm --filter @canadiansme/cms seed:prototype
 *   pnpm --filter @canadiansme/cms seed:prototype --skip-remote   # don't download canadiansme.ca images
 *
 * Images: files shipped in src/seed/images are uploaded; images the prototype linked on
 * canadiansme.ca are downloaded (allow-listed hosts only, see utilities/safeFetch.ts).
 * Run it against a development or staging database first.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload, type Payload } from 'payload'

import config from '../payload.config'
import { resolveRefs, transform, type Ref } from '../seed/transform'
import { safeDownload } from '../utilities/safeFetch'

/* eslint-disable @typescript-eslint/no-explicit-any */
const here = dirname(fileURLToPath(import.meta.url))
const seedDir = join(here, '..', 'seed')
const imagesDir = join(seedDir, 'images')
const SKIP_REMOTE = process.argv.includes('--skip-remote')
const CTX = { disableRevalidate: true, preserveSlug: true, fromImport: true }
const MIME: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif' }

const proto = JSON.parse(readFileSync(join(seedDir, 'prototype-data.json'), 'utf8'))
const seed = transform(proto, {
  slots: readdirSync(join(imagesDir, 'slots')),
  covers: readdirSync(join(imagesDir, 'assets', 'covers')),
})

const ids: Record<Ref['$ref'], Map<string, number | string>> = {
  media: new Map(),
  categories: new Map(),
  authors: new Map(),
  posts: new Map(),
}
const toIds = <T,>(v: T): T => resolveRefs(v, (r) => ids[r.$ref].get(r.key) ?? null)
const strip = ({ key, _order, ...rest }: Record<string, any>) => rest

async function upsert(payload: Payload, collection: any, where: Record<string, any>, data: Record<string, any>, drafts = false) {
  const found = await payload.find({ collection, where, limit: 1, depth: 0, overrideAccess: true, draft: drafts, pagination: false })
  const common = { collection, data, overrideAccess: true, context: CTX, depth: 0 } as any
  const doc: any = found.docs[0]
    ? await payload.update({ ...common, id: (found.docs[0] as any).id })
    : await payload.create(common)
  return doc.id as number | string
}

async function seedMedia(payload: Payload) {
  for (const m of seed.media) {
    const marker = m.url || `seed:${m.file}`
    const existing = await payload.find({ collection: 'media', where: { wpUrl: { equals: marker } }, limit: 1, depth: 0, overrideAccess: true })
    if (existing.docs[0]) {
      ids.media.set(m.key, (existing.docs[0] as any).id)
      continue
    }
    let data: Buffer | null = null
    let mimetype = ''
    let name = ''
    if (m.file) {
      data = readFileSync(join(imagesDir, m.file))
      mimetype = MIME[extname(m.file).toLowerCase()] || 'application/octet-stream'
      name = m.file.split('/').pop() || 'image'
    } else if (m.url && !SKIP_REMOTE) {
      const dl = await safeDownload(m.url)
      if (dl) {
        data = dl.data
        mimetype = dl.contentType.split(';')[0].trim() || MIME[extname(m.url.split('?')[0]).toLowerCase()] || 'image/jpeg'
        name = decodeURIComponent(m.url.split('?')[0].split('/').pop() || 'image').replace(/[^\w.\- ]+/g, '-')
      }
    }
    if (!data) {
      console.warn(`  skipped image: ${m.url || m.file}`)
      continue
    }
    const doc: any = await payload.create({
      collection: 'media',
      data: { alt: m.alt || '', wpUrl: marker },
      file: { data, mimetype, name, size: data.length },
      overrideAccess: true,
      context: CTX,
    })
    ids.media.set(m.key, doc.id)
  }
  console.log(`media: ${ids.media.size}/${seed.media.length}`)
}

async function run() {
  const payload = await getPayload({ config })
  await seedMedia(payload)

  for (const c of seed.categories) ids.categories.set(c.key, await upsert(payload, 'categories', { slug: { equals: c.slug } }, { title: c.title, slug: c.slug }))
  for (const a of seed.authors) ids.authors.set(a.key, await upsert(payload, 'authors', { slug: { equals: a.slug } }, strip(a)))
  console.log(`categories: ${seed.categories.length}, authors: ${seed.authors.length}`)

  for (const p of seed.posts) ids.posts.set(p.key, await upsert(payload, 'posts', { slug: { equals: p.slug } }, toIds(strip(p)), true))
  console.log(`posts: ${seed.posts.length}`)

  const each = async (collection: string, list: Record<string, any>[], where: (d: any) => Record<string, any>, drafts = false) => {
        for (const d of list) await upsert(payload, collection, where(d), toIds((({ _order, ...rest }) => rest)(d)), drafts)
    console.log(`${collection}: ${list.length}`)
  }
  await each('provinces', seed.provinces, (d) => ({ slug: { equals: d.slug } }))
  await each('deadlines', seed.deadlines, (d) => ({ and: [{ title: { equals: d.title } }, { date: { equals: d.date } }] }))
  await each('offers', seed.offers, (d) => ({ title: { equals: d.title } }))
  await each('resources', seed.resources, (d) => ({ key: { equals: d.key } }))
  await each('funding-programs', seed.fundingPrograms, (d) => ({ name: { equals: d.name } }))
  await each('magazine-issues', seed.issues, (d) => ({ number: { equals: d.number } }), true)
  await each('podcast-episodes', seed.episodes, (d) => ({ number: { equals: d.number } }), true)
  await each('events', seed.events, (d) => ({ slug: { equals: d.slug } }), true)
  await each('legal-pages', seed.legalPages, (d) => ({ slug: { equals: d.slug } }))

  for (const r of seed.redirects) {
    await upsert(payload, 'redirects', { from: { equals: r.from } }, { from: r.from, to: { type: 'custom', url: r.to }, type: '301' })
  }
  console.log(`redirects: ${seed.redirects.length}`)

  const g = seed.globals
  const sk = await payload.find({ collection: 'authors', where: { slug: { equals: 'sk-uddin' } }, limit: 1, depth: 0, overrideAccess: true })
  const updates: [string, Record<string, any>][] = [
    ['homepage', toIds(g.homepage)],
    ['navigation', toIds(g.navigation)],
    ['site-settings', { ...toIds(g.siteSettings), editorAuthor: (sk.docs[0] as any)?.id ?? null }],
    ['advertise', toIds(g.advertise)],
    ['ads', toIds(g.ads)],
  ]
  for (const [slug, data] of updates) {
    await payload.updateGlobal({ slug: slug as any, data, overrideAccess: true, context: CTX, depth: 0 })
    console.log(`global: ${slug}`)
  }
  console.log('Prototype content loaded.')
}

try {
  await run()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
