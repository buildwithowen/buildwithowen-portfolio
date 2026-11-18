"use client";

import { useEffect, useRef, useState } from "react";
import s from "./CinematicHero.module.css";

const headings: Record<string, { first: string; second: string; lead: string; accent: string }> = {
  development: { first: "Your website.", second: "Built right.", lead: "Ready for", accent: "business" },
  visibility: { first: "Get found.", second: "Be seen.", lead: "Made for", accent: "search" },
  systems: { first: "Every lead.", second: "One place.", lead: "Always", accent: "connected" },
  automation: { first: "Less admin.", second: "More time.", lead: "Work made", accent: "simpler" },
  webDesign: { first: "Clear design.", second: "Easy to use.", lead: "Made for", accent: "people" },
  googleAds: { first: "Know more.", second: "See clearly.", lead: "Data made", accent: "clear" },
};
const original = { first: "Designed and", second: "built.", lead: "Fully", accent: "connected" };

export default function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [heading, setHeading] = useState(original);

  useEffect(() => {
    const hero = ref.current?.closest("section");
    const network = hero?.querySelector<HTMLElement>("[data-hero-network]");
    if (!network) return;
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cards = [...network.querySelectorAll<HTMLElement>("[data-capability]")];
    const cleanups = cards.map((card) => {
      const enter = () => {
        if (hover.matches) setHeading(headings[card.dataset.capability ?? ""] ?? original);
      };
      const leave = () => setHeading(original);
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      card.addEventListener("focus", enter);
      card.addEventListener("blur", leave);
      return () => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
        card.removeEventListener("focus", enter);
        card.removeEventListener("blur", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <h1 ref={ref} id="hero-heading" className={s.interactiveHeadline}>
      <span>{heading.first}</span>
      <span>{heading.second}</span>
      <span>{heading.lead} <span className={s.blue}>{heading.accent}</span>.</span>
    </h1>
  );
}
