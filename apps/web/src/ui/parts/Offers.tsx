'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Offers() {
  const v = useV()
  return (
    <>
      <div style={{ display: v.offersPageDisplay }}>
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
              Exclusive Offers
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <section style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ margin: "0 auto", padding: "60px 24px", display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1280px" }}>
            {" "}
            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF6B72" }}>
              Reader perks
            </span>
            {" "}
            <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "clamp(32px,4vw,50px)", lineHeight: "1.08", letterSpacing: "-0.02em", maxWidth: "20ch", textWrap: "pretty" }}>
              Exclusive Offers for Canadian Small Businesses
            </h1>
            {" "}
            <p style={{ fontSize: "17px", lineHeight: "1.65", color: "#D0D5DD", maxWidth: "60ch", textWrap: "pretty" }}>
              Partner savings on the tools and services owner-operators rely on — free for CanadianSME readers.
            </p>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section style={{ background: "#FDF2F2", borderBottom: "1px solid #F2D4D7" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "36px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "24px" }}>
            {" "}
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ width: "36px", height: "36px", flexShrink: "0", borderRadius: "50%", background: "#D71920", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "15px" }}>
                1
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16.5px", color: "#101828" }}>
                  Browse offers
                </h2>
                <p style={{ fontSize: "14px", lineHeight: "1.55", color: "#475467" }}>
                  Find savings on banking, software, travel, shipping and more — chosen for Canadian small businesses.
                </p>
              </div>
            </div>
            {" "}
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ width: "36px", height: "36px", flexShrink: "0", borderRadius: "50%", background: "#D71920", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "15px" }}>
                2
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16.5px", color: "#101828" }}>
                  Unlock your code
                </h2>
                <p style={{ fontSize: "14px", lineHeight: "1.55", color: "#475467" }}>
                  Enter your email to reveal the code. You’ll also get the free Tuesday Briefing.
                </p>
              </div>
            </div>
            {" "}
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ width: "36px", height: "36px", flexShrink: "0", borderRadius: "50%", background: "#D71920", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "15px" }}>
                3
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16.5px", color: "#101828" }}>
                  Redeem with the partner
                </h2>
                <p style={{ fontSize: "14px", lineHeight: "1.55", color: "#475467" }}>
                  Use the code on the partner’s site. Terms are set by each partner.
                </p>
              </div>
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "52px 24px 64px" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
            {" "}
            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "14px", color: "#475467" }}>
              {v.offerCount}
            </span>
            {" "}
            <div role="tablist" aria-label="Filter offers" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {" "}
              {(v.offerCats || []).map((c: any, _i7: number) => (
                <Fragment key={c?.key ?? c?.id ?? c?.slug ?? _i7}>
                  {" "}
                  <button type="button" role="tab" aria-selected={c?.active} onClick={c?.onClick} style={{ padding: "8px 14px", borderRadius: "999px", border: `1.5px solid ${c?.border ?? ""}`, background: c?.bg, color: c?.fg, fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}>
                    {c?.label}
                  </button>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: "18px" }}>
            {" "}
            {(v.offers || []).map((o: any, _i6: number) => (
              <Fragment key={o?.key ?? o?.id ?? o?.slug ?? _i6}>
                {" "}
                <article style={{ display: "flex", flexDirection: "column", background: "#fff", border: "1px solid #E4E7EC", borderRadius: "12px", overflow: "hidden" }} className="h_881e8fa">
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "18px 20px", borderBottom: "1px solid #F2F4F7" }}>
                    {" "}
                    <div style={{ width: "120px", height: "44px" }}>
                      <Slot id={o?.slot} shape="rect" placeholder="Partner logo" />
                    </div>
                    {" "}
                    <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#667085" }}>
                      {o?.cat}
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                    {" "}
                    <span style={{ alignSelf: "flex-start", padding: "5px 10px", borderRadius: "6px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px" }}>
                      {o?.value}
                    </span>
                    {" "}
                    <h3 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "17px", lineHeight: "1.3", color: "#101828", textWrap: "pretty" }}>
                      {o?.title}
                    </h3>
                    {" "}
                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#475467", flex: "1", textWrap: "pretty" }}>
                      {o?.desc}
                    </p>
                    {" "}
                    <span style={{ fontSize: "12.5px", color: "#667085" }}>
                      {o?.partner} · {o?.expires}
                    </span>
                    {" "}
                    <button type="button" onClick={o?.claim} style={{ marginTop: "6px", padding: "12px", borderRadius: "8px", border: "0", background: "#101828", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px", cursor: "pointer" }} className="h_cc7d4fa">
                      Claim offer
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
          <p style={{ marginTop: "22px", fontSize: "12.5px", lineHeight: "1.6", color: "#667085" }}>
            Offers are provided by our partners and subject to their terms. CanadianSME may receive a commission.
          </p>
          {" "}
        </section>
        {" "}
        <section style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "48px", alignItems: "start" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {" "}
              <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "1.2" }}>
                Questions about offers
              </h2>
              {" "}
              <dl style={{ display: "flex", flexDirection: "column", gap: "0", margin: "0", borderTop: "2px solid #101828" }}>
                {" "}
                <div style={{ padding: "18px 0", borderBottom: "1px solid #E4E7EC", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <dt style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16px", color: "#101828" }}>
                    Who can claim these offers?
                  </dt>
                  <dd style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "#475467" }}>
                    Offers are for Canadian small business owners and their teams. Some partners may ask you to confirm your business details.
                  </dd>
                </div>
                {" "}
                <div style={{ padding: "18px 0", borderBottom: "1px solid #E4E7EC", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <dt style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16px", color: "#101828" }}>
                    Do I have to subscribe?
                  </dt>
                  <dd style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "#475467" }}>
                    Unlocking a code adds you to the free Tuesday Briefing. You can unsubscribe at any time and keep any codes you have already unlocked.
                  </dd>
                </div>
                {" "}
                <div style={{ padding: "18px 0", borderBottom: "1px solid #E4E7EC", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <dt style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16px", color: "#101828" }}>
                    Is CanadianSME paid for these offers?
                  </dt>
                  <dd style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "#475467" }}>
                    Some partners pay us a commission when readers use an offer. This never affects our editorial coverage.
                  </dd>
                </div>
                {" "}
                <div style={{ padding: "18px 0", borderBottom: "1px solid #E4E7EC", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <dt style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "16px", color: "#101828" }}>
                    How often are offers added?
                  </dt>
                  <dd style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.6", color: "#475467" }}>
                    We add and refresh offers regularly. Subscribers hear about new ones first in the Tuesday Briefing.
                  </dd>
                </div>
                {" "}
              </dl>
              {" "}
            </div>
            {" "}
            <div style={{ background: "#101828", color: "#fff", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#FF6B72" }}>
                For partners
              </span>
              {" "}
              <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "24px", lineHeight: "1.25" }}>
                Offer something to Canada’s small business owners
              </h2>
              {" "}
              <p style={{ fontSize: "15px", lineHeight: "1.65", color: "#D0D5DD" }}>
                Put your product in front of owner-operators across every province through the website, the Tuesday Briefing and CanadianSME events.
              </p>
              {" "}
              <a href={u("#become-partner")} style={{ alignSelf: "flex-start", padding: "13px 20px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14.5px" }} className="h_900112d">
                List an offer →
              </a>
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
