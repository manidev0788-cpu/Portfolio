"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Plus } from "lucide-react";

import { cn } from "@/utils/cn";

/** Put your portrait at `public/images/hero.png` (or change extension below). */
const HERO_IMG = "/images/hero.png";

/** Match Pixion: 12 even vertical tracks (pixel-consistent rhythm). */
const GRID_COLUMNS = 12;

const easeLux = [0.22, 1, 0.36, 1];

function StaticVerticalGrid({ className }) {
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

function MovingBeamsLayer({ prefersReducedMotion }) {
  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: GRID_COLUMNS }).map((_, i) => (
          <div key={String(i)} className="min-w-0" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 grid"
      aria-hidden
      style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: GRID_COLUMNS }).map((_, i) => {
        const period = 19 + ((i * 13) % 7) * 0.85;
        return (
          <div key={String(i)} className="relative min-w-0 overflow-hidden">
            <motion.div
              initial={{ y: "-110%" }}
              animate={{ y: "280%" }}
              transition={{
                duration: period,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.35 + (i % 4) * 0.08,
              }}
              className="pointer-events-none absolute left-1/2 top-0 h-[22%] w-px -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(124, 247, 212, 0.14) 42%, rgba(124, 247, 212, 0.22) 52%, rgba(124, 247, 212, 0.1) 78%, transparent 100%)",
                boxShadow:
                  "0 0 4px rgba(124, 247, 212, 0.12), 0 0 10px rgba(124, 247, 212, 0.06)",
                filter: "blur(0.5px)",
                opacity: 0.75,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/** Pixion-style light frosted cards (white glass on dark hero). */
function FloatingGlassCard({
  className,
  children,
  delay = 0,
  prefersReducedMotion,
  floatDuration = 20,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 22,
        scale: prefersReducedMotion ? 1 : 0.98,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: prefersReducedMotion ? 0.42 : 0.64,
        delay: prefersReducedMotion ? 0 : 0.16 + delay * 0.4,
        ease: easeLux,
      }}
      className={cn(
        "rounded-[13px]",
        "border border-white/[0.34]",
        "bg-white/[0.68]",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.52),0_10px_36px_-10px_rgb(0_0_0/0.12),0_2px_8px_-2px_rgb(0_0_0/0.05)]",
        "backdrop-blur-[10px]",
        className
      )}
    >
      <motion.div
        className="relative h-full w-full rounded-[inherit]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -1.2, 0.9, -0.65, 0],
                x: [0, 0.35, -0.25, 0.2, 0],
              }
        }
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6 + delay * 1.55,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const leftVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: easeLux },
  },
};

