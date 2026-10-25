"use client";

import Image from "next/image";
import { useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
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
  const pendingFocus = useRef<number | null>(null);
  const hoverPoint = useRef<{ x: number; y: number } | null>(null);
  const id = useId();

  const activeIndex = items.length ? active % items.length : 0;
  useLayoutEffect(() => {
    if (pendingFocus.current !== null) {
      selectors.current[pendingFocus.current]?.focus({ preventScroll: true });
      pendingFocus.current = null;
    }
  }, [activeIndex]);

  if (!items.length) return null;
  const current = items[activeIndex];
  const copy = editorialCopy[current.name] ?? { industry: current.category, description: current.description };


  return (
    <section className={`section ${s.showcase}`} aria-label="Featured portfolio spotlight">
      <div className={`container ${s.grid}`}>
        <div className={s.textColumn}>
          <p className="eyebrow">INDUSTRY SPOTLIGHT</p>
          <div className={s.copyStack}>
            <div key={activeIndex} className={s.copy}>
              <h2><span className={s.accent}>{copy.industry}</span>.</h2>
              <p className={s.description}>{copy.description}</p>
              <p className={s.company}>{current.name}</p>
            </div>
          </div>
          <div className={s.controls}>
            <span className={s.counter} role="status" aria-live={focused ? "polite" : "off"}
              aria-label={`Project ${activeIndex + 1} of ${items.length}: ${current.name}`}>
              {String(activeIndex + 1).padStart(2, "0")}<span> / {String(items.length).padStart(2, "0")}</span>
            </span>
            <div className={s.progress} aria-hidden="true">
              <span style={{ transform: `scaleX(${(activeIndex + 1) / items.length})` }} />
            </div>
          </div>
        </div>
        <div className={s.composition} role="group" tabIndex={0}
          aria-label="Project lineup. Hover, focus or tap a project to bring it to the front."
          aria-describedby={`${id}-help`}
          onPointerLeave={() => { hoverPoint.current = null; }}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
          onKeyDown={event => {
            const directions: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
            let next: number;
            if (event.key === "Home") next = 0;
            else if (event.key === "End") next = items.length - 1;
            else if (event.key in directions) next = (activeIndex + directions[event.key] + items.length) % items.length;
            else return;
            event.preventDefault();
            if (next === activeIndex) selectors.current[next]?.focus({ preventScroll: true });
            else { pendingFocus.current = next; setActive(next); }
          }}
          >
          <p id={`${id}-help`} className={s.srOnly}>
            Use Tab or the arrow keys to explore all projects. Home and End select the first and last project.
            Hover an exposed card or tap a project to bring it to the front. Scroll vertically to continue through the page.
          </p>
          <div className={s.lineup} style={{ "--count": items.length } as CSSProperties}>
            {items.map((project, index) => {
              const position = (index - activeIndex + items.length) % items.length;
              return (
                <button key={project.name} ref={element => { selectors.current[index] = element; }}
                  type="button" id={`${id}-project-${index}`}
                  className={`${s.cardSlot} ${position === 0 ? s.active : ""}`}
                  style={{ "--position": position, "--scale": 1 - position * .006,
                    zIndex: items.length - position } as CSSProperties}
                  data-project-index={index} data-position={position} data-active={position === 0}
                  aria-label={`Preview ${project.name}, project ${index + 1} of ${items.length}`}
                  aria-pressed={position === 0}
                  onPointerMove={event => {
                    // Moving cards must not select another project beneath a stationary pointer.
                    if (event.pointerType !== "mouse" || (!event.movementX && !event.movementY) ||
                      !matchMedia("(hover: hover) and (pointer: fine)").matches || index === activeIndex) return;
                    const previous = hoverPoint.current;
                    if (previous && Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < 6) return;
                    hoverPoint.current = { x: event.clientX, y: event.clientY };
                    setActive(index);
                  }}
                  onFocus={() => setActive(index)} onClick={() => setActive(index)}>
                  <span className={s.window}>
                    <span className={s.windowBar} aria-hidden="true">
                      <span className={s.dots}><i /><i /><i /></span>
                      <span className={s.windowName}>{project.name}</span>
                    </span>
                    <span className={s.screenshot}>
                      <Image src={project.image} alt={position === 0 ? `${project.name} website preview` : ""}
                        fill sizes="(max-width: 600px) calc(100vw - 80px), (max-width: 788px) calc(100vw - 184px), (max-width: 900px) 604px, (max-width: 1100px) 320px, 500px"
                        preload={position === 0} draggable={false} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
