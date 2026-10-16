"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useLocale } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { t } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  // Used by the API to reject instant (bot) submissions.
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          role: data.get("role"),
          message: data.get("message"),
          website: data.get("website"),
          elapsedMs: Date.now() - renderedAt.current,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading index="07" title={t.contact.heading} sub={t.contact.sub} />

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-ghost">
              <span className="text-[var(--ink-muted)]">{t.contact.orEmail}:</span>
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              {t.contact.linkedin} ↗
            </a>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
            {/* Honeypot: hidden from people, bots tend to fill it. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <label className="block">
              <span className="text-sm text-[var(--ink-muted)]">{t.contact.name}</span>
              <input
                name="name"
                required
                maxLength={120}
                autoComplete="name"
                className="field mt-1.5"
              />
            </label>

            <label className="block">
              <span className="text-sm text-[var(--ink-muted)]">{t.contact.email}</span>
              <input
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                className="field mt-1.5"
              />
            </label>

            <label className="block">
              <span className="text-sm text-[var(--ink-muted)]">{t.contact.role}</span>
              <select name="role" required className="field mt-1.5" defaultValue="apm">
                {t.contact.roleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-[var(--ink-muted)]">
                {t.contact.message}
              </span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                className="field mt-1.5 resize-y"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary w-full disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? t.contact.sending : t.contact.submit}
            </button>

            {status === "success" && (
              <p className="text-sm text-[var(--pink-deep)]" role="status">
                {t.contact.success}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-700" role="alert">
                {t.contact.error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
