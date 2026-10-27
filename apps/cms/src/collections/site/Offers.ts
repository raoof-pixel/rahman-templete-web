import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../../access'
import { GROUP, orderField, siteHooks, urlField } from './helpers'

/** Partner offers. Website: homepage offers band and /exclusive-offers/. Expired offers hide automatically. */
export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    group: GROUP.partners,
    useAsTitle: 'title',
    defaultColumns: ['title', 'partner', 'cat', 'expiresAt', 'active'],
    description: 'Homepage offers band and the Exclusive Offers page. Offers past their end date hide automatically.',
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'partner', type: 'text', required: true },
    { name: 'cat', type: 'text', label: 'Category', required: true, admin: { description: 'Used for the filter chips, e.g. Banking, Software.' } },
    { name: 'value', type: 'text', admin: { description: 'Headline value, e.g. "30% off".' } },
    { name: 'desc', type: 'textarea', label: 'Description' },
    { name: 'code', type: 'text', admin: { description: 'Shown after the reader leaves their email.' } },
    urlField('href', 'Where "Claim" sends the reader.'),
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'expiresAt', type: 'date', index: true, admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' }, description: 'Hidden after this day.' } },
    { name: 'expiresLabel', type: 'text', admin: { position: 'sidebar', description: 'Optional text instead of "Ends <date>", e.g. "Ongoing".' } },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    orderField,
    { name: 'terms', type: 'textarea' },
  ],
  hooks: siteHooks('offers', () => ['home'], () => ['/', '/exclusive-offers/']),
}
