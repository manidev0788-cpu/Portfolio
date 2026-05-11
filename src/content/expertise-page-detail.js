/**
 * Long copy for /expertise — ~200 words per pillar (aligned with homepage expertise cards).
 */

export const EXPERTISE_PAGE_INTRO = {
  eyebrow: "Our Expertise",
  titleBefore: "How I deliver ",
  titleGradient: "end-to-end digital work",
  titleAfter: "",
  lead: "The homepage highlights four pillars of delivery: intelligent automation, full stack implementation, commerce-ready CMS builds, and reliable hosting with performance discipline. This page unpacks each in plain language—scope, quality bar, and how engagements typically unfold—so you can compare offerings against your roadmap without digging through a generic services catalog.",
  supporting:
    "Every pillar connects to the same product-minded engineering practice: measurable outcomes, maintainable code, transparent trade-offs, and launch support that does not vanish the moment DNS propagates. Use the anchors below to jump to the area that matters most for your next initiative.",
};

export const EXPERTISE_PAGE_SECTIONS = [
  {
    slug: "ai-automation",
    title: "AI Automation & Smart Solutions",
    summary:
      "AI workflows, automation systems, smart integrations, and modern AI-powered solutions.",
    image: {
      src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80&auto=format&fit=crop",
      alt: "Abstract AI and network visualization (placeholder)",
    },
    paragraphs: [
      "AI should solve concrete business pain—not decorate slide decks. I focus on automations that reduce repetitive work: routing leads, synchronizing CRM and product catalogs, enriching content pipelines, generating structured drafts under human review, and instrumenting analytics so you can see whether an AI touchpoint actually moves conversion or merely adds latency.",
      "Implementation discipline matters as much as model choice. That means clear data contracts, rate limiting, escalation paths when APIs slow down, privacy-aware logging, and configurable fallbacks when a provider deprecates endpoints overnight. Interfaces communicate uncertainty—loading skeletons, partial results, retry hygiene—so users are never stranded staring at blank modals.",
      "Security and governance stay front and center: secrets isolated outside repos, role-based access for prompt libraries, audit trails where compliance demands them, and documented review checkpoints for regulated industries. Whether you are prototyping a smart assistant on top of your marketing site or wiring workflow automation between Notion, webhooks, and billing systems, the engagement ends with documented runbooks—not a fragile demo that collapses under weekday traffic.",
    ],
  },
  {
    slug: "full-stack-web",
    title: "Full Stack Web Development",
    summary: "Next.js, React, PHP, MongoDB, Supabase, frontend and backend development.",
    image: {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80&auto=format&fit=crop",
      alt: "Laptop with code editor — full stack development (placeholder)",
    },
    paragraphs: [
      "Modern product surfaces demand fast, resilient UIs backed by predictable APIs. On the client I rely on React for composable interfaces, Next.js when routing, metadata, image optimization, and incremental rendering must feel invisible. TypeScript tightens contracts across teams, while Tailwind (or equivalent systems) keeps design tokens honest so marketing refreshes do not cascade into regression hunts.",
      "Server-side work spans Node-friendly stacks, pragmatic PHP where legacy ecosystems already thrive, and MongoDB or Supabase when flexible schemas or relational guarantees must align with rapid experiment cycles. REST and edge-friendly handlers expose minimal surfaces; authentication layers respect least-privilege roles without reinventing OAuth every sprint.",
      "Quality gates stay practical: unit tests where business rules concentrate, integration checks on billing and auth flows, staging mirrors that mirror production configuration, and observability that surfaces latency shifts before users flood support. The result is a stack you can staff, extend, and hand off without folklore-only deployment rituals.",
    ],
  },
  {
    slug: "cms-ecommerce",
    title: "CMS & eCommerce Development",
    summary: "WordPress, Shopify, OpenCart, Wix, Squarespace, and custom CMS solutions.",
    image: {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&auto=format&fit=crop",
      alt: "Checkout and commerce workflow on laptop (placeholder)",
    },
    paragraphs: [
      "Publishing and selling online require editorial speed without sacrificing storefront reliability. WordPress unlocks structured content for teams who iterate headlines weekly; Shopify and OpenCart cover hosted versus self-hosted commerce trade-offs; Wix and Squarespace accelerate launches when complexity must stay low. I evaluate TCO—not buzz—before recommending a platform, because migration debt compounds faster than marketing calendars.",
      "Implementations emphasize clean theme architecture, curated plugin ecosystems, and automation for inventory, taxes, and fulfillment hooks. Headless setups separate presentation from data when performance or omnichannel requirements demand it; monolithic stays viable when operations want a single admin surface.",
      "Customer trust hinges on PDP quality—crisp imagery, honest stock states, localization, structured data, and checkout flows tested on real devices. Integrations with email, loyalty, and ad pixels happen with performance budgets in mind, so third-party scripts never silently tank your Core Web Vitals.",
    ],
  },
  {
    slug: "hosting-performance",
    title: "Hosting & Performance Management",
    summary: "Deployment, VPS/server management, hosting setup, optimization, and maintenance.",
    image: {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80&auto=format&fit=crop",
      alt: "Global network and infrastructure concept (placeholder)",
    },
    paragraphs: [
      "Hosting is continuity engineering. I configure environments with least-privilege SSH, automated backups verified through real restores, TLS everywhere, CDN layering, and caching policies that reflect your traffic profile—not copy-paste defaults from a control panel wizard. Staging mirrors production closely enough that releases are rehearsed, not improvised.",
      "Performance tuning is iterative: profiling hotspots, resizing media pipelines, pruning render-blocking scripts, tightening database indexes, and aligning SLAs with the moments that actually monetize—checkout, signup, booking. Incidents get blameless postmortems with follow-up tickets, not sticky notes lost in Slack history.",
      "Long-term care includes patching cadences, dependency hygiene, cost reviews as traffic shifts regions, and playbooks for failover or vendor outages. The goal is infrastructure that feels boring on launch day and stays dependable when your campaign unexpectedly catches fire.",
    ],
  },
];
