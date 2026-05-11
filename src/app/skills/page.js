import Footer from "@/components/Footer";
import SkillsPage from "@/sections/SkillsPage";

export const metadata = {
  title: "My Skills — Portfolio",
  description:
    "Long-form breakdown of frontend, backend & database, CMS and eCommerce, core delivery services, and AI-enabled solutions—with practical delivery context.",
};

export default function SkillsRoute() {
  return (
    <>
      <SkillsPage />
      <Footer />
    </>
  );
}
