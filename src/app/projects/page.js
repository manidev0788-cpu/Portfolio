import ProjectsPage from "@/sections/ProjectsPage";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Projects — Portfolio",
  description:
    "Featured deployments: eCommerce storefront (Marketo XI), school management system, and AI-powered business listings (Listy)—live demos with case-study context.",
};

export default function ProjectsRoute() {
  return (
    <>
      <ProjectsPage />
      <Footer />
    </>
  );
}
