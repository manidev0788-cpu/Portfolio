"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import "@/styles/lenis.css";

export function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      gestureOrientation: "vertical",
    });

    let frame = 0;

    function onFrame(ms) {
      lenis.raf(ms);
      frame = requestAnimationFrame(onFrame);
    }

    frame = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}
