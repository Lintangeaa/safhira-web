import type { Locale } from "@/lib/i18n/dictionaries";

export type Metric = { value: string; label: string };

export type Project = {
  id: number;
  slug: string;
  published: boolean;
  sort_order: number;
  tag: string;
  cover_url: string | null;
  title_en: string;
  title_id: string;
  summary_en: string;
  summary_id: string;
  body_en: string;
  body_id: string;
  outcome_en: string;
  outcome_id: string;
  metrics: Metric[];
  gallery: string[];
  created_at: string;
  updated_at: string;
};

/** Locale-resolved fields, falling back to English when ID is empty. */
export function localize(p: Project, locale: Locale) {
  const pick = (en: string, id: string) => (locale === "id" && id ? id : en);
  return {
    title: pick(p.title_en, p.title_id),
    summary: pick(p.summary_en, p.summary_id),
    body: pick(p.body_en, p.body_id),
    outcome: pick(p.outcome_en, p.outcome_id),
  };
}
