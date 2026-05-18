"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";

const MIN_VISIBLE_MS = 900;
const FADE_MS = 520;
const easeLux = [0.22, 1, 0.36, 1];

const LOADER_BG_STYLE = {
  backgroundColor: "#071d1d",
  backgroundImage: `
    radial-gradient(ellipse 110% 80% at 50% -25%, rgb(124 247 212 / 0.12), transparent 58%),
    radial-gradient(ellipse 70% 50% at 100% 0%, rgb(217 255 99 / 0.07), transparent 48%),
    radial-gradient(circle at 0% 100%, rgb(124 247 212 / 0.05), transparent 42%)
  `,
};

function AiSpinner({ reduced }) {
  if (reduced) {
    return (
      <motion.div
        className="relative h-24 w-24"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: easeLux }}
      >
        <div
          className="absolute inset-0 rounded-full border-2 border-accent-start/50"
          aria-hidden
        />
        <div className="absolute inset-[5px] rounded-full bg-[#071d1d]" aria-hidden />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative h-24 w-24"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{
        opacity: 1,
        scale: [1, 1.045, 1],
      }}
      transition={{
        opacity: { duration: 0.45, ease: easeLux },
        scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgb(124 247 212 / 0.28) 0%, rgb(217 255 99 / 0.08) 45%, transparent 70%)",
        }}
      />

      {/* Rotating gradient ring */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full p-[2.5px]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #7cf7d4 18%, #d9ff63 42%, #7cf7d4 62%, transparent 82%)",
          boxShadow:
            "0 0 28px rgb(124 247 212 / 0.35), 0 0 48px rgb(124 247 212 / 0.12), inset 0 0 20px rgb(124 247 212 / 0.08)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.35, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-full w-full rounded-full bg-[#071d1d]" />
      </motion.div>

      {/* Inner pulse ring */}
      <motion.div
        aria-hidden
        className="absolute inset-[10px] rounded-full border border-accent-start/20"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting glow dot */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
      >
        <span
          className={cn(
            "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
            "size-2.5 rounded-full bg-[#d9ff63]",
            "shadow-[0_0_14px_3px_rgb(124_247_212/0.65),0_0_24px_6px_rgb(217_255_99/0.35)]"
          )}
        />
      </motion.div>

      {/* Center core */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-start/80 shadow-[0_0_12px_rgb(124_247_212/0.8)]"
      />
    </motion.div>
  );
}

export default function PageLoader() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("portfolio-loader-seen") === "1") {
        setMounted(false);
      }
    } catch {
      /* sessionStorage unavailable */
    }
  }, []);

  useEffect(() => {
    if (!exiting || reduced) return undefined;
    const t = window.setTimeout(() => setMounted(false), FADE_MS + 48);
    return () => window.clearTimeout(t);
  }, [exiting, reduced]);

  useEffect(() => {
    let cancelled = false;
    let dismissalScheduled = false;
    const t0 = performance.now();

    function scheduleDismiss() {
      if (cancelled || dismissalScheduled) return;
      dismissalScheduled = true;
      const elapsed = performance.now() - t0;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        if (cancelled) return;
        try {
          sessionStorage.setItem("portfolio-loader-seen", "1");
        } catch {
          /* sessionStorage unavailable */
        }
        if (reducedRef.current) setMounted(false);
        else setExiting(true);
      }, wait);
    }

    if (document.readyState === "complete") scheduleDismiss();
    else window.addEventListener("load", scheduleDismiss, { once: true });

    const hardStop = window.setTimeout(scheduleDismiss, 12_000);

    return () => {
      cancelled = true;
      window.clearTimeout(hardStop);
      window.removeEventListener("load", scheduleDismiss);
    };
  }, []);

  useEffect(() => {
    if (mounted) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      className={cn(
        "fixed inset-0 z-[10050] flex flex-col items-center justify-center",
        exiting && !reduced ? "pointer-events-none" : "pointer-events-auto"
      )}
      style={LOADER_BG_STYLE}
      initial={false}
      animate={{
        opacity: exiting ? 0 : 1,
        scale: exiting ? 1.02 : 1,
      }}
      transition={{
        duration: reduced ? 0.06 : FADE_MS / 1000,
        ease: easeLux,
      }}
    >
      <span className="sr-only">Loading portfolio</span>

      <div className="flex flex-col items-center gap-8 px-6 text-center">
        <AiSpinner reduced={reduced} />

        <motion.p
          className={cn(
            "text-[clamp(0.875rem,1.5vw+0.5rem,1.0625rem)] font-bold uppercase tracking-[0.22em]",
            "text-foreground/95"
          )}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={
            reduced
              ? { opacity: 1 }
              : {
                  opacity: [0.45, 1, 0.45],
                  y: 0,
                }
          }
          transition={
            reduced
              ? { duration: 0.3 }
              : {
                  opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 0.5, ease: easeLux },
                }
          }
        >
          <span className="text-gradient-primary">Portfolio</span>
          <span className="text-accent-start">.</span>
        </motion.p>
      </div>

      {/* Subtle bottom accent */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-start/40 to-transparent"
        animate={reduced ? undefined : { opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
