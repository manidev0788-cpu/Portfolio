import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — Portfolio",
  description:
    "Get in touch to discuss your next project — address, phone, and contact form.",
};

export default function ContactPage() {
  return (
    <>
      <Contact variant="page" />
      <Footer />
    </>
  );
}
