"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Sparkles } from "lucide-react";

import { FEATURED_PROJECTS, PROJECTS_PAGE_INTRO } from "@/content/projects-page-detail";
import { cn } from "@/utils/cn";

const GRID_COLUMNS = 12;
const easeLux = [0.22, 1, 0.36, 1];

const PAGE_CONTAINER = "mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-14";

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

function ProjectImageFrame({ project, index, prefersReducedMotion }) {
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: easeLux }}
      className={cn(
        "group/image relative w-full",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
      )}
    >
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-4 rounded-[40px] opacity-50 blur-3xl sm:-inset-6",
          "bg-[radial-gradient(ellipse_at_50%_50%,rgb(124_247_212/0.22),transparent_68%)]",
          "transition-opacity duration-700 group-hover/image:opacity-100"
        )}
      />

      <div
        className={cn(
          "relative rounded-[32px] p-px",
          "bg-[linear-gradient(145deg,rgb(124_247_212/0.42)_0%,rgb(255_255_255/0.1)_40%,transparent_58%,rgba(217,255,99,0.16)_100%)]",
          "shadow-[0_0_0_1px_rgb(124_247_212/0.16),0_32px_90px_-40px_rgb(0_0_0/0.75)]",
          "transition-shadow duration-500",
          "group-hover/image:shadow-[0_0_0_1px_rgb(124_247_212/0.3),0_40px_110px_-36px_rgb(0_0_0/0.8),0_0_56px_-8px_rgb(124_247_212/0.22)]"
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-[31px]",
            "border border-white/[0.1] bg-[rgb(6_24_24/0.72)] backdrop-blur-xl",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
            "aspect-[16/11] sm:aspect-[16/10] lg:aspect-[5/4] lg:max-h-[560px]"
          )}
        >
          <span
            className={cn(
              "absolute left-5 top-5 z-20 inline-flex rounded-full border border-white/[0.14]",
              "bg-black/55 px-3 py-1.5 font-mono text-[0.6875rem] font-semibold tracking-[0.12em] text-accent-start backdrop-blur-md sm:text-xs"
            )}
          >
            {project.index}
          </span>

          <div className="relative h-full min-h-[inherit] w-full">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 100vw, 700px"
              className={cn(
                "h-full w-full object-cover object-top",
                "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover/image:scale-[1.05]"
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectContent({ project, prefersReducedMotion }) {
  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.08,
        ease: easeLux,
      }}
      className="flex w-full flex-col justify-center"
    >
      <motion.div
        className={cn(
          "rounded-[28px] border border-white/[0.09] bg-white/[0.03] p-7 backdrop-blur-xl sm:p-9 lg:p-10",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_0_40px_-16px_rgb(124_247_212/0.12)]"
        )}
      >
        <p className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-accent-start sm:text-[0.75rem]">
          <Sparkles className="size-3 shrink-0" aria-hidden />
          {project.category}
        </p>

        <h2 className="mt-4 text-[clamp(2.125rem,2.8vw+1rem,3rem)] font-bold leading-[1.05] tracking-[-0.036em] text-white">
          {project.title}
        </h2>

        <p className="mt-5 border-l-2 border-accent-start/40 pl-4 text-[0.96875rem] font-medium leading-[1.56] text-foreground/92 sm:text-[1rem]">
          {project.outcome}
        </p>

        <p className="mt-5 text-[0.96875rem] leading-[1.8] text-muted/90 sm:text-[1rem] sm:leading-[1.82]">
          {project.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={cn(
                "rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5",
                "text-[0.6875rem] font-semibold tracking-[0.03em] text-foreground/78 sm:text-[0.71875rem]"
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={
              prefersReducedMotion ? undefined : { scale: 1.03, transition: { duration: 0.25, ease: easeLux } }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold",
              "bg-[linear-gradient(108deg,#7cf7d4_0%,#b4f5dc_48%,#d9ff63_100%)] text-[#061414]",
              "shadow-[0_12px_36px_-10px_rgb(124_247_212/0.45)] ring-1 ring-white/25",
              "transition-[filter,box-shadow] duration-300 hover:brightness-[1.05]"
            )}
          >
            {project.liveCta}
            <ExternalLink className="size-4" strokeWidth={2.25} aria-hidden />
          </motion.a>

          <Link
            href="/contact"
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold",
              "border border-white/[0.12] text-foreground/90 transition-colors duration-300",
              "hover:border-accent-start/35 hover:text-accent-start"
            )}
          >
            Discuss build
            <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
          </Link>

          {project.githubUrl ? (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.03, transition: { duration: 0.25, ease: easeLux } }
              }
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-muted hover:text-foreground"
              )}
              aria-label={`${project.title} on GitHub`}
            >
              <Github className="size-[1.125rem]" strokeWidth={2.25} />
            </motion.a>
          ) : null}
        </div>
      </motion.div>
    </motion.article>
  );
}

