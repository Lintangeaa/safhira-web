"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

export function Hero() {
  const { t } = useLocale();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      root.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }
    requestAnimationFrame(() => {
      root.querySelectorAll("[data-reveal]").forEach((el, i) => {
        window.setTimeout(() => el.classList.add("is-visible"), 80 * i);
      });
    });
  }, []);

  const cvHref = site.cvUrl || "#contact";

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0 hero-atmosphere" aria-hidden />
      <div
        className="hero-blob -left-24 top-24 h-72 w-72 bg-[var(--pink-soft)]"
        aria-hidden
      />
      <div
        className="hero-blob right-0 bottom-10 h-80 w-80 bg-[#f6c9a8]"
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24">
        <div className="relative z-10">
          <p
            data-reveal
            className="reveal inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-white/60 px-3.5 py-1.5 text-xs font-medium text-[var(--ink-soft)] backdrop-blur"
          >
            <span className="pulse-dot" aria-hidden />
            {t.hero.badge}
          </p>

          {/* LCP candidates stay visible on first paint (no reveal fade). */}
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(3.25rem,9vw,6rem)] leading-[0.92] tracking-[-0.04em] text-[var(--ink)]">
            Safhira <span className="text-gradient italic">Nanda</span>
          </h1>

          <p
            data-reveal
            className="reveal mt-6 text-xl font-medium text-[var(--ink)] sm:text-2xl"
          >
            {t.hero.title}
            <span className="text-[var(--ink-muted)]"> · {t.hero.openLine}</span>
          </p>

          <p
            data-reveal
            className="reveal mt-4 max-w-lg text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg"
          >
            {t.hero.supporting}
          </p>

          <div data-reveal className="reveal mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-primary">
              {t.hero.ctaEmail}
              <span aria-hidden>→</span>
            </a>
            <a
              href={cvHref}
              target={site.cvUrl ? "_blank" : undefined}
              rel={site.cvUrl ? "noopener noreferrer" : undefined}
              className="btn btn-ghost"
            >
              {t.hero.ctaCv}
              <span aria-hidden>↓</span>
            </a>
          </div>

          <dl
            data-reveal
            className="reveal mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-[var(--line)] pt-6"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)] sm:text-4xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-[var(--ink-muted)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative z-10 h-[min(70vh,560px)] w-full lg:h-[min(78vh,640px)]">
          <div className="hero-photo-frame">
            {site.photoUrl ? (
              <Image
                src={site.photoUrl}
                alt={t.hero.photoAlt}
                fill
                preload
                sizes="(min-width: 1024px) 560px, 100vw"
                className="hero-photo-img"
              />
            ) : (
              <div className="absolute inset-0 z-[1] flex flex-col items-end justify-end p-8">
                <span className="font-[family-name:var(--font-display)] text-6xl text-[var(--pink)]/40 sm:text-7xl">
                  SN
                </span>
                <span className="mt-2 text-sm text-[var(--ink-muted)]">
                  {t.hero.photoPending}
                </span>
              </div>
            )}
          </div>

          <div
            data-reveal
            className="reveal card absolute -left-3 bottom-8 z-10 flex items-center gap-3 px-4 py-3 sm:-left-8"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--pink)] text-sm font-semibold text-white">
              PM
            </span>
            <div className="text-sm">
              <p className="font-medium text-[var(--ink)]">
                {t.hero.currentRole}
              </p>
              <p className="text-xs text-[var(--ink-muted)]">
                {t.hero.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
