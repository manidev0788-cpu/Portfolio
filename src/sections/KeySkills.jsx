"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Code2,
  Database,
  LayoutGrid,
  Store,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { SKILL_GROUPS as SKILL_GROUPS_BASE } from "@/content/key-skills-data";

const GRID_COLUMNS = 12;
const easeLux = [0.22, 1, 0.36, 1];

const ICON_BY_ID = {
  frontend: Code2,
  backend: Database,
  cms: Store,
  core: LayoutGrid,
  ai: Bot,
};

const SKILL_GROUPS = SKILL_GROUPS_BASE.map((g) => ({
  ...g,
  icon: ICON_BY_ID[g.id],
}));

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

function SkillPill({ children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[10px] border border-white/[0.065] px-3 py-[0.4375rem]",
        "bg-[linear-gradient(168deg,rgb(255_255_255_/5%)_0%,transparent_70%)] [background-color:rgb(255_255_255_/3%)]",
        "text-[0.796875rem] font-medium tracking-[-0.01em] text-foreground/[0.9] backdrop-blur-sm",
        "shadow-[inset_0_1px_0_rgb(255_255_255_/0.05)] transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "group-hover/card:border-accent-start/18 group-hover/card:bg-accent-start/[0.04]"
      )}
    >
      <CheckCircle2
        className="size-[0.9375rem] shrink-0 text-accent-start/[0.88]"
        aria-hidden
        strokeWidth={2.25}
      />
      <span>{children}</span>
    </span>
  );
}

function SkillClusterCard({ group, index, prefersReducedMotion }) {
  const Icon = group.icon;

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.52,
        delay: prefersReducedMotion ? 0 : 0.05 + index * 0.05,
        ease: easeLux,
      }}
      className={cn(
        "group/card relative overflow-hidden rounded-[22px]",
        "border border-white/[0.07]",
        "bg-[linear-gradient(174deg,rgb(255_255_255_/5.5%)_0%,transparent_52%)] [background-color:rgb(7_29_29_/0.5)]",
        "p-px shadow-[0_18px_48px_-32px_rgb(0_0_0/0.55)] backdrop-blur-[14px]",
        "ring-1 ring-transparent transition-[border-color,box-shadow,ring-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-accent-start/22 hover:ring-accent-start/[0.09]"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-accent-start/[0.28] to-transparent" />
      <div className="pointer-events-none absolute -right-[20%] -top-[45%] z-0 aspect-square w-[70%] rounded-full bg-accent-start/[0.055] blur-3xl" />

      <div className={cn("relative z-[1]", group.id === "ai" ? "p-8 sm:p-9 lg:p-10" : "p-7 sm:p-8")}>
        <Link
          href={`/skills#${group.id}`}
          className={cn(
            "group/skhead flex min-w-0 items-start gap-4 rounded-2xl outline-none ring-offset-2 ring-offset-surface-deep",
            "transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent-start",
            "-m-2 p-2 hover:bg-white/[0.035]"
          )}
        >
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-2xl",
              "bg-[linear-gradient(128deg,#7cf7d4_12%,#c8ffb0_52%,#d9ff63_100%)]",
              "shadow-[inset_0_1px_0_rgb(255_255_255_/0.45),0_8px_20px_-8px_rgb(0_0_0/_/0.3)] ring-2 ring-black/35"
            )}
          >
            <Icon className="size-[1.15rem] text-[#071d1d]" aria-hidden strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[clamp(1.0625rem,0.85vw+0.88rem,1.25rem)] font-bold leading-snug tracking-[-0.02em] text-white">
              {group.title}
            </h3>
            <span className="mt-1.5 block text-[0.75rem] font-semibold tracking-[0.06em] text-accent-start/88 transition-opacity duration-300 group-hover/skhead:text-accent-start">
              Full write-up →
            </span>
          </div>
        </Link>

        <div
          className={cn(
            "mt-6 flex flex-wrap gap-2.5 sm:gap-3",
            group.id === "ai" && "mt-8"
          )}
        >
          {group.items.map((item) => (
            <SkillPill key={item}>{item}</SkillPill>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function KeySkills() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  return (
    <section
      id="key-skills"
      aria-labelledby="key-skills-heading"
      className={cn(
        "relative isolate w-full scroll-mt-[5.5rem] overflow-hidden",
        "border-t border-white/[0.045] bg-surface-deep pb-[4.75rem] pt-14 sm:pb-[5.75rem] sm:pt-[4.5rem] lg:pb-[6.75rem] lg:pt-[5.25rem]"
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
            "radial-gradient(ellipse 58% 50% at 18% 32%, rgb(124 247 212 / 0.05), transparent 58%), radial-gradient(ellipse 48% 40% at 88% 78%, rgb(217 255 99 / 0.034), transparent 52%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-55px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: easeLux }}
          className="mx-auto max-w-[min(40rem,100%)] text-center lg:mx-auto"
        >
          <p className="inline-flex items-center justify-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:text-[0.875rem]">
            <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
              ●
            </span>
            My Key Skills
          </p>
          <h2
            id="key-skills-heading"
            className={cn(
              "mt-5 font-bold tracking-[-0.028em]",
              "text-[clamp(1.875rem,2.55vw+0.875rem,2.6875rem)] antialiased leading-[1.1] text-white sm:mt-[1.375rem]"
            )}
          >
            Expertise distilled into{" "}
            <span className="text-gradient-primary">capabilities you can rely on</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[min(46rem,100%)] text-[1rem] leading-[1.75] text-muted sm:mt-[1.35rem] sm:text-[1.03125rem] sm:leading-[1.79]">
            Stacks, platforms, delivery services, and AI-forward offerings—organized in clear clusters without losing a
            premium feel.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:gap-7">
          {SKILL_GROUPS.slice(0, 4).map((group, i) => (
            <SkillClusterCard
              key={group.id}
              group={group}
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <div className="mt-5 sm:mt-6 lg:mt-7">
          <SkillClusterCard
            group={SKILL_GROUPS[4]}
            index={4}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.48, ease: easeLux }}
          className="mt-12 flex flex-col items-center gap-4 sm:mt-14"
        >
          <Link
            href="/skills"
            className={cn(
              "inline-flex min-h-11 items-center justify-center rounded-full px-8 text-sm font-semibold tracking-[0.02em]",
              "bg-[linear-gradient(112deg,#7cf7d4_12%,#b8ffd7_52%,#d9ff63_100%)] text-[#071d1d]",
              "shadow-[0_10px_32px_-12px_rgb(0_0_0/0.45)] ring-2 ring-black/35 transition-[filter] duration-300 hover:brightness-[1.05]"
            )}
          >
            Open the full skills page
          </Link>
          <p className="max-w-md text-center text-[0.8125rem] leading-relaxed text-muted/85">
            Long-form breakdowns (~400+ words each) for frontend, backend, CMS/eCommerce, core services, and AI—plus
            supporting imagery.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
