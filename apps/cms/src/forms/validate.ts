/**
 * Server-side validation for the website forms. Same rules as the design prototype's
 * client-side checks (so the visitor sees the same messages), plus length limits.
 * Pure functions: unit-tested in src/site/__tests__/forms.test.ts.
 */
import type { FormType } from '@canadiansme/shared'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Clean = {
  email: string
  name: string
  data: Record<string, unknown>
  consentGiven: boolean
  consentText: string
  /** Join the mailing list (Mailchimp), only with express consent. */
  subscribe: boolean
  tags: string[]
}
export type Result = { ok: true; value: Clean } | { ok: false; error: string; fields?: Record<string, string> }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const WEBSITE = /^(https?:\/\/)?[^\s./]+(\.[^\s./]+)+(\/\S*)?$/i
export const PROVINCES = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']

export const CONSENT = {
  newsletter:
    'I agree to receive the CanadianSME newsletter and related communications from Cmarketing Inc., Mississauga, Ontario. I can unsubscribe at any time.',
  popup: 'I agree to receive the selected CanadianSME publications by email from Cmarketing Inc. I can unsubscribe at any time.',
  gate: 'I agree to receive the CanadianSME newsletter from Cmarketing Inc. I can unsubscribe at any time.',
  advertise: 'I agree to receive CanadianSME news and partnership updates from Cmarketing Inc. I can unsubscribe at any time.',
  offer: 'Send me this offer and CanadianSME partner offers by email. I can unsubscribe at any time.',
}

/** Trim, drop control characters, cap length. */
const s = (v: unknown, max = 200): string =>
  typeof v === 'string'
    ? v
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .trim()
        .slice(0, max)
    : ''
const yes = (v: unknown) => v === true || v === 'true' || v === 'on' || v === 1 || v === '1'
const list = (v: unknown, max = 12) => (Array.isArray(v) ? v.map((x) => s(x, 120)).filter(Boolean).slice(0, max) : [])

export function validate(type: FormType, body: Record<string, any>): Result {
  if (s(body.company_website)) return { ok: false, error: 'Spam check failed.' } // honeypot
  const email = s(body.email, 254).toLowerCase()
  const source = s(body.source, 300)

  switch (type) {
    case 'newsletter': {
      const first = s(body.first, 80)
      const province = s(body.province, 40)
      const stage = s(body.stage, 80)
      if (first.length < 2) return { ok: false, error: 'Please enter your first name.', fields: { first: 'required' } }
      if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.', fields: { email: 'invalid' } }
      if (!province) return { ok: false, error: 'Please select your province.', fields: { province: 'required' } }
      if (!stage) return { ok: false, error: 'Please select your business stage.', fields: { stage: 'required' } }
      if (!yes(body.consent)) return { ok: false, error: 'Please confirm you agree to receive communications.', fields: { consent: 'required' } }
      return ok(email, first, { first, province, stage, source }, true, CONSENT.newsletter, true, ['newsletter', `province:${province}`, `stage:${stage}`])
    }
    case 'popup': {
      const magazine = yes(body.magazine)
      const newsletter = yes(body.newsletter)
      if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.', fields: { email: 'invalid' } }
      if (!magazine && !newsletter) return { ok: false, error: 'Choose the magazine, the newsletter, or both.' }
      const tags = ['popup', ...(magazine ? ['magazine'] : []), ...(newsletter ? ['newsletter'] : [])]
      return ok(email, '', { magazine, newsletter, source }, true, CONSENT.popup, true, tags)
    }
    case 'contact': {
      const name = s(body.name, 120)
      const topic = s(body.topic, 80)
      const message = s(body.message, 5000)
      if (name.length < 2) return { ok: false, error: 'Please enter your name.', fields: { name: 'required' } }
      if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.', fields: { email: 'invalid' } }
      if (!topic) return { ok: false, error: 'Please choose a reason for contact.', fields: { topic: 'required' } }
      if (message.length < 10) return { ok: false, error: 'Please add a little more detail to your message.', fields: { message: 'short' } }
      return ok(email, name, { name, topic, message, source }, false, '', false, ['contact'])
    }
    case 'advertise': {
      const d = {
        name: s(body.name, 120),
        company: s(body.company, 160),
        website: s(body.website, 300),
        phone: s(body.phone, 40),
        objective: s(body.objective, 120),
        budget: s(body.budget, 80),
        timing: s(body.timing, 80),
        details: s(body.details, 5000),
        interests: list(body.interests),
        source,
      }
      const fields: Record<string, string> = {}
      if (d.name.length < 2) fields.name = 'Enter your full name.'
      if (d.company.length < 2) fields.company = 'Enter your company or agency name.'
      if (!email) fields.email = 'Enter your work email.'
      else if (!EMAIL.test(email)) fields.email = 'Enter a valid email address, like name@company.ca.'
      if (d.website && !WEBSITE.test(d.website)) fields.website = 'Enter a valid website, like company.ca.'
      if (d.phone && d.phone.replace(/\D/g, '').length < 10) fields.phone = 'Enter a 10-digit phone number, or leave this blank.'
      if (!d.details) fields.details = 'Tell us about your campaign.'
      else if (d.details.length < 20) fields.details = 'Add a little more detail (at least 20 characters).'
      const n = Object.keys(fields).length
      if (n) return { ok: false, error: `Please fix ${n} ${n === 1 ? 'field' : 'fields'} marked below.`, fields }
      const optIn = yes(body.newsletterOptIn)
      return ok(email, d.name, d, optIn, optIn ? CONSENT.advertise : '', optIn, ['advertise-enquiry'])
    }
    case 'gate': {
      const first = s(body.first, 80)
      const last = s(body.last, 80)
      const business = s(body.business, 160)
      const province = s(body.province, 40)
      const resource = s(body.resource, 120)
      if (first.length < 2) return { ok: false, error: 'Please enter your first name.', fields: { first: 'required' } }
      if (last.length < 1) return { ok: false, error: 'Please enter your last name.', fields: { last: 'required' } }
      if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.', fields: { email: 'invalid' } }
      if (business.length < 2) return { ok: false, error: 'Please enter your business name.', fields: { business: 'required' } }
      if (!province) return { ok: false, error: 'Please select your province or territory.', fields: { province: 'required' } }
      const optIn = yes(body.newsletter)
      return ok(email, `${first} ${last}`, { first, last, business, province, resource, source }, optIn, optIn ? CONSENT.gate : '', optIn, [
        'download',
        ...(resource ? [`resource:${resource}`] : []),
      ])
    }
    case 'offer': {
      const offer = s(body.offer, 200)
      if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.', fields: { email: 'invalid' } }
      const optIn = yes(body.optIn)
      return ok(email, '', { offer, partner: s(body.partner, 120), source }, optIn, optIn ? CONSENT.offer : '', optIn, [
        'offer-claim',
        ...(offer ? [`offer:${offer.slice(0, 60)}`] : []),
      ])
    }
    default:
      return { ok: false, error: 'Unknown form.' }
  }
}

function ok(
  email: string,
  name: string,
  data: Record<string, unknown>,
  consentGiven: boolean,
  consentText: string,
  subscribe: boolean,
  tags: string[],
): Result {
  return { ok: true, value: { email, name, data, consentGiven, consentText, subscribe, tags } }
}
