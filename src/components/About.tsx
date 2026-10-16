"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLocale } from "@/components/LocaleProvider";

export function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="01" title={t.about.heading} />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="card h-full p-7 sm:p-9">
              <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--ink)] max-sm:text-xl sm:text-[1.75rem]">
                {t.about.body}
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="card card-ink flex h-full flex-col justify-between gap-8 p-7">
              <span className="font-[family-name:var(--font-display)] text-6xl text-[var(--pink-soft)]">
                12
              </span>
              <p className="text-sm leading-relaxed text-[var(--cream)]/80">
                {t.about.leadership}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
