"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

export function Work() {
  const { t } = useLocale();

  return (
    <section id="work" className="section-pad border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="section-title">{t.work.heading}</h2>
          <p className="mt-4 max-w-xl text-[var(--ink-muted)]">{t.work.sub}</p>
        </Reveal>

        <div className="mt-12 space-y-0">
          {t.work.cases.map((c, i) => (
            <Reveal key={c.title}>
              <article
                className={`grid gap-6 border-[var(--line)] py-10 md:grid-cols-[1fr_1.2fr] md:gap-12 ${
                  i === 0 ? "border-t" : ""
                } border-b`}
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--pink)]">
                    {c.tag}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--ink)] sm:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 inline-flex text-xs font-medium tracking-wide text-[var(--ink-muted)]">
                    {t.work.metricSlot}
                  </p>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-[var(--ink-soft)]">
                    {c.summary}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {c.outcome}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
