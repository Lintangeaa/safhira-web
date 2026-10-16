import { dictionaries } from "@/lib/i18n/dictionaries";
import { listPublishedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const revalidate = 3600;

// Plain-text summary for LLM agents (https://llmstxt.org), built from the
// same dictionary as the page so it never drifts.
export async function GET() {
  const t = dictionaries.en;
  const projects = await listPublishedProjects();
  const lines = [
    `# ${site.fullName}`,
    "",
    `> ${t.hero.title}. ${t.hero.availability}. ${t.hero.supporting}`,
    "",
    `Location: ${site.location}`,
    `Email: ${site.email}`,
    `LinkedIn: ${site.linkedin}`,
    `CV (PDF): ${site.cvUrl}`,
    "",
    "## About",
    t.about.body,
    "",
    "## Experience",
    ...t.experience.items.flatMap((item) => [
      `### ${item.role} — ${item.company} (${item.period})`,
      ...item.points.map((point) => `- ${point}`),
      "",
    ]),
    ...(projects.length
      ? [
          "## Case studies",
          ...projects.map(
            (p) => `- [${p.title_en}](${site.url}/work/${p.slug}): ${p.summary_en}`,
          ),
          "",
        ]
      : []),
    "## Links",
    `- [Portfolio](${site.url})`,
    `- [Contact form](${site.url}/#contact)`,
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
