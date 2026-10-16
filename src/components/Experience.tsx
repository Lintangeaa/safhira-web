"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLocale } from "@/components/LocaleProvider";

export function Experience() {
  const { t } = useLocale();

  return (
    <section id="experience" className="section-pad">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="02" title={t.experience.heading} />
        </Reveal>

        <div className="timeline mt-10 space-y-5">
          {t.experience.items.map((item) => (
            <Reveal key={`${item.company}-${item.period}`}>
              <article className="relative pl-9">
                <span className="timeline-dot" aria-hidden />
                <div className="card card-hover p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                        {item.role}
                      </h3>
                      <p className="mt-1 font-medium text-[var(--ink-soft)]">
                        {item.company}
                        <span className="font-normal text-[var(--ink-muted)]">
                          {" "}
                          · {item.place}
                        </span>
                      </p>
                    </div>
                    <span className="chip shrink-0 text-xs">{item.period}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {item.blurb}
                  </p>
                  <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 text-sm leading-relaxed text-[var(--ink-soft)] before:absolute before:left-0 before:top-0 before:text-[var(--pink)] before:content-['✓']"
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
