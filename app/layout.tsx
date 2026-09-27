import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LMS Demo",
  description: "Learning management system frontend demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
