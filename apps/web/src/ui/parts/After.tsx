'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function After() {
  const v = useV()
  return (
    <>
      <footer style={{ background: "#101828", color: "#C8CDD6" }}>
        {" "}
        <div style={{ borderBottom: "1px solid #33394A" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 24px", display: "flex", gap: "12px 26px", flexWrap: "wrap", alignItems: "baseline" }}>
            {" "}
            <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff" }}>
              Also from Cmarketing Inc.
            </span>
            {" "}
            <div style={{ display: "flex", gap: "10px 22px", flexWrap: "wrap" }}>
              {" "}
              {(v.sisterTitles || []).map((t: any, _i7: number) => (
                <Fragment key={t?.key ?? t?.id ?? t?.slug ?? _i7}>
                  {" "}
                  <a href={u(t?.href)} style={{ fontSize: "13px", color: "#98A2B3" }} className="h_1f6476f">
                    {t?.title}
                  </a>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 32px", display: "grid", gridTemplateColumns: "minmax(260px,1.4fr) repeat(auto-fit,minmax(150px,1fr))", gap: "40px" }}>
          {" "}
          <div>
            {" "}
            <div style={{ marginBottom: "18px", display: "inline-flex", background: "#fff", borderRadius: "8px", padding: "12px 16px" }}>
              {" "}
              <img loading="lazy" decoding="async" src="/assets/canadiansme-logo.png" alt="CanadianSME Business Magazine" style={{ height: "38px", width: "auto", display: "block" }} />
              {" "}
            </div>
            {" "}
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#98A2B3", maxWidth: "44ch", textWrap: "pretty", marginBottom: "18px" }}>
              Canada’s magazine for small business owners: practical news, guides and stories to help you start, run and grow.
            </p>
            {" "}
            <div style={{ display: "flex", gap: "10px" }}>
              {" "}
              <a href={u(v.social?.linkedin || '#')} target="_blank" rel="noopener" aria-label="LinkedIn" style={{ width: "34px", height: "34px", border: "1px solid #33394A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11px" }} className="h_9367d59">
                in
              </a>
              {" "}
              <a href={u(v.social?.youtube || '#')} target="_blank" rel="noopener" aria-label="YouTube" style={{ width: "34px", height: "34px", border: "1px solid #33394A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11px" }} className="h_9367d59">
                YT
              </a>
              {" "}
              <a href={u(v.social?.instagram || '#')} target="_blank" rel="noopener" aria-label="Instagram" style={{ width: "34px", height: "34px", border: "1px solid #33394A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11px" }} className="h_9367d59">
                IG
              </a>
              {" "}
              <a href={u(v.social?.facebook || '#')} target="_blank" rel="noopener" aria-label="Facebook" style={{ width: "34px", height: "34px", border: "1px solid #33394A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11px" }} className="h_9367d59">
                FB
              </a>
              {" "}
              <a href={u(v.social?.x || '#')} target="_blank" rel="noopener" aria-label="X" style={{ width: "34px", height: "34px", border: "1px solid #33394A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11px" }} className="h_9367d59">
                X
              </a>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div>
            {" "}
            <h3 style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", marginBottom: "14px" }}>
              Explore
            </h3>
            {" "}
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
              {" "}
              <li>
                <a href={u("#latest")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Latest Articles
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#magazine")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Magazine
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#podcast")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Podcast
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#events")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Events
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#resources")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Business Resources
                </a>
              </li>
              {" "}
            </ul>
            {" "}
          </div>
          {" "}
          <div>
            {" "}
            <h3 style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", marginBottom: "14px" }}>
              Company
            </h3>
            {" "}
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
              {" "}
              <li>
                <a href={u("#about")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  About CanadianSME
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#contributors")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Contributors
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#careers")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Careers
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#contact")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Contact Us
                </a>
              </li>
              {" "}
            </ul>
            {" "}
          </div>
          {" "}
          <div>
            {" "}
            <h3 style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", marginBottom: "14px" }}>
              Work With Us
            </h3>
            {" "}
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
              {" "}
              <li>
                <a href={u("#advertise-with-us")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Advertise With Us
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#become-partner")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Become a Partner
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#sponsored")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Sponsored Content
                </a>
              </li>
              {" "}
              <li>
                <a href={u(v.mediaKitHref)} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Media Kit
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#submit")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Submit a Story
                </a>
              </li>
              {" "}
            </ul>
            {" "}
          </div>
          {" "}
          <div>
            {" "}
            <h3 style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", marginBottom: "14px" }}>
              Community
            </h3>
            {" "}
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
              {" "}
              <li>
                <a href={u("#summit")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Small Business Summit
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#awards")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Small Business Awards
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#show")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  Small Business Show
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#community")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                  SME Community
                </a>
              </li>
              {" "}
            </ul>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ borderTop: "1px solid #262E44" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "#667085" }}>
            {" "}
            <span>
              © 2026 CanadianSME Small Business Magazine. All rights reserved.
            </span>
            {" "}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {" "}
              <a href={u("#privacy")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                Privacy Policy
              </a>
              {" "}
              <a href={u("#terms")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                Terms and Conditions
              </a>
              {" "}
              <a href={u("#terms-of-use")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                Terms of Use
              </a>
              {" "}
              <a href={u("#sitemap")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                Sitemap
              </a>
              {" "}
              <a href={u("#accessibility")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                Accessibility
              </a>
              {" "}
              <a href={u("#editorial")} style={{ color: "#98A2B3" }} className="h_1f6476f">
                Editorial Policy
              </a>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
      </footer>
      <button type="button" onClick={v.goBack} aria-label="Go back to the previous page" style={{ position: "fixed", left: "20px", top: "50%", transform: "translateY(-50%)", zIndex: "60", display: v.backDisplay, alignItems: "center", gap: "8px", padding: "12px 18px 12px 14px", borderRadius: "999px", border: "0", background: "#101828", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "14px", cursor: "pointer", boxShadow: "0 10px 24px rgba(16,24,40,0.28)" }} className="h_cc7d4fa">
        <span aria-hidden="true" style={{ fontSize: "18px", lineHeight: "1" }}>
          ←
        </span>
        Back
      </button>
      <button type="button" onClick={v.toTop} aria-label="Back to top of homepage" title="Back to top" style={{ position: "fixed", right: "24px", bottom: "24px", zIndex: "60", width: "52px", height: "52px", borderRadius: "50%", border: "0", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontSize: "22px", lineHeight: "1", cursor: "pointer", boxShadow: "0 10px 24px rgba(16,24,40,0.28)", display: "flex", alignItems: "center", justifyContent: "center", opacity: v.topOpacity, pointerEvents: v.topEvents, transform: `translateY(${v.topShift ?? ""})`, transition: "opacity .2s ease,transform .2s ease" }} className="h_58d1318">
        ↑
      </button>
      <div role="dialog" aria-modal="true" aria-labelledby="pop-heading" onClick={v.closePopBg} style={{ display: v.popDisplay, position: "fixed", inset: "0", zIndex: "80", background: "rgba(16,24,40,0.62)", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        {" "}
        <div data-pop-card="1" style={{ position: "relative", width: "100%", maxWidth: "780px", maxHeight: "calc(100vh - 40px)", overflow: "auto", background: "#fff", borderRadius: "14px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
          {" "}
          <button type="button" onClick={v.closePop} aria-label="Close" style={{ position: "absolute", top: "12px", right: "12px", zIndex: "2", width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "#F4F6F8", color: "#14181D", fontSize: "20px", cursor: "pointer" }} className="h_06545b1">
            ×
          </button>
          {" "}
          <div style={{ background: "#101828", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
            {" "}
            <img loading="lazy" decoding="async" src="/assets/covers/issue-93-aug-2026.png" alt="CanadianSME Small Business Magazine cover" style={{ width: "100%", maxWidth: "220px", height: "auto", display: "block", borderRadius: "6px", boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }} />
            {" "}
          </div>
          {" "}
          <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {" "}
            <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
              Free for Canadian business owners
            </span>
            {" "}
            <h2 id="pop-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "26px", lineHeight: "1.2", letterSpacing: "-0.015em", color: "#14181D", textWrap: "pretty" }}>
              Get the Magazine and the Tuesday Briefing
            </h2>
            {" "}
            <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#475467", textWrap: "pretty" }}>
              Each new issue of CanadianSME Small Business Magazine, plus a weekly email with CRA deadlines and grant intakes.
            </p>
            {" "}
            {v.popDone ? (
              <>
                {" "}
                <p role="status" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16px", lineHeight: "1.5", color: "#067647", padding: "14px 0" }}>
                  You’re subscribed. Watch your inbox on Tuesday.
                </p>
                {" "}
              </>
            ) : null}
            {" "}
            {v.popForm ? (
              <>
                {" "}
                <form onSubmit={v.onPopSubmit} noValidate={true} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                  {" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
                    Email address{" "}
                    <input type="email" ref={v.popEmailRef} autoComplete="email" placeholder="you@yourbusiness.ca" style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14.5px", color: "#14181D" }} />
                    {" "}
                  </label>
                  {" "}
                  <label style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: "#14181D" }}>
                    <input type="checkbox" ref={v.popMagRef} defaultChecked={true} style={{ width: "17px", height: "17px", accentColor: "#D71920" }} />
                    Magazine — every new issue
                  </label>
                  {" "}
                  <label style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "14px", color: "#14181D" }}>
                    <input type="checkbox" ref={v.popNewsRef} defaultChecked={true} style={{ width: "17px", height: "17px", accentColor: "#D71920" }} />
                    Newsletter — the Tuesday Briefing
                  </label>
                  {" "}
                  <span role="status" aria-live="polite" style={{ fontSize: "13px", fontWeight: "600", color: "#B42318", minHeight: "18px" }}>
                    {v.popMsg}
                  </span>
                  {" "}
                  <button type="submit" style={{ padding: "14px", borderRadius: "8px", border: "0", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "pointer" }} className="h_58d1318">
                    Subscribe free
                  </button>
                  {" "}
                  <button type="button" onClick={v.closePop} style={{ background: "none", border: "0", padding: "4px", fontSize: "13px", color: "#5A6470", cursor: "pointer", textDecoration: "underline" }}>
                    {v.popSkip}
                  </button>
                  {" "}
                  <span style={{ fontSize: "12px", lineHeight: "1.5", color: "#5A6470" }}>
                    No spam. Unsubscribe anytime. See our{" "}
                    <a href={u("#privacy")} style={{ color: "#5A6470", textDecoration: "underline" }}>
                      privacy policy
                    </a>
                    .
                  </span>
                  {" "}
                </form>
                {" "}
              </>
            ) : null}
            {" "}
          </div>
          {" "}
        </div>
      </div>
      <div role="dialog" aria-modal="true" aria-labelledby="gate-heading" onClick={v.closeGateBg} style={{ display: v.gateDisplay, position: "fixed", inset: "0", zIndex: "85", background: "rgba(16,24,40,0.62)", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        {" "}
        <div style={{ position: "relative", width: "100%", maxWidth: "560px", maxHeight: "calc(100vh - 40px)", overflow: "auto", background: "#fff", borderRadius: "14px", padding: "36px 32px", boxShadow: "0 30px 70px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", gap: "14px" }}>
          {" "}
          <button type="button" onClick={v.closeGate} aria-label="Close" style={{ position: "absolute", top: "12px", right: "12px", width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "#F4F6F8", color: "#14181D", fontSize: "20px", cursor: "pointer" }} className="h_06545b1">
            ×
          </button>
          {" "}
          <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
            Free {v.gateKind}
          </span>
          {" "}
          <h2 id="gate-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "24px", lineHeight: "1.2", color: "#14181D", paddingRight: "40px", textWrap: "pretty", letterSpacing: "-0.015em" }}>
            {v.gateTitle}
          </h2>
          {" "}
          <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#475467", textWrap: "pretty" }}>
            {v.gateDesc}
          </p>
          {" "}
          {v.gateDone ? (
            <>
              {" "}
              <div role="status" style={{ display: "flex", flexDirection: "column", gap: "14px", paddingTop: "6px" }}>
                {" "}
                <p style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "16px", lineHeight: "1.5", color: "#067647" }}>
                  Thanks, {v.gateName}. Your download is ready.
                </p>
                {" "}
                <a href={u(v.gateHref)} onClick={v.closeGate} style={{ display: "inline-flex", justifyContent: "center", padding: "14px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_900112d">
                  ↓ Download now
                </a>
                {" "}
                <span style={{ fontSize: "12.5px", color: "#5A6470" }}>
                  We’ve also emailed you a copy of the link.
                </span>
                {" "}
              </div>
              {" "}
            </>
          ) : null}
          {" "}
          {v.gateForm ? (
            <>
              {" "}
              <form onSubmit={v.onGateSubmit} noValidate={true} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "12px" }}>
                  {" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
                    First name
                    <input type="text" ref={v.gFirstRef} autoComplete="given-name" style={{ padding: "11px 13px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14.5px", color: "#14181D", background: "#fff", fontFamily: "inherit" }} />
                  </label>
                  {" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
                    Last name
                    <input type="text" ref={v.gLastRef} autoComplete="family-name" style={{ padding: "11px 13px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14.5px", color: "#14181D", background: "#fff", fontFamily: "inherit" }} />
                  </label>
                  {" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
                    Work email
                    <input type="email" ref={v.gEmailRef} autoComplete="email" style={{ padding: "11px 13px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14.5px", color: "#14181D", background: "#fff", fontFamily: "inherit" }} />
                  </label>
                  {" "}
                  <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
                    Business name
                    <input type="text" ref={v.gBizRef} autoComplete="organization" style={{ padding: "11px 13px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14.5px", color: "#14181D", background: "#fff", fontFamily: "inherit" }} />
                  </label>
                  {" "}
                </div>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12px", color: "#475467" }}>
                  Province or territory
                  <select ref={v.gProvRef} style={{ padding: "11px 13px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14.5px", color: "#14181D", background: "#fff", fontFamily: "inherit" }}>
                    <option value="">
                      Select
                    </option>
                    <option>
                      Alberta
                    </option>
                    <option>
                      British Columbia
                    </option>
                    <option>
                      Manitoba
                    </option>
                    <option>
                      New Brunswick
                    </option>
                    <option>
                      Newfoundland and Labrador
                    </option>
                    <option>
                      Nova Scotia
                    </option>
                    <option>
                      Ontario
                    </option>
                    <option>
                      Prince Edward Island
                    </option>
                    <option>
                      Quebec
                    </option>
                    <option>
                      Saskatchewan
                    </option>
                    <option>
                      Northwest Territories
                    </option>
                    <option>
                      Nunavut
                    </option>
                    <option>
                      Yukon
                    </option>
                  </select>
                </label>
                {" "}
                <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", lineHeight: "1.5", color: "#475467" }}>
                  <input type="checkbox" ref={v.gNewsRef} defaultChecked={true} style={{ marginTop: "2px", width: "16px", height: "16px", accentColor: "#D71920" }} />
                  Also send me the Tuesday Briefing newsletter. Unsubscribe anytime.
                </label>
                {" "}
                <span role="status" aria-live="polite" style={{ fontSize: "13px", fontWeight: "600", color: "#B42318", minHeight: "18px" }}>
                  {v.gateMsg}
                </span>
                {" "}
                <button type="submit" style={{ padding: "14px", borderRadius: "8px", border: "0", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "pointer" }} className="h_58d1318">
                  Get the free download
                </button>
                {" "}
                <span style={{ fontSize: "12px", lineHeight: "1.5", color: "#5A6470" }}>
                  By downloading you agree to our{" "}
                  <a href={u("#terms")} style={{ color: "#5A6470", textDecoration: "underline" }}>
                    terms
                  </a>
                  {" "}and{" "}
                  <a href={u("#privacy")} style={{ color: "#5A6470", textDecoration: "underline" }}>
                    privacy policy
                  </a>
                  .
                </span>
                {" "}
              </form>
              {" "}
            </>
          ) : null}
          {" "}
        </div>
      </div>
      <div role="dialog" aria-modal="true" aria-labelledby="offer-heading" onClick={v.closeOfferBg} style={{ display: v.offerDisplay, position: "fixed", inset: "0", zIndex: "86", background: "rgba(16,24,40,0.62)", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        {" "}
        <div style={{ position: "relative", width: "100%", maxWidth: "480px", background: "#fff", borderRadius: "14px", padding: "34px 30px", boxShadow: "0 30px 70px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", gap: "14px" }}>
          {" "}
          <button type="button" onClick={v.closeOffer} aria-label="Close" style={{ position: "absolute", top: "12px", right: "12px", width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "#F4F6F8", color: "#14181D", fontSize: "20px", cursor: "pointer" }} className="h_06545b1">
            ×
          </button>
          {" "}
          <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
            {v.offerPartner} · Reader offer
          </span>
          {" "}
          <h2 id="offer-heading" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "22px", lineHeight: "1.25", color: "#14181D", paddingRight: "40px", textWrap: "pretty" }}>
            {v.offerTitle}
          </h2>
          {" "}
          {v.offerDone ? (
            <>
              {" "}
              <div role="status" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {" "}
                <span style={{ fontSize: "14px", color: "#475467" }}>
                  Your code
                </span>
                {" "}
                <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "26px", letterSpacing: "0.08em", padding: "16px", border: "2px dashed #D71920", borderRadius: "10px", textAlign: "center", color: "#14181D" }}>
                  {v.offerCode}
                </span>
                {" "}
                <a href={u(v.offerHref)} target="_blank" rel="noopener" style={{ display: "flex", justifyContent: "center", padding: "14px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_900112d">
                  Go to {v.offerPartner} ↗
                </a>
                {" "}
                <span style={{ fontSize: "12.5px", color: "#5A6470" }}>
                  We’ve also emailed the code to you.
                </span>
                {" "}
              </div>
              {" "}
            </>
          ) : null}
          {" "}
          {v.offerForm ? (
            <>
              {" "}
              <form onSubmit={v.onOfferSubmit} noValidate={true} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#475467" }}>
                  Enter your email to unlock the code. You’ll also get the Tuesday Briefing — unsubscribe anytime.
                </p>
                {" "}
                <input type="email" ref={v.offerEmailRef} autoComplete="email" placeholder="you@yourbusiness.ca" aria-label="Email address" style={{ padding: "12px 14px", borderRadius: "8px", border: "1.5px solid #D0D5DD", fontSize: "14.5px", color: "#14181D", fontFamily: "inherit" }} />
                {" "}
                <span role="status" aria-live="polite" style={{ fontSize: "13px", fontWeight: "600", color: "#B42318", minHeight: "18px" }}>
                  {v.offerMsg}
                </span>
                {" "}
                <button type="submit" style={{ padding: "14px", borderRadius: "8px", border: "0", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "pointer" }} className="h_58d1318">
                  Unlock code
                </button>
                {" "}
              </form>
              {" "}
            </>
          ) : null}
          {" "}
        </div>
      </div>
    </>
  )
}
