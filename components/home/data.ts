// Set to a local path such as /images/owen-genuino.webp when the portrait is ready.
export const portraitImage: string | null = null;

export const navigation = [
  "Services",
  "Work",
  "Process",
  "Stack",
  "About",
  "Contact",
];

// Only supplied screenshots are listed. Add scope, services and URLs once confirmed.
export const projects: {
  name: string;
  category: string;
  services: string[];
  description: string;
  image: string;
  url: string | null;
}[] = [
  {
    name: "RZE Travel & Tours",
    category: "Travel & Tourism",
    services: [],
    description:
      "A travel website designed to present destinations, services and booking information in a simple customer journey.",
    image: "/images/project-rze-travel-tours.jpg",
    url: null,
  },
  {
    name: "Next Move Removals",
    category: "Moving & Relocation",
    services: [],
    description:
      "A modern removalist website focused on local visibility, fast enquiries and a smoother booking journey.",
    image: "/images/project-next-move-removals.jpg",
    url: null,
  },
  {
    name: "TOC Outsourcing",
    category: "Outsourcing Services",
    services: [],
    description:
      "A professional outsourcing website presenting business services, capabilities and clear enquiry pathways.",
    image: "/images/project-toc-outsourcing.jpg",
    url: null,
  },
  {
    name: "Omkar Auto Care",
    category: "Automotive / Auto Care",
    services: [],
    description:
      "A modern automotive service website designed to present services clearly and generate local enquiries.",
    image: "/images/project-omkar-auto-care.jpg",
    url: null,
  },
  {
    name: "Randi Removals",
    category: "Moving & Relocation",
    services: [],
    description:
      "A clean moving website designed to present services clearly and guide customers toward requesting a quote.",
    image: "/images/project-randi-removals.jpg",
    url: null,
  },
  {
    name: "Quick Easy",
    category: "Moving & Relocation",
    services: [],
    description:
      "A streamlined service website focused on making key information and customer actions easy to find.",
    image: "/images/project-quick-easy.jpg",
    url: null,
  },
  {
    name: "Asahi Removals",
    category: "Moving & Relocation",
    services: [],
    description:
      "A bilingual moving website designed to make enquiries and instant quotes easy for customers.",
    image: "/images/project-asahi-removals 3.14.16 PM.jpg",
    url: null,
  },
  {
    name: "Merry Moving",
    category: "Moving & Relocation",
    services: [],
    description:
      "A service-focused moving website built around clear information, trust and an easier path to enquiry.",
    image: "/images/project-merry-moving.jpg",
    url: null,
  },
  {
    name: "Ross Furniture",
    category: "Furniture & Interiors",
    services: [],
    description:
      "A product-focused website presenting furniture in a clean, modern and easy-to-browse experience.",
    image: "/images/project-ross-furniture.jpg",
    url: null,
  },
];

// Only approved, genuine quotes belong here. An empty array renders no reviews.
export const testimonialData: { quote: string; name: string; role: string }[] =
  [];

export const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "WordPress",
  "HTML",
  "CSS",
  "Tailwind",
  "Node.js",
  "Vercel",
  "Google Analytics",
  "Google Tag Manager",
  "Google Ads",
  "Meta Ads",
  "CRM Integrations",
];
