import type { Field, GlobalConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { GROUP, textList, urlField } from '../collections/site/helpers'
import { notifyFrontend } from '../utilities/revalidate'

const pairs = (name: string, label: string, a: string, b: string, description?: string): Field => ({
  name,
  type: 'array',
  label,
  admin: { description },
  fields: [
    { name: 't', type: 'text', label: a, required: true },
    { name: 'd', type: 'textarea', label: b, required: true },
  ],
})

/** The Advertise With Us page (/advertise-with-us/). */
export const Advertise: GlobalConfig = {
  slug: 'advertise',
  label: 'Advertise page',
  admin: { group: GROUP.pages, description: 'Content of the Advertise With Us page and the options in its enquiry form.' },
  access: { read: anyone, update: isStaff },
  fields: [
    { name: 'mediaKit', type: 'upload', relationTo: 'media', admin: { description: 'Media kit PDF. Without it, "Request the media kit" opens the form instead.' } },
    urlField('mediaKitUrl', 'Or a link to the media kit.'),
    {
      name: 'metrics',
      type: 'array',
      admin: { description: 'Audience figures. Only add approved numbers with their source and date.' },
      fields: [
        { name: 'v', type: 'text', label: 'Figure', required: true },
        { name: 'l', type: 'text', label: 'Label', required: true },
        { name: 'source', type: 'text' },
      ],
    },
    pairs('audience', 'Who reads CanadianSME', 'Audience', 'Description'),
    pairs('options', 'Advertising options', 'Option', 'Description'),
    textList('goals', 'Campaign goals', 'Also the "Objective" choices in the form.'),
    pairs('why', 'Why CanadianSME', 'Reason', 'Description'),
    pairs('faq', 'FAQ', 'Question', 'Answer'),
    textList('interests', 'Form: interests (checkboxes)'),
    textList('budgets', 'Form: budget ranges'),
    textList('timing', 'Form: timing choices'),
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await notifyFrontend(req, { collection: 'advertise', event: 'change', paths: ['/advertise-with-us/'], tags: ['advertise', 'site'] })
        return doc
      },
    ],
  },
}
