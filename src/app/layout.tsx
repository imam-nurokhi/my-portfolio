import type { Metadata } from "next";

// The portfolio itself is the static page at public/index.html, served at "/"
// via the rewrite in next.config.ts. This layout only wraps Next's own pages
// (e.g. the 404).
export const metadata: Metadata = {
  title: "Muhammad Imam Nurokhi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
