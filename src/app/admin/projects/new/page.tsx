import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "../ProjectForm";

export default async function NewProjectPage() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin" className="text-sm text-[var(--ink-muted)] hover:text-[var(--pink-deep)]">
        ← Semua proyek
      </Link>
      <h1 className="section-title mt-4 !text-3xl">Proyek baru</h1>
      <ProjectForm />
    </>
  );
}
