import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/home/Icon";
import s from "./CinematicHero.module.css";
import HeroNetworkFlow from "./HeroNetworkFlow";
import HeroHeadline from "./HeroHeadline";

function CapabilityVisual({ kind }: { kind: string }) {
  const artwork: Record<string, React.ReactNode> = {
    development: <><path d="m13 9-6 6 6 6m24-12 6 6-6 6M28 5l-6 20" /></>,
    visibility: <><rect x="3" y="4" width="44" height="22" rx="4" /><circle cx="12" cy="12" r="3" /><path d="m14 14 3 3m7-6h15M8 21h30" /></>,
    systems: <><rect x="2" y="10" width="12" height="10" rx="2" /><rect x="36" y="1" width="12" height="10" rx="2" /><rect x="36" y="21" width="12" height="10" rx="2" /><path d="M14 15h11V6h11M25 15v11h11" /><circle cx="25" cy="15" r="2" /></>,
    automation: <><circle cx="7" cy="16" r="5" /><rect x="20" y="11" width="10" height="10" rx="2" /><circle cx="43" cy="16" r="5" /><path d="M12 16h8m10 0h8m-16-1 2 2 4-4" /></>,
    webDesign: <><rect x="2" y="2" width="46" height="28" rx="3" /><path d="M2 8h46M8 13h17M8 18h12M8 24h10" /><rect x="31" y="13" width="11" height="11" rx="2" /></>,
    googleAds: <><path d="M3 3v26h44" /><rect x="10" y="14" width="6" height="11" rx="1" /><rect x="23" y="7" width="6" height="18" rx="1" /><rect x="36" y="11" width="6" height="14" rx="1" /></>,
  };
  return <svg className={s.capabilityVisual} viewBox="0 0 50 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{artwork[kind]}</svg>;
}

