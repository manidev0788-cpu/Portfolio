import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import SkillsMarquee from "@/sections/SkillsMarquee";
import {
  About,
  Contact,
  Faq,
  ImpactExpertise,
  KeySkills,
  Services,
  Workflow,
} from "@/lib/dynamic-sections";
import { homeMetadata } from "@/lib/seo/metadata";

export const metadata = homeMetadata;

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col scroll-mt-28">
      <main id="main-content" className="flex min-h-dvh flex-1 flex-col" aria-label="Home page">
        <Hero />
        <SkillsMarquee />
        <div className="section-deferred">
          <About />
        </div>
        <div className="section-deferred">
          <KeySkills />
        </div>
        <div className="section-deferred">
          <Services />
        </div>
        <div className="section-deferred">
          <ImpactExpertise />
        </div>
        <div className="section-deferred">
          <Workflow />
        </div>
        <div className="section-deferred">
          <Faq />
        </div>
        <div className="section-deferred">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
