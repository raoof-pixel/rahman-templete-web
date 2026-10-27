import type { Field } from 'payload'

/**
 * "AI & layout" extras for an article, shown on the website's #a1 article layout:
 *
 *  - Quick Read: 3–5 key points (AI-generated at import/publish, reviewed by an editor).
 *  - Pull quote and key figures: copied word for word from the article. The website only shows
 *    them when the exact text appears in the article, so a typo here hides them instead of
 *    showing something the article does not say.
 *  - Section headings: for articles that have no headings of their own.
 *  - Sidebar labels: short versions of long headings for "In this article".
 *
 * The article text itself is never changed by any of these.
 * Read by site/post.ts → PostFull.extras → apps/web lib/articleFormat.ts.
 */
export const articleExtrasField = (): Field => ({
  name: 'extras',
  type: 'group',
  label: 'AI & layout',
  admin: {
    description: 'Quick Read summary and layout extras shown on the article page. Never changes the article text.',
  },
  fields: [
    {
      name: 'quickRead',
      type: 'group',
      label: 'Quick Read (AI summary)',
      fields: [
        {
          name: 'points',
          type: 'array',
          label: 'Key points',
          maxRows: 5,
          labels: { singular: 'Point', plural: 'Points' },
          admin: { description: '3 short points, facts from the article only.' },
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'reviewed',
              type: 'checkbox',
              label: 'Reviewed by the newsroom',
              defaultValue: false,
              admin: { description: 'Shows "newsroom-reviewed" under the summary.' },
            },
            {
              name: 'generatedAt',
              type: 'date',
              admin: { readOnly: true, description: 'When the AI wrote it.' },
            },
          ],
        },
      ],
    },
    {
      name: 'pullQuote',
      type: 'textarea',
      admin: { description: 'One sentence copied exactly from the article. Shown as a large quote near the middle.' },
    },
    {
      name: 'keyFigures',
      type: 'array',
      label: 'Key figures',
      maxRows: 3,
      labels: { singular: 'Figure', plural: 'Figures' },
      admin: { description: 'Numbers stated in the article (e.g. "$4.7 billion"). At least 2 are needed to show the box.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '35%', description: 'Exactly as written in the article.' } },
            { name: 'label', type: 'text', required: true, admin: { width: '65%' } },
          ],
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Section headings (for articles without headings)',
      labels: { singular: 'Heading', plural: 'Headings' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'before',
          type: 'textarea',
          required: true,
          label: 'Place before the paragraph that starts with',
          admin: { description: 'Paste the first words (at least 15 characters) of that paragraph.' },
        },
      ],
    },
    {
      name: 'tocLabels',
      type: 'array',
      label: 'Short labels for "In this article"',
      labels: { singular: 'Label', plural: 'Labels' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'heading', type: 'text', required: true, admin: { width: '60%', description: 'The heading as it appears in the article (or its first words).' } },
            { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
          ],
        },
      ],
    },
  ],
})

/** Sidebar: the article's own audio recording, and a switch for the read-aloud bar. */
export const articleAudioFields = (): Field[] => [
  {
    name: 'audio',
    type: 'upload',
    relationTo: 'media',
    label: 'Article audio (MP3)',
    filterOptions: { mimeType: { contains: 'audio' } },
    admin: {
      position: 'sidebar',
      description: 'If set, the Listen bar plays this recording instead of the browser voice.',
    },
  },
  {
    name: 'hideListen',
    type: 'checkbox',
    label: 'Hide the Listen bar',
    defaultValue: false,
    admin: { position: 'sidebar' },
  },
]
