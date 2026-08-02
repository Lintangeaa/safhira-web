"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

export function Experience() {
  const { t } = useLocale();

  return (
    <section
      id="experience"
      className="section-pad border-t border-[var(--line)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="section-title">{t.experience.heading}</h2>
        </Reveal>

        <div className="mt-12 space-y-14">
          {t.experience.items.map((item) => (
            <Reveal key={`${item.company}-${item.period}`}>
              <article className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
                <div>
                  <p className="text-sm text-[var(--ink-muted)]">{item.period}</p>
                  <p className="mt-1 text-sm text-[var(--pink)]">{item.place}</p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                    {item.role}
                  </h3>
                  <p className="mt-1 font-medium text-[var(--ink)]">
                    {item.company}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {item.blurb}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-sm leading-relaxed text-[var(--ink-soft)] before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--pink)]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
