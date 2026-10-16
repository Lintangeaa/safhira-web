import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Fraunces, Outfit } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: "Safhira Nanda — Product Manager",
  description:
    "Portfolio of Safhira Nanda Rahmadhani — Product Manager open to System Analyst roles. Bridging users, business, and engineering.",
  openGraph: {
    title: "Safhira Nanda — Product Manager",
    description:
      "Product + systems portfolio. Open to Product Manager & System Analyst roles.",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.brand,
  jobTitle: "Product Manager",
  url: site.url,
  email: `mailto:${site.email}`,
  image: site.photoUrl,
  sameAs: [site.linkedin],
  address: { "@type": "PostalAddress", addressCountry: "ID" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
