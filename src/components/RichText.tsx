import type { ReactNode } from "react";

/**
 * Tiny, safe formatter for CMS text: blank line = new paragraph,
 * "## " = heading, "- " lines = bullet list. No HTML is ever injected.
 */
export function RichText({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/);
  const out: ReactNode[] = [];

  blocks.forEach((block, i) => {
    const lines = block.split("\n").filter((l) => l.trim());
    if (lines.length === 0) return;

    if (lines[0].startsWith("## ")) {
      out.push(
        <h3
          key={`h${i}`}
          className="mt-10 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]"
        >
          {lines[0].slice(3)}
        </h3>,
      );
      lines.shift();
      if (lines.length === 0) return;
    }

    if (lines.every((l) => l.startsWith("- "))) {
      out.push(
        <ul key={`u${i}`} className="mt-4 space-y-2">
          {lines.map((l, j) => (
            <li
              key={j}
              className="relative pl-5 before:absolute before:left-0 before:text-[var(--pink)] before:content-['✓']"
            >
              {l.slice(2)}
            </li>
          ))}
        </ul>,
      );
      return;
    }

    out.push(
      <p key={`p${i}`} className="mt-4 whitespace-pre-line">
        {lines.join("\n")}
      </p>,
    );
  });

  return (
    <div className="text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
      {out}
    </div>
  );
}
