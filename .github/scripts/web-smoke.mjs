// Website smoke test, run in CI after the CMS has 15 imported articles.
// Usage: node .github/scripts/web-smoke.mjs http://localhost:3001
const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '')
const cms = (process.env.CMS_URL || 'http://localhost:3000').replace(/\/$/, '')
let failed = 0
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
  if (!ok) failed++
}
const get = (path, init) => fetch(`${base}${path}`, { redirect: 'manual', ...init })

const home = await get('/')
const homeHtml = await home.text()
check('homepage returns 200', home.status === 200, String(home.status))
check('homepage has lang en-CA', homeHtml.includes('lang="en-CA"'))
check('homepage has one h1', (homeHtml.match(/<h1[\s>]/g) || []).length === 1)

const posts = await fetch(`${cms}/api/posts?limit=1&sort=-publishedAt&depth=0`).then((r) => r.json()).catch(() => ({ docs: [] }))
const slug = posts.docs?.[0]?.slug
if (slug) {
  const art = await get(`/${slug}/`)
  const html = await art.text()
  check('newest article renders', art.status === 200, `/${slug}/ -> ${art.status}`)
  check('article has NewsArticle JSON-LD', html.includes('"NewsArticle"'))
  check('article has canonical', html.includes(`rel="canonical"`))
  check('article without trailing slash redirects', [301, 308].includes((await get(`/${slug}`)).status))
} else {
  check('CMS has at least one article to test with', false, 'import step produced no posts')
}

check('unknown URL returns 404', (await get('/this-page-does-not-exist-12345/')).status === 404)
check('/latest/ returns 200', (await get('/latest/')).status === 200)
check('/search/?q=business returns 200', (await get('/search/?q=business')).status === 200)
const feed = await get('/feed/')
check('/feed/ is RSS', feed.status === 200 && (feed.headers.get('content-type') || '').includes('rss'))
check('/sitemap.xml returns 200', (await get('/sitemap.xml')).status === 200)
check('/robots.txt returns 200', (await get('/robots.txt')).status === 200)
const preview = await (await get('/_preview/')).text()
check('/_preview/ template has placeholders', preview.includes('%%TITLE%%') && preview.includes('%%BODY%%'))
check(
  '/api/revalidate rejects a wrong secret',
  (await get('/api/revalidate/', { method: 'POST', headers: { 'x-revalidate-secret': 'wrong' }, body: '{}' })).status === 401,
)
const ok = await get('/api/revalidate/', {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-revalidate-secret': process.env.REVALIDATE_SECRET || '' },
  body: JSON.stringify({ collection: 'posts', event: 'change', paths: ['/'], tags: ['posts'] }),
})
check('/api/revalidate accepts the right secret', ok.status === 200, String(ok.status))

console.log(failed ? `\n${failed} check(s) failed` : '\nAll website checks passed')
process.exit(failed ? 1 : 0)
