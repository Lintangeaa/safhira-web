import "server-only";
import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

let client: Sql | null | undefined;

/** Returns null when DATABASE_URL is not configured (e.g. fresh local clone). */
export function getSql(): Sql | null {
  if (client === undefined) {
    const url = process.env.DATABASE_URL;
    client = url ? neon(url) : null;
  }
  return client;
}
