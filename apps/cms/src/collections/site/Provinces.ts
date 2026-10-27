import type { CollectionConfig } from 'payload'

import { anyone, isStaff } from '../../access'
import { slug } from '../../fields/slug'
import { GROUP, orderField, siteHooks, textList, urlField } from './helpers'

const linkRows = (name: string, label: string, description: string) => ({
  name,
  type: 'array' as const,
  label,
  admin: { description },
  fields: [
    { name: 'label', type: 'text' as const, required: true },
    { name: 'desc', type: 'text' as const, label: 'Description' },
    urlField('href', undefined, true),
  ],
})

/**
 * Province & territory guides. Website: /provinces/<slug>/, the province picker on the homepage
 * and the funding finder (regional agency).
 */
export const Provinces: CollectionConfig = {
  slug: 'provinces',
  labels: { singular: 'Province guide', plural: 'Province guides' },
  admin: {
    group: GROUP.guides,
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'slug', 'updatedAt'],
    description: 'One guide per province/territory. Shown at /provinces/<slug>/ and in the homepage province picker.',
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    slug('name'),
    {
      name: 'code',
      type: 'select',
      required: true,
      unique: true,
      options: ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'],
      admin: { position: 'sidebar' },
    },
    orderField,
    { name: 'intro', type: 'textarea', required: true, admin: { description: 'Opening paragraph and meta description.' } },
    {
      name: 'hubSummary',
      type: 'text',
      admin: { description: 'One line for the homepage province picker, e.g. "HST 13%, WSIB, Employer Health Tax".' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Key facts',
          fields: [
            {
              name: 'facts',
              type: 'array',
              admin: { description: 'The fact cards at the top of the page.' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
                { name: 'note', type: 'text' },
              ],
            },
            textList('watch', 'What to watch', 'Numbered list of current changes owners should know about.', true),
          ],
        },
        {
          label: 'Links',
          fields: [
            linkRows('comply', 'Register and stay compliant', 'Registration, tax and employment links.'),
            linkRows('fund', 'Provincial funding and support', 'Provincial programmes.'),
            { name: 'agencyName', type: 'text', admin: { description: 'Federal regional development agency (funding finder).' } },
            urlField('agencyUrl', 'Agency website.'),
          ],
        },
        {
          label: 'About & statistics',
          fields: [
            {
              name: 'about',
              type: 'group',
              fields: [
                { name: 'cap', type: 'text', label: 'Capital' },
                { name: 'city', type: 'text', label: 'Largest city' },
                { name: 'ind', type: 'text', label: 'Key industries' },
                {
                  name: 'stats',
                  type: 'array',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                    { name: 'note', type: 'text' },
                  ],
                },
                { name: 'chamberName', type: 'text', label: 'Chamber of commerce' },
                urlField('chamberUrl'),
              ],
            },
          ],
        },
        {
          label: 'Government',
          fields: [
            { name: 'premier', type: 'text' },
            { name: 'premierPhoto', type: 'upload', relationTo: 'media' },
            { name: 'cabinet', type: 'text' },
            { name: 'sbMinName', type: 'text', label: 'Small business minister' },
            { name: 'sbMinRole', type: 'text', label: 'Minister’s portfolio' },
            { name: 'ministerPhoto', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Start a business',
          fields: [
            {
              name: 'start',
              type: 'array',
              admin: { description: 'Numbered steps.' },
              fields: [
                { name: 'h', type: 'text', label: 'Step', required: true },
                { name: 't', type: 'textarea', label: 'Text', required: true },
                { name: 'linkLabel', type: 'text' },
                urlField('linkHref'),
              ],
            },
          ],
        },
        {
          label: 'Long-form article',
          fields: [
            {
              name: 'article',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                {
                  name: 'sections',
                  type: 'array',
                  fields: [
                    { name: 'h', type: 'text', label: 'Heading (optional)' },
                    textList('ps', 'Paragraphs', undefined, true),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: siteHooks('provinces', (d) => [`province:${d.slug}`, 'home'], (d) => [`/provinces/${d.slug}/`, '/']),
}
