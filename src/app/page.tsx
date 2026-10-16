import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { listPublishedProjects } from "@/lib/projects";

// Re-rendered on demand by the CMS (revalidatePath); hourly as a fallback.
export const revalidate = 3600;

export default async function Home() {
  const projects = await listPublishedProjects();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work projects={projects} />
        <Achievements />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
