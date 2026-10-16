import "server-only";
import { headers } from "next/headers";
import { getSql } from "@/lib/db";

export async function clientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Records one event and returns false when `ip` already hit `max` events of
 * this kind within the window. Allows everything when no database is set.
 */
export async function rateLimit(
  kind: string,
  ip: string,
  max: number,
  windowMinutes: number,
): Promise<boolean> {
  const sql = getSql();
  if (!sql) return true;

  const rows = (await sql`
    select count(*)::int as n from rate_events
    where kind = ${kind} and ip = ${ip}
      and created_at > now() - make_interval(mins => ${windowMinutes})
  `) as { n: number }[];
  if (rows[0].n >= max) return false;

  await sql`insert into rate_events (kind, ip) values (${kind}, ${ip})`;
  await sql`delete from rate_events where created_at < now() - interval '1 day'`;
  return true;
}
