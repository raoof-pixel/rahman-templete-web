import type { Metadata } from 'next'

import { getEpisodes, getEvents, getHome, getIssues, getResources } from '@/lib/cms'
import { render } from '@/lib/render'
import { fixed } from '@/lib/seo'
import Home from '@/ui/parts/Home'

export const revalidate = 60

export const metadata: Metadata = fixed('home', '/')

export default async function HomePage() {
  const [home, issues, episodes, events, resources] = await Promise.all([getHome(), getIssues(), getEpisodes(), getEvents(), getResources()])
  // Images for the prototype's named image slots (guide covers in the resources teaser).
  const slots: Record<string, string> = {}
  for (const g of resources.resourceGroups) for (const it of g.items) if (it.slot && it.img) slots[it.slot] = it.img
  return render('home', <Home />, {
    home,
    issues: issues.issues,
    episodes: episodes.episodes,
    podcastLinks: episodes.links,
    events: events.events,
    slots,
  })
}
