import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-5">
      <div className="card max-w-md p-10 text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="section-title mt-3">Page not found</h1>
        <p className="mt-4 text-[var(--ink-muted)]">
          This page doesn’t exist or has moved. · Halaman tidak ditemukan.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          ← Back home
        </Link>
      </div>
    </main>
  );
}
