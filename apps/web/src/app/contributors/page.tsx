import type { Metadata } from 'next'

import { authorPage, editorSlug } from '@/lib/lists'
import { fixed } from '@/lib/seo'

/** /contributors/ shows the editor's profile and the top-contributors grid (prototype "Contributors" page). */
export const revalidate = 60
export const metadata: Metadata = fixed('contributor', '/contributors/')
export default async function Page() {
  return authorPage(await editorSlug())
}
