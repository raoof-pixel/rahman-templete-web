import type { CollectionConfig } from 'payload'

import { isStaff, publishedOrAuthenticated } from '../../access'
import { slug } from '../../fields/slug'
import { GROUP, orderField, siteHooks, textList, urlField } from './helpers'

/** Events. Website: /events/ and /events/<slug>/. Times are Toronto time. */
export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Events' },
  admin: {
    group: GROUP.events,
    useAsTitle: 'name',
    defaultColumns: ['name', 'kicker', 'start', 'status', '_status'],
    description: 'The Events page and event detail pages.',
  },
  access: {
    read: publishedOrAuthenticated,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
    readVersions: ({ req }) => Boolean(req.user),
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    slug('name'),
    { name: 'kicker', type: 'text', admin: { description: 'Small line above the name, e.g. "MAY 21, 2027 · TORONTO".' } },
    { name: 'desc', type: 'textarea', label: 'Card description' },
    { name: 'intro', type: 'textarea', label: 'Detail page intro' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageAlt', type: 'text' },
    textList('expect', 'What to expect'),
    { name: 'dateText', type: 'text', admin: { description: 'As shown, e.g. "October 21, 2026 · 8:30 AM – 6:00 PM".' } },
    { name: 'start', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'end', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'venue', type: 'text' },
    { name: 'address', type: 'text' },
    { name: 'admission', type: 'text', admin: { description: 'e.g. "From $149 · Group rates available".' } },
    urlField('registerUrl'),
    urlField('partnerUrl'),
    {
      name: 'status',
      type: 'select',
      enumName: 'enum_events_event_status',
      defaultValue: 'scheduled',
      options: ['scheduled', 'cancelled', 'postponed', 'past'],
      admin: { position: 'sidebar' },
    },
    orderField,
  ],
  hooks: siteHooks('events', (d) => [`event:${d.slug}`], (d) => ['/events/', `/events/${d.slug}/`]),
  versions: { drafts: true, maxPerDoc: 10 },
}
