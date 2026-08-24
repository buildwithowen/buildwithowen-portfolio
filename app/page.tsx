"use client";

import { useRef, useState } from "react";

type Screen = "home" | "deployments";

type WindowType =
  | "stack"
  | "about"
  | "seo"
  | "ads"
  | null;

type FormStatus =
  | "idle"
  | "sending"
  | "success"
  | "error";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [windowOpen, setWindowOpen] =
    useState<WindowType>(null);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function goHome() {
    setScreen("home");
    closeMobileMenu();
  }

  function goDeployments() {
    setScreen("deployments");
    closeMobileMenu();
  }

  function openWindow(type: WindowType) {
    setWindowOpen(type);
    closeMobileMenu();
  }

  function goToContact() {
    setScreen("deployments");
    closeMobileMenu();

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  return (
    <main className="developer-os">
      {/* =========================================
          TOP BAR
      ========================================= */}

      <header className="system-bar">
        <button
          className="brand"
          onClick={goHome}
        >
          BUILD<span>/</span>WITH<span>/</span>OWEN
        </button>

        <nav className="system-nav">
          <button
            className={screen === "home" ? "active" : ""}
            onClick={goHome}
          >
            /home
          </button>

          <button
            className={
              screen === "deployments" ? "active" : ""
            }
            onClick={goDeployments}
          >
            /deployments
          </button>

          <button
            onClick={() =>
              openWindow("stack")
            }
          >
            /stack
          </button>

          <button
            onClick={() =>
              openWindow("about")
            }
          >
            /about
          </button>
        </nav>

        <button
          className="contact-command"
          onClick={goToContact}
        >
          <span className="status-dot" />
          contact_me()
        </button>

        {/* MOBILE MENU BUTTON */}

        <button
          className={`mobile-menu-button ${
            mobileMenuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMobileMenuOpen(
              (current) => !current
            )
          }
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* =========================================
          MOBILE MENU
      ========================================= */}

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-command">
            <span>
              owen@portfolio:~$
            </span>{" "}
            navigation --mobile
          </div>

          <nav className="mobile-menu-links">
            <button
              className={
                screen === "home"
                  ? "active"
                  : ""
              }
              onClick={goHome}
            >
              <span>01</span>
              /home
            </button>

            <button
              className={
                screen === "deployments"
                  ? "active"
                  : ""
              }
              onClick={goDeployments}
            >
              <span>02</span>
              /deployments
            </button>

            <button
              onClick={() =>
                openWindow("stack")
              }
            >
              <span>03</span>
              /stack
            </button>

            <button
              onClick={() =>
                openWindow("about")
              }
            >
              <span>04</span>
              /about
            </button>

            <button
              className="mobile-contact-link"
              onClick={goToContact}
            >
              <span>05</span>
              contact_me()
            </button>
          </nav>

          <div className="mobile-menu-status">
            <span>
              ● SYSTEM ONLINE
            </span>

            <strong>
              AVAILABLE_FOR_PROJECTS
            </strong>
          </div>
        </div>
      )}

      {/* =========================================
          HOME
      ========================================= */}

      {screen === "home" && (
        <section className="workspace">
          <aside className="explorer">
            <p className="panel-title">
              EXPLORER
            </p>

            <div className="file-tree">
              <p>▾ build-with-owen</p>
              <p className="indent-1">
                ▾ app
              </p>

              <button className="file active">
                <span>TSX</span>
                page.tsx
              </button>

              <button className="file">
                <span>TSX</span>
                layout.tsx
              </button>

              <p className="indent-1">
                ▸ components
              </p>

              <button
                className="tree-button indent-1"
                onClick={goDeployments}
              >
                ▸ deployments
              </button>

              <button
                className="tree-button indent-1"
                onClick={() =>
                  openWindow("stack")
                }
              >
                ▸ stack
              </button>

              <button
                className="tree-button indent-1"
                onClick={() =>
                  openWindow("about")
                }
              >
                ▸ about
              </button>
            </div>

            <p className="panel-title source-title">
              SOURCE CONTROL
            </p>

            <div className="source-control">
              <p>
                <span>M</span>
                app/page.tsx
              </p>

              <p>
                <span>A</span>
                components/Hero.tsx
              </p>

              <p>
                <span>M</span>
                app/globals.css
              </p>
            </div>
          </aside>

          <section className="editor">
            <div className="editor-tabs">
              <div className="editor-tab active">
                <span>TSX</span>
                page.tsx
                <b>×</b>
              </div>

              <div className="editor-tab">
                Hero.tsx
              </div>

              <div className="editor-tab">
                globals.css
              </div>
            </div>

            <div className="code-editor">
              <CodeLine number="01">
                <span className="syntax-red">
                  import
                </span>{" "}
                Developer{" "}
                <span className="syntax-red">
                  from
                </span>{" "}
                <span className="syntax-string">
                  &quot;./owen&quot;
                </span>
                ;
              </CodeLine>

              <CodeLine number="02">
                <span className="syntax-red">
                  import
                </span>{" "}
                Growth{" "}
                <span className="syntax-red">
                  from
                </span>{" "}
                <span className="syntax-string">
                  &quot;./seo-ads&quot;
                </span>
                ;
              </CodeLine>

              <CodeLine number="03">
                &nbsp;
              </CodeLine>

              <CodeLine number="04">
                <span className="syntax-red">
                  export default function
                </span>{" "}
                <span className="syntax-white">
                  Home
                </span>
                () {"{"}
              </CodeLine>

              <CodeLine number="05">
                &nbsp;&nbsp;
                <span className="syntax-red">
                  return
                </span>{" "}
                (
              </CodeLine>

              <CodeLine number="06">
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                <span className="syntax-blue">
                  main
                </span>{" "}
                className=
                <span className="syntax-string">
                  &quot;built-to-perform&quot;
                </span>
                &gt;
              </CodeLine>

              <div className="headline-code">
                <span className="code-number">
                  07
                </span>

                <div>
                  <code>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                    <span className="syntax-blue">
                      Headline
                    </span>
                    &gt;
                  </code>

                  <h1>
                    I BUILD WEBSITES
                    <br />
                    THAT{" "}
                    <strong>
                      WORK HARD.
                    </strong>
                  </h1>

                  <code>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                    <span className="syntax-blue">
                      Headline
                    </span>
                    &gt;
                  </code>
                </div>
              </div>

              <CodeLine number="08">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                <span className="syntax-blue">
                  Stack
                </span>{" "}
                tools=&#123;[
                <span className="syntax-string">
                  &quot;Next.js&quot;
                </span>
                ,{" "}
                <span className="syntax-string">
                  &quot;TypeScript&quot;
                </span>
                ,{" "}
                <span className="syntax-string">
                  &quot;Vercel&quot;
                </span>
                ]&#125; /&gt;
              </CodeLine>

              <CodeLine number="09">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                <span className="syntax-blue">
                  Growth
                </span>{" "}
                seo googleAds metaAds /&gt;
              </CodeLine>

              <CodeLine number="10">
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                <span className="syntax-blue">
                  main
                </span>
                &gt;
              </CodeLine>

              <CodeLine number="11">
                &nbsp;&nbsp;);
              </CodeLine>

              <CodeLine number="12">
                {"}"}
              </CodeLine>
            </div>

            <div className="hero-controls">
              <div className="hero-description">
                <span>
                  FULL-STACK WEB DEVELOPER / SEO /
                  PAID MEDIA
                </span>

                <p>
                  Fast websites, technical SEO and
                  growth systems for real businesses.
                </p>
              </div>

              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onClick={goDeployments}
                >
                  VIEW DEPLOYMENTS ↗
                </button>

                <button onClick={goToContact}>
                  START_PROJECT()
                </button>
              </div>
            </div>
          </section>

          <aside className="inspector">
            <InspectorPanel title="BUILD STATUS">
              <div className="deployment-status">
                <span />
                DEPLOYED
              </div>

              <SystemRow
                label="Framework"
                value="Next.js"
              />

              <SystemRow
                label="Runtime"
                value="Node.js"
              />

              <SystemRow
                label="Host"
                value="Vercel"
              />

              <SystemRow
                label="Branch"
                value="main"
              />
            </InspectorPanel>

            <InspectorPanel title="LIGHTHOUSE">
              <div className="lighthouse">
                <div>
                  <strong>99</strong>
                  <small>PERF</small>
                </div>

                <div>
                  <strong>100</strong>
                  <small>SEO</small>
                </div>
              </div>

              <div className="performance-bar">
                <span style={{ width: "99%" }} />
              </div>

              <div className="performance-bar">
                <span style={{ width: "100%" }} />
              </div>
            </InspectorPanel>

            <InspectorPanel title="QUICK OPEN">
              <button
                className="quick-link"
                onClick={() =>
                  openWindow("stack")
                }
              >
                /stack
              </button>

              <button
                className="quick-link"
                onClick={() =>
                  openWindow("about")
                }
              >
                /about
              </button>

              <button
                className="quick-link"
                onClick={() =>
                  openWindow("seo")
                }
              >
                /seo
              </button>

              <button
                className="quick-link"
                onClick={() =>
                  openWindow("ads")
                }
              >
                /ads
              </button>
            </InspectorPanel>
          </aside>
        </section>
      )}

      {/* =========================================
          DEPLOYMENTS
      ========================================= */}

      {screen === "deployments" && (
        <section className="deployments-screen">
          <header className="deployments-heading">
            <div>
              <span>
                [02] / PRODUCTION
              </span>

              <h2>
                SHIPPED
                <br />
                <strong>
                  BUILDS.
                </strong>
              </h2>
            </div>

            <p>
              Real-world websites engineered,
              optimized and deployed for businesses
              across multiple markets.
            </p>
          </header>

          <div className="second-screen-grid">
            <section className="projects-column">
              <div className="section-command">
                <span>
                  owen@portfolio:~$
                </span>{" "}
                ls ./deployments
              </div>

              <div className="deployment-list">
                <Deployment
                  number="001"
                  location="TEXAS / US"
                  name="Merry Moving"
                  stack="WEB DEVELOPMENT / LOCAL SEO / CONVERSION"
                  url="https://www.merrymovingtx.com/"
                />

                <Deployment
                  number="002"
                  location="TRAVEL / TOURS"
                  name="RZE Travel & Tours"
                  stack="WEB DEVELOPMENT / UX / CONVERSION"
                  url="https://www.rzetravelandtours.com/"
                />

                <Deployment
                  number="003"
                  location="MELBOURNE / AU"
                  name="Omkar Auto Care"
                  stack="NEXT.JS / PERFORMANCE / SEO"
                  url="https://omkar-autocare.vercel.app/"
                />

                <Deployment
                  number="004"
                  location="JAPAN"
                  name="Asahi Move"
                  stack="NEXT.JS / RESPONSIVE / SEO"
                  url="https://asahi-move.vercel.app/"
                />
              </div>
            </section>

            <div
              ref={formRef}
              className="project-form-column"
            >
              <ProjectForm />
            </div>
          </div>

          <div className="deployment-terminal">
            <span>
              owen@portfolio:~$ status
              <b>
                {" "}
                READY_FOR_NEW_PROJECT
              </b>
            </span>

            <button onClick={goHome}>
              ← RETURN_HOME()
            </button>
          </div>
        </section>
      )}

      {/* =========================================
          TERMINAL
      ========================================= */}

      <footer className="terminal">
        <span className="terminal-label">
          TERMINAL
        </span>

        <p>
          <strong>
            owen@buildwithowen
          </strong>
          :~$ npm run portfolio{" "}
          <span>
            ✓ production ready
          </span>
        </p>

        <button onClick={goToContact}>
          START_PROJECT() ↗
        </button>
      </footer>

      {/* =========================================
          WHATSAPP
      ========================================= */}

      <a
        className="whatsapp-float"
        href="https://wa.me/639434665920?text=Hi%20Owen!%20I%20found%20you%20through%20Build%20With%20Owen%20and%20I%27d%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Owen on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M19.11 17.45c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.41s1.04 2.8 1.18 2.99c.15.19 2.04 3.12 4.95 4.37.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z"
          />

          <path
            fill="currentColor"
            d="M16.02 3.2c-7.09 0-12.85 5.76-12.85 12.84 0 2.26.59 4.47 1.7 6.41L3.06 29l6.7-1.76a12.84 12.84 0 0 0 6.25 1.59h.01c7.08 0 12.84-5.76 12.84-12.85C28.86 8.95 23.1 3.2 16.02 3.2Zm0 23.46h-.01a10.65 10.65 0 0 1-5.43-1.49l-.39-.23-3.98 1.04 1.06-3.88-.25-.4a10.66 10.66 0 1 1 9 4.96Z"
          />
        </svg>

        <span className="whatsapp-pulse" />
      </a>

      {/* =========================================
          WINDOWS
      ========================================= */}

      {windowOpen === "stack" && (
        <StackWindow
          close={() =>
            setWindowOpen(null)
          }
        />
      )}

      {windowOpen === "about" && (
        <AboutWindow
          close={() =>
            setWindowOpen(null)
          }
        />
      )}

      {windowOpen &&
        windowOpen !== "stack" &&
        windowOpen !== "about" && (
          <PopupWindow
            type={windowOpen}
            close={() =>
              setWindowOpen(null)
            }
          />
        )}
    </main>
  );
}

/* =========================================
   HELPERS
========================================= */

function CodeLine({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="code-line">
      <span className="code-number">
        {number}
      </span>

      <code>{children}</code>
    </div>
  );
}

function InspectorPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="inspector-panel">
      <p className="panel-title">
        {title}
      </p>

      {children}
    </section>
  );
}

function SystemRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="system-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================================
   DEPLOYMENT
========================================= */

function Deployment({
  number,
  location,
  name,
  stack,
  url,
}: {
  number: string;
  location: string;
  name: string;
  stack: string;
  url: string;
}) {
  return (
    <a
      className="deployment-row"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="deployment-row-number">
        <span>
          PROJECT_{number}
        </span>

        <strong>
          ● LIVE
        </strong>
      </div>

      <div className="deployment-row-main">
        <small>
          {location}
        </small>

        <h3>
          {name}
        </h3>

        <span className="deployment-stack">
          {stack}
        </span>
      </div>

      <div className="deployment-row-action">
        OPEN_BUILD()
        <span>↗</span>
      </div>
    </a>
  );
}

/* =========================================
   CONTACT FORM
========================================= */

function ProjectForm() {
  const [form, setForm] = useState({
    projectType: "",
    platform: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] =
    useState<FormStatus>("idle");

  async function submitForm(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setStatus("sending");

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to send message."
        );
      }

      setStatus("success");

      setForm({
        projectType: "",
        platform: "",
        budget: "",
        timeline: "",
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="project-form-panel">
      <div className="form-terminal-title">
        <span>
          NEW_PROJECT.init()
        </span>

        <strong>
          ● ONLINE
        </strong>
      </div>

      <div className="form-intro">
        <span>
          [ START A PROJECT ]
        </span>

        <h2>
          TELL ME WHAT
          <br />
          NEEDS TO{" "}
          <strong>
            SHIP.
          </strong>
        </h2>

        <p>
          New build? Existing codebase?
          Broken website? Figma file?
          Upwork job post? Drop the
          details below.
        </p>
      </div>

      <form
        className="contact-form"
        onSubmit={submitForm}
      >
        <label>
          <span>
            01 / PROJECT TYPE *
          </span>

          <select
            required
            value={form.projectType}
            onChange={(event) =>
              setForm({
                ...form,
                projectType:
                  event.target.value,
              })
            }
          >
            <option value="">
              Select project type
            </option>

            <option value="Brand New Website">
              Brand New Website
            </option>

            <option value="Website Redesign">
              Website Redesign
            </option>

            <option value="Enhancement / New Features">
              Enhancement / New Features
            </option>

            <option value="Bug Fixes">
              Bug Fixes / Troubleshooting
            </option>

            <option value="Maintenance">
              Ongoing Maintenance
            </option>

            <option value="Clone / Rebuild">
              Clone / Rebuild Existing Website
            </option>

            <option value="Landing Page">
              Landing Page
            </option>

            <option value="Performance Optimization">
              Speed / Performance Optimization
            </option>

            <option value="Technical SEO">
              Technical SEO
            </option>

            <option value="Analytics / Tracking">
              Analytics / Tracking Setup
            </option>

            <option value="Other">
              Something Else
            </option>
          </select>
        </label>

        <label>
          <span>
            02 / PLATFORM / STACK
          </span>

          <select
            value={form.platform}
            onChange={(event) =>
              setForm({
                ...form,
                platform:
                  event.target.value,
              })
            }
          >
            <option value="">
              Select platform
            </option>

            <option value="Next.js">
              Next.js
            </option>

            <option value="React">
              React
            </option>

            <option value="WordPress">
              WordPress
            </option>

            <option value="Shopify">
              Shopify
            </option>

            <option value="HTML / CSS / JavaScript">
              HTML / CSS / JavaScript
            </option>

            <option value="Existing Website">
              Existing Website / Codebase
            </option>

            <option value="Figma to Website">
              Figma → Website
            </option>

            <option value="Not Sure">
              Not Sure / Recommend One
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </label>

        <div className="form-grid">
          <label>
            <span>
              03 / BUDGET
            </span>

            <select
              value={form.budget}
              onChange={(event) =>
                setForm({
                  ...form,
                  budget:
                    event.target.value,
                })
              }
            >
              <option value="">
                Select budget
              </option>

              <option value="Under $500">
                Under $500
              </option>

              <option value="$500 - $1,000">
                $500 — $1,000
              </option>

              <option value="$1,000 - $3,000">
                $1,000 — $3,000
              </option>

              <option value="$3,000 - $5,000">
                $3,000 — $5,000
              </option>

              <option value="$5,000+">
                $5,000+
              </option>

              <option value="Need Estimate">
                Need an Estimate
              </option>
            </select>
          </label>

          <label>
            <span>
              04 / TIMELINE
            </span>

            <select
              value={form.timeline}
              onChange={(event) =>
                setForm({
                  ...form,
                  timeline:
                    event.target.value,
                })
              }
            >
              <option value="">
                Select timeline
              </option>

              <option value="ASAP">
                ASAP
              </option>

              <option value="1 - 2 Weeks">
                1 — 2 Weeks
              </option>

              <option value="2 - 4 Weeks">
                2 — 4 Weeks
              </option>

              <option value="1 - 2 Months">
                1 — 2 Months
              </option>

              <option value="Flexible">
                Flexible
              </option>
            </select>
          </label>
        </div>

        <div className="form-grid">
          <label>
            <span>
              05 / YOUR NAME *
            </span>

            <input
              required
              type="text"
              placeholder="John Smith"
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name:
                    event.target.value,
                })
              }
            />
          </label>

          <label>
            <span>
              06 / EMAIL *
            </span>

            <input
              required
              type="email"
              placeholder="john@company.com"
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email:
                    event.target.value,
                })
              }
            />
          </label>
        </div>

        <label>
          <span>
            07 / COMPANY
          </span>

          <input
            type="text"
            placeholder="Company / business name"
            value={form.company}
            onChange={(event) =>
              setForm({
                ...form,
                company:
                  event.target.value,
              })
            }
          />
        </label>

        <label className="message-field">
          <span>
            08 / PROJECT BRIEF *
          </span>

          <textarea
            required
            rows={6}
            placeholder="Paste the Upwork job description, current website URL, requirements, issue you're trying to fix, or anything else I should know..."
            value={form.message}
            onChange={(event) =>
              setForm({
                ...form,
                message:
                  event.target.value,
              })
            }
          />
        </label>

        <div className="form-footer">
          <div className="form-status">
            <span
              className={`status-light ${status}`}
            />

            {status === "idle" &&
              "SYSTEM READY / RESPONSE WITHIN 24H"}

            {status === "sending" &&
              "TRANSMITTING PROJECT DATA..."}

            {status === "success" &&
              "MESSAGE SENT / BUILD REQUEST RECEIVED"}

            {status === "error" &&
              "SEND FAILED / PLEASE TRY AGAIN"}
          </div>

          <button
            type="submit"
            disabled={
              status === "sending"
            }
          >
            {status === "sending"
              ? "SENDING..."
              : "SEND_PROJECT() ↗"}
          </button>
        </div>
      </form>
    </section>
  );
}

/* =========================================
   STACK
========================================= */

function StackWindow({
  close,
}: {
  close: () => void;
}) {
  return (
    <div
      className="popup-backdrop"
      onClick={close}
    >
      <section
        className="popup-window stack-window"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <header>
          <span>
            STACK.config
          </span>

          <button
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="stack-content">
          <div className="stack-command">
            <span>
              owen@portfolio:~$
            </span>{" "}
            cat stack.json
          </div>

          <div className="stack-heading">
            <small>
              [ SYSTEM CAPABILITIES ]
            </small>

            <h2>
              TOOLS CHANGE.
              <br />
              <strong>
                SHIPPING DOESN&apos;T.
              </strong>
            </h2>

            <p>
              The stack depends on the project.
              The goal stays the same: fast,
              maintainable websites that solve
              real business problems.
            </p>
          </div>

          <div className="stack-grid">
            <StackGroup
              number="01"
              title="CORE DEVELOPMENT"
              items={[
                "Next.js",
                "React",
                "TypeScript",
                "JavaScript",
                "HTML5",
                "CSS3",
                "Node.js",
              ]}
            />

            <StackGroup
              number="02"
              title="CMS / COMMERCE"
              items={[
                "WordPress",
                "Shopify",
              ]}
            />

            <StackGroup
              number="03"
              title="DEPLOYMENT / WORKFLOW"
              items={[
                "Vercel",
                "GitHub",
                "Git",
                "VS Code",
              ]}
            />

            <StackGroup
              number="04"
              title="SEO / GROWTH"
              items={[
                "Technical SEO",
                "Local SEO",
                "On-Page SEO",
                "Google Search Console",
                "Google Analytics",
                "Google Ads",
                "Meta Ads",
              ]}
            />

            <StackGroup
              number="05"
              title="PERFORMANCE"
              items={[
                "Core Web Vitals",
                "Lighthouse",
                "PageSpeed Optimization",
                "Responsive Development",
                "Conversion Optimization",
              ]}
            />
          </div>

          <div className="capabilities-heading">
            <span>
              owen@portfolio:~$
            </span>{" "}
            ./capabilities --list
          </div>

          <div className="capability-grid">
            <Capability
              number="01"
              title="BUILD"
              text="New websites, landing pages and Figma-to-code builds."
            />

            <Capability
              number="02"
              title="REBUILD"
              text="Existing websites, redesigns and migrations."
            />

            <Capability
              number="03"
              title="FIX"
              text="Bugs, responsive issues and broken layouts."
            />

            <Capability
              number="04"
              title="OPTIMIZE"
              text="Performance, Core Web Vitals and technical SEO."
            />

            <Capability
              number="05"
              title="MAINTAIN"
              text="Updates, enhancements and ongoing support."
            />

            <Capability
              number="06"
              title="GROW"
              text="SEO, analytics, Google Ads and Meta Ads."
            />
          </div>

          <div className="stack-status">
            <span>
              ● SYSTEM READY
            </span>

            <strong>
              AVAILABLE_FOR_PROJECTS
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}

function StackGroup({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  return (
    <section className="stack-group">
      <div className="stack-group-title">
        <span>
          {number}
        </span>

        <strong>
          {title}
        </strong>
      </div>

      <div className="stack-items">
        {items.map((item) => (
          <div
            className="stack-item"
            key={item}
          >
            <span>→</span>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function Capability({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="capability-card">
      <span>
        [{number}]
      </span>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>
    </div>
  );
}

/* =========================================
   ABOUT
========================================= */

function AboutWindow({
  close,
}: {
  close: () => void;
}) {
  return (
    <div
      className="popup-backdrop"
      onClick={close}
    >
      <section
        className="popup-window about-window"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <header>
          <span>
            profile.json
          </span>

          <button
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="about-content">
          <div className="about-command">
            <span>
              owen@portfolio:~$
            </span>{" "}
            cat profile.json
          </div>

          <div className="about-hero">
            <small>
              [ ABOUT / PROFILE ]
            </small>

            <h2>
              I CARE ABOUT
              <br />
              WHAT HAPPENS{" "}
              <strong>
                AFTER LAUNCH.
              </strong>
            </h2>

            <p>
              I build websites with the full
              business picture in mind — speed,
              usability, search visibility,
              tracking, conversion and long-term
              maintainability.
            </p>
          </div>

          <div className="profile-grid">
            <ProfileItem
              label="NAME"
              value="Owen Genuino"
            />

            <ProfileItem
              label="ROLE"
              value="Full-Stack Web Developer"
            />

            <ProfileItem
              label="FOCUS"
              value="Development / SEO / Growth"
            />

            <ProfileItem
              label="WORK MODE"
              value="Remote / Global"
            />
          </div>

          <div className="about-section-command">
            <span>
              owen@portfolio:~$
            </span>{" "}
            ./workflow --show
          </div>

          <div className="workflow-grid">
            <WorkflowStep
              number="01"
              title="UNDERSTAND"
              text="Learn the business, the audience and the actual problem."
            />

            <WorkflowStep
              number="02"
              title="PLAN"
              text="Choose the simplest stack and structure that fits."
            />

            <WorkflowStep
              number="03"
              title="BUILD"
              text="Develop, test and optimize the experience."
            />

            <WorkflowStep
              number="04"
              title="SHIP"
              text="Deploy cleanly with performance and tracking in place."
            />

            <WorkflowStep
              number="05"
              title="SUPPORT"
              text="Fix, improve, maintain and keep shipping."
            />
          </div>

          <div className="about-section-command">
            <span>
              owen@portfolio:~$
            </span>{" "}
            cat principles.md
          </div>

          <div className="principles-list">
            <div>
              <span>→</span>
              Clear communication
            </div>

            <div>
              <span>→</span>
              Practical solutions
            </div>

            <div>
              <span>→</span>
              Business-first decisions
            </div>

            <div>
              <span>→</span>
              Clean, maintainable code
            </div>

            <div>
              <span>→</span>
              Fast iteration
            </div>
          </div>

          <div className="about-status-grid">
            <div>
              <small>
                CURRENT_STATUS
              </small>

              <strong>
                ● AVAILABLE FOR SELECTED PROJECTS
              </strong>
            </div>

            <div>
              <small>
                WORKING_WITH
              </small>

              <strong>
                STARTUPS / LOCAL BUSINESSES /
                AGENCIES / UPWORK CLIENTS
              </strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="profile-item">
      <small>
        {label}
      </small>

      <strong>
        {value}
      </strong>
    </div>
  );
}

function WorkflowStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="workflow-step">
      <span>
        [{number}]
      </span>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>
    </div>
  );
}

/* =========================================
   SEO / ADS POPUPS
========================================= */

function PopupWindow({
  type,
  close,
}: {
  type: "seo" | "ads";
  close: () => void;
}) {
  const content = {
    seo: {
      label: "/seo",
      title:
        "Search starts in the codebase.",
      text:
        "Architecture, performance, metadata, schema and tracking are part of the build — not something bolted on afterwards.",
    },

    ads: {
      label: "/ads",
      title:
        "Traffic needs somewhere good to land.",
      text:
        "Google Ads and Meta Ads connected to conversion-focused websites, analytics and proper tracking.",
    },
  };

  const current =
    content[type];

  return (
    <div
      className="popup-backdrop"
      onClick={close}
    >
      <section
        className="popup-window"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <header>
          <span>
            {current.label}
          </span>

          <button
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="popup-content">
          <small>
            BUILD / WITH / OWEN
          </small>

          <h2>
            {current.title}
          </h2>

          <p>
            {current.text}
          </p>
        </div>
      </section>
    </div>
  );
}
