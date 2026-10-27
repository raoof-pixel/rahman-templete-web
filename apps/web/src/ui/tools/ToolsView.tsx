'use client'
/* Generated from the CanadianSME Tools prototype (CanadianSME Tools.dc.html). Markup and inline styles are 1:1. */
import { Fragment } from 'react'

import { useV } from '../context'

/** Prototype links -> real URLs ("#gst" -> "/tools/gst/", homepage file -> "/"). */
const tu = (h: unknown) => {
  const s = typeof h === 'string' ? h : '#'
  if (s === 'CanadianSME Homepage.dc.html') return '/'
  if (s === '#index') return '/tools/'
  if (/^#(gst|payroll|cashflow|loan)$/.test(s)) return '/tools/' + s.slice(1) + '/'
  return s
}

export default function ToolsView() {
  const v = useV()
  return (
    <div className="tools-root">
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <header style={{ position: "sticky", top: "0", zIndex: "20", background: "#fff", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ background: "#101828", color: "#C8CDD6" }}>
            {" "}
            <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "9px 24px", display: "flex", gap: "16px", alignItems: "center", fontSize: "12px" }}>
              {" "}
              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600" }}>
                Free for Canadian small business owners — no sign-up, no email required
              </span>
              {" "}
              <a href={tu("CanadianSME Homepage.dc.html")} style={{ marginLeft: "auto", color: "#C8CDD6", fontFamily: "Sora,sans-serif", fontWeight: "600" }} className="h_1f6476f">
                ← Back to CanadianSME
              </a>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", gap: "26px", flexWrap: "wrap" }}>
            {" "}
            <a href={tu("CanadianSME Homepage.dc.html")} style={{ display: "flex", alignItems: "baseline", gap: "2px", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "20px", letterSpacing: "-0.02em", color: "#101828" }} className="h_00ea831">
              <span style={{ color: "#D71920" }}>
                Canadian
              </span>
              <span>
                SME
              </span>
            </a>
            {" "}
            <span style={{ width: "1px", height: "26px", background: "#E4E7EC" }} />
            {" "}
            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "15px" }}>
              Business Tools
            </span>
            {" "}
          </div>
          {" "}
          <nav aria-label="Calculators" style={{ borderTop: "1px solid #F0F2F5" }}>
            {" "}
            <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px", display: "flex", gap: "4px", overflowX: "auto" }}>
              {" "}
              {(v.tabs || []).map((t: any, _i7: number) => (
                <Fragment key={t?.key ?? t?.id ?? t?.slug ?? _i7}>
                  {" "}
                  <a href={tu(t?.hash)} style={{ padding: "14px 14px 12px", borderBottom: `3px solid ${t?.border ?? ""}`, fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13.5px", color: t?.color, whiteSpace: "nowrap" }} className="h_1dd7993">
                    {t?.label}
                  </a>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </nav>
        </header>
        <main style={{ flex: "1" }}>
          {v.showCalc ? (
            <>
              {" "}
              <div role="note" style={{ background: "#FFFAEB", borderBottom: "1px solid #FEC84B" }}>
                {" "}
                <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "16px 24px", display: "flex", gap: "13px", alignItems: "flex-start" }}>
                  {" "}
                  <span aria-hidden="true" style={{ fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "14px", color: "#B54708", flexShrink: "0", lineHeight: "1.5" }}>
                    !
                  </span>
                  {" "}
                  <p style={{ fontSize: "14px", lineHeight: "1.65", color: "#7A2E0E", maxWidth: "92ch", textWrap: "pretty" }}>
                    <strong style={{ fontWeight: "600" }}>
                      Example and reference only.
                    </strong>
                    {" "}This calculator produces illustrative estimates to help you plan. Figures are not exact, do not account for your full circumstances, and must not be used to file, remit, or make financial commitments. Confirm every amount with the CRA, Revenu Québec, or your accountant before acting on it. Nothing here is tax, accounting, or financial advice.
                  </p>
                  {" "}
                </div>
                {" "}
              </div>
            </>
          ) : null}
          {v.showIndex ? (
            <>
              {" "}
              <div>
                {" "}
                <section style={{ borderBottom: "1px solid #E4E7EC", background: "#F4F6F8" }}>
                  {" "}
                  <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "64px 24px" }}>
                    {" "}
                    <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                      Free tools
                    </span>
                    {" "}
                    <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "clamp(30px,4vw,46px)", lineHeight: "1.08", letterSpacing: "-0.025em", maxWidth: "22ch", marginBottom: "16px", textWrap: "pretty" }}>
                      Calculators Built for Canadian Rules
                    </h1>
                    {" "}
                    <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#667085", maxWidth: "60ch", textWrap: "pretty" }}>
                      Every calculator here uses current federal and provincial rates — not a generic template with a Canadian flag on it. Nothing is stored, and nothing asks for your email. Results are illustrative examples for reference only.
                    </p>
                    {" "}
                  </div>
                  {" "}
                </section>
                {" "}
                <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "56px 24px 80px" }}>
                  {" "}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(255px,1fr))", gap: "22px" }}>
                    {" "}
                    {(v.tools || []).map((t: any, _i10: number) => (
                      <Fragment key={t?.key ?? t?.id ?? t?.slug ?? _i10}>
                        {" "}
                        <a href={tu(t?.hash)} style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "26px", display: "flex", flexDirection: "column", gap: "11px", background: "#fff", transition: "box-shadow .18s ease,transform .18s ease" }} className="h_907f3b5">
                          {" "}
                          <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "24px", color: "#D71920", lineHeight: "1" }}>
                            {t?.mark}
                          </span>
                          {" "}
                          <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "17.5px", lineHeight: "1.28", color: "#101828", textWrap: "pretty" }}>
                            {t?.title}
                          </h2>
                          {" "}
                          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#667085", textWrap: "pretty" }}>
                            {t?.desc}
                          </p>
                          {" "}
                          <span style={{ marginTop: "auto", paddingTop: "10px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13px", color: "#D71920" }}>
                            Open calculator →
                          </span>
                          {" "}
                        </a>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </div>
                  {" "}
                  <div role="note" style={{ marginTop: "44px", padding: "24px 26px", background: "#FFFAEB", borderLeft: "3px solid #FEC84B", maxWidth: "82ch" }}>
                    {" "}
                    <strong style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#B54708", marginBottom: "10px" }}>
                      Example and reference only
                    </strong>
                    {" "}
                    <p style={{ fontSize: "14.5px", lineHeight: "1.7", color: "#7A2E0E", textWrap: "pretty" }}>
                      These calculators are illustrative planning aids built on published {v.taxYear} federal and provincial rates. They use simplified assumptions, do not account for your full circumstances, and their results are not exact. Do not use them to file a return, remit deductions, or commit to financing. Confirm payroll amounts against the CRA Payroll Deductions Online Calculator, and check any figure with your accountant or the relevant tax authority before you act on it. Nothing here is tax, accounting, or financial advice.
                    </p>
                    {" "}
                  </div>
                  {" "}
                </section>
                {" "}
              </div>
            </>
          ) : null}
          {v.showGst ? (
            <>
              {" "}
              <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "52px 24px 80px" }}>
                {" "}
                <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                  Sales tax
                </span>
                {" "}
                <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.4vw,40px)", lineHeight: "1.1", letterSpacing: "-0.02em", marginBottom: "14px", textWrap: "pretty" }}>
                  GST/HST Calculator
                </h1>
                {" "}
                <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#667085", maxWidth: "62ch", marginBottom: "38px", textWrap: "pretty" }}>
                  Work out what to charge, or back out the tax from a total you have already been paid. Covers GST, HST, and the provinces that run a separate PST, RST, or QST.
                </p>
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,0.85fr) minmax(300px,1.15fr)", gap: "34px", alignItems: "start" }}>
                  {" "}
                  <form onSubmit={v.noSubmit} style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "26px", display: "flex", flexDirection: "column", gap: "20px", background: "#fff" }}>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Province or territory
                      </span>
                      {" "}
                      <select value={v.gstProv} onChange={v.onGstProv} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px", background: "#fff" }}>
                        {" "}
                        {(v.provinceNames || []).map((p: any, _i12: number) => (
                          <Fragment key={p?.key ?? p?.id ?? p?.slug ?? _i12}>
                            <option>
                              {p}
                            </option>
                          </Fragment>
                        ))}
                        {" "}
                      </select>
                      {" "}
                    </label>
                    {" "}
                    <fieldset style={{ border: "0", padding: "0", margin: "0", display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <legend style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085", padding: "0", marginBottom: "2px" }}>
                        Amount entered is
                      </legend>
                      {" "}
                      <div style={{ display: "flex", gap: "8px" }}>
                        {" "}
                        <button type="button" onClick={v.setGstAdd} aria-pressed={v.gstAddOn} style={{ flex: "1", padding: "11px 10px", borderRadius: "8px", border: `1.5px solid ${v.gstAddBorder ?? ""}`, background: v.gstAddBg, color: v.gstAddFg, fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13.5px", cursor: "pointer" }}>
                          Before tax
                        </button>
                        {" "}
                        <button type="button" onClick={v.setGstRemove} aria-pressed={v.gstRemoveOn} style={{ flex: "1", padding: "11px 10px", borderRadius: "8px", border: `1.5px solid ${v.gstRemBorder ?? ""}`, background: v.gstRemBg, color: v.gstRemFg, fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13.5px", cursor: "pointer" }}>
                          Tax included
                        </button>
                        {" "}
                      </div>
                      {" "}
                    </fieldset>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Amount (CAD)
                      </span>
                      {" "}
                      <input type="number" min="0" step="0.01" value={v.gstAmount} onChange={v.onGstAmount} onInput={v.onGstAmount} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                  </form>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {" "}
                    <div style={{ background: "#101828", color: "#fff", borderRadius: "10px", padding: "28px" }}>
                      {" "}
                      <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "8px" }}>
                        {v.gstTotalLabel}
                      </span>
                      {" "}
                      <strong style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "clamp(30px,4vw,44px)", letterSpacing: "-0.02em", lineHeight: "1.05" }}>
                        {v.gstTotal}
                      </strong>
                      {" "}
                      <span style={{ display: "block", marginTop: "10px", fontSize: "14.5px", color: "#C8CDD6" }}>
                        {v.gstRateNote}
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <table style={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }}>
                      {" "}
                      <caption style={{ textAlign: "left", padding: "16px 20px", background: "#F4F6F8", borderBottom: "1px solid #E4E7EC", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#101828" }}>
                        Breakdown
                      </caption>
                      {" "}
                      <tbody>
                        {" "}
                        {(v.gstRows || []).map((r: any, _i12: number) => (
                          <Fragment key={r?.key ?? r?.id ?? r?.slug ?? _i12}>
                            {" "}
                            <tr style={{ borderBottom: "1px solid #F0F2F5" }}>
                              {" "}
                              <th scope="row" style={{ textAlign: "left", padding: "14px 20px", fontWeight: r?.weight, fontSize: "14.5px", color: "#475467" }}>
                                {r?.label}
                              </th>
                              {" "}
                              <td style={{ textAlign: "right", padding: "14px 20px", fontFamily: "Sora,sans-serif", fontWeight: r?.weight, fontSize: "15px", color: "#101828" }}>
                                {r?.value}
                              </td>
                              {" "}
                            </tr>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </tbody>
                      {" "}
                    </table>
                    {" "}
                    <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#667085", textWrap: "pretty" }}>
                      {v.gstGuidance}
                    </p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <section style={{ marginTop: "56px", borderTop: "1px solid #E4E7EC", paddingTop: "36px" }}>
                  {" "}
                  <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "21px", marginBottom: "18px" }}>
                    Rates across Canada
                  </h2>
                  {" "}
                  <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }}>
                    {" "}
                    <table>
                      {" "}
                      <thead>
                        {" "}
                        <tr style={{ background: "#F4F6F8" }}>
                          {" "}
                          <th scope="col" style={{ textAlign: "left", padding: "13px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", borderBottom: "1px solid #E4E7EC" }}>
                            Province / territory
                          </th>
                          {" "}
                          <th scope="col" style={{ textAlign: "left", padding: "13px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", borderBottom: "1px solid #E4E7EC" }}>
                            System
                          </th>
                          {" "}
                          <th scope="col" style={{ textAlign: "right", padding: "13px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085", borderBottom: "1px solid #E4E7EC" }}>
                            Total rate
                          </th>
                          {" "}
                        </tr>
                        {" "}
                      </thead>
                      {" "}
                      <tbody>
                        {" "}
                        {(v.gstTable || []).map((row: any, _i12: number) => (
                          <Fragment key={row?.key ?? row?.id ?? row?.slug ?? _i12}>
                            {" "}
                            <tr style={{ borderBottom: "1px solid #F0F2F5", background: row?.bg }}>
                              {" "}
                              <th scope="row" style={{ textAlign: "left", padding: "13px 18px", fontWeight: "600", fontSize: "14.5px", color: "#101828" }}>
                                {row?.name}
                              </th>
                              {" "}
                              <td style={{ padding: "13px 18px", fontSize: "14px", color: "#667085" }}>
                                {row?.system}
                              </td>
                              {" "}
                              <td style={{ textAlign: "right", padding: "13px 18px", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "14.5px", color: "#101828" }}>
                                {row?.rate}
                              </td>
                              {" "}
                            </tr>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </tbody>
                      {" "}
                    </table>
                    {" "}
                  </div>
                  {" "}
                  <p style={{ marginTop: "20px", fontSize: "14px", lineHeight: "1.7", color: "#667085", maxWidth: "78ch", textWrap: "pretty" }}>
                    You must register for GST/HST once your worldwide taxable revenue passes $30,000 in a single calendar quarter or over four consecutive quarters. Registering voluntarily below that threshold lets you claim input tax credits on your own purchases.
                  </p>
                  {" "}
                </section>
                {" "}
              </div>
            </>
          ) : null}
          {v.showPayroll ? (
            <>
              {" "}
              <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "52px 24px 80px" }}>
                {" "}
                <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                  Payroll
                </span>
                {" "}
                <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.4vw,40px)", lineHeight: "1.1", letterSpacing: "-0.02em", marginBottom: "14px", textWrap: "pretty" }}>
                  Payroll Deductions Estimator
                </h1>
                {" "}
                <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#667085", maxWidth: "64ch", marginBottom: "38px", textWrap: "pretty" }}>
                  Estimate CPP, EI, and income tax withheld per pay period, plus the employer contributions that land on top of the salary. Uses {v.taxYear} ceilings.
                </p>
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,0.85fr) minmax(320px,1.15fr)", gap: "34px", alignItems: "start" }}>
                  {" "}
                  <form onSubmit={v.noSubmit} style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "26px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    {" "}
                    <fieldset style={{ border: "0", padding: "0", margin: "0", display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <legend style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085", padding: "0", marginBottom: "2px" }}>
                        This employee is paid
                      </legend>
                      {" "}
                      <div style={{ display: "flex", gap: "8px" }}>
                        {" "}
                        <button type="button" onClick={v.setPaySalary} aria-pressed={v.payIsSalary} style={{ flex: "1", padding: "11px 10px", borderRadius: "8px", border: `1.5px solid ${v.paySalBorder ?? ""}`, background: v.paySalBg, color: v.paySalFg, fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13.5px", cursor: "pointer" }}>
                          Salary
                        </button>
                        {" "}
                        <button type="button" onClick={v.setPayHourly} aria-pressed={v.payIsHourly} style={{ flex: "1", padding: "11px 10px", borderRadius: "8px", border: `1.5px solid ${v.payHrBorder ?? ""}`, background: v.payHrBg, color: v.payHrFg, fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "13.5px", cursor: "pointer" }}>
                          Hourly
                        </button>
                        {" "}
                      </div>
                      {" "}
                    </fieldset>
                    {" "}
                    {v.payIsSalary ? (
                      <>
                        {" "}
                        <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                          {" "}
                          <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                            Annual gross salary (CAD)
                          </span>
                          {" "}
                          <input type="number" min="0" step="500" value={v.payGross} onChange={v.onPayGross} onInput={v.onPayGross} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                          {" "}
                        </label>
                        {" "}
                      </>
                    ) : null}
                    {" "}
                    {v.payIsHourly ? (
                      <>
                        {" "}
                        <div style={{ display: "flex", gap: "12px" }}>
                          {" "}
                          <label style={{ display: "flex", flexDirection: "column", gap: "7px", flex: "1" }}>
                            {" "}
                            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                              Hourly rate
                            </span>
                            {" "}
                            <input type="number" min="0" step="0.25" value={v.payRate} onChange={v.onPayRate} onInput={v.onPayRate} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                            {" "}
                          </label>
                          {" "}
                          <label style={{ display: "flex", flexDirection: "column", gap: "7px", flex: "1" }}>
                            {" "}
                            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                              Hours a week
                            </span>
                            {" "}
                            <input type="number" min="0" max="80" step="0.5" value={v.payHours} onChange={v.onPayHours} onInput={v.onPayHours} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                            {" "}
                          </label>
                          {" "}
                        </div>
                        {" "}
                        <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#667085", textWrap: "pretty" }}>
                          {v.payGrossNote}
                        </p>
                        {" "}
                      </>
                    ) : null}
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Province of employment
                      </span>
                      {" "}
                      <select value={v.payProv} onChange={v.onPayProv} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px", background: "#fff" }}>
                        {" "}
                        {(v.provinceNames || []).map((p: any, _i12: number) => (
                          <Fragment key={p?.key ?? p?.id ?? p?.slug ?? _i12}>
                            <option>
                              {p}
                            </option>
                          </Fragment>
                        ))}
                        {" "}
                      </select>
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Pay frequency
                      </span>
                      {" "}
                      <select value={v.payFreq} onChange={v.onPayFreq} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px", background: "#fff" }}>
                        {" "}
                        {(v.freqNames || []).map((f: any, _i12: number) => (
                          <Fragment key={f?.key ?? f?.id ?? f?.slug ?? _i12}>
                            <option>
                              {f}
                            </option>
                          </Fragment>
                        ))}
                        {" "}
                      </select>
                      {" "}
                    </label>
                    {" "}
                    <p style={{ fontSize: "13px", lineHeight: "1.65", color: "#98A2B3", textWrap: "pretty" }}>
                      Assumes the basic personal amount only, no additional TD1 credits, no taxable benefits, and no employer pension or union deductions.
                    </p>
                    {" "}
                  </form>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {" "}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "14px" }}>
                      {" "}
                      <div style={{ background: "#101828", color: "#fff", borderRadius: "10px", padding: "24px" }}>
                        {" "}
                        <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "8px" }}>
                          Net pay per period
                        </span>
                        {" "}
                        <strong style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "clamp(26px,3vw,34px)", letterSpacing: "-0.02em", lineHeight: "1.05" }}>
                          {v.payNet}
                        </strong>
                        {" "}
                        <span style={{ display: "block", marginTop: "8px", fontSize: "13.5px", color: "#C8CDD6" }}>
                          {v.payPeriodNote}
                        </span>
                        {" "}
                        <span style={{ display: "block", marginTop: "4px", fontSize: "12.5px", color: "#98A2B3" }}>
                          {v.payHourlyEquiv}
                        </span>
                        {" "}
                      </div>
                      {" "}
                      <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "24px" }}>
                        {" "}
                        <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "8px" }}>
                          True cost to employer
                        </span>
                        {" "}
                        <strong style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "clamp(26px,3vw,34px)", letterSpacing: "-0.02em", lineHeight: "1.05", color: "#101828" }}>
                          {v.payEmployerCost}
                        </strong>
                        {" "}
                        <span style={{ display: "block", marginTop: "8px", fontSize: "13.5px", color: "#667085" }}>
                          {v.payEmployerNote}
                        </span>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <table style={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }}>
                      {" "}
                      <caption style={{ textAlign: "left", padding: "16px 20px", background: "#F4F6F8", borderBottom: "1px solid #E4E7EC", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#101828" }}>
                        Per pay period
                      </caption>
                      {" "}
                      <thead>
                        {" "}
                        <tr>
                          {" "}
                          <th scope="col" style={{ textAlign: "left", padding: "11px 20px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                            Item
                          </th>
                          {" "}
                          <th scope="col" style={{ textAlign: "right", padding: "11px 20px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                            Employee
                          </th>
                          {" "}
                          <th scope="col" style={{ textAlign: "right", padding: "11px 20px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                            Employer
                          </th>
                          {" "}
                        </tr>
                        {" "}
                      </thead>
                      {" "}
                      <tbody>
                        {" "}
                        {(v.payRows || []).map((r: any, _i12: number) => (
                          <Fragment key={r?.key ?? r?.id ?? r?.slug ?? _i12}>
                            {" "}
                            <tr style={{ borderBottom: "1px solid #F0F2F5", background: r?.bg }}>
                              {" "}
                              <th scope="row" style={{ textAlign: "left", padding: "13px 20px", fontWeight: r?.weight, fontSize: "14.5px", color: "#475467" }}>
                                {r?.label}
                              </th>
                              {" "}
                              <td style={{ textAlign: "right", padding: "13px 20px", fontFamily: "Sora,sans-serif", fontWeight: r?.weight, fontSize: "14.5px", color: "#101828" }}>
                                {r?.employee}
                              </td>
                              {" "}
                              <td style={{ textAlign: "right", padding: "13px 20px", fontFamily: "Sora,sans-serif", fontWeight: r?.weight, fontSize: "14.5px", color: "#667085" }}>
                                {r?.employer}
                              </td>
                              {" "}
                            </tr>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </tbody>
                      {" "}
                    </table>
                    {" "}
                    <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "22px 24px" }}>
                      {" "}
                      <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#101828", marginBottom: "14px" }}>
                        {v.taxYear} ceilings used
                      </h2>
                      {" "}
                      <ul style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                        {" "}
                        {(v.payCeilings || []).map((c: any, _i12: number) => (
                          <Fragment key={c?.key ?? c?.id ?? c?.slug ?? _i12}>
                            {" "}
                            <li style={{ display: "flex", justifyContent: "space-between", gap: "16px", fontSize: "14px", color: "#475467", borderBottom: "1px solid #F0F2F5", paddingBottom: "9px" }}>
                              <span>
                                {c?.label}
                              </span>
                              <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", color: "#101828", whiteSpace: "nowrap" }}>
                                {c?.value}
                              </span>
                            </li>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </ul>
                      {" "}
                    </div>
                    {" "}
                    <p style={{ padding: "20px 22px", background: "#F4F6F8", borderLeft: "3px solid #D4A72C", fontSize: "14px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                      {v.payRemitNote}
                    </p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
            </>
          ) : null}
          {v.showCash ? (
            <>
              {" "}
              <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "52px 24px 80px" }}>
                {" "}
                <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                  Cash flow
                </span>
                {" "}
                <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.4vw,40px)", lineHeight: "1.1", letterSpacing: "-0.02em", marginBottom: "14px", textWrap: "pretty" }}>
                  13-Week Cash-Flow Forecaster
                </h1>
                {" "}
                <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#667085", maxWidth: "64ch", marginBottom: "38px", textWrap: "pretty" }}>
                  A quarter is the horizon most owners can actually see. This projects your bank balance week by week and flags the week you run out — including the remittances that catch people off guard.
                </p>
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,0.8fr) minmax(340px,1.2fr)", gap: "34px", alignItems: "start" }}>
                  {" "}
                  <form onSubmit={v.noSubmit} style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "26px", display: "flex", flexDirection: "column", gap: "19px" }}>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Opening bank balance
                      </span>
                      {" "}
                      <input type="number" step="500" value={v.cashOpening} onChange={v.onCashOpening} onInput={v.onCashOpening} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Average weekly collections
                      </span>
                      {" "}
                      <input type="number" min="0" step="250" value={v.cashIn} onChange={v.onCashIn} onInput={v.onCashIn} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Average weekly operating costs
                      </span>
                      {" "}
                      <input type="number" min="0" step="250" value={v.cashOut} onChange={v.onCashOut} onInput={v.onCashOut} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Payroll per run
                      </span>
                      {" "}
                      <input type="number" min="0" step="250" value={v.cashPayroll} onChange={v.onCashPayroll} onInput={v.onCashPayroll} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Payroll runs
                      </span>
                      {" "}
                      <select value={v.cashPayrollFreq} onChange={v.onCashPayrollFreq} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px", background: "#fff" }}>
                        {" "}
                        <option>
                          Weekly
                        </option>
                        {" "}
                        <option>
                          Every two weeks
                        </option>
                        {" "}
                        <option>
                          Twice a month
                        </option>
                        {" "}
                        <option>
                          Monthly
                        </option>
                        {" "}
                      </select>
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Quarterly GST/HST remittance
                      </span>
                      {" "}
                      <input type="number" min="0" step="250" value={v.cashGst} onChange={v.onCashGst} onInput={v.onCashGst} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Other one-off cost
                      </span>
                      {" "}
                      <input type="number" min="0" step="250" value={v.cashOneOff} onChange={v.onCashOneOff} onInput={v.onCashOneOff} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Week it lands
                      </span>
                      {" "}
                      <input type="number" min="1" max="13" step="1" value={v.cashOneOffWeek} onChange={v.onCashOneOffWeek} onInput={v.onCashOneOffWeek} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                  </form>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {" "}
                    <div style={{ background: v.cashVerdictBg, color: v.cashVerdictFg, borderRadius: "10px", padding: "28px", border: `1px solid ${v.cashVerdictBorder ?? ""}` }}>
                      {" "}
                      <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", opacity: "0.75", marginBottom: "8px" }}>
                        Lowest point in 13 weeks
                      </span>
                      {" "}
                      <strong style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "clamp(28px,3.6vw,40px)", letterSpacing: "-0.02em", lineHeight: "1.05" }}>
                        {v.cashLow}
                      </strong>
                      {" "}
                      <span style={{ display: "block", marginTop: "10px", fontSize: "15px", lineHeight: "1.6", textWrap: "pretty" }}>
                        {v.cashVerdict}
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }}>
                      {" "}
                      <table>
                        {" "}
                        <caption style={{ textAlign: "left", padding: "16px 20px", background: "#F4F6F8", borderBottom: "1px solid #E4E7EC", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#101828" }}>
                          Week by week
                        </caption>
                        {" "}
                        <thead>
                          {" "}
                          <tr>
                            {" "}
                            <th scope="col" style={{ textAlign: "left", padding: "11px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                              Week
                            </th>
                            {" "}
                            <th scope="col" style={{ textAlign: "right", padding: "11px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                              In
                            </th>
                            {" "}
                            <th scope="col" style={{ textAlign: "right", padding: "11px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                              Out
                            </th>
                            {" "}
                            <th scope="col" style={{ textAlign: "right", padding: "11px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                              Balance
                            </th>
                            {" "}
                          </tr>
                          {" "}
                        </thead>
                        {" "}
                        <tbody>
                          {" "}
                          {(v.cashRows || []).map((w: any, _i13: number) => (
                            <Fragment key={w?.key ?? w?.id ?? w?.slug ?? _i13}>
                              {" "}
                              <tr style={{ borderBottom: "1px solid #F0F2F5", background: w?.bg }}>
                                {" "}
                                <th scope="row" style={{ textAlign: "left", padding: "12px 18px", fontWeight: "600", fontSize: "14px", color: "#101828" }}>
                                  {w?.week}
                                  <span style={{ display: "block", fontWeight: "400", fontSize: "12px", color: "#98A2B3" }}>
                                    {w?.note}
                                  </span>
                                </th>
                                {" "}
                                <td style={{ textAlign: "right", padding: "12px 18px", fontFamily: "Sora,sans-serif", fontSize: "14px", color: "#12805C" }}>
                                  {w?.inflow}
                                </td>
                                {" "}
                                <td style={{ textAlign: "right", padding: "12px 18px", fontFamily: "Sora,sans-serif", fontSize: "14px", color: "#667085" }}>
                                  {w?.outflow}
                                </td>
                                {" "}
                                <td style={{ textAlign: "right", padding: "12px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14.5px", color: w?.color }}>
                                  {w?.balance}
                                </td>
                                {" "}
                              </tr>
                              {" "}
                            </Fragment>
                          ))}
                          {" "}
                        </tbody>
                        {" "}
                      </table>
                      {" "}
                    </div>
                    {" "}
                    <p style={{ padding: "20px 22px", background: "#F4F6F8", borderLeft: "3px solid #D4A72C", fontSize: "14px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                      Remittances are money you collected on the government's behalf, not revenue. If the forecast only works because the GST/HST sitting in your account hasn't been remitted yet, the business is short — move it to a separate account and forecast without it.
                    </p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
            </>
          ) : null}
          {v.showLoan ? (
            <>
              {" "}
              <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "52px 24px 80px" }}>
                {" "}
                <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D71920", marginBottom: "12px" }}>
                  Financing
                </span>
                {" "}
                <h1 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "clamp(28px,3.4vw,40px)", lineHeight: "1.1", letterSpacing: "-0.02em", marginBottom: "14px", textWrap: "pretty" }}>
                  Loan Payment Calculator
                </h1>
                {" "}
                <p style={{ fontSize: "16.5px", lineHeight: "1.7", color: "#667085", maxWidth: "64ch", marginBottom: "38px", textWrap: "pretty" }}>
                  Compare what the same borrowing costs as a term loan, an operating line, or equipment financing — and what each does to your monthly cash requirement.
                </p>
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,0.8fr) minmax(340px,1.2fr)", gap: "34px", alignItems: "start" }}>
                  {" "}
                  <form onSubmit={v.noSubmit} style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "26px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Amount borrowed
                      </span>
                      {" "}
                      <input type="number" min="0" step="1000" value={v.loanAmount} onChange={v.onLoanAmount} onInput={v.onLoanAmount} style={{ padding: "12px 13px", border: "1.5px solid #D0D5DD", borderRadius: "8px", fontSize: "15px" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Annual interest rate — {v.loanRateLabel}
                      </span>
                      {" "}
                      <input type="range" min="3" max="16" step="0.25" value={v.loanRate} onChange={v.onLoanRate} onInput={v.onLoanRate} style={{ accentColor: "#D71920" }} />
                      {" "}
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Term — {v.loanTermLabel}
                      </span>
                      {" "}
                      <input type="range" min="1" max="15" step="1" value={v.loanYears} onChange={v.onLoanYears} onInput={v.onLoanYears} style={{ accentColor: "#D71920" }} />
                      {" "}
                    </label>
                    {" "}
                    <div style={{ borderTop: "1px solid #F0F2F5", paddingTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {" "}
                      <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "11px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#667085" }}>
                        Typical starting points
                      </span>
                      {" "}
                      {(v.loanPresets || []).map((p: any, _i11: number) => (
                        <Fragment key={p?.key ?? p?.id ?? p?.slug ?? _i11}>
                          {" "}
                          <button type="button" onClick={p?.apply} style={{ textAlign: "left", padding: "13px 15px", border: "1.5px solid #E4E7EC", borderRadius: "8px", background: "#fff", cursor: "pointer", display: "flex", flexDirection: "column", gap: "3px" }} className="h_9f7643d">
                            {" "}
                            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#101828" }}>
                              {p?.label}
                            </span>
                            {" "}
                            <span style={{ fontSize: "12.5px", color: "#667085" }}>
                              {p?.detail}
                            </span>
                            {" "}
                          </button>
                          {" "}
                        </Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                  </form>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {" "}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(165px,1fr))", gap: "14px" }}>
                      {" "}
                      <div style={{ background: "#101828", color: "#fff", borderRadius: "10px", padding: "24px" }}>
                        {" "}
                        <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "8px" }}>
                          Monthly payment
                        </span>
                        {" "}
                        <strong style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "clamp(24px,2.8vw,32px)", letterSpacing: "-0.02em", lineHeight: "1.05" }}>
                          {v.loanMonthly}
                        </strong>
                        {" "}
                      </div>
                      {" "}
                      <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "24px" }}>
                        {" "}
                        <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "8px" }}>
                          Total interest
                        </span>
                        {" "}
                        <strong style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "clamp(24px,2.8vw,32px)", letterSpacing: "-0.02em", lineHeight: "1.05", color: "#101828" }}>
                          {v.loanInterest}
                        </strong>
                        {" "}
                      </div>
                      {" "}
                      <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "24px" }}>
                        {" "}
                        <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "600", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#98A2B3", marginBottom: "8px" }}>
                          Total repaid
                        </span>
                        {" "}
                        <strong style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "clamp(24px,2.8vw,32px)", letterSpacing: "-0.02em", lineHeight: "1.05", color: "#101828" }}>
                          {v.loanTotal}
                        </strong>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <table style={{ border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden" }}>
                      {" "}
                      <caption style={{ textAlign: "left", padding: "16px 20px", background: "#F4F6F8", borderBottom: "1px solid #E4E7EC", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "13px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#101828" }}>
                        Same money, three structures
                      </caption>
                      {" "}
                      <thead>
                        {" "}
                        <tr>
                          {" "}
                          <th scope="col" style={{ textAlign: "left", padding: "11px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                            Structure
                          </th>
                          {" "}
                          <th scope="col" style={{ textAlign: "right", padding: "11px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                            Monthly
                          </th>
                          {" "}
                          <th scope="col" style={{ textAlign: "right", padding: "11px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#98A2B3", borderBottom: "1px solid #F0F2F5" }}>
                            Interest cost
                          </th>
                          {" "}
                        </tr>
                        {" "}
                      </thead>
                      {" "}
                      <tbody>
                        {" "}
                        {(v.loanCompare || []).map((c: any, _i12: number) => (
                          <Fragment key={c?.key ?? c?.id ?? c?.slug ?? _i12}>
                            {" "}
                            <tr style={{ borderBottom: "1px solid #F0F2F5" }}>
                              {" "}
                              <th scope="row" style={{ textAlign: "left", padding: "14px 18px", fontWeight: "600", fontSize: "14.5px", color: "#101828" }}>
                                {c?.name}
                                <span style={{ display: "block", fontWeight: "400", fontSize: "12.5px", color: "#667085", lineHeight: "1.5", marginTop: "3px", textWrap: "pretty" }}>
                                  {c?.note}
                                </span>
                              </th>
                              {" "}
                              <td style={{ textAlign: "right", padding: "14px 18px", fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14.5px", color: "#101828", verticalAlign: "top" }}>
                                {c?.monthly}
                              </td>
                              {" "}
                              <td style={{ textAlign: "right", padding: "14px 18px", fontFamily: "Sora,sans-serif", fontSize: "14.5px", color: "#667085", verticalAlign: "top" }}>
                                {c?.interest}
                              </td>
                              {" "}
                            </tr>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </tbody>
                      {" "}
                    </table>
                    {" "}
                    <div style={{ border: "1px solid #E4E7EC", borderRadius: "10px", padding: "24px" }}>
                      {" "}
                      <h2 style={{ fontFamily: "Sora,sans-serif", fontWeight: "700", fontSize: "14px", letterSpacing: "0.04em", textTransform: "uppercase", color: "#101828", marginBottom: "14px" }}>
                        Before you sign
                      </h2>
                      {" "}
                      <ul style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                        {" "}
                        {(v.loanChecklist || []).map((c: any, _i12: number) => (
                          <Fragment key={c?.key ?? c?.id ?? c?.slug ?? _i12}>
                            {" "}
                            <li style={{ display: "flex", gap: "11px", fontSize: "14.5px", lineHeight: "1.65", color: "#475467", textWrap: "pretty" }}>
                              <span style={{ color: "#D71920", fontFamily: "Sora,sans-serif", fontWeight: "700", flexShrink: "0" }}>
                                →
                              </span>
                              <span>
                                {c}
                              </span>
                            </li>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </ul>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
            </>
          ) : null}
        </main>
        <footer style={{ background: "#101828", color: "#98A2B3", marginTop: "auto" }}>
          {" "}
          <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "44px 24px", display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start" }}>
            {" "}
            <div style={{ maxWidth: "52ch" }}>
              {" "}
              <span style={{ display: "block", fontFamily: "Sora,sans-serif", fontWeight: "800", fontSize: "16px", color: "#fff", marginBottom: "10px" }}>
                CanadianSME Business Tools
              </span>
              {" "}
              <p style={{ fontSize: "13.5px", lineHeight: "1.7", textWrap: "pretty" }}>
                For example and reference only. Illustrative estimates based on published {v.taxYear} federal and provincial rates, using simplified assumptions — not exact figures. Do not use them to file, remit, or commit to financing. Confirm payroll amounts against the CRA Payroll Deductions Online Calculator and check any figure with your accountant. Not tax, accounting, or financial advice.
              </p>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {" "}
              {(v.tools || []).map((t: any, _i7: number) => (
                <Fragment key={t?.key ?? t?.id ?? t?.slug ?? _i7}>
                  {" "}
                  <a href={tu(t?.hash)} style={{ fontSize: "13.5px", color: "#98A2B3" }} className="h_1f6476f">
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
          <div style={{ borderTop: "1px solid #33394A" }}>
            {" "}
            <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "18px 24px", fontSize: "12.5px" }}>
              Published by Cmarketing Inc., Mississauga, Ontario.
            </div>
            {" "}
          </div>
        </footer>
      </div>
    </div>
  )
}
