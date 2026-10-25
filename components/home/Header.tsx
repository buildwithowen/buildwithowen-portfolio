"use client";

import { useState } from "react";
import Image from "next/image";
import { navigation } from "./data";
import Icon from "./Icon";
import s from "./home.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
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
        <button
          className={s.menuButton}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
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
            Start a Project <Icon />
          </a>
        </nav>
      </div>
    </header>
  );
}
