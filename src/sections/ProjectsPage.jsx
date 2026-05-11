"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Lock } from "lucide-react";

import { FEATURED_PROJECTS, PROJECTS_PAGE_INTRO, projectScreenshotUrl } from "@/content/projects-page-detail";
import { cn } from "@/utils/cn";

const GRID_COLUMNS = 12;
const easeLux = [0.22, 1, 0.36, 1];

function SectionGrid({ className }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(
          90deg,
          transparent 0,
          transparent calc(100% / ${GRID_COLUMNS} - 1px),
          rgba(255, 255, 255, 0.042) calc(100% / ${GRID_COLUMNS} - 1px),
          rgba(255, 255, 255, 0.042) calc(100% / ${GRID_COLUMNS})
        )`,
      }}
    />
  );
}

function hostFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function BrowserChrome({ hostname, children }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[22px] p-px sm:rounded-[26px]",
        "bg-[linear-gradient(148deg,rgb(124_247_212/0.28)_0%,transparent_42%,transparent_88%,rgba(217,255,99,0.08)_100%)]",
        "shadow-[0_0_0_1px_rgb(124_247_212/0.12),0_28px_80px_-48px_rgb(0_0_0/0.72),inset_0_1px_0_rgb(255_255_255/0.06)]",
        "transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:shadow-[0_0_0_1px_rgb(124_247_212/0.22),0_36px_96px_-44px_rgb(0_0_0/0.78)]"
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-[21px] sm:rounded-[25px]",
          "border border-white/[0.07] bg-[rgb(7_29_29/0.55)] backdrop-blur-md"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5",
            "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]"
          )}
        >
          <span className="flex gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-[#ff5f56]/90 ring-1 ring-black/20" />
            <span className="size-3 rounded-full bg-[#febc2e]/90 ring-1 ring-black/20" />
            <span className="size-3 rounded-full bg-[#28c840]/90 ring-1 ring-black/20" />
          </span>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2 shadow-[inset_0_1px_2px_rgb(0_0_0/0.35)]">
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-muted">
              <Lock className="size-3 stroke-[2.5]" aria-hidden />
            </span>
            <span className="truncate font-mono text-[0.75rem] tracking-[0.02em] text-muted/90 sm:text-[0.8125rem]">
              {hostname}
            </span>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full bg-[#050d0d]">{children}</div>
      </div>
    </div>
  );
}

function ProjectScreenshot({ url, alt }) {
  const [broken, setBroken] = useState(false);
  const src = projectScreenshotUrl(url);

  if (broken) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(145deg,rgb(124_247_212/0.08),rgb(7_29_29/0.9))] p-8 text-center">
        <p className="text-sm font-medium text-foreground/90">Preview unavailable</p>
        <p className="mt-2 max-w-sm text-[0.8125rem] text-muted">Open the live site to explore the full UI.</p>
        <ExternalLink className="mt-6 size-10 text-accent-start/60" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 56rem"
      className="object-cover object-top transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-[1.04]"
      unoptimized
      onError={() => setBroken(true)}
    />
  );
}

export default function ProjectsPage() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  return (
    <main className="min-h-dvh scroll-mt-28 bg-surface-deep text-foreground antialiased">
      <section
        className={cn(
          "relative isolate overflow-hidden border-b border-white/[0.045]",
          "scroll-mt-[5.5rem] pt-[calc(6.5rem+env(safe-area-inset-top))] pb-14 sm:pt-[calc(7rem+env(safe-area-inset-top))] sm:pb-16 lg:pt-[calc(7.25rem+env(safe-area-inset-top))] lg:pb-20"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <SectionGrid />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.98]"
          style={{
            background:
              "radial-gradient(ellipse 58% 48% at 18% 28%, rgb(124 247 212 / 0.07), transparent 58%), radial-gradient(ellipse 50% 44% at 92% 72%, rgb(217 255 99 / 0.045), transparent 54%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
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
              <li className="font-medium text-foreground/90">My projects</li>
            </ol>
          </nav>

          <motion.header
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: easeLux }}
            className="mt-8 max-w-[min(46rem,100%)]"
          >
            <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:text-[0.875rem]">
              <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
                ●
              </span>
              {PROJECTS_PAGE_INTRO.eyebrow}
            </p>
            <h1 className="mt-5 text-[clamp(2rem,2.9vw+1rem,3.125rem)] font-bold leading-[1.06] tracking-[-0.032em] text-white">
              {PROJECTS_PAGE_INTRO.titleBefore}
              <span className="text-gradient-primary">{PROJECTS_PAGE_INTRO.titleGradient}</span>
            </h1>
            <p className="mt-5 text-[1rem] leading-[1.82] text-muted sm:text-[1.03125rem] sm:leading-[1.84]">
              {PROJECTS_PAGE_INTRO.lead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold",
                  "bg-[linear-gradient(112deg,#7cf7d4_12%,#b8ffd7_52%,#d9ff63_100%)] text-[#071d1d]",
                  "shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] ring-2 ring-black/35 transition-[filter] hover:brightness-[1.05]"
                )}
              >
                Start a project
                <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
              </Link>
              <Link
                href="/#home"
                className={cn(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold",
                  "border border-white/[0.11] bg-white/[0.04] text-foreground/95 backdrop-blur-sm",
                  "transition-colors duration-300 hover:border-accent-start/35 hover:text-accent-start"
                )}
              >
                Back to home
              </Link>
            </div>
          </motion.header>
        </div>
      </section>

      {FEATURED_PROJECTS.map((project, i) => {
        const reverse = i % 2 === 1;
        const hostname = hostFromUrl(project.url);

        return (
          <section
            key={project.slug}
            id={project.slug}
            className={cn(
              "relative isolate scroll-mt-[6rem] overflow-hidden border-b border-white/[0.045] bg-surface-deep",
              "py-16 sm:py-[4.5rem] lg:scroll-mt-[5.75rem] lg:py-[5.25rem]"
            )}
          >
            <div className="pointer-events-none absolute inset-0">
              <SectionGrid className="opacity-[0.85]" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.9]"
              style={{
                background: reverse
                  ? "radial-gradient(ellipse 46% 42% at 88% 22%, rgb(124 247 212 / 0.045), transparent 55%)"
                  : "radial-gradient(ellipse 46% 42% at 12% 28%, rgb(217 255 99 / 0.035), transparent 55%)",
              }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
              <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-14 xl:gap-x-20">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.58, ease: easeLux }}
                  className={cn(reverse ? "lg:order-2" : "lg:order-1")}
                >
                  <BrowserChrome hostname={hostname}>
                    <ProjectScreenshot url={project.url} alt={project.screenshotAlt} />
                  </BrowserChrome>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold sm:w-auto sm:px-8",
                      "border border-white/[0.12] bg-white/[0.05] text-foreground/95 backdrop-blur-sm",
                      "transition-colors duration-300 hover:border-accent-start/40 hover:text-accent-start"
                    )}
                  >
                    Open live site
                    <ExternalLink className="size-4" strokeWidth={2.25} aria-hidden />
                  </a>
                </motion.div>

                <motion.article
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.58,
                    delay: prefersReducedMotion ? 0 : 0.06,
                    ease: easeLux,
                  }}
                  className={cn("min-w-0", reverse ? "lg:order-1" : "lg:order-2")}
                >
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-accent-start/90">
                    {project.category}
                  </p>
                  <h2 className="mt-3 text-[clamp(1.75rem,2vw+0.85rem,2.35rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
                    {project.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-1",
                          "text-[0.75rem] font-medium tracking-[0.02em] text-muted"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-7 text-[0.98125rem] leading-[1.88] text-muted/92 sm:text-[1rem] sm:leading-[1.9]">
                    {project.body}
                  </p>
                </motion.article>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
