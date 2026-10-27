'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Contact() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.contactDisplay }}>
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
              Contact
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "56px", alignItems: "start" }}>
          {" "}
          <div>
            {" "}
            <h1 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(30px,3.4vw,44px)", lineHeight: "1.1", marginBottom: "16px", letterSpacing: "-0.025em" }}>
              Contact CanadianSME
            </h1>
            {" "}
            <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#5A6470", maxWidth: "48ch", marginBottom: "30px" }}>
              Story tips, partnership enquiries, event questions, or feedback on something we published — we read everything.
            </p>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "15px", lineHeight: "1.6", color: "#475467" }}>
              {" "}
              <div>
                <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470", marginBottom: "5px" }}>
                  Editorial
                </span>
                <a href={u("#submit")}>
                  editor@canadiansme.ca
                </a>
              </div>
              {" "}
              <div>
                <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470", marginBottom: "5px" }}>
                  Advertising
                </span>
                <a href={u("#advertise-with-us")}>
                  partners@canadiansme.ca
                </a>
              </div>
              {" "}
              <div>
                <span style={{ display: "block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470", marginBottom: "5px" }}>
                  Office
                </span>
                Toronto, Ontario, Canada
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <form onSubmit={v.onContact} noValidate={true} style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "14px" }}>
              {" "}
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#5A6470" }}>
                Name
                <input type="text" ref={v.cNameRef} style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14px" }} />
              </label>
              {" "}
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#5A6470" }}>
                Email
                <input type="email" ref={v.cEmailRef} style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14px" }} />
              </label>
              {" "}
            </div>
            {" "}
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#5A6470" }}>
              Reason for contact
              <select ref={v.cTopicRef} style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14px", background: "#fff" }}>
                <option value="">
                  Select a topic
                </option>
                <option>
                  Story tip or pitch
                </option>
                <option>
                  Advertising and partnerships
                </option>
                <option>
                  Events
                </option>
                <option>
                  Magazine subscription
                </option>
                <option>
                  Something else
                </option>
              </select>
            </label>
            {" "}
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#5A6470" }}>
              Message
              <textarea ref={v.cMsgRef} rows="5" style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14px", fontFamily: "inherit", resize: "vertical" }}>

              </textarea>
            </label>
            {" "}
            <span role="status" aria-live="polite" style={{ fontSize: "13px", fontWeight: "600", color: v.contactColor, minHeight: "18px" }}>
              {v.contactMessage}
            </span>
            {" "}
            <button type="submit" style={{ padding: "15px", borderRadius: "8px", border: "0", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "pointer" }} className="h_58d1318">
              Send message
            </button>
            {" "}
          </form>
          {" "}
        </div>
      </div>
    </>
  )
}
