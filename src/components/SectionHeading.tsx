import type { ReactNode } from "react";

export function SectionHeading({
  index,
  title,
  sub,
}: {
  index: string;
  title: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow">{index}</p>
      <h2 className="section-title mt-3">{title}</h2>
      {sub ? (
        <p className="mt-4 max-w-xl text-[var(--ink-muted)]">{sub}</p>
      ) : null}
    </div>
  );
}
