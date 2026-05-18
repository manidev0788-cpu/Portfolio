import ProjectsPage from "@/sections/ProjectsPage";
import Footer from "@/components/Footer";
import { projectsMetadata } from "@/lib/seo/metadata";

export const metadata = projectsMetadata;

export default function ProjectsRoute() {
  return (
    <>
      <ProjectsPage />
      <Footer />
    </>
  );
}
