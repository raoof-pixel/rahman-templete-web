import type { Metadata } from 'next'

import { render } from '@/lib/render'
import Post from '@/ui/parts/Post'

/**
 * /_preview/ — the article template filled with placeholders. The CMS "Preview" button loads this
 * page and swaps the %%PLACEHOLDERS%% for the draft's values (apps/cms/src/endpoints/sitePreview.ts),
 * so editors see drafts in the real design. Never indexed.
 */
export const dynamic = 'force-static'
export const metadata: Metadata = { title: 'Preview', robots: { index: false, follow: false } }

const post = {
  slug: '%%SLUG%%',
  title: '%%TITLE%%',
  cat: '%%CATEGORY%%',
  catHref: '/category/%%CATSLUG%%/',
  date: 'January 1, 2000',
  dateISO: '2000-01-01T12:00:00.000Z',
  updatedISO: '',
  author: '%%AUTHOR%%',
  read: '%%READ%% min read',
  img: 'https://preview.invalid/%%IMAGE%%',
  alt: '',
  excerpt: '%%EXCERPT%%',
  html: '%%BODY%%',
  source: '',
  tags: [],
}

export default async function PreviewTemplate() {
  return render('post', <Post />, {
    post: {
      post,
      author: { name: '%%AUTHOR%%', role: '', bio: '', slug: '%%AUTHORSLUG%%', img: '' },
      morePosts: [],
      moreHeading: '',
      seo: { title: '', description: '', canonical: '', noIndex: true, image: '' },
    },
  })
}
