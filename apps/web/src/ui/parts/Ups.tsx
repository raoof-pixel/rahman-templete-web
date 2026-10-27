'use client'
/* Generated from the CanadianSME design prototype (CanadianSME Homepage.dc.html), then wired to CMS data.
   Markup and inline styles are kept 1:1 with the prototype; hover/focus styles live in states.css. */
import { Fragment } from 'react'

import { useV } from '../context'
import { u } from '../href'
import { Slot } from '../Slot'

export default function Ups() {
  const v = useV()
  return (
    <>
      <div>
        {" "}
        <nav aria-label="Breadcrumb" style={{ background: "#F4F6F8", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 24px", fontSize: "12.5px", color: "#5A6470", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <a href={u("#home")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              Home
            </a>
            <span aria-hidden="true">
              /
            </span>
            <a href={u("#about")} style={{ color: "#5A6470" }} className="h_9e87cbe">
              About Us
            </a>
            <span aria-hidden="true">
              /
            </span>
            <span style={{ color: "#14181D" }}>
              UPS Small Business of the Day
            </span>
          </div>
          {" "}
        </nav>
        {" "}
        <section aria-labelledby="ups-h1" style={{ background: "#101828", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "52px", alignItems: "center" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {" "}
              <img src="https://canadiansme.ca/wp-content/uploads/2023/12/UPSlogo-1920w.webp" alt="UPS" style={{ width: "64px", height: "auto", display: "block" }} />
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#7FA3E8" }}>
                Partner programme · Powered by CanadianSME
              </span>
              {" "}
              <h1 id="ups-h1" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(34px,4.4vw,56px)", lineHeight: "1.04", letterSpacing: "-0.025em", textWrap: "pretty" }}>
                UPS Small Business of the Day
              </h1>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#D0D5DD", textWrap: "pretty" }}>
                Welcome to UPS Small Business of the Day, powered by CanadianSME, a leading platform for promoting small and medium-sized businesses across Canada. The campaign promotes your small business and its offerings to a national audience.
              </p>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#D0D5DD", textWrap: "pretty" }}>
                It helps grow your potential customer base and brand identity. CanadianSME, together with UPS, the world’s largest package delivery company, helps Canadian small companies build brand awareness and sell their goods and services.
              </p>
              {" "}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "6px" }}>
                {" "}
                <a href="https://forms.canadiansme.ca/ups-small-business" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }} className="h_635546e">
                  Apply now
                </a>
                {" "}
                <a href={u("#ups-featured")} style={{ display: "inline-flex", alignItems: "center", padding: "13px 22px", borderRadius: "8px", border: "1.5px solid #fff", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px" }} className="h_f5a17ae">
                  See featured businesses
                </a>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="https://canadiansme.ca/wp-content/uploads/2023/12/UPS-Web-1-1160x1502-1.jpg" alt="UPS Small Business of the Day, powered by CanadianSME" style={{ width: "100%", maxWidth: "420px", height: "auto", display: "block", borderRadius: "10px", boxShadow: "0 18px 40px rgba(0,0,0,0.35)" }} />
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section id="ups-featured" aria-labelledby="ups-feat-h" style={{ padding: "72px max(24px,calc((100% - 1232px) / 2))", scrollMarginTop: "96px" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap", paddingBottom: "14px", marginBottom: "28px", borderBottom: "2px solid #101828" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                Featured
              </span>
              <h2 id="ups-feat-h" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.16", letterSpacing: "-0.015em", color: "#14181D", textWrap: "pretty" }}>
                Featured UPS Small Businesses of the Day
              </h2>
            </div>
            {" "}
            <a href="https://canadiansme.ca/category/ups-small-business-of-the-day/" target="_blank" rel="noopener" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }}>
              Explore more →
            </a>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: "24px" }}>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }} className="h_da5fcc5">
              {" "}
              <a href={u("#post-lemon-lily-tea-brings-natural-flavours-and-sustainable-innovation-to-canadian-tea-lovers")} style={{ display: "block", aspectRatio: "7/5", background: "#F4F6F8", overflow: "hidden" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2026/10/Lemon-Lily.jpg" alt="A Lemon Lily tea pouch standing in front of colourful cocktails on a beach, and a box set of Lemon Lily tea pouches and a jar of Lux." style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Small Business of the Day
                </span>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                  <a href={u("#post-lemon-lily-tea-brings-natural-flavours-and-sustainable-innovation-to-canadian-tea-lovers")} style={{ color: "#14181D", textDecoration: "none" }} className="h_9e87cbe">
                    Lemon Lily Tea Brings Natural Flavours and Sustainable Innovation to Canadian Tea Lovers
                  </a>
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  As Canadians grow more concerned about what’s in their daily cup…
                </p>
                {" "}
                <span style={{ marginTop: "auto", fontSize: "13px", color: "#5A6470" }}>
                  October 20, 2026
                </span>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }} className="h_da5fcc5">
              {" "}
              <a href={u("#post-park-fifth-co-redefining-canadian-occasion-wear-with-timeless-elegance-and-sustainable-fashion")} style={{ display: "block", aspectRatio: "7/5", background: "#F4F6F8", overflow: "hidden" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2026/10/Park-Fifth-Co.jpg" alt="Split image showing a clothing boutique with racks of dresses on the left, and a bride with her bridesmaids holding bouquets on the right." style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Small Business of the Day
                </span>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                  <a href={u("#post-park-fifth-co-redefining-canadian-occasion-wear-with-timeless-elegance-and-sustainable-fashion")} style={{ color: "#14181D", textDecoration: "none" }} className="h_9e87cbe">
                    Park &amp; Fifth Co: Redefining Canadian Occasion Wear with Timeless Elegance and Sustainable Fashion
                  </a>
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  Learn how Vancouver-based Park &amp; Fifth Co is reinventing wedding…
                </p>
                {" "}
                <span style={{ marginTop: "auto", fontSize: "13px", color: "#5A6470" }}>
                  October 20, 2026
                </span>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }} className="h_da5fcc5">
              {" "}
              <a href={u("#post-nanuk-protecting-valuable-gear-with-canadian-made-innovation")} style={{ display: "block", aspectRatio: "7/5", background: "#F4F6F8", overflow: "hidden" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2026/10/NANUK.jpg" alt="A person carrying a black Nanuk shoulder bag next to two Nanuk coolers on sandy terrain." style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Small Business of the Day
                </span>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                  <a href={u("#post-nanuk-protecting-valuable-gear-with-canadian-made-innovation")} style={{ color: "#14181D", textDecoration: "none" }} className="h_9e87cbe">
                    NANUK: Protecting Valuable Gear with Canadian-Made Innovation
                  </a>
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  When important equipment must travel through rain, dust, collision, harsh…
                </p>
                {" "}
                <span style={{ marginTop: "auto", fontSize: "13px", color: "#5A6470" }}>
                  October 20, 2026
                </span>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }} className="h_da5fcc5">
              {" "}
              <a href={u("#post-larch-wood-canada-crafting-heirloom-kitchen-essentials-from-cape-breton")} style={{ display: "block", aspectRatio: "7/5", background: "#F4F6F8", overflow: "hidden" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2026/10/Larch-Wood.jpg" alt="A Larch Wood store exterior with an A-frame chalkboard sign, and an interior display of wooden cutting boards." style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Small Business of the Day
                </span>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                  <a href={u("#post-larch-wood-canada-crafting-heirloom-kitchen-essentials-from-cape-breton")} style={{ color: "#14181D", textDecoration: "none" }} className="h_9e87cbe">
                    Larch Wood Canada: Crafting Heirloom Kitchen Essentials from Cape Breton
                  </a>
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  Larch Wood Canada, based in East Margaree on Cape Breton…
                </p>
                {" "}
                <span style={{ marginTop: "auto", fontSize: "13px", color: "#5A6470" }}>
                  October 20, 2026
                </span>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }} className="h_da5fcc5">
              {" "}
              <a href={u("#post-grynd-building-canadian-sports-nutrition-around-real-food-and-better-fuel")} style={{ display: "block", aspectRatio: "7/5", background: "#F4F6F8", overflow: "hidden" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2026/10/Grynd-Food-Inc.jpg" alt="Two pouches of Grynd endurance butter next to a woman eating a Grynd maple sea salt energy waffle." style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Small Business of the Day
                </span>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                  <a href={u("#post-grynd-building-canadian-sports-nutrition-around-real-food-and-better-fuel")} style={{ color: "#14181D", textDecoration: "none" }} className="h_9e87cbe">
                    GRYND: Building Canadian Sports Nutrition Around Real Food and Better Fuel
                  </a>
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  For athletes, nutrition is frequently a practical question. Can food…
                </p>
                {" "}
                <span style={{ marginTop: "auto", fontSize: "13px", color: "#5A6470" }}>
                  October 20, 2026
                </span>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }} className="h_da5fcc5">
              {" "}
              <a href={u("#post-neferland-creating-smarter-sustainable-products-for-messy-childhood-moments")} style={{ display: "block", aspectRatio: "7/5", background: "#F4F6F8", overflow: "hidden" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2026/10/Neferland.jpg" alt="A Neferland retail display of baby bibs and smocks, and a toddler wearing an olive-print waterproof smock in a high chair." style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
              {" "}
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                  Small Business of the Day
                </span>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "17.5px", lineHeight: "1.3", textWrap: "pretty" }}>
                  <a href={u("#post-neferland-creating-smarter-sustainable-products-for-messy-childhood-moments")} style={{ color: "#14181D", textDecoration: "none" }} className="h_9e87cbe">
                    Neferland: Creating Smarter, Sustainable Products for Messy Childhood Moments
                  </a>
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  Childhood is inherently messy. From first foods and finger painting…
                </p>
                {" "}
                <span style={{ marginTop: "auto", fontSize: "13px", color: "#5A6470" }}>
                  October 20, 2026
                </span>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="ups-about-h" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC", borderBottom: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "72px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "52px", alignItems: "center" }}>
            {" "}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/UPS-small-business-of-the-day.png" alt="UPS Small Business of the Day feature example" style={{ width: "100%", maxWidth: "400px", height: "auto", display: "block", borderRadius: "10px" }} />
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                How it works
              </span>
              {" "}
              <h2 id="ups-about-h" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.16", letterSpacing: "-0.015em", color: "#14181D", textWrap: "pretty" }}>
                UPS Small Business of the Day, powered by CanadianSME
              </h2>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                CanadianSME understands the challenges small companies face in growing efficiently. That is why we give dedicated, genuine support to Canadian small businesses and help them grow online.
              </p>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                We help small businesses promote themselves online through our platform and social media. In collaboration with UPS, we highlight one small business every day to help you get more eyes on your business.
              </p>
              {" "}
              <div>
                <a href="https://forms.canadiansme.ca/ups-small-business" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }} className="h_635546e">
                  Apply now
                </a>
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="ups-support-h" style={{ padding: "72px max(24px,calc((100% - 1232px) / 2))" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "52px", alignItems: "center" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                UPS Canada
              </span>
              {" "}
              <h2 id="ups-support-h" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.16", letterSpacing: "-0.015em", color: "#14181D", textWrap: "pretty" }}>
                How is UPS Canada supporting Canadian small businesses?
              </h2>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                Starting a small business is both an incredible accomplishment and a formidable challenge. UPS offers affordable prices, convenient drop-off locations and an easy-to-use website to make shipping simpler, and UPS ambassadors are available for help and support.
              </p>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                UPS offers small businesses international, cross-border and domestic shipping solutions that save time and money. Whether you are new or established, its tools help small firms streamline processes, improve customer experience and grow internationally.
              </p>
              {" "}
              <div>
                <a href="https://forms.canadiansme.ca/ups-small-business" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }} className="h_635546e">
                  Apply now
                </a>
              </div>
              {" "}
            </div>
            {" "}
            <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/screenshot-www.google.com-2022.03.27-00_40_53-1920w.webp" alt="UPS Canada small business shipping web page" style={{ width: "100%", height: "auto", display: "block", borderRadius: "10px", border: "1px solid #E4E7EC" }} />
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="ups-why-h" style={{ background: "#EEF2F8", padding: "72px max(24px,calc((100% - 1232px) / 2))" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "52px", alignItems: "center" }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {" "}
              <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/Untitleddesign-2880w.jpg" alt="UPS Small Business of the Day campaign visual" style={{ width: "100%", height: "auto", display: "block", borderRadius: "10px" }} />
              {" "}
              <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/UPS-Canada-New-2880w.jpg" alt="UPS Canada campaign visual" style={{ width: "100%", height: "auto", display: "block", borderRadius: "10px", marginTop: "40px" }} />
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                Why it matters
              </span>
              {" "}
              <h2 id="ups-why-h" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.16", letterSpacing: "-0.015em", color: "#14181D", textWrap: "pretty" }}>
                Why supporting small businesses is more important than ever
              </h2>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                Small businesses make up 99% of Canada’s businesses. As the economy works through ongoing disruption, it is one thing to claim to support them and another to provide real help.
              </p>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                At CanadianSME Business Magazine, our working motto is “delve and quell”: we look into the specific challenges business owners face and answer them with solutions made for them. We help businesses develop, boost sales and create jobs, and give them a platform to launch their products and services.
              </p>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                Join us and build a long-term relationship that benefits your business and Canada. Together, let’s build the nation one business at a time.
              </p>
              {" "}
              <div>
                <a href="https://forms.canadiansme.ca/ups-small-business" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }} className="h_635546e">
                  Apply now
                </a>
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="ups-women-h" style={{ background: "#7A1F2B", color: "#fff" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "36px", alignItems: "center" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#F5C9CC" }}>
                Women exporters
              </span>
              <h2 id="ups-women-h" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.16", letterSpacing: "-0.015em", color: "#fff", textWrap: "pretty" }}>
                Supporting women supports economic growth
              </h2>
            </div>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#F2E4E6", textWrap: "pretty" }}>
                Are you a woman entrepreneur looking to build your logistics and technical skills, raise your brand’s visibility and connect with buyers, investors, suppliers and business support organizations? The UPS Women Exporters Program in Canada can help you boost productivity, build financial security and grow into a high-value business.
              </p>
              {" "}
              <div>
                <a href="https://about.ups.com/ca/en/our-impact/community/equity-and-economic-empowerment/ups-expands-women-exporters-program-to-canada.html" target="_blank" rel="noopener" style={{ display: "inline-flex", padding: "13px 22px", borderRadius: "8px", background: "#fff", color: "#7A1F2B", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px" }} className="h_a9a03f7">
                  Learn more
                </a>
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="ups-partners-h" style={{ padding: "72px max(24px,calc((100% - 1232px) / 2))" }}>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap", marginBottom: "28px" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                Thanks to our partners
              </span>
              <h2 id="ups-partners-h" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.16", letterSpacing: "-0.015em", color: "#14181D", textWrap: "pretty" }}>
                Our supporting partners
              </h2>
            </div>
            {" "}
            <a href={u("#contact")} style={{ display: "inline-flex", padding: "12px 20px", borderRadius: "8px", border: "1.5px solid #101828", color: "#14181D", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14px" }} className="h_3023cb9">
              Partner with us
            </a>
            {" "}
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,280px),1fr))", gap: "24px" }}>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", gap: "14px", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }}>
              {" "}
              <div style={{ aspectRatio: "1/1", background: "#F4F6F8" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/INDIGENOUSSME-640w.jpg" alt="UPS Canada" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {" "}
              <div style={{ padding: "0 20px 22px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "19px", lineHeight: "1.25" }}>
                  UPS Canada
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  Small business shipping made easy. UPS can help save time and money with small business shipping solutions, so you spend more time on your business and less on shipping.
                </p>
                {" "}
                <a href="https://www.ups.com/ca/en/Home.page" target="_blank" rel="noopener" style={{ marginTop: "auto", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#002364" }}>
                  Learn more →
                </a>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", gap: "14px", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }}>
              {" "}
              <div style={{ aspectRatio: "1/1", background: "#F4F6F8" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/2-3dc0f1af-640w.jpg" alt="Jelly Academy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {" "}
              <div style={{ padding: "0 20px 22px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "19px", lineHeight: "1.25" }}>
                  Jelly Academy
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  Rapid re-skilling, up-skilling and micro-credentials to land a job or grow in the digital marketing industry.
                </p>
                {" "}
                <a href="https://jellyacademy.ca/" target="_blank" rel="noopener" style={{ marginTop: "auto", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#002364" }}>
                  Learn more →
                </a>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
            <article style={{ display: "flex", flexDirection: "column", gap: "14px", border: "1px solid #E4E7EC", borderRadius: "10px", overflow: "hidden", background: "#fff" }}>
              {" "}
              <div style={{ aspectRatio: "1/1", background: "#F4F6F8" }}>
                <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/3-c16e90db-640w.jpg" alt="CanadianSME" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {" "}
              <div style={{ padding: "0 20px 22px", display: "flex", flexDirection: "column", gap: "10px", flex: "1" }}>
                {" "}
                <h3 style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "600", fontSize: "19px", lineHeight: "1.25" }}>
                  CanadianSME
                </h3>
                {" "}
                <p style={{ fontSize: "14.5px", lineHeight: "1.6", color: "#5A6470" }}>
                  The premier platform for SMEs in Canada, highlighting growing businesses and thought leaders with a focus on innovation, growth and marketing.
                </p>
                {" "}
                <a href={u("#about")} style={{ marginTop: "auto", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "13.5px", color: "#002364" }}>
                  Learn more →
                </a>
                {" "}
              </div>
              {" "}
            </article>
            {" "}
          </div>
          {" "}
        </section>
        {" "}
        <section aria-labelledby="ups-mag-h" style={{ background: "#F4F6F8", borderTop: "1px solid #E4E7EC" }}>
          {" "}
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "48px", alignItems: "center" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {" "}
              <span style={{ fontFamily: "'IBM Plex Sans','Helvetica Neue',Arial,sans-serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#002364" }}>
                Powered by CanadianSME
              </span>
              {" "}
              <h2 id="ups-mag-h" style={{ fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.16", letterSpacing: "-0.015em", color: "#14181D", textWrap: "pretty" }}>
                Subscribe to CanadianSME Small Business Magazine
              </h2>
              {" "}
              <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475467", textWrap: "pretty" }}>
                CanadianSME was created by entrepreneurs, for entrepreneurs. Subscribe to stay up to date on upcoming events and get the top business insights from industry leaders.
              </p>
              {" "}
              <div>
                <a href={u("#newsletter-page")} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 22px", borderRadius: "8px", background: "#D71920", color: "#fff", fontFamily: "Sora,'Helvetica Neue',Arial,sans-serif", fontWeight: "700", fontSize: "14.5px", textDecoration: "none" }} className="h_635546e">
                  Subscribe now
                </a>
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              {" "}
              <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/CanadianSMEMagazine-AprilEdition_Page_1-1280w.jpg" alt="CanadianSME Small Business Magazine cover" style={{ width: "46%", maxWidth: "220px", height: "auto", display: "block", borderRadius: "6px", boxShadow: "0 12px 28px rgba(16,24,40,0.18)" }} />
              {" "}
              <img loading="lazy" decoding="async" src="https://canadiansme.ca/wp-content/uploads/2023/12/8-1280x1657-1-3-1280w.jpg" alt="CanadianSME Small Business Magazine cover" style={{ width: "46%", maxWidth: "220px", height: "auto", display: "block", borderRadius: "6px", boxShadow: "0 12px 28px rgba(16,24,40,0.18)", marginTop: "36px" }} />
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
