"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { cn } from "@/utils/cn";

const HERO_IMG = "/images/hero-new.png";

/** Match Pixion: 12 even vertical tracks (pixel-consistent rhythm). */
const GRID_COLUMNS = 12;

const easeLux = [0.22, 1, 0.36, 1];

const TECH_STACK = [
  "React",
  "Next.js",
  "WordPress",
  "Shopify",
  "MongoDB",
  "Supabase",
  "AI Workflows",
];

const HERO_STATS = [
  { value: "12+", label: "Years Experience" },
  { value: "150+", label: "Projects" },
  { value: "AI-Powered", label: "Solutions", accent: true },
  { value: "Full Stack", label: "& CMS Expert" },
];

function StaticVerticalGrid({ className }) {
  return (
    <motion.div
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
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: GRID_COLUMNS }).map((_, i) => (
          <div key={String(i)} className="min-w-0" />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
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
    </motion.div>
  );
}

function AnimatedPortraitGlow({ prefersReducedMotion }) {
  return (
    <>
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-0 rounded-[50%]",
          "bottom-[-6%] left-1/2 h-[min(88vw,640px)] w-[min(98vw,700px)] -translate-x-[46%]",
          "sm:bottom-[-8%] sm:h-[min(82vw,680px)] sm:w-[min(94vw,720px)] sm:-translate-x-[48%]",
          "lg:inset-auto lg:bottom-[-10%] lg:right-[-20%] lg:left-auto lg:h-[min(78vh,820px)] lg:w-[min(72vw,820px)] lg:translate-x-0",
          "xl:bottom-[-12%] xl:right-[-16%] xl:h-[min(82vh,880px)] xl:w-[min(68vw,860px)]"
        )}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: [0.72, 0.92, 0.78, 0.88],
                scale: [1, 1.04, 0.98, 1.02, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(ellipse 78% 64% at 72% 88%, rgba(211, 255, 154, 0.28) 0%, rgba(165, 244, 202, 0.14) 36%, rgba(124, 247, 212, 0.08) 52%, transparent 70%)",
          filter: "blur(56px)",
        }}
      />
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-0 rounded-[45%]",
          "bottom-[2%] right-[2%] h-[min(62vw,420px)] w-[min(70vw,480px)]",
          "lg:bottom-[0%] lg:right-[-8%] lg:h-[min(52vh,520px)] lg:w-[min(48vw,520px)]",
          "xl:bottom-[-2%] xl:right-[-4%]"
        )}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: [0.6, 0.85, 0.7],
                rotate: [0, 3, -2, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        style={{
          background:
            "conic-gradient(from 210deg at 68% 78%, rgba(193, 255, 114, 0.2), rgba(124, 247, 212, 0.12) 35%, rgba(217, 255, 99, 0.08) 55%, transparent 72%)",
          filter: "blur(44px)",
        }}
      />
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-[0] rounded-full",
          "left-1/2 top-[18%] h-[min(42vw,280px)] w-[min(48vw,320px)] -translate-x-1/2",
          "lg:left-auto lg:right-[8%] lg:top-[22%] lg:translate-x-0 lg:h-[min(36vh,340px)] lg:w-[min(32vw,360px)]"
        )}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.08, 0.96, 1.05, 1],
                opacity: [0.35, 0.55, 0.42, 0.5],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 247, 212, 0.22) 0%, rgba(124, 247, 212, 0.06) 42%, transparent 68%)",
          filter: "blur(32px)",
        }}
      />
    </>
  );
}

