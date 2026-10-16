import "server-only";
import { getSql } from "@/lib/db";
import type { Project } from "@/lib/project-types";

export type { Project } from "@/lib/project-types";

async function query(published: boolean): Promise<Project[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    return (await (published
      ? sql`select * from projects where published order by sort_order, created_at desc`
      : sql`select * from projects order by sort_order, created_at desc`)) as Project[];
  } catch (err) {
    // Keep the public site up if the DB is unreachable or not migrated yet.
    console.error("[projects] query failed", err);
    return [];
  }
}

export const listPublishedProjects = () => query(true);
export const listAllProjects = () => query(false);

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const sql = getSql();
  if (!sql) return null;
  const rows = (await sql`
    select * from projects where slug = ${slug} and published limit 1
  `) as Project[];
  return rows[0] ?? null;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const sql = getSql();
  if (!sql) return null;
  const rows = (await sql`select * from projects where id = ${id} limit 1`) as Project[];
  return rows[0] ?? null;
}
