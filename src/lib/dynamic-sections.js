import dynamic from "next/dynamic";

/** Below-fold home sections — split JS bundles for faster initial load */
export const About = dynamic(() => import("@/sections/About"));
export const KeySkills = dynamic(() => import("@/sections/KeySkills"));
export const Services = dynamic(() => import("@/sections/Services"));
export const ImpactExpertise = dynamic(() => import("@/sections/ImpactExpertise"));
export const Workflow = dynamic(() => import("@/sections/Workflow"));
export const Faq = dynamic(() => import("@/sections/Faq"));
export const Contact = dynamic(() => import("@/sections/Contact"));
