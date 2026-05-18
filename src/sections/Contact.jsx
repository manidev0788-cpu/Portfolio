"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, RESUME_URL } from "@/content/contact-constants";
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

function RotatingResumeBadge({ prefersReducedMotion, resumeUrl }) {
  const gid = useId().replace(/:/g, "");
  const gradId = `ct-badge-fg-${gid}`;
  const textPathId = `ct-badge-tp-${gid}`;

  return (
    <Link
      href={resumeUrl}
      aria-label="View my resume â€” opens RÃ©sumÃ© or contact"
      className={cn(
        "relative mx-auto block shrink-0",
        "size-[9.125rem] sm:size-[10.25rem] lg:size-[11rem]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-start",
        "transition-[filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:brightness-[1.06] hover:drop-shadow-[0_0_32px_rgb(124_247_212/_/0.4)]"
      )}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 drop-shadow-[0_10px_40px_-14px_rgb(124_247_212/_/0.4)]"
        style={{ willChange: prefersReducedMotion ? undefined : "transform" }}
        initial={{ rotate: 0 }}
        animate={prefersReducedMotion ? { rotate: 0 } : { rotate: 360 }}
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 14,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }
        }
      >
        <svg viewBox="0 0 200 200" className="size-full overflow-visible">
          <defs>
            <linearGradient id={gradId} x1="28" y1="28" x2="178" y2="178" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7cf7d4" />
              <stop offset="0.5" stopColor="#b8ffb8" />
              <stop offset="1" stopColor="#d9ff63" />
            </linearGradient>
            <path
              id={textPathId}
              fill="none"
              d="M 100 100 m -71 0 a 71 71 0 1 1 142 0 a 71 71 0 1 1 -142 0"
            />
          </defs>
          <circle cx="100" cy="100" r="96" fill={`url(#${gradId})`} opacity="0.98" />
          <circle cx="100" cy="100" r="93" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" fill="none" />
          <text
            fill="rgba(7,29,29,0.9)"
            style={{ fontSize: "13.5px", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" }}
          >
            <textPath href={`#${textPathId}`} startOffset="0%">
              VIEW MY RESUME â€¢ VIEW MY RESUME â€¢ VIEW MY RESUME â€¢
            </textPath>
          </text>
        </svg>
      </motion.div>

      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <circle cx="100" cy="100" r="44" fill="rgba(7,29,29,0.88)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="100" cy="100" r="40" fill="rgba(255,255,255,0.04)" stroke="rgba(124,247,212,0.15)" strokeWidth="0.8" />
      </svg>

      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden
          className={cn(
            "flex size-12 items-center justify-center rounded-xl sm:size-[3.25rem]",
            "bg-[linear-gradient(128deg,#7cf7d4_12%,#c8ffb0_52%,#d9ff63_100%)]",
            "shadow-[inset_0_1px_0_rgb(255_255_255_/0.45),0_8px_20px_-8px_rgb(0_0_0/_/0.25)] ring-2 ring-black/35",
            "transition-[filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
        >
          <ArrowUpRight className="size-[1.45rem] text-[#071d1d] stroke-[2.75] sm:size-6 sm:stroke-[3]" />
        </span>
      </span>
    </Link>
  );
}

export default function Contact({ variant = "home" }) {
  const isPage = variant === "page";
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  const Root = isPage ? "main" : "section";
  const headingId = isPage ? "contact-page-heading" : "contact-heading";
  const Title = isPage ? "h1" : "h2";

  return (
    <Root
      id="contact"
      aria-labelledby={headingId}
      className={cn(
        "relative isolate w-full overflow-x-clip bg-surface-deep antialiased text-foreground",
        isPage
          ? "min-h-dvh scroll-mt-28 border-t border-white/[0.045] pb-20 pt-[calc(6.5rem+env(safe-area-inset-top))] sm:pb-24 sm:pt-[calc(7rem+env(safe-area-inset-top))] lg:pt-[calc(7.25rem+env(safe-area-inset-top))]"
          : "scroll-mt-[5.5rem] border-t border-white/[0.045] pb-[5.5rem] pt-12 sm:pb-[6.25rem] sm:pt-14 lg:pb-28 lg:pt-[5rem]"
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
            "radial-gradient(ellipse 58% 50% at 78% 40%, rgb(124 247 212 / 0.07), transparent 58%), radial-gradient(ellipse 48% 40% at 12% 75%, rgb(217 255 99 / 0.04), transparent 52%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        {isPage ? (
          <nav aria-label="Breadcrumb" className="pb-8 text-[0.8125rem] text-muted/85 sm:pb-10">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/#home" className="transition-colors hover:text-accent-start">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-muted/50">
                /
              </li>
              <li className="font-medium text-foreground/90">Contact</li>
            </ol>
          </nav>
        ) : null}

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-start lg:gap-x-14 xl:gap-x-[4.75rem]">
          {/* LEFT â€” headline + contacts + rotating badge */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-55px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.58, ease: easeLux }}
            className="min-w-0"
          >
            <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] text-accent-start sm:text-[0.875rem]">
              <span className="text-[0.65rem] leading-none opacity-95" aria-hidden>
                â—
              </span>
              Contact Us
            </p>
            <Title
              id={headingId}
              className={cn(
                "mt-5 max-w-[min(26rem,100%)] font-bold leading-[1.1] tracking-[-0.032em] text-white antialiased",
                isPage
                  ? "text-[clamp(2.25rem,3.2vw+1.1rem,3.125rem)] leading-[1.06] tracking-[-0.03em] sm:mt-[1.375rem]"
                  : "text-[clamp(1.9375rem,2.55vw+0.875rem,2.9375rem)] sm:mt-[1.375rem]"
              )}
            >
              Get in touch to discuss your{" "}
              <span className="text-gradient-primary">next project</span>
            </Title>
            <p className="mt-6 max-w-[min(30rem,100%)] text-[1.03125rem] leading-[1.78] text-muted sm:mt-[1.625rem] sm:text-[1.0625rem] sm:leading-[1.82]">
              Are you ready to take your project to the next level? Whether you&apos;re looking for a new website,
              a web application, or simply need advice.
            </p>

            {/* Contact rows + Pixion rotating rÃ©sumÃ© badge (badge centered below / in column) */}
            <div className="mt-10 flex w-full flex-col items-center gap-10 lg:mt-14 lg:gap-12">
              <div className="flex w-full min-w-0 max-w-xl flex-col gap-9 lg:gap-10">
                <div className="flex gap-[1.125rem] sm:gap-5">
                  <div
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full sm:size-14",
                      "border border-accent-start/20 bg-[linear-gradient(125deg,#7cf7d4_18%,#c8fdb4_62%,#d9ff63_100%)]",
                      "shadow-[0_10px_32px_-10px_rgb(124_247_212/_/0.4)] ring-2 ring-black/35"
                    )}
                    aria-hidden
                  >
                    <MapPin className="size-6 text-[#071d1d] stroke-[2.25] sm:size-[1.7rem]" />
                  </div>
                  <div>
                    <p className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground">Address</p>
                    <p className="mt-2 max-w-[20rem] text-[0.9375rem] leading-[1.7] text-muted sm:text-[0.9625rem]">
                      {CONTACT_ADDRESS}
                    </p>
                  </div>
                </div>

                <div className="flex gap-[1.125rem] sm:gap-5">
                  <div
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full sm:size-14",
                      "border border-accent-start/20 bg-[linear-gradient(125deg,#7cf7d4_18%,#c8fdb4_62%,#d9ff63_100%)]",
                      "shadow-[0_10px_32px_-10px_rgb(124_247_212/_/0.4)] ring-2 ring-black/35"
                    )}
                    aria-hidden
                  >
                    <Phone className="size-6 text-[#071d1d] stroke-[2.25] sm:size-[1.7rem]" />
                  </div>
                  <div>
                    <p className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground">Phone Number</p>
                    <a
                      href={`tel:${CONTACT_PHONE.replace(/\D/g, "")}`}
                      className={cn(
                        "mt-2 inline-block text-[0.9375rem] text-muted underline-offset-[3px]",
                        "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-accent-start sm:text-[0.9625rem]"
                      )}
                    >
                      {CONTACT_PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex gap-[1.125rem] sm:gap-5">
                  <div
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full sm:size-14",
                      "border border-accent-start/20 bg-[linear-gradient(125deg,#7cf7d4_18%,#c8fdb4_62%,#d9ff63_100%)]",
                      "shadow-[0_10px_32px_-10px_rgb(124_247_212/_/0.4)] ring-2 ring-black/35"
                    )}
                    aria-hidden
                  >
                    <Mail className="size-6 text-[#071d1d] stroke-[2.25] sm:size-[1.7rem]" />
                  </div>
                  <div>
                    <p className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground">Email</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className={cn(
                        "mt-2 inline-block break-all text-[0.9375rem] text-muted underline-offset-[3px]",
                        "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-accent-start sm:text-[0.9625rem]"
                      )}
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-center">
                <RotatingResumeBadge
                  prefersReducedMotion={prefersReducedMotion}
                  resumeUrl={RESUME_URL}
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT â€” glass form */}
          <motion.article
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-55px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.58,
              delay: prefersReducedMotion ? 0 : 0.06,
              ease: easeLux,
            }}
            className={cn(
              "rounded-[22px] p-px sm:rounded-[26px]",
              "bg-[linear-gradient(148deg,rgb(124_247_212/0.22)_0%,transparent_45%,transparent_92%,rgba(217,255,99,0.06)_100%)]",
              "shadow-[0_0_0_1px_rgb(124_247_212/0.07),0_28px_70px_-40px_rgb(0_0_0/_/0.55),inset_0_1px_0_rgb(255_255_255/_/0.04)]",
              "transition-[box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "hover:shadow-[0_0_0_1px_rgb(124_247_212/0.12),0_32px_80px_-40px_rgb(0_0_0/_/0.58)]"
            )}
          >
            <div
              className={cn(
                "rounded-[21px] p-8 sm:rounded-[25px] sm:p-10",
                "border border-white/[0.055]",
                "bg-[linear-gradient(172deg,rgb(255_255_255_/5%)_0%,transparent_58%)] [background-color:rgb(7_29_29_/0.45)]",
                "backdrop-blur-[20px]",
                "shadow-[inset_0_1px_0_rgb(255_255_255_/0.038)]"
              )}
            >
              <p className="text-[0.90625rem] leading-[1.78] text-muted sm:text-[0.9275rem] sm:leading-[1.82]">
                Fill out the form below to connect with me. I&apos;ll get back to you soon to discuss your project or
                answer any questions.
              </p>

              <ContactForm />
            </div>
          </motion.article>
        </div>
      </div>
    </Root>
  );
}