export default function Hero() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  /** Stable for SSR + hydration: false until mount, then real preference (avoids server/client mismatch). */
  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  return (
    <section
      id="home"
      className={cn(
        "relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-surface-deep",
        "lg:min-h-[min(100svh,1120px)]"
      )}
    >
      {/* Full-bleed grid + beams (aligned to same 12 columns as Pixion rhythm) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <StaticVerticalGrid />
        <MovingBeamsLayer prefersReducedMotion={prefersReducedMotion} />
      </div>

      {/* Ambient: soft wash + top-right hint + portrait halo — restrained */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 48% at 78% 62%, rgba(124, 247, 212, 0.055), transparent 65%), radial-gradient(ellipse 40% 32% at 92% 8%, rgba(217, 255, 99, 0.035), transparent 58%)",
          }}
        />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-6 sm:px-10 lg:px-14",
          /* Pixion rhythm: clearance below fixed nav + optical vertical balance */
          "pb-[min(7vh,3.25rem)] pt-[calc(6.75rem+env(safe-area-inset-top))] sm:pb-[min(8vh,3.75rem)] sm:pt-[calc(7.25rem+env(safe-area-inset-top))]",
          "lg:pb-[min(9vh,5rem)] lg:pt-[calc(7.5rem+env(safe-area-inset-top))]"
        )}
      >
        <div
          className={cn(
            "grid gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-center lg:gap-y-14",
            "lg:gap-x-12 xl:gap-x-16"
          )}
        >
          {/* Left — wider text rail (Pixion proportions) */}
          <motion.div
            className="flex w-full max-w-[min(46rem,100%)] flex-col sm:max-w-[min(48rem,100%)] lg:max-w-none lg:self-center lg:pr-0 xl:pr-4"
            variants={leftVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start/90 sm:mb-[2.75rem] sm:text-[0.875rem]"
            >
              <span className="text-[0.65rem] leading-none opacity-90" aria-hidden>
                ●
              </span>
              Your Vision, My Design Expertise
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className={cn(
                "mb-10 max-w-[min(35rem,100%)] font-bold leading-[1.15] tracking-[-0.026em] antialiased sm:mb-11 sm:max-w-[min(37rem,100%)] sm:leading-[1.13] lg:mb-12 lg:max-w-[min(39rem,100%)] xl:max-w-[min(41rem,100%)]",
                "text-[clamp(2.25rem,3.1vw+1.2rem,3.5rem)] text-foreground"
              )}
            >
              <span className="text-gradient-primary block">I&apos;m Manish,</span>
              <span className="mt-2 block text-foreground sm:mt-3">AI-powered Full Stack</span>
              <span className="mt-2 block text-foreground/[0.96] sm:mt-2.5">Developer based in India</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-11 max-w-[min(36rem,100%)] text-[1.03125rem] leading-[1.78] text-muted sm:mb-12 sm:max-w-[min(38rem,100%)] sm:text-[1.0625rem] sm:leading-[1.82] lg:max-w-[min(40rem,100%)]"
            >
              I craft fast, accessible interfaces with crisp motion and strong visual direction.
              From design systems to delightful micro-interactions, I build experiences that feel
              modern, polished, and intentional.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-[1.125rem] lg:gap-5"
            >
              <motion.div
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.02, transition: { duration: 0.25, ease: easeLux } }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    "relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full",
                    "bg-[linear-gradient(105deg,#7cf7d4_0%,#a8f0d4_45%,#d9ff63_100%)]",
                    "px-8 py-2.5 text-[0.875rem] font-semibold text-[#0a1818]",
                    "shadow-[0_10px_28px_rgba(124,247,212,0.12),0_4px_12px_rgba(0,0,0,0.12)]",
                    "ring-1 ring-white/20 transition-[filter,box-shadow] duration-300 hover:brightness-[1.02] hover:shadow-[0_14px_36px_rgba(124,247,212,0.14)]"
                  )}
                >
                  <span className="relative">Get Started</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.02, transition: { duration: 0.25, ease: easeLux } }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
              >
                <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-[rgb(7_29_29_/0.35)] px-4 py-2",
                    "text-[0.875rem] font-medium text-foreground backdrop-blur-sm",
                    "shadow-[0_6px_24px_rgb(0_0_0_/0.2)] transition-[border-color,background-color] duration-300",
                    "hover:border-white/[0.2] hover:bg-[rgb(7_29_29_/0.5)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border border-white/20 transition-colors duration-300",
                      "bg-white/[0.06] group-hover:border-white/30"
                    )}
                  >
                    <Play
                      className="ml-0.5 size-4 fill-foreground text-foreground"
                      aria-hidden
                    />
                  </span>
                  Watch Intro
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — large bottom-anchored portrait */}
          <div
            className={cn(
              "relative mx-auto w-full max-w-[min(28rem,calc(100vw-3rem))] sm:max-w-[min(30rem,calc(100vw-4rem))]",
              "lg:mx-0 lg:flex lg:max-w-none lg:flex-col lg:justify-end lg:self-end"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.72,
                delay: prefersReducedMotion ? 0 : 0.05,
                ease: easeLux,
              }}
              className="relative flex w-full justify-center lg:justify-end xl:-mr-2 2xl:-mr-6"
            >
              {/* Soft lime/mint depth — large lower-right blob (Pixion-like, minimal) */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute z-0 rounded-[50%]",
                  "bottom-[-6%] left-1/2 h-[min(88vw,640px)] w-[min(98vw,700px)] -translate-x-[46%]",
                  "sm:bottom-[-8%] sm:h-[min(82vw,680px)] sm:w-[min(94vw,720px)] sm:-translate-x-[48%]",
                  "lg:inset-auto lg:bottom-[-10%] lg:right-[-20%] lg:left-auto lg:h-[min(78vh,820px)] lg:w-[min(72vw,820px)] lg:translate-x-0",
                  "xl:bottom-[-12%] xl:right-[-16%] xl:h-[min(82vh,880px)] xl:w-[min(68vw,860px)]"
                )}
                style={{
                  background:
                    "radial-gradient(ellipse 78% 64% at 72% 88%, rgba(211, 255, 154, 0.22) 0%, rgba(165, 244, 202, 0.11) 36%, rgba(124, 247, 212, 0.05) 52%, transparent 70%)",
                  filter: "blur(56px)",
                  opacity: 0.82,
                }}
              />
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute z-0 rounded-[45%]",
                  "bottom-[2%] right-[2%] h-[min(62vw,420px)] w-[min(70vw,480px)]",
                  "lg:bottom-[0%] lg:right-[-8%] lg:h-[min(52vh,520px)] lg:w-[min(48vw,520px)]",
                  "xl:bottom-[-2%] xl:right-[-4%]"
                )}
                style={{
                  background:
                    "radial-gradient(ellipse 68% 60% at 68% 78%, rgba(193, 255, 114, 0.16), rgba(124, 247, 212, 0.07) 45%, transparent 68%)",
                  filter: "blur(40px)",
                  opacity: 0.74,
                }}
              />

              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -2.5, 2, 0],
                        transition: {
                          duration: 14,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
                className="relative z-[1] w-full max-w-[28rem] sm:max-w-[30rem] lg:max-w-[640px] xl:max-w-[min(700px,100%)]"
              >
                <div
                  className={cn(
                    "relative mx-auto w-full max-w-[24.75rem]",
                    "aspect-[10/12.75] max-h-[min(72vh,640px)]",
                    "sm:max-h-[min(74vh,680px)] sm:max-w-[26.75rem]",
                    "lg:mx-0 lg:ml-auto lg:aspect-[10/12.5] lg:max-h-[min(88vh,920px)] lg:max-w-full",
                    "xl:aspect-[10/13] xl:max-h-[min(90vh,960px)]"
                  )}
                >
                  <Image
                    src={HERO_IMG}
                    alt="Manish — AI-powered full stack developer portrait"
                    fill
                    sizes="(max-width:640px) 92vw, (max-width:1024px) 88vw, (max-width:1536px) 48vw, 700px"
                    priority
                    className="pointer-events-none select-none object-contain object-bottom-right"
                  />
                </div>
              </motion.div>

              <FloatingGlassCard
                className={cn(
                  "absolute right-0 top-[5%] z-30 w-[10.5rem] px-3 py-2.5 sm:w-[10.75rem]",
                  "max-lg:left-5 max-lg:right-auto max-lg:top-[2%]",
                  "lg:right-2 lg:top-[3%]",
                  "xl:right-6 xl:top-[5%]"
                )}
                prefersReducedMotion={prefersReducedMotion}
                delay={0.05}
                floatDuration={21}
              >
                <p className="text-[0.875rem] font-semibold tracking-[-0.02em] text-neutral-900">
                  8+ Years Experience
                </p>
                <div className="mt-1.5 h-0.5 w-8 rounded-full bg-[linear-gradient(90deg,#7cf7d4,#d9ff63)]" />
              </FloatingGlassCard>

              <FloatingGlassCard
                className={cn(
                  "absolute bottom-[5%] left-0 z-30 w-[12.25rem] px-3 py-2 sm:left-0",
                  "max-lg:bottom-[5%] max-lg:left-3 max-lg:w-[min(12rem,calc(100vw-5.5rem))]",
                  "lg:bottom-[3%] lg:left-1",
                  "xl:bottom-[4%] xl:left-0"
                )}
                prefersReducedMotion={prefersReducedMotion}
                delay={0.12}
                floatDuration={24}
              >
                <p className="text-[0.8875rem] font-semibold text-neutral-900">Real Customer</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5" aria-hidden>
                  {["EK", "AR", "MS", "JP"].map((initials, ai) => (
                    <span
                      key={`${initials}-${String(ai)}`}
                      style={{ marginLeft: ai > 0 ? "-6px" : 0 }}
                      className={cn(
                        "inline-flex size-6 items-center justify-center rounded-full border border-white text-[9px] font-semibold text-neutral-800 shadow-[0_1px_3px_rgb(0_0_0/0.08)]",
                        "bg-gradient-to-b from-neutral-100 to-neutral-200/90",
                        ai === 0 && "relative z-[4]",
                        ai === 1 && "relative z-[3]",
                        ai === 2 && "relative z-[2]",
                        ai === 3 && "relative z-[1]"
                      )}
                    >
                      {initials}
                    </span>
                  ))}
                  <span className="ml-0.5 inline-flex">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7cf7d4,#d9ff63)] shadow-sm ring-2 ring-white">
                      <Plus className="size-3 stroke-[2.5] text-[#0a1818]" aria-hidden />
                    </span>
                  </span>
                </div>
              </FloatingGlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-surface-deep via-surface-deep/40 to-transparent sm:h-32"
      />
    </section>
  );
}
