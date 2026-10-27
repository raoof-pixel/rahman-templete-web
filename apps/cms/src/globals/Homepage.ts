import type { Field, GlobalConfig } from 'payload'

import { anyone, isStaff } from '../access'
import { colourField, GROUP, urlField } from '../collections/site/helpers'
import { notifyFrontend } from '../utilities/revalidate'

/**
 * A story slot: pick an article, and optionally override what the homepage shows for it.
 * Empty override fields fall back to the article's own title, excerpt, image, date, etc.
 */
const story = (opts: { cat?: boolean; date?: boolean; manualHref?: boolean } = {}): Field[] => [
  {
    name: 'post',
    type: 'relationship',
    relationTo: 'posts',
    admin: { description: 'The article. Leave the fields below empty to use the article’s own text and image.' },
  },
  ...(opts.cat ? [{ name: 'cat', type: 'text', label: 'Label override' } as Field] : []),
  { name: 'title', type: 'text', label: 'Title override' },
  { name: 'excerpt', type: 'textarea', label: 'Excerpt override' },
  ...(opts.date
    ? ([
        { name: 'date', type: 'text', label: 'Date override', admin: { description: 'e.g. "Aug 12, 2026"' } },
        { name: 'read', type: 'text', label: 'Reading time override', admin: { description: 'e.g. "5 min"' } },
      ] as Field[])
    : []),
  { name: 'image', type: 'upload', relationTo: 'media', label: 'Image override' },
  { name: 'alt', type: 'text', label: 'Image description override' },
  urlField('href', opts.manualHref ? 'Link (used when no article is picked).' : 'Link override (rarely needed).'),
]

const tab = (label: string, description: string, fields: Field[]) => ({ label, description, fields })

