"use client";

/* eslint-disable @next/next/no-img-element -- admin previews of arbitrary URLs */
import { useActionState, useState, useTransition } from "react";
import type { Project } from "@/lib/project-types";
import { saveProject, uploadImage } from "../actions";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
      {hint ? <span className="ml-2 text-xs text-[var(--ink-muted)]">{hint}</span> : null}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function UploadButton({
  multiple,
  onUploaded,
}: {
  multiple?: boolean;
  onUploaded: (url: string) => void;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string>();

  return (
    <span className="inline-flex items-center gap-3">
      <label className="btn btn-ghost cursor-pointer px-4 py-2 text-xs">
        {pending ? "Mengunggah…" : "Unggah gambar"}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="sr-only"
          disabled={pending}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            e.target.value = "";
            setError(undefined);
            start(async () => {
              for (const file of files) {
                const data = new FormData();
                data.set("file", file);
                const res = await uploadImage(data);
                if (res.url) onUploaded(res.url);
                else setError(res.error);
              }
            });
          }}
        />
      </label>
      {error ? <span className="text-xs text-red-700">{error}</span> : null}
    </span>
  );
}

export function ProjectForm({ project }: { project?: Project }) {
  const [state, action, pending] = useActionState(saveProject, undefined);
  const [cover, setCover] = useState(project?.cover_url ?? "");
  const [gallery, setGallery] = useState<string[]>(project?.gallery ?? []);

  return (
    <form action={action} className="mt-8 space-y-6">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="card grid gap-5 p-6 sm:grid-cols-3">
        <Field label="Slug" hint="URL: /work/slug">
          <input name="slug" required defaultValue={project?.slug} placeholder="prd-absensi" className="field" />
        </Field>
        <Field label="Tag" hint="mis. Discovery">
          <input name="tag" defaultValue={project?.tag} className="field" />
        </Field>
        <Field label="Urutan" hint="kecil = duluan">
          <input name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} className="field" />
        </Field>
        <label className="flex items-center gap-2 text-sm sm:col-span-3">
          <input type="checkbox" name="published" defaultChecked={project?.published} className="h-4 w-4 accent-[var(--pink)]" />
          Publikasikan (tampil di situs)
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {(["en", "id"] as const).map((lang) => (
          <div key={lang} className="card space-y-5 p-6">
            <p className="eyebrow">{lang === "en" ? "English" : "Bahasa Indonesia (opsional)"}</p>
            <Field label="Judul">
              <input name={`title_${lang}`} required={lang === "en"} defaultValue={project?.[`title_${lang}`]} className="field" />
            </Field>
            <Field label="Ringkasan" hint="tampil di kartu">
              <textarea name={`summary_${lang}`} rows={3} defaultValue={project?.[`summary_${lang}`]} className="field" />
            </Field>
            <Field label="Isi studi kasus" hint="## judul · - poin · baris kosong = paragraf">
              <textarea name={`body_${lang}`} rows={12} defaultValue={project?.[`body_${lang}`]} className="field font-mono text-sm" />
            </Field>
            <Field label="Hasil / dampak">
              <textarea name={`outcome_${lang}`} rows={3} defaultValue={project?.[`outcome_${lang}`]} className="field" />
            </Field>
          </div>
        ))}
      </div>

      <div className="card space-y-5 p-6">
        <Field label="Metrik" hint="satu per baris: nilai | label">
          <textarea
            name="metrics"
            rows={3}
            placeholder={"40% | Faster approval flow\n3 | Schools onboarded"}
            defaultValue={project?.metrics.map((m) => `${m.value} | ${m.label}`).join("\n")}
            className="field font-mono text-sm"
          />
        </Field>

        <div>
          <Field label="Gambar sampul">
            <input name="cover_url" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://…" className="field" />
          </Field>
          <div className="mt-3 flex items-center gap-4">
            <UploadButton onUploaded={setCover} />
            {cover ? <img src={cover} alt="" className="h-16 rounded-lg border border-[var(--line)] object-cover" /> : null}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-[var(--ink)]">Artefak</span>
          <span className="ml-2 text-xs text-[var(--ink-muted)]">PRD, BPMN, ERD, wireframe…</span>
          <input type="hidden" name="gallery" value={gallery.join("\n")} />
          <div className="mt-3 flex flex-wrap gap-3">
            {gallery.map((url) => (
              <div key={url} className="relative">
                <img src={url} alt="" className="h-24 w-32 rounded-lg border border-[var(--line)] bg-white object-contain" />
                <button
                  type="button"
                  onClick={() => setGallery((g) => g.filter((u) => u !== url))}
                  className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--ink)] text-xs text-white"
                  aria-label="Hapus gambar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <UploadButton multiple onUploaded={(url) => setGallery((g) => [...g, url])} />
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 flex items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
          {pending ? "Menyimpan…" : "Simpan"}
        </button>
        {state?.error ? <p className="text-sm text-red-700" role="alert">{state.error}</p> : null}
        {state?.ok ? <p className="text-sm text-green-700" role="status">{state.ok}</p> : null}
      </div>
    </form>
  );
}

export function DeleteButton() {
  return (
    <button
      className="text-sm text-red-700 hover:underline"
      onClick={(e) => {
        if (!confirm("Hapus proyek ini permanen?")) e.preventDefault();
      }}
    >
      Hapus proyek ini permanen
    </button>
  );
}
