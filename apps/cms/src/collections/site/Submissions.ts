import type { CollectionConfig } from 'payload'

import { hasRole } from '../../access'
import { FORM_TYPES } from '@canadiansme/shared'
import { GROUP } from './helpers'

const staff = ({ req }: { req: any }) => hasRole(req.user, 'admin', 'editor')

/**
 * Website form entries (newsletter, pop-up, contact, advertise enquiry, gated downloads, offer claims).
 * Only written by the /api/forms endpoint (server-to-server). Never readable by the public.
 */
export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: { singular: 'Form submission', plural: 'Form submissions' },
  admin: {
    group: GROUP.forms,
    useAsTitle: 'email',
    defaultColumns: ['createdAt', 'type', 'email', 'name', 'status'],
    description: 'Entries from the website forms. Consent wording and time are kept for CASL.',
  },
  access: {
    read: staff,
    create: () => false, // only the forms endpoint, with overrideAccess
    update: staff, // status only (see field access)
    delete: ({ req }) => hasRole(req.user as never, 'admin'),
  },
  fields: [
    { name: 'type', type: 'select', required: true, index: true, options: [...FORM_TYPES], access: { update: () => false } },
    { name: 'email', type: 'email', index: true, access: { update: () => false } },
    { name: 'name', type: 'text', access: { update: () => false } },
    { name: 'data', type: 'json', access: { update: () => false } },
    {
      name: 'consent',
      type: 'group',
      access: { update: () => false },
      fields: [
        { name: 'given', type: 'checkbox' },
        { name: 'text', type: 'textarea' },
        { name: 'at', type: 'date' },
      ],
    },
    { name: 'source', type: 'text', access: { update: () => false }, admin: { description: 'Page the form was sent from.' } },
    { name: 'ipHash', type: 'text', index: true, access: { update: () => false }, admin: { readOnly: true } },
    { name: 'userAgent', type: 'text', access: { update: () => false }, admin: { readOnly: true } },
    { name: 'mailchimp', type: 'text', access: { update: () => false }, admin: { readOnly: true, description: 'Result of the Mailchimp sync.' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: ['new', 'handled', 'spam'],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
