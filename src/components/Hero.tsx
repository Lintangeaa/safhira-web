"use client";

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

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-24">
        <div className="relative z-10">
          <p
            data-reveal
            className="reveal mb-4 text-sm font-medium tracking-wide text-[var(--pink)]"
          >
            {t.hero.availability}
          </p>

          <h1
            data-reveal
            className="reveal font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,5.25rem)] leading-[0.95] tracking-[-0.03em] text-[var(--ink)]"
          >
            {site.brand}
          </h1>

          <p
            data-reveal
            className="reveal mt-5 text-lg font-medium text-[var(--ink)] sm:text-xl"
          >
            {t.hero.title}
          </p>
          <p
            data-reveal
            className="reveal mt-1 text-sm text-[var(--ink-muted)]"
          >
            {t.hero.openLine}
          </p>
          <p
            data-reveal
            className="reveal mt-2 text-sm text-[var(--ink-muted)]"
          >
            {t.hero.location}
          </p>

          <p
            data-reveal
            className="reveal mt-6 max-w-md text-base leading-relaxed text-[var(--ink-soft)]"
          >
            {t.hero.supporting}
          </p>

          <div data-reveal className="reveal mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center bg-[var(--pink)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--pink-deep)]"
            >
              {t.hero.ctaEmail}
            </a>
            <a
              href={cvHref}
              target={site.cvUrl ? "_blank" : undefined}
              rel={site.cvUrl ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center border border-[var(--ink)]/20 bg-white/50 px-5 py-3 text-sm font-medium text-[var(--ink)] backdrop-blur-sm transition hover:border-[var(--pink)] hover:text-[var(--pink)]"
            >
              {t.hero.ctaCv}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-[var(--ink-muted)] underline-offset-4 transition hover:text-[var(--pink)] hover:underline"
            >
              {t.hero.ctaContact}
            </a>
          </div>
        </div>

        <div
          data-reveal
          className="reveal relative z-10 h-[min(70vh,560px)] w-full lg:h-[min(78vh,640px)]"
        >
          <div className="hero-photo-frame">
            {site.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.photoUrl}
                alt={t.hero.photoAlt}
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
        </div>
      </div>
    </section>
  );
}
