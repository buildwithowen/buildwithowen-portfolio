"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { projects } from "./data";
import s from "./PortfolioShowcase.module.css";

function subscribeMotion(callback: () => void) {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function motionSnapshot() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Editorial copy is local to this spotlight; shared project content stays intact.
const editorialCopy: Record<string, { industry: string; description: string }> = {
  "RZE Travel & Tours": {
    industry: "Travel & Tourism",
    description: "Digital experiences designed to make discovery, enquiries and bookings feel simple.",
  },
  "Next Move Removals": {
    industry: "Moving & Relocation",
    description: "Lead-focused digital experiences built for service businesses.",
  },
  "TOC Outsourcing": {
    industry: "Outsourcing Services",
    description: "Professional digital platforms built to present services and convert enquiries.",
  },
  "Choose A Mover": {
    industry: "Marketplace Platform",
    description: "A custom moving marketplace connecting customers, removalists, leads and quote credits.",
  },
};

export default function PortfolioShowcase({ items = projects, interval = 7000 }: {
  items?: typeof projects;
  interval?: number;
}) {
  const root = useRef<HTMLElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const wheelGesture = useRef({ lastEvent: 0, lastChange: 0, delta: 0, consumed: false });
  const wheelReset = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scene, setScene] = useState({ index: 0, previous: null as number | null, direction: 1 });
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, () => true);
  const running = items.length > 1 && inView && pageVisible && !paused && !hovered && !focused && !interacting && !reduced;

  const advance = useCallback((direction: number) => {
    if (items.length < 2) return;
    setScene(current => ({
      index: (current.index + direction + items.length) % items.length,
      previous: reduced ? null : current.index,
      direction,
    }));
  }, [items.length, reduced]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(element);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      if (wheelReset.current) clearTimeout(wheelReset.current);
    };
  }, []);

  useEffect(() => {
    if (scene.previous === null) return;
    const timer = setTimeout(() => setScene(current => ({ ...current, previous: null })), reduced ? 0 : 800);
    return () => clearTimeout(timer);
  }, [scene.index, scene.previous, reduced]);

  useEffect(() => {
    if (!running || scene.previous !== null) return;
    const timer = setTimeout(() => advance(1), interval);
    return () => clearTimeout(timer);
  }, [running, scene.index, scene.previous, interval, advance]);

  if (!items.length) return null;
  const activeIndex = scene.index % items.length;
  const current = items[activeIndex];
  const copy = editorialCopy[current.name] ?? { industry: current.category, description: current.description };
  const deck = Array.from({ length: Math.min(3, items.length) }, (_, rank) => ({ index: (activeIndex + rank) % items.length, rank }));
  if (!reduced && scene.previous !== null && !deck.some(card => card.index === scene.previous)) {
    deck.push({ index: scene.previous, rank: -1 });
  }

  function endGesture(x: number, y: number) {
    const start = gesture.current;
    gesture.current = null;
    setInteracting(false);
    if (!start) return;
    const dx = x - start.x;
    const dy = y - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) advance(dx < 0 ? 1 : -1);
    else if (Math.abs(dy) > 45 && Math.abs(dy) > Math.abs(dx) * 1.2) advance(dy < 0 ? 1 : -1);
  }

  return (
    <section ref={root} className={`section ${s.showcase}`} aria-label="Featured portfolio spotlight"
      onMouseEnter={() => { if (matchMedia("(hover: hover) and (pointer: fine)").matches) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onWheel={event => {
        if (event.ctrlKey || !inView || items.length < 2 ||
          !matchMedia("(min-width: 601px) and (hover: hover) and (pointer: fine)").matches) return;
        const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
        const delta = (horizontal ? event.deltaX : event.deltaY) * unit;
        if (Math.abs(delta) < 1) return;
        const now = performance.now();
        const wheel = wheelGesture.current;
        // Treat trackpad momentum as one gesture, with an additional transition cooldown.
        if (now - wheel.lastEvent > 300) {
          wheel.delta = 0;
          wheel.consumed = false;
        }
        wheel.lastEvent = now;
        setInteracting(true);
        if (wheelReset.current) clearTimeout(wheelReset.current);
        wheelReset.current = setTimeout(() => setInteracting(false), 1100);
        if (wheel.consumed || (wheel.lastChange > 0 && now - wheel.lastChange < 900)) return;
        wheel.delta += delta;
        if (Math.abs(wheel.delta) < 60) return;
        wheel.consumed = true;
        const direction = wheel.delta > 0 ? 1 : -1;
        const index = scene.index % items.length;
        // Wheel navigation never wraps or cancels native page scrolling.
        if ((direction < 0 && index === 0) || (direction > 0 && index === items.length - 1)) return;
        wheel.lastChange = now;
        advance(direction);
      }}
      onKeyDown={event => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
          event.preventDefault();
          advance(event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1);
        }
      }}>
      <div className={`container ${s.grid}`}>
        <div className={s.textColumn}>
          <p className="eyebrow">INDUSTRY SPOTLIGHT</p>
          <div className={s.copyStack}>
            <div key={activeIndex} className={`${s.copy} ${scene.previous !== null ? s.copyEnter : ""}`}>
              <h2><span className={s.accent}>{copy.industry}</span>.</h2>
              <p className={s.description}>{copy.description}</p>
              <p className={s.company}>{current.name}</p>
            </div>
          </div>
          <div className={s.controls}>
            <span className={s.counter} role="status" aria-live={focused ? "polite" : "off"} aria-label={`Project ${activeIndex + 1} of ${items.length}: ${current.name}`}>
              {String(activeIndex + 1).padStart(2, "0")}<span> / {String(items.length).padStart(2, "0")}</span>
            </span>
            <div className={s.progress} aria-hidden="true">
              <span key={`${activeIndex}-${running && scene.previous === null}`}
                className={running && scene.previous === null ? s.progressActive : undefined}
                style={{ animationDuration: `${interval}ms` }} />
            </div>
            {!reduced && <button type="button" className={s.pause} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
              <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
              <span className={s.srOnly}>{paused ? "Play" : "Pause"} portfolio spotlight</span>
            </button>}
          </div>
        </div>
        <div className={s.visual}>
          <p id="portfolio-navigation-help" className={s.srOnly}>
            Use the arrow keys to change projects. Swipe left or right on touch screens.
          </p>
          <div className={s.preview} role="group" tabIndex={0}
            aria-label="Featured website preview. Swipe, drag, or use arrow keys to change project."
            aria-describedby="portfolio-navigation-help"
            aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown"
            onPointerDown={event => {
              if (wheelReset.current) clearTimeout(wheelReset.current);
              gesture.current = { x: event.clientX, y: event.clientY };
              setInteracting(true);
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={event => endGesture(event.clientX, event.clientY)}
            onPointerCancel={() => { gesture.current = null; setInteracting(false); }}
            onLostPointerCapture={() => { gesture.current = null; setInteracting(false); }}
            >
            {deck.map(({ index, rank }) => (
              <div key={items[index].name}
                className={`${s.deckCard} ${rank === -1 ? s.departing : ""} ${rank === 0 && scene.previous !== null && scene.direction < 0 ? s.arriving : ""}`}
                style={{ "--rank": Math.max(0, rank), zIndex: rank === -1 ? 5 : 4 - rank } as CSSProperties}
                data-rank={rank} aria-hidden={rank !== 0 ? true : undefined}>
                <Image src={items[index].image} alt={rank === 0 ? `${items[index].name} website preview` : ""}
                  fill sizes="(max-width: 600px) calc(100vw - 64px), (max-width: 900px) calc(100vw - 160px), (max-width: 1100px) 50vw, 700px"
                  preload={rank === 0} draggable={false} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
