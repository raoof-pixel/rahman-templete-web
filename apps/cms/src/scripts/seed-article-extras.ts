/**
 * Test data for the "AI & layout" fields (Quick Read, pull quote, key figures, section headings,
 * sidebar labels) on the 43 demo articles, so the new article layout can be checked locally before
 * the WordPress import fills these fields for every article.
 *
 *   pnpm --filter @canadiansme/cms seed:extras            # fills articles whose fields are empty
 *   pnpm --filter @canadiansme/cms seed:extras --force    # overwrites what is there
 *
 * Matches articles by slug; articles that don't exist are skipped. Only the `extras` group is
 * written: the article text, status and everything else stay as they are.
 * Run it against a development or staging database first.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'

import config from '../payload.config'

/* eslint-disable @typescript-eslint/no-explicit-any */
const here = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(join(here, '..', 'seed', 'article-extras.json'), 'utf8')) as Record<string, any>
const FORCE = process.argv.includes('--force')
const CTX = { disableRevalidate: true, preserveSlug: true, fromImport: true }

const hasExtras = (x: any) =>
  Boolean(x && (x.quickRead?.points?.length || x.pullQuote || x.keyFigures?.length || x.sections?.length || x.tocLabels?.length))

async function main() {
  const payload = await getPayload({ config })
  let updated = 0
  let skipped = 0
  let missing = 0
  for (const [slug, extras] of Object.entries(data)) {
    const found = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: true, pagination: false })
    const doc: any = found.docs[0]
    if (!doc) {
      missing++
      continue
    }
    if (hasExtras(doc.extras) && !FORCE) {
      skipped++
      continue
    }
    await payload.update({
      collection: 'posts',
      id: doc.id,
      data: {
        _status: doc._status,
        extras: { ...extras, quickRead: { ...extras.quickRead, generatedAt: new Date().toISOString() } },
      } as any,
      overrideAccess: true,
      context: CTX,
      depth: 0,
    })
    updated++
  }
  payload.logger.info(`Article extras: ${updated} updated, ${skipped} already filled (use --force), ${missing} not found.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
