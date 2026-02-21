import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoxruh Ahmedov ",
description:
  "Mobilografiya kursi – telefon orqali professional video olish va montaj qilishni o‘rganing. Shoxruh Ahmedov bilan noldan boshlab SMM, reels, reklama roliklari va tijoriy videolar tayyorlashni o‘zlashtiring. Bugunoq daromadli kasbni boshlang.",
  authors: [
    { name: "Sarvarbek Qodirov", url: "https://kadirov-js.uz" },
    { name: "Asilbek Abdugaffarov", url: "https://asilbek.com" },
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
