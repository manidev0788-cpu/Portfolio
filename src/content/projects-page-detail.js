/**
 * Live case studies for /projects — screenshot previews use Thum.io (see next.config images).
 * Optional: drop files into public/projects/ and set `imageLocal` instead of generated thumb URL.
 */

/** @param {string} siteUrl Full URL of the deployed site */
export function projectScreenshotUrl(siteUrl) {
  return `https://image.thum.io/get/width/1600/crop/900/noanimate/${encodeURIComponent(siteUrl)}`;
}

export const PROJECTS_PAGE_INTRO = {
  eyebrow: "Selected work",
  titleBefore: "My ",
  titleGradient: "projects",
  lead:
    "Production deployments on Vercel—eCommerce, education operations, and AI-assisted local discovery. Each build is documented with a live link, responsive preview, and long-form context so you can evaluate craft, stack fit, and delivery quality before we collaborate.",
};

/**
 * ~100 words each — adjust tone or details anytime.
 */
export const FEATURED_PROJECTS = [
  {
    slug: "marketo-xi",
    category: "eCommerce",
    title: "Marketo XI",
    url: "https://marketo-xi.vercel.app/",
    tags: ["Storefront", "Next.js", "Vercel"],
    screenshotAlt: "Screenshot of the Marketo XI eCommerce storefront interface",
    body: `This storefront concept, Marketo XI, is built to feel production-ready rather than like a static demo. Product discovery is organized around clear categories and cards that scale from phone to desktop, so visitors browse with minimal friction before checkout. The interface emphasizes pricing hierarchy, primary actions, and whitespace so offers and trust cues stay legible under real content. Deployed on Vercel with a component-first structure, the project is ready to grow: expand the catalog, add payments, or instrument analytics on meaningful events. The live deployment captures the full responsive shopping journey from landing through cart-oriented layout patterns.`,
  },
  {
    slug: "school-management",
    category: "School management",
    title: "Campus operations dashboard",
    url: "https://school-kappa-six.vercel.app/",
    tags: ["Admin UX", "Education", "Data-heavy UI"],
    screenshotAlt: "Screenshot of the school management system web application",
    body: `This school management build reflects the daily operational reality of campuses: navigation that supports administrators and staff, with layouts prioritizing schedules, records, and communication without overwhelming smaller screens. Forms and tables are tuned for repeat use through clear labels, predictable spacing, and feedback that explains what happens after a save or update. Because clarity matters in education software, the surface favors hierarchy and restrained motion so complex modules remain approachable for non-technical users. Delivered on Vercel for fast worldwide access, it demonstrates a credible base for attendance, coursework, and institutional workflows that can evolve as policies change.`,
  },
  {
    slug: "listy-murex",
    category: "AI listings",
    title: "Listy — business discovery",
    url: "https://listy-murex.vercel.app/",
    tags: ["AI UX", "Local search", "Cards & maps"],
    screenshotAlt: "Screenshot of the Listy AI-powered business listing website",
    body: `Listy explores an AI-assisted approach to local business discovery: search and browse flows that help users move from exploration to a short list of viable options quickly. Listings are framed with summaries and category cues so merchants stay visible while visitors compare without guesswork. As a modern React experience, it pairs responsive grids and card layouts with typography that balances density and readability on phones, where most local searches start. Hosted on Vercel, the deployment highlights performance-conscious loading suited to rapid browsing. AI supports smarter presentation and metadata while keeping the experience approachable for users who simply want trustworthy, scannable results.`,
  },
];
