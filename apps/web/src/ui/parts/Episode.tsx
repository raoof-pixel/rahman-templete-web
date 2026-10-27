'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { AudioPlayer } from '../AudioPlayer'
import { Slot } from '../Slot'

export default function Episode() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.episodeDisplay }}>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#667085", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a href={u("#home")} style={{ color: "#667085" }} className="h_1dd7993">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            <a href={u("#podcast")} style={{ color: "#667085" }} className="h_1dd7993">
              Podcast
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#101828" }}>
              Episode {v.episode?.number}
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "44px", alignItems: "center" }}>
            {" "}
            <div style={{ maxWidth: "320px", width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", boxShadow: "0 24px 50px rgba(0,0,0,0.45)" }}>
              <Slot src={v.episode?.art} alt={v.episode ? `Episode ${v.episode.number} artwork` : ""} shape="rounded" radius="10" placeholder="Episode artwork" style={{ aspectRatio: "1 / 1" }} />
            </div>
            {" "}
            <div>
              {" "}
              <span style={{ display: "inline-block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D4A72C", marginBottom: "12px" }}>
                {['Episode ' + (v.episode?.number ?? ''), v.episode?.duration].filter(Boolean).join(' · ')}
              </span>
              {" "}
              <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(28px,3.2vw,40px)", lineHeight: "1.14", marginBottom: "16px" }}>
                {v.episode?.title}
              </h1>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#C8CDD6", maxWidth: "54ch", marginBottom: "24px" }}>
                {v.episode?.desc}
              </p>
              {" "}
              <AudioPlayer src={v.episode?.audioUrl || ""} length={v.episode?.length} title={v.episode?.title || "episode"} />
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 24px 72px", fontSize: "17px", lineHeight: "1.75", color: "#1D2939", display: "flex", flexDirection: "column", gap: "20px" }}>
          {" "}
          <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "26px" }}>
            Episode notes
          </h2>
          {" "}
          <p>
            {v.episode?.notesIntro}
          </p>
          {" "}
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15.5px", color: "#475467" }}>
            {(v.episode?.notes || []).map((n: any, i: number) => (
              <li key={i} style={{ display: "flex", gap: "12px" }}>
                <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", color: "#D71920", flexShrink: "0" }}>
                  {n.t}
                </span>
                <span>
                  {n.text}
                </span>
              </li>
            ))}
          </ul>
          {" "}
          <a href={u("#podcast")} style={{ alignSelf: "flex-start", marginTop: "10px", padding: "13px 22px", borderRadius: "8px", border: "1.5px solid #101828", color: "#101828", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_a3b515a">
            All episodes
          </a>
          {" "}
        </div>
      </div>
    </>
  )
}
