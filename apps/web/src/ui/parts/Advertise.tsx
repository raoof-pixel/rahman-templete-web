'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Advertise() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.advertisingDisplay }}>
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
              Advertise With Us
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <section aria-labelledby="adv-h1" style={{ background: "#101828", color: "#fff", overflow: "hidden" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "56px", alignItems: "center" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#F59E9E", marginBottom: "0" }}>
                Advertise With Us
              </span>
              {" "}
              <h1 id="adv-h1" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(34px,4.2vw,56px)", lineHeight: "1.06", letterSpacing: "-0.025em", textWrap: "balance" }}>
                Connect Your Brand with Canada’s Small Business Community
              </h1>
              {" "}
              <p style={{ fontSize: "18px", lineHeight: "1.7", color: "#D0D5DD", maxWidth: "54ch", textWrap: "pretty" }}>
                Reach entrepreneurs, business owners and decision-makers through CanadianSME’s digital magazine, website, newsletters, podcasts and business events.
              </p>
              {" "}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginTop: "6px" }}>
                {" "}
                <button type="button" onClick={v.advToForm} style={{ padding: "15px 24px", borderRadius: "8px", border: "0", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "pointer" }} className="h_58d1318 f_f7775c6">
                  Request a Campaign Proposal
                </button>
                {" "}
                {v.advKitReady ? (
                  <>
                    <a href={u(v.advKitUrl)} target="_blank" rel="noopener" style={{ padding: "14px 22px", borderRadius: "8px", border: "1.5px solid rgba(255,255,255,0.55)", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_44a8d48">
                      Download Media Kit
                    </a>
                  </>
                ) : null}
                {" "}
                {v.advKitMissing ? (
                  <>
                    <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <button type="button" disabled={true} aria-describedby="adv-kit-note-1" style={{ padding: "14px 22px", borderRadius: "8px", border: "1.5px solid rgba(255,255,255,0.3)", background: "transparent", color: "#98A2B3", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "not-allowed" }}>
                        Download Media Kit
                      </button>
                      <span id="adv-kit-note-1" style={{ fontSize: "12.5px", color: "#98A2B3" }}>
                        Updated media kit coming soon
                      </span>
                    </span>
                  </>
                ) : null}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div aria-hidden="true" style={{ position: "relative", height: "clamp(320px,38vw,460px)", maxWidth: "520px", width: "100%", justifySelf: "center" }}>
              {" "}
              <div style={{ position: "absolute", left: "0", top: "12%", width: "46%", aspectRatio: "3/4", borderRadius: "8px", overflow: "hidden", transform: "rotate(-6deg)", boxShadow: "0 24px 48px rgba(0,0,0,0.45)", opacity: "0.9" }}>
                <img src="/assets/covers/issue-87-feb-2026.png" alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {" "}
              <div style={{ position: "absolute", right: "0", top: "12%", width: "46%", aspectRatio: "3/4", borderRadius: "8px", overflow: "hidden", transform: "rotate(6deg)", boxShadow: "0 24px 48px rgba(0,0,0,0.45)", opacity: "0.9" }}>
                <img src="/assets/covers/issue-84-nov-2025.png" alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {" "}
              <div style={{ position: "absolute", left: "24%", top: "0", width: "52%", aspectRatio: "3/4", borderRadius: "10px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
                <img src="/assets/covers/issue-93-aug-2026.png" alt="" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="adv-aud-h" style={{ background: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px" }}>
            {" "}
            <div style={{ maxWidth: "680px", marginBottom: "40px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                Audience
              </span>
              {" "}
              <h2 id="adv-aud-h" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.02em", textWrap: "pretty", marginBottom: "14px" }}>
                Reach the People Building Canadian Business
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                CanadianSME is written for the owners and operators who run Canada’s small and medium-sized businesses, and for the people who start and grow them.
              </p>
              {" "}
            </div>
            {" "}
            <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))", gap: "16px" }}>
              {" "}
              {(v.advAudience || []).map((a: any, _i7: number) => (
                <Fragment key={a?.key ?? a?.id ?? a?.slug ?? _i7}>
                  {" "}
                  <li style={{ borderTop: "3px solid #1E5AA8", background: "#F4F6F8", borderRadius: "0 0 10px 10px", padding: "22px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {" "}
                    <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16.5px", lineHeight: "1.3", color: "#101828", textWrap: "pretty" }}>
                      {a?.t}
                    </span>
                    {" "}
                    <span style={{ fontSize: "14px", lineHeight: "1.6", color: "#667085", textWrap: "pretty" }}>
                      {a?.d}
                    </span>
                    {" "}
                  </li>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </ul>
            {" "}
            {v.advHasMetrics ? (
              <>
                {" "}
                <dl style={{ margin: "40px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "16px" }}>
                  {" "}
                  {(v.advMetrics || []).map((m: any, _i9: number) => (
                    <Fragment key={m?.key ?? m?.id ?? m?.slug ?? _i9}>
                      {" "}
                      <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "22px", display: "flex", flexDirection: "column-reverse", gap: "6px" }}>
                        <dt style={{ fontSize: "14px", lineHeight: "1.5", color: "#475467" }}>
                          {m?.label}
                          <span style={{ display: "block", fontSize: "12px", color: "#667085", marginTop: "4px" }}>
                            {m?.source}
                          </span>
                        </dt>
                        <dd style={{ margin: "0", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "32px", lineHeight: "1.1", color: "#101828" }}>
                          {m?.value}
                        </dd>
                      </div>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </dl>
                {" "}
              </>
            ) : null}
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section id="adv-options" aria-labelledby="adv-opt-h" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px" }}>
            {" "}
            <div style={{ maxWidth: "680px", marginBottom: "40px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                Advertising options
              </span>
              {" "}
              <h2 id="adv-opt-h" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.02em", textWrap: "pretty", marginBottom: "14px" }}>
                Choose the Right Channels for Your Campaign
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                Use one channel or combine several. Formats, timing and availability are confirmed with you during campaign planning.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "20px" }}>
              {" "}
              {(v.advOptions || []).map((o: any, _i7: number) => (
                <Fragment key={o?.key ?? o?.id ?? o?.slug ?? _i7}>
                  {" "}
                  <article style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: "12px", padding: "28px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
                    {" "}
                    <span aria-hidden="true" style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13px", color: "#1E5AA8", letterSpacing: "0.06em" }}>
                      {o?.n}
                    </span>
                    {" "}
                    <h3 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "19px", lineHeight: "1.3", color: "#101828", textWrap: "pretty" }}>
                      {o?.t}
                    </h3>
                    {" "}
                    <p style={{ fontSize: "15px", lineHeight: "1.65", color: "#475467", textWrap: "pretty" }}>
                      {o?.d}
                    </p>
                    {" "}
                    <button type="button" onClick={o?.enquire} aria-label={`Enquire about ${o?.t ?? ""}`} style={{ marginTop: "auto", alignSelf: "flex-start", padding: "6px 0", border: "0", background: "none", color: "#1E5AA8", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14.5px", cursor: "pointer", display: "inline-flex", gap: "6px", alignItems: "center" }} className="h_7bfc70e f_d9ff5e2">
                      Enquire About This Option{" "}
                      <span aria-hidden="true">
                        →
                      </span>
                    </button>
                    {" "}
                  </article>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="adv-goal-h" style={{ background: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "48px", alignItems: "start" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                Campaign objectives
              </span>
              {" "}
              <h2 id="adv-goal-h" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.02em", textWrap: "pretty", marginBottom: "14px" }}>
                Build a Campaign Around Your Goals
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#475467", textWrap: "pretty", marginBottom: "26px" }}>
                Tell us what you want to achieve. CanadianSME can develop a coordinated proposal that brings together suitable channels, campaign timing and creative formats.
              </p>
              {" "}
              <button type="button" onClick={v.advToFormIntegrated} style={{ alignSelf: "flex-start", padding: "15px 24px", borderRadius: "8px", border: "0", background: "#1E5AA8", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "pointer" }} className="h_636b15c f_d9ff5e2">
                Discuss Your Campaign
              </button>
              {" "}
            </div>
            {" "}
            <ol style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", borderTop: "1px solid #E4E7EC" }}>
              {" "}
              {(v.advGoals || []).map((g: any, _i7: number) => (
                <Fragment key={g?.key ?? g?.id ?? g?.slug ?? _i7}>
                  {" "}
                  <li style={{ display: "grid", gridTemplateColumns: "52px minmax(0,1fr)", gap: "16px", alignItems: "baseline", padding: "22px 0", borderBottom: "1px solid #E4E7EC" }}>
                    <span aria-hidden="true" style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "22px", color: "#D71920" }}>
                      {g?.n}
                    </span>
                    <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "18px", lineHeight: "1.35", color: "#101828" }}>
                      {g?.t}
                    </span>
                  </li>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </ol>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="adv-ex-h" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px" }}>
            {" "}
            <div style={{ maxWidth: "680px", marginBottom: "40px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                Campaign examples
              </span>
              {" "}
              <h2 id="adv-ex-h" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.02em", textWrap: "pretty", marginBottom: "14px" }}>
                Explore the Possibilities
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                Neutral previews of how each format can appear across CanadianSME. Select a preview to view it larger.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "24px" }}>
              {" "}
              {(v.advGallery || []).map((g: any, _i7: number) => (
                <Fragment key={g?.key ?? g?.id ?? g?.slug ?? _i7}>
                  {" "}
                  <figure style={{ margin: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {" "}
                    <button type="button" onClick={g?.open} aria-label={`View larger: ${g?.t ?? ""}, illustrative placement`} style={{ position: "relative", display: "block", width: "100%", padding: "0", border: "1px solid #D0D5DD", borderRadius: "10px", overflow: "hidden", background: "#fff", cursor: "zoom-in", boxShadow: "0 8px 20px rgba(16,24,40,0.06)" }} className="h_b12ac9b f_d9ff5e2">
                      {" "}
                      <div style={{ position: "relative", aspectRatio: "4/3", background: g?.bg, containerType: "inline-size" }}>
                        {" "}
                        {(g?.blocks || []).map((b: any, _i12: number) => (
                          <Fragment key={b?.key ?? b?.id ?? b?.slug ?? _i12}>
                            <div style={{ position: "absolute", left: b?.x, top: b?.y, width: b?.w, height: b?.h, background: b?.bg, borderRadius: b?.r, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: b?.fs, lineHeight: "1.15", color: b?.fg }}>
                              {b?.t}
                            </div>
                          </Fragment>
                        ))}
                        {" "}
                      </div>
                      {" "}
                      <span style={{ position: "absolute", left: "10px", top: "10px", padding: "4px 9px", borderRadius: "999px", background: "rgba(255,255,255,0.95)", border: "1px solid #D0D5DD", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#344054" }}>
                        Illustrative placement
                      </span>
                      {" "}
                    </button>
                    {" "}
                    <figcaption style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16px", color: "#101828" }}>
                        {g?.t}
                      </span>
                      <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#667085" }}>
                        {g?.d}
                      </span>
                    </figcaption>
                    {" "}
                  </figure>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        {v.advLbOn ? (
          <>
            {" "}
            <div onClick={v.advLbBackdrop} onKeyDown={v.advLbKey} style={{ position: "fixed", inset: "0", zIndex: "400", background: "rgba(16,24,40,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
              {" "}
              <div role="dialog" aria-modal="true" aria-labelledby="adv-lb-title" style={{ background: "#fff", borderRadius: "12px", width: "100%", maxWidth: "980px", maxHeight: "calc(100vh - 40px)", overflow: "auto", display: "flex", flexDirection: "column" }}>
                {" "}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "16px 20px", borderBottom: "1px solid #E4E7EC", flexWrap: "wrap" }}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <h2 id="adv-lb-title" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "18px", color: "#101828" }}>
                      {v.advLb?.t}
                    </h2>
                    <span style={{ fontSize: "12.5px", color: "#667085" }}>
                      Illustrative placement · {v.advLbCount}
                    </span>
                  </div>
                  {" "}
                  <div style={{ display: "flex", gap: "8px" }}>
                    {" "}
                    <button type="button" onClick={v.advLbPrev} aria-label="Previous example" style={{ width: "44px", height: "44px", borderRadius: "8px", border: "1px solid #D0D5DD", background: "#fff", fontSize: "18px", cursor: "pointer", color: "#101828" }} className="h_6bcb6d2 f_d9ff5e2">
                      ←
                    </button>
                    {" "}
                    <button type="button" onClick={v.advLbNext} aria-label="Next example" style={{ width: "44px", height: "44px", borderRadius: "8px", border: "1px solid #D0D5DD", background: "#fff", fontSize: "18px", cursor: "pointer", color: "#101828" }} className="h_6bcb6d2 f_d9ff5e2">
                      →
                    </button>
                    {" "}
                    <button type="button" onClick={v.advLbClose} autoFocus={true} aria-label="Close" style={{ width: "44px", height: "44px", borderRadius: "8px", border: "0", background: "#101828", color: "#fff", fontSize: "18px", cursor: "pointer" }} className="h_d13a628 f_d9ff5e2">
                      ✕
                    </button>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ padding: "20px" }}>
                  {" "}
                  <div style={{ position: "relative", aspectRatio: "4/3", maxHeight: "68vh", margin: "0 auto", background: v.advLb?.bg, border: "1px solid #E4E7EC", borderRadius: "8px", overflow: "hidden", containerType: "inline-size" }}>
                    {" "}
                    {(v.advLb?.blocks || []).map((b: any, _i10: number) => (
                      <Fragment key={b?.key ?? b?.id ?? b?.slug ?? _i10}>
                        <div style={{ position: "absolute", left: b?.x, top: b?.y, width: b?.w, height: b?.h, background: b?.bg, borderRadius: b?.r, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: b?.fs, lineHeight: "1.15", color: b?.fg }}>
                          {b?.t}
                        </div>
                      </Fragment>
                    ))}
                    {" "}
                  </div>
                  {" "}
                  <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#475467", marginTop: "14px" }}>
                    {v.advLb?.d}
                  </p>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </>
        ) : null}
        {" "}
        <section aria-labelledby="adv-why-h" style={{ background: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px" }}>
            {" "}
            <div style={{ maxWidth: "680px", marginBottom: "40px" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                Why CanadianSME
              </span>
              {" "}
              <h2 id="adv-why-h" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.02em", textWrap: "pretty", marginBottom: "14px" }}>
                A Platform Focused on Canadian Entrepreneurs
              </h2>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))", gap: "32px" }}>
              {" "}
              {(v.advWhy || []).map((w: any, _i7: number) => (
                <Fragment key={w?.key ?? w?.id ?? w?.slug ?? _i7}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "18px", borderTop: "2px solid #101828" }}>
                    <h3 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "18px", lineHeight: "1.3", color: "#101828", textWrap: "pretty" }}>
                      {w?.t}
                    </h3>
                    <p style={{ fontSize: "15px", lineHeight: "1.65", color: "#475467", textWrap: "pretty" }}>
                      {w?.d}
                    </p>
                  </div>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section id="adv-mediakit" aria-labelledby="adv-kit-h" style={{ background: "#24467A", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))", gap: "32px", alignItems: "center" }}>
            {" "}
            <div>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "12px", color: "#C9D4E5" }}>
                Media kit
              </span>
              {" "}
              <h2 id="adv-kit-h" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.02em", textWrap: "pretty", marginBottom: "14px", color: "#fff" }}>
                Plan Your Next Campaign
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#DCE4F0", maxWidth: "52ch", textWrap: "pretty" }}>
                Explore CanadianSME’s advertising opportunities, audience information and available formats in our media kit.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              {" "}
              {v.advKitReady ? (
                <>
                  <a href={u(v.advKitUrl)} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 26px", borderRadius: "8px", background: "#fff", color: "#101828", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px" }} className="h_36ebb4e">
                    Download Media Kit{" "}
                    <span aria-hidden="true">
                      ↓
                    </span>
                  </a>
                </>
              ) : null}
              {" "}
              {v.advKitMissing ? (
                <>
                  <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <button type="button" disabled={true} aria-describedby="adv-kit-note-2" style={{ padding: "15px 26px", borderRadius: "8px", border: "1.5px solid rgba(255,255,255,0.35)", background: "transparent", color: "#C9D4E5", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "not-allowed", alignSelf: "flex-start" }}>
                      Download Media Kit
                    </button>
                    <span id="adv-kit-note-2" style={{ fontSize: "13px", color: "#C9D4E5" }}>
                      The updated media kit is coming soon.
                    </span>
                  </span>
                </>
              ) : null}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section id="adv-form" aria-labelledby="adv-form-h" style={{ background: "#fff", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "88px 24px", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}>
            {" "}
            <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "0" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                Advertising inquiry
              </span>
              {" "}
              <h2 id="adv-form-h" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.02em", textWrap: "pretty", marginBottom: "14px" }}>
                Let’s Build Your Campaign
              </h2>
              {" "}
              <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                Tell us about your brand, objectives and preferred channels so our team can discuss suitable opportunities.
              </p>
              {" "}
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#667085", marginTop: "18px" }}>
                Prefer email?{" "}
                <a href="mailto:partners@canadiansme.ca" style={{ color: "#1E5AA8", fontWeight: "600" }}>
                  partners@canadiansme.ca
                </a>
              </p>
              {" "}
            </div>
            {" "}
            <form onSubmit={v.advSubmit} noValidate={true} aria-describedby="adv-req-note" style={{ flex: "2 1 min(100%,560px)", minWidth: "0", border: "1px solid #E4E7EC", borderRadius: "12px", padding: "clamp(20px,3vw,36px)", display: "flex", flexDirection: "column", gap: "20px", background: "#fff", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
              {" "}
              <p id="adv-req-note" style={{ fontSize: "13px", color: "#667085" }}>
                <span aria-hidden="true" style={{ color: "#B42318" }}>
                  *
                </span>
                {" "}Required field
              </p>
              {" "}
              {v.advShowSummary ? (
                <>
                  <div role="alert" style={{ padding: "14px 16px", borderRadius: "8px", background: "#FEF3F2", border: "1px solid #FECDCA", color: "#B42318", fontSize: "14px", fontWeight: "600" }}>
                    {v.advSummary}
                  </div>
                </>
              ) : null}
              {" "}
              {v.advShowOk ? (
                <>
                  <div role="status" style={{ padding: "14px 16px", borderRadius: "8px", background: "#ECFDF3", border: "1px solid #ABEFC6", color: "#067647", fontSize: "14.5px", fontWeight: "600" }}>
                    Thank you. Your campaign inquiry has been sent to the CanadianSME partnerships team.
                  </div>
                </>
              ) : null}
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "16px" }}>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                  <span>
                    Full name{" "}
                    <span aria-hidden="true" style={{ color: "#B42318" }}>
                      *
                    </span>
                  </span>
                  <input id="adv-name" type="text" ref={v.advRefname} autoComplete="name" required={true} aria-required="true" aria-invalid={v.advInvname} aria-describedby="adv-name-err" style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: `1px solid ${v.advBdname ?? ""}` }} className="f_d9ff5e2" />
                  <span id="adv-name-err" style={{ fontFamily: "inherit", fontWeight: "500", fontSize: "13px", color: "#B42318", minHeight: "0" }}>
                    {v.advErrname}
                  </span>
                </label>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                  <span>
                    Company or agency{" "}
                    <span aria-hidden="true" style={{ color: "#B42318" }}>
                      *
                    </span>
                  </span>
                  <input id="adv-company" type="text" ref={v.advRefcompany} autoComplete="organization" required={true} aria-required="true" aria-invalid={v.advInvcompany} aria-describedby="adv-company-err" style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: `1px solid ${v.advBdcompany ?? ""}` }} className="f_d9ff5e2" />
                  <span id="adv-company-err" style={{ fontFamily: "inherit", fontWeight: "500", fontSize: "13px", color: "#B42318", minHeight: "0" }}>
                    {v.advErrcompany}
                  </span>
                </label>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                  <span>
                    Work email{" "}
                    <span aria-hidden="true" style={{ color: "#B42318" }}>
                      *
                    </span>
                  </span>
                  <input id="adv-email" type="email" ref={v.advRefemail} autoComplete="email" required={true} aria-required="true" aria-invalid={v.advInvemail} aria-describedby="adv-email-err" style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: `1px solid ${v.advBdemail ?? ""}` }} className="f_d9ff5e2" />
                  <span id="adv-email-err" style={{ fontFamily: "inherit", fontWeight: "500", fontSize: "13px", color: "#B42318", minHeight: "0" }}>
                    {v.advErremail}
                  </span>
                </label>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                  <span>
                    Website{" "}
                    <span style={{ fontWeight: "400", color: "#667085" }}>
                      (optional)
                    </span>
                  </span>
                  <input id="adv-website" type="url" ref={v.advRefwebsite} autoComplete="url" aria-invalid={v.advInvwebsite} aria-describedby="adv-website-err" inputMode="url" placeholder="company.ca" style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: `1px solid ${v.advBdwebsite ?? ""}` }} className="f_d9ff5e2" />
                  <span id="adv-website-err" style={{ fontFamily: "inherit", fontWeight: "500", fontSize: "13px", color: "#B42318", minHeight: "0" }}>
                    {v.advErrwebsite}
                  </span>
                </label>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                  <span>
                    Phone{" "}
                    <span style={{ fontWeight: "400", color: "#667085" }}>
                      (optional)
                    </span>
                  </span>
                  <input id="adv-phone" type="tel" ref={v.advRefphone} autoComplete="tel" aria-invalid={v.advInvphone} aria-describedby="adv-phone-err" style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: `1px solid ${v.advBdphone ?? ""}` }} className="f_d9ff5e2" />
                  <span id="adv-phone-err" style={{ fontFamily: "inherit", fontWeight: "500", fontSize: "13px", color: "#B42318", minHeight: "0" }}>
                    {v.advErrphone}
                  </span>
                </label>
                {" "}
              </div>
              {" "}
              <fieldset style={{ border: "0", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
                {" "}
                <legend style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", marginBottom: "10px" }}>
                  Campaign interests{" "}
                  <span style={{ fontWeight: "400", color: "#667085" }}>
                    (select all that apply)
                  </span>
                </legend>
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))", gap: "10px" }}>
                  {" "}
                  {(v.advInterests || []).map((i: any, _i9: number) => (
                    <Fragment key={i?.key ?? i?.id ?? i?.slug ?? _i9}>
                      {" "}
                      <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px 14px", borderRadius: "8px", border: `1.5px solid ${i?.bd ?? ""}`, background: i?.bg, fontSize: "14.5px", lineHeight: "1.4", color: "#101828", cursor: "pointer" }}>
                        <input type="checkbox" checked={i?.checked} onChange={i?.toggle} style={{ marginTop: "2px", width: "18px", height: "18px", accentColor: "#1E5AA8", flexShrink: "0" }} className="f_d9ff5e2" />
                        {i?.t}
                      </label>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
              </fieldset>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "16px" }}>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                  <span>
                    Primary campaign objective{" "}
                    <span style={{ fontWeight: "400", color: "#667085" }}>
                      (optional)
                    </span>
                  </span>
                  <select ref={v.advRefobjective} style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: "1px solid #D0D5DD" }} className="f_d9ff5e2">
                    <option value="">
                      Select an objective
                    </option>
                    {(v.advObjectiveOpts || []).map((op: any, _i10: number) => (
                      <Fragment key={op?.key ?? op?.id ?? op?.slug ?? _i10}>
                        <option value={op}>
                          {op}
                        </option>
                      </Fragment>
                    ))}
                  </select>
                </label>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                  <span>
                    Estimated budget{" "}
                    <span style={{ fontWeight: "400", color: "#667085" }}>
                      (optional)
                    </span>
                  </span>
                  <select ref={v.advRefbudget} style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: "1px solid #D0D5DD" }} className="f_d9ff5e2">
                    <option value="">
                      Select a range
                    </option>
                    {(v.advBudgetOpts || []).map((op: any, _i10: number) => (
                      <Fragment key={op?.key ?? op?.id ?? op?.slug ?? _i10}>
                        <option value={op}>
                          {op}
                        </option>
                      </Fragment>
                    ))}
                  </select>
                </label>
                {" "}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                  <span>
                    Preferred launch timing{" "}
                    <span style={{ fontWeight: "400", color: "#667085" }}>
                      (optional)
                    </span>
                  </span>
                  <select ref={v.advReftiming} style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: "1px solid #D0D5DD" }} className="f_d9ff5e2">
                    <option value="">
                      Select timing
                    </option>
                    {(v.advTimingOpts || []).map((op: any, _i10: number) => (
                      <Fragment key={op?.key ?? op?.id ?? op?.slug ?? _i10}>
                        <option value={op}>
                          {op}
                        </option>
                      </Fragment>
                    ))}
                  </select>
                </label>
                {" "}
              </div>
              {" "}
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", color: "#344054", minWidth: "0" }}>
                <span>
                  Campaign details{" "}
                  <span aria-hidden="true" style={{ color: "#B42318" }}>
                    *
                  </span>
                </span>
                <span style={{ fontWeight: "400", color: "#667085", fontFamily: "inherit" }}>
                  Your brand, audience, goals, key dates and anything else we should know.
                </span>
                <textarea id="adv-details" ref={v.advRefdetails} rows="6" required={true} aria-required="true" aria-invalid={v.advInvdetails} aria-describedby="adv-details-err" style={{ padding: "12px 14px", borderRadius: "8px", fontSize: "15px", fontFamily: "inherit", fontWeight: "400", color: "#101828", background: "#fff", width: "100%", boxSizing: "border-box", border: `1px solid ${v.advBddetails ?? ""}`, resize: "vertical" }} className="f_d9ff5e2">

                </textarea>
                <span id="adv-details-err" style={{ fontFamily: "inherit", fontWeight: "500", fontSize: "13px", color: "#B42318", minHeight: "0" }}>
                  {v.advErrdetails}
                </span>
              </label>
              {" "}
              <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", lineHeight: "1.5", color: "#475467" }}>
                <input type="checkbox" ref={v.advRefconsent} style={{ marginTop: "2px", width: "18px", height: "18px", accentColor: "#1E5AA8", flexShrink: "0" }} className="f_d9ff5e2" />
                <span>
                  Optional: send me CanadianSME’s newsletter. You can unsubscribe at any time. This is separate from your inquiry.
                </span>
              </label>
              {" "}
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#667085" }}>
                We use the details you provide to respond to your inquiry. See our{" "}
                <a href={u("#privacy")} style={{ color: "#1E5AA8", textDecoration: "underline" }}>
                  Privacy Policy
                </a>
                .
              </p>
              {" "}
              {v.advShowFail ? (
                <>
                  <div role="alert" style={{ padding: "14px 16px", borderRadius: "8px", background: "#FEF3F2", border: "1px solid #FECDCA", color: "#B42318", fontSize: "14px", lineHeight: "1.55", fontWeight: "500" }}>
                    We couldn’t send your inquiry. Your details are still here, so please try again, or email{" "}
                    <a href="mailto:partners@canadiansme.ca" style={{ color: "#B42318", fontWeight: "700", textDecoration: "underline" }}>
                      partners@canadiansme.ca
                    </a>
                    .
                  </div>
                </>
              ) : null}
              {" "}
              <button type="submit" disabled={v.advSending} style={{ alignSelf: "flex-start", padding: "15px 26px", borderRadius: "8px", border: "0", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px", cursor: "pointer", opacity: v.advBtnOpacity }} className="h_58d1318 f_d9ff5e2">
                {v.advBtnLabel}
              </button>
              {" "}
            </form>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="adv-faq-h" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "880px", margin: "0 auto", padding: "88px 24px" }}>
            {" "}
            <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
              FAQ
            </span>
            {" "}
            <h2 id="adv-faq-h" style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,3vw,38px)", lineHeight: "1.14", letterSpacing: "-0.02em", textWrap: "pretty", marginBottom: "28px" }}>
              Advertising Questions
            </h2>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #D0D5DD" }}>
              {" "}
              {(v.advFaq || []).map((q: any, _i7: number) => (
                <Fragment key={q?.key ?? q?.id ?? q?.slug ?? _i7}>
                  {" "}
                  <details style={{ borderBottom: "1px solid #D0D5DD" }}>
                    {" "}
                    <summary style={{ padding: "20px 0", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "17px", lineHeight: "1.4", color: "#101828", cursor: "pointer" }} className="f_bc2d56d">
                      {q?.q}
                    </summary>
                    {" "}
                    <p style={{ padding: "0 0 22px", fontSize: "15.5px", lineHeight: "1.7", color: "#475467", maxWidth: "68ch" }}>
                      {q?.a}
                    </p>
                    {" "}
                  </details>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
      </div>
    </>
  )
}
