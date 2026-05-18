import { DEFAULT_OG_IMAGE, SITE_KEYWORDS, SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/lib/seo/site";

/**
 * @param {{
 *   title: string;
 *   description: string;
 *   path: string;
 *   keywords?: string[];
 *   ogImage?: string;
 *   noIndex?: boolean;
 * }} options
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}) {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${canonicalPath}`;
  const fullTitle = title.includes(SITE_SHORT_NAME) ? title : `${title} | ${SITE_NAME}`;
  const keywordSet = [...new Set([...keywords, ...SITE_KEYWORDS])];

  return {
    title: fullTitle,
    description,
    keywords: keywordSet,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`],
    },
  };
}

export const homeMetadata = buildPageMetadata({
  title: "AI-Enabled Full Stack Developer",
  description:
    "Portfolio of Manish Kumar — AI-enabled full stack developer specializing in React, Next.js, WordPress, Shopify, modern UI/UX, CMS platforms, and scalable web applications.",
  path: "/",
  keywords: [
    "AI-enabled full stack developer India",
    "hire React Next.js developer",
    "premium portfolio website",
  ],
});

export const aboutMetadata = buildPageMetadata({
  title: "About — Full Stack & AI Developer",
  description:
    "Learn about Manish Kumar — mission, approach, and experience delivering AI-enabled full stack websites, CMS solutions, and modern digital products.",
  path: "/about",
  keywords: ["about full stack developer", "AI web developer profile"],
});

export const skillsMetadata = buildPageMetadata({
  title: "My Skills — React, Next.js, CMS & AI",
  description:
    "Technical skills: frontend with React and Next.js, backend and MongoDB, WordPress and Shopify, core delivery, and AI-enabled automation for modern web products.",
  path: "/skills",
  keywords: ["React skills", "Next.js developer skills", "WordPress Shopify developer"],
});

export const expertiseMetadata = buildPageMetadata({
  title: "Our Expertise — AI, Full Stack & eCommerce",
  description:
    "Expertise in AI-powered solutions, full stack development, CMS and eCommerce platforms, hosting, and performance-focused delivery for startups and businesses.",
  path: "/expertise",
  keywords: ["AI automation web", "full stack expertise", "CMS eCommerce development"],
});

export const projectsMetadata = buildPageMetadata({
  title: "Projects — AI, ERP & eCommerce Portfolio",
  description:
    "Featured projects: Listy AI business directory, School Management ERP dashboard, and Marketo eCommerce storefront — full stack builds with live previews.",
  path: "/projects",
  keywords: ["full stack portfolio projects", "Next.js project showcase"],
  ogImage: "/images/listy.png",
});

export const contactMetadata = buildPageMetadata({
  title: "Contact — Hire Full Stack Developer",
  description:
    "Contact Manish Kumar to discuss AI-enabled websites, full stack applications, WordPress, Shopify, and modern UI/UX projects.",
  path: "/contact",
  keywords: ["hire full stack developer", "contact web developer"],
});
