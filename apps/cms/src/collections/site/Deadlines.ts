import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../../access'
import { GROUP, siteHooks, urlField } from './helpers'

/** CRA and filing deadlines. Website: the homepage "This week" countdown and deadline list. Past dates hide automatically. */
export const Deadlines: CollectionConfig = {
  slug: 'deadlines',
  admin: {
    group: GROUP.homepage,
    useAsTitle: 'title',
    defaultColumns: ['date', 'title', 'who'],
    description: 'Homepage "This week" countdown and the CRA deadlines list. Past dates disappear on their own.',
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'date',
  fields: [
    { name: 'date', type: 'date', required: true, index: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'title', type: 'text', required: true },
    { name: 'who', type: 'text', label: 'Who it applies to' },
    urlField('source', 'CRA or government page for this deadline.'),
  ],
  hooks: siteHooks('deadlines', () => ['home'], () => ['/']),
}
