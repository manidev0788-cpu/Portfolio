"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SKILL_GROUPS } from "@/content/key-skills-data";
import { SKILLS_DETAIL_SECTIONS, SKILLS_PAGE_INTRO } from "@/content/skills-page-detail";
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

export default function SkillsPage() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  return (
    <main
      id="main-content"
      className="min-h-dvh scroll-mt-28 bg-surface-deep antialiased"
      aria-label="Skills and technical capabilities"
    >
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
          className="pointer-events-none absolute inset-0 opacity-[0.97]"
          style={{
            background:
              "radial-gradient(ellipse 55% 48% at 12% 38%, rgb(124 247 212 / 0.05), transparent 58%), radial-gradient(ellipse 48% 42% at 90% 76%, rgb(217 255 99 / 0.034), transparent 52%)",
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
              <li className="font-medium text-foreground/90">My Skills</li>
            </ol>
          </nav>

          <motion.header
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.52, ease: easeLux }}
            className="mt-8 max-w-[min(48rem,100%)]"
          >
            <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:text-[0.875rem]">
              <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
                ●
              </span>
              {SKILLS_PAGE_INTRO.eyebrow}
            </p>
            <h1 className="mt-5 text-[clamp(2rem,2.8vw+1rem,2.875rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              {SKILLS_PAGE_INTRO.titleBefore}
              <span className="text-gradient-primary">{SKILLS_PAGE_INTRO.titleGradient}</span>
              {SKILLS_PAGE_INTRO.titleAfter}
            </h1>
            <p className="mt-5 text-[1rem] leading-[1.82] text-muted sm:text-[1.03125rem] sm:leading-[1.84]">
              {SKILLS_PAGE_INTRO.lead}
            </p>
            <p className="mt-5 text-[0.9625rem] leading-[1.8] text-muted/90 sm:text-[0.98125rem]">
              {SKILLS_PAGE_INTRO.supporting}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#key-skills"
                className={cn(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold",
                  "border border-white/[0.11] bg-white/[0.04] text-foreground/95 backdrop-blur-sm",
                  "transition-colors duration-300 hover:border-accent-start/35 hover:text-accent-start"
                )}
              >
                Skill map on homepage
                <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold",
                  "bg-[linear-gradient(112deg,#7cf7d4_12%,#b8ffd7_52%,#d9ff63_100%)] text-[#071d1d]",
                  "shadow-[0_8px_26px_-10px_rgb(0_0_0/0.42)] ring-2 ring-black/35 transition-[filter] hover:brightness-[1.05]"
                )}
              >
                Start a project
              </Link>
            </div>
          </motion.header>
        </div>
      </section>

      {SKILLS_DETAIL_SECTIONS.map((section, i) => {
        const group = SKILL_GROUPS.find((g) => g.id === section.id);
        const reverse = i % 2 === 1;

        return (
          <section
            key={section.id}
            id={section.id}
            className={cn(
              "relative isolate scroll-mt-[6rem] overflow-hidden border-b border-white/[0.045] bg-surface-deep",
              "py-16 sm:py-[4.5rem] lg:scroll-mt-[5.75rem] lg:py-[5.25rem]"
            )}
          >
            <div className="pointer-events-none absolute inset-0">
              <SectionGrid className="opacity-80" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.56, ease: easeLux }}
                className={cn(
                  "flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16",
                  reverse && "lg:flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "relative w-full shrink-0 overflow-hidden rounded-3xl lg:max-w-[min(100%,28.5rem)] lg:flex-1 xl:max-w-[min(100%,31rem)]",
                    "border border-white/[0.08] bg-black/25",
                    "shadow-[0_24px_64px_-28px_rgb(0_0_0/0.65),inset_0_1px_0_rgb(255_255_255/0.05)]"
                  )}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width:1024px) 100vw, 32rem"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,transparent_45%,rgb(7_29_29/0.25)_100%)]"
                  />
                </div>

                <div className="min-w-0 flex-1 lg:py-1">
                  <h2 className="text-[clamp(1.65rem,2vw+0.9rem,2.05rem)] font-bold leading-snug tracking-[-0.028em] text-white">
                    {section.title}
                  </h2>

                  {group?.items?.length ? (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5",
                            "bg-white/[0.04] text-[0.78rem] font-medium text-foreground/88 backdrop-blur-sm",
                            "shadow-[inset_0_1px_0_rgb(255_255_255_/0.05)]"
                          )}
                        >
                          <CheckCircle2 className="size-3.5 shrink-0 text-accent-start" aria-hidden strokeWidth={2.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-6 space-y-4 text-[0.93125rem] leading-[1.84] text-muted sm:text-[0.95rem] sm:leading-[1.86]">
                    {section.paragraphs.map((p, pi) => (
                      <p key={`${section.id}-p-${String(pi)}`}>{p}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      <section className="border-b border-white/[0.045] bg-surface-deep py-14 sm:py-16">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 text-center sm:px-10 lg:px-14">
          <p className="max-w-xl text-[0.9625rem] leading-relaxed text-muted sm:text-[0.9875rem]">
            Want these capabilities applied to your roadmap? Share goals, timelines, and constraints—I&apos;ll respond with a
            realistic plan, stack fit, and phased delivery outline.
          </p>
          <Link
            href="/contact"
            className={cn(
              "mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold",
              "bg-[linear-gradient(112deg,#7cf7d4_12%,#b8ffd7_52%,#d9ff63_100%)] text-[#071d1d]",
              "shadow-[0_10px_32px_-12px_rgb(0_0_0/0.45)] ring-2 ring-black/35 transition-[filter] hover:brightness-[1.06]"
            )}
          >
            Contact
            <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
