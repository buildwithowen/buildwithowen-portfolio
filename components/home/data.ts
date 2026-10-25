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
    name: "Choose A Mover",
    category: "MARKETPLACE PLATFORM",
    services: [],
    description:
      "A custom moving marketplace connecting customers with removalists through leads, dashboards and quote credits.",
    image: "/images/project-choose-a-mover.jpg",
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

// Original local SVG artwork; the visible technology name provides its accessible label.
export const technologyLogos: Record<string, string> = {
  "Next.js": "/images/tools/nextjs.svg",
  React: "/images/tools/react.svg",
  TypeScript: "/images/tools/typescript.svg",
  WordPress: "/images/tools/wordpress.svg",
  HTML: "/images/tools/html5.svg",
  CSS: "/images/tools/css.svg",
  Tailwind: "/images/tools/tailwind.svg",
  "Node.js": "/images/tools/nodejs.svg",
  Vercel: "/images/tools/vercel.svg",
  "Google Analytics": "/images/tools/google-analytics.svg",
  "Google Tag Manager": "/images/tools/google-tag-manager.svg",
  "Google Ads": "/images/tools/google-ads.svg",
  "Meta Ads": "/images/tools/meta.svg",
};


// Genuine customer text supplied by the site owner; owner replies are excluded.
// The source has 18 entries, including one duplicate Ashraf Hajaj review.
// Ellipses preserve source truncation; missing text is never reconstructed.
// Pedro and Ezy include longer genuine passages supplied earlier by the owner.
export const googleReviews: { name: string; excerpts: string[]; fullText: string }[] = [
  {
    "name": "Pedro Mendonça",
    "excerpts": [
      "We would like to express our sincere gratitude to Ems, Owen, and the entire team for the outstanding support they have provided throughout the establishment of our moving company."
    ],
    "fullText": "We would like to express our sincere gratitude to Ems, Owen, and the entire team for the outstanding support they have provided throughout the establishment of our moving company.\n\nFrom day one, they have assisted us across a wide range of essential areas, including website development, social media strategy, logistics planning, CRM system implementation, and many other aspects of building our business."
  },
  {
    "name": "Bruno Schimski",
    "excerpts": [
      "Emily and Owen completely changed the level of our company. Emily has always been extremely attentive and constantly looked for new solutions for our business. One of the best things she introduced to us was our new CRM system, which was…"
    ],
    "fullText": "Emily and Owen completely changed the level of our company. Emily has always been extremely attentive and constantly looked for new solutions for our business. One of the best things she introduced to us was our new CRM system, which was…"
  },
  {
    "name": "Dane Edhouse",
    "excerpts": [
      "I own an up and coming removalist business in Melbourne, Australia."
    ],
    "fullText": "I own an up and coming removalist business in Melbourne, Australia.\n\nI came across Em and The Logistics Specialist from social media as I was looking…"
  },
  {
    "name": "A Esmadi",
    "excerpts": [
      "I used Owen's service to fix a landing page and few marketing issues, he was very friendly, helpful. I actually drove him crazy with the constant changes requests and demands and he has done a great job. Highly recommended"
    ],
    "fullText": "I used Owen's service to fix a landing page and few marketing issues, he was very friendly, helpful. I actually drove him crazy with the constant changes requests and demands and he has done a great job. Highly recommended"
  },
  {
    "name": "Jeff Borstell",
    "excerpts": [
      "Exceptional Service Overseas – A Review of Emily's Team"
    ],
    "fullText": "Exceptional Service Overseas – A Review of Emily's Team\n\nNavigating administration from afar is no easy task, but Emily and her team have…"
  },
  {
    "name": "Caio Campos",
    "excerpts": [
      "Absolutely fabulous service. I was close to giving up on offshore staff until I met Emily and her agency. From day one they were hands-on, proactive, and clearly experts in the field. Communication is sharp, expectations are set and met,…"
    ],
    "fullText": "Absolutely fabulous service. I was close to giving up on offshore staff until I met Emily and her agency. From day one they were hands-on, proactive, and clearly experts in the field. Communication is sharp, expectations are set and met,…"
  },
  {
    "name": "Ezy Services",
    "excerpts": [
      "A big thank you to Emily and her team since I made the switch to trust them with our admin and operations for Ezy Move. We have seen a growth in securing leads and overall management has been top class. I can’t thank Emily enough and I look forward to the years to come as we have built a great team together. Special thanks to Kay, Maui, Owen, Karelle, and Edna for their efforts on the daily! Can’t recommend the Logistics Specialists enough."
    ],
    "fullText": "A big thank you to Emily and her team since I made the switch to trust them with our admin and operations for Ezy Move. We have seen a growth in securing leads and overall management has been top class. I can’t thank Emily enough and I look forward to the years to come as we have built a great team together. Special thanks to Kay, Maui, Owen, Karelle, and Edna for their efforts on the daily! Can’t recommend the Logistics Specialists enough."
  },
  {
    "name": "Ashraf Hajaj",
    "excerpts": [
      "Highly Recommend Owen, Ems, and Marc!"
    ],
    "fullText": "Highly Recommend Owen, Ems, and Marc!\n\nThey created our new website, and the results have been amazing. It looks…"
  },
  {
    "name": "Sydney Moving and Storage",
    "excerpts": [
      "As a removalist company owner, I can say without a doubt that Emily and her team are doing an amazing job. They’re efficient, trustworthy, and know exactly how to handle whatever comes their way. Their professionalism and attention to…"
    ],
    "fullText": "As a removalist company owner, I can say without a doubt that Emily and her team are doing an amazing job. They’re efficient, trustworthy, and know exactly how to handle whatever comes their way. Their professionalism and attention to…"
  },
  {
    "name": "Stylin' Moves Transport Pty Ltd",
    "excerpts": [
      "I have had the pleasure of working with Emily and I am thoroughly impressed by their exceptional efficiency and expertise. Emily displays an unparalleled understanding of the removal industry and consistency delivers outstanding result.…"
    ],
    "fullText": "I have had the pleasure of working with Emily and I am thoroughly impressed by their exceptional efficiency and expertise. Emily displays an unparalleled understanding of the removal industry and consistency delivers outstanding result.…"
  },
  {
    "name": "Randi Zaya",
    "excerpts": [
      "Great Job by Owen, Ems, and Marc!…"
    ],
    "fullText": "Great Job by Owen, Ems, and Marc!…"
  },
  {
    "name": "Fast Movers - Removalist",
    "excerpts": [
      "Emily was very responsive and easy to work with.\nShe was able to quickly understand my needs and provide a solution that met my requirements.…"
    ],
    "fullText": "Emily was very responsive and easy to work with.\nShe was able to quickly understand my needs and provide a solution that met my requirements.…"
  },
  {
    "name": "Infinity Movers",
    "excerpts": [
      "I am extremely pleased with the service provided by Emily. She is incredibly nice, always answers on time, and is highly professional in handling moving quotes. Her knowledge and transparency about the job made the entire process smooth and…"
    ],
    "fullText": "I am extremely pleased with the service provided by Emily. She is incredibly nice, always answers on time, and is highly professional in handling moving quotes. Her knowledge and transparency about the job made the entire process smooth and…"
  },
  {
    "name": "Istvan Fekete",
    "excerpts": [
      "Emily and her team doing a fantastic job.\nI am very happy as a removalist company owner.\nThey are efficient, trustworthy and knowledgeable about handling everyday…"
    ],
    "fullText": "Emily and her team doing a fantastic job.\nI am very happy as a removalist company owner.\nThey are efficient, trustworthy and knowledgeable about handling everyday…"
  },
  {
    "name": "朝倉誠",
    "excerpts": [
      "Emily and her team demonstrated exceptional professionalism throughout the entire process. Their positivity and collaborative approach made them a true pleasure to work with. I highly recommend their services"
    ],
    "fullText": "Emily and her team demonstrated exceptional professionalism throughout the entire process. Their positivity and collaborative approach made them a true pleasure to work with. I highly recommend their services"
  },
  {
    "name": "O'clock Removals",
    "excerpts": [
      "I’ve been using Ems team for a long time and have always been extremely happy with the results, they’re extremely professional and helpful on every aspect from our logistics to managing bookings, contact with clients and also assisting our teams."
    ],
    "fullText": "I’ve been using Ems team for a long time and have always been extremely happy with the results, they’re extremely professional and helpful on every aspect from our logistics to managing bookings, contact with clients and also assisting our teams."
  },
  {
    "name": "Eagle Removalists Service",
    "excerpts": [
      "Great experience with you guys. If there is more than 5 star I would give."
    ],
    "fullText": "Great experience with you guys. If there is more than 5 star I would give."
  }
];
