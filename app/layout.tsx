import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script"; // 1. Script komponentini chaqiramiz
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHOXJAXON Ahmedov ",
  description:
    "Mobilografiya kursi – telefon orqali professional video olish va montaj qilishni o‘rganing. SHOXJAXON Ahmedov bilan noldan boshlab SMM, reels, reklama roliklari va tijoriy videolar tayyorlashni o‘zlashtiring. Bugunoq daromadli kasbni boshlang.",
  authors: [
    { name: "Sarvarbek Qodirov", url: "https://kadirov-js.uz" },
    { name: "Asilbek Abdugaffarov", url: "https://asilbek.com" },
  ],
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
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
      <head>
        {/* 2. Meta Pixel Scriptini shu yerga qo'shamiz */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID'); // <--- BU YERGA PIXEL ID QO'YISH KERAK ESDAN CHIQMASIN
            fbq('track', 'PageView');
          `}
        </Script>
        {/* Pixel uchun zaxira (noscript) - JS o'chiq bo'lganda ishlaydi */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1`}
          />
        </noscript>
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
