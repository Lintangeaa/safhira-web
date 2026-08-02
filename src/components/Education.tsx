"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

export function Education() {
  const { t } = useLocale();

  return (
    <section
      id="education"
      className="section-pad border-t border-[var(--line)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="section-title">{t.education.heading}</h2>
        </Reveal>

        <div className="mt-12 space-y-10">
          {t.education.items.map((item) => (
            <Reveal key={item.school}>
              <article>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                  {item.school}
                </h3>
                <p className="mt-1 font-medium text-[var(--ink)]">{item.degree}</p>
                <p className="mt-2 text-sm text-[var(--ink-muted)]">{item.meta}</p>
                {item.note ? (
                  <p className="mt-1 text-sm text-[var(--pink)]">{item.note}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
