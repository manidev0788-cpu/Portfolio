/**
 * /skills — ~150–200 words per section. PNGs in `/public/images/`:
 * myskill.png, front.png, backend.png, cms.png, corel.png, ai.png
 */

export const SKILLS_PAGE_INTRO = {
  eyebrow: "My Skills",
  titleBefore: "Capability across the ",
  titleGradient: "full delivery stack",
  titleAfter: "",
  lead:
    "Below is the homepage skill map distilled—readable sections before timelines or stack choices harden.",
  supporting:
    "Assets live in `/public/images/` (see filenames per section). Anchors: `#key-skills`, `#frontend`, `#backend`, `#cms`, `#core`, `#ai`.",
};

export const SKILLS_DETAIL_SECTIONS = [
  {
    id: "key-skills",
    title: "My skill map — how the stack fits together",
    image: { src: "/images/myskill.png", alt: "Overview of full-stack skills and delivery approach" },
    paragraphs: [
      "The homepage badges compress a lot on purpose; this overview explains how those bands line up while work moves. Delivery runs from trustworthy interfaces through pragmatic APIs and data, commerce surfaces that keep editors autonomous, hosting and releases that can be rehearsed, and automation—including AI—whenever guardrails, observability, rate limits, and fallback UX earn budget instead of deck-only hype.",
      "Everyday UI polish starts with semantics, responsive discipline, and honest token hygiene. React and Next.js step in when routing, SEO, imagery defaults, and performance budgets ought to feel like plumbing. PHP still bridges ecosystems already living there. MongoDB fits aggregates and catalog-shaped payloads when indexing is planned early. Postgres through Supabase answers when relational truth, auth, and row policies deserve first-class citizenship. Platform picks follow total cost of ownership—fees, staffing, integrations, export paths—not whichever theme demo looked shiniest yesterday.",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    image: { src: "/images/front.png", alt: "Frontend: HTML, CSS, Tailwind, JavaScript, React, Next.js" },
    paragraphs: [
      "Trust shows up during the first paints. Work begins with semantic landmarks, heading order that mirrors real structure, forms keyboard users can traverse, and media that fails without stranding readers. Tailwind-style utilities keep tokens honest between design and components; broader CSS stays organized as layout systems instead of one-off specificity duels.",
      "JavaScript and React carve behavior into predictable shells. Next.js adds routing primitives, image defaults, hybrid rendering posture, and runway when brochures graduate into authenticated product. Third parties, typography bundles, hero assets, and ancillary scripts endure the same ruthless prioritization. Critical paths stay thin. Skeleton flows hedge flaky networks. Motion respects prefers-reduced-motion. Storybook-style previews appear when stakeholders need tactile review. Accessibility rides alongside visual QA so polish survives launch—for HTML5, CSS3, Tailwind CSS, JavaScript, React.js, and Next.js stacks teammates can inherit without archaeology.",
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    image: { src: "/images/backend.png", alt: "Backend APIs, MongoDB, Supabase, PHP, reliability" },
    paragraphs: [
      "Stable backends celebrate boring dashboards. Parameterized queries, guarded uploads, coherent session stories, and clear separation between templates and business rules headline PHP integrations near WordPress or shared hosting. MongoDB earns its seat when aggregates, catalogs, or personalization payloads evolve quickly, provided indexes, TTL policies, and pipelines receive modeling attention early.",
      "Supabase packages Postgres ergonomics alongside auth scaffolding, row policies, realtime hooks, and gentler ops for MVPs marching toward regulated relational cores. Published APIs emphasize pagination, candid caching, courteous backoff on heavy workloads, secrets outside repos, and telemetry scrubbed for PII. Reproducible staging with restores someone has exercised beats theater. Humility about throughput, migrations, and indexing belongs to every backbone, whether PHP, MongoDB, or managed Postgres anchors the system.",
    ],
  },
  {
    id: "cms",
    title: "CMS & eCommerce Platforms",
    image: { src: "/images/cms.png", alt: "WordPress, Shopify, OpenCart, Wix, Squarespace" },
    paragraphs: [
      "Publishing and storefront tooling should accelerate editors without locking them into hostage upgrades. WordPress shines when plugins stay curated, patching stays sober, structured content stays exportable, and roles remain sane. Shopify supplies checkout-ready primitives; third-party apps still need performance vetting before they torch vitals.",
      "OpenCart fits lean self-hosted catalogs when extension hygiene survives theme drift. Wix or Squarespace deserve candid talk about DNS ownership, exports, and autonomy whenever launch velocity matters before bespoke logic on day one. Headless combinations—WordPress or Shopify feeding Next.js—earn budget when editorial agility and frontend discipline must both win. Honest spreadsheets tally fees, staffing, integrations, and durability better than recycled conference slogans.",
    ],
  },
  {
    id: "core",
    title: "Core Development Services",
    image: { src: "/images/corel.png", alt: "Delivery, optimization, hosting, lifecycle" },
    paragraphs: [
      "Projects clarify outcomes early: conversion, education, liquidity, credibility, or blends. That clarity becomes information architecture sketches, component inventories, instrumentation plans, and phased releases that dodge brittle big-bang launches. Owning frontend-to-backend handoffs means mocked contracts, documented SSR or ISR posture, humane errors, webhooks that retry, and dashboards leadership actually opens—silence is never mistaken for stability.",
      "Custom surfaces appear only after configuration exhausts humane wins. Lightweight regressions still tame plugin chaos. Performance passes iterate profiling, media pipelines, edge caches, and KPI-tied budgets. Hosting stretches across HTTPS, segregated staging, backups someone has actually restored, SMTP reputation, rehearsed rollbacks, and sober DNS hygiene. Revenue detects outages sooner than apology decks circulate. Documentation survives churn. Combined, that posture signals maturity whenever organizations crave operators—not ticket tourists.",
    ],
  },
  {
    id: "ai",
    title: "AI & Modern Solutions",
    image: { src: "/images/ai.png", alt: "AI experiences, automation, performance" },
    paragraphs: [
      "Responsible AI trims cognitive clutter rather than stacking novelty. Prompt libraries stay versioned. Review escalates whenever money, compliance, or regulated data appears. Disclosure follows payloads that cross inference walls. Telemetry surfaces stalled automations early. CRM and inventory connectors respect vendor ceilings. Typed APIs, caching, tenancy-aware tests, and metering still shield ledgers. Polished summaries never sanitize broken billing math.",
      "Responsive UX keeps streaming summaries scroll-aware with compact inputs—interruptions never trap keyboard focus. Modernization chains budgets to infrastructure forecasts, embeddings, lifecycles, and experiments behind feature flags. Analytics proves uplift with metrics while anecdotes expire. That posture turns flashy demos into dependable systems partners defend on Monday mornings, and slide decks alone rarely suffice.",
    ],
  },
];
