"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

const links = [
  { id: "about", key: "about" as const },
  { id: "experience", key: "experience" as const },
  { id: "work", key: "work" as const },
  { id: "achievements", key: "achievements" as const },
  { id: "education", key: "education" as const },
  { id: "skills", key: "skills" as const },
  { id: "contact", key: "contact" as const },
];

function linkClass(active: boolean, mobile = false) {
  if (mobile) {
    return `text-sm transition-colors ${
      active
        ? "font-medium text-[var(--pink)]"
        : "text-[var(--ink)] hover:text-[var(--pink)]"
    }`;
  }
  return `rounded-full px-3 py-1.5 text-sm transition-colors ${
    active
      ? "bg-[var(--ink)] font-medium text-[var(--cream)]"
      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
  }`;
}

export function Nav() {
  const { t, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) {
          // Above first section (hero) — clear active
          if (window.scrollY < (sections[0]?.offsetTop ?? 0) - 80) {
            setActiveId(null);
          }
          return;
        }

        // Prefer the section highest in document order among visible ones
        // with the strongest intersection bias toward the spy band.
        let bestId: string | null = null;
        let bestScore = -1;
        for (const section of sections) {
          const ratio = visible.get(section.id);
          if (ratio === undefined) continue;
          const rect = section.getBoundingClientRect();
          // Score: more visible + closer to upper third of viewport
          const proximity = Math.max(0, 1 - Math.abs(rect.top - 96) / 400);
          const score = ratio * 0.6 + proximity * 0.4;
          if (score > bestScore) {
            bestScore = score;
            bestId = section.id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      {
        // Spy band under sticky nav
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-5 pr-2 transition-[background,box-shadow,border-color] duration-300 ${
          scrolled || open
            ? "border-[var(--line)] bg-[color-mix(in_srgb,var(--cream)_80%,transparent)] shadow-[0_10px_30px_-18px_rgba(42,28,34,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/#top"
          className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--ink)]"
          onClick={() => setActiveId(null)}
        >
          {site.brand}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className={linkClass(active)}
                aria-current={active ? "true" : undefined}
              >
                {t.nav[link.key]}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="flex rounded-full border border-[var(--line)] bg-white/50 p-0.5 text-xs font-medium"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                locale === "en"
                  ? "bg-[var(--pink)] text-white"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("id")}
              className={`rounded-full px-2.5 py-1 transition-colors ${
                locale === "id"
                  ? "bg-[var(--pink)] text-white"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              }`}
            >
              ID
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] lg:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-4 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-4 bg-current transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-4 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="card mx-auto mt-2 max-w-6xl px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {links.map((link) => {
              const active = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  className={linkClass(active, true)}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {t.nav[link.key]}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
