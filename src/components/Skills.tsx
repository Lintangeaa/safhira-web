"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLocale } from "@/components/LocaleProvider";

export function Skills() {
  const { t } = useLocale();

  return (
    <section id="skills" className="section-pad">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="06" title={t.skills.heading} />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {t.skills.groups.map((group) => (
            <Reveal key={group.label} className="h-full">
              <div className="card h-full p-7">
                <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--pink-deep)]">
                  {group.label}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
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
