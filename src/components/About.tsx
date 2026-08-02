"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

export function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="section-pad border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="section-title">{t.about.heading}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
            {t.about.body}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-muted)]">
            {t.about.leadership}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
