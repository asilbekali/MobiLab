import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Mobilografiya Kursi | SHOXJAXON Ahmedov - Professional Video Montaj",
  description:
    "Mobilografiya kurslari - telefon orqali professional reels, reklama va tijoriy videolar olishni SHOXJAXON Ahmedovdan o'rganing.",
  keywords: [

    "shoxjaxon axmedov",
    "mobilografiya",
    "reels olish",
    "video montaj kursi",
  ],
  authors: [{ name: "SHOXJAXON Ahmedov" }],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://shoxjaxonaxmedov.uz",
    title: "SHOXJAXON Ahmedov | Professional Mobilografiya Maktabi",
    images: [{ url: "/og-image.jpg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <head>
        {/* Meta Pixel Script */}
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
            fbq('init', '3178375402339774');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* Noscript qismi JS o'chiq bo'lgan holatlar uchun */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3178375402339774&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
