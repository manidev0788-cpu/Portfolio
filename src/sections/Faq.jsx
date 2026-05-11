"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";

import { cn } from "@/utils/cn";

const GRID_COLUMNS = 12;
const easeLux = [0.22, 1, 0.36, 1];

/** Decorative tech / AI visual for FAQ left column — replace anytime. */
const FAQ_SIDE_VISUAL = "/images/faq-ai-visual.svg";

const CONTENT = {
  sectionLabel: "Frequently Asked Questions",
  headingBefore: "Need a scalable website or ",
  headingGradient: "AI-powered solution",
  headingAfter: "?",
  ctaCard: {
    title: "Let’s Build Something Powerful",
    description:
      "I work with startups, businesses, creators, and brands worldwide to build modern websites, AI-enabled platforms, CMS solutions, eCommerce stores, and scalable digital experiences.",
    buttonLabel: "Start Your Project",
    buttonHref: "/contact",
  },
  faqItems: [
    {
      id: "timeline",
      question: "How long does a website project usually take?",
      answer:
        "Most projects take between 1–4 weeks depending on complexity, features, integrations, CMS setup, AI automation, and revisions.",
    },
    {
      id: "ai",
      question: "Do you build AI-enabled websites and tools?",
      answer:
        "Yes. I create modern AI-powered experiences including smart automations, AI-integrated workflows, dynamic dashboards, chat systems, and scalable digital platforms.",
    },
    {
      id: "tech",
      question: "Which technologies do you work with?",
      answer:
        "I work with React, Next.js, Tailwind CSS, PHP, MongoDB, Supabase, WordPress, Shopify, OpenCart, Wix, and modern hosting environments.",
    },
    {
      id: "redesign",
      question: "Can you redesign or optimize existing websites?",
      answer:
        "Yes. I improve performance, UI/UX, responsiveness, SEO structure, speed optimization, hosting setup, and full frontend/backend improvements.",
    },
    {
      id: "hosting",
      question: "Do you provide hosting and deployment support?",
      answer:
        "Yes. I handle domain setup, VPS/server management, hosting deployment, SSL configuration, backups, and production launch support.",
    },
    {
      id: "ecommerce",
      question: "Can you build eCommerce or CMS websites?",
      answer:
        "Yes. I build scalable CMS and eCommerce solutions using WordPress, Shopify, OpenCart, and custom full-stack technologies.",
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

function FaqAccordion({ items, openId, onToggle, prefersReducedMotion, baseUid }) {
  return (
    <div className="w-full">
      <ul className="divide-y divide-white/[0.08]" role="list">
        {items.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${baseUid}-${item.id}-panel`;
          const headingId = `${baseUid}-${item.id}-heading`;

          return (
            <li key={item.id} className="group/acc">
              <h3 id={headingId} className="text-[length:inherit] font-[inherit]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => onToggle(item.id)}
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
                    {item.question}
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
                      <p className="max-w-[min(38rem,100%)] text-[0.89375rem] leading-[1.82] text-muted sm:text-[0.91875rem] sm:leading-[1.84]">
                        {item.answer}
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

export default function Faq() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  const uid = useId().replace(/:/g, "");
  const [openId, setOpenId] = useState("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
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
            "radial-gradient(ellipse 56% 46% at 18% 20%, rgb(124 247 212 / 0.052), transparent 56%), radial-gradient(ellipse 50% 42% at 94% 88%, rgb(217 255 99 / 0.038), transparent 52%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-55px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.56, ease: easeLux }}
          className="mb-11 max-w-[min(52rem,100%)] sm:mb-14 lg:mb-[4rem]"
        >
          <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:text-[0.875rem]">
            <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
              ●
            </span>
            {CONTENT.sectionLabel}
          </p>
          <h2
            id="faq-heading"
            className={cn(
              "mt-5 font-bold leading-[1.08] tracking-[-0.032em] antialiased text-white",
              "text-[clamp(1.6875rem,2.05vw+0.875rem,2.6875rem)] sm:mt-6"
            )}
          >
            {CONTENT.headingBefore}
            <span className="text-gradient-primary">{CONTENT.headingGradient}</span>
            {CONTENT.headingAfter}
          </h2>
        </motion.div>

        {/* Two columns: CTA card + accordion */}
        <div className="grid gap-11 lg:grid-cols-[minmax(0,0.93fr)_minmax(0,1.07fr)] lg:items-stretch lg:gap-x-14 xl:gap-x-[4rem]">
          <div className="flex min-h-0 flex-col gap-8 lg:h-full lg:min-h-0 lg:gap-10">
          {/* Left info card */}
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.54,
              delay: prefersReducedMotion ? 0 : 0.05,
              ease: easeLux,
            }}
            className={cn(
              "flex min-h-0 flex-col rounded-[22px] p-px sm:rounded-[24px]",
              "bg-[linear-gradient(142deg,rgb(124_247_212/0.36)_0%,rgb(217_255_99/0.12)_42%,transparent_58%,rgba(124,247,212,0.06)_92%)]",
              "shadow-[0_0_0_1px_rgb(124_247_212/0.07),0_22px_60px_-36px_rgb(0_0_0/_0.55),inset_0_1px_0_rgb(255_255_255_/0.045)]",
              "transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:shadow-[0_0_0_1px_rgb(124_247_212/0.12),0_28px_68px_-36px_rgb(0_0_0/_0.58),0_0_64px_-40px_rgb(124_247_212_/0.1)]"
            )}
          >
            <div
              className={cn(
                "flex h-full flex-col rounded-[21px] p-8 sm:rounded-[23px] sm:p-10",
                "border border-white/[0.06]",
                "bg-[linear-gradient(168deg,rgb(255_255_255_/5%)_0%,transparent_52%)] [background-color:rgb(7_29_29_/0.55)]",
                "backdrop-blur-[18px]",
                "shadow-[inset_0_1px_0_rgb(255_255_255_/0.035)]"
              )}
            >
              <p className="text-[clamp(1.28125rem,1.05vw+0.95rem,1.53125rem)] font-semibold leading-tight tracking-[-0.025em] text-foreground">
                {CONTENT.ctaCard.title}
              </p>
              <p className="mt-5 text-[1.015625rem] leading-[1.8] text-muted sm:mt-[1.375rem] sm:text-[1.03125rem] sm:leading-[1.82]">
                {CONTENT.ctaCard.description}
              </p>
              <div className="mt-9 flex flex-col gap-6 sm:mt-10">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" aria-hidden />
                <motion.div whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }} whileTap={{ scale: prefersReducedMotion ? 1 : 0.99 }}>
                  <Link
                    href={CONTENT.ctaCard.buttonHref}
                    className={cn(
                      "relative inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded-full sm:w-auto sm:min-w-[12.5rem]",
                      "bg-[linear-gradient(105deg,#7cf7d4_0%,#a8f0d4_45%,#d9ff63_100%)]",
                      "px-8 py-[0.7rem] text-[0.875rem] font-semibold text-[#071d1d]",
                      "shadow-[0_10px_28px_rgba(124,247,212,0.14),0_4px_12px_rgba(0,0,0,0.12)]",
                      "ring-1 ring-white/25 transition-[filter,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "hover:brightness-[1.03] hover:shadow-[0_14px_40px_rgba(124,247,212,0.22)]"
                    )}
                  >
                    {CONTENT.ctaCard.buttonLabel}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.article>

          {/* Tech / AI illustration — fills vertical space beside tall FAQ */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.12,
              ease: easeLux,
            }}
            className={cn(
              "relative flex min-h-[12.5rem] min-w-0 flex-1 flex-col overflow-visible rounded-[22px] p-px sm:rounded-[24px] lg:min-h-0",
              "bg-[linear-gradient(145deg,rgb(124_247_212/0.28)_0%,transparent_48%,rgb(217_255_99/0.07)_92%)]",
              "shadow-[0_0_60px_-18px_rgb(124_247_212/_/0.28),0_18px_48px_-32px_rgb(0_0_0/_/0.5)]",
              "ring-1 ring-white/[0.05]",
              "transition-[box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:shadow-[0_0_72px_-14px_rgb(124_247_212/_/0.32),0_22px_52px_-30px_rgb(0_0_0/_/0.52)]"
            )}
            aria-hidden
          >
            <div className="relative flex h-full min-h-[12.5rem] min-w-0 flex-1 lg:min-h-[16rem]">
              <Image
                src={FAQ_SIDE_VISUAL}
                alt=""
                fill
                className="rounded-[21px] object-contain p-4 sm:rounded-[23px] sm:p-6"
                sizes="(max-width:1024px) 92vw, 560px"
                priority={false}
              />
            </div>
          </motion.div>
          </div>

          {/* FAQ accordion */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.54,
              delay: prefersReducedMotion ? 0 : 0.1,
              ease: easeLux,
            }}
            className={cn(
              "min-w-0 rounded-[22px] p-px sm:rounded-[24px]",
              "bg-[linear-gradient(145deg,rgb(124_247_212/0.14)_0%,transparent_52%,transparent_100%)]",
              "shadow-[0_0_0_1px_rgb(124_247_212/0.055),0_20px_56px_-40px_rgb(0_0_0/_0.5)]",
              "transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            )}
          >
            <div
              className={cn(
                "rounded-[21px] border border-white/[0.065] px-5 py-5 sm:rounded-[23px] sm:px-7 sm:py-7",
                "bg-[linear-gradient(168deg,rgb(255_255_255_/4%)_0%,transparent_55%)] [background-color:rgb(7_29_29_/0.42)]",
                "backdrop-blur-[18px]",
                "shadow-[inset_0_1px_0_rgb(255_255_255_/0.035)]",
                "hover:border-accent-start/[0.075] hover:shadow-[0_0_48px_-32px_rgb(124_247_212/_/0.12)]"
              )}
            >
              <FaqAccordion
                items={CONTENT.faqItems}
                openId={openId}
                onToggle={toggleItem}
                prefersReducedMotion={prefersReducedMotion}
                baseUid={`faq-acc-${uid}`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
