import type { MetadataRoute } from "next";
import { listPublishedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await listPublishedProjects();
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      lastModified: new Date(p.updated_at),
      priority: 0.8,
    })),
  ];
}
