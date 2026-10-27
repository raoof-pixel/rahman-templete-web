'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function NotFound() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.notFoundDisplay }}>
        {" "}
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "96px 24px 110px", textAlign: "center" }}>
          {" "}
          <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "76px", color: "#D71920", lineHeight: "1", marginBottom: "16px" }}>
            404
          </span>
          {" "}
          <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.14", marginBottom: "14px" }}>
            We couldn’t find that page
          </h1>
          {" "}
          <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#667085", marginBottom: "30px" }}>
            The link may be out of date, or the story may have moved. Try the latest issue, or search for what you need.
          </p>
          {" "}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {" "}
            <a href={u("#home")} style={{ padding: "14px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_900112d">
              Back to homepage
            </a>
            {" "}
            <a href={u("#search")} style={{ padding: "14px 22px", borderRadius: "8px", border: "1.5px solid #101828", color: "#101828", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_a3b515a">
              Search the site
            </a>
            {" "}
          </div>
          {" "}
        </div>
      </div>
    </>
  )
}
