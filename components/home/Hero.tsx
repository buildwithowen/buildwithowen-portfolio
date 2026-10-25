import Image from "next/image";
import asahiScreenshot from "@/public/images/hero-asahi-move.png";
import Icon from "./Icon";
import s from "./home.module.css";

export function SystemPreview() {
  return (
    <div
      className={s.system}
      role="img"
      aria-label="Asahi Move website preview with illustrative analytics, development, SEO, ads, CRM and automation cards. Dashboard panels are demos, not client results."
    >
      <div className={s.orbit} />
      <div className={s.browser}>
        <div className={s.browserBar}>
          <span className={s.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={s.address}>yourbusiness.com</span>
          <span>↗</span>
        </div>
        <div className={s.browserScreen}>
          <Image
            src={asahiScreenshot}
            alt="Asahi Move website homepage"
            sizes="(max-width: 600px) 94vw, (max-width: 900px) 522px, (max-width: 1100px) 44vw, 640px"
            preload
            className={s.browserScreenshot}
          />
        </div>
      </div>
      <div className={s.analytics}>
        <span className={s.panelLabel}>
          <span className={s.iconTile}>
            <Icon kind="speed" />
          </span>{" "}
          Website insights <span className={s.liveDot} />
        </span>
        <strong>
          Built for growth <span>↗</span>
        </strong>
        <p>Traffic → enquiries → opportunity</p>
        <svg viewBox="0 0 250 80" fill="none" aria-hidden="true">
          <path d="M0 66H250M0 35H250M0 4H250" stroke="#e8edf3" />
          <path
            d="m0 66 25-8 22 4 27-25 25 7 28-15 24 7 26-24 24 4 24-12 25-2"
            stroke="#0089f7"
            strokeWidth="3"
          />
        </svg>
        <span className={s.demoLabel}>ILLUSTRATIVE DASHBOARD</span>
      </div>
      <div className={s.codePanel}>
        <span>
          <i /> development.tsx <span>⌘</span>
        </span>
        <pre>
          <code>
            <em>const</em> yourNextChapter = {"{"}
            <br /> website: <b>&quot;built to perform&quot;</b>,<br /> systems:{" "}
            <b>&quot;connected&quot;</b>,<br /> possibilities:{" "}
            <b>&quot;open&quot;</b>
            <br />
            {"}"};
          </code>
        </pre>
      </div>
      <div className={s.leadPanel}>
        <span className={s.leadIcon}>
          <Icon kind="check" />
        </span>
        <div>
          <strong>A new enquiry. Connected.</strong>
          <span>
            Website <b>→</b> CRM <b>→</b> Follow-up
          </span>
        </div>
        <span className={s.liveDot} />
      </div>
      <div className={s.seoTag}>
        <Icon kind="search" /> SEO + Ads <span>Built in</span>
      </div>
      <span className={s.systemCaption}>ONE CONNECTED DIGITAL SYSTEM</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-heading">
      <div className={`container ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}>
            <span className={s.liveDot} /> FULL STACK WEB DEVELOPER
          </p>
          <h1 id="hero-heading">
            Full Stack
            <br />
            Websites.
            <br />
            <span>
              Built to Win
              <br />
              Business.
            </span>
          </h1>
          <p className={s.heroDescription}>
            I’m Owen. I design and build high-performance websites and digital
            platforms — with the SEO, integrations and automation your business
            needs to move forward.
          </p>
          <div className={s.chips}>
            {["Next.js", "React", "WordPress", "SEO", "Automation"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className={s.heroActions}>
            <a href="#contact" className="button">
              Start a Project <Icon />
            </a>
            <a href="#work" className={s.secondaryButton}>
              View My Work <Icon />
            </a>
          </div>
          <p className={s.confidence}>
            <Icon kind="check" /> Business-focused <span>·</span> Built for
            performance
          </p>
        </div>
        <SystemPreview />
      </div>
      <div className={`container ${s.heroFoot}`}>
        <span>GOOD DESIGN. SOLID CODE. REAL BUSINESS PURPOSE.</span>
        <a href="#services">
          Explore what’s possible <span>↓</span>
        </a>
      </div>
    </section>
  );
}
