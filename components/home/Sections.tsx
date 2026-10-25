import ProjectsCarousel from "./ProjectsCarousel";
import Image from "next/image";
import Icon from "./Icon";
import {
  technologies,
  technologyLogos,
  testimonialData,
  portraitImage,
} from "./data";
import s from "./home.module.css";

export function Stats() {
  // Capability-led proof until numerical experience and market claims are verified.
  return (
    <section className={s.stats} aria-label="Development capabilities">
      <div className={`container ${s.statsGrid}`}>
        {[
          ["Full Stack", "From front-end to back-end"],
          ["Business First", "Built around your goals"],
          ["Connected", "Websites, tools & workflows"],
          ["Long Term", "Launch, improve & grow"],
        ].map(([title, text]) => (
          <div key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  const services = [
    [
      "code",
      "Website Development",
      "Fast, responsive websites and custom platforms built with Next.js, React or WordPress.",
      "A stronger digital foundation",
    ],
    [
      "design",
      "UI/UX Design",
      "Thoughtful layouts and clear customer journeys that make your business easy to understand.",
      "Make every interaction count",
    ],
    [
      "search",
      "SEO Foundations",
      "Technical and local SEO, analytics and paid campaign setup to help the right people find you.",
      "Get found. Get understood.",
    ],
    [
      "connect",
      "CRM & Automation",
      "Connect enquiries, customer data and everyday tools. Spend less time on repetitive work.",
      "A business that flows better",
    ],
    [
      "speed",
      "Performance Optimization",
      "Improve loading speed, usability and the technical details that shape the customer experience.",
      "Less friction. More possibility.",
    ],
    [
      "support",
      "Ongoing Support",
      "A reliable development partner for updates, improvements and the next stage of your business.",
      "Built for the long run",
    ],
  ];
  return (
    <section id="services" className="section">
      <div className="container">
        <div className={s.sectionHead}>
          <div>
            <p className="eyebrow">HOW I CAN HELP</p>
            <h2>
              What I Can Do
              <br />
              for Your Business<span className="blue">.</span>
            </h2>
          </div>
          <p>
            Your website is one part of the picture.
            <br />
            Let’s make the whole digital experience work better.
          </p>
        </div>
        <div className={s.serviceGrid}>
          {services.map(([icon, title, text, benefit], i) => (
            <article key={title} className={s.serviceCard}>
              <div className={s.cardTop}>
                <span
                  className={`${s.serviceIcon} ${i % 2 ? s.greenIcon : ""}`}
                >
                  <Icon kind={icon} />
                </span>
                <span className={s.cardNumber}>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className={s.benefit}>
                {benefit}
                <Icon />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FullStackAdvantage() {
  return (
    <section className={`${s.advantage} section`}>
      <div className={`container ${s.split}`}>
        <div
          className={s.connectionMap}
          aria-label="Strategy connects design, development, SEO and automation"
        >
          <span className={s.mapLabel}>THE BIGGER PICTURE</span>
          <div className={s.mapRow}>
            <span>
              <Icon kind="design" /> Design
            </span>
            <span>
              <Icon kind="code" /> Development
            </span>
          </div>
          <div className={s.mapCenter}>
            <Image
              src="/images/build-with-owen-logo.png"
              alt="Build With Owen"
              width={1000}
              height={1000}
              sizes="(max-width: 600px) 33px, 39px"
              className={s.diagramLogo}
            />
            <strong>
              Your business.
              <br />
              Everything connected.
            </strong>
          </div>
          <div className={s.mapRow}>
            <span>
              <Icon kind="search" /> SEO & Ads
            </span>
            <span>
              <Icon kind="connect" /> Automation
            </span>
          </div>
          <p>One considered approach, from idea to everyday use.</p>
        </div>
        <div>
          <p className="eyebrow">MORE THAN THE BUILD</p>
          <h2>
            The Full-Stack
            <br />
            Advantage<span className="blue">.</span>
          </h2>
          <p className={s.bodyCopy}>
            A beautiful website should also work beautifully behind the scenes.
          </p>
          <p className={s.bodyCopy}>
            I connect the customer experience to the systems that run your
            business. You work directly with someone who understands both — and
            can collaborate with your specialists when the project needs it.
          </p>
          <ul className={s.checkList}>
            {[
              "Front-end polish. Back-end substance.",
              "SEO and performance considered from day one.",
              "Integrations that fit the way you actually work.",
              "Clear communication. Support beyond launch.",
            ].map((text) => (
              <li key={text}>
                <Icon kind="check" />
                {text}
              </li>
            ))}
          </ul>
          <a href="#contact" className={s.textLink}>
            Let’s connect the dots <Icon />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className={s.sectionHead}>
          <div>
            <p className="eyebrow">A LOOK AT THE POSSIBILITIES</p>
            <h2>
              Selected Work<span className="blue">.</span>
            </h2>
          </div>
          <p>Different businesses. The same thoughtful approach. </p>
        </div>
        <ProjectsCarousel />
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className={`${s.process} section`}>
      <div className="container">
        <div className={s.centerHead}>
          <p className="eyebrow">FROM FIRST HELLO TO WHAT’S NEXT</p>
          <h2>
            A Simple, Clear Process<span className="blue">.</span>
          </h2>
          <p>
            No guesswork. Just a considered path from your goals to a working
            solution.
          </p>
        </div>
        <ol className={s.processGrid}>
          {[
            [
              "Discover",
              "Understand your business, your customers and what success looks like.",
            ],
            [
              "Design",
              "Turn the strategy into a clear, purposeful customer experience.",
            ],
            [
              "Build",
              "Bring it to life with clean code and connected systems.",
            ],
            [
              "Launch",
              "Test the details, prepare the essentials and go live with confidence.",
            ],
            [
              "Grow",
              "Measure, refine and keep building on a solid foundation.",
            ],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>
                0{i + 1}
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <div className={s.sectionHead}>
          <div>
            <p className="eyebrow">THE RIGHT TOOLS FOR THE JOB</p>
            <h2>
              Tools & Technologies<span className="blue">.</span>
            </h2>
          </div>
          <p>
            Modern development. Practical business tools.
            <br />
            Chosen for your project, not for the buzzwords.
          </p>
        </div>
        <div className={s.techGrid}>
          {technologies.map((tech) => (
            <div key={tech}>
              <span aria-hidden="true" className={s.techVisual}>
                {technologyLogos[tech] ? (
                  <Image
                    src={technologyLogos[tech]}
                    alt=""
                    width={36}
                    height={36}
                    className={s.techLogo}
                  />
                ) : (
                  <Icon kind="connect" className={s.techIntegrationIcon} />
                )}
              </span>
              <strong>{tech}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className={`${s.about} section`}>
      <div className={`container ${s.aboutGrid}`}>
        <div className={s.portraitPlaceholder}>
          {portraitImage ? (
            <Image
              src={portraitImage}
              alt="Owen Genuino, Full Stack Web Developer"
              fill
              sizes="(max-width: 600px) 100vw, 40vw"
              className={s.portraitImage}
            />
          ) : (
            <>
              <span className={s.portraitLetters} aria-hidden="true">
                og<span>.</span>
              </span>
              <span className={s.portraitCaption}>
                THE PERSON BEHIND THE BUILD
              </span>
              <span className={s.portraitNote}>Portrait coming soon</span>
            </>
          )}
        </div>
        <div>
          <p className="eyebrow">HI, I’M OWEN GENUINO</p>
          <h2>
            Your developer.
            <br />
            Your digital partner<span className="blue">.</span>
          </h2>
          <p className={s.bodyCopy}>
            I’m a Full Stack Web Developer working across Next.js, React and
            WordPress, with a broader view of what a business needs online.
          </p>
          <p className={s.bodyCopy}>
            From the first design decision to SEO, Google Ads, CRM integrations
            and automation, I bring the pieces together with one goal: making
            your digital presence more useful to your business and your
            customers.
          </p>
          <a href="#contact" className={s.textLink}>
            Tell me what you’re building <Icon />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  if (!testimonialData.length) return null;
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">IN THEIR WORDS</p>
        <h2>
          Built on good partnerships<span className="blue">.</span>
        </h2>
        <div className={s.serviceGrid}>
          {testimonialData.map((t) => (
            <figure className={s.serviceCard} key={t.name}>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <br />
                {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.footerInner}`}>
        <a href="#" className={s.brand}>
          Build With{" "}
          <strong>
            Owen<span className={s.brandDot}>.</span>
          </strong>
        </a>
        <p>Thoughtfully designed. Purposefully built.</p>
        <span>© {new Date().getFullYear()} Build With Owen</span>
        <a href="#">Back to top ↑</a>
      </div>
    </footer>
  );
}
