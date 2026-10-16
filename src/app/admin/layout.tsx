import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS — Safhira Nanda",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto min-h-[100svh] max-w-5xl px-5 py-10 sm:px-8">{children}</div>;
}
