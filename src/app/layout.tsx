import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Muhammad Imam Nurokhi – Senior Programmer & IT Product Architect",
  description:
    "Portfolio of Muhammad Imam Nurokhi – Seasoned Senior Programmer, IT Business Analyst, Full Stack Developer, and ERP (Odoo) Specialist based in South Jakarta, Indonesia.",
  keywords: [
    "Muhammad Imam Nurokhi",
    "Full Stack Developer",
    "IT Product Architect",
    "React Developer",
    "Node.js Developer",
    "Odoo Developer",
    "Senior Programmer",
    "Jakarta",
  ],
  authors: [{ name: "Muhammad Imam Nurokhi" }],
  openGraph: {
    title: "Muhammad Imam Nurokhi – Senior Programmer & IT Product Architect",
    description:
      "Portfolio of Muhammad Imam Nurokhi – Seasoned Senior Programmer, IT Business Analyst, Full Stack Developer, and ERP (Odoo) Specialist.",
    url: "https://imam-nurokhi.github.io/my-portfolio",
    siteName: "Imam Nurokhi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Imam Nurokhi – Senior Programmer & IT Product Architect",
    description:
      "Portfolio of Muhammad Imam Nurokhi – Full Stack Developer, IT Product Architect, and Odoo Specialist.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${inter.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-full bg-[#0a0a0f] text-gray-100">{children}</body>
    </html>
  );
}
