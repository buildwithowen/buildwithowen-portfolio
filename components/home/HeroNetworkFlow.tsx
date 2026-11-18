"use client";

import { useEffect, useRef } from "react";
import s from "./CinematicHero.module.css";

const ports = [
  { name: "development", x: 390, y: 190 },
  { name: "visibility", x: 780, y: 240 },
  { name: "systems", x: 1120, y: 390 },
  { name: "automation", x: 1200, y: 670 },
  { name: "webDesign", x: 70, y: 550 },
  { name: "googleAds", x: 560, y: 850 },
];

export default function HeroNetworkFlow({ path }: { path: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const guide = useRef<SVGPathElement>(null);
  const spark = useRef<SVGGElement>(null);

  useEffect(() => {
    const network = svg.current?.parentElement;
    const curve = guide.current;
    const dot = spark.current;
    if (!network || !curve || !dot) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = ports.map((port) => ({
      ...port,
      element: network.querySelector<HTMLElement>(`[data-capability="${port.name}"]`),
      litUntil: 0,
      touching: false,
    }));
    const length = curve.getTotalLength();
    let distance = 0;
    let previous = 0;
    let frame = 0;
    const clear = () => cards.forEach(({ element }) => element?.removeAttribute("data-spark-active"));
    const tick = (now: number) => {
      if (motion.matches) return;
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      distance = (distance + elapsed * 0.11) % length;
      const point = curve.getPointAtLength(distance);
      dot.setAttribute("transform", `translate(${point.x} ${point.y})`);
      for (const card of cards) {
        const touching = Math.hypot(point.x - card.x, point.y - card.y) < 4;
        if (touching && !card.touching) {
          card.litUntil = now + 120;
        }
        card.touching = touching;
        const lit = now < card.litUntil;
        if (lit !== card.element?.hasAttribute("data-spark-active")) {
          if (lit) card.element?.setAttribute("data-spark-active", "true");
          else card.element?.removeAttribute("data-spark-active");
        }
      }
      frame = requestAnimationFrame(tick);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      clear();
      if (!motion.matches) frame = requestAnimationFrame(tick);
    };
    restart();
    motion.addEventListener("change", restart);
    return () => {
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", restart);
      clear();
    };
  }, [path]);

  return (
    <svg ref={svg} className={s.flow} viewBox="0 0 1440 1000" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path ref={guide} d={path} stroke="none" />
      <g ref={spark} className={s.singleSpark} transform="translate(980 95)">
        <circle r="7" className={s.sparkHalo} />
        <circle r="2.5" className={s.sparkCore} />
      </g>
    </svg>
  );
}
