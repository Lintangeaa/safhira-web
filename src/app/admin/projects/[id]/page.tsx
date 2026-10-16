import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getProjectById } from "@/lib/projects";
import { deleteProject } from "../../actions";
import { DeleteButton, ProjectForm } from "../ProjectForm";

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { saved } = await searchParams;
  const project = await getProjectById(Number(id));
  if (!project) notFound();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin" className="text-sm text-[var(--ink-muted)] hover:text-[var(--pink-deep)]">
          ← Semua proyek
        </Link>
        {project.published ? (
          <Link href={`/work/${project.slug}`} target="_blank" className="btn btn-ghost px-4 py-2 text-xs">
            Lihat halaman ↗
          </Link>
        ) : null}
      </div>
      <h1 className="section-title mt-4 !text-3xl">Edit: {project.title_en}</h1>
      {saved ? <p className="mt-2 text-sm text-green-700">Proyek dibuat.</p> : null}
      <ProjectForm project={project} />

      <form action={deleteProject} className="mt-12 border-t border-[var(--line)] pt-6">
        <input type="hidden" name="id" value={project.id} />
        <DeleteButton />
      </form>
    </>
  );
}
