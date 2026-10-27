'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Chrome() {
  const v = useV()
  return (
    <>
      <a href={u("#main")} style={{ position: "absolute", left: "-9999px", top: "0", background: "#101828", color: "#fff", padding: "10px 16px", zIndex: "200" }}>
        Skip to main content
      </a>
      <div style={{ background: "#101828", color: "#C8CDD6", fontSize: "12.5px", letterSpacing: "0.01em" }}>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "9px 24px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          {" "}
          <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", color: "#fff" }}>
            {v.today}
          </span>
          {" "}
          <span style={{ width: "1px", height: "14px", background: "#33394A" }} />
          {" "}
          <span>
            Canada’s leading platform for small business insights
          </span>
          {" "}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "14px" }}>
            {" "}
            <a href={u(v.social?.linkedin || '#')} target="_blank" rel="noopener" aria-label="CanadianSME on LinkedIn" style={{ color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11.5px" }} className="h_1f6476f">
              in
            </a>
            {" "}
            <a href={u(v.social?.youtube || '#')} target="_blank" rel="noopener" aria-label="CanadianSME on YouTube" style={{ color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11.5px" }} className="h_1f6476f">
              YT
            </a>
            {" "}
            <a href={u(v.social?.instagram || '#')} target="_blank" rel="noopener" aria-label="CanadianSME on Instagram" style={{ color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11.5px" }} className="h_1f6476f">
              IG
            </a>
            {" "}
            <a href={u(v.social?.facebook || '#')} target="_blank" rel="noopener" aria-label="CanadianSME on Facebook" style={{ color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11.5px" }} className="h_1f6476f">
              FB
            </a>
            {" "}
            <a href={u(v.social?.x || '#')} target="_blank" rel="noopener" aria-label="CanadianSME on X" style={{ color: "#C8CDD6", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "11.5px" }} className="h_1f6476f">
              X
            </a>
            {" "}
            <span style={{ width: "1px", height: "14px", background: "#33394A" }} />
            {" "}
            <button type="button" onClick={v.focusSearch} aria-label="Search articles" style={{ background: "none", border: "0", color: "#C8CDD6", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", padding: "0", fontSize: "12px" }} className="h_ae64c6c">
              {" "}
              <span aria-hidden="true" style={{ display: "inline-block", width: "12px", height: "12px", border: "1.6px solid currentColor", borderRadius: "50%" }} />
              {" "}
              <span>
                Search
              </span>
              {" "}
            </button>
            {" "}
          </div>
          {" "}
        </div>
      </div>
      <header style={{ position: "sticky", top: "0", zIndex: "120", background: "#FFFFFF", borderBottom: "1px solid #E4E7EC", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
        {" "}
        <div ref={v.barRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: "24px", rowGap: "10px" }}>
          {" "}
          <a href={u("#home")} aria-label="CanadianSME Business Magazine — home" style={{ display: "flex", alignItems: "center", flexShrink: "0", textDecoration: "none" }} className="h_bba8105">
            {" "}
            <img fetchPriority="high" src="/assets/canadiansme-logo.png" alt="CanadianSME Business Magazine" style={{ height: "44px", width: "auto", display: "block" }} />
            {" "}
          </a>
          {" "}
          <nav aria-label="Main navigation" style={{ flex: v.navFlex, order: v.navOrder, minWidth: "0", overflowX: "auto", scrollbarWidth: "none", display: "flex", borderTop: v.navBorder, paddingTop: v.navPad }}>
            {" "}
            <ul style={{ display: "flex", alignItems: "center", gap: "0", flexWrap: "nowrap", marginLeft: v.navMl, whiteSpace: "nowrap" }}>
              {" "}
              <li>
                <a href={u("#home")} style={{ display: "block", padding: "8px 6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12.5px", color: "#002364", borderRadius: "6px" }} className="h_6ddf5e9">
                  Home
                </a>
              </li>
              {" "}
              <li>
                <a href={u("#latest")} style={{ display: "block", padding: "8px 6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12.5px", color: "#14181D", borderRadius: "6px" }} className="h_dfeecd6">
                  Latest
                </a>
              </li>
              {" "}
              <li data-mega="business" onMouseEnter={v.openMega}>
                <a href={u("#business")} style={{ display: "block", padding: "8px 6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12.5px", color: "#14181D", borderRadius: "6px" }} className="h_dfeecd6">
                  Business
                </a>
              </li>
              {" "}
              <li data-mega="technology" onMouseEnter={v.openMega}>
                <a href={u("#technology")} style={{ display: "block", padding: "8px 6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12.5px", color: "#14181D", borderRadius: "6px" }} className="h_dfeecd6">
                  Technology &amp; AI
                </a>
              </li>
              {" "}
              <li data-mega="about" onMouseEnter={v.openMega}>
                <a href={u("#about")} style={{ display: "block", padding: "8px 6px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "12.5px", color: "#14181D", borderRadius: "6px" }} className="h_dfeecd6">
                  About Us ▾
                </a>
              </li>
              {" "}
            </ul>
            {" "}
          </nav>
          {" "}
          <form role="search" onSubmit={v.hdrSubmit} style={{ position: "relative", flex: "0 1 240px", minWidth: "150px" }}>
            {" "}
            <label style={{ display: "flex", alignItems: "center", gap: "8px", height: "40px", padding: "0 12px", border: "1.5px solid #D0D5DD", borderRadius: "8px", background: "#F9FAFB" }} className="fw_fb531e9">
              {" "}
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "0 0 auto", color: "#5A6470" }}>
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              {" "}
              <input type="search" aria-label="Search CanadianSME" placeholder="Search the site" value={v.hdrQuery} onChange={v.hdrInput} onFocus={v.hdrFocus} onBlur={v.hdrBlur} onKeyDown={v.hdrKey} autoComplete="off" style={{ flex: "1", minWidth: "0", border: "0", background: "transparent", outline: "none", fontSize: "13.5px", color: "#14181D" }} />
              {" "}
            </label>
            {" "}
            <div style={{ display: v.hdrDropDisplay, position: "absolute", top: "calc(100% + 8px)", right: "0", width: "min(440px,92vw)", background: "#fff", border: "1px solid #E4E7EC", borderRadius: "12px", boxShadow: "0 18px 44px rgba(16,24,40,0.18)", overflow: "hidden", zIndex: "200" }}>
              {" "}
              {v.hdrSome ? (
                <>
                  {" "}
                  <ul style={{ display: "flex", flexDirection: "column", maxHeight: "420px", overflowY: "auto" }}>
                    {" "}
                    {(v.hdrHits || []).map((h: any, _i10: number) => (
                      <Fragment key={h?.key ?? h?.id ?? h?.slug ?? _i10}>
                        {" "}
                        <li>
                          <button type="button" onMouseDown={h?.go} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "3px", textAlign: "left", padding: "12px 16px", background: "#fff", border: "0", borderBottom: "1px solid #F2F4F7", cursor: "pointer" }} className="h_0a19fc9">
                            {" "}
                            <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                              {h?.kind}
                            </span>
                            {" "}
                            <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "14px", lineHeight: "1.35", color: "#14181D" }}>
                              {h?.title}
                            </span>
                            {" "}
                          </button>
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ul>
                  {" "}
                </>
              ) : null}
              {" "}
              {v.hdrNone ? (
                <>
                  <p style={{ padding: "16px", fontSize: "13.5px", color: "#5A6470" }}>
                    No matches yet — press Enter to search everything.
                  </p>
                </>
              ) : null}
              {" "}
              <button type="submit" style={{ width: "100%", padding: "12px 16px", background: "#F9FAFB", border: "0", borderTop: "1px solid #E4E7EC", textAlign: "left", cursor: "pointer", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13px", color: "#004FB8" }} className="h_9e87cbe">
                {v.hdrAll} →
              </button>
              {" "}
            </div>
            {" "}
          </form>
          {" "}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: "0", marginLeft: "auto" }}>
            {" "}
            <a href={u("#advertise-with-us")} style={{ padding: "8px 14px", borderRadius: "8px", border: "1.5px solid #1E5AA8", background: "#1E5AA8", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13px", whiteSpace: "nowrap" }} className="h_02a9d34">
              Advertise With Us
            </a>
            {" "}
            <a href={u("#newsletter")} style={{ padding: "9px 16px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13px", whiteSpace: "nowrap", boxShadow: "0 1px 2px rgba(215,25,32,0.35)" }} className="h_900112d">
              Subscribe Free
            </a>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div onMouseLeave={v.closeMega} style={{ display: v.megaDisplay, borderTop: "1px solid #E4E7EC", background: "#fff", boxShadow: "0 18px 32px rgba(16,24,40,0.10)" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 24px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "28px" }}>
            {" "}
            {(v.megaCols || []).map((col: any, _i6: number) => (
              <Fragment key={col?.key ?? col?.id ?? col?.slug ?? _i6}>
                {" "}
                <div>
                  {" "}
                  <h3 style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "12px" }}>
                    {col?.heading}
                  </h3>
                  {" "}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "14px" }}>
                    {" "}
                    {(col?.links || []).map((link: any, _i10: number) => (
                      <Fragment key={link?.key ?? link?.id ?? link?.slug ?? _i10}>
                        {" "}
                        <li>
                          <a href={u(link?.href)} style={{ color: "#14181D" }} className="h_9e87cbe">
                            {link?.label}
                          </a>
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
              </Fragment>
            ))}
            {" "}
            <div style={{ background: "#F4F6F8", border: "1px solid #E4E7EC", borderRadius: "10px", padding: "16px", display: "flex", gap: "14px", alignItems: "center" }}>
              {" "}
              <div style={{ width: "86px", height: "86px", flexShrink: "0", borderRadius: "8px", background: "#101828", display: "flex", alignItems: "center", justifyContent: "center", color: "#7FA3E8", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.1em" }}>
                {v.megaBadge}
              </div>
              {" "}
              <div>
                {" "}
                <span style={{ display: "inline-block", fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "10px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364", marginBottom: "6px" }}>
                  Editor’s Pick
                </span>
                {" "}
                <a href={u(v.megaFeaturedHref)} style={{ display: "block", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "16px", lineHeight: "1.25", color: "#14181D" }} className="h_9e87cbe">
                  {v.megaFeatured}
                </a>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
      </header>
      <div onClick={v.closeDrawer} style={{ display: v.drawerDisplay, position: "fixed", inset: "0", zIndex: "150", background: "rgba(16,24,40,0.55)" }}>
        {" "}
        <div role="dialog" aria-label="Site menu" onMouseEnter={v.stayDrawer} onMouseLeave={v.leaveDrawer} style={{ position: "absolute", top: "0", right: "0", height: "100%", width: "min(360px,86vw)", background: "#fff", padding: "22px", overflowY: "auto", boxShadow: "-8px 0 40px rgba(16,24,40,0.3)" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            {" "}
            <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "16px" }}>
              Menu
            </span>
            {" "}
            <button type="button" onClick={v.closeDrawer} aria-label="Close menu" style={{ background: "none", border: "0", fontSize: "22px", cursor: "pointer", color: "#5A6470" }}>
              ×
            </button>
            {" "}
          </div>
          {" "}
          <ul style={{ display: "flex", flexDirection: "column", gap: "2px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15px" }}>
            {" "}
            <li>
              <a href={u("#home")} style={{ display: "block", padding: "11px 8px", borderBottom: "1px solid #F0F2F5", color: "#14181D" }}>
                Home
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#latest")} style={{ display: "block", padding: "11px 8px", borderBottom: "1px solid #F0F2F5", color: "#14181D" }}>
                Latest
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#business")} style={{ display: "block", padding: "11px 8px", borderBottom: "1px solid #F0F2F5", color: "#14181D" }}>
                Business
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#technology")} style={{ display: "block", padding: "11px 8px", borderBottom: "1px solid #F0F2F5", color: "#14181D", fontSize: "15px" }}>
                Technology &amp; AI
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#about")} style={{ display: "block", padding: "11px 8px", borderBottom: "1px solid #F0F2F5", color: "#14181D", fontSize: "15px" }}>
                About Us
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#podcast")} style={{ display: "block", padding: "9px 8px 9px 22px", borderBottom: "1px solid #F0F2F5", color: "#475467", fontSize: "14px" }}>
                Podcast
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#events")} style={{ display: "block", padding: "9px 8px 9px 22px", borderBottom: "1px solid #F0F2F5", color: "#475467", fontSize: "14px" }}>
                Events
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#resources")} style={{ display: "block", padding: "9px 8px 9px 22px", borderBottom: "1px solid #F0F2F5", color: "#475467", fontSize: "14px" }}>
                Resources
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#magazine")} style={{ display: "block", padding: "9px 8px 9px 22px", borderBottom: "1px solid #F0F2F5", color: "#475467", fontSize: "14px" }}>
                Magazine
              </a>
            </li>
            {" "}
            <li>
              <a href={u("#advertise-with-us")} style={{ display: "block", padding: "9px 8px 9px 22px", borderBottom: "1px solid #F0F2F5", color: "#475467", fontSize: "14px" }}>
                Advertise With Us
              </a>
            </li>
            {" "}
          </ul>
          {" "}
          <a href={u("#newsletter")} onClick={v.closeDrawer} style={{ display: "block", textAlign: "center", marginTop: "18px", padding: "13px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700" }}>
            Subscribe Free
          </a>
          {" "}
        </div>
      </div>
    </>
  )
}
