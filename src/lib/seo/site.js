/**
 * Site-wide SEO configuration — set NEXT_PUBLIC_SITE_URL in production.
 */

const FALLBACK_SITE_URL = "http://localhost:3000";

export const SITE_NAME = "Manish Kumar Portfolio";
export const SITE_SHORT_NAME = "Portfolio";
export const SITE_LOCALE = "en_IN";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : FALLBACK_SITE_URL);

export const SITE_AUTHOR = {
  name: "Manish Kumar",
  jobTitle: "AI-Enabled Full Stack Developer",
  email: "hello@manishkumar.dev",
};

export const DEFAULT_OG_IMAGE = "/images/hero-new.png";

export const SITE_KEYWORDS = [
  "AI-enabled web development",
  "full stack developer",
  "React developer",
  "Next.js developer",
  "WordPress developer",
  "Shopify developer",
  "portfolio website",
  "modern UI UX development",
  "CMS development",
  "eCommerce developer",
  "MongoDB developer",
  "web application development",
];

export const PUBLIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/skills", changeFrequency: "monthly", priority: 0.85 },
  { path: "/expertise", changeFrequency: "monthly", priority: 0.85 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
];
