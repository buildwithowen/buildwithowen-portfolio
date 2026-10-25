"use client";

import { useState, type FormEvent } from "react";
import Icon from "./Icon";
import CustomSelect from "./CustomSelect";
import s from "./home.module.css";

export default function ContactCTA() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectTypeMissing, setProjectTypeMissing] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    if (!projectType) {
      setProjectTypeMissing(true);
      document.getElementById("project-type")?.focus();
      return;
    }
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(
          "Unable to send your message. Please try again or email me directly.",
        );
      setStatus("success");
      form.reset();
      setProjectType("");
      setProjectTypeMissing(false);
    } catch {
      setStatus("error");
      setError(
        "Unable to send your message. Please try again or email info@buildwithowen.com.",
      );
    }
  }
  return (
    <section id="contact" className={`${s.contact} section`}>
      <div className={`container ${s.contactGrid}`}>
        <div>
          <p className={s.eyebrow}>
            <span className={s.liveDot} /> LET’S BUILD SOMETHING THAT MATTERS
          </p>
          <h2>
            Need a website
            <br />
            that actually
            <br />
            <span>works?</span>
          </h2>
          <p>
            A better website. More visibility. Systems that talk to each other.
            Less repetitive work. Let’s figure out what moves your business
            forward.
          </p>
          <div className={s.contactServices}>
            {["Websites", "SEO", "Ads", "Automation"].map((t) => (
              <span key={t}>
                <Icon kind="check" />
                {t}
              </span>
            ))}
          </div>
          <div className={s.directContact}>
            <span>PREFER EMAIL?</span>
            <a href="mailto:info@buildwithowen.com">
              info@buildwithowen.com <Icon />
            </a>
          </div>
        </div>
        <form
          onSubmit={submit}
          className={s.contactForm}
          aria-label="Project enquiry"
        >
          <h3>
            Tell me about your project<span className="blue">.</span>
          </h3>
          <p>A few details are all we need to start a conversation.</p>
          <div className={s.formRow}>
            <label>
              Name <span>*</span>
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                placeholder="Your name"
              />
            </label>
            <label>
              Email <span>*</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label>
            Business / Company
            <input
              name="company"
              autoComplete="organization"
              maxLength={200}
              placeholder="Your business name"
            />
          </label>
          <label htmlFor="project-type" className={s.projectTypeLabel}>
            Project Type <span>*</span>
          </label>
          <CustomSelect
            id="project-type"
            name="projectType"
            label="Project Type"
            placeholder="What can I help you with?"
            required
            value={projectType}
            onChange={(value) => {
              setProjectType(value);
              setProjectTypeMissing(false);
            }}
            error={
              projectTypeMissing ? "Please choose a project type." : undefined
            }
            options={[
              "New website",
              "Website redesign",
              "SEO & advertising",
              "CRM & automation",
              "Performance optimization",
              "Ongoing support",
              "Something else",
            ]}
          />
          <label>
            Message <span>*</span>
            <textarea
              name="message"
              required
              rows={4}
              maxLength={5000}
              placeholder="A little about your business, your goals and what you have in mind…"
            />
          </label>
          <button
            type="submit"
            className="button"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Sending…"
              : "Let’s Talk About Your Project"}
            <Icon />
          </button>
          <p className={s.formNote}>
            Your details are used to respond to your enquiry.
          </p>
          <div role="status" aria-live="polite">
            {status === "success" && (
              <p className={s.success}>
                Thanks! Your enquiry has been sent. I’ll be in touch.
              </p>
            )}
            {status === "error" && <p className={s.error}>{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
