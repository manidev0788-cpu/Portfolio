import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/seo/site";

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "AI-enabled full stack developer portfolio featuring React, Next.js, WordPress, Shopify, and modern web application projects.",
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [],
  };
}

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR.name,
    jobTitle: SITE_AUTHOR.jobTitle,
    url: SITE_URL,
    email: SITE_AUTHOR.email,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Full Stack Development",
      "React",
      "Next.js",
      "WordPress",
      "Shopify",
      "UI/UX Design",
      "MongoDB",
    ],
  };
}

export function getAllStructuredData() {
  return [getWebsiteSchema(), getOrganizationSchema(), getPersonSchema()];
}
