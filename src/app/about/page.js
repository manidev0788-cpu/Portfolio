import AboutPage from "@/sections/AboutPage";
import Footer from "@/components/Footer";
import { aboutMetadata } from "@/lib/seo/metadata";

export const metadata = aboutMetadata;

export default function AboutUsPage() {
  return (
    <>
      <AboutPage />
      <Footer />
    </>
  );
}
