'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Post() {
  const v = useV()
  return (
    <>
      <article style={{ display: v.postDisplay }}>
        {" "}
        <div style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 24px 48px" }}>
            {" "}
            <nav aria-label="Breadcrumb" style={{ display: "flex", gap: "8px", flexWrap: "wrap", fontSize: "13px", color: "#D0D5DD", marginBottom: "26px" }}>
              {" "}
              <a href={u("#home")} style={{ color: "#D0D5DD" }} className="h_1f6476f">
                Home
              </a>
              <span aria-hidden="true">
                /
              </span>
              <span style={{ color: "#fff", fontWeight: "500" }}>
                {v.post?.catShort}
              </span>
              {" "}
            </nav>
            {" "}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "44px", alignItems: "center" }}>
              {" "}
              <div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
                {" "}
                {v.post?.sponsored ? (
                  <>
                    <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8A6A12", background: "#FDF8EC", border: "1px solid #E8D79B", padding: "5px 10px", borderRadius: "4px" }}>
                      Sponsored content
                    </span>
                  </>
                ) : null}
                {" "}
                <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,2.6vw,36px)", lineHeight: "1.2", letterSpacing: "-0.01em", color: "#fff", textWrap: "pretty" }}>
                  {v.post?.title}
                </h1>
                {" "}
                <p style={{ fontSize: "17px", lineHeight: "1.6", color: "#D0D5DD", textWrap: "pretty" }}>
                  {v.post?.excerpt}
                </p>
                {" "}
                <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", fontSize: "13.5px", color: "#D0D5DD" }}>
                  {" "}
                  <span style={{ background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 10px", borderRadius: "4px" }}>
                    {v.post?.catShort}
                  </span>
                  {" "}
                  <span>
                    {v.post?.date}
                  </span>
                  <span aria-hidden="true">
                    ·
                  </span>
                  <span>
                    {v.post?.read}
                  </span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              {v.post?.img ? (
                <>
                  <div data-preview-hero="" style={{ flex: "1 1 440px", minWidth: "0", borderRadius: "12px", overflow: "hidden", background: "#22283A", border: "1px solid #33394A" }}>
                    <img src={v.post?.img} alt={v.post?.alt} style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                </>
              ) : null}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "44px 24px 64px", display: "flex", flexWrap: "wrap", gap: "44px", alignItems: "flex-start" }}>
          {" "}
          <aside aria-label="Article details" style={{ flex: "0 1 220px", minWidth: "200px", display: "flex", flexDirection: "column", gap: "22px", position: "sticky", top: "96px" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingBottom: "20px", borderBottom: "1px solid #E4E7EC" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D71920" }}>
                You’re reading
              </span>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14.5px", lineHeight: "1.35", color: "#101828" }}>
                {v.post?.title}
              </span>
              {" "}
              <span style={{ fontSize: "12.5px", color: "#667085" }}>
                {v.post?.read}
              </span>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", gap: "12px", alignItems: "center", paddingBottom: "20px", borderBottom: "1px solid #E4E7EC" }}>
              {" "}
              <span aria-hidden="true" style={{ flex: "0 0 auto", width: "44px", height: "44px", borderRadius: "50%", background: "#101828", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "16px" }}>
                {v.post?.initials}
              </span>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                {" "}
                <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px", color: "#101828" }}>
                  {v.post?.authorName}
                </span>
                {" "}
                <span style={{ fontSize: "12.5px", color: "#475467" }}>
                  {v.post?.authorRole}
                </span>
                {" "}
                <span style={{ fontSize: "12.5px", color: "#667085" }}>
                  Published on {v.post?.shortDate}
                </span>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#667085" }}>
                Share this story
              </span>
              {" "}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {" "}
                <button type="button" onClick={v.share} data-share="Facebook" aria-label="Share on Facebook" title="Share on Facebook" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", border: "1.5px solid #D0D5DD", borderRadius: "8px", background: "#fff", color: "#101828", cursor: "pointer" }} className="h_a7afd31">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ pointerEvents: "none" }}>
                    <path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.2V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z" fill="currentColor" />
                  </svg>
                </button>
                {" "}
                <button type="button" onClick={v.share} data-share="X" aria-label="Share on X" title="Share on X" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", border: "1.5px solid #D0D5DD", borderRadius: "8px", background: "#fff", color: "#101828", cursor: "pointer" }} className="h_a7afd31">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ pointerEvents: "none" }}>
                    <path d="M17.5 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.7L4.3 21H1l7.7-8.8L.7 3h6.8l4.7 6.2L17.5 3zm-1.2 16h1.8L6.8 4.9H4.9L16.3 19z" fill="currentColor" />
                  </svg>
                </button>
                {" "}
                <button type="button" onClick={v.share} data-share="LinkedIn" aria-label="Share on LinkedIn" title="Share on LinkedIn" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", border: "1.5px solid #D0D5DD", borderRadius: "8px", background: "#fff", color: "#101828", cursor: "pointer" }} className="h_a7afd31">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ pointerEvents: "none" }}>
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" fill="currentColor" />
                  </svg>
                </button>
                {" "}
                <button type="button" onClick={v.share} data-share="WhatsApp" aria-label="Share on WhatsApp" title="Share on WhatsApp" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", border: "1.5px solid #D0D5DD", borderRadius: "8px", background: "#fff", color: "#101828", cursor: "pointer" }} className="h_a7afd31">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ pointerEvents: "none" }}>
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3 1 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3z" fill="currentColor" />
                  </svg>
                </button>
                {" "}
                <button type="button" onClick={v.share} data-share="link" aria-label="Copy link" title="Copy link" style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", border: "1.5px solid #D0D5DD", borderRadius: "8px", background: "#fff", color: "#101828", cursor: "pointer" }} className="h_a7afd31">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ pointerEvents: "none" }}>
                    <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4L12 5.6M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                {" "}
              </div>
              {" "}
              <span aria-live="polite" style={{ fontSize: "12.5px", color: "#667085", minHeight: "16px" }}>
                {v.shareMessage}
              </span>
              {" "}
            </div>
            {" "}
          </aside>
          {" "}
          <div style={{ flex: "1 1 560px", minWidth: "0", maxWidth: "720px" }}>
            {" "}{v.postBody}{" "}
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "24px", marginTop: "36px", border: "1px solid #E4E7EC", borderRadius: "12px", background: "#F9FAFB" }}>
              {" "}
              <span aria-hidden="true" style={{ flex: "0 0 auto", width: "56px", height: "56px", borderRadius: "50%", background: "#101828", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "20px" }}>
                {v.post?.initials}
              </span>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                {" "}
                <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "16px", color: "#101828" }}>
                  {v.post?.authorName}
                </span>
                {" "}
                <span style={{ fontSize: "13px", color: "#475467" }}>
                  {v.post?.authorRole}
                </span>
                {" "}
                <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#344054", marginTop: "4px" }}>
                  {v.post?.authorBio}
                </p>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <aside aria-label="Advertisements" style={{ flex: "0 1 300px", maxWidth: "300px", display: "flex", flexDirection: "column", gap: "22px" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#98A2B3" }}>
                Advertisement
              </span>
              {" "}
              {v.ad("post-sidebar-1", { href: "https://www.ups.com/ca", img: "/assets/ads/ups-300x600.png", alt: "UPS — Turn challenges into opportunities. Start with 55% savings on UPS Small Package Shipping." }, (ad: any) => (
                <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", border: "1px solid #E4E7EC", borderRadius: "8px", overflow: "hidden", background: "#fff" }} className="h_9f7643d">
                  <img src={ad.img} alt={ad.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                </a>
              ))}
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#98A2B3" }}>
                Advertisement
              </span>
              {" "}
              {v.ad("post-sidebar-2", { href: "https://www.wsib.ca", img: "/assets/ads/wsib-300x250.png", alt: "WSIB Ontario — Visit wsib.ca to make your workplace safer" }, (ad: any) => (
                <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", border: "1px solid #E4E7EC", borderRadius: "8px", overflow: "hidden", background: "#fff" }} className="h_9f7643d">
                  <img src={ad.img} alt={ad.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                </a>
              ))}
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#98A2B3" }}>
                Advertisement
              </span>
              {" "}
              {v.ad("post-sidebar-3", { href: "https://www.adp.ca", img: "/assets/ads/adp-300x234.png", alt: "ADP — Trusted by over 40,000 small businesses across Canada." }, (ad: any) => (
                <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", border: "1px solid #E4E7EC", borderRadius: "8px", overflow: "hidden", background: "#fff" }} className="h_9f7643d">
                  <img src={ad.img} alt={ad.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                </a>
              ))}
              {" "}
            </div>
            {" "}
          </aside>
          {" "}
        </div>
        {" "}
        <section aria-labelledby="more-heading" style={{ borderTop: "1px solid #E4E7EC", background: "#F9FAFB" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 64px" }}>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", flexWrap: "wrap", marginBottom: "26px" }}>
              {" "}
              <h2 id="more-heading" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "28px", letterSpacing: "-0.01em", color: "#101828" }}>
                {v.moreHeading}
              </h2>
              {" "}
              <a href={u("#latest")} style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px", color: "#D71920" }}>
                View all →
              </a>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "24px" }}>
              {" "}
              {(v.morePosts || []).map((m: any, _i7: number) => (
                <Fragment key={m?.key ?? m?.id ?? m?.slug ?? _i7}>
                  {" "}
                  <article style={{ display: "flex", flexDirection: "column", gap: "12px", background: "#fff", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }}>
                    {" "}
                    <a href={u(m?.href)} style={{ display: "block", aspectRatio: "7/5", background: "#F4F6F8" }}>
                      <img src={m?.img} alt={m?.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </a>
                    {" "}
                    <div style={{ padding: "4px 18px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#D71920" }}>
                        {m?.cat}
                      </span>
                      {" "}
                      <h3 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "17px", lineHeight: "1.3", textWrap: "pretty" }}>
                        <a href={u(m?.href)} style={{ color: "#101828" }} className="h_1dd7993">
                          {m?.title}
                        </a>
                      </h3>
                      {" "}
                      <p style={{ fontSize: "14px", lineHeight: "1.55", color: "#475467" }}>
                        {m?.excerpt}
                      </p>
                      {" "}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "#667085", marginTop: "4px" }}>
                        {" "}
                        <span aria-hidden="true" style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#101828", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10px" }}>
                          {m?.initials}
                        </span>
                        {" "}
                        <span style={{ fontWeight: "600", color: "#344054" }}>
                          {m?.author}
                        </span>
                        <span>
                          {m?.meta}
                        </span>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </article>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
      </article>
    </>
  )
}
