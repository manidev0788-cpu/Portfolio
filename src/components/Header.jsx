"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";

import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About", href: "/about" },
  { id: "skills", label: "My Skills", href: "/skills" },
  { id: "expertise", label: "Our Expertise", href: "/expertise" },
 
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "contact", label: "Contact", href: "/contact" },
];

const easeHeader = [0.22, 1, 0.36, 1];

function LogoGlyph() {
  const gid = useId().replace(/:/g, "");
  const gradId = `hdr-logo-${gid}`;

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="relative z-10 h-[1.1rem] w-[1.1rem]"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="5" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7cf7d4" />
          <stop offset="1" stopColor="#d9ff63" />
        </linearGradient>
      </defs>

      <circle
        cx="16"
        cy="16"
        r="13"
        stroke={`url(#${gradId})`}
        strokeOpacity="0.32"
        strokeWidth="1.1"
      />

      <path
        d="M16 8l7.5 4.5v9L16 26l-7.5-4.5v-9L16 8z"
        stroke={`url(#${gradId})`}
        strokeWidth="1.26"
        strokeLinejoin="round"
      />

      <path
        d="M16 13.5l3.5 2v4L16 22l-3.5-2.5v-4l3.5-2z"
        fill={`url(#${gradId})`}
        fillOpacity="0.44"
      />
    </svg>
  );
}

function Logo() {
  return (
    <Link
      href="/#home"
      className="group relative inline-flex shrink-0 items-center gap-3"
      aria-label="Portfolio home"
    >
      <span
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          "bg-[linear-gradient(135deg,#7cf7d4_0%,#d9ff63_100%)]",
          "p-px shadow-[0_0_10px_rgb(124_247_212_/0.05)]",
          "ring-1 ring-white/[0.05]"
        )}
      >
        <span
          className={cn(
            "flex h-full w-full items-center justify-center rounded-[inherit]",
            "bg-[#071d1d]/95 backdrop-blur-sm"
          )}
        >
          <LogoGlyph />
        </span>
      </span>

      <span className="flex items-baseline text-[1rem] font-semibold tracking-[0.02em]">
        <span className="text-white">Portfolio</span>
        <span className="text-[#d9ff63]">.</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const reducedMotionQuery = useReducedMotion();
  const mobileNavId = useId();
  const [hasMounted, setHasMounted] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState("home");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  /** Same as Hero/Contact: SSR + first paint match until client knows motion preference. */
  const prefersReducedMotion = hasMounted && Boolean(reducedMotionQuery);

  useEffect(() => {
    const applySlug = () => {
      if (pathname === "/about") {
        setActiveSlug("about");
        return;
      }
      if (pathname === "/skills") {
        setActiveSlug("skills");
        return;
      }
      if (pathname === "/expertise") {
        setActiveSlug("expertise");
        return;
      }
      if (pathname === "/contact") {
        setActiveSlug("contact");
        return;
      }
      if (pathname === "/projects") {
        setActiveSlug("projects");
        return;
      }
      const raw = window.location.hash.replace(/^#/, "");
      const match = NAV_ITEMS.find((item) => item.id === raw);
      if (match) setActiveSlug(match.id);
      else if (!raw && pathname === "/") setActiveSlug("home");
    };

    applySlug();
    window.addEventListener("hashchange", applySlug);
    return () => window.removeEventListener("hashchange", applySlug);
  }, [pathname]);

  const fadeInIntro = prefersReducedMotion
    ? false
    : { opacity: 0, y: -16 };

  const springActiveNav = prefersReducedMotion
    ? { duration: 0.15 }
    : { type: "spring", stiffness: 380, damping: 34 };

  return (
    <motion.header
      initial={fadeInIntro || false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.62,
        ease: easeHeader,
      }}
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[100]",
        "border-b border-white/[0.055]",
        "bg-[#071d1d]",
        "shadow-[0_8px_28px_-12px_rgb(0_0_0/0.45)]"
      )}
    >
      <div className="pointer-events-auto mx-auto w-full max-w-[1440px] px-6 pb-4 pt-5 sm:px-10 sm:pb-5 sm:pt-6 lg:px-14">
        <div className="relative flex min-h-[3rem] w-full items-center justify-between">
          <Logo />

          <nav
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:pointer-events-auto lg:flex"
            aria-label="Primary navigation"
          >
            <div
              className={cn(
                "relative flex rounded-full px-[1px] py-[1px]",
                "backdrop-blur-[4px] backdrop-saturate-100"
              )}
            >
              <div
                className={cn(
                  "relative flex flex-nowrap items-center gap-1 rounded-full px-2 py-1",
                  "border border-white/[0.08]",
                  "bg-black/25",
                  "shadow-[0_4px_20px_rgb(0_0_0/0.2)]"
                )}
              >
                {NAV_ITEMS.map((item) => {
                  const active = activeSlug === item.id;

                  return (
                    <div key={item.id} className="relative">
                      <Link
                        href={item.href}
                        onClick={() => setActiveSlug(item.id)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative isolate rounded-full px-4 py-2 text-[18px] font-medium text-white transition-all duration-300",
                          "hover:bg-white/[0.06]"
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="header-nav-glare"
                            aria-hidden
                            className="absolute inset-0 rounded-full border border-white/[0.06] bg-white/[0.06]"
                            transition={springActiveNav}
                          />
                        )}

                        <span className="relative z-10 whitespace-nowrap">
                          {item.label}
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <motion.a
              href="/cv.pdf"
              download="portfolio-cv.pdf"
              className={cn(
                "relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full",
                "min-h-[2.5rem] px-5 py-2",
                "text-sm font-semibold tracking-[0.02em]",
                "bg-[linear-gradient(112deg,#7cf7d4_12%,#b8ffd7_52%,#d9ff63_100%)]",
                "text-[#071d1d] shadow-[0_6px_20px_rgb(0_0_0/0.12)]",
                "transition-all duration-300"
              )}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.02,
                    }
              }
            >
              <span className="relative inline-flex items-center gap-2">
                <Sparkles className="size-[0.8rem]" strokeWidth={2} />
                Download CV
              </span>
            </motion.a>

            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1]",
                "bg-black/30 backdrop-blur-sm",
                "text-white lg:hidden"
              )}
              aria-expanded={mobileOpen}
              aria-controls={mobileNavId}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <motion.nav
              id={mobileNavId}
              initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: easeHeader }}
              className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/35 p-2 backdrop-blur-md lg:hidden"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => {
                  const active = activeSlug === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={() => {
                          setActiveSlug(item.id);
                          setMobileOpen(false);
                        }}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-base font-medium text-white transition-colors",
                          active ? "bg-white/[0.08] text-accent-start" : "hover:bg-white/[0.06]"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
