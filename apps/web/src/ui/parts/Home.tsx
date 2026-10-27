'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Home() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.homeDisplay }}>
        <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: "0" }}>
          CanadianSME Small Business Magazine: news, funding, tax deadlines and tools for Canadian small business owners
        </h1>
        <section aria-roledescription="carousel" aria-label="Featured" onMouseEnter={v.pauseSlides} onMouseLeave={v.resumeSlides} onFocus={v.pauseSlides} onBlur={v.resumeSlides} style={{ background: "#101828", color: "#fff", position: "relative", overflow: "hidden" }}>
          {" "}
          <div style={{ display: "flex", transition: "transform .6s cubic-bezier(.4,0,.2,1)", transform: v.slideOffset }}>
            {" "}
            {(v.slides || []).map((sl: any, _i6: number) => (
              <Fragment key={sl?.key ?? sl?.id ?? sl?.slug ?? _i6}>
                {" "}
                <div role="group" aria-roledescription="slide" aria-hidden={sl?.hidden} style={{ flex: "0 0 100%", minWidth: "0", background: sl?.bg }}>
                  {" "}
                  <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 96px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "40px", alignItems: "center", minHeight: "600px" }}>
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "26px" }}>
                      {" "}
                      <img src={sl?.logo} alt={sl?.logoAlt} style={{ height: "44px", width: "auto", maxWidth: "280px", objectFit: "contain", display: "block" }} />
                      {" "}
                      <h2 style={{ display: "flex", flexDirection: "column", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,2.8vw,38px)", lineHeight: "1.18", letterSpacing: "-0.015em", color: "#fff" }}>
                        {" "}
                        {(sl?.lineItems || []).map((ln: any, _i12: number) => (
                          <Fragment key={ln?.key ?? ln?.id ?? ln?.slug ?? _i12}>
                            <span>
                              {ln?.t}
                            </span>
                          </Fragment>
                        ))}
                        {" "}
                      </h2>
                      {" "}
                      <span style={{ display: "block", width: "64px", height: "4px", background: "#D71920", borderRadius: "2px" }} />
                      {" "}
                      <a href={u(sl?.href)} target="_blank" rel="noopener" onClick={sl?.onRead} style={{ padding: "14px 28px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px", textDecoration: "none" }} className="h_23a71c2">
                        {sl?.cta}
                      </a>
                      {" "}
                    </div>
                    {" "}
                    <a href={u(sl?.href)} target="_blank" rel="noopener" onClick={sl?.onRead} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "480px" }}>
                      {" "}
                      <img src={sl?.img} alt={sl?.alt} style={{ maxHeight: "480px", maxWidth: "100%", width: "auto", height: "auto", objectFit: "contain", display: "block", borderRadius: "6px", boxShadow: "0 22px 48px rgba(0,0,0,0.45)" }} />
                      {" "}
                    </a>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </Fragment>
            ))}
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "28px", pointerEvents: "none" }}>
            {" "}
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              {" "}
              <div style={{ display: "flex", gap: "8px", pointerEvents: "auto" }}>
                {" "}
                {(v.slides || []).map((sl: any, _i8: number) => (
                  <Fragment key={sl?.key ?? sl?.id ?? sl?.slug ?? _i8}>
                    {" "}
                    <button type="button" onClick={sl?.go} aria-label={sl?.label} aria-current={sl?.active} style={{ width: sl?.dotW, height: "10px", borderRadius: "999px", border: "0", padding: "0", background: sl?.dotBg, cursor: "pointer", transition: "width .3s ease,background .3s ease" }} />
                    {" "}
                  </Fragment>
                ))}
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", gap: "10px", pointerEvents: "auto" }}>
                {" "}
                <button type="button" onClick={v.prevSlide} aria-label="Previous slide" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.35)", background: "rgba(16,24,40,0.6)", color: "#fff", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} className="h_1526cfa">
                  ‹
                </button>
                {" "}
                <button type="button" onClick={v.nextSlide} aria-label="Next slide" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.35)", background: "rgba(16,24,40,0.6)", color: "#fff", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} className="h_1526cfa">
                  ›
                </button>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section aria-label="Our partners" style={{ background: "#FFFFFF", borderBottom: "1px solid #E4E7EC", padding: "28px 0 32px" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto 14px", padding: "0 24px", display: "flex", alignItems: "center", gap: "16px" }}>
            {" "}
            <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470", whiteSpace: "nowrap" }}>
              Proudly supported by
            </span>
            {" "}
            <span style={{ flex: "1", height: "1px", background: "#E4E7EC" }} />
            {" "}
          </div>
          {" "}
          <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)" }}>
            {" "}
            <div style={{ display: "flex", width: "max-content", animation: "marquee 48s linear infinite" }} className="h_c0dc266">
              {(() => { const ps = v.partners || []; const n = ps.length; return [...ps, ...ps].map((pt: any, k: number) => (
                <div key={k} aria-hidden={k >= n ? "true" : undefined} style={{ flex: "0 0 auto", width: "180px", height: "84px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
                  <img src={pt.logo} alt={k < n ? pt.name : ""} loading="lazy" style={{ maxWidth: "100%", maxHeight: "72px", width: "auto", height: "auto", display: "block", objectFit: "contain" }} />
                </div>
              )) })()}
            </div>
            {" "}
          </div>
        </section>
        <section id="sponsored" aria-labelledby="sponsored-heading" style={{ background: "#24467A", color: "#fff", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "28px", flexWrap: "wrap", marginBottom: "36px" }}>
            {" "}
            <div style={{ maxWidth: "660px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {" "}
              <span style={{ alignSelf: "flex-start", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#0B1B33", background: "#F2C14E", padding: "5px 10px", borderRadius: "4px" }}>
                Sponsored Content
              </span>
              {" "}
              <h2 id="sponsored-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,2.8vw,36px)", lineHeight: "1.14", letterSpacing: "-0.015em", textWrap: "pretty" }}>
                Insights from our partners
              </h2>
              {" "}
              <p style={{ fontSize: "15.5px", lineHeight: "1.7", color: "#DCE4F0", textWrap: "pretty" }}>
                Paid content produced with organizations that serve Canadian small businesses. Clearly labelled and held to our editorial standards — our newsroom does not write sponsored articles.
              </p>
              {" "}
            </div>
            {" "}
            <a href={u("#advertise-with-us")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "8px", border: "1.5px solid rgba(255,255,255,0.45)", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "14px", whiteSpace: "nowrap" }} className="h_b9cd5ee">
              Partner with us →
            </a>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "24px", alignItems: "stretch" }}>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", borderRadius: "14px", overflow: "hidden", background: "#2E5590", border: "1px solid #46689E" }}>
              {" "}
              <a href={u("#post-duca-pfg-financial")} style={{ display: "block", aspectRatio: "7/5", background: "#1C3A68" }}>
                <img src="https://canadiansme.ca/wp-content/uploads/2026/10/11.jpg" alt="Faster Deals. Stronger Connections — DUCA and PFG Financial" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
              </a>
              {" "}
              <div style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "12px", flex: "1" }}>
                {" "}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "9.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#0B1B33", background: "#F2C14E", padding: "4px 8px", borderRadius: "3px" }}>
                    Sponsored
                  </span>
                  <span style={{ fontSize: "12.5px", color: "#DCE4F0" }}>
                    Paid for by{" "}
                    <strong style={{ color: "#fff", fontWeight: "600" }}>
                      DUCA Financial Services Credit Union Ltd.
                    </strong>
                  </span>
                </div>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "clamp(20px,2vw,25px)", lineHeight: "1.22", letterSpacing: "-0.01em", textWrap: "pretty" }}>
                  <a href={u("#post-duca-pfg-financial")} style={{ color: "#fff" }} className="h_fccb1e3">
                    Faster Deals. Stronger Connections: How DUCA and PFG Financial Are Raising the Bar for Consultant and Accountant Partnerships
                  </a>
                </h3>
                {" "}
                <p style={{ fontSize: "15px", lineHeight: "1.65", color: "#DCE4F0", textWrap: "pretty" }}>
                  Unsecured business loans and lines of credit from $5,000 to $250,000, quick decisions and direct access to decision-makers for Ontario businesses.
                </p>
                {" "}
                <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid #46689E", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  {" "}
                  <span style={{ fontSize: "12.5px", color: "#C9D4E5" }}>
                    October 9, 2026 · 3 min read
                  </span>
                  {" "}
                  <a href={u("#post-duca-pfg-financial")} style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13.5px", color: "#7FA3E8" }}>
                    Read the story →
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "minmax(0,44%) minmax(0,1fr)", gap: "18px", alignItems: "start", padding: "18px", borderRadius: "12px", background: "#2E5590", border: "1px solid #46689E", transition: "background .18s ease" }} className="h_ab5d001">
                {" "}
                <a href={u("#post-beyond-the-tariff-rate")} style={{ display: "block", aspectRatio: "7/5", borderRadius: "8px", overflow: "hidden", background: "#1C3A68" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/10/4.jpg" alt="Beyond the Tariff Rate — UPS trade webinar for Canadian importers" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "9.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#0B1B33", background: "#F2C14E", padding: "4px 8px", borderRadius: "3px" }}>
                      Sponsored
                    </span>
                  </div>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                    <a href={u("#post-beyond-the-tariff-rate")} style={{ color: "#fff" }} className="h_fccb1e3">
                      Beyond the Tariff Rate: What Canadian Importers Need to Know as U.S.–Canada Trade Rules Shift
                    </a>
                  </h3>
                  {" "}
                  <span style={{ fontSize: "12.5px", color: "#DCE4F0" }}>
                    Paid for by{" "}
                    <strong style={{ color: "#fff", fontWeight: "600" }}>
                      UPS
                    </strong>
                  </span>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#C9D4E5" }}>
                    October 9, 2026 · 5 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "minmax(0,44%) minmax(0,1fr)", gap: "18px", alignItems: "start", padding: "18px", borderRadius: "12px", background: "#2E5590", border: "1px solid #46689E", transition: "background .18s ease" }} className="h_ab5d001">
                {" "}
                <a href="https://canadiansme.ca/how-to-implement-sustainable-practices-in-your-small-business/" style={{ display: "block", aspectRatio: "7/5", borderRadius: "8px", overflow: "hidden", background: "#1C3A68" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2023/09/December-2022-feature-images-8-1.jpg" alt="How to Implement Sustainable Practices in Your Small Business" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "9.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#0B1B33", background: "#F2C14E", padding: "4px 8px", borderRadius: "3px" }}>
                      Sponsored
                    </span>
                  </div>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                    <a href="https://canadiansme.ca/how-to-implement-sustainable-practices-in-your-small-business/" style={{ color: "#fff" }} className="h_fccb1e3">
                      How to Implement Sustainable Practices in Your Small Business
                    </a>
                  </h3>
                  {" "}
                  <span style={{ fontSize: "12.5px", color: "#DCE4F0" }}>
                    Presented by{" "}
                    <strong style={{ color: "#fff", fontWeight: "600" }}>
                      CanadianSME
                    </strong>
                  </span>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#C9D4E5" }}>
                    September 7, 2023 · 4 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <p style={{ fontSize: "12.5px", lineHeight: "1.6", color: "#C9D4E5", padding: "0 4px" }}>
                Sponsors do not review or approve CanadianSME editorial coverage.{" "}
                <a href={u("#advertise-with-us")} style={{ color: "#fff", textDecoration: "underline" }}>
                  How sponsored content works
                </a>
              </p>
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="this-week" aria-labelledby="week-heading" style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "26px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "0", alignItems: "stretch" }}>
            {" "}
            <div style={{ padding: "6px 24px 6px 0", display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px" }}>
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#7FA3E8" }}>
                This week
              </span>
              {" "}
              <h2 id="week-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.2", color: "#fff", textWrap: "pretty" }}>
                For your business
              </h2>
              {" "}
            </div>
            {" "}
            <a href={u("#deadlines")} style={{ padding: "6px 24px", borderLeft: "1px solid rgba(255,255,255,0.16)", display: "flex", flexDirection: "column", gap: "6px", color: "#fff" }} className="h_7fdd8e4">
              {" "}
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#D0D5DD" }}>
                Next CRA deadline · {v.nextDeadline?.days}
              </span>
              {" "}
              <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "1" }}>
                {v.nextDeadline?.date}
              </span>
              {" "}
              <span style={{ fontSize: "13.5px", lineHeight: "1.45", color: "#fff" }}>
                {v.nextDeadline?.title}
              </span>
              {" "}
            </a>
            {" "}
            <a href="/tools/gst/" style={{ padding: "6px 24px", borderLeft: "1px solid rgba(255,255,255,0.16)", display: "flex", flexDirection: "column", gap: "6px", color: "#fff" }} className="h_7fdd8e4">
              {" "}
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#D0D5DD" }}>
                Free tool
              </span>
              {" "}
              <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "20px", lineHeight: "1.15" }}>
                GST/HST Calculator
              </span>
              {" "}
              <span style={{ fontSize: "13.5px", lineHeight: "1.45", color: "#fff" }}>
                Rates for every province and territory →
              </span>
              {" "}
            </a>
            {" "}
            <a href={u("#funding-finder")} style={{ padding: "6px 24px", borderLeft: "1px solid rgba(255,255,255,0.16)", display: "flex", flexDirection: "column", gap: "6px", color: "#fff" }} className="h_7fdd8e4">
              {" "}
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#D0D5DD" }}>
                Grants &amp; programs
              </span>
              {" "}
              <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "20px", lineHeight: "1.15" }}>
                Find funding in your province
              </span>
              {" "}
              <span style={{ fontSize: "13.5px", lineHeight: "1.45", color: "#fff" }}>
                Federal and provincial programs →
              </span>
              {" "}
            </a>
            {" "}
            <a href={u("#newsletter-form")} style={{ padding: "6px 0 6px 24px", borderLeft: "1px solid rgba(255,255,255,0.16)", display: "flex", flexDirection: "column", gap: "6px", color: "#fff" }} className="h_7fdd8e4">
              {" "}
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#D0D5DD" }}>
                Every Tuesday
              </span>
              {" "}
              <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "20px", lineHeight: "1.15" }}>
                Deadlines &amp; grants in your inbox
              </span>
              {" "}
              <span style={{ fontSize: "13.5px", lineHeight: "1.45", color: "#fff" }}>
                Subscribe free →
              </span>
              {" "}
            </a>
            {" "}
          </div>
        </section>
        <section id="latest" aria-labelledby="latest-heading" style={{ background: "transparent", padding: "64px max(24px,calc((100% - 1232px) / 2)) 64px" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "32px", flexWrap: "wrap", marginBottom: "26px" }}>
            {" "}
            <div style={{ maxWidth: "620px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
                Editorial
              </span>
              {" "}
              <h2 id="latest-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.12", letterSpacing: "-0.015em", marginBottom: "12px" }}>
                Latest Business Insights
              </h2>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.65", color: "#5A6470", textWrap: "pretty" }}>
                Stay informed with timely perspectives, actionable advice, and inspiring stories created for Canada’s small business community.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "270px" }}>
              {" "}
              <label htmlFor="article-search" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#5A6470" }}>
                Search articles
              </label>
              {" "}
              <input id="article-search" type="search" ref={v.searchRef} onInput={v.onSearch} placeholder="e.g. cash flow, AI, CRM" style={{ padding: "11px 14px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "14px", background: "#fff", width: "100%" }} />
              {" "}
              <span aria-live="polite" style={{ fontSize: "12.5px", color: "#5A6470" }}>
                {v.resultLabel}
              </span>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: "40px", alignItems: "start" }}>
            {" "}
            <div ref={v.gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "26px" }}>
              {" "}
              {(v.latest || []).map((a: any, _i7: number) => (
                <Fragment key={a?.key ?? a?.id ?? a?.slug ?? _i7}>
                  {" "}
                  <article style={{ display: "flex", flexDirection: "column", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff", transition: "box-shadow .18s ease,transform .18s ease" }} className="h_03853ff">
                    {" "}
                    {a?.sample ? (
                      <>
                        <div style={{ display: "block", height: "180px", background: "#F4F6F8" }}>
                          <Slot id={a?.slot} shape="rect" placeholder="Drop article image" />
                        </div>
                      </>
                    ) : null}
                    {a?.img ? (
                      <>
                        <a href={u(a?.href)} style={{ display: "block", height: "180px", background: "#F4F6F8" }}>
                          <img src={a?.img} alt={a?.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </a>
                      </>
                    ) : null}
                    {" "}
                    <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                        {" "}
                        <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                          {a?.cat}
                        </span>
                        {" "}
                        <button type="button" onClick={v.toggleBookmark} aria-pressed="false" aria-label="Bookmark this article" style={{ background: "none", border: "0", cursor: "pointer", color: "#5A6470", fontSize: "15px", lineHeight: "1", padding: "2px" }}>
                          ♡
                        </button>
                        {" "}
                      </div>
                      {" "}
                      <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "20px", lineHeight: "1.24", textWrap: "pretty" }}>
                        <a href={u(a?.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                          {a?.title}
                        </a>
                      </h3>
                      {" "}
                      <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#5A6470" }}>
                        {a?.excerpt}
                      </p>
                      {" "}
                      <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #F0F2F5", fontSize: "12px", color: "#5A6470", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <span>
                          {a?.date}
                        </span>
                        <span>
                          ·
                        </span>
                        <span>
                          {a?.byline}
                        </span>
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
            <aside aria-label="Sidebar" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                  Advertisement
                </span>
                {" "}
                {v.ad("home-sidebar-1", { href: "https://www.wsib.ca", img: "/assets/ads/wsib-300x250.png", alt: "WSIB Ontario — Visit wsib.ca to make your workplace safer" }, (ad: any) => (
                  <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", border: "1px solid #E4E7EC", borderRadius: "8px", overflow: "hidden", background: "#fff" }} className="h_9f7643d">
                    <img src={ad.img} alt={ad.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                  </a>
                ))}
                {" "}
              </div>
              {" "}
              <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "18px" }}>
                {" "}
                <span style={{ display: "inline-block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", border: "1px solid #E8D79B", background: "#FDF8EC", padding: "3px 7px", borderRadius: "4px", marginBottom: "12px" }}>
                  Sponsored Content
                </span>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "18px", lineHeight: "1.28", marginBottom: "8px" }}>
                  <a href={u(v.sidebarSponsored?.href || "#sponsored")} style={{ color: "#14181D" }} className="h_9e87cbe">
                    {v.sidebarSponsored?.title || "How Payment Automation Freed Up 12 Hours a Week"}
                  </a>
                </h3>
                {" "}
                <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  {v.sidebarSponsored?.desc || "Paid content presented by a CanadianSME financial partner."}
                </p>
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                  Advertisement
                </span>
                {" "}
                {v.ad("home-sidebar-2", { href: "https://www.adp.ca", img: "/assets/ads/adp-300x234.png", alt: "ADP — Trusted by over 40,000 small businesses across Canada. Preferred HR and payroll partner of CanadianSME." }, (ad: any) => (
                  <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", border: "1px solid #E4E7EC", borderRadius: "8px", overflow: "hidden", background: "#fff" }} className="h_9f7643d">
                    <img src={ad.img} alt={ad.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                  </a>
                ))}
                {" "}
              </div>
              {" "}
              <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "18px" }}>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13px", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "14px" }}>
                  Most Read
                </h3>
                {" "}
                <ol style={{ display: "flex", flexDirection: "column", gap: "14px", counterReset: "mr", margin: "0", padding: "0", listStyle: "none" }}>
                  {" "}
                  {(v.mostRead || []).map((m: any, _i9: number) => (
                    <Fragment key={m?.key ?? m?.id ?? m?.slug ?? _i9}>
                      {" "}
                      <li style={{ display: "flex", gap: "12px" }}>
                        <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "18px", color: "#E4E7EC" }}>
                          0{m?.n}
                        </span>
                        <a href={u(m?.href)} style={{ fontSize: "14px", lineHeight: "1.45", color: "#14181D" }} className="h_9e87cbe">
                          {m?.title}
                        </a>
                      </li>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </ol>
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                  Advertisement
                </span>
                {" "}
                {v.ad("home-sidebar-3", { href: "https://www.ups.com/ca", img: "/assets/ads/ups-300x600.png", alt: "UPS — Turn challenges into opportunities. Start with 55% savings on UPS Small Package Shipping." }, (ad: any) => (
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
          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            {" "}
            <a href={u("#all-articles")} style={{ padding: "14px 26px", borderRadius: "8px", border: "1.5px solid #101828", color: "#14181D", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_a3b515a">
              View All Articles
            </a>
            {" "}
          </div>
        </section>
        <section aria-label="Subscribe to the magazine" style={{ background: "#FFFFFF", padding: "40px max(24px,calc((100% - 1232px) / 2))" }}>
          {" "}
          {v.ad("home-subscribe-banner", { href: u("#newsletter-form"), img: "/assets/subscribe-banner.png", alt: "Business insights. A stronger tomorrow. Subscribe to CanadianSME Small Business Magazine — expert advice and entrepreneur stories, delivered monthly." }, (ad: any) => (
            <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", borderRadius: "12px", overflow: "hidden", boxShadow: "0 14px 34px rgba(16,24,40,0.18)" }} className="h_f41d2d0">
              <img src={ad.img} alt={ad.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
            </a>
          ))}
        </section>
        <section id="ai-coverage" aria-labelledby="ai-heading" style={{ background: "#EEF2F8", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "28px", flexWrap: "wrap", paddingBottom: "14px", marginBottom: "28px", borderBottom: "2px solid #101828" }}>
            {" "}
            <div style={{ maxWidth: "640px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
                Topic
              </span>
              {" "}
              <h2 id="ai-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", textWrap: "pretty" }}>
                Artificial Intelligence
              </h2>
              {" "}
            </div>
            {" "}
            <a href="https://canadiansme.ca/category/artificial-intelligence/" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#002364" }}>
              All AI coverage →
            </a>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "32px", alignItems: "start" }}>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {" "}
              <a href={u(v.aiLead?.href)} style={{ display: "block", aspectRatio: "16/10", borderRadius: "10px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                <img src={v.aiLead?.img} alt={v.aiLead?.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "clamp(22px,2.4vw,29px)", lineHeight: "1.18", letterSpacing: "-0.01em", textWrap: "pretty" }}>
                <a href={u(v.aiLead?.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                  {v.aiLead?.title}
                </a>
              </h3>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.68", color: "#5A6470", textWrap: "pretty" }}>
                {v.aiLead?.excerpt}
              </p>
              {" "}
              <span style={{ fontSize: "12.5px", color: "#5A6470" }}>
                {v.aiLead?.date} · {v.aiLead?.read} read
              </span>
              {" "}
            </article>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {" "}
              {(v.aiMore || []).map((m: any, _i7: number) => (
                <Fragment key={m?.key ?? m?.id ?? m?.slug ?? _i7}>
                  {" "}
                  <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                    {" "}
                    <a href={u(m?.href)} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                      <img src={m?.img} alt={m?.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </a>
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {" "}
                      <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                        <a href={u(m?.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                          {m?.title}
                        </a>
                      </h3>
                      {" "}
                      <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                        {m?.excerpt}
                      </p>
                      {" "}
                      <span style={{ fontSize: "12px", color: "#5A6470" }}>
                        {m?.date} · {m?.read} read
                      </span>
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
        </section>
        <section id="expert-insights" aria-labelledby="expert-heading" style={{ background: "#FFFFFF", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "28px", flexWrap: "wrap", paddingBottom: "14px", marginBottom: "28px", borderBottom: "2px solid #101828" }}>
            {" "}
            <div style={{ maxWidth: "640px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
                Interviews
              </span>
              {" "}
              <h2 id="expert-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", textWrap: "pretty" }}>
                Expert Insights
              </h2>
              {" "}
            </div>
            {" "}
            <a href="https://canadiansme.ca/category/email-interview/" target="_blank" rel="noopener" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#002364" }}>
              All interviews →
            </a>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "32px", alignItems: "start" }}>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {" "}
              <a href={u("#post-building-high-trust-teams-through-emotional-intelligence")} style={{ display: "block", aspectRatio: "16/10", borderRadius: "10px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                <img src="https://canadiansme.ca/wp-content/uploads/2026/10/Renata-Reis.jpg" alt="Building High‑Trust Teams Through Emotional Intelligence" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "clamp(22px,2.4vw,29px)", lineHeight: "1.18", letterSpacing: "-0.01em", textWrap: "pretty" }}>
                <a href={u("#post-building-high-trust-teams-through-emotional-intelligence")} style={{ color: "#14181D" }} className="h_9e87cbe">
                  Building High‑Trust Teams Through Emotional Intelligence
                </a>
              </h3>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.68", color: "#5A6470", textWrap: "pretty" }}>
                Nadine Zeinoun Khoury on how emotional intelligence, trust and authentic leadership can transform workplaces and strengthen teams.
              </p>
              {" "}
              <span style={{ fontSize: "12.5px", color: "#5A6470" }}>
                Oct 9, 2026 · 6 min read
              </span>
              {" "}
            </article>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                {" "}
                <a href={u("#post-making-cross-border-money-work-harder-for-canadian-smes")} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/10/Jackee-Wong.jpg" alt="Making Cross-Border Money Work Harder for Canadian SMEs" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                    <a href={u("#post-making-cross-border-money-work-harder-for-canadian-smes")} style={{ color: "#14181D" }} className="h_9e87cbe">
                      Making Cross-Border Money Work Harder for Canadian SMEs
                    </a>
                  </h3>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    Jackee Wong, Fractional CMO at Keytom, on why payment speed, transparency and predictability matter for SMEs working across markets.
                  </p>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    Oct 9, 2026 · 5 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                {" "}
                <a href={u("#post-the-it-questions-every-business-owner-should-ask")} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/08/Shawn-Bedard-3.jpg" alt="The IT Questions Every Business Owner Should Ask" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                    <a href={u("#post-the-it-questions-every-business-owner-should-ask")} style={{ color: "#14181D" }} className="h_9e87cbe">
                      The IT Questions Every Business Owner Should Ask
                    </a>
                  </h3>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    In this exclusive CanadianSME Small Business Magazine interview, Shawn Bedard, President &amp; Founder of JIG Technologies, shares insights…
                  </p>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    Aug 19, 2026 · 6 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                {" "}
                <a href={u("#post-why-human-communication-matters-more-in-the-ai-era")} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/08/Steve-Brennan.jpg" alt="Why Human Communication Matters More in the AI Era" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                    <a href={u("#post-why-human-communication-matters-more-in-the-ai-era")} style={{ color: "#14181D" }} className="h_9e87cbe">
                      Why Human Communication Matters More in the AI Era
                    </a>
                  </h3>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    In this exclusive CanadianSME Small Business Magazine interview, Steve Brennan, Co-Founder &amp; General Manager of Stand Up and…
                  </p>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    Aug 19, 2026 · 6 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                {" "}
                <a href={u("#post-business-woman-of-the-month-nouhaila-chelkhaoui")} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/08/Business-Woman-of-the-Month-1.jpg" alt="Smiling woman with long dark hair on a white background. Text reads: Business Woman of the Month, Nouhaila Chelkhaoui, Founder and CEO of Scale Without Borders, and CanadianSME at the bottom." loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                    <a href={u("#post-business-woman-of-the-month-nouhaila-chelkhaoui")} style={{ color: "#14181D" }} className="h_9e87cbe">
                      Business Woman of the Month : Nouhaila Chelkhaoui
                    </a>
                  </h3>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    Scaling Opportunity for Immigrant Tech Talent in Canada with Nouhaila Chelkhaoui Nouhaila Chelkhaoui, who came to Canada alone…
                  </p>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    Aug 5, 2026 · 4 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="small-business" aria-labelledby="sb-heading" style={{ background: "#F4F6F8", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "28px", flexWrap: "wrap", paddingBottom: "14px", marginBottom: "28px", borderBottom: "2px solid #101828" }}>
            {" "}
            <div style={{ maxWidth: "640px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
                Topic
              </span>
              {" "}
              <h2 id="sb-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", textWrap: "pretty" }}>
                Small Business
              </h2>
              {" "}
            </div>
            {" "}
            <a href="https://canadiansme.ca/category/small-business/" target="_blank" rel="noopener" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#002364" }}>
              All small business →
            </a>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "32px", alignItems: "start" }}>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {" "}
              <a href={u("#post-what-happens-to-institutional-knowledge-when-that-employee-leaves")} style={{ display: "block", aspectRatio: "16/10", borderRadius: "10px", overflow: "hidden", background: "#FFFFFF", border: "1px solid #E4E7EC" }}>
                <img src="https://canadiansme.ca/wp-content/uploads/2026/10/Rob-Nikkel.jpg-1.jpeg" alt="What Happens to Institutional Knowledge When “That” Employee Leaves" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "clamp(22px,2.4vw,29px)", lineHeight: "1.18", letterSpacing: "-0.01em", textWrap: "pretty" }}>
                <a href={u("#post-what-happens-to-institutional-knowledge-when-that-employee-leaves")} style={{ color: "#14181D" }} className="h_9e87cbe">
                  What Happens to Institutional Knowledge When “That” Employee Leaves
                </a>
              </h3>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.68", color: "#5A6470", textWrap: "pretty" }}>
                Institutional knowledge shouldn’t live in one person’s head. Why “Ask Jim” isn’t a strategy.
              </p>
              {" "}
              <span style={{ fontSize: "12.5px", color: "#5A6470" }}>
                Oct 19, 2026 · 3 min read
              </span>
              {" "}
            </article>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                {" "}
                <a href={u("#post-top-5-business-internet-providers-for-small-businesses-in-canada")} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/10/ZENATH-Daily-Posting-Article-Feature-Images.jpg" alt="Top 5 Business Internet Providers for Small Businesses in Canada" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                    <a href={u("#post-top-5-business-internet-providers-for-small-businesses-in-canada")} style={{ color: "#14181D" }} className="h_9e87cbe">
                      Top 5 Business Internet Providers for Small Businesses in Canada
                    </a>
                  </h3>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    The internet has quietly become a small business’s most important piece of infrastructure. Five Canadian carriers, from Vancouver to Halifax, keeping small companies running.
                  </p>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    Oct 16, 2026 · 7 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                {" "}
                <a href={u("#post-building-a-small-business-foundation-today-for-growth-tomorrow")} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/10/Expanding-Trade-Networks-40.jpg" alt="Building a Small Business Foundation Today for Growth Tomorrow" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                    <a href={u("#post-building-a-small-business-foundation-today-for-growth-tomorrow")} style={{ color: "#14181D" }} className="h_9e87cbe">
                      Building a Small Business Foundation Today for Growth Tomorrow
                    </a>
                  </h3>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    Anthony Chiotis of ADP Canada on payroll foundations, investing in people and building a trusted partner network.
                  </p>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    Oct 15, 2026 · 3 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                {" "}
                <a href={u("#post-magnet-at-toronto-metropolitan-university")} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/10/Expanding-Trade-Networks-39.jpg" alt="Magnet at Toronto Metropolitan University" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                    <a href={u("#post-magnet-at-toronto-metropolitan-university")} style={{ color: "#14181D" }} className="h_9e87cbe">
                      Magnet at Toronto Metropolitan University
                    </a>
                  </h3>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    Shaping the future of work with practical solutions for small businesses — wage subsidies, AI upskilling and more.
                  </p>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    Oct 15, 2026 · 2 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
              <article style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: "18px", alignItems: "start" }}>
                {" "}
                <a href={u("#post-ingaged-creative-productions-growing-through-creativity-connection-and-community")} style={{ display: "block", aspectRatio: "4/3", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                  <img src="https://canadiansme.ca/wp-content/uploads/2026/10/Expanding-Trade-Networks-37.jpg" alt="Ingaged Creative Productions: Growing Through Creativity, Connection, and Community" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.28", textWrap: "pretty" }}>
                    <a href={u("#post-ingaged-creative-productions-growing-through-creativity-connection-and-community")} style={{ color: "#14181D" }} className="h_9e87cbe">
                      Ingaged Creative Productions: Growing Through Creativity, Connection, and Community
                    </a>
                  </h3>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    An Indigenous-owned company bringing creative services and event production together, while building opportunities for clients, artists and a growing team.
                  </p>
                  {" "}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    Oct 13, 2026 · 3 min read
                  </span>
                  {" "}
                </div>
                {" "}
              </article>
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="offers" aria-labelledby="offers-heading" style={{ background: "#FDF2F2", padding: "72px max(24px,calc((100% - 1232px) / 2))", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap", marginBottom: "28px" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "640px" }}>
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                Reader perks
              </span>
              {" "}
              <h2 id="offers-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", textWrap: "pretty" }}>
                Exclusive Offers for CanadianSME Readers
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                Savings on the tools and services Canadian small businesses use every day, negotiated with our partners. Free for newsletter subscribers.
              </p>
              {" "}
            </div>
            {" "}
            <div role="tablist" aria-label="Filter offers" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {" "}
              {(v.offerCats || []).map((c: any, _i7: number) => (
                <Fragment key={c?.key ?? c?.id ?? c?.slug ?? _i7}>
                  {" "}
                  <button type="button" role="tab" aria-selected={c?.active} onClick={c?.onClick} style={{ padding: "8px 14px", borderRadius: "999px", border: `1.5px solid ${c?.border ?? ""}`, background: c?.bg, color: c?.fg, fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
                    {c?.label}
                  </button>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: "18px" }}>
            {" "}
            {(v.offers || []).map((o: any, _i6: number) => (
              <Fragment key={o?.key ?? o?.id ?? o?.slug ?? _i6}>
                {" "}
                <article style={{ display: "flex", flexDirection: "column", background: "#fff", border: "1px solid #F2D4D7", borderRadius: "12px", overflow: "hidden" }} className="h_881e8fa">
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "18px 20px", borderBottom: "1px solid #F2F4F7" }}>
                    {" "}
                    <div style={{ width: "120px", height: "44px" }}>
                      <Slot id={o?.slot} shape="rect" placeholder="Partner logo" />
                    </div>
                    {" "}
                    <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                      {o?.cat}
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                    {" "}
                    <span style={{ alignSelf: "flex-start", padding: "5px 10px", borderRadius: "6px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px" }}>
                      {o?.value}
                    </span>
                    {" "}
                    <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17px", lineHeight: "1.3", color: "#14181D", textWrap: "pretty" }}>
                      {o?.title}
                    </h3>
                    {" "}
                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#475467", flex: "1", textWrap: "pretty" }}>
                      {o?.desc}
                    </p>
                    {" "}
                    <span style={{ fontSize: "12.5px", color: "#5A6470" }}>
                      {o?.partner} · {o?.expires}
                    </span>
                    {" "}
                    <button type="button" onClick={o?.claim} style={{ marginTop: "6px", padding: "12px", borderRadius: "8px", border: "0", background: "#101828", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer" }} className="h_cc7d4fa">
                      Claim offer
                    </button>
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
          <a href={u("#exclusive-offers")} style={{ display: "inline-flex", marginTop: "24px", padding: "12px 20px", borderRadius: "8px", background: "#101828", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_0744446">
            See all exclusive offers →
          </a>
          {" "}
          <p style={{ marginTop: "18px", fontSize: "12.5px", lineHeight: "1.6", color: "#5A6470" }}>
            Offers are provided by our partners and subject to their terms. CanadianSME may receive a commission.{" "}
            <a href={u("#become-partner")} style={{ color: "#004FB8", textDecoration: "underline" }}>
              List an offer for our readers →
            </a>
          </p>
        </section>
        <section aria-label="Sponsor banners" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "36px 24px" }}>
            {" "}
            <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470", marginBottom: "14px" }}>
              Advertisement
            </span>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(420px,1fr))", gap: "22px" }}>
              {" "}
              {v.ad("home-banner-1", { href: "https://www.ups.com/ca", img: "/assets/sponsor-ups.png", alt: "UPS — Turn challenges into opportunities. Start with 55% savings on UPS Small Package Shipping." }, (ad: any) => (
                <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", aspectRatio: "2500/750", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }} className="h_9f7643d">
                  <img loading="lazy" decoding="async" src={ad.img} alt={ad.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
              ))}
              {" "}
              {v.ad("home-banner-2", { href: "https://www.aircanada.com/ca/en/aco/home/fly/business-travel.html", img: "/assets/sponsor-air-canada.png", alt: "Air Canada pour entreprise — Voyages d’affaires futés : ça commence ici." }, (ad: any) => (
                <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", aspectRatio: "2500/750", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }} className="h_9f7643d">
                  <img loading="lazy" decoding="async" src={ad.img} alt={ad.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </a>
              ))}
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="magazine" aria-labelledby="mag-heading" style={{ position: "relative", overflow: "hidden", color: "#fff", background: "radial-gradient(900px 520px at 100% 0%,rgba(122,31,43,0.55),rgba(16,24,40,0) 70%),radial-gradient(700px 500px at 0% 100%,rgba(30,58,110,0.35),rgba(16,24,40,0) 70%),#0E1525" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "44px 24px 56px" }}>
            {" "}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "44px" }}>
              {" "}
              <a href={u(v.latestIssue?.href || "#read-magazine")} aria-label="Read the latest issue" style={{ flex: "0 0 auto", width: "min(240px,62vw)", aspectRatio: "3/4", border: "1.5px solid rgba(255,255,255,0.85)", borderRadius: "4px", overflow: "hidden", boxShadow: "0 24px 50px rgba(0,0,0,0.5)", display: "block", background: "#1D2939" }} className="h_aa15b40">
                {" "}
                {v.latestIssue?.cover ? (
                  <img src={v.latestIssue.cover} alt={v.latestIssue.coverAlt || `CanadianSME Issue ${v.latestIssue.number}, ${v.latestIssue.month} cover`} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <img src="/assets/covers/issue-93-aug-2026.png" alt="CanadianSME Issue 93, August 2026 cover" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
                {" "}
              </a>
              {" "}
              <div style={{ flex: "1 1 360px", minWidth: "0" }}>
                {" "}
                <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 12px", borderRadius: "999px", background: "rgba(215,25,32,0.16)", border: "1px solid rgba(215,25,32,0.28)", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13px", color: "#7FA3E8", marginBottom: "16px" }}>
                  <span aria-hidden="true" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F4A3A6" }} />
                  {v.latestIssue?.month || 'August 2026'}
                </span>
                {" "}
                <h2 id="mag-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(36px,4.6vw,56px)", lineHeight: "1.05", letterSpacing: "-0.015em", marginBottom: "14px" }}>
                  The magazine
                </h2>
                {" "}
                <p style={{ fontSize: "17px", lineHeight: "1.6", color: "#D0D5DD", maxWidth: "54ch", textWrap: "pretty", marginBottom: "24px" }}>
                  CanadianSME Small Business Magazine is free to read every month: interviews, research and practical advice for Canada’s SMEs.
                </p>
                {" "}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {" "}
                  <a href={u(v.latestIssue?.href || "#read-magazine")} style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "13px 22px", borderRadius: "999px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_900112d">
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0" }}>
                      <path d="M3 5.5C5.5 4.3 8.5 4.3 12 6c3.5-1.7 6.5-1.7 9-.5V19c-2.5-1.2-5.5-1.2-9 .5-3.5-1.7-6.5-1.7-9-.5z M12 6v13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                    Read the latest issue
                  </a>
                  {" "}
                  <a href={u("#newsletter")} style={{ display: "inline-flex", alignItems: "center", padding: "13px 22px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.45)", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_28723ae">
                    Subscribe free
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <ul aria-label="Past issues" style={{ listStyle: "none", margin: "44px 0 0", padding: "0", display: "flex", flexWrap: "wrap", gap: "18px" }}>
              {" "}
              {(v.issues || []).slice(1, 7).map((i: any, _i: number) => (
                <Fragment key={i?.slug ?? i?.number ?? _i}>
                  {" "}
                  <li style={{ width: "120px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    {" "}
                    <a href={u(i?.href || "#past-issues")} style={{ display: "block", width: "120px", aspectRatio: "3/4", border: "1px solid rgba(255,255,255,0.75)", borderRadius: "3px", overflow: "hidden", background: "#1D2939", boxShadow: "0 10px 24px rgba(0,0,0,0.35)" }} className="h_37595ef">
                      {i?.cover ? <img src={i.cover} alt={i?.coverAlt || `CanadianSME Issue ${i?.number}, ${i?.month} cover`} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : null}
                    </a>
                    {" "}
                    <span style={{ fontSize: "13px", lineHeight: "1.4", color: "#C8CDD6", textAlign: "center" }}>
                      {i?.month}
                    </span>
                    {" "}
                  </li>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </ul>
            {" "}
          </div>
        </section>
        <section id="topics" aria-labelledby="topics-heading" style={{ background: "#FFFFFF", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "640px", marginBottom: "36px" }}>
              {" "}
              <h2 id="topics-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.6vw,46px)", lineHeight: "1.08", letterSpacing: "-0.015em", color: "#14181D", textWrap: "pretty" }}>
                Explore by topic
              </h2>
              {" "}
              <p style={{ fontSize: "17px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                Pick a subject and dive in: every topic is packed with interviews, guides and stories from Canadian small business.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: "24px" }}>
              {" "}
              {(v.topicCards || []).map((t: any, _i7: number) => (
                <Fragment key={t?.key ?? t?.id ?? t?.slug ?? _i7}>
                  {" "}
                  <article style={{ display: "flex", flexDirection: "column", borderRadius: "20px", border: `1px solid ${t?.line ?? ""}`, background: `linear-gradient(180deg,${t?.tint ?? ""} 0%,#FFFFFF 75%)`, padding: "10px 10px 22px", transition: "box-shadow .2s ease,transform .2s ease" }} className="h_691afa4">
                    {" "}
                    <a href={u(t?.href)} aria-label={`Explore ${t?.name ?? ""}`} style={{ position: "relative", display: "block", aspectRatio: "16/9", borderRadius: "14px", overflow: "hidden", background: "#F4F6F8" }}>
                      {" "}
                      <img src={t?.img} alt={t?.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      {" "}
                      <span aria-hidden="true" style={{ position: "absolute", top: "12px", right: "12px", width: "34px", height: "34px", borderRadius: "50%", background: "#FFFFFF", color: t?.ink, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700", boxShadow: "0 2px 8px rgba(16,24,40,0.12)" }}>
                        ↗
                      </span>
                      {" "}
                    </a>
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px 8px 0", flex: "1", minWidth: "0" }}>
                      {" "}
                      <span style={{ alignSelf: "flex-start", padding: "4px 10px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(16,24,40,0.08)", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: t?.ink }}>
                        {t?.countLabel}
                      </span>
                      {" "}
                      <a href={u(t?.href)} title={t?.name} style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(18px,1.6vw,21px)", lineHeight: "1.2", letterSpacing: "-0.015em", color: "#14181D", whiteSpace: "nowrap" }} className="h_a42e9e3">
                        {t?.name}
                      </a>
                      {" "}
                      <p style={{ fontSize: "15px", lineHeight: "1.55", color: "#475467", height: "46.5px", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {t?.desc}
                      </p>
                      {" "}
                      <div style={{ borderTop: `1px dashed ${t?.line ?? ""}`, marginTop: "auto", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {" "}
                        <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: t?.ink }}>
                          Latest
                        </span>
                        {" "}
                        <a href={u(t?.latestHref)} title={t?.latestTitle} style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15px", lineHeight: "1.4", height: "42px", color: "#14181D", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden", "--h0": t?.ink }} className="h_184f6d5">
                          {t?.latestTitle}
                        </a>
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
        </section>
        <section aria-label="Advertise with CanadianSME" style={{ background: "#FFFFFF", padding: "40px max(24px,calc((100% - 1232px) / 2))" }}>
          {" "}
          {v.ad("home-advertise-banner", { href: u("#advertise-with-us"), img: "/assets/advertise-banner.png", alt: "Put your brand in front of Canadian business leaders. Advertise with CanadianSME across magazine, digital, podcasts and events." }, (ad: any) => (
            <a href={u(ad.href)} target={ad.href?.startsWith("http") ? "_blank" : undefined} rel={ad.href?.startsWith("http") ? "sponsored noopener" : undefined} style={{ display: "block", borderRadius: "12px", overflow: "hidden", boxShadow: "0 14px 34px rgba(16,24,40,0.18)" }} className="h_f41d2d0">
              <img src={ad.img} alt={ad.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
            </a>
          ))}
        </section>
        <section id="spotlight" aria-labelledby="spot-heading" style={{ background: "#FDF2F2" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "52px", alignItems: "center" }}>
            {" "}
            <div>
              {" "}
              <span style={{ display: "inline-block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "14px" }}>
                Entrepreneur Spotlight
              </span>
              {" "}
              <h2 id="spot-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.2vw,42px)", lineHeight: "1.12", letterSpacing: "-0.015em", marginBottom: "18px", textWrap: "pretty" }}>
                The People Behind Canada’s Most Inspiring Businesses
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#475467", maxWidth: "58ch", textWrap: "pretty", marginBottom: "24px" }}>
                Every successful business begins with a person willing to solve a problem, challenge convention, and create something meaningful. CanadianSME shares the journeys, lessons, and ambitions of founders from communities across Canada.
              </p>
              {" "}
              <div style={{ borderLeft: "3px solid #D71920", padding: "4px 0 4px 20px", marginBottom: "26px" }}>
                {" "}
                <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470", marginBottom: "10px" }}>
                  Featured Interview
                </span>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.25", marginBottom: "12px" }}>
                  {v.spotlight?.title}
                </h3>
                {" "}
                <p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.68", color: "#475467", textWrap: "pretty" }}>
                  {v.spotlight?.excerpt}
                </p>
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {" "}
                <a href={u(v.spotlight?.href)} style={{ padding: "14px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_900112d">
                  Read the Interview
                </a>
                {" "}
                <a href={u("#entrepreneurs")} style={{ padding: "14px 22px", borderRadius: "8px", border: "1.5px solid #101828", color: "#14181D", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_a3b515a">
                  Meet More Entrepreneurs
                </a>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ position: "relative", height: "460px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E4E7EC" }}>
              {" "}
              <img src={v.spotlight?.img} alt={v.spotlight?.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="tools" aria-labelledby="tools-heading" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px" }}>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "28px", flexWrap: "wrap", marginBottom: "32px" }}>
              {" "}
              <div style={{ maxWidth: "820px" }}>
                {" "}
                <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
                  Free tools
                </span>
                {" "}
                <h2 id="tools-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(20px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", marginBottom: "12px", whiteSpace: "nowrap" }}>
                  Calculators Built for Canadian Rules
                </h2>
                {" "}
                <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#5A6470", textWrap: "pretty" }}>
                  Federal and provincial rates, updated for the current tax year. No sign-up.
                </p>
                {" "}
              </div>
              {" "}
              <a href="/tools/" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13px", color: "#002364" }}>
                All tools →
              </a>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "20px" }}>
              {" "}
              {(v.tools || []).map((t: any, _i7: number) => (
                <Fragment key={t?.key ?? t?.id ?? t?.slug ?? _i7}>
                  {" "}
                  <a href={u(t?.href)} style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: "10px", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", transition: "box-shadow .18s ease,transform .18s ease" }} className="h_907f3b5">
                    {" "}
                    <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "22px", color: "#002364", lineHeight: "1" }}>
                      {t?.mark}
                    </span>
                    {" "}
                    <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16.5px", lineHeight: "1.3", color: "#14181D", textWrap: "pretty" }}>
                      {t?.title}
                    </h3>
                    {" "}
                    <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                      {t?.desc}
                    </p>
                    {" "}
                    <span style={{ marginTop: "auto", paddingTop: "8px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "12.5px", color: "#002364" }}>
                      Open calculator →
                    </span>
                    {" "}
                  </a>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="deadlines" aria-labelledby="dead-heading" style={{ background: "transparent", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "52px", alignItems: "start" }}>
            {" "}
            <div>
              {" "}
              <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
                Compliance calendar
              </span>
              {" "}
              <h2 id="dead-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", marginBottom: "14px", textWrap: "pretty" }}>
                What’s Due Next
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#5A6470", maxWidth: "46ch", textWrap: "pretty", marginBottom: "22px" }}>
                The filing and remittance dates that carry penalties if you miss them. Reviewed monthly against CRA guidance.
              </p>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
                {" "}
                <a href="/tools/cashflow/" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#002364" }}>
                  Plan remittances in the cash-flow forecaster →
                </a>
                {" "}
                <a href={u("#newsletter-form")} style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#14181D" }}>
                  Get the monthly deadline reminder by email →
                </a>
                {" "}
              </div>
              {" "}
              <p style={{ marginTop: "22px", fontSize: "12.5px", lineHeight: "1.6", color: "#5A6470", maxWidth: "44ch" }}>
                Dates shift when a due date falls on a weekend or statutory holiday. Confirm your own filing frequency and year end with the CRA or your accountant.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", background: "#fff", overflow: "hidden" }}>
              {" "}
              {(v.deadlines || []).map((d: any, _i7: number) => (
                <Fragment key={d?.key ?? d?.id ?? d?.slug ?? _i7}>
                  {" "}
                  <div style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: "18px", padding: "18px 22px", borderBottom: "1px solid #F0F2F5", alignItems: "baseline" }}>
                    {" "}
                    <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px", letterSpacing: "0.02em", color: "#002364" }}>
                      {d?.date}
                    </span>
                    {" "}
                    <div>
                      {" "}
                      <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15.5px", lineHeight: "1.35", color: "#14181D", marginBottom: "5px", textWrap: "pretty" }}>
                        {d?.title}
                      </h3>
                      {" "}
                      <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                        {d?.who}
                      </p>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="woman-of-the-month" aria-labelledby="wotm-heading" style={{ background: "#7A1F2B", color: "#fff", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "52px", alignItems: "center" }}>
            {" "}
            <a href={u(v.wotm?.href)} style={{ display: "block", borderRadius: "10px", overflow: "hidden", background: "#5E1620", boxShadow: "0 18px 40px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <img src={v.wotm?.img} alt={v.wotm?.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
            </a>
            {" "}
            <div>
              {" "}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#7A1F2B", borderRadius: "999px", padding: "9px 18px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13px", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: "20px", boxShadow: "0 6px 18px rgba(0,0,0,0.18)" }}>
                Business Woman of the Month · {v.wotm?.month}
              </span>
              {" "}
              <h2 id="wotm-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.4vw,42px)", lineHeight: "1.1", letterSpacing: "-0.015em", marginBottom: "10px", textWrap: "pretty" }}>
                {v.wotm?.name}
              </h2>
              {" "}
              <p style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15px", color: "#FBE3E6", marginBottom: "22px" }}>
                {v.wotm?.role}
              </p>
              {" "}
              <p style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "clamp(18px,2vw,23px)", lineHeight: "1.45", color: "#fff", borderLeft: "3px solid #D71920", paddingLeft: "22px", marginBottom: "22px", textWrap: "pretty" }}>
                {v.wotm?.kicker}
              </p>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.75", color: "#FBE3E6", maxWidth: "56ch", marginBottom: "26px", textWrap: "pretty" }}>
                {v.wotm?.excerpt}
              </p>
              {" "}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                {" "}
                <a href={u(v.wotm?.href)} style={{ padding: "14px 26px", borderRadius: "8px", background: "#fff", color: "#7A1F2B", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }} className="h_2283a38">
                  Read her story
                </a>
                {" "}
                <a href={u("#nominate-woman")} style={{ padding: "14px 26px", borderRadius: "8px", border: "1.5px solid rgba(255,255,255,0.55)", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }} className="h_38e417a">
                  Nominate someone
                </a>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="communities" aria-labelledby="comm-heading" style={{ background: "#EEF2F8", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px" }}>
          {" "}
          <div style={{ maxWidth: "640px", marginBottom: "34px" }}>
            {" "}
            <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
              Communities
            </span>
            {" "}
            <h2 id="comm-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", marginBottom: "12px", textWrap: "pretty" }}>
              Entrepreneurs Building Canada
            </h2>
            {" "}
            <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#5A6470", textWrap: "pretty" }}>
              Dedicated coverage of the founders and networks shaping Canadian business.
            </p>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "26px" }}>
            {" "}
            {(v.communities || []).map((c: any, _i6: number) => (
              <Fragment key={c?.key ?? c?.id ?? c?.slug ?? _i6}>
                {" "}
                <section style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {" "}
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13px", letterSpacing: "0.02em", textTransform: "uppercase", color: "#14181D", paddingBottom: "10px", borderBottom: "2px solid #D71920" }}>
                    {c?.heading}
                  </h3>
                  {" "}
                  <a href={u(c?.lead?.href)} style={{ display: "block", aspectRatio: "16/10", borderRadius: "8px", overflow: "hidden", background: "#F4F6F8", border: "1px solid #E4E7EC" }}>
                    <img src={c?.lead?.img} alt={c?.lead?.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </a>
                  {" "}
                  <h4 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16px", lineHeight: "1.3", textWrap: "pretty" }}>
                    <a href={u(c?.lead?.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                      {c?.lead?.title}
                    </a>
                  </h4>
                  {" "}
                  <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                    {c?.lead?.excerpt}
                  </p>
                  {" "}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "9px", borderTop: "1px solid #E4E7EC", paddingTop: "12px" }}>
                    {" "}
                    {(c?.more || []).map((m: any, _i10: number) => (
                      <Fragment key={m?.key ?? m?.id ?? m?.slug ?? _i10}>
                        {" "}
                        <li style={{ fontSize: "13.5px", lineHeight: "1.45" }}>
                          <a href={u(m?.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                            {m?.title}
                          </a>
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ul>
                  {" "}
                  <a href={u(c?.href)} style={{ marginTop: "auto", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "12.5px", color: "#002364" }}>
                    More on {c?.heading} →
                  </a>
                  {" "}
                </section>
                {" "}
              </Fragment>
            ))}
            {" "}
          </div>
        </section>
        <section id="provinces" aria-labelledby="prov-heading" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px" }}>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "28px", flexWrap: "wrap", marginBottom: "32px" }}>
              {" "}
              <div style={{ maxWidth: "620px" }}>
                {" "}
                <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
                  Where you operate
                </span>
                {" "}
                <h2 id="prov-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", marginBottom: "12px", textWrap: "pretty" }}>
                  Business in Your Province
                </h2>
                {" "}
                <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#5A6470", textWrap: "pretty" }}>
                  Sales tax, workers’ compensation, minimum wage and provincial programmes — tracked province by province.
                </p>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "14px" }}>
              {" "}
              {(v.provinceHub || []).map((p: any, _i7: number) => (
                <Fragment key={p?.key ?? p?.id ?? p?.slug ?? _i7}>
                  {" "}
                  <a href={u(p?.href)} style={{ display: "flex", flexDirection: "column", gap: "7px", padding: "18px 20px", background: "#fff", border: "1px solid #E4E7EC", borderRadius: "10px", color: "#14181D", transition: "border-color .18s ease,transform .18s ease" }} className="h_5a6140f">
                    {" "}
                    <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15.5px", lineHeight: "1.3" }}>
                      {p?.label}
                    </h3>
                    {" "}
                    <p style={{ fontSize: "12.5px", lineHeight: "1.55", color: "#5A6470", textWrap: "pretty" }}>
                      {p?.watch}
                    </p>
                    {" "}
                  </a>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="funding-finder" aria-labelledby="finder-heading" style={{ background: "transparent", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "48px", alignItems: "start" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                Funding finder
              </span>
              {" "}
              <h2 id="finder-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", textWrap: "pretty" }}>
                Find Grants and Financing for Your Business
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#5A6470", textWrap: "pretty" }}>
                Pick your province and what you need. We’ll show the federal programmes and regional agency that fit.
              </p>
              {" "}
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467", marginTop: "8px" }}>
                Your province or territory{" "}
                <select value={v.finderProv} onChange={v.onFinderProv} style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #D0D5DD", background: "#fff", color: "#14181D", fontSize: "14.5px", fontFamily: "inherit" }}>
                  {" "}
                  {(v.finderProvOptions || []).map((o: any, _i9: number) => (
                    <Fragment key={o?.key ?? o?.id ?? o?.slug ?? _i9}>
                      <option value={o?.value}>
                        {o?.label}
                      </option>
                    </Fragment>
                  ))}
                  {" "}
                </select>
                {" "}
              </label>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {" "}
                <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
                  What do you need?
                </span>
                {" "}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {" "}
                  {(v.finderNeeds || []).map((n: any, _i9: number) => (
                    <Fragment key={n?.key ?? n?.id ?? n?.slug ?? _i9}>
                      {" "}
                      <button type="button" onClick={n?.onClick} aria-pressed={n?.active} style={{ padding: "9px 14px", borderRadius: "999px", border: `1.5px solid ${n?.border ?? ""}`, background: n?.bg, color: n?.fg, fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
                        {n?.label}
                      </button>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <p style={{ fontSize: "12.5px", lineHeight: "1.6", color: "#5A6470" }}>
                Eligibility and intake windows change. Always confirm on the programme’s official site before applying.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "0", borderTop: "2px solid #101828" }}>
              {" "}
              <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13px", color: "#475467", padding: "14px 0" }}>
                {v.finderCount}
              </span>
              {" "}
              {(v.finderResults || []).map((r: any, _i7: number) => (
                <Fragment key={r?.key ?? r?.id ?? r?.slug ?? _i7}>
                  {" "}
                  <a href={u(r?.href)} target="_blank" rel="noopener" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: "16px", alignItems: "center", padding: "18px 0", borderTop: "1px solid #E4E7EC", color: "#14181D" }} className="h_3120047">
                    {" "}
                    <span style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      {" "}
                      <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                        {r?.tag}
                      </span>
                      {" "}
                      <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17px", lineHeight: "1.3" }}>
                        {r?.name}
                      </span>
                      {" "}
                      <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#475467", textWrap: "pretty" }}>
                        {r?.desc}
                      </span>
                      {" "}
                    </span>
                    {" "}
                    <span aria-hidden="true" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "18px" }}>
                      ↗
                    </span>
                    {" "}
                  </a>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="podcast" aria-labelledby="pod-heading" style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px" }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "48px", alignItems: "start" }}>
              {" "}
              <div>
                {" "}
                <a href="https://smbpodcast.ca/" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", background: "#fff", borderRadius: "10px", padding: "10px 16px", marginBottom: "22px" }} className="h_bba8105">
                  <img loading="lazy" decoding="async" src="https://smbpodcast.ca/wp-content/uploads/2023/11/Untitled-design-removebg-preview.png" alt="CanadianSME Small Business Podcast" style={{ height: "56px", width: "auto", display: "block" }} />
                </a>
                {" "}
                <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#7FA3E8", marginBottom: "14px" }}>
                  CanadianSME Podcast
                </span>
                {" "}
                <h2 id="pod-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.2vw,42px)", lineHeight: "1.12", letterSpacing: "-0.015em", marginBottom: "18px", textWrap: "pretty" }}>
                  Insights You Can Take Anywhere
                </h2>
                {" "}
                <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#C8CDD6", maxWidth: "52ch", textWrap: "pretty", marginBottom: "26px" }}>
                  The CanadianSME Small Business Podcast brings you candid conversations with entrepreneurs, executives, innovators, and industry experts. Hear the strategies, challenges, and lessons behind business success in Canada.
                </p>
                {" "}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "26px" }}>
                  {" "}
                  <a href={u(v.episodes?.[0]?.href || "#latest-episode")} style={{ padding: "14px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_900112d">
                    Listen to the Latest Episode
                  </a>
                  {" "}
                  <a href={u("#all-podcasts")} style={{ padding: "14px 22px", borderRadius: "8px", border: "1.5px solid #4A5163", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_28723ae">
                    Explore All Podcasts
                  </a>
                  {" "}
                </div>
                {" "}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {" "}
                  <a href={u(v.podcastLinks?.spotify || v.social?.spotify || '#')} target="_blank" rel="noopener" style={{ padding: "8px 14px", border: "1px solid #33394A", borderRadius: "999px", fontSize: "12.5px", color: "#C8CDD6", display: "inline-flex", alignItems: "center", gap: "7px" }} className="h_d04dffb">
                    <span aria-hidden="true" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1DB954" }} />
                    Spotify
                  </a>
                  {" "}
                  <a href={u(v.podcastLinks?.apple || v.social?.apple || '#')} target="_blank" rel="noopener" style={{ padding: "8px 14px", border: "1px solid #33394A", borderRadius: "999px", fontSize: "12.5px", color: "#C8CDD6", display: "inline-flex", alignItems: "center", gap: "7px" }} className="h_d04dffb">
                    <span aria-hidden="true" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C36BFF" }} />
                    Apple Podcasts
                  </a>
                  {" "}
                  <a href={u(v.podcastLinks?.youtube || v.social?.youtube || '#')} target="_blank" rel="noopener" style={{ padding: "8px 14px", border: "1px solid #33394A", borderRadius: "999px", fontSize: "12.5px", color: "#C8CDD6", display: "inline-flex", alignItems: "center", gap: "7px" }} className="h_d04dffb">
                    <span aria-hidden="true" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF0033" }} />
                    YouTube
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {(v.episodes || []).slice(0, 3).map((ep: any, i: number) => (
                  <article key={ep.slug} style={{ display: "flex", gap: "16px", alignItems: "center", background: "#161E32", border: "1px solid #262E44", borderRadius: "10px", padding: "14px", transition: "border-color .18s ease" }} className="h_9f7643d">
                    <div aria-hidden="true" style={{ width: "78px", height: "78px", flexShrink: "0", borderRadius: "8px", background: i === 0 ? "#D71920" : "#26304A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "19px" }}>
                      {ep.number}
                    </div>
                    <div style={{ minWidth: "0" }}>
                      <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#7FA3E8", marginBottom: "6px" }}>
                        {['Episode ' + ep.number, ep.duration].filter(Boolean).join(' · ')}
                      </span>
                      <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16px", lineHeight: "1.35" }}>
                        <a href={u(ep.href)} style={{ color: "#fff" }} className="h_a67bccc">
                          {ep.title}
                        </a>
                      </h3>
                    </div>
                    <a href={u(ep.href)} aria-label={`Play episode ${ep.number}`} style={{ marginLeft: "auto", flexShrink: "0", width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "#D71920", color: "#fff", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center" }} className="h_58d1318">
                      ▶
                    </a>
                  </article>
                ))}
              </div>
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="events" aria-labelledby="events-heading" style={{ background: "#FDF2F2", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px" }}>
          {" "}
          <div style={{ maxWidth: "640px", marginBottom: "34px" }}>
            {" "}
            <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
              Events &amp; Community
            </span>
            {" "}
            <h2 id="events-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", marginBottom: "12px", textWrap: "pretty" }}>
              Connect with Canada’s Small Business Community
            </h2>
            {" "}
            <p style={{ fontSize: "16px", lineHeight: "1.65", color: "#5A6470", textWrap: "pretty" }}>
              Join entrepreneurs, business leaders, technology providers, and industry experts at CanadianSME events created to encourage learning, partnership, recognition, and growth.
            </p>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "22px" }}>
            {(v.events || []).slice(0, 3).map((ev: any) => (
              <article key={ev.slug} style={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column", transition: "box-shadow .18s ease" }} className="h_da5fcc5">
                <div style={{ height: "150px" }}>
                  <Slot src={ev.img} alt={ev.imgAlt} shape="rect" placeholder={ev.name} style={{ aspectRatio: "auto" }} />
                </div>
                <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                  <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                    {ev.kicker}
                  </span>
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17px", lineHeight: "1.3" }}>
                    <a href={u(ev.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                      {ev.name}
                    </a>
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#5A6470" }}>
                    {ev.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
          {" "}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "32px" }}>
            {" "}
            <a href={u("#upcoming")} style={{ padding: "14px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_900112d">
              Explore Upcoming Events
            </a>
            {" "}
            <a href={u("#event-partner")} style={{ padding: "14px 22px", borderRadius: "8px", border: "1.5px solid #101828", color: "#14181D", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_a3b515a">
              Become an Event Partner
            </a>
            {" "}
          </div>
        </section>
        <section id="resources" aria-labelledby="res-heading" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px" }}>
            {" "}
            <div style={{ maxWidth: "640px", marginBottom: "32px" }}>
              {" "}
              <h2 id="res-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.015em", marginBottom: "12px", textWrap: "pretty" }}>
                Practical Resources for Every Stage of Business
              </h2>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.65", color: "#475467", textWrap: "pretty" }}>
                Access practical guides, expert advice, templates, and business tools designed to help Canadian entrepreneurs make informed decisions.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "24px", marginBottom: "28px" }}>
              {" "}
              <a href={u("#resources")} aria-label="Starting a Business in Canada. See all guides" style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#14181D" }} className="h_3120047">
                {" "}
                <div style={{ aspectRatio: "3/4", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff", boxShadow: "0 8px 20px rgba(16,24,40,0.06)" }}>
                  <Slot id="res-starting" shape="rect" placeholder="Starting a Business cover" />
                </div>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Guide
                </span>
                {" "}
                <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16px", lineHeight: "1.3" }}>
                  Starting a Business in Canada
                </span>
                {" "}
              </a>
              {" "}
              <a href={u("#resources")} aria-label="Funding and Grants. See all guides" style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#14181D" }} className="h_3120047">
                {" "}
                <div style={{ aspectRatio: "3/4", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff", boxShadow: "0 8px 20px rgba(16,24,40,0.06)" }}>
                  <Slot id="res-grants" shape="rect" placeholder="Funding and Grants cover" />
                </div>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Directory
                </span>
                {" "}
                <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16px", lineHeight: "1.3" }}>
                  Funding and Grants
                </span>
                {" "}
              </a>
              {" "}
              <a href={u("#resources")} aria-label="Cash Flow Forecast Template. See all guides" style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#14181D" }} className="h_3120047">
                {" "}
                <div style={{ aspectRatio: "3/4", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff", boxShadow: "0 8px 20px rgba(16,24,40,0.06)" }}>
                  <Slot id="res-cashflow" shape="rect" placeholder="Cash Flow Forecast cover" />
                </div>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Template · XLSX
                </span>
                {" "}
                <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16px", lineHeight: "1.3" }}>
                  Cash Flow Forecast Template
                </span>
                {" "}
              </a>
              {" "}
              <a href={u("#resources")} aria-label="Exporting from Canada. See all guides" style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#14181D" }} className="h_3120047">
                {" "}
                <div style={{ aspectRatio: "3/4", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff", boxShadow: "0 8px 20px rgba(16,24,40,0.06)" }}>
                  <Slot id="res-exporting" shape="rect" placeholder="Exporting from Canada cover" />
                </div>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Guide
                </span>
                {" "}
                <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16px", lineHeight: "1.3" }}>
                  Exporting from Canada
                </span>
                {" "}
              </a>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              {" "}
              <a href={u("#resources")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 26px", borderRadius: "999px", background: "#1E5AA8", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_3a06147">
                Browse all guides{" "}
                <span aria-hidden="true">
                  →
                </span>
              </a>
              {" "}
            </div>
            {" "}
          </div>
        </section>
        <section id="partners" aria-labelledby="partners-heading" style={{ background: "transparent", padding: "72px max(24px,calc((100% - 1232px) / 2)) 72px" }}>
          {" "}
          <div style={{ maxWidth: "660px", marginBottom: "30px" }}>
            {" "}
            <h2 id="partners-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.16", letterSpacing: "-0.015em", marginBottom: "12px", textWrap: "pretty" }}>
              Working with Organizations That Support Canadian Businesses
            </h2>
            {" "}
            <p style={{ fontSize: "16px", lineHeight: "1.65", color: "#5A6470", textWrap: "pretty" }}>
              CanadianSME works with leading organizations that share our commitment to helping entrepreneurs build stronger, more innovative, and more resilient businesses.
            </p>
            {" "}
          </div>
          {" "}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "26px" }}>
            {" "}
            <span style={{ padding: "6px 12px", borderRadius: "999px", background: "#F4F6F8", border: "1px solid #E4E7EC", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
              Exclusive Partners
            </span>
            {" "}
            <span style={{ padding: "6px 12px", borderRadius: "999px", background: "#F4F6F8", border: "1px solid #E4E7EC", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
              Technology Partners
            </span>
            {" "}
            <span style={{ padding: "6px 12px", borderRadius: "999px", background: "#F4F6F8", border: "1px solid #E4E7EC", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
              Financial Partners
            </span>
            {" "}
            <span style={{ padding: "6px 12px", borderRadius: "999px", background: "#F4F6F8", border: "1px solid #E4E7EC", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
              Shipping and Logistics Partner
            </span>
            {" "}
            <span style={{ padding: "6px 12px", borderRadius: "999px", background: "#F4F6F8", border: "1px solid #E4E7EC", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
              HR and Payroll Partner
            </span>
            {" "}
            <span style={{ padding: "6px 12px", borderRadius: "999px", background: "#F4F6F8", border: "1px solid #E4E7EC", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
              Community Partners
            </span>
            {" "}
          </div>
          {" "}
          <div style={{ overflow: "hidden", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC", padding: "26px 0" }}>
            {" "}
            <div style={{ display: "flex", gap: "56px", width: "max-content", animation: "marquee 48s linear infinite" }} className="h_c0dc266">
              {(() => { const ps = v.partners || []; const n = ps.length; return [...ps, ...ps].map((pt: any, k: number) => (
                <div key={k} aria-hidden={k >= n ? "true" : undefined} style={{ flex: "0 0 auto", width: "160px", height: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={pt.logo} alt={k < n ? pt.name : ""} loading="lazy" style={{ maxWidth: "100%", maxHeight: "56px", width: "auto", height: "auto", display: "block", objectFit: "contain" }} />
                </div>
              )) })()}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "30px" }}>
            {" "}
            <a href={u("#become-partner")} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 26px", borderRadius: "999px", background: "#1E5AA8", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_3a06147">
              Become a CanadianSME Partner
            </a>
            {" "}
          </div>
        </section>
        <section id="newsletter-form" aria-labelledby="news-heading" style={{ background: "#D71920", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "0" }}>
              {" "}
              <div style={{ padding: "64px 48px 64px 0", color: "#fff" }}>
                {" "}
                <span style={{ display: "inline-block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#FBD5D7", marginBottom: "14px" }}>
                  The Tuesday Briefing · Free
                </span>
                {" "}
                <h2 id="news-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(27px,3vw,40px)", lineHeight: "1.12", letterSpacing: "-0.015em", marginBottom: "16px", textWrap: "pretty" }}>
                  This Week’s Deadlines and Grants, in Five Minutes
                </h2>
                {" "}
                <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#FDE7E8", maxWidth: "50ch", textWrap: "pretty", marginBottom: "22px" }}>
                  One short email every Tuesday, written for Canadian owner-operators. Tell us your province and we’ll skip what doesn’t apply.
                </p>
                {" "}
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "50ch", padding: "0", listStyle: "none" }}>
                  {" "}
                  <li style={{ display: "flex", gap: "12px", fontSize: "15.5px", lineHeight: "1.5", color: "#fff" }}>
                    <span style={{ flexShrink: "0", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", color: "#FBD5D7" }}>
                      01
                    </span>
                    CRA and payroll dates coming up in the next 30 days
                  </li>
                  {" "}
                  <li style={{ display: "flex", gap: "12px", fontSize: "15.5px", lineHeight: "1.5", color: "#fff" }}>
                    <span style={{ flexShrink: "0", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", color: "#FBD5D7" }}>
                      02
                    </span>
                    Grant and financing intakes opening or closing soon
                  </li>
                  {" "}
                  <li style={{ display: "flex", gap: "12px", fontSize: "15.5px", lineHeight: "1.5", color: "#fff" }}>
                    <span style={{ flexShrink: "0", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", color: "#FBD5D7" }}>
                      03
                    </span>
                    One practical read from CanadianSME, plus rate and tariff changes that affect you
                  </li>
                  {" "}
                </ul>
                {" "}
              </div>
              {" "}
              <div style={{ background: "#101828", padding: "44px", margin: "40px 0", borderRadius: "10px", boxShadow: "0 24px 50px rgba(16,24,40,0.35)" }}>
                {" "}
                <form onSubmit={v.onSubscribe} noValidate={true} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                  {" "}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "14px" }}>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#C8CDD6" }}>
                      First name{" "}
                      <input name="first" type="text" ref={v.firstRef} autoComplete="given-name" style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #33394A", background: "#fff", color: "#14181D", fontSize: "14px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#C8CDD6" }}>
                      Email address{" "}
                      <input name="email" type="email" ref={v.emailRef} autoComplete="email" style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #33394A", background: "#fff", color: "#14181D", fontSize: "14px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#C8CDD6" }}>
                      Province{" "}
                      <select name="province" ref={v.provRef} style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #33394A", background: "#fff", color: "#14181D", fontSize: "14px" }}>
                        {" "}
                        <option value="">
                          Select a province
                        </option>
                        {" "}
                        <option>
                          Alberta
                        </option>
                        {" "}
                        <option>
                          British Columbia
                        </option>
                        {" "}
                        <option>
                          Manitoba
                        </option>
                        {" "}
                        <option>
                          New Brunswick
                        </option>
                        {" "}
                        <option>
                          Newfoundland and Labrador
                        </option>
                        {" "}
                        <option>
                          Nova Scotia
                        </option>
                        {" "}
                        <option>
                          Ontario
                        </option>
                        {" "}
                        <option>
                          Prince Edward Island
                        </option>
                        {" "}
                        <option>
                          Quebec
                        </option>
                        {" "}
                        <option>
                          Saskatchewan
                        </option>
                        {" "}
                        <option>
                          Northwest Territories
                        </option>
                        {" "}
                        <option>
                          Nunavut
                        </option>
                        {" "}
                        <option>
                          Yukon
                        </option>
                        {" "}
                      </select>
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#C8CDD6" }}>
                      Business stage{" "}
                      <select name="stage" ref={v.stageRef} style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #33394A", background: "#fff", color: "#14181D", fontSize: "14px" }}>
                        {" "}
                        <option value="">
                          Select a stage
                        </option>
                        {" "}
                        <option>
                          Idea or pre-launch
                        </option>
                        {" "}
                        <option>
                          Newly launched
                        </option>
                        {" "}
                        <option>
                          Growing
                        </option>
                        {" "}
                        <option>
                          Established
                        </option>
                        {" "}
                        <option>
                          Scaling nationally or exporting
                        </option>
                        {" "}
                      </select>
                      {" "}
                    </label>
                    {" "}
                  </div>
                  {" "}
                  <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", lineHeight: "1.55", color: "#C8CDD6" }}>
                    {" "}
                    <input type="checkbox" ref={v.consentRef} style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: "#D71920" }} />
                    {" "}
                    <span>
                      I have read and agree to the{" "}
                      <a href={u("#terms")} style={{ color: "#fff", textDecoration: "underline" }}>
                        terms of use
                      </a>
                      {" "}regarding the storage of the data submitted through this form, and consent to receive news and updates from CanadianSME. I can unsubscribe at any time.
                    </span>
                    {" "}
                  </label>
                  {" "}
                  <span role="status" aria-live="polite" style={{ fontSize: "13px", fontWeight: "600", color: v.formColor, minHeight: "18px" }}>
                    {v.formMessage}
                  </span>
                  {" "}
                  <button type="submit" style={{ padding: "15px", borderRadius: "8px", border: "0", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "pointer" }} className="h_d91df66">
                    Get the Tuesday Briefing
                  </button>
                  {" "}
                  <span style={{ fontSize: "12.5px", color: "#98A2B3", textAlign: "center" }}>
                    Free to join. No spam. Unsubscribe anytime.
                  </span>
                  {" "}
                </form>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
        </section>
      </div>
    </>
  )
}
