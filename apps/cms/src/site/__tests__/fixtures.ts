/** Builds the documents the mappers would get from Payload, from the seed transform's output. */
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { categorySlug, resolveRefs, transform, type Ref } from '../../seed/transform'

/* eslint-disable @typescript-eslint/no-explicit-any */
const seedDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'seed')
export const proto: any = JSON.parse(readFileSync(join(seedDir, 'prototype-data.json'), 'utf8'))
const files = {
  slots: readdirSync(join(seedDir, 'images', 'slots')),
  covers: readdirSync(join(seedDir, 'images', 'assets', 'covers')),
}
export const seed = transform(proto, files)

const mediaByKey = new Map(seed.media.map((m) => [m.key, { id: m.key, url: m.url || `/seed/${m.file}`, alt: m.alt }]))
const cats = new Map(seed.categories.map((c) => [c.key, { id: `c:${c.key}`, title: c.title, slug: c.slug }]))
const authors = new Map(seed.authors.map((a) => [a.key, { id: `a:${a.key}`, ...a }]))
const lookupBase = (r: Ref): any =>
  r.$ref === 'media' ? mediaByKey.get(r.key) : r.$ref === 'categories' ? cats.get(r.key) : r.$ref === 'authors' ? authors.get(r.key) : undefined
export const posts = new Map<string, any>(
  seed.posts.map((p) => [p.slug, { id: `p:${p.slug}`, updatedAt: p.publishedAt, ...resolveRefs(p, lookupBase) }]),
)
export const lookup = (r: Ref): any => (r.$ref === 'posts' ? posts.get(r.key) : lookupBase(r))
export const populated = <T,>(v: T): T => resolveRefs(v, lookup)
export const newestPosts = () => [...posts.values()].sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))
export { categorySlug }