export default function CinematicHero({ preview = false }: { preview?: boolean }) {
  return (
    <section className={`${s.hero} ${preview ? s.preview : ""}`} aria-labelledby="hero-heading">
      <div className={s.backdrop} aria-hidden="true">

      </div>
      <div className={s.shade} aria-hidden="true" />
      {preview && <header className={s.header}>
        <Link href="/" className={s.brand}>
          <Image src="/images/build-with-owen-logo.png" alt="" width={36} height={36} />
          <span>Build With <strong>Owen<span className={s.blue}>.</span></strong></span>
        </Link>
        <nav aria-label="Draft navigation" className={s.nav}>
          <Link href="/#work">Work</Link><Link href="/#services">Services</Link><Link href="/#about">About</Link>
          <Link href="/#contact" className={s.contact}>Let’s talk </Link>
        </nav>
      </header>}
      <div className={s.network} data-hero-network>
        <svg aria-hidden="true" className={s.connections} viewBox="0 0 1440 1000" fill="none" preserveAspectRatio="none">
          {/* One trunk with orthogonal relationship branches to the four card ports. */}
          <path d="M980 95V720Q980 740 1000 740H1180Q1200 740 1200 720V670" />
          <path d="M980 320H410Q390 320 390 300V190M780 320V240M980 460H1100Q1120 460 1120 440V390" />
          <g className={s.outerBranches}>
            <path d="M980 95V-180M1166 110V-120M390 190V80Q390 60 370 60H160Q140 60 140 40V-160M140 60H-220M264 205V130H-220M980 320H1620M1200 670V810Q1200 830 1180 830H860Q840 830 840 850V1180M840 1030H620M1316 720V900H1640M390 320H100Q80 320 80 340V620Q80 640 100 640H260Q280 640 280 660V880Q280 900 260 900H-220M80 490H-220M280 760H460Q480 760 480 780V1140M480 1000H140Q120 1000 120 1020V1200M565 401V560Q565 580 585 580H650Q670 580 670 600V730M670 670H760M1316 600H1640M80 640H-180" />
            <circle cx="140" cy="60" r="3" /><circle cx="80" cy="490" r="3" />
            <circle cx="280" cy="760" r="3" /><circle cx="480" cy="1000" r="3" />
            <circle cx="840" cy="1030" r="3" />
            <circle cx="670" cy="730" r="3" /><circle cx="760" cy="670" r="2" />
          </g>
          <path d="M80 490H40Q20 490 20 510V550H70M480 1000H520Q540 1000 540 980V870Q540 850 560 850" />
          <g className={s.secondaryBranches}>
            <path d="M980 170H1150Q1166 170 1166 154V110H1300M1166 135H1250M980 435H860Q844 435 844 451V505M844 505H740M565 320V385Q565 401 549 401H465M1200 600H1300Q1316 600 1316 616V720H1400M1316 680H1380M390 265H280Q264 265 264 249V205H170" />
            <circle cx="1300" cy="110" r="3" /><circle cx="1250" cy="135" r="2" />
            <circle cx="740" cy="505" r="2" />
            <circle cx="465" cy="401" r="3" /><circle cx="1400" cy="720" r="3" />
            <circle cx="1380" cy="680" r="2" /><circle cx="170" cy="205" r="3" />
          </g>
          <g>
            <circle cx="980" cy="95" r="5" />
            <circle cx="980" cy="320" r="4" />
            <circle cx="780" cy="320" r="3" />
            <circle cx="390" cy="190" r="4" />
            <circle cx="780" cy="240" r="4" />
            <circle cx="1120" cy="390" r="4" />
            <circle cx="1200" cy="670" r="4" />
            <circle cx="70" cy="550" r="4" />
            <circle cx="560" cy="850" r="4" />
          </g>
        </svg>
      <HeroNetworkFlow path="M980 95L980 170L980 320L780 320L565 320L410 320L100 320Q80 320 80 340L80 490L40 490Q20 490 20 510L20 550L70 550L20 550L20 510Q20 490 40 490L80 490L80 620Q80 640 100 640L260 640Q280 640 280 660L280 760L460 760Q480 760 480 780L480 1000L520 1000Q540 1000 540 980L540 870Q540 850 560 850Q540 850 540 870L540 980Q540 1000 520 1000L480 1000L480 780Q480 760 460 760L280 760L280 660Q280 640 260 640L100 640Q80 640 80 620L80 490L80 340Q80 320 100 320L410 320Q390 320 390 300L390 265L280 265Q264 265 264 249L264 205L170 205L264 205L264 249Q264 265 280 265L390 265L390 190L390 265L390 300Q390 320 410 320L565 320L565 385Q565 401 549 401L465 401L549 401Q565 401 565 385L565 560Q565 580 585 580L650 580Q670 580 670 600L670 670L670 730L670 670L760 670L670 670L670 600Q670 580 650 580L585 580Q565 580 565 560L565 385L565 320L780 320L780 240L780 320L980 320L980 435L860 435Q844 435 844 451L844 505L740 505L844 505L844 451Q844 435 860 435L980 435L980 460L980 720Q980 740 1000 740L1180 740Q1200 740 1200 720L1200 670L1200 600L1300 600Q1316 600 1316 616L1316 680L1316 720L1400 720L1316 720L1316 680L1380 680L1316 680L1316 616Q1316 600 1300 600L1200 600L1200 670L1200 720Q1200 740 1180 740L1000 740Q980 740 980 720L980 460L1100 460Q1120 460 1120 440L1120 390L1120 440Q1120 460 1100 460L980 460L980 435L980 320L980 170L1150 170Q1166 170 1166 154L1166 135L1166 110L1300 110L1166 110L1166 135L1250 135L1166 135L1166 154Q1166 170 1150 170L980 170L980 95" />
      <aside className={s.profilePanels} aria-label="My capabilities">
        {[
          { name: "Websites", detail: "Built for your business", icon: "code", position: "development" },
          { name: "SEO", detail: "Help people find you", icon: "search", position: "visibility" },
          { name: "CRM", detail: "Keep your leads connected", icon: "connect", position: "systems" },
          { name: "Automation", detail: "Simplify daily tasks", icon: "speed", position: "automation" },
          { name: "Design", detail: "Clear, easy to use", icon: "design", position: "webDesign" },
          { name: "Analytics", detail: "Understand your visitors", icon: "search", position: "googleAds" },
        ].map((panel) => (
          <div key={panel.position} tabIndex={0} aria-label={`${panel.name} preview`} data-capability={panel.position} className={`${s.profilePanel} ${s[panel.position]}`}>
            <span className={s.panelIcon}><Icon kind={panel.icon} /></span>
            <strong>{panel.name}</strong>
            <span className={s.panelDetail}>{panel.detail}</span>
            <CapabilityVisual kind={panel.position} />
          </div>
        ))}
      </aside>
      </div>
      <div className={s.content}>
        <div className={s.copy}>
          <p className={s.eyebrow}><span /> INDEPENDENT FULL STACK DEVELOPER</p>
          <HeroHeadline />
          <p className={s.description}>I’m Owen. I build websites and digital platforms with the SEO, integrations and automation your business needs to move forward.</p>
          <ul className={s.trustBadges} aria-label="Experience and client feedback">
            <li>
              <Link href="#google-reviews-heading" className={s.trustBadge}>
                <Image src="/images/tools/google.svg" alt="" width={20} height={20} />
                <span><strong>Google Reviews</strong><small>Client feedback</small></span>
              </Link>
            </li>
            <li className={s.trustBadge}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              <span><strong>7 years</strong><small>Experience</small></span>
            </li>
            <li className={s.trustBadge}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></svg>
              <span><strong>AUS · US · Asia</strong><small>International projects</small></span>
            </li>
          </ul>
        </div>
      </div>
      <footer className={s.footer}><span>GOOD DESIGN. SOLID CODE. REAL PURPOSE.</span>{preview && <Link href="/">Compare with current homepage</Link>}</footer>
    </section>
  );
}
