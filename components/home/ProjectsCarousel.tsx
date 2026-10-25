"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "./data";
import s from "./home.module.css";
import c from "./ProjectsCarousel.module.css";

export default function ProjectsCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const interaction = useRef({
    hover: false,
    focus: false,
    pointer: false,
    until: 0,
    paused: false,
  });
  const drag = useRef<{ id: number; x: number; scroll: number } | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let period = 0;
    let position = element.scrollLeft;
    let previous = 0;
    let frame = 0;
    function measure() {
      if (!element) return;
      const first = element.children[0] as HTMLElement;
      const second = element.children[projects.length] as HTMLElement;
      period = second.offsetLeft - first.offsetLeft;
      position = element.scrollLeft;
    }
    function tick(now: number) {
      if (!element || media.matches) return;
      const dt = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      const state = interaction.current;
      if (
        !visible ||
        document.hidden ||
        state.hover ||
        state.focus ||
        state.pointer ||
        state.paused ||
        now < state.until
      ) {
        position = element.scrollLeft;
      } else if (period > 0) {
        position = (position + dt * 0.018) % period;
        element.scrollLeft = position;
      }
      frame = requestAnimationFrame(tick);
    }
    function motionChange() {
      cancelAnimationFrame(frame);
      measure();
      previous = 0;
      position = element?.scrollLeft ?? 0;
      if (!media.matches) frame = requestAnimationFrame(tick);
    }
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const visibility = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0.05 },
    );
    visibility.observe(element);
    const reveal = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            const card = entry.target as HTMLElement;
            card.style.setProperty("--project-reveal-delay", `${index * 65}ms`);
            card.classList.add(c.reveal);
            reveal.unobserve(card);
          });
      },
      { threshold: 0.15 },
    );
    Array.from(element.children)
      .slice(0, projects.length)
      .forEach((card) => reveal.observe(card));
    measure();
    media.addEventListener("change", motionChange);
    motionChange();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      reveal.disconnect();
      media.removeEventListener("change", motionChange);
    };
  }, []);

  function finishPointer() {
    drag.current = null;
    interaction.current.pointer = false;
    interaction.current.until = performance.now() + 2500;
    track.current?.classList.remove(c.dragging);
  }

  return (
    <div
      className={c.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Work across industries"
      onMouseEnter={() => {
        interaction.current.hover = true;
      }}
      onMouseLeave={() => {
        interaction.current.hover = false;
      }}
      onFocusCapture={(event) => {
        interaction.current.focus = (event.target as HTMLElement).matches(
          ":focus-visible",
        );
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          interaction.current.focus = false;
      }}
    >
      <div
        id="selected-projects"
        ref={track}
        className={c.track}
        tabIndex={0}
        aria-label="Project showcase. Swipe, drag, or use the left and right arrow keys to browse."
        onWheel={() => {
          interaction.current.until = performance.now() + 2500;
        }}
        onPointerDown={(event) => {
          interaction.current.pointer = true;
          if (event.pointerType === "mouse" && event.button === 0) {
            drag.current = {
              id: event.pointerId,
              x: event.clientX,
              scroll: event.currentTarget.scrollLeft,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }}
        onPointerMove={(event) => {
          const start = drag.current;
          if (!start || start.id !== event.pointerId) return;
          if (Math.abs(event.clientX - start.x) > 4) {
            event.preventDefault();
            event.currentTarget.classList.add(c.dragging);
            event.currentTarget.scrollLeft =
              start.scroll - (event.clientX - start.x);
          }
        }}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onLostPointerCapture={finishPointer}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          interaction.current.focus = true;
          const element = event.currentTarget;
          const first = element.firstElementChild as HTMLElement;
          if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            interaction.current.until = performance.now() + 2500;
            const behavior = matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth";
            if (event.key === "Home" || event.key === "End") {
              const gap = parseFloat(getComputedStyle(element).columnGap);
              const period =
                (first.getBoundingClientRect().width + gap) * projects.length;
              element.scrollTo({
                left:
                  event.key === "Home"
                    ? 0
                    : period -
                      gap -
                      element.clientWidth +
                      2 * parseFloat(getComputedStyle(element).paddingLeft),
                behavior,
              });
            } else
              element.scrollBy({
                left:
                  (first.getBoundingClientRect().width +
                    parseFloat(getComputedStyle(element).columnGap)) *
                  (event.key === "ArrowRight" ? 1 : -1),
                behavior,
              });
          }
        }}
      >
        {[0, 1].flatMap((copy) =>
          projects.map((project, index) => (
            <article
              className={`${s.projectCard} ${c.card} ${copy ? c.duplicate : ""}`}
              key={`${copy}-${project.name}`}
              role="group"
              aria-label={`${index + 1} of ${projects.length}: ${project.category}, ${project.name}`}
              aria-hidden={copy ? true : undefined}
              inert={copy ? true : undefined}
            >
              <div className={s.projectImage}>
                <Image
                  src={project.image}
                  alt={`${project.name} website screenshot`}
                  fill
                  draggable={false}
                  sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 63px) / 2), (max-width: 1100px) calc((100vw - 111px) / 2), 420px"
                />
              </div>
              <div className={s.projectInfo}>
                <h3 className={c.industry}>{project.category}</h3>
                <p className={c.company}>{project.name}</p>
                <p>{project.description}</p>
                {project.services.length > 0 && (
                  <div className={s.projectTags}>
                    {project.services.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          )),
        )}
      </div>
      <div className={c.motionControl}>
        <button
          type="button"
          aria-controls="selected-projects"
          onClick={() => {
            interaction.current.paused = !paused;
            setPaused(!paused);
          }}
        >
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
    </div>
  );
}
