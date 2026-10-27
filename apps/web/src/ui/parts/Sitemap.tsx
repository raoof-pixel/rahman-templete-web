'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Sitemap() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.sitemapDisplay }}>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#667085", display: "flex", gap: "8px" }}>
            <a href={u("#home")} style={{ color: "#667085" }} className="h_1dd7993">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#101828" }}>
              Sitemap
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <header style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 48px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {" "}
            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF6B72" }}>
              Find your way
            </span>
            {" "}
            <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(30px,3.4vw,44px)", lineHeight: "1.12", letterSpacing: "-0.01em" }}>
              Sitemap
            </h1>
            {" "}
            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#C8CDD6", maxWidth: "60ch" }}>
              Every section of CanadianSME in one place — articles, resources, events, provincial guides and more.
            </p>
            {" "}
          </div>
          {" "}
        </header>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))", gap: "40px 32px", alignItems: "start" }}>
          {" "}
          {(v.sitemapGroups || []).map((g: any, _i5: number) => (
            <Fragment key={g?.key ?? g?.id ?? g?.slug ?? _i5}>
              {" "}
              <section style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "16px", borderTop: "2px solid #101828" }}>
                {" "}
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "17px", color: "#101828" }}>
                  {g?.title}
                </h2>
                {" "}
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  {(g?.links || []).map((l: any, _i9: number) => (
                    <Fragment key={l?.key ?? l?.id ?? l?.slug ?? _i9}>
                      <li>
                        <a href={u(l?.href)} style={{ fontSize: "15px", color: "#344054" }} className="h_1dd7993">
                          {l?.label}
                        </a>
                      </li>
                    </Fragment>
                  ))}
                  {" "}
                </ul>
                {" "}
              </section>
              {" "}
            </Fragment>
          ))}
          {" "}
        </div>
      </div>
    </>
  )
}
