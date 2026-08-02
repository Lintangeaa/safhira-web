"use client";

import { useLocale } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          <span className="font-[family-name:var(--font-display)] text-[var(--ink)]">
            {site.fullName}
          </span>
        </p>
        <p>
          © {year}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
