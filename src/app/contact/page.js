import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import { contactMetadata } from "@/lib/seo/metadata";

export const metadata = contactMetadata;

export default function ContactPage() {
  return (
    <>
      <Contact variant="page" />
      <Footer />
    </>
  );
}
