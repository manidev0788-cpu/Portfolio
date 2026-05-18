import Footer from "@/components/Footer";
import ExpertisePage from "@/sections/ExpertisePage";
import { expertiseMetadata } from "@/lib/seo/metadata";

export const metadata = expertiseMetadata;

export default function ExpertiseRoute() {
  return (
    <>
      <ExpertisePage />
      <Footer />
    </>
  );
}
