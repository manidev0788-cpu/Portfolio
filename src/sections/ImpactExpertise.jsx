"use client";

/**
 * My Impact & Expertise — AI-enabled full-stack portfolio (Pixion-style layout).
 * All visible strings live in CONTENT; no demo / trivia / Lorem placeholders.
 */

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";

const GRID_COLUMNS = 12;
const easeLux = [0.22, 1, 0.36, 1];

const CONTENT = {
  sectionLabel: "My Professional Impact",
  headingLead: "Building scalable digital experiences powered by ",
  headingGradient: "AI innovation",
  stats: [
    {
      id: "years",
      value: "12+",
      caption:
        "Years of experience building modern websites, scalable applications, and premium digital solutions.",
    },
    {
      id: "projects",
      value: "150+",
      caption:
        "Projects delivered across full stack development, CMS platforms, AI workflows, and hosting solutions.",
    },
  ],
  expertise: [
    {
      id: "ai",
      title: "AI-Powered Solutions:",
      body: "I build AI-enabled digital experiences, automation workflows, and smart business systems that improve efficiency, scalability, and user engagement. From AI integrations to intelligent web experiences, I focus on creating modern solutions that combine performance with innovation.",
    },
    {
      id: "stack",
      title: "Full Stack & CMS Expertise:",
      body: "I specialize in Next.js, React, PHP, MongoDB, Supabase, WordPress, Shopify, OpenCart, Wix, and Squarespace development while also managing hosting, deployment, optimization, VPS/server handling, and complete digital infrastructure solutions.",
    },
  ],
};

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

function ExpertiseRow({ block, prefersReducedMotion, index }) {
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : 0.06 + index * 0.08,
        ease: easeLux,
      }}
      className="flex gap-4 sm:gap-5"
    >
      <div
        aria-hidden
        className={cn(
          "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[11px]",
          "border border-accent-start/20 bg-accent-start/[0.07]",
          "text-accent-start shadow-[0_0_28px_-6px_rgb(124_247_212/_0.45)]",
          "transition-[border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/card:border-accent-start/28 group-hover/card:bg-accent-start/[0.1] group-hover/card:shadow-[0_0_36px_-6px_rgb(124_247_212/_0.35)]"
        )}
      >
        <Sparkles className="size-[1.125rem]" strokeWidth={1.85} />
      </div>
      <div className="min-w-0 flex-1 space-y-2.5">
        <p className="text-[0.9375rem] font-semibold leading-snug tracking-[-0.018em] text-foreground sm:text-[0.96875rem]">
          {block.title}
        </p>
        <p className="text-[0.9375rem] font-normal leading-[1.78] tracking-[-0.01em] text-muted sm:text-[0.96875rem] sm:leading-[1.8]">
          {block.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function ImpactExpertise() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className={cn(
        "relative isolate w-full scroll-mt-[5.5rem] overflow-hidden",
        "border-t border-white/[0.045] bg-surface-deep pb-16 pt-12 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-[4.5rem]"
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
            "radial-gradient(ellipse 55% 45% at 12% 88%, rgb(124 247 212 / 0.06), transparent 58%), radial-gradient(ellipse 50% 42% at 94% 6%, rgb(217 255 99 / 0.045), transparent 52%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-55px" }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.62,
            ease: easeLux,
          }}
          className="mx-auto max-w-[min(71.25rem,100%)]"
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -2.25, 1.35, -1.85, 0],
                  }
            }
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="group/card"
          >
            {/* Gradient border capsule */}
            <div
              className={cn(
                "relative rounded-[22px] p-px sm:rounded-[24px]",
                "bg-[linear-gradient(138deg,rgb(124_247_212/0.5)_0%,rgb(217_255_99/0.18)_38%,transparent_52%,rgba(124,247,212,0.07)_92%)]",
                "shadow-[0_0_0_1px_rgb(124_247_212/0.07),0_28px_70px_-40px_rgb(0_0_0/_0.55),inset_0_1px_0_rgb(255_255_255_/0.045)]",
                "transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover/card:shadow-[0_0_0_1px_rgb(124_247_212/0.12),0_32px_80px_-42px_rgb(0_0_0/_0.58),0_0_80px_-50px_rgb(124_247_212/_0.12)]"
              )}
            >
              <article
                className={cn(
                  "relative overflow-hidden rounded-[21px] sm:rounded-[23px]",
                  "border border-white/[0.055]",
                  "bg-[linear-gradient(168deg,rgb(255_255_255_/5%)_0%,transparent_52%)] [background-color:rgb(7_29_29_/0.58)]",
                  "backdrop-blur-[18px]",
                  "px-7 py-10 sm:px-9 sm:py-11 lg:px-12 lg:py-13 xl:px-14 xl:py-[3.375rem]",
                  "shadow-[inset_0_1px_0_rgb(255_255_255_/0.035)]",
                  "transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "group-hover/card:border-accent-start/15"
                )}
              >
                <div className="flex flex-col gap-11 lg:grid lg:grid-cols-[minmax(0,1.08fr)_1px_minmax(0,0.92fr)] lg:items-stretch lg:gap-x-[3rem] lg:gap-y-0 xl:gap-x-[3.75rem]">
                  {/* LEFT — metrics */}
                  <div className="min-w-0">
                    <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:text-[0.875rem]">
                      <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
                        ●
                      </span>
                      {CONTENT.sectionLabel}
                    </p>

                    <h2
                      id="impact-heading"
                      className={cn(
                        "mt-5 max-w-[min(42rem,100%)] font-bold leading-[1.1] tracking-[-0.032em]",
                        "text-[clamp(1.75rem,2.05vw+0.94rem,2.75rem)] antialiased text-foreground",
                        "sm:mt-[1.375rem]"
                      )}
                    >
                      <span className="text-white">{CONTENT.headingLead}</span>
                      <span className="text-gradient-primary">{CONTENT.headingGradient}</span>
                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-11 sm:grid-cols-2 sm:gap-8 lg:gap-10">
                      {CONTENT.stats.map((stat, idx) => (
                        <motion.div
                          key={stat.id}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-30px" }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.48,
                            delay: prefersReducedMotion ? 0 : 0.1 + idx * 0.09,
                            ease: easeLux,
                          }}
                        >
                          <p
                            className={cn(
                              "text-[clamp(2.25rem,2.6vw+1.35rem,3.375rem)] font-bold leading-none tracking-[-0.04em]",
                              "text-gradient-primary tabular-nums",
                              "drop-shadow-[0_0_34px_rgb(124_247_212/_0.16)]"
                            )}
                          >
                            {stat.value}
                          </p>
                          <p className="mt-4 max-w-[min(20rem,100%)] text-[0.89375rem] leading-[1.78] text-muted sm:text-[0.90625rem] sm:leading-[1.82]">
                            {stat.caption}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile / tablet */}
                  <div
                    aria-hidden
                    className="h-px w-full shrink-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent lg:hidden"
                  />

                  {/* Desktop center rule */}
                  <div
                    aria-hidden
                    className={cn(
                      "hidden lg:block lg:w-px lg:justify-self-center lg:self-stretch",
                      "bg-gradient-to-b from-transparent via-white/[0.1] to-transparent lg:my-7"
                    )}
                  />

                  {/* RIGHT — expertise */}
                  <div className="flex min-w-0 flex-col gap-9 sm:gap-10 lg:justify-center lg:gap-[2.125rem]">
                    {CONTENT.expertise.map((block, idx) => (
                      <ExpertiseRow
                        key={block.id}
                        block={block}
                        prefersReducedMotion={prefersReducedMotion}
                        index={idx}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
