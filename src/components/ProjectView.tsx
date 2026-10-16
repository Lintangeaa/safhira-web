"use client";

import Image from "next/image";
import Link from "next/link";
import { RichText } from "@/components/RichText";
import { useLocale } from "@/components/LocaleProvider";
import { localize, type Project } from "@/lib/project-types";

export function ProjectView({ project }: { project: Project }) {
  const { t, locale } = useLocale();
  const copy = localize(project, locale);

  return (
    <article className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
      <Link
        href="/#work"
        className="text-sm text-[var(--ink-muted)] transition hover:text-[var(--pink-deep)]"
      >
        ← {t.work.back}
      </Link>

      {project.tag ? <p className="eyebrow mt-8">{project.tag}</p> : null}
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] tracking-[-0.03em] text-[var(--ink)]">
        {copy.title}
      </h1>
      {copy.summary ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
          {copy.summary}
        </p>
      ) : null}

      {project.cover_url ? (
        <div className="card relative mt-10 aspect-[16/9] overflow-hidden">
          <Image
            src={project.cover_url}
            alt=""
            fill
            preload
            sizes="(min-width: 896px) 832px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {project.metrics.length > 0 ? (
        <dl className="mt-10 grid gap-3 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="card p-6">
              <dt className="sr-only">{m.label}</dt>
              <dd className="font-[family-name:var(--font-display)] text-4xl text-[var(--pink-deep)]">
                {m.value}
              </dd>
              <dd className="mt-1 text-sm text-[var(--ink-muted)]">{m.label}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {copy.body ? (
        <div className="mt-8">
          <RichText text={copy.body} />
        </div>
      ) : null}

      {copy.outcome ? (
        <div className="card card-ink mt-12 p-8">
          <p className="eyebrow !text-[var(--pink-soft)]">{t.work.results}</p>
          <p className="mt-3 text-lg leading-relaxed">{copy.outcome}</p>
        </div>
      ) : null}

      {project.gallery.length > 0 ? (
        <section className="mt-14">
          <h2 className="section-title">{t.work.artifacts}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover relative block aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 416px, 100vw"
                  className="object-contain p-3"
                />
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
