import { cn } from "@/utils/cn";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10060]",
        "rounded-full bg-accent-start px-5 py-2.5 text-sm font-semibold text-[#071d1d]",
        "shadow-[0_8px_24px_rgb(124_247_212/0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      )}
    >
      Skip to main content
    </a>
  );
}
