import { Plus, Sparkles, Star } from "lucide-react";

import { cn } from "@/utils/cn";

const SKILLS = [
  "AI AUTOMATION",
  "FULL STACK DEVELOPMENT",
  "NEXT.JS DEVELOPMENT",
  "WORDPRESS DEVELOPMENT",
  "SHOPIFY DEVELOPMENT",
  "WEBSITE DEVELOPMENT",
  "UI/UX DESIGN",
  "HOSTING MANAGEMENT",
  "CMS DEVELOPMENT",
  "SEO OPTIMIZATION",
];

const SEPARATORS = [Star, Sparkles, Plus];

function MarqueeItems({ idPrefix, hidden }) {
  return SKILLS.map((label, i) => {
    const Icon = SEPARATORS[i % SEPARATORS.length];
    return (
      <span
        key={`${idPrefix}-${label}-${String(i)}`}
        className="inline-flex shrink-0 items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10"
        aria-hidden={hidden ? true : undefined}
      >
        <Icon
          className="size-[0.7rem] shrink-0 text-surface-deep/72 sm:size-[0.8rem]"
          aria-hidden
          strokeWidth={2}
        />
        <span className="whitespace-nowrap text-[0.75rem] font-bold uppercase leading-none tracking-[0.14em] text-surface-deep sm:text-[0.8125rem] md:text-[0.875rem]">
          {label}
        </span>
      </span>
    );
  });
}

export default function SkillsMarquee() {
  return (
    <section
      className="relative w-full overflow-hidden bg-surface-deep"
      aria-label="Skills and services"
    >
      <p className="sr-only">
        Featured skills and services include: {SKILLS.join("; ")}.
      </p>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        className={cn(
          "marquee-skills__viewport relative z-0 w-full overflow-hidden",
          "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
        )}
      >
        <div
          className={cn(
            "marquee-skills__track flex w-max",
            "bg-[linear-gradient(98deg,#7cf7d4_0%,#9febd4_38%,#c8f5a8_72%,#d9ff63_100%)]",
            "py-[1.125rem] sm:py-5 md:py-[1.375rem]",
            "shadow-[inset_0_1px_0_rgb(255_255_255_/0.22),inset_0_-1px_0_rgb(0_0_0_/0.06)]"
          )}
          style={{ "--marquee-skills-duration": "72s" }}
        >
          <div className="flex shrink-0 items-center gap-6 px-6 sm:gap-8 sm:px-10 md:gap-10 md:px-14">
            <MarqueeItems idPrefix="a" hidden={false} />
            <MarqueeItems idPrefix="b" hidden />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
