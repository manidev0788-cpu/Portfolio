"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { LINKEDIN_URL, WHATSAPP_URL } from "@/content/contact-constants";
import { cn } from "@/utils/cn";

const easeLux = [0.22, 1, 0.36, 1];
const PROGRESS_RADIUS = 18;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;
const BTN_SIZE = "size-10 sm:size-11 md:size-12";
const BRAND_ICON = "size-[1.15rem] sm:size-5 md:size-[1.35rem]";

const labelClass = cn(
  "pointer-events-none select-none whitespace-nowrap text-right",
  "text-[0.6875rem] font-medium tracking-[0.02em] text-white/88 sm:text-xs",
  "drop-shadow-[0_1px_8px_rgb(0_0_0/0.45)]",
  "transition-[opacity,transform,color] duration-300",
  "group-hover:text-accent-start"
);

const glowVariants = {
  whatsapp: cn(
    "bg-[radial-gradient(circle,rgba(37,211,102,0.5)_0%,rgba(124,247,212,0.2)_45%,transparent_72%)]",
    "opacity-80"
  ),
  linkedin: cn(
    "bg-[radial-gradient(circle,rgba(10,102,194,0.45)_0%,rgba(10,102,194,0.15)_50%,transparent_72%)]",
    "opacity-75"
  ),
  scroll: cn(
    "bg-[radial-gradient(circle,rgb(124_247_212/0.35)_0%,transparent_70%)]",
    "opacity-70"
  ),
};

function BrandGlow({ variant, pulse, className }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -inset-1.5 rounded-full blur-md",
        glowVariants[variant],
        pulse && "animate-[floating-social-glow_2.8s_ease-in-out_infinite]",
        className
      )}
    />
  );
}

function FloatingRow({
  label,
  children,
  href,
  onClick,
  index,
  prefersReducedMotion,
  glowVariant = "scroll",
  className,
}) {
  const Tag = href ? motion.a : motion.button;
  const linkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { type: "button", onClick };

  return (
    <Tag
      {...linkProps}
      aria-label={label}
      initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.5,
        delay: prefersReducedMotion ? 0 : 0.08 + index * 0.08,
        ease: easeLux,
      }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      className={cn("group relative flex items-center gap-2.5 sm:gap-3", className)}
    >
      <span className={labelClass} aria-hidden>
        {label}
      </span>
      <span className="relative shrink-0">
        <BrandGlow
          variant={glowVariant}
          pulse={!prefersReducedMotion && glowVariant === "whatsapp"}
        />
        {children}
      </span>
    </Tag>
  );
}

function ScrollToTopControl({
  progress,
  onScrollTop,
  prefersReducedMotion,
  progressGradientId,
  index,
}) {
  const strokeOffset = PROGRESS_CIRCUMFERENCE * (1 - progress);

  return (
    <FloatingRow
      label="Back to Top"
      onClick={onScrollTop}
      index={index}
      prefersReducedMotion={prefersReducedMotion}
      glowVariant="scroll"
    >
      <span
        className={cn(
          "relative flex items-center justify-center rounded-full",
          BTN_SIZE,
          "border border-lime-400/25 bg-[rgb(7_29_29/0.88)] backdrop-blur-xl",
          "shadow-[0_0_25px_rgba(132,255,180,0.22),0_10px_32px_-12px_rgb(0_0_0/0.65)]",
          "ring-1 ring-white/[0.08]",
          "transition-[box-shadow,transform] duration-300",
          "group-hover:shadow-[0_0_32px_rgba(132,255,180,0.38)]"
        )}
      >
        <svg
          aria-hidden
          className="absolute inset-0 size-full -rotate-90 p-0.5"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke="rgb(255 255 255 / 0.1)"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke={`url(#${progressGradientId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={PROGRESS_CIRCUMFERENCE}
            strokeDashoffset={strokeOffset}
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
          <defs>
            <linearGradient id={progressGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7cf7d4" />
              <stop offset="100%" stopColor="#d9ff63" />
            </linearGradient>
          </defs>
        </svg>
        <ArrowUp className="relative z-10 size-5 text-white" strokeWidth={2.5} aria-hidden />
      </span>
    </FloatingRow>
  );
}

export default function FloatingSocials() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const progressGradientId = useId().replace(/:/g, "");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateProgress = useCallback(() => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) {
      setScrollProgress(0);
      return;
    }
    setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [mounted, updateProgress]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [reduced]);

  if (!mounted) return null;

  return (
    <motion.aside
      aria-label="Quick contact and navigation"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.55, ease: easeLux, delay: reduced ? 0 : 0.2 }}
      className={cn(
        "pointer-events-none fixed z-[90]",
        "right-4 bottom-4 md:right-6 md:bottom-6",
        "pb-[env(safe-area-inset-bottom,0px)]"
      )}
    >
      <motion.div className="pointer-events-auto relative flex flex-col items-end">
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-5 bottom-5 w-px sm:top-6 sm:bottom-6",
            "right-[1.25rem] sm:right-[1.375rem] md:right-6",
            "bg-gradient-to-b from-transparent via-lime-400/35 to-transparent"
          )}
        />

        <div className="relative flex flex-col items-end gap-3.5 sm:gap-4 md:gap-5">
          <FloatingRow
            href={WHATSAPP_URL}
            label="Chat on WhatsApp"
            index={0}
            prefersReducedMotion={reduced}
            glowVariant="whatsapp"
          >
            <span
              className={cn(
                "relative flex items-center justify-center rounded-full",
                BTN_SIZE,
                "bg-[#25D366] text-white",
                "border border-white/10 backdrop-blur-sm",
                "shadow-[0_0_24px_rgba(37,211,102,0.55),0_6px_20px_-6px_rgb(0_0_0/0.45)]",
                "ring-2 ring-[#25D366]/45",
                "transition-[box-shadow,transform] duration-300",
                "group-hover:shadow-[0_0_36px_rgba(37,211,102,0.75),0_0_48px_rgba(124,247,212,0.25)]",
                !reduced && "group-hover:animate-[floating-social-glow_1.6s_ease-in-out_infinite]"
              )}
            >
              <FaWhatsapp className={cn(BRAND_ICON, "drop-shadow-sm")} aria-hidden />
            </span>
          </FloatingRow>

          <FloatingRow
            href={LINKEDIN_URL}
            label="Visit LinkedIn profile"
            index={1}
            prefersReducedMotion={reduced}
            glowVariant="linkedin"
          >
            <span
              className={cn(
                "relative flex items-center justify-center rounded-full",
                BTN_SIZE,
                "bg-[#0A66C2] text-white",
                "border border-white/10 backdrop-blur-sm",
                "shadow-[0_0_22px_rgba(10,102,194,0.55),0_6px_20px_-6px_rgb(0_0_0/0.45)]",
                "ring-2 ring-[#0A66C2]/40",
                "transition-[box-shadow,transform] duration-300",
                "group-hover:-translate-y-0.5 group-hover:shadow-[0_0_34px_rgba(10,102,194,0.72)]"
              )}
            >
              <FaLinkedinIn className={cn(BRAND_ICON, "drop-shadow-sm")} aria-hidden />
            </span>
          </FloatingRow>

          <motion.div className="h-0.5 w-full sm:h-1" aria-hidden />

          <ScrollToTopControl
            progress={scrollProgress}
            onScrollTop={scrollToTop}
            prefersReducedMotion={reduced}
            progressGradientId={progressGradientId}
            index={2}
          />
        </div>
      </motion.div>
    </motion.aside>
  );
}
