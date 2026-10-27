'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Events() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.eventsDisplay }}>
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
              Events
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 72px" }}>
          {" "}
          <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "10px" }}>
            Events &amp; Community
          </span>
          {" "}
          <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(32px,3.6vw,48px)", lineHeight: "1.1", marginBottom: "12px" }}>
            Upcoming CanadianSME Events
          </h1>
          {" "}
          <p style={{ fontSize: "17px", lineHeight: "1.65", color: "#667085", maxWidth: "62ch", marginBottom: "38px" }}>
            Summits, awards, trade shows, and monthly conversations bringing Canada’s business community together.
          </p>
          {" "}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {(v.events || []).length === 0 ? (
              <p style={{ fontSize: "15px", color: "#667085" }}>New events will be announced soon.</p>
            ) : null}
            {(v.events || []).map((ev: any) => (
              <article key={ev.slug} data-evp-card="true" style={{ display: "grid", gridTemplateColumns: "210px minmax(0,1fr)", gap: "24px", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", alignItems: "stretch" }} className="h_da5fcc5">
                <div data-evp-media="true" style={{ width: "210px", height: "280px", overflow: "hidden" }}>
                  <Slot src={ev.img} alt={ev.imgAlt} shape="rect" placeholder={ev.name} style={{ aspectRatio: "auto" }} />
                </div>
                <div style={{ padding: "24px 24px 24px 0", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", minWidth: "0" }}>
                  <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4A72C" }}>
                    {ev.kicker}
                  </span>
                  <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "24px", lineHeight: "1.2" }}>
                    <a href={u(ev.href)} style={{ color: "#101828" }} className="h_1dd7993">
                      {ev.name}
                    </a>
                  </h2>
                  <p style={{ fontSize: "15px", lineHeight: "1.65", color: "#667085" }}>
                    {ev.desc}
                  </p>
                  <a href={u(ev.href)} style={{ alignSelf: "flex-start", marginTop: "6px", padding: "11px 20px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13.5px" }} className="h_900112d">
                    Event details
                  </a>
                </div>
              </article>
            ))}
          </div>
          {" "}
          <div style={{ marginTop: "36px" }}>
            <a href={u("#event-partner")} style={{ padding: "14px 22px", borderRadius: "8px", border: "1.5px solid #101828", color: "#101828", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_a3b515a">
              Become an Event Partner
            </a>
          </div>
          {" "}
        </div>
      </div>
    </>
  )
}
