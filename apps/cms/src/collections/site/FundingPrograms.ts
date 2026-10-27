import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../../access'
import { GROUP, orderField, siteHooks, urlField } from './helpers'

/** Federal programmes in the homepage funding finder. (Each province's regional agency is set on its province guide.) */
export const FundingPrograms: CollectionConfig = {
  slug: 'funding-programs',
  labels: { singular: 'Funding programme', plural: 'Funding finder' },
  admin: {
    group: GROUP.guides,
    useAsTitle: 'name',
    defaultColumns: ['name', 'tag', 'need'],
    description: 'Programmes listed by the homepage funding finder.',
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'tag', type: 'text', admin: { description: 'Small label, e.g. Financing.' } },
    { name: 'desc', type: 'textarea', label: 'Description' },
    urlField('href', undefined, true),
    {
      name: 'need',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Loans & financing', value: 'loans' },
        { label: 'Export', value: 'export' },
        { label: 'Technology & R&D', value: 'tech' },
        { label: 'Hiring', value: 'hire' },
      ],
    },
    orderField,
  ],
  hooks: siteHooks('funding-programs', () => ['home'], () => ['/']),
}