/** Everything on the homepage that isn't automatic (the newest articles fill "Latest" on their own). */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: { group: GROUP.homepage, description: 'Each tab is one section of the homepage, top to bottom.' },
  access: { read: anyone, update: isStaff },
  fields: [
    {
      type: 'tabs',
      tabs: [
        tab('Hero slider', 'The rotating banner at the top.', [
          {
            name: 'slides',
            type: 'array',
            maxRows: 8,
            fields: [
              { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Magazine logo shown on the slide (white).' } },
              { name: 'logoAlt', type: 'text' },
              { name: 'lines', type: 'textarea', required: true, admin: { description: 'Headline, one line per row.' } },
              { name: 'cta', type: 'text', defaultValue: 'Read Now' },
              urlField('href', 'Where the button goes.', true),
              {
                name: 'bg',
                type: 'text',
                label: 'Background',
                admin: { description: 'CSS gradient, e.g. linear-gradient(115deg, #0B1B33 0%, #2F6FC4 100%).' },
                validate: (v: unknown) =>
                  !v || (typeof v === 'string' && /^(linear|radial)-gradient\([#%,.\s\w-]+\)$|^#[0-9a-f]{3,8}$/i.test(v))
                    ? true
                    : 'Use a CSS linear-gradient(...) or a hex colour',
              },
              { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Cover image.' } },
              { name: 'alt', type: 'text' },
            ],
          },
        ]),
        tab('Lead story', 'The big story under the slider.', [{ name: 'hero', type: 'group', fields: story({ cat: true, date: true }) }]),
        tab('Sponsored', 'The partner cards ("Insights from our partners"). Always labelled Sponsored.', [
          {
            name: 'secondary',
            type: 'array',
            maxRows: 4,
            fields: [
              { name: 'sponsor', type: 'text', required: true, admin: { description: 'Partner name shown as "Paid for by …".' } },
              ...story({ cat: true, date: true, manualHref: true }),
              { name: 'placeholder', type: 'text', admin: { description: 'Image description used when there is no image.' } },
            ],
          },
        ]),
        tab('AI coverage', 'The "AI" band: one lead story and up to four more.', [
          {
            name: 'aiTopic',
            type: 'group',
            fields: [
              { name: 'lead', type: 'group', fields: story({ date: true }) },
              { name: 'more', type: 'array', maxRows: 6, fields: story({ date: true }) },
            ],
          },
        ]),
        tab('Spotlight', 'Entrepreneur Spotlight band.', [{ name: 'spotlight', type: 'group', fields: story() }]),
        tab('Most read', 'The numbered "Most read" list in the sidebar.', [
          {
            name: 'mostRead',
            type: 'array',
            maxRows: 6,
            fields: [
              { name: 'post', type: 'relationship', relationTo: 'posts' },
              { name: 'title', type: 'text', label: 'Title override' },
              urlField('href', 'Link (used when no article is picked).'),
            ],
          },
        ]),
        tab('Woman of the Month', 'Business Woman of the Month band.', [
          {
            name: 'wotm',
            type: 'group',
            fields: [
              { name: 'month', type: 'text', required: true, admin: { description: 'e.g. "August 2026".' } },
              { name: 'name', type: 'text', required: true },
              { name: 'role', type: 'text' },
              { name: 'kicker', type: 'text', admin: { description: 'One-line summary under the name.' } },
              ...story(),
            ],
          },
        ]),
        tab('Topics', 'The coloured topic cards. Count and newest story are filled in automatically.', [
          {
            name: 'topicCards',
            type: 'array',
            maxRows: 12,
            fields: [
              { name: 'name', type: 'text', required: true },
              { name: 'desc', type: 'textarea' },
              urlField('href', 'Topic page (usually a category).', true),
              { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true, required: true },
              colourField('ink', 'Text colour'),
              colourField('tint', 'Background colour'),
              colourField('line', 'Border colour'),
            ],
          },
        ]),
        tab('Communities', 'Women, Black, Indigenous and 2SLGBTQI+ blocks — each uses only its own stories.', [
          {
            name: 'communities',
            type: 'array',
            maxRows: 4,
            fields: [
              { name: 'heading', type: 'text', required: true },
              { name: 'slot', type: 'text', admin: { description: 'Internal key, e.g. comm-women.' } },
              { name: 'category', type: 'relationship', relationTo: 'categories', admin: { description: 'Fills the block with this category’s newest stories when nothing is picked below.' } },
              urlField('href', 'Link for the heading (defaults to the category).'),
              { name: 'lead', type: 'group', fields: story({ manualHref: true }) },
              {
                name: 'more',
                type: 'array',
                maxRows: 2,
                fields: [
                  { name: 'post', type: 'relationship', relationTo: 'posts' },
                  { name: 'title', type: 'text', label: 'Title override' },
                  urlField('href', 'Link (used when no article is picked).'),
                ],
              },
            ],
          },
        ]),
        tab('Tools & finder', 'Free tools cards and the funding finder needs.', [
          {
            name: 'tools',
            type: 'array',
            maxRows: 8, // the design shows 7 tools (GST/HST, payroll, cash flow, loan, self-employed, import, pricing)
            fields: [
              { name: 'mark', type: 'text', admin: { description: 'Short symbol, e.g. "%" or "$".' } },
              { name: 'title', type: 'text', required: true },
              { name: 'desc', type: 'textarea' },
              urlField('href', undefined, true),
            ],
          },
          {
            name: 'finderNeeds',
            type: 'array',
            admin: { description: 'Filter chips of the funding finder. Keep "all" first.' },
            fields: [
              { name: 'key', type: 'text', required: true, admin: { description: 'all, loans, export, tech or hire' } },
              { name: 'label', type: 'text', required: true },
            ],
          },
        ]),
        tab('Platforms', 'Show, Awards, Summit cards (also on the About page).', [
          {
            name: 'programs',
            type: 'array',
            maxRows: 6,
            fields: [
              { name: 'slot', type: 'text' },
              { name: 'title', type: 'text', required: true },
              { name: 'desc', type: 'textarea' },
              { name: 'image', type: 'text', label: 'Image description' },
              { name: 'photo', type: 'upload', relationTo: 'media' },
              urlField('href', undefined, true),
              { name: 'cta', type: 'text', defaultValue: 'Learn more →' },
            ],
          },
        ]),
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await notifyFrontend(req, { collection: 'homepage', event: 'change', paths: ['/', '/about/'], tags: ['home', 'site'] })
        return doc
      },
    ],
  },
}

