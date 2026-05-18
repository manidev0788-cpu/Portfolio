import Footer from "@/components/Footer";
import SkillsPage from "@/sections/SkillsPage";
import { skillsMetadata } from "@/lib/seo/metadata";

export const metadata = skillsMetadata;

export default function SkillsRoute() {
  return (
    <>
      <SkillsPage />
      <Footer />
    </>
  );
}
