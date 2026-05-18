"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import "@/styles/lenis.css";

function shouldEnableSmoothScroll() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  /** Coarse pointers: prefer native scroll for better mobile performance */
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  return true;
}

export function SmoothScroll({ children }) {
  useEffect(() => {
    if (!shouldEnableSmoothScroll()) return undefined;

    let lenis;
    let frame = 0;
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      lenis = new Lenis({
        smoothWheel: true,
        gestureOrientation: "vertical",
        lerp: 0.09,
      });

      function onFrame(ms) {
        lenis.raf(ms);
        frame = requestAnimationFrame(onFrame);
      }

      frame = requestAnimationFrame(onFrame);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(init, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
        cancelAnimationFrame(frame);
        lenis?.destroy();
      };
    }

    const timeoutId = window.setTimeout(init, 1);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return children;
}
