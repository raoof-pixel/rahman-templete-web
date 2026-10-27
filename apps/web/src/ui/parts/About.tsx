'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function About() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.aboutDisplay }}>
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
              About
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "48px", alignItems: "center" }}>
          {" "}
          <div>
            {" "}
            <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
              About CanadianSME
            </span>
            {" "}
            <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(30px,3.4vw,46px)", lineHeight: "1.1", marginBottom: "18px" }}>
              Empowering Canada’s Small and Medium-Sized Businesses
            </h1>
            {" "}
            <p style={{ fontSize: "17px", lineHeight: "1.75", color: "#475467", maxWidth: "58ch" }}>
              CanadianSME Small Business Magazine is a leading Canadian media platform dedicated to empowering entrepreneurs through trusted content, meaningful connections, practical resources, and national events. We publish daily, print monthly, and convene the community in person across the country.
            </p>
            {" "}
          </div>
          {" "}
          <div style={{ height: "380px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E4E7EC" }}>
            <Slot id="about-hero" shape="rect" placeholder="CanadianSME editorial team" />
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "24px" }}>
          {" "}
          <div style={{ padding: "24px", background: "#F4F6F8", borderRadius: "10px" }}>
            <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "32px", color: "#D71920", lineHeight: "1.1" }}>
              120K+
            </span>
            <span style={{ fontSize: "14px", color: "#667085" }}>
              monthly readers
            </span>
          </div>
          {" "}
          <div style={{ padding: "24px", background: "#F4F6F8", borderRadius: "10px" }}>
            <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "32px", color: "#D71920", lineHeight: "1.1" }}>
              142
            </span>
            <span style={{ fontSize: "14px", color: "#667085" }}>
              podcast episodes
            </span>
          </div>
          {" "}
          <div style={{ padding: "24px", background: "#F4F6F8", borderRadius: "10px" }}>
            <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "32px", color: "#D71920", lineHeight: "1.1" }}>
              4
            </span>
            <span style={{ fontSize: "14px", color: "#667085" }}>
              national event series
            </span>
          </div>
          {" "}
          <div style={{ padding: "24px", background: "#F4F6F8", borderRadius: "10px" }}>
            <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "32px", color: "#D71920", lineHeight: "1.1" }}>
              10
            </span>
            <span style={{ fontSize: "14px", color: "#667085" }}>
              provinces covered
            </span>
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "44px 24px 72px" }}>
          {" "}
          <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "28px", marginBottom: "24px" }}>
            Leadership
          </h2>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "36px", alignItems: "center", border: "1px solid #E4E7EC", borderRadius: "10px", padding: "32px", marginBottom: "52px" }}>
            {" "}
            <div style={{ aspectRatio: "1/1", maxWidth: "300px", width: "100%", borderRadius: "10px", overflow: "hidden", background: "#101828" }}>
              {" "}
              <img loading="lazy" decoding="async" src="/assets/sk-uddin.png" alt="SK Uddin, Editor and Publisher of CanadianSME Small Business Magazine" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D71920" }}>
                Editor &amp; Publisher
              </span>
              {" "}
              <h3 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "32px", lineHeight: "1.15", color: "#101828" }}>
                SK Uddin
              </h3>
              {" "}
              <p style={{ fontSize: "15.5px", lineHeight: "1.75", color: "#475467", maxWidth: "60ch", textWrap: "pretty" }}>
                SK Uddin leads CanadianSME Small Business Magazine as Editor &amp; Publisher, setting the editorial direction across the magazine, podcast, awards, and events. His focus is practical, trustworthy coverage that helps Canadian entrepreneurs make better decisions — and a platform that connects small business owners with the partners, programs, and people who support them.
              </p>
              {" "}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "6px" }}>
                {" "}
                <a href={u("#contact")} style={{ padding: "11px 20px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13.5px" }}>
                  Contact the editor
                </a>
                {" "}
                <a href={u("#contributors")} style={{ padding: "11px 20px", borderRadius: "8px", border: "1.5px solid #101828", color: "#101828", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13.5px" }} className="h_3023cb9">
                  Editorial standards
                </a>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC" }}>
            {" "}
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "48px" }}>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {" "}
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "1.2" }}>
                  Our approach
                </h2>
                {" "}
                <p style={{ fontSize: "15.5px", lineHeight: "1.75", color: "#475467" }}>
                  Cmarketing Inc. is a marketing agency and business management boutique that helps Canadian SMEs. Recognizing the Canadian economy’s dependence on small and medium enterprises, the agency publishes a magazine whose contents support Canadian SMEs.
                </p>
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {" "}
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "1.2" }}>
                  Our philosophy
                </h2>
                {" "}
                <p style={{ fontSize: "15.5px", lineHeight: "1.75", color: "#475467" }}>
                  Through our conferences, online presence, and social channels, CanadianSME provides the platform to position and promote your products and services. We are constantly pushing boundaries to extend reach through both standard and emerging technologies.
                </p>
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {" "}
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "1.2" }}>
                  Our mission
                </h2>
                {" "}
                <p style={{ fontSize: "15.5px", lineHeight: "1.75", color: "#475467" }}>
                  Small business support you can trust. Our work brings together competent organizations that share our aim of strengthening the SME industry, across business publications, business events, special projects, and business consulting.
                </p>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "44px", alignItems: "center" }}>
              {" "}
              <div style={{ height: "360px", borderRadius: "10px", overflow: "hidden", border: "1px solid #E4E7EC" }}>
                <Slot id="about-trust" shape="rect" placeholder="CanadianSME magazine cover or founder portrait" />
              </div>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {" "}
                <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920" }}>
                  Why we exist
                </span>
                {" "}
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(26px,2.8vw,34px)", lineHeight: "1.18", textWrap: "pretty" }}>
                  Small business support you can trust
                </h2>
                {" "}
                <p style={{ fontSize: "16px", lineHeight: "1.75", color: "#475467", textWrap: "pretty" }}>
                  CanadianSME Business Magazine was created through passion and admiration for entrepreneurs. With SMEs playing such a crucial role in Canada’s business landscape and contributing greatly to the economy, CanadianSME was built to provide a much-needed support system for hard-working business owners.
                </p>
                {" "}
                <p style={{ fontSize: "16px", lineHeight: "1.75", color: "#475467", textWrap: "pretty" }}>
                  SMEs account for more than 97% of businesses in Canada — the market is significant. Position your brand as a leader in helping small businesses last past challenging times.
                </p>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 72px" }}>
            {" "}
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px", paddingBottom: "12px", marginBottom: "26px", borderBottom: "2px solid #101828" }}>
              {" "}
              <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "15px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                What we run
              </h2>
              {" "}
              <span style={{ fontSize: "13.5px", color: "#667085" }}>
                Events and programs across the CanadianSME platform
              </span>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "24px" }}>
              {" "}
              {(v.programs || []).map((p: any, _i7: number) => (
                <Fragment key={p?.key ?? p?.id ?? p?.slug ?? _i7}>
                  {" "}
                  <article style={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "column" }} className="h_9f7643d">
                    {" "}
                    <div style={{ aspectRatio: "3/4", background: "#F4F6F8" }}>
                      <Slot id={p?.slot} shape="rect" placeholder={p?.image} />
                    </div>
                    {" "}
                    <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                      {" "}
                      <h4 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "17px" }}>
                        {p?.title}
                      </h4>
                      {" "}
                      <p style={{ fontSize: "14.5px", lineHeight: "1.65", color: "#667085" }}>
                        {p?.desc}
                      </p>
                      {" "}
                      <a href={u(p?.href)} style={{ marginTop: "auto", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#D71920" }}>
                        {p?.cta}
                      </a>
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
          </div>
          {" "}
          <div style={{ background: "#101828", color: "#fff" }}>
            {" "}
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "40px", alignItems: "start" }}>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {" "}
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "1.2" }}>
                  Published by Cmarketing Inc.
                </h2>
                {" "}
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#98A2B3" }}>
                  6345 Dixie Rd, Unit 202
                  <br />
                  Mississauga, ON L5T 2E6
                </p>
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {" "}
                <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D4A72C" }}>
                  Talk to us
                </span>
                {" "}
                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#98A2B3" }}>
                  +1 416 655 0205
                  <br />
                  +1 437 778 4446
                </p>
                {" "}
                <a href={u("#contact")} style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#fff" }}>
                  Contact the team →
                </a>
                {" "}
              </div>
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {" "}
                <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D4A72C" }}>
                  Stay informed
                </span>
                {" "}
                <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#98A2B3" }}>
                  Subscribe to CanadianSME Small Business Magazine for upcoming events and insights from industry leaders.
                </p>
                {" "}
                <a href={u("#newsletter")} style={{ alignSelf: "flex-start", padding: "12px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13.5px" }}>
                  Subscribe now
                </a>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
        </div>
      </div>
    </>
  )
}
