"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLocale } from "@/components/LocaleProvider";
import { localize, type Project } from "@/lib/project-types";

export function Work({ projects }: { projects: Project[] }) {
  const { t, locale } = useLocale();

  return (
    <section id="work" className="section-pad">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading index="03" title={t.work.heading} sub={t.work.sub} />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {projects.length > 0
            ? projects.map((p, i) => {
                const copy = localize(p, locale);
                return (
                  <Reveal key={p.id} className="h-full">
                    <Link
                      href={`/work/${p.slug}`}
                      className="card card-hover group flex h-full flex-col overflow-hidden"
                    >
                      {p.cover_url ? (
                        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--cream-deep)]">
                          <Image
                            src={p.cover_url}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 360px, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-7">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--pink-deep)]">
                            {p.tag}
                          </span>
                          <span className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]/10 transition-colors group-hover:text-[var(--pink)]/40">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--ink)]">
                          {copy.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                          {copy.summary}
                        </p>
                        <p className="mt-6 border-t border-[var(--line)] pt-5 text-sm font-medium text-[var(--ink)] transition group-hover:text-[var(--pink-deep)]">
                          {t.work.readCase} →
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })
            : t.work.cases.map((c, i) => (
                <Reveal key={c.title} className="h-full">
                  <article className="card card-hover group flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--pink-deep)]">
                        {c.tag.replace(/^\d+\s·\s/, "")}
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]/10 transition-colors group-hover:text-[var(--pink)]/40">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--ink)]">
                      {c.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {c.summary}
                    </p>
                    <p className="mt-6 border-t border-[var(--line)] pt-5 text-sm leading-relaxed text-[var(--ink-muted)]">
                      <span className="text-[var(--pink-deep)]">→ </span>
                      {c.outcome}
                    </p>
                  </article>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
