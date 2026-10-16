"use server";

import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  isPasswordCorrect,
  requireAdmin,
} from "@/lib/auth";
import { getSql } from "@/lib/db";
import type { Metric } from "@/lib/project-types";
import { getProjectById } from "@/lib/projects";
import { clientIp, rateLimit } from "@/lib/request";

export type FormState = { error?: string; ok?: string } | undefined;

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  if (!(await rateLimit("login", await clientIp(), 5, 15))) {
    return { error: "Terlalu banyak percobaan. Coba lagi 15 menit lagi." };
  }
  if (!isPasswordCorrect(String(formData.get("password") ?? ""))) {
    return { error: "Password salah." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

function db() {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL belum diset.");
  return sql;
}

function revalidatePublic(...slugs: string[]) {
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  for (const slug of slugs) revalidatePath(`/work/${slug}`);
}

function parseMetrics(raw: string): Metric[] {
  return raw
    .split("\n")
    .map((line) => line.split("|").map((part) => part.trim()))
    .filter(([value, label]) => value && label)
    .map(([value, label]) => ({ value, label }));
}

function parseUrls(raw: string): string[] {
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => /^https:\/\//.test(s));
}

export async function saveProject(
  _: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const sql = db();

  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const id = Number(formData.get("id")) || null;
  const slug = text("slug").toLowerCase();
  const titleEn = text("title_en");

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug hanya huruf kecil, angka, dan tanda hubung (contoh: prd-absensi)." };
  }
  if (!titleEn) return { error: "Judul (EN) wajib diisi." };

  const coverUrl = parseUrls(text("cover_url"))[0] ?? null;
  const values = {
    slug,
    published: formData.get("published") === "on",
    sort_order: Number(formData.get("sort_order")) || 0,
    tag: text("tag"),
    cover_url: coverUrl,
    title_en: titleEn,
    title_id: text("title_id"),
    summary_en: text("summary_en"),
    summary_id: text("summary_id"),
    body_en: text("body_en"),
    body_id: text("body_id"),
    outcome_en: text("outcome_en"),
    outcome_id: text("outcome_id"),
    metrics: JSON.stringify(parseMetrics(text("metrics"))),
    gallery: JSON.stringify(parseUrls(text("gallery"))),
  };

  const previous = id ? await getProjectById(id) : null;
  let savedId = id;

  try {
    if (id) {
      await sql`
        update projects set
          slug = ${values.slug}, published = ${values.published},
          sort_order = ${values.sort_order}, tag = ${values.tag},
          cover_url = ${values.cover_url},
          title_en = ${values.title_en}, title_id = ${values.title_id},
          summary_en = ${values.summary_en}, summary_id = ${values.summary_id},
          body_en = ${values.body_en}, body_id = ${values.body_id},
          outcome_en = ${values.outcome_en}, outcome_id = ${values.outcome_id},
          metrics = ${values.metrics}::jsonb, gallery = ${values.gallery}::jsonb,
          updated_at = now()
        where id = ${id}
      `;
    } else {
      const rows = (await sql`
        insert into projects (
          slug, published, sort_order, tag, cover_url,
          title_en, title_id, summary_en, summary_id,
          body_en, body_id, outcome_en, outcome_id, metrics, gallery
        ) values (
          ${values.slug}, ${values.published}, ${values.sort_order}, ${values.tag},
          ${values.cover_url}, ${values.title_en}, ${values.title_id},
          ${values.summary_en}, ${values.summary_id}, ${values.body_en},
          ${values.body_id}, ${values.outcome_en}, ${values.outcome_id},
          ${values.metrics}::jsonb, ${values.gallery}::jsonb
        ) returning id
      `) as { id: number }[];
      savedId = rows[0].id;
    }
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      return { error: "Slug sudah dipakai proyek lain." };
    }
    throw err;
  }

  revalidatePublic(slug, ...(previous && previous.slug !== slug ? [previous.slug] : []));
  if (!id) redirect(`/admin/projects/${savedId}?saved=1`);
  return { ok: "Tersimpan." };
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const project = await getProjectById(id);
  if (!project) return;

  await db()`delete from projects where id = ${id}`;

  const blobs = [project.cover_url, ...project.gallery].filter(
    (url): url is string => !!url && url.includes(".blob.vercel-storage.com"),
  );
  if (blobs.length) await del(blobs).catch(() => {});

  revalidatePublic(project.slug);
  redirect("/admin");
}

export async function togglePublished(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const rows = (await db()`
    update projects set published = not published, updated_at = now()
    where id = ${id} returning slug
  `) as { slug: string }[];
  if (rows[0]) revalidatePublic(rows[0].slug);
}

const MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024;

export async function uploadImage(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "File kosong." };
  if (!file.type.startsWith("image/")) return { error: "Hanya file gambar." };
  if (file.size > MAX_UPLOAD_BYTES) return { error: "Maksimal 4.5 MB." };

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const blob = await put(`portfolio/${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return { url: blob.url };
}
