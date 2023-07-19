import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

const inter = Open_Sans({ style: "normal", subsets: ["cyrillic"], display: "swap" });

export const metadata: Metadata = {
  title: "Byron @ Twitter",
  description:
    "Archive of tweets made by Byron Bernstein, a.k.a @Byron, a.k.a Reckful",
  authors: [
    { name: "Annie Wu" },
    { name: "Ignat Beresnev" },
    { name: "Ryan Coppa" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
