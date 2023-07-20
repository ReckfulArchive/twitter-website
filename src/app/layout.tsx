import "./globals.css";
import "../styles/main.css";
import "../styles/tweaks.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Providers from "./providers";

const inter = Open_Sans({
  style: "normal",
  subsets: ["cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Byron @ Twitter",
  description:
    "Archive of tweets made by Byron Bernstein, a.k.a @Byron, a.k.a Reckful",
  authors: [
    { name: "Ignat Beresnev" },
    { name: "Ryan Coppa" },
    { name: "Annie Wu" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
