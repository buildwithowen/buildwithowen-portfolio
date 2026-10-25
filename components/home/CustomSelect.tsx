"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import s from "./CustomSelect.module.css";

interface CustomSelectProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export default function CustomSelect({
  id,
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  required,
  error,
}: CustomSelectProps) {
  const listId = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const search = useRef({ text: "", time: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [above, setAbove] = useState(false);

  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function position() {
      const rect = trigger.current?.getBoundingClientRect();
      const viewport = window.visualViewport;
      const bottom =
        (viewport?.height ?? innerHeight) + (viewport?.offsetTop ?? 0);
      if (rect)
        setAbove(bottom - rect.bottom < 320 && rect.top > bottom - rect.bottom);
    }
    position();
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    };
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function expand(index = Math.max(0, options.indexOf(value))) {
    setActive(index);
    setOpen(true);
  }
  function choose(index: number) {
    onChange(options[index]);
    setOpen(false);
    trigger.current?.focus();
  }
  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (
      ["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(event.key)
    ) {
      event.preventDefault();
      if (event.key === "Enter" || event.key === " ") {
        if (open) choose(active);
        else expand();
      } else if (event.key === "Home") {
        expand(0);
      } else if (event.key === "End") {
        expand(options.length - 1);
      } else if (!open) {
        expand(
          event.key === "ArrowUp" && !value ? options.length - 1 : undefined,
        );
      } else {
        setActive(
          (index) =>
            (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) %
            options.length,
        );
      }
      return;
    }
    if (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      event.preventDefault();
      const now = Date.now();
      const text =
        (now - search.current.time < 700 ? search.current.text : "") +
        event.key.toLowerCase();
      search.current = { text, time: now };
      const index = options.findIndex((option) =>
        option.toLowerCase().startsWith(text),
      );
      if (index >= 0) expand(index);
    }
  }

  return (
    <div
      ref={root}
      className={s.root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <input type="hidden" name={name} value={value} />
      <button
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${listId}-error` : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        className={`${s.trigger} ${!value ? s.placeholder : ""}`}
        onClick={() => (open ? setOpen(false) : expand())}
        onKeyDown={keyDown}
      >
        <span>{value || placeholder}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
          className={open ? s.chevronOpen : undefined}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className={`${s.panel} ${above ? s.above : ""}`}
        >
          {options.map((option, index) => (
            <li
              key={option}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={value === option}
              className={`${s.option} ${active === index ? s.active : ""} ${value === option ? s.selected : ""}`}
              onPointerMove={() => setActive(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>{option}</span>
              {value === option && <span aria-hidden="true">✓</span>}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className={s.error} id={`${listId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
