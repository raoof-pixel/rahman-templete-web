'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Issue() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.issueDisplay }}>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#667085", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {" "}
            <a href={u("#home")} style={{ color: "#667085" }} className="h_1dd7993">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            {" "}
            <a href={u("#magazine")} style={{ color: "#667085" }} className="h_1dd7993">
              Magazine
            </a>
            <span aria-hidden="true">
              /
            </span>
            {" "}
            <span style={{ color: "#101828" }}>
              {v.issue?.month}
            </span>
            {" "}
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "52px", alignItems: "center" }}>
            {" "}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: "380px", aspectRatio: "3/4", borderRadius: "10px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.45)" }}>
                {v.issue?.cover ? (
                  <img fetchPriority="high" decoding="async" src={v.issue.cover} alt={v.issue.coverAlt || `CanadianSME Issue ${v.issue.number}, ${v.issue.month} cover`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <Slot shape="rect" placeholder="Magazine cover" style={{ aspectRatio: "3 / 4" }} />
                )}
              </div>
            </div>
            {" "}
            <div>
              {" "}
              <span style={{ display: "inline-block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D4A72C", marginBottom: "14px" }}>
                Issue No. {v.issue?.number} · {v.issue?.month} · Free digital access
              </span>
              {" "}
              <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(28px,3.2vw,42px)", lineHeight: "1.12", marginBottom: "18px" }}>
                {v.issue?.title}
              </h1>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#C8CDD6", maxWidth: "56ch", marginBottom: "26px" }}>
                {v.issue?.desc || 'Interviews, practical growth advice, emerging trends, and stories from the entrepreneurs shaping Canada’s future.'}
              </p>
              {" "}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={u(v.issue?.readUrl || '#')} target="_blank" rel="noopener" style={{ padding: "14px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_900112d">
                  Read this issue
                </a>
                <a href={u("#magazine")} style={{ padding: "14px 22px", borderRadius: "8px", border: "1.5px solid #4A5163", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_28723ae">
                  View past issues
                </a>
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 72px" }}>
          {" "}
          <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "28px", marginBottom: "24px" }}>
            Inside this issue
          </h2>
          {" "}
          <ol style={{ display: "flex", flexDirection: "column", gap: "0", margin: "0", padding: "0", listStyle: "none" }}>
            {(v.issue?.inside || []).map((it: any, i: number) => (
              <li key={i} style={{ display: "flex", gap: "20px", alignItems: "baseline", padding: "18px 0", borderBottom: "1px solid #E4E7EC" }}>
                <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", color: "#E4E7EC", fontSize: "18px" }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  {it.href ? (
                    <a href={u(it.href)} style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "20px", color: "#101828" }} className="h_1dd7993">
                      {it.title}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "20px", color: "#101828" }}>{it.title}</span>
                  )}
                  <p style={{ fontSize: "14px", color: "#667085", marginTop: "5px" }}>
                    {it.meta}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {" "}
        </div>
      </div>
    </>
  )
}
