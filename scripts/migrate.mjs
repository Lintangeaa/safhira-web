import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  // Builds without a database (fresh clone, local) skip quietly; on Vercel the
  // Neon integration provides DATABASE_URL so the schema is applied each deploy.
  const msg = "[migrate] DATABASE_URL is not set — skipping.";
  if (process.argv.includes("--optional")) {
    console.log(msg);
    process.exit(0);
  }
  console.error(msg);
  process.exit(1);
}

const sql = neon(url);
const statements = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8")
  .replace(/--.*$/gm, "")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}
console.log(`Applied ${statements.length} statements.`);
