import type { Field, GlobalConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { notifyFrontend } from '../utilities/revalidate'
import { sanitizeHtmlHook } from '../utilities/sanitizeHtml'
import { GROUP, urlField, validUrl } from '../collections/site/helpers'

/** Site-wide settings the website reads: name, logo, social links, defaults for SEO. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: GROUP.settings, description: 'Logo, social links, footer, sitemap and SEO defaults.' },
  access: { read: anyone, update: isStaff },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'siteName', type: 'text', defaultValue: 'CanadianSME Small Business Magazine' },
            { name: 'tagline', type: 'text', defaultValue: 'Empowering Canadian Small and Medium Enterprises' },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'logoDark', type: 'upload', relationTo: 'media', label: 'Logo (dark backgrounds)' },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
            { name: 'contactEmail', type: 'email', defaultValue: 'info@canadiansme.ca' },
            { name: 'subscribeUrl', type: 'text', defaultValue: '/newsletter/', validate: validUrl },
          ],
        },
        {
          label: 'SEO defaults',
          fields: [
            {
              name: 'titleSuffix',
              type: 'text',
              defaultValue: ' - CanadianSME Small Business Magazine',
              admin: { description: 'Appended to every page title.' },
            },
            { name: 'defaultDescription', type: 'textarea' },
            { name: 'defaultShareImage', type: 'upload', relationTo: 'media' },
            {
              name: 'organizationSchema',
              type: 'json',
              admin: { description: 'Optional JSON-LD Organization data the website can output.' },
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'social',
              type: 'group',
              fields: [
                { name: 'facebook', type: 'text', defaultValue: 'https://www.facebook.com/canadiansme' },
                { name: 'instagram', type: 'text', defaultValue: 'https://www.instagram.com/canadiansme/' },
                { name: 'x', type: 'text', label: 'X (Twitter)', defaultValue: 'https://twitter.com/canadian_sme' },
                {
                  name: 'linkedin',
                  type: 'text',
                  defaultValue: 'https://www.linkedin.com/company/canadiansme-business-magazine',
                },
                {
                  name: 'youtube',
                  type: 'text',
                  defaultValue: 'https://www.youtube.com/c/CanadianSMESmallBusinessMagazine',
                },
                { name: 'spotify', type: 'text', label: 'Podcast on Spotify' },
                { name: 'apple', type: 'text', label: 'Podcast on Apple Podcasts' },
                { name: 'podcastYoutube', type: 'text', label: 'Podcast on YouTube' },
              ].map((f) => ({ ...f, validate: validUrl })) as Field[],
            },
          ],
        },
        {
          label: 'Footer & sitemap',
          fields: [
            {
              name: 'sisterTitles',
              type: 'array',
              admin: { description: 'Footer strip "Also from Cmarketing Inc.".' },
              fields: [
                { name: 'title', type: 'text', required: true },
                urlField('href', undefined, true),
              ],
            },
            {
              name: 'editorAuthor',
              type: 'relationship',
              relationTo: 'authors',
              admin: { description: 'The author profile shown on the Contributors page (default: sk-uddin).' },
            },
            urlField('latestIssueHref', 'Link used by "Read the latest magazine" (pop-up, menus). Empty = newest issue page.'),
            {
              name: 'sitemapGroups',
              type: 'array',
              admin: { description: 'The /sitemap/ page. Tick "Provinces" for the group that lists every province guide.' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'provinces', type: 'checkbox', label: 'List the province guides here' },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    urlField('href', undefined, true),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Article footer',
          fields: [
            {
              name: 'articleFooterHtml',
              type: 'code',
              hooks: { beforeChange: [sanitizeHtmlHook] },
              admin: {
                language: 'html',
                description:
                  'Optional block (subscribe message, disclaimer) the website can show under every article.',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await notifyFrontend(req, {
          collection: 'site-settings',
          event: 'change',
          paths: ['/'],
          tags: ['site-settings', 'site'],
        })
        return doc
      },
    ],
  },
}

/** The mega menus that open from the main navigation (Business, Technology & AI, About Us, ...). */
export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Menus',
  admin: { group: GROUP.settings, description: 'The drop-down (mega) menus of the main navigation.' },
  access: { read: anyone, update: isStaff },
  fields: [
    {
      name: 'megaMenus',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [
            { label: 'Business', value: 'business' },
            { label: 'Technology & AI', value: 'technology' },
            { label: 'About Us', value: 'about' },
            { label: 'Leadership', value: 'leadership' },
            { label: 'Finance', value: 'finance' },
          ],
        },
        { name: 'badge', type: 'text', admin: { description: 'Small badge text in the menu panel.' } },
        { name: 'featured', type: 'text', admin: { description: 'Featured link text.' } },
        urlField('featuredHref'),
        {
          name: 'cols',
          type: 'array',
          label: 'Columns',
          maxRows: 4,
          fields: [
            { name: 'heading', type: 'text', required: true },
            {
              name: 'links',
              type: 'array',
              maxRows: 16,
              fields: [
                { name: 'label', type: 'text', required: true },
                urlField('href', undefined, true),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await notifyFrontend(req, {
          collection: 'navigation',
          event: 'change',
          paths: ['/'],
          tags: ['navigation', 'site'],
        })
        return doc
      },
    ],
  },
}
