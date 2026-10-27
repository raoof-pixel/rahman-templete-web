# Security scan

Scanned: posts 20, pages 38, categories 55, tags 159, authors 447, media 16, users 4, redirects 1, settings 2

| Severity | Findings |
| --- | ---: |
| critical | 1 |
| high | 5 |
| medium | 6 |
| low | 3 |

## By rule

- **Iframe or embed from an unknown site** (`untrusted-embed`): 3
- **Shortened link** (`url-shortener`): 2
- **Unusually many external links** (`external-link-flood`): 2
- **Script tag** (`script-tag`): 1
- **Spam link** (`spam-link`): 1
- **Link to a suspicious domain** (`suspicious-domain`): 1
- **Recently created admin** (`new-admin`): 1
- **Repeated failed logins** (`failed-logins`): 1
- **Admin account (review)** (`admin-account`): 1
- **Redirect to a suspicious address** (`suspicious-redirect`): 1
- **Spam words in a redirect path** (`spam-redirect-path`): 1

## Most severe (first 50)

- CRITICAL posts #5 "Scanner Seed Article" excerpt: script-tag — `<script>`
- HIGH posts #1 "Security Test Article" legacyHtml: untrusted-embed — `<iframe loading="lazy" referrerpolicy="strict-origin-when-cross-origin">`
- HIGH posts #5 "Scanner Seed Article" legacyHtml: spam-link — `buy viagra online → https://cheap-pills.xyz/viagra`
- HIGH pages #7 "advisor new" legacyHtml: untrusted-embed — `<iframe id="JotFormIFrame-242062854189462" title="CanadianSME Advisory Membership Benefits " allow="geolocation; microp…`
- HIGH pages #31 "About Us" legacyHtml: untrusted-embed — `<iframe title="CanadianSME Small Business Magazine October 2026" allow="clipboard-write; autoplay; encrypted-media; ful…`
- HIGH redirects #1 "/cheap-viagra-online/" to.url: suspicious-redirect — `/cheap-viagra-online/ → https://bit.ly/abc123 (Shortened link)`
