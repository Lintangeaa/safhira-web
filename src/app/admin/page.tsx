import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { listAllProjects } from "@/lib/projects";
import { logout, togglePublished } from "./actions";

export default async function AdminHome() {
  await requireAdmin();
  const projects = await listAllProjects();
  const dbReady = Boolean(getSql());

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">CMS</p>
          <h1 className="section-title mt-2 !text-3xl">Portofolio</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="btn btn-ghost" target="_blank">
            Lihat situs ↗
          </Link>
          <Link href="/admin/projects/new" className="btn btn-primary">
            + Proyek baru
          </Link>
          <form action={logout}>
            <button className="btn btn-ghost">Keluar</button>
          </form>
        </div>
      </header>

      {!dbReady ? (
        <p className="card mt-8 p-5 text-sm text-red-700">
          DATABASE_URL belum diset — data tidak bisa disimpan.
        </p>
      ) : null}

      <ul className="mt-8 grid gap-3">
        {projects.length === 0 ? (
          <li className="card p-8 text-center text-[var(--ink-muted)]">
            Belum ada proyek. Selama kosong, beranda menampilkan 3 studi kasus bawaan.
          </li>
        ) : (
          projects.map((p) => (
            <li key={p.id} className="card flex flex-wrap items-center gap-4 p-4">
              <span
                className={`chip text-xs ${p.published ? "!border-green-600/30 !text-green-700" : ""}`}
              >
                {p.published ? "Publik" : "Draft"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-[var(--ink)]">{p.title_en}</p>
                <p className="text-xs text-[var(--ink-muted)]">
                  /work/{p.slug} · urutan {p.sort_order}
                </p>
              </div>
              <form action={togglePublished}>
                <input type="hidden" name="id" value={p.id} />
                <button className="btn btn-ghost px-4 py-2 text-xs">
                  {p.published ? "Jadikan draft" : "Publikasikan"}
                </button>
              </form>
              <Link href={`/admin/projects/${p.id}`} className="btn btn-primary px-4 py-2 text-xs">
                Edit
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
