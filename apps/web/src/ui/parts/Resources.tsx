'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Resources() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.resourcesDisplay }}>
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
              Resources
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 72px" }}>
          {" "}
          <h1 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(32px,3.6vw,48px)", lineHeight: "1.1", marginBottom: "12px", letterSpacing: "-0.025em" }}>
            Business Resources
          </h1>
          {" "}
          <p style={{ fontSize: "17px", lineHeight: "1.65", color: "#5A6470", maxWidth: "62ch", marginBottom: "38px" }}>
            Guides, templates, checklists, and directories built for Canadian entrepreneurs — free to download, no account required. Grouped by the stage of business you are in.
          </p>
          {" "}
          {(v.resourceGroups || []).map((g: any, _i5: number) => (
            <Fragment key={g?.key ?? g?.id ?? g?.slug ?? _i5}>
              {" "}
              <section style={{ marginBottom: "88px" }}>
                {" "}
                <div style={{ display: "flex", alignItems: "baseline", gap: "14px", paddingBottom: "12px", marginBottom: "22px", borderBottom: "2px solid #101828" }}>
                  {" "}
                  <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px", letterSpacing: "0.02em", textTransform: "uppercase", color: "#14181D" }}>
                    {g?.heading}
                  </h2>
                  {" "}
                  <span style={{ fontSize: "13.5px", color: "#5A6470" }}>
                    {g?.sub}
                  </span>
                  {" "}
                </div>
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "24px" }}>
                  {" "}
                  {(g?.items || []).map((r: any, _i9: number) => (
                    <Fragment key={r?.key ?? r?.id ?? r?.slug ?? _i9}>
                      {" "}
                      <article style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%" }}>
                        {" "}
                        <div role="button" tabIndex="0" aria-label={`Download ${r?.title ?? ""}`} onClick={r?.openGate} onKeyDown={r?.gateKey} style={{ position: "relative", display: "block", aspectRatio: "3/4", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff", boxShadow: "0 8px 20px rgba(16,24,40,0.06)", cursor: "pointer" }} className="h_ed6f648">
                          <Slot id={r?.slot} shape="rect" placeholder={r?.image} />
                        </div>
                        {" "}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "1" }}>
                          {" "}
                          <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                            {r?.kind}
                          </span>
                          {" "}
                          <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                            <button type="button" onClick={r?.openGate} style={{ background: "none", border: "0", padding: "0", textAlign: "left", font: "inherit", color: "#14181D", cursor: "pointer" }} className="h_9e87cbe">
                              {r?.title}
                            </button>
                          </h3>
                          {" "}
                          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#5A6470", textWrap: "pretty" }}>
                            {r?.desc}
                          </p>
                          {" "}
                          <button type="button" onClick={r?.openGate} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "auto", padding: "9px 14px", borderRadius: "999px", border: "0", background: "#1E5AA8", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13px", cursor: "pointer" }} className="h_636b15c">
                            ↓ Free download
                          </button>
                          {" "}
                        </div>
                        {" "}
                      </article>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
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
