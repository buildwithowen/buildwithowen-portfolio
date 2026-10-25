import GoogleReviews from "@/components/home/GoogleReviews";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import ContactCTA from "@/components/home/ContactCTA";
import {
  Stats,
  Services,
  FullStackAdvantage,
  Projects,
  Process,
  TechStack,
  About,
  Testimonials,
  Footer,
} from "@/components/home/Sections";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Owen Genuino",
    url: "https://www.buildwithowen.com",
    jobTitle: "Full Stack Web Developer",
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "WordPress",
      "SEO",
      "Google Ads",
      "CRM Integrations",
      "Business Automation",
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <PortfolioShowcase />
        <GoogleReviews />
        <Services />
        <FullStackAdvantage />
        <Projects />
        <Process />
        <TechStack />
        <About />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
