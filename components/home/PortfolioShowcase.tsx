"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { projects } from "./data";
import s from "./PortfolioShowcase.module.css";

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

export default function PortfolioShowcase({ items = projects }: { items?: typeof projects }) {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const selectors = useRef<(HTMLButtonElement | null)[]>([]);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const id = useId();
  const activeIndex = items.length ? active % items.length : 0;
  if (!items.length) return null;
  const current = items[activeIndex];
  const copy = editorialCopy[current.name] ?? { industry: current.category, description: current.description };

  return (
    <section className={`section ${s.showcase}`} aria-label="Featured portfolio spotlight">
      <div className={`container ${s.grid}`}>
        <div className={s.textColumn}>
          <p className="eyebrow">INDUSTRY SPOTLIGHT</p>
          <div className={s.copyStack}>
            <h2><span className={s.accent}>{copy.industry}</span>.</h2>
            <p className={s.description}>{copy.description}</p>
          </div>
          <div className={s.projectIdentity}>
            <span className={s.identityLine} aria-hidden="true" />
            <p className={s.company}>{current.name}</p>
          </div>
          <div className={s.controls}>
            <span className={s.counter} role="status" aria-live={focused ? "polite" : "off"}
              aria-label={`Project ${activeIndex + 1} of ${items.length}: ${current.name}`}>
              {String(activeIndex + 1).padStart(2, "0")}<span> / {String(items.length).padStart(2, "0")}</span>
            </span>
            <div className={s.progress} aria-hidden="true"><span style={{ transform: `scaleX(${(activeIndex + 1) / items.length})` }} /></div>
          </div>
        </div>
        <div className={s.composition} role="group" tabIndex={0} aria-label="Overlapping project previews"
          aria-describedby={`${id}-help`}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
          onKeyDown={event => {
            const focusedIndex = selectors.current.findIndex(element => element === document.activeElement);
            const base = focusedIndex < 0 ? activeIndex : focusedIndex;
            let next: number;
            if (event.key === "Home") next = 0;
            else if (event.key === "End") next = items.length - 1;
            else if (event.key === "ArrowRight") next = (base + 1) % items.length;
            else if (event.key === "ArrowLeft") next = (base - 1 + items.length) % items.length;
            else return;
            event.preventDefault();
            selectors.current[next]?.focus({ preventScroll: true });
          }}
          onPointerDown={event => {
            swiped.current = false;
            if (event.pointerType === "touch") gesture.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerCancel={() => { gesture.current = null; }}
          onPointerUp={event => {
            const start = gesture.current; gesture.current = null;
            if (!start) return;
            const dx = event.clientX - start.x, dy = event.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
              swiped.current = true;
              setActive((activeIndex + (dx < 0 ? 1 : -1) + items.length) % items.length);
            }
          }}>
          <div className={s.collage}>
            {items.map((project, index) => {
              const position = (index - activeIndex + items.length) % items.length;
              return (
                <button key={project.name} ref={element => { selectors.current[index] = element; }}
                  type="button" className={s.card} data-position={position} data-project-index={index} data-slot={index % 10}
                  aria-label={`Preview ${project.name}, project ${index + 1} of ${items.length}`}
                  aria-pressed={position === 0}
                  onClick={() => {
                    if (swiped.current) { swiped.current = false; return; }
                    setActive(index);
                  }}>
                  <span className={s.window}>
                    <span className={s.windowBar} aria-hidden="true">
                      <span className={s.dots}><i /><i /><i /></span>
                      <span className={s.windowName}>{project.name}</span>
                    </span>
                    <span className={s.screenshot}>
                      <Image src={project.image} alt={position === 0 ? `${project.name} website preview` : ""}
                        fill sizes="(min-width: 1600px) 740px, (max-width: 600px) 75vw, (max-width: 900px) 70vw, 48vw"
                        preload={index === 0} draggable={false} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className={s.hint}>Click a screen to bring it forward</p>
          <p id={`${id}-help`} className={s.srOnly}>
            Click or tap a screen to bring it to the front. Use the left and right arrow keys, Home or End to focus a project, then Enter or Space to select it.
            Swipe to browse projects on touch screens. Vertical scrolling continues through the page.
          </p>
        </div>
      </div>
    </section>
  );
}
