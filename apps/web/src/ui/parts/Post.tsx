'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html, #a1 article layout used by
   every post page), then wired to CMS data. Markup and inline styles are kept 1:1 with the prototype;
   hover/focus styles live in states.css. Quick Read, Listen and the article formatter are ported from the
   prototype's article-tools.js (see ui/ArticleTools.tsx, lib/articleFormat.ts). */
import { Fragment } from 'react'

import ArticleTools from '../ArticleTools'
import { useV } from '../context'
import { u } from '../href'

const AD_LABEL = { fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" } as const
const AD_LINK = { display: "block", border: "1px solid #E4E7EC", borderRadius: "8px", overflow: "hidden", background: "#fff" } as const
const SHARE_BTN = { padding: "8px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", background: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12.5px", cursor: "pointer" } as const

export default function Post() {
  const v = useV()
  const ad = (slot: string, fallback: { href: string; img: string; alt: string }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {v.ad(slot, fallback, (a: any) => (
        <>
          <span style={AD_LABEL}>Advertisement</span>
          <a href={u(a.href)} target={a.href?.startsWith("http") ? "_blank" : undefined} rel={a.href?.startsWith("http") ? "sponsored noopener" : undefined} style={AD_LINK} className="h_9f7643d">
            <img src={a.img} alt={a.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
          </a>
        </>
      ))}
    </div>
  )
  return (
    <>
      <article style={{ display: v.postDisplay }}>
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#5A6470", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a href={u("#home")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              Home
            </a>
            <span aria-hidden="true">/</span>
            <a href={u(v.post?.catHref)} style={{ color: "#5A6470" }} className="h_9e87cbe">
              {v.post?.catShort}
            </a>
            <span aria-hidden="true">/</span>
            <span style={{ color: "#14181D" }}>{v.post?.crumb}</span>
          </div>
        </nav>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "44px 24px 20px" }}>
          <div style={{ maxWidth: "760px" }}>
            <span style={{ display: "inline-block", background: "#D71920", color: "#fff", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 10px", borderRadius: "6px", marginBottom: "16px" }}>
              {v.post?.pill}
            </span>
            <h1 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(34px,4.4vw,56px)", lineHeight: "1.04", letterSpacing: "-0.025em", textWrap: "pretty", marginBottom: "16px" }}>
              {v.post?.title}
            </h1>
            <p style={{ fontSize: "clamp(20px,2.2vw,24px)", lineHeight: "1.42", color: "#3A4250", textWrap: "pretty", marginBottom: "24px" }}>
              {v.post?.excerpt}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", paddingBottom: "22px", borderBottom: "1px solid #E4E7EC" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div aria-hidden="true" style={{ width: "46px", height: "46px", borderRadius: "50%", flexShrink: "0", background: "#101828", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px", letterSpacing: "0.02em" }}>
                  {v.post?.initials}
                </div>
                <div style={{ fontSize: "13.5px", lineHeight: "1.45" }}>
                  <a href={u(v.post?.authorHref)} style={{ display: "block", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", color: "#14181D" }} className="h_9e87cbe">
                    {v.post?.authorName}
                  </a>
                  <span style={{ color: "#5A6470" }}>{v.post?.metaLine}</span>
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button type="button" onClick={v.share} data-share="LinkedIn" style={SHARE_BTN} className="h_6bcb6d2">
                  Share
                </button>
                <button type="button" onClick={v.share} data-share="X" style={SHARE_BTN} className="h_6bcb6d2">
                  Post
                </button>
                <button type="button" onClick={v.share} data-share="link" style={SHARE_BTN} className="h_6bcb6d2">
                  Copy link
                </button>
                <button type="button" onClick={v.toggleBookmark} aria-pressed="false" aria-label="Bookmark this article" style={{ padding: "8px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", background: "#fff", color: "#5A6470", fontSize: "14px", cursor: "pointer" }} className="h_6bcb6d2">
                  ♡
                </button>
              </div>
            </div>
            <span aria-live="polite" style={{ display: "block", minHeight: "18px", fontSize: "12.5px", color: "#5A6470", paddingTop: "10px" }}>
              {v.shareMessage}
            </span>
          </div>
        </div>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 64px" }}>
          {v.post?.img ? (
            <>
              {/* Shown at its real shape: banners with text are never cropped. */}
              <div data-preview-hero="" style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #E4E7EC", marginBottom: "14px", background: "#F4F6F8", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={v.post?.img} alt={v.post?.alt} style={{ display: "block", width: "auto", maxWidth: "100%", height: "auto", maxHeight: "680px" }} />
              </div>
              <p style={{ fontSize: "12.5px", color: "#5A6470", marginBottom: "40px" }}>{v.post?.caption}</p>
            </>
          ) : null}
          <div style={{ display: "grid", gridTemplateColumns: v.postCols, gap: "48px", alignItems: "start" }}>
            <div style={{ maxWidth: "68ch", minWidth: "0", fontSize: "18px", lineHeight: "30px", color: "#14181D", display: "flex", flexDirection: "column", gap: "0" }}>
              <ArticleTools key={v.post?.slug} quickRead={v.postQuickRead} readTime={v.post?.read} />
              {v.postBody}
              <div data-csme-noread="" style={{ display: "flex", gap: "18px", alignItems: "flex-start", padding: "22px", border: "1px solid #E4E7EC", borderRadius: "10px", marginTop: "14px" }}>
                <div aria-hidden="true" style={{ width: "96px", height: "96px", borderRadius: "50%", overflow: "hidden", flexShrink: "0", background: "#101828", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "28px", letterSpacing: "0.02em" }}>
                  {v.post?.initials}
                </div>
                <div>
                  <span style={{ display: "block", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "16px", marginBottom: "6px" }}>{v.post?.authorName}</span>
                  <p style={{ fontSize: "14.5px", lineHeight: "1.65", color: "#5A6470" }}>{v.post?.authorBio}</p>
                  <a href={u(v.post?.authorHref)} style={{ display: "inline-block", marginTop: "10px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13.5px" }}>
                    View profile →
                  </a>
                </div>
              </div>
            </div>
            <aside aria-label="Article sidebar" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {ad("post-sidebar-2", { href: "https://www.wsib.ca", img: "/assets/ads/wsib-300x250.png", alt: "WSIB Ontario — Visit wsib.ca to make your workplace safer" })}
              {v.postHasToc ? (
                <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "18px" }}>
                  <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13px", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "14px" }}>In this article</h2>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
                    {(v.postToc || []).map((t: any, _i: number) => (
                      <Fragment key={t?.href ?? _i}>
                        <li>
                          <a href={t?.href} onClick={t?.go} style={{ color: "#14181D" }} className="h_9e87cbe">
                            {t?.label}
                          </a>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "18px", background: "#101828", color: "#fff" }}>
                <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "19px", lineHeight: "1.25", marginBottom: "10px" }}>Get the weekly briefing</h2>
                <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#C8CDD6", marginBottom: "14px" }}>Practical insight for Canadian business owners, every Tuesday.</p>
                <a href={u("#newsletter")} style={{ display: "block", textAlign: "center", padding: "11px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px" }} className="h_900112d">
                  Subscribe free
                </a>
              </div>
              {ad("post-sidebar-3", { href: "https://www.adp.ca", img: "/assets/ads/adp-300x234.png", alt: "ADP — Trusted by over 40,000 small businesses across Canada. Preferred HR and payroll partner of CanadianSME." })}
              {ad("post-sidebar-1", { href: "https://www.ups.com/ca", img: "/assets/ads/ups-300x600.png", alt: "UPS — Turn challenges into opportunities. Start with 55% savings on UPS Small Package Shipping." })}
            </aside>
          </div>
        </div>
        <div style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px" }}>
            <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "28px", marginBottom: "24px", letterSpacing: "-0.015em" }}>Related articles</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "22px" }}>
              {(v.morePosts || []).map((m: any, _i7: number) => (
                <Fragment key={m?.key ?? m?.id ?? m?.slug ?? m?.href ?? _i7}>
                  <article style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }}>
                    <a href={u(m?.href)} style={{ display: "block", height: "150px", background: "#F4F6F8" }}>
                      <img src={m?.img} alt={m?.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </a>
                    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>{m?.cat}</span>
                      <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "18px", lineHeight: "1.25" }}>
                        <a href={u(m?.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                          {m?.title}
                        </a>
                      </h3>
                    </div>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
