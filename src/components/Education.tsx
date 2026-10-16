"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLocale } from "@/components/LocaleProvider";

export function Education() {
  const { t } = useLocale();

  return (
    <section id="education" className="section-pad">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="05" title={t.education.heading} />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.education.items.map((item) => (
            <Reveal key={item.school} className="h-full">
              <article className="card card-hover h-full p-7">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                  {item.school}
                </h3>
                <p className="mt-1 font-medium text-[var(--ink-soft)]">
                  {item.degree}
                </p>
                <p className="mt-4 text-sm text-[var(--ink-muted)]">{item.meta}</p>
                {item.note ? (
                  <p className="chip mt-4 text-xs text-[var(--pink-deep)]">
                    {item.note}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
