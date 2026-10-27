import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../../access'
import { GROUP, siteHooks, textList } from './helpers'

export const LEGAL_SLUGS = ['privacy', 'terms', 'terms-of-use', 'accessibility'] as const

/** Privacy policy, terms and accessibility statement. Website: /privacy/, /terms/, /terms-of-use/, /accessibility/. */
export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  labels: { singular: 'Legal page', plural: 'Legal pages' },
  admin: {
    group: GROUP.pages,
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Paragraphs and list items accept **bold** and [link text](https://...).',
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  fields: [
    { name: 'slug', type: 'select', required: true, unique: true, options: [...LEGAL_SLUGS] },
    { name: 'label', type: 'text', required: true, admin: { description: 'Short name for links, e.g. "Privacy Policy".' } },
    { name: 'title', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'h', type: 'text', label: 'Heading', required: true },
        textList('ps', 'Paragraphs', undefined, true),
        textList('items', 'Bullet points', undefined, true),
      ],
    },
  ],
  hooks: siteHooks('legal-pages', (d) => [`legal:${d.slug}`], (d) => [`/${d.slug}/`]),
}
