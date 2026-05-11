"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";

/** Aligns with SkillsMarquee stripe — mint into electric lime (#d9ff63). */
const LOADER_BG =
  "linear-gradient(98deg,#7cf7d4 0%,#a8f086 38%,#c8f5a8 62%,#d9ff63 100%)";

const MIN_VISIBLE_MS = 720;
const FADE_MS = 480;

export default function PageLoader() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = Boolean(prefersReducedMotion);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!exiting || reduced) return undefined;
    const t = window.setTimeout(() => setMounted(false), FADE_MS + 40);
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

  const fadeDuration = reduced ? "60ms" : `${FADE_MS}ms`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      className={cn(
        "fixed inset-0 z-[10050] flex flex-col items-center justify-center",
        "pointer-events-auto",
        exiting && !reduced && "pointer-events-none"
      )}
      style={{
        background: LOADER_BG,
        opacity: exiting ? 0 : 1,
        transition: `opacity ${fadeDuration} cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      <span className="sr-only">Loading site</span>

      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <p
          className={cn(
            "text-[clamp(1.25rem,2.5vw+0.6rem,1.75rem)] font-bold uppercase tracking-[0.14em] text-[#0a1f1c]",
            "drop-shadow-[0_1px_0_rgb(255_255_255_/0.35)]"
          )}
        >
          Portfolio<span className="text-[#14302c]">.</span>
        </p>

        <div className="flex gap-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={String(i)}
              className={cn("size-2.5 rounded-full bg-[#0a1f1c]/75", !reduced && "animate-pulse")}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-[#0a1f1c]/15" aria-hidden>
        {!reduced && (
          <span className="page-loader-bar block h-full w-[34%] rounded-r-full bg-[#0a1f1c]/45" />
        )}
      </div>
    </div>
  );
}
