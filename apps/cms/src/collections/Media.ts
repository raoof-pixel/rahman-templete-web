import path from 'path'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

import { anyone, authenticatedField, canCreateContent, canDeleteOwnOrAll, canUpdateOwnOrAll } from '../access'
import { auditAfterDelete } from './AuditLogs'
import { wpId } from '../fields/wordpress'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Images and files. In production files are stored in the Supabase Storage bucket
 * (see payload.config.ts); locally they go to apps/cms/public/media.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Newsroom',
    defaultColumns: ['filename', 'alt', 'createdAt'],
  },
  access: {
    read: anyone,
    create: canCreateContent,
    update: canUpdateOwnOrAll,
    delete: canDeleteOwnOrAll,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Describe the image for screen readers and Google Images.' },
    },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text', admin: { description: 'e.g. "Image courtesy: Canva"' } },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', readOnly: true },
      // Hidden from the public API; always the uploader, can't be faked.
      access: { read: authenticatedField, update: () => false },
      hooks: {
        beforeChange: [
          ({ operation, req, value }) => (operation === 'create' && req.user ? req.user.id : value),
        ],
      },
    },
    wpId(),
    {
      name: 'wpUrl',
      type: 'text',
      index: true,
      label: 'Original WordPress URL',
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
  hooks: {
    afterDelete: [auditAfterDelete],
  },
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    // No SVG: SVG files can contain scripts. Only these formats are accepted.
    // MP3 = the "listen to this article" audio; MP4 = short videos (both exist on WordPress).
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/avif',
      'application/pdf',
      'audio/mpeg',
      'video/mp4',
    ],
    // Website sizes are WebP (smaller, same quality); never enlarged beyond the original.
    // "og" stays JPEG because some social networks still don't read WebP share images.
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 200, position: 'centre', formatOptions: { format: 'webp', options: { quality: 82 } } },
      { name: 'card', width: 640, formatOptions: { format: 'webp', options: { quality: 82 } } },
      { name: 'large', width: 1280, formatOptions: { format: 'webp', options: { quality: 82 } } },
      { name: 'xlarge', width: 1920, formatOptions: { format: 'webp', options: { quality: 82 } } },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
}
