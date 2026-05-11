"use client";

import PageLoader from "@/components/PageLoader";
import { SmoothScroll } from "./smooth-scroll";

export function AppProviders({ children }) {
  return (
    <SmoothScroll>
      <PageLoader />
      {children}
    </SmoothScroll>
  );
}