function RevealBlock({ children, className, delay = 0, prefersReducedMotion }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 22,
        filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
      }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: prefersReducedMotion ? 0.35 : 0.72,
        delay,
        ease: easeLux,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealLines({ lines, className, lineClassName, delay = 0, prefersReducedMotion }) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : "108%",
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.68,
              delay: delay + i * 0.1,
              ease: easeLux,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function StatGlassCard({
  stat,
  className,
  delay = 0,
  prefersReducedMotion,
  floatDuration = 20,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 18,
        scale: prefersReducedMotion ? 1 : 0.96,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: prefersReducedMotion ? 0.4 : 0.62,
        delay: prefersReducedMotion ? 0 : 0.2 + delay * 0.12,
        ease: easeLux,
      }}
      className={cn(
        "group/stat relative rounded-[14px]",
        "border border-white/[0.38]",
        "bg-white/[0.72]",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.58),0_12px_40px_-12px_rgb(0_0_0/0.14),0_0_0_1px_rgb(124_247_212/0.06)]",
        "backdrop-blur-[12px]",
        "transition-[box-shadow,border-color] duration-500",
        "hover:border-white/[0.48] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.62),0_16px_48px_-10px_rgb(0_0_0/0.16),0_0_24px_-4px_rgb(124_247_212/0.18)]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/stat:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,247,212,0.2) 0%, transparent 42%, rgba(217,255,99,0.12) 100%)",
        }}
      />
      <motion.div
        className="relative rounded-[inherit] px-3 py-2.5 sm:px-3.5 sm:py-3"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -1.4, 1, -0.7, 0],
                x: [0, 0.3, -0.2, 0.15, 0],
              }
        }
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5 + delay * 1.4,
        }}
      >
        <p
          className={cn(
            "text-[1.0625rem] font-bold tracking-[-0.03em] text-neutral-900 sm:text-[1.125rem]",
            stat.accent &&
              "bg-[linear-gradient(105deg,#0d4a42_0%,#1a6b5c_55%,#0a1818_100%)] bg-clip-text text-transparent"
          )}
        >
          {stat.value}
          {stat.accent && (
            <Sparkles
              className="ml-1 inline-block size-3.5 -translate-y-px text-[#1a6b5c] opacity-80"
              aria-hidden
            />
          )}
        </p>
        <p className="mt-0.5 text-[0.6875rem] font-medium leading-snug tracking-[0.01em] text-neutral-600 sm:text-[0.71875rem]">
          {stat.label}
        </p>
        <motion.div
          aria-hidden
          className="mt-2 h-0.5 rounded-full bg-[linear-gradient(90deg,#7cf7d4,#d9ff63)]"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            delay: 0.35 + delay * 0.08,
            ease: easeLux,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function PremiumPrimaryButton({ href, children, prefersReducedMotion }) {
  return (
    <motion.div
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.03, transition: { duration: 0.28, ease: easeLux } }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
    >
      <Link
        href={href}
        className={cn(
          "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full",
          "bg-[linear-gradient(105deg,#7cf7d4_0%,#a8f0d4_42%,#d9ff63_100%)]",
          "px-8 py-2.5 text-[0.875rem] font-semibold text-[#0a1818]",
          "shadow-[0_10px_32px_rgba(124,247,212,0.18),0_4px_14px_rgba(0,0,0,0.14)]",
          "ring-1 ring-white/25",
          "transition-[filter,box-shadow] duration-400",
          "hover:shadow-[0_16px_44px_rgba(124,247,212,0.28),0_6px_20px_rgba(0,0,0,0.16)]",
          "hover:brightness-[1.04]"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            !prefersReducedMotion && "animate-[hero-shimmer_2.8s_ease-in-out_infinite]"
          )}
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.35) 48%, transparent 96%)",
            backgroundSize: "200% 100%",
          }}
        />
        <span className="relative">{children}</span>
        <ArrowUpRight
          className="relative size-4 stroke-[2.25] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}

