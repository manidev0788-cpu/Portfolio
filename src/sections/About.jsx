"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";

const GRID_COLUMNS = 12;
const easeLux = [0.22, 1, 0.36, 1];

const PROFILE_IMG = "/images/about-new.png";

const CONTACT_EMAIL = "your@email.com";
const CONTACT_PHONE = "+91 98765 43210";

const ORBIT_DOT_ANGLES = [0, 120, 240];

export function AboutSectionGrid({ className }) {
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

export function PortraitOrbit({ prefersReducedMotion }) {
  return (
    <div
      className={cn(
        "relative isolate mx-auto aspect-square w-full max-w-[min(22.5rem,92vw)] overflow-visible",
        "lg:mx-0 lg:max-w-[24.5rem] xl:max-w-[25.5rem]"
      )}
    >
      {/* Ambient glow behind all layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[58px]"
        style={{
          background:
            "radial-gradient(circle closest-side, rgb(124 247 212 / 0.24) 0%, rgb(124 247 212 / 0.1) 38%, rgb(217 255 99 / 0.06) 55%, transparent 72%)",
        }}
      />

      {/* Faint static halo — sits behind rotating orbit only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-11.5%] z-[1] rounded-full border border-white/[0.03]"
      />

      {/* Thin orbit + dots: only this subtree spins (linear, ~21s). */}
      <div
        className={cn(
          "about-orbit-ring pointer-events-none absolute inset-[-6.5%] z-[2] rounded-full",
          prefersReducedMotion && "about-orbit-ring--paused"
        )}
      >
        <div className="absolute inset-0 rounded-full border border-white/[0.1]" />
        {ORBIT_DOT_ANGLES.map((deg) => (
          <div
            key={deg}
            className="pointer-events-none absolute inset-0"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <span className="absolute left-1/2 top-[2.5%] block size-[5px] -translate-x-1/2 rounded-full bg-accent-start shadow-[0_0_12px_rgb(124_247_212/0.38)] ring-1 ring-white/[0.14]" />
          </div>
        ))}
      </div>

      {/* Inner gradient ring + image: no rotation; optional subtle float.
          ~full parent width (~100% dia) vs ~113% orbit — strong fill, bezel still clears orbit. */}
      <motion.div
        className="absolute inset-0 z-[3] aspect-square"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -3, 1.8, -2, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className={cn(
            "relative mx-auto h-full w-full max-h-full max-w-full rounded-full p-1 sm:p-[4.5px]",
            "bg-[linear-gradient(145deg,#7cf7d4_0%,#5ee4b8_28%,#9ef0a8_56%,#d9ff63_100%)]",
            "shadow-[0_0_56px_-6px_rgb(124_247_212/0.45),0_24px_52px_-20px_rgb(0_0_0/0.38),inset_0_1px_0_rgb(255_255_255/0.38)]",
            "ring-1 ring-white/[0.12]"
          )}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full bg-surface-deep ring-2 ring-black/35">
            <Image
              src={PROFILE_IMG}
              alt="Manish Kumar — AI-enabled full stack and React developer portrait"
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 52vw, 24rem"
              className="object-cover object-[50%_20%] sm:object-[50%_16%]"
              loading="lazy"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgb(255_255_255_/0.04),inset_0_26px_48px_-20px_rgb(0_0_0/_0.25)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={cn(
        "relative isolate w-full scroll-mt-[5.5rem] overflow-hidden",
        "border-t border-white/[0.045] bg-surface-deep pb-16 pt-14 sm:pb-20 sm:pt-[4.25rem] lg:pb-24 lg:pt-[5rem]"
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <AboutSectionGrid />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.97]"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 15% 40%, rgb(124 247 212 / 0.045), transparent 58%), radial-gradient(ellipse 50% 45% at 92% 88%, rgb(217 255 99 / 0.035), transparent 52%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-14 xl:gap-x-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: easeLux }}
            className="flex justify-center lg:justify-start"
          >
            <PortraitOrbit prefersReducedMotion={prefersReducedMotion} />
          </motion.div>

          <div className="min-w-0">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.52,
                delay: prefersReducedMotion ? 0 : 0.05,
                ease: easeLux,
              }}
            >
              <p className="mb-5 inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:mb-6 sm:text-[0.875rem]">
                <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
                  ●
                </span>
                About Me
              </p>

              <h2
                id="about-heading"
                className={cn(
                  "max-w-[min(40rem,100%)] font-bold leading-[1.08] tracking-[-0.03em]",
                  "text-[clamp(1.9375rem,2.65vw+0.92rem,3rem)] antialiased text-foreground"
                )}
              >
                <span className="text-white">Who is </span>
                <span className="text-gradient-primary">Manish Kumar</span>
                <span className="text-white">?</span>
              </h2>

              <p className="mt-5 max-w-[min(40rem,100%)] text-[1.03125rem] font-medium leading-[1.55] text-foreground/92 sm:mt-6 sm:text-[1.0625rem] sm:leading-[1.58]">
                Helping businesses grow with modern AI-powered web solutions.
              </p>

              <div className="mt-8 space-y-5 text-[0.90625rem] leading-[1.82] text-muted sm:mt-9 sm:text-[0.925rem] sm:leading-[1.84]">
                <p>
                  I&apos;m Manish Kumar, a passionate Full Stack Developer and AI-enabled digital
                  solutions creator with more than 12 years of experience building modern websites,
                  scalable applications, and high-performance online platforms.
                </p>
                <p>
                  I specialize in premium web experiences using HTML, CSS, Tailwind CSS,
                  JavaScript, React, and Next.js, alongside backend technologies such as PHP,
                  MongoDB, and Supabase.
                </p>
                <p>
                  Over the years, I&apos;ve delivered on WordPress, Shopify, OpenCart, Wix, and
                  Squarespace—helping businesses launch powerful digital products and eCommerce
                  solutions end to end.
                </p>
                <p>
                  Beyond development, I handle hosting and deployment, domain setup,
                  VPS/server management, optimization, CMS customization, and full project rollout
                  so launches stay stable and predictable.
                </p>
                <p>
                  Today my focus is on AI-enabled workflows, automation systems, modern SaaS
                  experiences, and smart business platforms that unite performance, scalability,
                  and refined UI/UX.
                </p>
                <p className="text-foreground/85">
                  Explore my{" "}
                  <Link href="/skills" className="text-accent-start underline-offset-4 hover:underline">
                    technical skills
                  </Link>
                  ,{" "}
                  <Link href="/expertise" className="text-accent-start underline-offset-4 hover:underline">
                    service expertise
                  </Link>
                  ,{" "}
                  <Link href="/projects" className="text-accent-start underline-offset-4 hover:underline">
                    featured projects
                  </Link>
                  , or{" "}
                  <Link href="/contact" className="text-accent-start underline-offset-4 hover:underline">
                    contact me
                  </Link>{" "}
                  to discuss your next build.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-1 gap-4 sm:mt-11 sm:grid-cols-2 sm:gap-5">
                <div
                  className={cn(
                    "rounded-[16px] border border-white/[0.065]",
                    "bg-[linear-gradient(168deg,rgb(255_255_255_/4.8%)_0%,transparent_46%)] [background-color:rgb(7_29_29_/0.4)]",
                    "px-6 py-[1.125rem]",
                    "shadow-[0_14px_40px_-26px_rgb(0_0_0/0.45)] backdrop-blur-[12px]"
                  )}
                >
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted/90">
                    Email Me At
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-[0.9375rem] font-medium text-foreground/95 underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-accent-start"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div
                  className={cn(
                    "rounded-[16px] border border-white/[0.065]",
                    "bg-[linear-gradient(168deg,rgb(255_255_255_/4.8%)_0%,transparent_46%)] [background-color:rgb(7_29_29_/0.4)]",
                    "px-6 py-[1.125rem]",
                    "shadow-[0_14px_40px_-26px_rgb(0_0_0/0.45)] backdrop-blur-[12px]"
                  )}
                >
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted/90">
                    Phone Number
                  </dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+919876543210"
                      className="text-[0.9375rem] font-medium text-foreground/95 underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-accent-start"
                    >
                      {CONTACT_PHONE}
                    </a>
                  </dd>
                </div>
              </dl>

              <div
                className={cn(
                  "relative mt-9 overflow-hidden rounded-[18px]",
                  "border border-accent-start/14",
                  "bg-[linear-gradient(135deg,rgb(124_247_212_/10%)_0%,rgb(217_255_99_/7%)_52%,transparent_100%)] [background-color:rgb(7_29_29_/0.55)]",
                  "shadow-[0_22px_48px_-32px_rgb(0_0_0/0.55)] backdrop-blur-[14px]",
                  "p-8 sm:p-9"
                )}
              >
                <div aria-hidden className="pointer-events-none absolute -right-[18%] -top-[38%] h-[118%] w-[74%] rounded-full bg-accent-start/[0.04] blur-3xl" />
                <div className="relative flex flex-wrap items-end gap-4 gap-y-5 sm:flex-nowrap sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[clamp(3.25rem,6vw,4.125rem)] font-bold tabular-nums leading-none tracking-[-0.04em] text-gradient-primary drop-shadow-[0_0_28px_rgb(124_247_212_/0.18)]">
                      12+
                    </p>
                    <p className="mt-3 text-[1.0625rem] font-semibold leading-tight tracking-[-0.02em] text-foreground">
                      Years Experience
                    </p>
                  </div>
                  <div
                    className={cn(
                      "sm:ml-auto sm:pb-1",
                      "rounded-full border border-white/[0.08] bg-black/15 px-4 py-2",
                      "text-[0.75rem] font-medium tracking-[0.08em] text-muted/92 sm:text-[0.78125rem]"
                    )}
                  >
                    AI Enabled Developer
                  </div>
                </div>
              </div>
              <p className="relative mt-6 text-center lg:text-left">
                <Link
                  href="/about"
                  className="text-[0.875rem] font-semibold tracking-[0.06em] text-accent-start underline-offset-[5px] transition-colors hover:text-accent-end hover:underline"
                >
                  View full About page →
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
