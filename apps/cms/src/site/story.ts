import { catTitle, fmtLong, fmtShort, mediaAlt, mediaUrl, minutes, obj, postHref, str, type Doc } from './common'

export type StoryOpts = { dateFmt?: 'long' | 'short' }

/**
 * A homepage story slot: an optional article plus optional overrides. Overrides win; anything left
 * empty comes from the article. The seed uses the same function to decide which overrides it needs.
 */
export const story = (s: Doc | null | undefined, base: string, opts: StoryOpts = {}) => {
  const p = obj(s?.post)
  const own = obj(s?.image)
  const media = own ?? obj(p?.featuredImage)
  const n = minutes(p)
  return {
    cat: str(s?.cat) || catTitle(p),
    title: str(s?.title) || str(p?.title),
    excerpt: str(s?.excerpt) || str(p?.excerpt),
    date: str(s?.date) || (opts.dateFmt === 'long' ? fmtLong(p?.publishedAt) : fmtShort(p?.publishedAt)),
    read: str(s?.read) || (n ? `${n} min` : ''),
    img: mediaUrl(media, base, 'large'),
    alt: str(s?.alt) || mediaAlt(media) || str(p?.title),
    href: str(s?.href) || postHref(p),
  }
}
export type Story = ReturnType<typeof story>
