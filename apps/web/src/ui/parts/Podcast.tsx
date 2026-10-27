'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Podcast() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.podArchiveDisplay }}>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#5A6470", display: "flex", gap: "8px" }}>
            <a href={u("#home")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#14181D" }}>
              Podcast
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 72px" }}>
          {" "}
          <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
            CanadianSME Podcast
          </span>
          {" "}
          <h1 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(32px,3.6vw,48px)", lineHeight: "1.1", marginBottom: "12px", letterSpacing: "-0.025em" }}>
            Every Episode
          </h1>
          {" "}
          <p style={{ fontSize: "17px", lineHeight: "1.65", color: "#5A6470", maxWidth: "62ch", marginBottom: "22px" }}>
            Candid conversations with entrepreneurs, executives, innovators, and industry experts. New episodes every Thursday.
          </p>
          {" "}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "36px" }}>
            {" "}
            <a href={u(v.podcastLinks?.spotify || v.social?.spotify || '#')} target="_blank" rel="noopener" style={{ padding: "9px 15px", border: "1.5px solid #D0D5DD", borderRadius: "999px", fontSize: "13px", color: "#14181D" }} className="h_193a6e3">
              Spotify
            </a>
            {" "}
            <a href={u(v.podcastLinks?.apple || v.social?.apple || '#')} target="_blank" rel="noopener" style={{ padding: "9px 15px", border: "1.5px solid #D0D5DD", borderRadius: "999px", fontSize: "13px", color: "#14181D" }} className="h_193a6e3">
              Apple Podcasts
            </a>
            {" "}
            <a href={u(v.podcastLinks?.youtube || v.social?.youtube || '#')} target="_blank" rel="noopener" style={{ padding: "9px 15px", border: "1.5px solid #D0D5DD", borderRadius: "999px", fontSize: "13px", color: "#14181D" }} className="h_193a6e3">
              YouTube
            </a>
            {" "}
          </div>
          {" "}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {(v.episodes || []).map((ep: any, i: number) => (
              <article key={ep.slug} style={{ display: "flex", gap: "18px", alignItems: "center", border: "1px solid #E4E7EC", borderRadius: "10px", padding: "16px" }} className="h_9f7643d">
                <div aria-hidden="true" style={{ width: "92px", height: "92px", flexShrink: "0", borderRadius: "8px", background: i === 0 ? "#D71920" : "#101828", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "22px" }}>
                  {ep.number}
                </div>
                <div style={{ minWidth: "0" }}>
                  <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "6px" }}>
                    {['Episode ' + ep.number, ep.duration, ep.date].filter(Boolean).join(' · ')}
                  </span>
                  <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.25", marginBottom: "6px" }}>
                    <a href={u(ep.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                      {ep.title}
                    </a>
                  </h2>
                  <p style={{ fontSize: "14px", color: "#5A6470", lineHeight: "1.6" }}>
                    {ep.desc}
                  </p>
                </div>
                <a href={u(ep.href)} aria-label={`Play episode ${ep.number}`} style={{ marginLeft: "auto", flexShrink: "0", width: "44px", height: "44px", borderRadius: "50%", background: "#D71920", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }} className="h_900112d">
                  ▶
                </a>
              </article>
            ))}
          </div>
          {" "}
        </div>
      </div>
    </>
  )
}
