import type { CollectionConfig } from 'payload'

import { isStaff, publishedOrAuthenticated } from '../../access'
import { slug } from '../../fields/slug'
import { GROUP, siteHooks, urlField } from './helpers'

/** Magazine issues. Website: /magazine/ (archive) and /magazine/<slug>/ (issue page). */
export const MagazineIssues: CollectionConfig = {
  slug: 'magazine-issues',
  labels: { singular: 'Magazine issue', plural: 'Magazine issues' },
  admin: {
    group: GROUP.magazine,
    useAsTitle: 'title',
    defaultColumns: ['number', 'month', 'title', '_status'],
    description: 'The Magazine archive. The newest published issue is the "current issue".',
  },
  access: {
    read: publishedOrAuthenticated,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
    readVersions: ({ req }) => Boolean(req.user),
  },
  defaultSort: '-number',
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'Cover story headline.' } },
    { name: 'number', type: 'number', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    { name: 'month', type: 'text', required: true, admin: { position: 'sidebar', description: 'e.g. "August 2026".' } },
    { name: 'issueDate', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'monthOnly' } } },
    slug('month'),
    { name: 'desc', type: 'textarea', label: 'Description' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'coverAlt', type: 'text' },
    urlField('readUrl', 'Issuu or PDF link for "Read this issue".', true),
    {
      name: 'inside',
      type: 'array',
      label: 'Inside this issue',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'meta', type: 'text', admin: { description: 'e.g. "Cover story · 9 min".' } },
        urlField('href'),
      ],
    },
  ],
  hooks: siteHooks('magazine-issues', (d) => [`issue:${d.slug}`], (d) => ['/magazine/', `/magazine/${d.slug}/`]),
  versions: { drafts: true, maxPerDoc: 10 },
}
