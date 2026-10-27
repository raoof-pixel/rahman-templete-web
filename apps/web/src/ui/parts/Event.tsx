'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Event() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.eventDisplay }}>
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
            <a href={u("#events")} style={{ color: "#667085" }} className="h_1dd7993">
              Events
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#101828" }}>
              {v.eventName}
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ height: "min(40vw,400px)", position: "relative" }}>
          <Slot src={v.event?.img} alt={v.event?.imgAlt} shape="rect" placeholder="Event photography" style={{ aspectRatio: "auto" }} />
        </div>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 72px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: "48px", alignItems: "start" }}>
          {" "}
          <div>
            {" "}
            <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
              CanadianSME Event
            </span>
            {" "}
            <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(30px,3.4vw,44px)", lineHeight: "1.1", marginBottom: "18px" }}>
              {v.eventName}
            </h1>
            {" "}
            <div style={{ maxWidth: "68ch", fontSize: "17px", lineHeight: "1.75", color: "#1D2939", display: "flex", flexDirection: "column", gap: "18px" }}>
              {" "}
              <p>
                {v.event?.intro || v.event?.desc}
              </p>
              {" "}
              <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "25px", marginTop: "8px" }}>
                What to expect
              </h2>
              {" "}
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "16px", color: "#475467" }}>
                {(v.event?.expect || []).map((t: string, i: number) => (
                  <li key={i} style={{ display: "flex", gap: "10px" }}>
                    <span style={{ color: "#D71920" }}>
                      —
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <aside style={{ position: "sticky", top: "96px", border: "1px solid #E4E7EC", borderRadius: "10px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px", color: "#475467" }}>
              {" "}
              <div>
                <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "4px" }}>
                  Date
                </span>
                {v.event?.dateText}
              </div>
              {" "}
              <div>
                <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "4px" }}>
                  Location
                </span>
                {v.event?.venue}
                {v.event?.address ? <span style={{ display: "block", fontSize: "13px", color: "#667085" }}>{v.event.address}</span> : null}
              </div>
              {" "}
              {v.event?.admission ? (
              <div>
                <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "4px" }}>
                  Admission
                </span>
                {v.event.admission}
              </div>
              ) : null}
              {" "}
            </div>
            {" "}
            <a href={u(v.event?.registerUrl || '#')} target={v.event?.registerUrl?.startsWith('http') ? '_blank' : undefined} rel="noopener" style={{ textAlign: "center", padding: "14px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_900112d">
              Register now
            </a>
            {" "}
            <a href={u(v.event?.partnerUrl || '#event-partner')} style={{ textAlign: "center", padding: "14px", borderRadius: "8px", border: "1.5px solid #101828", color: "#101828", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_a3b515a">
              Partner with us
            </a>
            {" "}
          </aside>
          {" "}
        </div>
      </div>
    </>
  )
}
