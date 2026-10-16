import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ProjectView } from "@/components/ProjectView";
import { getProjectBySlug, listPublishedProjects } from "@/lib/projects";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await listPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title_en} — Safhira Nanda`,
    description: project.summary_en,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: project.cover_url ? { images: [project.cover_url] } : undefined,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main>
        <ProjectView project={project} />
      </main>
      <Footer />
    </>
  );
}
