import type { ReactNode } from 'react'

import { getChrome } from '@/lib/cms'
import { Site } from '@/ui/Site'
import type { RouteKey, SiteDataBundle } from '@/ui/types'

/** Wraps a page part in the site shell (header, footer, pop-ups) with the chrome data from the CMS. */
export async function render(route: RouteKey, part: ReactNode, D: Omit<SiteDataBundle, 'chrome'> = {}) {
  const chrome = await getChrome()
  return (
    <Site route={route} D={{ chrome, ...D }}>
      {part}
    </Site>
  )
}

/** "3" -> 3; anything else (0, "abc", "1.5") -> null, so the page 404s. */
export const pageNum = (n?: string) => {
  if (n === undefined) return 1
  return /^[1-9]\d{0,4}$/.test(n) ? Number(n) : null
}
