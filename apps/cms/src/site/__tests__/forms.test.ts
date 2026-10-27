import assert from 'node:assert/strict'
import { test } from 'node:test'

import { validate } from '../../forms/validate'

test('newsletter rules match the prototype', () => {
  assert.equal(validate('newsletter', { first: 'A', email: 'a@b.ca' }).ok, false)
  const bad = validate('newsletter', { first: 'Ann', email: 'nope' })
  assert.ok(!bad.ok && bad.error === 'Please enter a valid email address.')
  const noConsent = validate('newsletter', { first: 'Ann', email: 'ann@x.ca', province: 'ON', stage: 'Growing' })
  assert.ok(!noConsent.ok && /confirm/.test(noConsent.error))
  const ok = validate('newsletter', { first: 'Ann', email: 'Ann@X.ca', province: 'ON', stage: 'Growing', consent: true })
  assert.ok(ok.ok && ok.value.email === 'ann@x.ca' && ok.value.subscribe && ok.value.consentText)
})

test('honeypot and limits', () => {
  const r = validate('contact', { name: 'Bob', email: 'b@x.ca', topic: 'editorial', message: 'hello there!', company_website: 'spam.com' })
  assert.ok(!r.ok && r.error === 'Spam check failed.')
  const long = validate('contact', { name: 'Bob', email: 'b@x.ca', topic: 't', message: 'x'.repeat(20000) })
  assert.ok(long.ok && String(long.value.data.message).length === 5000)
})

test('advertise reports every bad field', () => {
  const r = validate('advertise', { name: 'B', company: '', email: 'bad', phone: '123', details: 'short', website: 'not a site' })
  assert.ok(!r.ok && r.fields && Object.keys(r.fields).length === 6)
  assert.equal(r.ok ? '' : r.error, 'Please fix 6 fields marked below.')
})

test('popup needs a publication', () => {
  assert.ok(!validate('popup', { email: 'a@b.ca' }).ok)
  const r = validate('popup', { email: 'a@b.ca', magazine: true })
  assert.ok(r.ok && r.value.tags.includes('magazine'))
})

test('gate and offer', () => {
  assert.ok(!validate('gate', { first: 'Al', last: 'B', email: 'a@b.ca', business: 'Co', province: '' }).ok)
  const g = validate('gate', { first: 'Al', last: 'B', email: 'a@b.ca', business: 'Co', province: 'ON', resource: 'starting' })
  assert.ok(g.ok && !g.value.subscribe)
  assert.ok(validate('offer', { email: 'a@b.ca', offer: 'x', optIn: true }).ok)
})
