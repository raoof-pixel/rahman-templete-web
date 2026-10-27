import type { CollectionConfig } from 'payload'

import { isStaff, publishedOrAuthenticated } from '../../access'
import { slug } from '../../fields/slug'
import { GROUP, siteHooks, urlField } from './helpers'

/** Podcast episodes. Website: /podcast/ (all episodes) and /podcast/<slug>/. */
export const PodcastEpisodes: CollectionConfig = {
  slug: 'podcast-episodes',
  labels: { singular: 'Podcast episode', plural: 'Podcast episodes' },
  admin: {
    group: GROUP.magazine,
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'date', '_status'],
    description: 'The Podcast page. Platform links (Spotify, Apple, YouTube) for the show are in Settings › Site settings.',
  },
  access: {
    read: publishedOrAuthenticated,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
    readVersions: ({ req }) => Boolean(req.user),
  },
  defaultSort: '-number',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'number', type: 'number', required: true, unique: true, index: true, admin: { position: 'sidebar' } },
    slug(),
    { name: 'date', type: 'date', required: true, index: true, admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'duration', type: 'text', admin: { position: 'sidebar', description: 'e.g. "34 min".' } },
    { name: 'length', type: 'text', admin: { position: 'sidebar', description: 'Player length, e.g. "34:02".' } },
    { name: 'desc', type: 'textarea', label: 'Description' },
    { name: 'art', type: 'upload', relationTo: 'media' },
    { name: 'audio', type: 'upload', relationTo: 'media', admin: { description: 'MP3 file, or use the audio link below.' } },
    urlField('audioUrl', 'Hosted audio link (if not uploaded).'),
    { name: 'notesIntro', type: 'textarea', label: 'Episode notes intro' },
    {
      name: 'notes',
      type: 'array',
      label: 'Chapters',
      fields: [
        { name: 't', type: 'text', label: 'Time', required: true, admin: { description: 'e.g. 02:10' } },
        { name: 'text', type: 'text', required: true },
      ],
    },
    urlField('spotify', 'This episode on Spotify (optional).'),
    urlField('apple', 'This episode on Apple Podcasts (optional).'),
    urlField('youtube', 'This episode on YouTube (optional).'),
  ],
  hooks: siteHooks('podcast-episodes', (d) => [`episode:${d.slug}`], (d) => ['/podcast/', `/podcast/${d.slug}/`]),
  versions: { drafts: true, maxPerDoc: 10 },
}
