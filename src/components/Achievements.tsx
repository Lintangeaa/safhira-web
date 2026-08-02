"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { certificates } from "@/lib/certificates";

export function Achievements() {
  const { t } = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <section
      id="achievements"
      className="section-pad border-t border-[var(--line)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="section-title">{t.achievements.heading}</h2>
        </Reveal>

        <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {certificates.map((cert) => {
            const copy = t.achievements.items[cert.id as keyof typeof t.achievements.items];
            if (!copy) return null;

            const hasPdf = Boolean(cert.pdfUrl);
            const isOpen = openId === cert.id;
            const panelId = `${baseId}-panel-${cert.id}`;
            const buttonId = `${baseId}-btn-${cert.id}`;

            return (
              <Reveal key={cert.id}>
                <li className="py-6">
                  <div className="grid gap-2 sm:grid-cols-[88px_1fr] sm:gap-8">
                    <span className="text-sm font-medium text-[var(--pink)]">
                      {cert.year}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-[var(--ink)]">
                            {copy.title}
                          </p>
                          <p className="mt-1 text-sm text-[var(--ink-muted)]">
                            {copy.detail}
                          </p>
                        </div>

                        {hasPdf && cert.pdfUrl ? (
                          <button
                            type="button"
                            id={buttonId}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() =>
                              setOpenId((prev) =>
                                prev === cert.id ? null : cert.id,
                              )
                            }
                            className="shrink-0 text-sm font-medium text-[var(--pink)] underline-offset-4 transition hover:underline"
                          >
                            {isOpen
                              ? t.achievements.hidePreview
                              : t.achievements.preview}
                          </button>
                        ) : null}
                      </div>

                      {hasPdf && cert.pdfUrl ? (
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className={`cert-preview ${isOpen ? "is-open" : ""}`}
                        >
                          <div className="cert-preview-inner">
                            <div className="mt-5 overflow-hidden border border-[var(--line)] bg-white/60">
                              <iframe
                                title={`${copy.title} PDF`}
                                src={`${cert.pdfUrl}#toolbar=0&navpanes=0`}
                                className="h-[min(70vh,420px)] w-full"
                                loading="lazy"
                              />
                            </div>
                            <a
                              href={cert.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex text-sm font-medium text-[var(--ink)] transition hover:text-[var(--pink)]"
                            >
                              {t.achievements.openPdf} →
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
