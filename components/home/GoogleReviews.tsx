"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { googleReviews } from "./data";
import s from "./GoogleReviews.module.css";

export default function GoogleReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const animationRef = useRef(0);
  const directionRef = useRef(1);
  const interactionRef = useRef(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);

  const stopMovement = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    interactionRef.current = performance.now();
    if (trackRef.current) trackRef.current.style.scrollSnapType = "";
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || hovered || focused || paused || selected !== null) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(track);
    const stop = () => {
      cancelAnimationFrame(animationRef.current);
      track.style.scrollSnapType = "";
    };
    motion.addEventListener("change", stop);
    const timer = window.setInterval(() => {
      if (motion.matches || !visible || document.hidden || performance.now() - interactionRef.current < 5000) return;
      const first = track.querySelector("article");
      if (!first) return;
      const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
      const start = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;
      if (start >= max - 2) directionRef.current = -1;
      else if (start <= 2) directionRef.current = 1;
      const end = Math.max(0, Math.min(max, start + step * directionRef.current));
      const began = performance.now();
      track.style.scrollSnapType = "none";
      function animate(now: number) {
        if (!track) return;
        const progress = Math.min(1, (now - began) / 650);
        const eased = (1 - Math.cos(Math.PI * progress)) / 2;
        track.scrollLeft = start + (end - start) * eased;
        if (progress < 1) animationRef.current = requestAnimationFrame(animate);
        else track.style.scrollSnapType = "";
      }
      animationRef.current = requestAnimationFrame(animate);
    }, 5000);
    return () => {
      clearInterval(timer);
      stop();
      observer.disconnect();
      motion.removeEventListener("change", stop);
    };
  }, [hovered, focused, paused, selected]);

  useEffect(() => {
    if (selected === null) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const closeReview = useCallback(() => {
    dialogRef.current?.close();
    setSelected(null);
    interactionRef.current = performance.now();
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const review = selected === null ? null : googleReviews[selected];
  return (
    <section className="section" aria-labelledby="google-reviews-heading">
      <div className="container">
        <div className={s.header}>
          <div>
            <p className="eyebrow">GOOGLE REVIEWS</p>
            <h2 id="google-reviews-heading">Real clients. Real feedback.</h2>
            <p className={s.intro}>
              Feedback from businesses I’ve worked with across websites, SEO,
              CRM, marketing and digital operations.
            </p>
          </div>
        </div>
        <div
          ref={trackRef}
          className={s.track}
          tabIndex={0}
          role="region"
          aria-label={`Client reviews — scroll horizontally to read all ${googleReviews.length} reviews`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
          onPointerDown={stopMovement}
          onPointerUp={stopMovement}
          onPointerCancel={stopMovement}
          onWheel={stopMovement}
          onKeyDown={stopMovement}
        >
          {googleReviews.map((item, index) => (
            <article className={s.card} key={item.name}>
              <div className={s.cardHeader}>
                <span className={s.avatar} aria-hidden="true">{item.name.charAt(0)}</span>
                <strong className={s.cardName}>{item.name}</strong>
                <Image className={s.googleIcon} src="/images/tools/google.svg" width={22} height={22} alt="" />
              </div>
              <blockquote className={s.quote}>{item.excerpts.join(" ")}</blockquote>
              <div className={s.action}>
                <button type="button" className={s.readMore} aria-haspopup="dialog"
                  aria-label={`Read full review by ${item.name}`}
                  onClick={(event) => {
                    stopMovement();
                    triggerRef.current = event.currentTarget;
                    setSelected(index);
                  }}>READ FULL REVIEW</button>
              </div>
              <footer className={s.cardFooter}>Google review</footer>
            </article>
          ))}
        </div>
        <button type="button" className={s.playback} aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? "Resume reviews" : "Pause reviews"}
        </button>
      </div>
      <dialog ref={dialogRef} className={s.dialog} aria-labelledby="review-dialog-name"
        onCancel={(event) => { event.preventDefault(); closeReview(); }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeReview();
        }}
        onKeyDown={(event) => {
          // The close button is the dialog’s only interactive element.
          if (event.key === "Tab") { event.preventDefault(); dialogRef.current?.querySelector("button")?.focus(); }
        }}>
        {review && <>
          <div className={s.dialogHeader}>
            <span className={s.cardBrand}>
              <Image src="/images/tools/google.svg" width={24} height={24} alt="" />Google Review
            </span>
            <button type="button" className={s.close} onClick={closeReview} aria-label="Close review" autoFocus>×</button>
          </div>
          <div className={s.dialogReviewer}>
            <span className={s.avatar} aria-hidden="true">{review.name.charAt(0)}</span>
            <h3 id="review-dialog-name" className={s.dialogName}>{review.name}</h3>
          </div>
          <blockquote className={s.fullReview}>
            {review.fullText.split("\n\n").map((excerpt) => <p key={excerpt}>{excerpt}</p>)}
          </blockquote>
        </>}
      </dialog>
    </section>
  );
}
