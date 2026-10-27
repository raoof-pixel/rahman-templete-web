'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Magazine() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.magArchiveDisplay }}>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#667085", display: "flex", gap: "8px" }}>
            {" "}
            <a href={u("#home")} style={{ color: "#667085" }} className="h_1dd7993">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#101828" }}>
              Magazine
            </span>
            {" "}
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 72px" }}>
          {" "}
          <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "10px" }}>
            The Magazine
          </span>
          {" "}
          <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(32px,3.6vw,48px)", lineHeight: "1.1", marginBottom: "12px" }}>
            Every Issue of CanadianSME
          </h1>
          {" "}
          <p style={{ fontSize: "17px", lineHeight: "1.65", color: "#667085", maxWidth: "62ch", marginBottom: "40px" }}>
            Read the current edition and browse the full archive. Every issue is free to read online.
          </p>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "28px" }}>
            {(v.issues || []).map((is: any, i: number) => (
              <a key={is.slug} href={u(is.href)} style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#101828" }} className="h_bba8105">
                <div style={{ aspectRatio: "3/4", borderRadius: "10px", overflow: "hidden", border: "1px solid #E4E7EC", boxShadow: i === 0 ? "0 12px 26px rgba(16,24,40,0.12)" : undefined }}>
                  {is.cover ? (
                    <img loading="lazy" decoding="async" src={is.cover} alt={is.coverAlt || `Issue ${is.number}, ${is.month}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <Slot shape="rect" placeholder="Magazine cover" style={{ aspectRatio: "3 / 4" }} />
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px" }}>
                    {is.month}
                  </span>
                  <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3" }}>
                    Issue No. {is.number}
                  </span>
                </div>
                <span style={{ fontSize: "13.5px", color: "#667085", lineHeight: "1.5" }}>
                  {is.title}
                </span>
                {i === 0 ? (
                  <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "12.5px", color: "#D71920" }}>
                    Current issue →
                  </span>
                ) : null}
              </a>
            ))}
          </div>
          {" "}
        </div>
      </div>
    </>
  )
}
