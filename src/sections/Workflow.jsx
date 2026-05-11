"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

import { cn } from "@/utils/cn";

const GRID_COLUMNS = 12;
const easeLux = [0.22, 1, 0.36, 1];

const WORKFLOW_IMAGE = "/images/skill.png";

const CONTENT = {
  label: "How I Work",
  headingLine1: "Building Smart Digital Experiences with",
  headingGradient: "AI & Full Stack Development",
  intro:
    "I build modern AI-enabled websites, scalable full-stack applications, CMS platforms, and high-performance digital experiences using React, Next.js, WordPress, Shopify, MongoDB, Supabase, and advanced frontend systems. My workflow focuses on speed, performance, clean architecture, automation, and long-term scalability.",
  steps: [
    {
      id: "discovery",
      title: "1. Discovery and Strategy",
      body: "I analyze business goals, competitors, user experience, and technical requirements to create a scalable development roadmap with modern UI direction and AI-enhanced planning.",
    },
    {
      id: "design-dev",
      title: "2. Design and Full Stack Development",
      body: "I develop premium responsive interfaces using React, Next.js, Tailwind CSS, PHP, MongoDB, Supabase, WordPress, Shopify, and modern backend integrations with smooth animations and optimized performance.",
    },
    {
      id: "deploy",
      title: "3. Deployment and Long-Term Support",
      body: "I handle hosting, deployment, server setup, optimization, domain management, CMS maintenance, SEO improvements, AI workflow integration, and long-term technical support.",
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

function WorkflowAccordion({
  steps,
  openId,
  onToggle,
  prefersReducedMotion,
  baseUid,
}) {
  return (
    <div className="w-full">
      <ul className="divide-y divide-white/[0.08]" role="list">
        {steps.map((step) => {
          const isOpen = openId === step.id;
          const panelId = `${baseUid}-${step.id}-panel`;
          const headingId = `${baseUid}-${step.id}-heading`;

          return (
            <li key={step.id} className="group/acc">
              <h3 id={headingId} className="text-[length:inherit] font-[inherit]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => onToggle(step.id)}
                  className={cn(
                    "flex w-full items-start justify-between gap-5 py-[1.35rem] text-left outline-none transition-[background-color,box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] sm:py-7",
                    "focus-visible:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-accent-start/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(7_29_29_/0.5)] sm:focus-visible:ring-offset-surface-deep",
                    "sm:gap-8",
                    isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.035]"
                  )}
                >
                  <span
                    className={cn(
                      "min-w-0 pt-0.5 text-[1.03125rem] font-semibold leading-snug tracking-[-0.02em]",
                      "text-foreground transition-colors duration-300 sm:text-[1.0625rem] lg:text-[1.09375rem]",
                      "group-hover/acc:text-foreground/[0.98]"
                    )}
                  >
                    {step.title}
                  </span>
                  <motion.span
                    animate={
                      prefersReducedMotion ? { rotate: isOpen ? 45 : 0 } : { rotate: isOpen ? 45 : 0 }
                    }
                    transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: easeLux }}
                    className={cn(
                      "mt-1 flex size-11 shrink-0 items-center justify-center rounded-full",
                      "border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm",
                      "text-accent-start shadow-[0_0_26px_-8px_rgb(124_247_212_/0.35)]",
                      "transition-[border-color,box-shadow,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen
                        ? "border-accent-start/30 bg-accent-start/[0.08] shadow-[0_0_32px_-6px_rgb(124_247_212_/0.28)]"
                        : "group-hover/acc:border-accent-start/22 group-hover/acc:bg-accent-start/[0.06]"
                    )}
                    aria-hidden
                  >
                    <Plus className="size-5 stroke-[2]" />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{
                      height: prefersReducedMotion ? "auto" : "auto",
                      opacity: 1,
                    }}
                    exit={
                      prefersReducedMotion
                        ? undefined
                        : {
                            height: 0,
                            opacity: 0,
                          }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.42,
                      ease: easeLux,
                    }}
                    className="overflow-hidden border-b border-white/[0.08]"
                  >
                    <motion.div
                      initial={prefersReducedMotion ? false : { y: -6 }}
                      animate={{ y: 0 }}
                      exit={{ y: prefersReducedMotion ? 0 : -4 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: easeLux }}
                      className="pb-8 pr-[3.75rem] pt-2 sm:pr-16 sm:pb-[2.125rem]"
                    >
                      <p className="max-w-[min(36rem,100%)] text-[0.89375rem] leading-[1.82] text-muted sm:text-[0.91875rem] sm:leading-[1.84]">
                        {step.body}
                      </p>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Workflow() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  const uid = useId().replace(/:/g, "");

  /** First step open — mirrors Pixion “How it works” default. */
  const [openId, setOpenId] = useState(CONTENT.steps[0].id);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  const toggleStep = (id) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className={cn(
        "relative isolate w-full scroll-mt-[5.5rem] overflow-x-clip",
        "border-t border-white/[0.045] bg-surface-deep pb-20 pt-12 sm:pb-24 sm:pt-14 lg:pb-[5.75rem] lg:pt-[4.75rem]"
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
            "radial-gradient(ellipse 58% 48% at 18% 22%, rgb(124 247 212 / 0.05), transparent 55%), radial-gradient(ellipse 52% 44% at 88% 78%, rgb(217 255 99 / 0.04), transparent 52%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div
          className={cn(
            "grid gap-16 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:items-center xl:gap-24"
          )}
        >
          {/* LEFT — Image card */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.62,
              ease: easeLux,
            }}
            className="order-1 w-full"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, -5, 3.5, -3.5, 0],
                    }
              }
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mx-auto w-full max-w-[560px] overflow-visible rounded-[36px] lg:mx-0"
            >
              <motion.div
                className="relative"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -7, transition: { duration: 0.42, ease: easeLux } }
                }
              >
              <div
                className={cn(
                  "relative overflow-visible rounded-[36px] border border-white/[0.1]",
                  "bg-[linear-gradient(165deg,rgb(255_255_255_/6%)_0%,transparent_55%)] [background-color:rgb(7_29_29_/0.38)]",
                  "backdrop-blur-[14px]",
                  "shadow-[0_0_80px_rgba(120,255,180,0.18),0_0_72px_-20px_rgb(124_247_212/_0.32),0_28px_56px_-36px_rgb(0_0_0/_0.52)]",
                  "ring-1 ring-white/[0.05]",
                  "transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:border-accent-start/22 hover:shadow-[0_0_88px_rgba(120,255,180,0.22),0_0_96px_-18px_rgb(124_247_212/_0.38),0_32px_64px_-34px_rgb(0_0_0/_0.55)]"
                )}
              >
                <div
                  className={cn(
                    "relative flex min-h-[min(52vw,22rem)] w-full items-center justify-center overflow-visible",
                    "rounded-[36px] p-5 sm:min-h-[min(48vw,26rem)] sm:p-6 lg:min-h-[28rem] xl:min-h-[30rem]"
                  )}
                >
                  <Image
                    src={WORKFLOW_IMAGE}
                    alt="Development workflow — full stack & AI-enabled solutions"
                    fill
                    className="h-full w-full object-contain rounded-[36px]"
                    sizes="(max-width:1024px) min(92vw,560px), 560px"
                    priority={false}
                  />
                  {/* Diagonal glass shimmer (Pixion-style) */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[36px]"
                    style={{
                      background:
                        "linear-gradient(122deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 18%, transparent 42%, transparent 62%, rgba(124,247,212,0.07) 100%)",
                      mixBlendMode: "overlay",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[36px] bg-gradient-to-br from-accent-start/[0.06] via-transparent to-accent-end/[0.04]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[36px] shadow-[inset_0_1px_0_rgb(255_255_255_/0.07),inset_0_-1px_0_rgb(0_0_0/_/0.1)]"
                  />
                </div>
              </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Copy + accordion */}
          <div className="order-2 min-w-0 w-full max-w-[620px] lg:justify-self-start xl:pb-2">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-55px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.56,
                delay: prefersReducedMotion ? 0 : 0.04,
                ease: easeLux,
              }}
            >
              <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:text-[0.875rem]">
                <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
                  ●
                </span>
                {CONTENT.label}
              </p>

              <h2
                id="workflow-heading"
                className={cn(
                  "mt-5 antialiased font-semibold leading-[1.15] tracking-[-0.022em]",
                  "text-[24px] md:text-[26px] xl:text-[28px]",
                  "sm:mt-[1.375rem]"
                )}
              >
                <span className="block text-white">{CONTENT.headingLine1}</span>
                <span className="mt-1 block text-gradient-primary sm:mt-1.5">
                  {CONTENT.headingGradient}
                </span>
              </h2>

              <p className="mt-7 max-w-[min(39rem,100%)] text-[1.03125rem] leading-[1.82] text-muted sm:mt-[2rem] sm:text-[1.0625rem] sm:leading-[1.84]">
                {CONTENT.intro}
              </p>

              <div className="mt-10 border-t border-white/[0.1] pt-4 sm:mt-12 sm:pt-6">
                <WorkflowAccordion
                  steps={CONTENT.steps}
                  openId={openId}
                  onToggle={toggleStep}
                  prefersReducedMotion={prefersReducedMotion}
                  baseUid={`wf-acc-${uid}`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
