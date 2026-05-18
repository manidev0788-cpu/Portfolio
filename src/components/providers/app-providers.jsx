"use client";

import FloatingSocials from "@/components/FloatingSocials";
import PageLoader from "@/components/PageLoader";
import { SmoothScroll } from "./smooth-scroll";

export function AppProviders({ children }) {
  return (
    <SmoothScroll>
      <PageLoader />
      {children}
      <FloatingSocials />
    </SmoothScroll>
  );
}
