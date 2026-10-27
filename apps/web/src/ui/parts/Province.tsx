'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Province() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.provinceDisplay }}>
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
            <a href={u("#provinces")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              Provinces
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#14181D" }}>
              {v.pv?.name}
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <section style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 60px", display: "flex", flexDirection: "column", gap: "18px" }}>
            {" "}
            <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#7FA3E8" }}>
              Doing business in
            </span>
            {" "}
            <h1 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(32px,4vw,52px)", lineHeight: "1.08", letterSpacing: "-0.025em" }}>
              {v.pv?.name}
            </h1>
            {" "}
            <p style={{ fontSize: "17px", lineHeight: "1.65", color: "#D0D5DD", maxWidth: "62ch", textWrap: "pretty" }}>
              {v.pv?.intro}
            </p>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "0", marginTop: "18px", borderTop: "1px solid rgba(255,255,255,0.16)" }}>
              {" "}
              {(v.pv?.factList || []).map((f: any, _i7: number) => (
                <Fragment key={f?.key ?? f?.id ?? f?.slug ?? _i7}>
                  {" "}
                  <div style={{ padding: "22px 24px 4px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {" "}
                    <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "#98A2B3" }}>
                      {f?.k}
                    </span>
                    {" "}
                    <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "21px", lineHeight: "1.2", color: "#fff" }}>
                      {f?.v}
                    </span>
                    {" "}
                    <span style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#C8CDD6" }}>
                      {f?.d}
                    </span>
                    {" "}
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
        <section style={{ background: "#EEF2F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px", display: "flex", flexDirection: "column", gap: "28px" }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "32px", alignItems: "start" }}>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  About the province
                </span>
                {" "}
                <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,32px)", lineHeight: "1.18", letterSpacing: "-0.015em" }}>
                  {v.pv?.name} at a glance
                </h2>
                {" "}
              </div>
              {" "}
              <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "20px", margin: "0" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                    Capital
                  </dt>
                  <dd style={{ margin: "0", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17px", color: "#14181D" }}>
                    {v.pv?.cap}
                  </dd>
                </div>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <dt style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                    Largest city
                  </dt>
                  <dd style={{ margin: "0", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17px", color: "#14181D" }}>
                    {v.pv?.city}
                  </dd>
                </div>
                {" "}
                <div style={{ gridColumn: "1/-1", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "112px", height: "112px", flexShrink: "0", borderRadius: "8px", overflow: "hidden", background: "#fff", border: "1px solid #E4E7EC", boxShadow: "0 4px 12px rgba(16,24,40,0.10)" }}>
                      <Slot id={v.pv?.premierSlot} shape="rect" placeholder="Premier photo" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <dt style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                        Premier
                      </dt>
                      <dd style={{ margin: "0", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17px", color: "#14181D" }}>
                        {v.pv?.premier}
                      </dd>
                    </div>
                  </div>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "112px", height: "112px", flexShrink: "0", borderRadius: "8px", overflow: "hidden", background: "#fff", border: "1px solid #E4E7EC", boxShadow: "0 4px 12px rgba(16,24,40,0.10)" }}>
                      <Slot id={v.pv?.ministerSlot} shape="rect" placeholder="Minister photo" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <dt style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                        Small business minister
                      </dt>
                      <dd style={{ margin: "0", display: "flex", flexDirection: "column", gap: "2px" }}>
                        <a href={u(v.pv?.cabinet)} target="_blank" rel="noopener" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17px", color: "#14181D" }} className="h_9e87cbe">
                          {v.pv?.sbName}
                        </a>
                        <span style={{ fontSize: "13px", color: "#5A6470" }}>
                          {v.pv?.sbRole}
                        </span>
                      </dd>
                    </div>
                  </div>
                </div>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", gridColumn: "1/-1" }}>
                  <dt style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                    Federal lead
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#344054" }}>
                    Rechie Valdez, Secretary of State (Small Business and Tourism)
                  </dd>
                </div>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", gridColumn: "1/-1" }}>
                  <dt style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontSize: "12px", fontWeight: "500", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A6470" }}>
                    Key industries
                  </dt>
                  <dd style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.55", color: "#344054" }}>
                    {v.pv?.ind}
                  </dd>
                </div>
                {" "}
              </dl>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: "12px" }}>
              {" "}
              {(v.pv?.statList || []).map((st: any, _i7: number) => (
                <Fragment key={st?.key ?? st?.id ?? st?.slug ?? _i7}>
                  {" "}
                  <div style={{ background: "#fff", border: "1px solid #E4E7EC", borderRadius: "10px", padding: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {" "}
                    <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "1.1", color: "#14181D" }}>
                      {st?.v}
                    </span>
                    {" "}
                    <span style={{ fontSize: "14px", fontWeight: "600", lineHeight: "1.35", color: "#344054" }}>
                      {st?.l}
                    </span>
                    {" "}
                    <span style={{ fontSize: "12.5px", lineHeight: "1.45", color: "#5A6470" }}>
                      {st?.d}
                    </span>
                    {" "}
                  </div>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
            <p style={{ fontSize: "12.5px", color: "#5A6470" }}>
              Source: Innovation, Science and Economic Development Canada,{" "}
              <a href="https://ised-isde.canada.ca/site/sme-research-statistics/en/key-small-business-statistics/key-small-business-statistics-2025" target="_blank" rel="noopener" style={{ color: "#004FB8", textDecoration: "underline" }}>
                Key Small Business Statistics 2025
              </a>
              {" "}(Statistics Canada Business Register).
            </p>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "56px", alignItems: "start" }}>
          {" "}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px", gridColumn: "span 2", minWidth: "0" }}>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "72ch" }}>
              {" "}
              <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,32px)", lineHeight: "1.2", letterSpacing: "-0.015em", textWrap: "pretty" }}>
                {v.pv?.artTitle}
              </h2>
              {" "}
              {(v.pv?.artSections || []).map((sec: any, _i7: number) => (
                <Fragment key={sec?.key ?? sec?.id ?? sec?.slug ?? _i7}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {" "}
                    {sec?.hasH ? (
                      <>
                        <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "19px", lineHeight: "1.3", color: "#14181D", marginTop: "10px" }}>
                          {sec?.h}
                        </h3>
                      </>
                    ) : null}
                    {" "}
                    {(sec?.ps || []).map((para: any, _i10: number) => (
                      <Fragment key={para?.key ?? para?.id ?? para?.slug ?? _i10}>
                        <p style={{ fontSize: "16.5px", lineHeight: "1.75", color: "#344054", textWrap: "pretty" }}>
                          {para?.t}
                        </p>
                      </Fragment>
                    ))}
                    {" "}
                  </div>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </article>
            {" "}
            <section id="start-guide" style={{ display: "flex", flexDirection: "column", gap: "18px", background: "#F9FAFB", border: "1px solid #E4E7EC", borderRadius: "14px", padding: "32px" }}>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Step-by-step guide
                </span>
                {" "}
                <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.015em" }}>
                  How to start a business in {v.pv?.name}
                </h2>
                {" "}
              </div>
              {" "}
              <ol style={{ display: "flex", flexDirection: "column", gap: "0", padding: "0", listStyle: "none" }}>
                {" "}
                {(v.pv?.startSteps || []).map((st: any, _i8: number) => (
                  <Fragment key={st?.key ?? st?.id ?? st?.slug ?? _i8}>
                    {" "}
                    <li style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr)", gap: "16px", padding: "20px 0", borderTop: "1px solid #E4E7EC" }}>
                      {" "}
                      <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#101828", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15px" }}>
                        {st?.n}
                      </span>
                      {" "}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {" "}
                        <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17px", lineHeight: "1.3" }}>
                          {st?.h}
                        </h3>
                        {" "}
                        <p style={{ fontSize: "15px", lineHeight: "1.65", color: "#475467", textWrap: "pretty" }}>
                          {st?.t}
                        </p>
                        {" "}
                        <a href={u(st?.l?.href)} target="_blank" rel="noopener" style={{ alignSelf: "flex-start", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "13.5px", color: "#004FB8" }} className="h_9e87cbe">
                          {st?.l?.label} ↗
                        </a>
                        {" "}
                      </div>
                      {" "}
                    </li>
                    {" "}
                  </Fragment>
                ))}
                {" "}
              </ol>
              {" "}
            </section>
            {" "}
            <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {" "}
              <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.015em" }}>
                What to watch in {v.pv?.name}
              </h2>
              {" "}
              <ol style={{ display: "flex", flexDirection: "column", gap: "0", padding: "0", listStyle: "none", borderTop: "2px solid #101828" }}>
                {" "}
                {(v.pv?.watchList || []).map((w: any, _i8: number) => (
                  <Fragment key={w?.key ?? w?.id ?? w?.slug ?? _i8}>
                    {" "}
                    <li style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr)", gap: "12px", padding: "18px 0", borderBottom: "1px solid #E4E7EC" }}>
                      <span style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "14px", color: "#002364" }}>
                        {w?.n}
                      </span>
                      <span style={{ fontSize: "16px", lineHeight: "1.6", color: "#344054", textWrap: "pretty" }}>
                        {w?.t}
                      </span>
                    </li>
                    {" "}
                  </Fragment>
                ))}
                {" "}
              </ol>
              {" "}
            </section>
            {" "}
            {(v.pv?.groups || []).map((g: any, _i6: number) => (
              <Fragment key={g?.key ?? g?.id ?? g?.slug ?? _i6}>
                {" "}
                <section style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {" "}
                  <h2 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "20px", lineHeight: "1.2" }}>
                    {g?.heading}
                  </h2>
                  {" "}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "12px" }}>
                    {" "}
                    {(g?.links || []).map((l: any, _i10: number) => (
                      <Fragment key={l?.key ?? l?.id ?? l?.slug ?? _i10}>
                        {" "}
                        <a href={u(l?.href)} target="_blank" rel="noopener" style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "18px 20px", background: "#fff", border: "1px solid #E4E7EC", borderRadius: "10px", color: "#14181D" }} className="h_f924663">
                          {" "}
                          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15.5px", lineHeight: "1.3" }}>
                            {l?.label}
                            <span aria-hidden="true" style={{ color: "#002364" }}>
                              ↗
                            </span>
                          </span>
                          {" "}
                          <span style={{ fontSize: "13.5px", lineHeight: "1.55", color: "#5A6470" }}>
                            {l?.desc}
                          </span>
                          {" "}
                        </a>
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
            <p style={{ fontSize: "12.5px", lineHeight: "1.6", color: "#5A6470", maxWidth: "70ch" }}>
              Reviewed October 2026. Rates, thresholds and programmes change — confirm with the official source before you file or apply. CanadianSME is not affiliated with these agencies.
            </p>
            {" "}
          </div>
          {" "}
          <aside style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "96px" }}>
            {" "}
            <div style={{ background: "#EEF2F8", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                Funding finder
              </span>
              {" "}
              <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "19px", lineHeight: "1.3" }}>
                Grants and financing for {v.pv?.name}
              </h3>
              {" "}
              <a href={u("#funding-finder")} onClick={v.pv?.openFinder} style={{ alignSelf: "flex-start", padding: "12px 18px", borderRadius: "8px", background: "#101828", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_0744446">
                See programmes →
              </a>
              {" "}
            </div>
            {" "}
            <div style={{ background: "#D71920", color: "#fff", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {" "}
              <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "19px", lineHeight: "1.3" }}>
                {v.pv?.name} deadlines in your inbox
              </h3>
              {" "}
              <p style={{ fontSize: "14px", lineHeight: "1.55", color: "#FDE7E8" }}>
                The Tuesday Briefing filters CRA and provincial dates for where you operate.
              </p>
              {" "}
              <a href={u("#newsletter-form")} style={{ alignSelf: "flex-start", padding: "12px 18px", borderRadius: "8px", background: "#fff", color: "#002364", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_dce66b9">
                Subscribe free
              </a>
              {" "}
            </div>
            {" "}
            <div style={{ border: "1px solid #E4E7EC", borderRadius: "12px", padding: "22px" }}>
              {" "}
              <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "15px", marginBottom: "12px" }}>
                Other provinces and territories
              </h3>
              {" "}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {" "}
                {(v.pvOthers || []).map((o: any, _i8: number) => (
                  <Fragment key={o?.key ?? o?.id ?? o?.slug ?? _i8}>
                    <a href={u(o?.href)} style={{ padding: "6px 11px", borderRadius: "999px", border: "1px solid #D0D5DD", fontSize: "13px", color: "#14181D" }} className="h_193a6e3">
                      {o?.label}
                    </a>
                  </Fragment>
                ))}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </aside>
          {" "}
        </div>
      </div>
    </>
  )
}
