"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { t } = useLocale();
  const [status, setStatus] = useState<Status>("idle");

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
    <section id="contact" className="section-pad border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <h2 className="section-title">{t.contact.heading}</h2>
          <p className="mt-4 max-w-sm text-[var(--ink-muted)]">{t.contact.sub}</p>

          <div className="mt-8 space-y-3 text-sm">
            <p>
              <span className="text-[var(--ink-muted)]">{t.contact.orEmail}: </span>
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-[var(--ink)] transition hover:text-[var(--pink)]"
              >
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--ink)] transition hover:text-[var(--pink)]"
              >
                {t.contact.linkedin}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm text-[var(--ink-muted)]">{t.contact.name}</span>
              <input
                name="name"
                required
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
                rows={5}
                className="field mt-1.5 resize-y"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center bg-[var(--pink)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--pink-deep)] disabled:opacity-60"
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
