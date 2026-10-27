'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Search() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.searchDisplay }}>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#5A6470", display: "flex", gap: "8px" }}>
            {" "}
            <a href={u("#home")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#14181D" }}>
              Search
            </span>
            {" "}
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 24px 72px" }}>
          {" "}
          <h1 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.4vw,44px)", lineHeight: "1.1", marginBottom: "20px", letterSpacing: "-0.025em" }}>
            Search CanadianSME
          </h1>
          {" "}
          <form onSubmit={v.onSearchPage} style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
            {" "}
            <input type="search" ref={v.pageSearchRef} defaultValue={v.pageQuery} placeholder="Search articles, podcasts, events, resources" style={{ flex: "1", minWidth: "240px", padding: "14px 16px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
            {" "}
            <button type="submit" style={{ padding: "14px 24px", border: "0", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer" }} className="h_58d1318">
              Search
            </button>
            {" "}
          </form>
          {" "}
          <p aria-live="polite" style={{ fontSize: "14px", color: "#5A6470", marginBottom: "30px" }}>
            {v.searchSummary}
          </p>
          {" "}
          {v.searchEmpty ? (
            <>
              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#475467", padding: "24px", background: "#F4F6F8", borderRadius: "10px" }}>
                Nothing matched. Try fewer or broader words — for example “grants”, “GST”, “hiring” or a province name.
              </p>
            </>
          ) : null}
          {" "}
          <ul style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {" "}
            {(v.searchResults || []).map((r: any, _i6: number) => (
              <Fragment key={r?.key ?? r?.id ?? r?.slug ?? _i6}>
                {" "}
                <li style={{ padding: "22px 0", borderBottom: "1px solid #E4E7EC", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                    {r?.label}
                  </span>
                  <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "19px", lineHeight: "1.3" }}>
                    <a href={u(r?.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                      {r?.title}
                    </a>
                  </h2>
                  <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                    {r?.desc}
                  </p>
                </li>
                {" "}
              </Fragment>
            ))}
            {" "}
          </ul>
          {" "}
        </div>
      </div>
    </>
  )
}
