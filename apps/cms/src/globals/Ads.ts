import type { GlobalConfig } from 'payload'

import { AD_SLOTS } from '@canadiansme/shared'
import { anyone, isStaff } from '../access'
import { GROUP, urlField } from '../collections/site/helpers'
import { notifyFrontend } from '../utilities/revalidate'

const SLOT_LABELS: Record<string, string> = {
  'home-sidebar-1': 'Homepage sidebar 1 (300×250)',
  'home-sidebar-2': 'Homepage sidebar 2 (300×234)',
  'home-sidebar-3': 'Homepage sidebar 3 (300×600)',
  'home-banner-1': 'Homepage sponsor banner 1 (2500×750)',
  'home-banner-2': 'Homepage sponsor banner 2 (2500×750)',
  'home-subscribe-banner': 'Homepage "Subscribe" house banner',
  'home-advertise-banner': 'Homepage "Advertise" house banner',
  'post-sidebar-1': 'Article sidebar 1 (300×600)',
  'post-sidebar-2': 'Article sidebar 2 (300×250)',
  'post-sidebar-3': 'Article sidebar 3 (300×234)',
}

/** Ad slots, sponsor banners and partner logo strips. */
export const Ads: GlobalConfig = {
  slug: 'ads',
  label: 'Ads & partners',
  admin: {
    group: GROUP.partners,
    description:
      'One row per ad slot of the website. A slot with no row shows the design’s default creative; untick "Show" to hide the slot. Sponsor links get rel="sponsored".',
  },
  access: { read: anyone, update: isStaff },
  fields: [
    {
      name: 'slots',
      type: 'array',
      maxRows: AD_SLOTS.length,
      fields: [
        {
          name: 'slot',
          type: 'select',
          required: true,
          options: AD_SLOTS.map((value) => ({ label: SLOT_LABELS[value] || value, value })),
        },
        { name: 'show', type: 'checkbox', defaultValue: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'alt', type: 'text', admin: { description: 'What the ad says, for screen readers.' } },
        urlField('href', 'Where the ad links to.'),
      ],
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Partner logos',
      admin: { description: '"Proudly supported by" and "Community Partners" logo strips, in this order.' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media', required: true },
        urlField('href'),
      ],
    },
    {
      name: 'sidebarSponsored',
      type: 'group',
      label: 'Homepage sidebar sponsored story',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'desc', type: 'textarea' },
        urlField('href'),
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await notifyFrontend(req, { collection: 'ads', event: 'change', paths: ['/'], tags: ['ads', 'site', 'home'] })
        return doc
      },
    ],
  },
}
