"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Layers, LayoutTemplate, Smartphone, Sparkles, Star, Zap } from "lucide-react";

import { cn } from "@/utils/cn";

import { AboutSectionGrid, PortraitOrbit } from "@/sections/About";

const easeLux = [0.22, 1, 0.36, 1];

const CONTACT_EMAIL = "your@email.com";
const CONTACT_PHONE = "+91 98765 43210";

const PAGE_TAGS = [
  "WEBSITE DESIGN",
  "MOBILE APP DESIGN",
  "WIREFRAME DESIGN",
  "DASHBOARD DESIGN",
  "PRODUCT DESIGN",
];

const TAG_ICONS = [Star, Sparkles, Zap];

const APPROACH = [
  {
    title: "Our Mission",
    body: "Build fast, accessible digital products that communicate clearly, scale reliably, and ship with confidence—pairing strong UI craft with solid engineering.",
  },
  {
    title: "Our Vision",
    body: "Become the go-to partner for businesses that want AI-enabled experiences, modern stacks, and pragmatic delivery without compromising polish.",
  },
  {
    title: "Our Goal",
    body: "Turn complex requirements into streamlined releases: performance budgets, clean architecture, measurable outcomes, and maintainable codebases.",
  },
];

const STATS = [
  { label: "Projects Complete", value: "150+" },
  { label: "Years of Experience", value: "12+" },
  { label: "Happy Clients", value: "120+" },
  { label: "Client Satisfaction", value: "98%" },
];

const FEATURES = [
  {
    title: "Custom Scalable Layouts",
    body: "Composable UI systems, reusable components, and predictable structure so your product can grow without constant rewrites.",
    icon: LayoutTemplate,
  },
  {
    title: "Responsive & Performance-First",
    body: "Layouts tuned for phones, tablets, and desktops with attention to Core Web Vitals, lazy loading, and lean asset delivery.",
    icon: Smartphone,
  },
  {
    title: "Interactive Modern UX",
    body: "Thoughtful motion (where it helps), feedback states, and frictionless flows that keep users oriented and engaged.",
    icon: Layers,
  },
];

const TOOLS = [
  { label: "Next.js / React", pct: 94 },
  { label: "Tailwind CSS", pct: 93 },
  { label: "TypeScript", pct: 88 },
  { label: "Figma & Design Handoff", pct: 82 },
  { label: "WordPress / PHP", pct: 87 },
  { label: "MongoDB / Supabase", pct: 80 },
];

const EXPERTISE = [
  { label: "Full Stack Development", pct: 93 },
  { label: "AI Automation & Integrations", pct: 88 },
  { label: "CMS & eCommerce", pct: 89 },
  { label: "Hosting & DevOps", pct: 85 },
];

const TEAM = [
  { name: "Manish Kumar", role: "Lead Developer & AI Solutions", initials: "MK" },
  { name: "Creative Network", role: "UI/UX & Brand Support", initials: "CN" },
  { name: "Delivery Partners", role: "QA & Content", initials: "DP" },
  { name: "Strategy Allies", role: "Product & Growth", initials: "SA" },
];

const REVIEWS = [
  {
    quote:
      "Manish delivered a fast Next.js build with clean structure and hosting sorted end to end—communication was crisp and milestones were predictable.",
    author: "Jenny Wilson",
    title: "Startup Founder",
  },
  {
    quote:
      "Strong full stack skills across WordPress, Shopify, and custom dashboards. He improved performance dramatically and kept UX consistent throughout.",
    author: "Albert Flores",
    title: "Product Lead",
  },
];

function SectionShell({ children, className, withGrid = true }) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-t border-white/[0.045] bg-surface-deep",
        className
      )}
    >
      {withGrid ? (
        <div className="pointer-events-none absolute inset-0">
          <AboutSectionGrid />
        </div>
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.97]"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 12% 35%, rgb(124 247 212 / 0.045), transparent 58%), radial-gradient(ellipse 48% 42% at 90% 82%, rgb(217 255 99 / 0.035), transparent 52%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">{children}</div>
    </section>
  );
}

function TagMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-white/[0.06] bg-surface-deep"
      aria-hidden
    >
      <div
        className={cn(
          "marquee-skills__viewport relative w-full overflow-hidden",
          "[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
        )}
      >
        <div
          className={cn(
            "marquee-skills__track flex w-max",
            "bg-[linear-gradient(98deg,#7cf7d4_0%,#9febd4_38%,#c8f5a8_72%,#d9ff63_100%)]",
            "py-3 sm:py-[0.95rem]"
          )}
          style={{ "--marquee-skills-duration": "48s" }}
        >
          {["a", "b"].map((prefix) => (
            <div key={prefix} className="flex shrink-0 items-center gap-6 px-6 sm:gap-10 sm:px-12">
              {PAGE_TAGS.map((tag, i) => {
                const Icon = TAG_ICONS[i % TAG_ICONS.length];
                return (
                  <span key={`${prefix}-${tag}`} className="inline-flex shrink-0 items-center gap-3 sm:gap-4">
                    <Icon
                      className="size-[0.65rem] shrink-0 text-surface-deep/75 sm:size-[0.72rem]"
                      strokeWidth={2.2}
                    />
                    <span className="whitespace-nowrap text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-surface-deep sm:text-[0.75rem]">
                      {tag}
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Meter({ value, prefersReducedMotion }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
      <motion.div
        className="h-full rounded-full bg-[linear-gradient(90deg,#7cf7d4_0%,#c8f5a8_55%,#d9ff63_100%)] shadow-[0_0_12px_rgb(124_247_212/0.35)]"
        initial={prefersReducedMotion ? false : { width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 1.15, ease: easeLux }}
      />
    </div>
  );
}

export default function AboutPage() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  return (
    <main className="min-h-dvh scroll-mt-28 bg-surface-deep text-foreground antialiased">
      <SectionShell className="scroll-mt-[5.5rem] border-t-0 pt-[calc(6.5rem+env(safe-area-inset-top))] sm:pt-[calc(7rem+env(safe-area-inset-top))] lg:pt-[calc(7.25rem+env(safe-area-inset-top))]">
        <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted/85">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/#home" className="transition-colors hover:text-accent-start">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-muted/50">
              /
            </li>
            <li className="font-medium text-foreground/90">About Us</li>
          </ol>
        </nav>

        <header className="mt-6 sm:mt-8">
          <h1 className="text-[clamp(2.25rem,3.2vw+1.1rem,3.125rem)] font-bold leading-[1.06] tracking-[-0.03em]">
            About{" "}
            <span className="text-gradient-primary">us</span>
          </h1>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-[1rem]">
            Background, philosophy, tooling, measurable impact, and testimonials—organized like a dedicated studio about
            page.
          </p>
        </header>
      </SectionShell>

      <TagMarquee />

      <SectionShell className="py-14 sm:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-14 xl:gap-x-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: easeLux }}
            className="flex justify-center lg:justify-start"
          >
            <PortraitOrbit prefersReducedMotion={prefersReducedMotion} />
          </motion.div>

          <div className="min-w-0 space-y-8">
            <div>
              <p className="mb-4 inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:text-[0.875rem]">
                <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
                  ●
                </span>
                About Us
              </p>

              <h2
                className={cn(
                  "max-w-[min(40rem,100%)] font-bold leading-[1.08] tracking-[-0.03em]",
                  "text-[clamp(1.875rem,2.4vw+0.9rem,2.625rem)] text-foreground"
                )}
              >
                <span className="text-white">Who is </span>
                <span className="text-gradient-primary">Manish Kumar</span>
                <span className="text-white">?</span>
              </h2>

              <p className="mt-5 max-w-[min(40rem,100%)] text-[1.03125rem] font-medium leading-snug text-foreground/92 sm:text-[1.0625rem]">
                Helping businesses grow with creative web design and full stack development—powered by pragmatism,
                performance, and modern AI workflows.
              </p>

              <p className="mt-5 max-w-[min(40rem,100%)] text-[0.90625rem] leading-[1.82] text-muted sm:text-[0.925rem]">
                I&apos;m Manish, an AI-powered full stack developer who turns ideas into dependable products: from
                UX-minded frontends to integrations, CMS, eCommerce, hosting, and launches that stay maintainable.
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {[
                ["Email Us At", `mailto:${CONTACT_EMAIL}`, CONTACT_EMAIL],
                ["Phone Number", `tel:${CONTACT_PHONE.replace(/\D/g, "")}`, CONTACT_PHONE],
              ].map(([label, href, value]) => (
                <div
                  key={label}
                  className={cn(
                    "rounded-[16px] border border-white/[0.065]",
                    "bg-[linear-gradient(168deg,rgb(255_255_255_/4.8%)_0%,transparent_46%)] [background-color:rgb(7_29_29_/0.4)]",
                    "px-6 py-[1.125rem] shadow-[0_14px_40px_-26px_rgb(0_0_0/0.45)] backdrop-blur-[12px]"
                  )}
                >
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted/90">{label}</dt>
                  <dd className="mt-2">
                    <a
                      href={href}
                      className="text-[0.9375rem] font-medium text-foreground/95 underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-accent-start"
                    >
                      {value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className={cn(
                "flex flex-wrap items-end justify-between gap-5 rounded-[18px] border border-accent-start/14 p-8",
                "bg-[linear-gradient(135deg,rgb(124_247_212_/10%)_0%,rgb(217_255_99_/7%)_52%,transparent_100%)] [background-color:rgb(7_29_29_/0.55)]",
                "shadow-[0_22px_48px_-32px_rgb(0_0_0/0.55)] backdrop-blur-[14px] sm:p-9"
              )}
            >
              <div className="min-w-0">
                <p className="text-[clamp(3rem,6vw,3.75rem)] font-bold tabular-nums leading-none tracking-[-0.04em] text-gradient-primary drop-shadow-[0_0_28px_rgb(124_247_212_/0.18)]">
                  12+
                </p>
                <p className="mt-3 text-[1.0625rem] font-semibold leading-tight tracking-[-0.02em] text-foreground">
                  Years Experience
                </p>
              </div>
              <Link
                href="/cv.pdf"
                download="portfolio-cv.pdf"
                className={cn(
                  "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-semibold",
                  "bg-[linear-gradient(112deg,#7cf7d4_12%,#b8ffd7_52%,#d9ff63_100%)] text-[#071d1d]",
                  "shadow-[0_6px_22px_-6px_rgb(0_0_0/0.35)] ring-2 ring-black/35 transition-[filter] duration-300 hover:brightness-[1.04]"
                )}
              >
                My Résumé
              </Link>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell className="py-16 sm:py-20 lg:py-[5.25rem]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-accent-start sm:text-[0.875rem]">
            Our Approach
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,2.2vw+0.85rem,2.35rem)] font-bold tracking-[-0.028em] text-white">
            Designing success with approach
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-7">
          {APPROACH.map((item, i) => (
            <motion.article
              key={item.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.52, delay: prefersReducedMotion ? 0 : i * 0.06, ease: easeLux }}
              className={cn(
                "rounded-[20px] border border-white/[0.07] p-7 sm:p-8",
                "bg-[linear-gradient(168deg,rgb(255_255_255_/5%)_0%,transparent_48%)] [background-color:rgb(7_29_29_/0.46)]",
                "shadow-[0_18px_48px_-36px_rgb(0_0_0/0.55)] backdrop-blur-[14px]"
              )}
            >
              <h3 className="text-lg font-bold tracking-[-0.02em] text-white">{item.title}</h3>
              <p className="mt-4 text-[0.90625rem] leading-[1.78] text-muted sm:text-[0.925rem]">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : i * 0.05, ease: easeLux }}
              className="rounded-[18px] border border-white/[0.06] bg-white/[0.03] px-6 py-7 text-center backdrop-blur-sm"
            >
              <p className="text-[clamp(2rem,3.5vw,2.5rem)] font-bold tabular-nums text-gradient-primary">{s.value}</p>
              <p className="mt-2 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-muted/90">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="py-16 sm:py-20 lg:py-[5.25rem]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-accent-start sm:text-[0.875rem]">
            Our Feature
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,2.2vw+0.85rem,2.35rem)] font-bold tracking-[-0.028em] text-white">
            Showcasing excellence—our unique features
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-[0.9625rem]">
            Thoughtful execution across layout systems, responsive delivery, and interaction design—so your product feels
            premium at every breakpoint.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-7">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
            <motion.article
              key={f.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.52, delay: prefersReducedMotion ? 0 : i * 0.07, ease: easeLux }}
              className={cn(
                "rounded-[20px] border border-white/[0.07] p-7 sm:p-8",
                "bg-[linear-gradient(168deg,rgb(255_255_255_/5%)_0%,transparent_48%)] [background-color:rgb(7_29_29_/0.46)]",
                "shadow-[0_18px_48px_-36px_rgb(0_0_0/0.55)] backdrop-blur-[14px]"
              )}
            >
              <div
                className={cn(
                  "mb-5 inline-flex size-11 items-center justify-center rounded-2xl",
                  "bg-[linear-gradient(125deg,#7cf7d4_18%,#c8fdb4_62%,#d9ff63_100%)] text-[#071d1d] ring-2 ring-black/35"
                )}
              >
                <Icon className="size-5" strokeWidth={2.25} />
              </div>
              <h3 className="text-lg font-bold tracking-[-0.02em] text-white">{f.title}</h3>
              <p className="mt-4 text-[0.90625rem] leading-[1.78] text-muted sm:text-[0.925rem]">{f.body}</p>
            </motion.article>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell className="py-16 sm:py-20 lg:py-[5.25rem]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-accent-start sm:text-[0.875rem]">
            My Tools
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,2.2vw+0.85rem,2.35rem)] font-bold tracking-[-0.028em] text-white">
            Design, develop, deliver: my essential gear
          </h2>
        </div>

        <ul className="mt-12 grid max-w-3xl gap-7 sm:mx-auto">
          {TOOLS.map((t) => (
            <li key={t.label}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <span className="text-[0.9375rem] font-semibold text-foreground/95">{t.label}</span>
                <span className="text-[0.8125rem] tabular-nums text-muted">{t.pct}%</span>
              </div>
              <Meter value={t.pct} prefersReducedMotion={prefersReducedMotion} />
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell className="py-16 sm:py-20 lg:py-[5.25rem]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-accent-start sm:text-[0.875rem]">
            Our Expertise
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,2.2vw+0.85rem,2.35rem)] font-bold tracking-[-0.028em] text-white">
            Mastering creativity across diverse projects
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-[0.9625rem]">
            Depth across the full delivery stack—from frontends and APIs to automation, CMS, and production hosting.
          </p>
        </div>

        <ul className="mt-12 grid max-w-3xl gap-7 sm:mx-auto">
          {EXPERTISE.map((e) => (
            <li key={e.label}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <span className="text-[0.9375rem] font-semibold text-foreground/95">{e.label}</span>
                <span className="text-[0.8125rem] tabular-nums text-muted">{e.pct}%</span>
              </div>
              <Meter value={e.pct} prefersReducedMotion={prefersReducedMotion} />
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell className="py-16 sm:py-20 lg:py-[5.25rem]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-accent-start sm:text-[0.875rem]">
            Our Team
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,2.2vw+0.85rem,2.35rem)] font-bold tracking-[-0.028em] text-white">
            Get to know our creative experts
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {TEAM.map((person, i) => (
            <motion.article
              key={person.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.48, delay: prefersReducedMotion ? 0 : i * 0.05, ease: easeLux }}
              className={cn(
                "rounded-[20px] border border-white/[0.07] p-6 text-center sm:p-7",
                "bg-[linear-gradient(168deg,rgb(255_255_255_/4.5%)_0%,transparent_50%)] [background-color:rgb(7_29_29_/0.42)]",
                "shadow-[0_16px_44px_-34px_rgb(0_0_0/0.55)] backdrop-blur-[12px]"
              )}
            >
              <div
                className={cn(
                  "mx-auto flex size-16 items-center justify-center rounded-full",
                  "bg-[linear-gradient(145deg,#7cf7d4_0%,#9ef0a8_55%,#d9ff63_100%)] text-lg font-bold text-[#071d1d] ring-2 ring-black/35"
                )}
              >
                {person.initials}
              </div>
              <h3 className="mt-5 text-base font-bold tracking-[-0.02em] text-white">{person.name}</h3>
              <p className="mt-2 text-[0.8125rem] leading-snug text-muted">{person.role}</p>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="border-b border-white/[0.045] py-16 sm:py-20 lg:py-[5.25rem]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-accent-start sm:text-[0.875rem]">
            Client Reviews
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,2.2vw+0.85rem,2.35rem)] font-bold tracking-[-0.028em] text-white">
            See what people are saying about my work
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {REVIEWS.map((r, i) => (
            <motion.blockquote
              key={r.author}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.52, delay: prefersReducedMotion ? 0 : i * 0.08, ease: easeLux }}
              className={cn(
                "rounded-[22px] border border-white/[0.07] p-7 sm:p-8",
                "bg-[linear-gradient(168deg,rgb(255_255_255_/5%)_0%,transparent_48%)] [background-color:rgb(7_29_29_/0.48)]",
                "shadow-[0_20px_50px_-38px_rgb(0_0_0/0.55)] backdrop-blur-[14px]"
              )}
            >
              <p className="text-[0.9375rem] leading-[1.78] text-muted sm:text-[0.9625rem]">{`"${r.quote}"`}</p>
              <footer className="mt-6 border-t border-white/[0.08] pt-5">
                <cite className="not-italic">
                  <span className="font-semibold text-foreground">{r.author}</span>
                  <span className="block text-[0.8125rem] text-muted/90">{r.title}</span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className={cn(
              "inline-flex min-h-11 items-center justify-center rounded-full px-7 text-sm font-semibold",
              "bg-[linear-gradient(112deg,#7cf7d4_12%,#b8ffd7_52%,#d9ff63_100%)] text-[#071d1d]",
              "shadow-[0_8px_28px_-8px_rgb(0_0_0/0.4)] ring-2 ring-black/35 transition-[filter] duration-300 hover:brightness-[1.05]"
            )}
          >
            Work With Me
          </Link>
          <Link
            href="/#faq"
            className={cn(
              "inline-flex min-h-11 items-center justify-center rounded-full border border-white/[0.12] px-7 text-sm font-semibold text-foreground/95",
              "bg-white/[0.04] backdrop-blur-sm transition-colors duration-300 hover:border-accent-start/35 hover:text-accent-start"
            )}
          >
            Read FAQs
          </Link>
        </div>
      </SectionShell>
    </main>
  );
}
