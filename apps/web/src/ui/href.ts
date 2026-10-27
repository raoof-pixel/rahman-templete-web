import { protoHref } from '@canadiansme/shared'

/**
 * Links in the generated markup. Prototype "#hash" routes become real URLs; CMS hrefs (already real)
 * and external links pass through unchanged.
 */
export const u = (href: unknown): string => protoHref(typeof href === 'string' ? href : '#')
