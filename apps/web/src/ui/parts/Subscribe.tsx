'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Subscribe() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.subscribeDisplay }}>
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
              Subscribe
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "52px", alignItems: "center" }}>
          {" "}
          <div>
            {" "}
            <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
              Newsletter
            </span>
            {" "}
            <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(30px,3.4vw,44px)", lineHeight: "1.1", marginBottom: "16px" }}>
              Canadian Business Insights, Delivered to Your Inbox
            </h1>
            {" "}
            <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#667085", maxWidth: "52ch", marginBottom: "26px" }}>
              Join Canada’s small business community and receive the latest articles, interviews, event announcements, magazine editions, funding opportunities, and practical resources.
            </p>
            {" "}
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "15.5px", color: "#475467" }}>
              {" "}
              <li style={{ display: "flex", gap: "10px" }}>
                <span style={{ color: "#D71920" }}>
                  ✓
                </span>
                The weekly briefing, every Tuesday
              </li>
              {" "}
              <li style={{ display: "flex", gap: "10px" }}>
                <span style={{ color: "#D71920" }}>
                  ✓
                </span>
                Each new magazine edition, free
              </li>
              {" "}
              <li style={{ display: "flex", gap: "10px" }}>
                <span style={{ color: "#D71920" }}>
                  ✓
                </span>
                Funding deadlines before they close
              </li>
              {" "}
              <li style={{ display: "flex", gap: "10px" }}>
                <span style={{ color: "#D71920" }}>
                  ✓
                </span>
                Early access to event registration
              </li>
              {" "}
            </ul>
            {" "}
          </div>
          {" "}
          <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "32px", background: "#F4F6F8", textAlign: "center" }}>
            {" "}
            <p style={{ fontSize: "15.5px", lineHeight: "1.7", color: "#475467", marginBottom: "20px" }}>
              Complete the sign-up form on the homepage — province and business stage help us tailor what you receive.
            </p>
            {" "}
            <a href={u("#newsletter-form")} style={{ display: "inline-block", padding: "15px 26px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_900112d">
              Open the sign-up form
            </a>
            {" "}
            <p style={{ fontSize: "12.5px", color: "#98A2B3", marginTop: "14px" }}>
              Free to join. No spam. Unsubscribe anytime.
            </p>
            {" "}
          </div>
          {" "}
        </div>
      </div>
    </>
  )
}
