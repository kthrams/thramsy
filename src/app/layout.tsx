import type { Metadata } from "next";
import { Domine } from "next/font/google";
import "./globals.css";

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Hu-Thrams",
  description:
    "Builder, maker, and explorer. PM in fintech turned AI and consumer tinkerer based in the Bay Area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${domine.variable} antialiased`}>{children}</body>
    </html>
  );
}
