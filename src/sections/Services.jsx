"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cloud, Layers, ShoppingBag, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";
import { EXPERTISE_PILLARS } from "@/content/expertise-home-items";

const GRID_COLUMNS = 12;

const easeLux = [0.22, 1, 0.36, 1];

const ICON_MAP = {
  Sparkles,
  Layers,
  ShoppingBag,
  Cloud,
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

function ExpertiseGrid({ prefersReducedMotion }) {
  return (
    <div
      className={cn(
        "mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6",
        "lg:mt-[4.25rem] lg:grid-cols-4 lg:gap-6"
      )}
      role="list"
    >
      {EXPERTISE_PILLARS.map((pillar, idx) => {
        const Icon = ICON_MAP[pillar.iconKey];
        return (
          <div key={pillar.slug} className="flex min-h-0 min-w-0" role="listitem">
            <ExpertiseCard
              item={{
                title: pillar.title,
                description: pillar.summary,
                Icon,
                href: `/expertise#${pillar.slug}`,
              }}
              index={idx}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        );
      })}
    </div>
  );
}

function ExpertiseCard({ item, index, prefersReducedMotion }) {
  const Icon = item.Icon;

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.48,
        delay: prefersReducedMotion ? 0 : 0.08 + index * 0.06,
        ease: easeLux,
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -5,
              transition: { duration: 0.32, ease: easeLux },
            }
      }
      className={cn(
        "group/card relative flex h-full w-full min-h-[21.5rem] flex-col rounded-[18px] sm:min-h-[22rem] lg:min-h-[23rem]",
        "border border-white/[0.07]",
        "bg-[linear-gradient(172deg,rgb(255_255_255_/5.5%)_0%,transparent_55%)] [background-color:rgb(7_29_29_/0.48)]",
        "backdrop-blur-[14px]",
        "shadow-[0_14px_44px_-22px_rgb(0_0_0/0.48)]",
        "ring-1 ring-transparent",
        "transition-[border-color,box-shadow,ring-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-accent-start/20",
        "hover:shadow-[0_22px_56px_-28px_rgb(0_0_0/0.55),0_0_42px_-16px_rgb(124_247_212_/0.1)]",
        "hover:ring-accent-start/12"
      )}
    >
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl",
              "border border-white/[0.08] bg-white/[0.04]",
              "text-accent-start/85 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover/card:border-accent-start/16 group-hover/card:text-accent-start"
            )}
          >
            <Icon className="size-[1.3rem] stroke-[1.35]" aria-hidden />
          </div>
          <Link
            href={item.href}
            className={cn(
              "inline-flex size-11 shrink-0 items-center justify-center rounded-full",
              "bg-[linear-gradient(118deg,#7cf7d4_12%,#b8ffd7_48%,#d9ff63_100%)]",
              "shadow-[0_6px_18px_-4px_rgb(124_247_212_/0.22)]",
              "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:shadow-[0_8px_24px_-4px_rgb(124_247_212_/0.28)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-start"
            )}
            aria-label={`Open details — ${item.title}`}
          >
            <ArrowUpRight className="size-[1.05rem] stroke-[2.25] text-surface-deep" aria-hidden />
          </Link>
        </div>

        <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.022em] text-foreground sm:text-[1.125rem]">
          {item.title}
        </h3>

        <p className="mt-3 text-[0.875rem] leading-[1.75] text-muted sm:text-[0.89375rem] sm:leading-[1.76]">
          {item.description}
        </p>

        <Link
          href={item.href}
          className={cn(
            "group/link relative mt-auto inline-flex items-center gap-1.5 self-start pb-px pt-6",
            "text-[0.8125rem] font-semibold tracking-[-0.01em]",
            "text-muted/95 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0",
            "after:bg-[linear-gradient(90deg,#7cf7d4,#d9ff63)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
            "hover:text-accent-start hover:after:scale-x-100"
          )}
        >
          View Details
          <ArrowRight
            className={cn(
              "size-[0.8rem] shrink-0 stroke-[2]",
              "transition-[transform,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover/link:translate-x-0.5 group-hover/link:text-accent-end"
            )}
            aria-hidden
          />
        </Link>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
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
        className="pointer-events-none absolute inset-0 opacity-95"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgb(124 247 212 / 0.04), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 100%, rgb(217 255 99 / 0.03), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.82fr)] lg:items-start lg:gap-x-14 xl:gap-x-16">
          <div>
            <p className="mb-6 inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:mb-9 sm:text-[0.875rem]">
              <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
                ●
              </span>
              My Expertise
            </p>
            <h2
              id="expertise-heading"
              className={cn(
                "max-w-[min(46rem,100%)] font-bold leading-[1.12] tracking-[-0.03em]",
                "text-[clamp(1.875rem,2.35vw+1rem,3rem)] antialiased text-foreground"
              )}
            >
              <span className="text-white">Building </span>
              <span className="text-gradient-primary">smart digital solutions</span>
              <span className="text-white"> for modern brands</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8 lg:pt-11">
            <p className="max-w-[min(31rem,100%)] text-[1.03125rem] leading-[1.78] text-muted sm:text-[1.0625rem] sm:leading-[1.82]">
              I create premium AI-powered web experiences, scalable full stack applications, CMS
              solutions, and high-performance digital platforms tailored for modern businesses.
            </p>
            <div>
              <Link
                href="/expertise"
                className={cn(
                  "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full",
                  "bg-[linear-gradient(105deg,#7cf7d4_0%,#a8f0d4_45%,#d9ff63_100%)]",
                  "px-8 py-2.5 text-[0.875rem] font-semibold text-[#071d1d]",
                  "shadow-[0_10px_28px_rgba(124,247,212,0.12),0_4px_12px_rgba(0,0,0,0.12)]",
                  "ring-1 ring-white/20 transition-[filter,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:brightness-[1.02] hover:shadow-[0_14px_36px_rgba(124,247,212,0.14)]"
                )}
              >
                View More Expertise
              </Link>
            </div>
          </div>
        </div>

        <ExpertiseGrid prefersReducedMotion={prefersReducedMotion} />
      </div>
    </section>
  );
}
