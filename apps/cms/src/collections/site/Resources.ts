import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../../access'
import { GROUP, orderField, siteHooks, urlField } from './helpers'

export const RESOURCE_GROUPS = [
  { value: 'start', heading: 'Start & structure', sub: 'Getting incorporated and legally set up' },
  { value: 'money', heading: 'Money, tax & funding', sub: 'Capital, cash flow, and staying onside with the CRA' },
  { value: 'growth', heading: 'Growth & customers', sub: 'Finding demand and winning bigger contracts' },
  { value: 'operations', heading: 'Operations, technology & people', sub: 'Running the business day to day' },
] as const

/** Guides, templates and checklists. Website: /resources/ (downloads go through the email gate). */
export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: { singular: 'Resource', plural: 'Resources' },
  admin: {
    group: GROUP.guides,
    useAsTitle: 'title',
    defaultColumns: ['title', 'group', 'kind', 'gated'],
    description: 'The Resources page. Gated items ask for name and email before the download.',
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'key', type: 'text', required: true, unique: true, admin: { description: 'Short id used in links, e.g. "starting" → /resources/#starting.' } },
    { name: 'slot', type: 'text', admin: { position: 'sidebar', description: 'Design image key (internal).' } },
    { name: 'group', type: 'select', required: true, options: RESOURCE_GROUPS.map((g) => ({ label: g.heading, value: g.value })) },
    { name: 'kind', type: 'text', admin: { description: 'e.g. Guide, Template · PDF, Checklist.' } },
    { name: 'desc', type: 'textarea', label: 'Description' },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'imageLabel', type: 'text', admin: { description: 'Alt text for the cover.' } },
    { name: 'file', type: 'upload', relationTo: 'media', admin: { description: 'PDF or file delivered after the gate.' } },
    urlField('externalUrl', 'Or a link instead of a file.'),
    { name: 'gated', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    orderField,
  ],
  hooks: siteHooks('resources', () => [], () => ['/resources/']),
}
