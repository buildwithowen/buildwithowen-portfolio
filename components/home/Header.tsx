"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navigation } from "./data";
import s from "./home.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const targets = [
      { element: document.querySelector("main > section"), name: "Home" },
      { element: document.getElementById("work"), name: "Work" },
      { element: document.getElementById("services"), name: "Services" },
      { element: document.getElementById("contact"), name: "Contact" },
    ];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = targets.find((item) => item.element === entry.target);
          if (target) setActive(target.name);
        }
      }
    }, { rootMargin: "-10% 0px -60% 0px" });
    targets.forEach(({ element }) => { if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  return (
    <header className={s.header}>
      <div className={`container ${s.headerInner}`}>
        <a className={s.brand} href="#" aria-label="Build With Owen home">
          <Image
            src="/images/build-with-owen-logo.png"
            alt="Build With Owen"
            width={1000}
            height={1000}
            sizes="(max-width: 600px) 33px, 39px"
            className={s.headerLogo}
          />
          <span>
            Build With{" "}
            <strong>
              Owen<span className={s.brandDot}>.</span>
            </strong>
          </span>
        </a>
        <a
          href="#contact"
          className={`button ${s.mobileHeaderCta}`}
          onClick={() => setOpen(false)}
        >
          Let’s talk
        </a>
        <nav className={s.mobileDock} aria-label="Mobile quick navigation">
          {[
            { name: "Home", href: "#main", path: "m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9" },
            { name: "Work", href: "#work", path: "M3 7h18v13H3zM8 7V4h8v3M3 12h18M10 12v3h4v-3" },
            { name: "Services", href: "#services", path: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
            { name: "Contact", href: "#contact", path: "M3 5h18v14H3zM3 6l9 7 9-7" },
          ].map((item) => (
            <a key={item.name} href={item.href} className={s.dockLink} aria-current={active === item.name ? "location" : undefined} onClick={() => { setOpen(false); setActive(item.name); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.path} /></svg>
              <span>{item.name}</span>
            </a>
          ))}
          <button
            className={s.menuButton}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
            onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
          >
            <svg className={s.dockMenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d={open ? "m6 6 12 12M6 18 18 6" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            <span>{open ? "Close" : "Menu"}</span>
            <span className={s.tabletMenuSymbol} aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </nav>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`${s.nav} ${open ? s.navOpen : ""}`}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              document
                .querySelector<HTMLButtonElement>(
                  `[aria-controls="main-navigation"]`,
                )
                ?.focus();
            }
          }}
        >
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className={`button ${s.navCta}`}
            onClick={() => setOpen(false)}
          >
            Let’s talk
          </a>
        </nav>
      </div>
    </header>
  );
}
