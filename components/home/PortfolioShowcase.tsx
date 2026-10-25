"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { projects } from "./data";
import asahiFullPage from "@/public/images/hero-asahi-move.png";
import s from "./PortfolioShowcase.module.css";

function subscribeMotion(callback: () => void) {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function motionSnapshot() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Spotlight-only full-page variant; the shared project data and assets stay unchanged.
const fullPageScreenshots = { "Asahi Removals": asahiFullPage };
const previewSizes =
  "(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 48px), 960px";

const overlayDetails: Record<string, { title: string; detail: string }> = {
  "Travel & Tourism": {
    title: "Travel & Tourism",
    detail: "Discovery & booking information",
  },
  "Moving & Relocation": {
    title: "Moving & Relocation",
    detail: "Customer enquiry journey",
  },
  "Outsourcing Services": {
    title: "Business Services",
    detail: "Service enquiry pathways",
  },
  "Automotive / Auto Care": {
    title: "Auto Care",
    detail: "Services & local enquiries",
  },
  "Furniture & Interiors": {
    title: "Furniture & Interiors",
    detail: "Product browsing experience",
  },
};

function ProjectScreen({
  project,
  first,
  playing,
  duration,
}: {
  project: (typeof projects)[number];
  first: boolean;
  playing: boolean;
  duration: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const fullPage =
    fullPageScreenshots[project.name as keyof typeof fullPageScreenshots];
  const overlay = overlayDetails[project.category] ?? {
    title: project.category,
    detail: "A considered digital experience",
  };
  return (
    <div
      className={`${s.sceneStage} ${playing && loaded ? s.scenePlaying : ""}`}
      style={{ "--scene-duration": `${duration}ms` } as CSSProperties}
    >
      <div className={s.sceneViewport}>
        {fullPage ? (
          <div className={s.panViewport}>
            <Image
              src={fullPage}
              alt={`${project.name} full-page website preview`}
              className={s.panImage}
              onLoad={() => setLoaded(true)}
              draggable={false}
              sizes={previewSizes}
              preload={first}
            />
          </div>
        ) : (
          <div className={s.wideVisual}>
            <Image
              src={project.image}
              alt={`${project.name} website preview`}
              fill
              onLoad={() => setLoaded(true)}
              draggable={false}
              preload={first}
              sizes={previewSizes}
            />
          </div>
        )}
      </div>
      <div className={s.overlayRail} aria-hidden="true">
        <span className={s.railLabel}>
          <i /> INDUSTRY IN FOCUS
        </span>
        <div className={s.overlayCard}>
          <span className={s.overlayIcon}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <path d="M3 9h18M8 14h3m-3 3h8" />
            </svg>
          </span>
          <div>
            <strong>{overlay.title}</strong>
            <span className={s.overlayDetail}>{overlay.detail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioShowcase({
  items = projects,
  interval = 8500,
}: {
  items?: typeof projects;
  interval?: number;
}) {
  const root = useRef<HTMLElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const wheelTime = useRef(0);
  const [scene, setScene] = useState({
    index: 0,
    previous: null as number | null,
  });
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    motionSnapshot,
    () => true,
  );
  const running =
    items.length > 1 &&
    inView &&
    pageVisible &&
    !paused &&
    !hovered &&
    !focused &&
    !interacting &&
    !reduced;

  const advance = useCallback(
    (direction: number) => {
      setScene((current) => ({
        index: (current.index + direction + items.length) % items.length,
        previous: reduced ? null : current.index,
      }));
    },
    [items.length, reduced],
  );

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(element);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (!reduced) return;
    const timer = setTimeout(() => setScene({ index: 0, previous: null }), 0);
    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (scene.previous === null) return;
    const timer = setTimeout(
      () => setScene((current) => ({ ...current, previous: null })),
      reduced ? 0 : 750,
    );
    return () => clearTimeout(timer);
  }, [scene.index, scene.previous, reduced]);

  useEffect(() => {
    if (!running || scene.previous !== null) return;
    const timer = setTimeout(() => advance(1), interval);
    return () => clearTimeout(timer);
  }, [running, scene.index, scene.previous, interval, advance]);

  if (!items.length) return null;
  const current = items[scene.index];
  const layers =
    scene.previous === null ? [scene.index] : [scene.previous, scene.index];
  function endGesture(x: number, y: number) {
    const start = gesture.current;
    gesture.current = null;
    setInteracting(false);
    if (!start) return;
    const dx = x - start.x;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(y - start.y) * 1.2)
      advance(dx < 0 ? 1 : -1);
  }

  return (
    <section
      ref={root}
      className={`section ${s.showcase}`}
      aria-label="Featured portfolio spotlight"
      onMouseEnter={() => {
        if (matchMedia("(hover: hover) and (pointer: fine)").matches)
          setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) =>
        setFocused((event.target as HTMLElement).matches(":focus-visible"))
      }
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          setFocused(true);
          advance(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div className={`container ${s.grid}`}>
        <div className={s.textColumn}>
          <p className="eyebrow">A CLOSER LOOK AT THE WORK</p>
          <div className={s.copyStack}>
            {layers.map((index) => (
              <div
                key={index}
                aria-hidden={index !== scene.index ? true : undefined}
                className={`${s.copy} ${scene.previous !== null ? (index === scene.index ? s.enter : s.exit) : ""}`}
              >
                <span className={s.industryLabel}>INDUSTRY SPOTLIGHT</span>
                <h2>
                  {items[index].category}
                  <span className="blue">.</span>
                </h2>
                <p className={s.description}>{items[index].description}</p>
                <p className={s.company}>{items[index].name}</p>
              </div>
            ))}
          </div>
          <div className={s.controls}>
            <button
              type="button"
              className={s.counter}
              onClick={() => advance(1)}
              aria-label={`Next featured project. Showing ${scene.index + 1} of ${items.length}: ${current.name}`}
              title="Next project"
            >
              {String(scene.index + 1).padStart(2, "0")}
              <span> / {String(items.length).padStart(2, "0")}</span>
            </button>
            <div className={s.progress} aria-hidden="true">
              <span
                key={`${scene.index}-${running && scene.previous === null}`}
                className={
                  running && scene.previous === null
                    ? s.progressActive
                    : undefined
                }
                style={{ animationDuration: `${interval}ms` }}
              />
            </div>
            {!reduced && (
              <button
                type="button"
                className={s.pause}
                aria-pressed={paused}
                onClick={() => setPaused((value) => !value)}
              >
                <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
                <span className={s.srOnly}>
                  {paused ? "Play" : "Pause"} portfolio spotlight
                </span>
              </button>
            )}
          </div>
        </div>
        <div
          className={s.preview}
          role="group"
          aria-label="Featured website preview. Swipe, drag, or use arrow keys to change project."
          tabIndex={0}
          onPointerDown={(event) => {
            gesture.current = { x: event.clientX, y: event.clientY };
            setInteracting(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={(event) => endGesture(event.clientX, event.clientY)}
          onPointerCancel={() => {
            gesture.current = null;
            setInteracting(false);
          }}
          onLostPointerCapture={() => {
            gesture.current = null;
            setInteracting(false);
          }}
          onWheel={(event) => {
            if (
              Math.abs(event.deltaX) > 25 &&
              Math.abs(event.deltaX) > Math.abs(event.deltaY) &&
              performance.now() - wheelTime.current > 800
            ) {
              wheelTime.current = performance.now();
              advance(event.deltaX > 0 ? 1 : -1);
            }
          }}
        >
          <div className={s.backplate} aria-hidden="true" />
          <div className={s.browser}>
            <div className={s.browserBar} aria-hidden="true">
              <span className={s.dots}>
                <i />
                <i />
                <i />
              </span>
              <span>BUILD WITH OWEN · PROJECT SPOTLIGHT</span>
              <Image
                src="/images/build-with-owen-logo.png"
                alt="Build With Owen"
                width={20}
                height={20}
              />
            </div>
            <div className={s.screen}>
              {layers.map((index) => (
                <div
                  key={index}
                  aria-hidden={index !== scene.index ? true : undefined}
                  className={`${s.imageLayer} ${scene.previous !== null ? (index === scene.index ? s.enter : s.exit) : ""}`}
                >
                  <ProjectScreen
                    project={items[index]}
                    duration={interval}
                    first={index === 0}
                    playing={
                      running &&
                      scene.previous === null &&
                      index === scene.index
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          <p className={s.caption}>
            REAL PROJECTS. DIFFERENT INDUSTRIES. ONE CONSIDERED APPROACH.
          </p>
        </div>
      </div>
    </section>
  );
}
