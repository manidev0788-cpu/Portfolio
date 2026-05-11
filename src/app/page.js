import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import KeySkills from "@/sections/KeySkills";
import Contact from "@/sections/Contact";
import Faq from "@/sections/Faq";
import ImpactExpertise from "@/sections/ImpactExpertise";
import Services from "@/sections/Services";
import SkillsMarquee from "@/sections/SkillsMarquee";
import Workflow from "@/sections/Workflow";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col scroll-mt-28">
      <main className="flex min-h-dvh flex-1 flex-col">
        <Hero />
        <SkillsMarquee />
        <About />
        <KeySkills />
        <Services />
        <ImpactExpertise />
        <Workflow />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
