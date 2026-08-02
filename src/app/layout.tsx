import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
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
  title: "Safhira Nanda — Associate Product Manager",
  description:
    "Portfolio of Safhira Nanda Rahmadhani — Associate Product Manager open to System Analyst roles. Bridging users, business, and engineering.",
  openGraph: {
    title: "Safhira Nanda — Associate Product Manager",
    description:
      "Product + systems portfolio. Open to Associate Product Manager & System Analyst roles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
