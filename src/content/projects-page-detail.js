/**
 * Portfolio projects — premium AI-enabled full stack showcase.
 */

export const PROJECTS_PAGE_INTRO = {
  eyebrow: "Featured Projects",
  titleBefore: "Premium digital ",
  titleGradient: "products",
  lead:
    "AI-enabled full stack applications, scalable dashboards, and modern eCommerce experiences designed with performance, usability, and modern frontend systems.",
  statLine: "3 featured builds · AI-enabled systems · full stack development",
};

/** @type {readonly { slug: string; index: string; category: string; title: string; outcome: string; description: string; image: string; imageAlt: string; techStack: readonly string[]; liveUrl: string; liveCta: string; githubUrl?: string }[]} */
export const FEATURED_PROJECTS = [
  {
    slug: "listy",
    index: "01",
    category: "AI DIRECTORY PLATFORM",
    title: "Listy",
    outcome:
      "AI-powered business discovery platform with scalable listing architecture and modern search experiences.",

    description:
      "Listy is a modern AI-assisted business directory platform focused on fast local discovery, responsive browsing, category filtering, and clean mobile-first user experiences. Built with scalable frontend architecture and performance-focused UI systems for modern businesses.",

    image: "/images/listy.png",
    imageAlt: "AI-enabled business directory dashboard — Listy local discovery platform",

    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Vercel",
      "Responsive UI",
    ],

    liveUrl: "https://listy-murex.vercel.app/",
    liveCta: "Open live site",
  },

  {
    slug: "school-management",
    index: "02",
    category: "SCHOOL ERP SYSTEM",
    title: "School Management Dashboard",

    outcome:
      "Smart education management system for students, attendance, schedules, and administrative workflows.",

    description:
      "A complete school ERP dashboard designed to simplify academic operations with responsive layouts, structured data handling, modern admin workflows, and scalable management systems optimized for both desktop and mobile experiences.",

    image: "/images/school.png",
    imageAlt: "Modern school management system UI — ERP admin dashboard",

    techStack: [
      "React",
      "Next.js",
      "MongoDB",
      "Tailwind CSS",
      "Dashboard UI",
    ],

    liveUrl: "https://school-kappa-six.vercel.app/",
    liveCta: "View dashboard",
  },

  {
    slug: "marketo",
    index: "03",
    category: "ECOMMERCE STOREFRONT",
    title: "Marketo",

    outcome:
      "Modern eCommerce storefront built for fast shopping experiences and scalable product systems.",

    description:
      "Marketo is a premium digital storefront focused on responsive product experiences, conversion-focused layouts, scalable catalog systems, and high-performance frontend architecture tailored for modern online businesses.",

    image: "/images/marketo.png",
    imageAlt: "Premium eCommerce storefront design — Marketo online store",

    techStack: [
      "Next.js",
      "Tailwind CSS",
      "CMS",
      "Vercel",
      "eCommerce UI",
    ],

    liveUrl: "https://marketo-xi.vercel.app/",
    liveCta: "Open live store",
  },
];