function ProjectRow({ project, index, prefersReducedMotion }) {
  const imageOnRight = index % 2 === 1;

  return (
    <section
      id={project.slug}
      className={cn(
        "scroll-mt-[6.75rem] border-b border-white/[0.045] py-16 sm:py-20 lg:scroll-mt-[5.85rem] lg:py-24",
        index === FEATURED_PROJECTS.length - 1 && "border-b-0"
      )}
    >
      <div
        className={cn(
          PAGE_CONTAINER,
          "grid items-center gap-12 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-20",
          imageOnRight && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
        )}
      >
        <ProjectImageFrame
          project={project}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
        />
        <ProjectContent project={project} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
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
    <main
      id="main-content"
      className="min-h-dvh w-full scroll-mt-28 bg-surface-deep text-foreground antialiased"
      aria-label="Portfolio projects"
    >
      <section
        className={cn(
          "relative isolate w-full overflow-hidden border-b border-white/[0.045]",
          "pt-[calc(6.75rem+env(safe-area-inset-top))] pb-16 sm:pb-20 lg:pt-[calc(7.5rem+env(safe-area-inset-top))] lg:pb-24"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <SectionGrid />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 52% at 14% 22%, rgb(124 247 212 / 0.09), transparent 58%), radial-gradient(ellipse 48% 42% at 94% 68%, rgb(217 255 99 / 0.055), transparent 54%)",
          }}
        />

        <div className={cn("relative z-10", PAGE_CONTAINER)}>
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/#home" className="transition-colors hover:text-accent-start">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-muted/45">
                /
              </li>
              <li className="font-medium text-foreground/88">Projects</li>
            </ol>
          </nav>

          <motion.header
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.58, ease: easeLux }}
            className="mt-10 max-w-[44rem]"
          >
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-accent-start">
              {PROJECTS_PAGE_INTRO.eyebrow}
            </p>
            <h1 className="mt-4 text-[clamp(2.25rem,3.2vw+1rem,3.5rem)] font-bold leading-[1.02] tracking-[-0.038em] text-white">
              {PROJECTS_PAGE_INTRO.titleBefore}
              <span className="text-gradient-primary">{PROJECTS_PAGE_INTRO.titleGradient}</span>
            </h1>
            <p className="mt-6 text-[1.03125rem] leading-[1.75] text-muted sm:text-[1.0625rem]">
              {PROJECTS_PAGE_INTRO.lead}
            </p>
            <p className="mt-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted/55 sm:text-xs">
              {PROJECTS_PAGE_INTRO.statLine}
            </p>

            <motion.div className="mt-10 flex flex-wrap gap-2.5">
              {FEATURED_PROJECTS.map((p) => (
                <a
                  key={p.slug}
                  href={`#${p.slug}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2",
                    "text-[0.75rem] font-semibold text-foreground/75 backdrop-blur-sm",
                    "transition-all duration-300 hover:border-accent-start/30 hover:text-accent-start"
                  )}
                >
                  <span className="font-mono text-[0.625rem] text-accent-start/80">{p.index}</span>
                  {p.title}
                </a>
              ))}
            </motion.div>

            <div className="mt-10">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold",
                  "bg-[linear-gradient(108deg,#7cf7d4_0%,#d9ff63_100%)] text-[#061414]",
                  "shadow-[0_12px_32px_-12px_rgb(124_247_212/0.4)] ring-1 ring-white/20 transition-[filter] hover:brightness-[1.05]"
                )}
              >
                Hire me for your next build
                <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
              </Link>
            </div>
          </motion.header>
        </div>
      </section>

      <div className="relative isolate w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <SectionGrid className="opacity-[0.85]" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 0%, rgb(124 247 212 / 0.06), transparent 62%)",
          }}
        />

        {FEATURED_PROJECTS.map((project, index) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={index}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: easeLux }}
          className={cn(PAGE_CONTAINER, "relative z-10 py-20 sm:py-24 lg:py-28")}
        >
          <div
            className={cn(
              "rounded-[28px] border border-white/[0.09] bg-white/[0.03] px-8 py-10 text-center backdrop-blur-xl sm:px-12 sm:py-12",
              "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_0_48px_-16px_rgb(124_247_212/0.2)]"
            )}
          >
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-accent-start">
              Next step
            </p>
            <p className="mx-auto mt-3 max-w-md text-xl font-semibold tracking-[-0.02em] text-white">
              Need something built at this level?
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
              AI workflows, full stack apps, CMS platforms, and eCommerce—I ship production-ready.
            </p>
            <Link
              href="/contact"
              className={cn(
                "mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold",
                "bg-[linear-gradient(108deg,#7cf7d4_0%,#d9ff63_100%)] text-[#061414]",
                "shadow-[0_12px_32px_-12px_rgb(124_247_212/0.4)] transition-[filter] hover:brightness-[1.05]"
              )}
            >
              Start a conversation
              <ArrowUpRight className="size-4" strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
