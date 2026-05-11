import Footer from "@/components/Footer";
import ExpertisePage from "@/sections/ExpertisePage";

export const metadata = {
  title: "Our Expertise — Portfolio",
  description:
    "AI automation, full stack development, CMS and eCommerce, and hosting with performance discipline—expanded from the homepage expertise section.",
};

export default function ExpertiseRoute() {
  return (
    <>
      <ExpertisePage />
      <Footer />
    </>
  );
}
