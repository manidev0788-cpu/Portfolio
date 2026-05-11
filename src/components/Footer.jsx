"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { ChevronDown, Facebook, Globe, Instagram, Linkedin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";

const QUICK_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about" },
  { label: "My Skills", href: "/skills" },
  { label: "Our Expertise", href: "/expertise" },
  { label: "My Projects", href: "/projects" },
  { label: "Portfolio", href: "/#impact" },
];

const SKILLS_LINKS = [
  { label: "Frontend stack", href: "/skills#frontend" },
  { label: "Backend & databases", href: "/skills#backend" },
  { label: "CMS & eCommerce", href: "/skills#cms" },
  { label: "Core development services", href: "/skills#core" },
  { label: "AI & automation", href: "/skills#ai" },
];

const VIEW_WORK_LINKS = [
  { label: "Marketo XI — eCommerce", href: "/projects#marketo-xi" },
  { label: "School management system", href: "/projects#school-management" },
  { label: "Listy — AI business listings", href: "/projects#listy-murex" },
  { label: "All projects", href: "/projects" },
];

function PixionDotsMark({ className }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="5.5" cy="5.5" r="2.25" fill="currentColor" />
      <circle cx="14.5" cy="5.5" r="2.25" fill="currentColor" />
      <circle cx="5.5" cy="14.5" r="2.25" fill="currentColor" />
      <circle cx="14.5" cy="14.5" r="2.25" fill="currentColor" />
    </svg>
  );
}

function FooterGetStartedBadge({ prefersReducedMotion }) {
  const gid = useId().replace(/:/g, "");
  const textPathId = `ft-badge-tp-${gid}`;

  return (
    <Link
      href="/contact"
      className={cn(
        "relative block shrink-0",
        "size-[5.75rem] sm:size-[6.25rem] lg:size-28",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a2624]/40 rounded-full"
      )}
      aria-label="Get started — go to contact"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 drop-shadow-[0_8px_24px_-10px_rgb(7_29_29_/0.35)]"
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
            <path
              id={textPathId}
              fill="none"
              d="M 100 100 m -74 0 a 74 74 0 1 1 148 0 a 74 74 0 1 1 -148 0"
            />
          </defs>
          <circle cx="100" cy="100" r="98" fill="#071d1d" opacity="0.96" />
          <circle cx="100" cy="100" r="94" stroke="rgba(255,255,255,0.14)" strokeWidth="1.1" fill="none" />
          <text
            fill="rgba(255,255,255,0.88)"
            style={{ fontSize: "11.75px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            <textPath href={`#${textPathId}`} startOffset="0%">
              GET STARTED NOW • GET STARTED NOW • GET STARTED NOW •
            </textPath>
          </text>
        </svg>
      </motion.div>

      <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 size-full overflow-visible">
        <circle cx="100" cy="100" r="40" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      </svg>

      <span className="pointer-events-none absolute inset-0 flex items-center justify-center pb-px">
        <ChevronDown className="size-[1.35rem] text-white/95 sm:size-[1.5rem]" strokeWidth={2.25} aria-hidden />
      </span>
    </Link>
  );
}

export default function Footer() {
  const reducedMotionQuery = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  const year = new Date().getFullYear();

  const socialBtn =
    "inline-flex size-10 items-center justify-center rounded-full bg-[#071d1d] text-white shadow-[0_2px_8px_-2px_rgb(7_29_29_/0.35)] ring-1 ring-black/25 transition-[transform,opacity] hover:opacity-92 active:scale-[0.97]";

  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden",
        "bg-[linear-gradient(90deg,#98f5e1_0%,#c9f890_52%,#e6fb73_100%)]",
        "text-[#142220]"
      )}
    >
      <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        {/* Top CTA */}
        <div className="flex flex-col gap-10 pt-14 pb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pt-16 sm:pb-12 lg:pt-[4.25rem] lg:pb-[3.75rem]">
          <div className="max-w-xl">
            <h2 className="text-[clamp(1.5rem,3vw+0.85rem,2.25rem)] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-[#0a1f1c] antialiased">
              READY TO WORK WITH US?
            </h2>
            <p className="mt-3 max-w-[min(34rem,100%)] text-[0.9375rem] font-normal leading-relaxed text-[#1e3330]/90 sm:text-base">
              Partner with our design agency for your business with amazing results.
            </p>
          </div>
          <FooterGetStartedBadge prefersReducedMotion={prefersReducedMotion} />
        </div>

        <div className="h-px w-full bg-[#071d1d]/14" />

        {/* Columns */}
        <div className="grid gap-11 py-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4 lg:gap-10 lg:py-14 xl:gap-12">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link href="/#home" className="inline-flex items-center gap-2.5 font-bold tracking-[0.02em] text-[#0a1f1c]">
              <PixionDotsMark className="size-5 text-[#0a1f1c]" />
              <span className="text-lg">
                Pixion<span className="text-[#0d3d36]">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[0.875rem] leading-relaxed text-[#1e3330]/88 sm:text-[0.9375rem]">
              Crafting intuitive, user-centric designs that bring ideas to life. With a passion for innovation and
              creativity, I help businesses and individuals.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Website"
              >
                <Globe className="size-[1.05rem]" strokeWidth={2} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Facebook"
              >
                <Facebook className="size-[1.05rem]" strokeWidth={2} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Instagram"
              >
                <Instagram className="size-[1.05rem]" strokeWidth={2} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="LinkedIn"
              >
                <Linkedin className="size-[1.05rem]" strokeWidth={2} />
              </a>
            </div>
          </div>

          <nav aria-label="Quick links" className="min-w-0">
            <p className="text-[0.9375rem] font-bold text-[#0a1f1c]">Quick Links</p>
            <ul className="mt-4 space-y-2.5 text-[0.875rem] text-[#1e3330]/90 sm:text-[0.9375rem]">
              {QUICK_LINKS.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="transition-opacity hover:opacity-70">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Skills" className="min-w-0">
            <p className="text-[0.9375rem] font-bold text-[#0a1f1c]">Skills</p>
            <ul className="mt-4 space-y-2.5 text-[0.875rem] text-[#1e3330]/90 sm:text-[0.9375rem]">
              {SKILLS_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-opacity hover:opacity-70">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="View my work" className="min-w-0">
            <p className="text-[0.9375rem] font-bold text-[#0a1f1c]">View My Work</p>
            <ul className="mt-4 space-y-2.5 text-[0.875rem] text-[#1e3330]/90 sm:text-[0.9375rem]">
              {VIEW_WORK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-opacity hover:opacity-70">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="border-t border-[#071d1d]/12 py-6 text-center text-[0.8125rem] text-[#1e3330]/75 sm:py-7">
          Copyright © {year} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
