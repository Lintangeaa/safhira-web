"use client";

import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";

export function Skills() {
  const { t } = useLocale();

  return (
    <section id="skills" className="section-pad border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="section-title">{t.skills.heading}</h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {t.skills.groups.map((group) => (
            <Reveal key={group.label}>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--pink)]">
                  {group.label}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-[var(--ink-soft)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
