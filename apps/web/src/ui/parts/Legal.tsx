'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Legal() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.legalDisplay }}>
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
              {v.legalLabel}
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
              Legal
            </span>
            {" "}
            <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(30px,3.4vw,44px)", lineHeight: "1.12", letterSpacing: "-0.01em" }}>
              {v.legalTitle}
            </h1>
            {" "}
            <p style={{ fontSize: "14px", color: "#C8CDD6" }}>
              Last updated October 25, 2026 · Cmarketing Inc., Mississauga, Ontario
            </p>
            {" "}
          </div>
          {" "}
        </header>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "56px", alignItems: "start" }}>
          {" "}
          <aside style={{ position: "sticky", top: "110px", display: "flex", flexDirection: "column", gap: "22px" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#667085", marginBottom: "8px" }}>
                On this page
              </span>
              {" "}
              {(v.legalSections || []).map((sec: any, _i7: number) => (
                <Fragment key={sec?.key ?? sec?.id ?? sec?.slug ?? _i7}>
                  {" "}
                  <button type="button" onClick={sec?.go} style={{ display: "flex", gap: "10px", textAlign: "left", background: "none", border: "0", padding: "6px 0", cursor: "pointer", fontSize: "14px", lineHeight: "1.4", color: "#344054" }} className="h_1dd7993">
                    <span style={{ color: "#98A2B3", minWidth: "18px" }}>
                      {sec?.n}
                    </span>
                    <span>
                      {sec?.h}
                    </span>
                  </button>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "18px", borderTop: "1px solid #E4E7EC" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#667085" }}>
                Related
              </span>
              {" "}
              {(v.legalOthers || []).map((o: any, _i7: number) => (
                <Fragment key={o?.key ?? o?.id ?? o?.slug ?? _i7}>
                  <a href={u(o?.href)} style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "14px", color: "#1E5AA8" }} className="h_1dd7993">
                    {o?.label} →
                  </a>
                </Fragment>
              ))}
              {" "}
              <a href={u("#sitemap")} style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "14px", color: "#1E5AA8" }} className="h_1dd7993">
                Sitemap →
              </a>
              {" "}
            </div>
            {" "}
          </aside>
          {" "}
          <article style={{ gridColumn: "span 2", minWidth: "0", maxWidth: "76ch", display: "flex", flexDirection: "column", gap: "36px" }}>
            {" "}
            <p style={{ fontSize: "18px", lineHeight: "1.75", color: "#344054", textWrap: "pretty" }}>
              {v.legalIntro}
            </p>
            {" "}
            {(v.legalSections || []).map((sec: any, _i6: number) => (
              <Fragment key={sec?.key ?? sec?.id ?? sec?.slug ?? _i6}>
                {" "}
                <section id={sec?.id} style={{ display: "flex", flexDirection: "column", gap: "14px", paddingTop: "28px", borderTop: "1px solid #E4E7EC" }}>
                  {" "}
                  <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "22px", lineHeight: "1.3", color: "#101828", display: "flex", gap: "12px" }}>
                    <span style={{ color: "#D71920" }}>
                      {sec?.n}.
                    </span>
                    <span>
                      {sec?.h}
                    </span>
                  </h2>
                  {" "}
                  {(sec?.paras || []).map((pa: any, _i9: number) => (
                    <Fragment key={pa?.key ?? pa?.id ?? pa?.slug ?? _i9}>
                      <p style={{ fontSize: "16.5px", lineHeight: "1.75", color: "#344054", textWrap: "pretty" }}>
                        {pa?.c}
                      </p>
                    </Fragment>
                  ))}
                  {" "}
                  {sec?.hasItems ? (
                    <>
                      {" "}
                      <ul style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "22px", listStyle: "disc" }}>
                        {" "}
                        {(sec?.list || []).map((li: any, _i12: number) => (
                          <Fragment key={li?.key ?? li?.id ?? li?.slug ?? _i12}>
                            <li style={{ fontSize: "16px", lineHeight: "1.7", color: "#344054" }}>
                              {li?.c}
                            </li>
                          </Fragment>
                        ))}
                        {" "}
                      </ul>
                      {" "}
                    </>
                  ) : null}
                  {" "}
                </section>
                {" "}
              </Fragment>
            ))}
            {" "}
            <p style={{ fontSize: "13.5px", lineHeight: "1.6", color: "#667085", padding: "18px 20px", background: "#F4F6F8", borderRadius: "10px" }}>
              This page is provided for general information and should be reviewed by qualified legal counsel before publication.
            </p>
            {" "}
          </article>
          {" "}
        </div>
      </div>
    </>
  )
}
