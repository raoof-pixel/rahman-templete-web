'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Pager } from '../Pager'
import { Slot } from '../Slot'

export default function Contributor() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.contributorDisplay }}>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#5A6470", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a href={u("#home")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            <a href={u("#contributors")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              Contributors
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#14181D" }}>
              {v.author?.author?.name}
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 72px" }}>
          {" "}
          <div style={{ display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap", paddingBottom: "32px", borderBottom: "1px solid #E4E7EC", marginBottom: "36px" }}>
            {" "}
            <div style={{ width: "132px", height: "132px", borderRadius: "50%", overflow: "hidden", flexShrink: "0" }}>
              {v.author?.author?.img ? <img fetchPriority="high" decoding="async" src={v.author.author.img} alt={`${v.author.author.name}${v.author.author.role ? ", " + v.author.author.role : ""}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <span aria-hidden="true" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#101828", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "40px" }}>{(v.author?.author?.name || "").split(/\s+/).map((w: string) => w[0]).slice(0, 2).join("")}</span>}
            </div>
            {" "}
            <div style={{ minWidth: "260px", flex: "1" }}>
              {" "}
              <h1 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.12", marginBottom: "8px", letterSpacing: "-0.025em" }}>
                {v.author?.author?.name}
              </h1>
              {" "}
              <p style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "14px", color: "#002364", marginBottom: "12px" }}>
                {v.author?.author?.role}
              </p>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#5A6470", maxWidth: "60ch" }}>
                {v.author?.author?.bio}
              </p>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "26px", marginBottom: "22px", letterSpacing: "-0.015em" }}>
            Recent work
          </h2>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "22px" }}>
            {(v.author?.recent || []).map((r: any, i: number) => (
              <article key={i} style={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ height: "150px" }}>
                  <Slot src={r.img} alt={r.alt} shape="rect" placeholder="Article image" style={{ aspectRatio: "auto" }} />
                </div>
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                    {r.cat}
                  </span>
                  <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "18px", lineHeight: "1.25" }}>
                    <a href={u(r.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                      {r.title}
                    </a>
                  </h3>
                </div>
              </article>
            ))}
          </div>
          <Pager base={v.author?.base || '/contributors/'} page={v.author?.page || 1} totalPages={v.author?.totalPages || 1} />
          {" "}
          <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "28px", margin: "56px 0 24px", letterSpacing: "-0.015em" }}>
            Top Contributors
          </h2>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))", gap: "24px" }}>
            {(v.author?.contributors || []).map((c: any, i: number) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
                <div style={{ aspectRatio: "1/1", overflow: "hidden", background: "#F4F6F8" }}>
                  <Slot src={c.img} alt={c.name} shape="rect" placeholder="Contributor photo" style={{ aspectRatio: "1 / 1" }} />
                </div>
                <div>
                  <a href={u(c.href)} style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15.5px", color: "#14181D" }} className="h_9e87cbe">
                    {c.name}
                  </a>
                  {c.role ? (
                    <p style={{ fontSize: "13px", color: "#5A6470", marginTop: "3px" }}>
                      {c.role}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          {" "}
        </div>
      </div>
    </>
  )
}
