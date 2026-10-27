'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Pager } from '../Pager'
import { Slot } from '../Slot'

export default function Category() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.categoryDisplay }}>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#5A6470", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {" "}
            <a href={u("#home")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            {" "}
            <span style={{ color: "#14181D" }}>
              {v.categoryName}
            </span>
            {" "}
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 64px" }}>
          {" "}
          <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "10px" }}>
            {v.list?.eyebrow || 'Category'}
          </span>
          {" "}
          <h1 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(32px,3.6vw,48px)", lineHeight: "1.1", letterSpacing: "-0.025em", marginBottom: "12px" }}>
            {v.categoryName}
          </h1>
          {" "}
          <p style={{ fontSize: "17px", lineHeight: "1.65", color: "#5A6470", maxWidth: "62ch", textWrap: "pretty", marginBottom: "30px" }}>
            {v.list?.intro || 'Reporting, analysis, and practical guidance for Canadian small and medium-sized businesses.'} {(v.list?.total ?? 0).toLocaleString('en-CA')} articles and counting.
          </p>
          {" "}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center", paddingBottom: "24px", borderBottom: "1px solid #E4E7EC", marginBottom: "30px" }}>
            {" "}
            <label htmlFor="cat-sort" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12.5px", color: "#5A6470" }}>
              Sort
            </label>
            {" "}
            <select
              id="cat-sort"
              value={v.list?.sort === 'picks' ? 'picks' : 'recent'}
              onChange={(e: { target: { value: string } }) => window.location.assign(v.list?.base + (e.target.value === 'picks' ? '?sort=picks' : ''))}
              style={{ padding: "10px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "13.5px", background: "#fff" }}
            >
              <option value="recent">
                Most recent
              </option>
              <option value="picks">
                Editor’s picks
              </option>
            </select>
            {" "}
            <a href={u("#search")} style={{ marginLeft: "auto", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13.5px" }}>
              Search all articles →
            </a>
            {" "}
          </div>
          {" "}
          {v.list?.articles?.length ? null : (
            <p style={{ fontSize: "15px", color: "#5A6470" }}>No articles here yet.</p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "26px" }}>
            {(v.list?.articles || []).map((a: any, i: number) => (
              <article key={a.slot || i} style={{ display: "flex", flexDirection: "column", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }} className="h_da5fcc5">
                <div style={{ height: "180px" }}>
                  <Slot src={a.img} alt={a.alt} shape="rect" placeholder="Article image" />
                </div>
                <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: a.sponsored ? "#24467A" : "#002364" }}>
                    {a.sponsored ? 'Sponsored' : a.cat}
                  </span>
                  <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.24" }}>
                    <a href={u(a.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                      {a.title}
                    </a>
                  </h2>
                  {a.excerpt ? (
                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#5A6470", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {a.excerpt}
                    </p>
                  ) : null}
                  <span style={{ fontSize: "12px", color: "#5A6470" }}>
                    {[a.date, a.read].filter(Boolean).join(' · ')}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <Pager base={v.list?.base || '/latest/'} page={v.list?.page || 1} totalPages={v.list?.totalPages || 1} query={v.list?.sort === 'picks' ? '?sort=picks' : ''} />
        </div>
      </div>
    </>
  )
}