function PremiumGhostButton({ href, children, prefersReducedMotion }) {
  return (
    <motion.div
      whileHover={
        prefersReducedMotion
          ? undefined
          : { scale: 1.03, transition: { duration: 0.28, ease: easeLux } }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
    >
      <Link
        href={href}
        className={cn(
          "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full",
          "border border-white/[0.16] bg-[rgb(7_29_29_/0.42)] px-7 py-2.5",
          "text-[0.875rem] font-semibold text-foreground backdrop-blur-md",
          "shadow-[0_8px_28px_rgb(0_0_0_/0.22),inset_0_1px_0_0_rgba(255,255,255,0.06)]",
          "transition-[border-color,background-color,box-shadow] duration-400",
          "hover:border-accent-start/35 hover:bg-[rgb(7_29_29_/0.62)]",
          "hover:shadow-[0_12px_36px_rgb(0_0_0_/0.28),0_0_28px_-6px_rgb(124_247_212/0.22),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 120% at 50% 0%, rgba(124,247,212,0.12), transparent 65%)",
          }}
        />
        <span className="relative">{children}</span>
      </Link>
    </motion.div>
  );
}

const leftVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easeLux },
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

      {/* Ambient wash — AI-focused mint / lime hints */}
      <motion.div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 48% at 78% 62%, rgba(124, 247, 212, 0.07), transparent 65%), radial-gradient(ellipse 40% 32% at 92% 8%, rgba(217, 255, 99, 0.045), transparent 58%), radial-gradient(ellipse 35% 28% at 12% 72%, rgba(124, 247, 212, 0.04), transparent 62%)",
          }}
        />
      </motion.div>

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-6 sm:px-10 lg:px-14",
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
            <motion.div
              variants={itemVariants}
              className="mb-7 flex flex-wrap items-center gap-3 sm:mb-8"
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5",
                  "text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-foreground/90 backdrop-blur-sm sm:text-[0.71875rem]"
                )}
              >
                <Sparkles className="size-3 text-accent-start" aria-hidden />
                Manish Kumar
              </span>
              <span className="inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.02em] text-accent-start/85 sm:text-[0.84375rem]">
                <span className="relative flex size-1.5" aria-hidden>
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-start/40 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent-start" />
                </span>
                Available for AI &amp; Full Stack projects
              </span>
            </motion.div>

            <RevealBlock
              delay={0.05}
              prefersReducedMotion={prefersReducedMotion}
              className="mb-6 sm:mb-7"
            >
              <h1
                className={cn(
                  "max-w-[min(40rem,100%)] font-bold leading-[1.08] tracking-[-0.032em] antialiased",
                  "text-[clamp(2.35rem,3.4vw+1.15rem,3.75rem)]"
                )}
              >
                <RevealLines
                  prefersReducedMotion={prefersReducedMotion}
                  delay={0.1}
                  lines={["AI-Enabled Full Stack"]}
                  lineClassName="text-gradient-primary"
                />
                <RevealLines
                  prefersReducedMotion={prefersReducedMotion}
                  delay={0.22}
                  lines={["Developer"]}
                  lineClassName="mt-1.5 text-foreground sm:mt-2"
                />
              </h1>
            </RevealBlock>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-[min(38rem,100%)] text-[1.03125rem] leading-[1.76] text-muted sm:mb-9 sm:max-w-[min(40rem,100%)] sm:text-[1.0625rem] sm:leading-[1.8] lg:max-w-[min(42rem,100%)]"
            >
              I build scalable websites, modern web applications, AI-powered workflows, CMS
              platforms, and high-performance digital experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mb-9 flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:mb-10"
            >
              {TECH_STACK.map((tech, i) => (
                <span key={tech} className="inline-flex items-center gap-1.5">
                  {i > 0 && (
                    <span
                      className="text-[0.5rem] text-white/25 select-none"
                      aria-hidden
                    >
                      ●
                    </span>
                  )}
                  <span
                    className={cn(
                      "rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1",
                      "text-[0.6875rem] font-medium tracking-[0.02em] text-foreground/78 backdrop-blur-sm",
                      "transition-colors duration-300 hover:border-accent-start/25 hover:bg-accent-start/[0.06] hover:text-foreground/95",
                      "sm:text-[0.71875rem] sm:px-2.5"
                    )}
                  >
                    {tech}
                  </span>
                </span>
              ))}
            </motion.div>

            {/* Inline stats — visible on smaller screens; portrait cards on lg+ */}
            <motion.div
              variants={itemVariants}
              className="mb-10 grid grid-cols-2 gap-2.5 sm:gap-3 lg:hidden"
            >
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 backdrop-blur-sm",
                    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                  )}
                >
                  <p className="text-[0.9375rem] font-bold tracking-[-0.02em] text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[0.6875rem] font-medium text-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-[1.125rem] lg:gap-5"
            >
              <PremiumPrimaryButton href="/projects" prefersReducedMotion={prefersReducedMotion}>
                View Projects
              </PremiumPrimaryButton>
              <PremiumGhostButton href="/contact" prefersReducedMotion={prefersReducedMotion}>
                Contact Me
              </PremiumGhostButton>
            </motion.div>
          </motion.div>

          {/* Right — large bottom-anchored portrait */}
          <div
            className={cn(
              "relative mx-auto w-full max-w-[min(30rem,calc(100vw-2.5rem))] sm:max-w-[min(32rem,calc(100vw-3rem))]",
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
              <AnimatedPortraitGlow prefersReducedMotion={prefersReducedMotion} />

              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -3, 2.5, 0],
                        transition: {
                          duration: 14,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
                className="relative z-[1] w-full max-w-[30rem] sm:max-w-[32rem] lg:max-w-[680px] xl:max-w-[min(760px,100%)]"
              >
                <motion.div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0 rounded-[2rem]",
                    "left-[8%] right-[4%] top-[6%] bottom-[4%]",
                    "lg:left-[6%] lg:right-[2%]"
                  )}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          opacity: [0.4, 0.65, 0.5, 0.6],
                        }
                  }
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(124,247,212,0.15) 0%, rgba(217,255,99,0.08) 45%, transparent 72%)",
                    filter: "blur(28px)",
                  }}
                />
                <motion.div
                  className={cn(
                    "relative mx-auto w-full max-w-[27rem]",
                    "aspect-[10/12.75] max-h-[min(76vh,680px)]",
                    "sm:max-h-[min(78vh,720px)] sm:max-w-[29rem]",
                    "lg:mx-0 lg:ml-auto lg:aspect-[10/12.5] lg:max-h-[min(92vh,980px)] lg:max-w-full",
                    "xl:aspect-[10/13] xl:max-h-[min(94vh,1000px)]"
                  )}
                >
                  <Image
                    src={HERO_IMG}
                    alt="Manish Kumar — AI-enabled full stack developer professional portrait"
                    fill
                    sizes="(max-width:640px) 94vw, (max-width:1024px) 90vw, (max-width:1536px) 50vw, 760px"
                    priority
                    className="pointer-events-none relative z-[1] select-none object-cover object-center drop-shadow-[0_28px_56px_rgba(0,0,0,0.4)]"
                  />
                </motion.div>
              </motion.div>

              <StatGlassCard
                stat={HERO_STATS[0]}
                className={cn(
                  "absolute right-0 top-[4%] z-30 w-[9.75rem] sm:w-[10.25rem]",
                  "max-lg:left-4 max-lg:right-auto max-lg:top-[1%]",
                  "lg:right-1 lg:top-[2%]",
                  "xl:right-5 xl:top-[4%]",
                  "max-lg:hidden"
                )}
                prefersReducedMotion={prefersReducedMotion}
                delay={0}
                floatDuration={21}
              />

              <StatGlassCard
                stat={HERO_STATS[1]}
                className={cn(
                  "absolute left-0 top-[28%] z-30 w-[9.5rem] sm:w-[10rem]",
                  "max-lg:left-2 max-lg:top-[24%]",
                  "lg:left-0 lg:top-[26%]",
                  "xl:left-[-0.5rem] xl:top-[28%]",
                  "max-lg:hidden"
                )}
                prefersReducedMotion={prefersReducedMotion}
                delay={0.08}
                floatDuration={23}
              />

              <StatGlassCard
                stat={HERO_STATS[2]}
                className={cn(
                  "absolute bottom-[18%] left-0 z-30 w-[10.5rem] sm:w-[11rem]",
                  "max-lg:bottom-[16%] max-lg:left-3",
                  "lg:bottom-[16%] lg:left-[-0.25rem]",
                  "xl:bottom-[18%] xl:left-0",
                  "max-lg:hidden"
                )}
                prefersReducedMotion={prefersReducedMotion}
                delay={0.14}
                floatDuration={25}
              />

              <StatGlassCard
                stat={HERO_STATS[3]}
                className={cn(
                  "absolute bottom-[4%] right-0 z-30 w-[10.75rem] sm:w-[11.25rem]",
                  "max-lg:bottom-[3%] max-lg:right-3",
                  "lg:bottom-[2%] lg:right-1",
                  "xl:bottom-[3%] xl:right-4",
                  "max-lg:hidden"
                )}
                prefersReducedMotion={prefersReducedMotion}
                delay={0.2}
                floatDuration={22}
              />
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
