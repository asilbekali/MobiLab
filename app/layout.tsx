import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// 1. SEO va Google uchun kuchli Meta Data
export const metadata: Metadata = {
  title: "Mobilografiya Kursi | SHOXJAXON Ahmedov - Professional Video Montaj",
  description:
    "Mobilografiya kurslari - telefon orqali professional reels, reklama va tijoriy videolar olishni SHOXJAXON Ahmedovdan o'rganing. SMM va sifatli kontent yaratish sirlari.",
  keywords: [
    "mobilografiya",
    "mobilografiya kursi",
    "shoxjaxon axmedov",
    "shoxjahon ahmedov",
    "reels olish",
    "video montaj kursi",
    "SMM video",
    "telefon montaj",
    "mobil video",
    "reels sirlari",
  ],
  authors: [{ name: "SHOXJAXON Ahmedov" }],
  creator: "SHOXJAXON Ahmedov",
  publisher: "SHOXJAXON Ahmedov",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://shoxjaxonaxmedov.uz", // O'z domeningizni yozing
    title: "SHOXJAXON Ahmedov | Professional Mobilografiya Maktabi",
    description:
      "Noldan professional darajagacha mobilografiya kurslari. Bugun o'rganing, ertaga daromad qiling!",
    siteName: "SHOXJAXON Ahmedov Mobilografiya",
    images: [{ url: "/og-image.jpg" }], // Ijtimoiy tarmoqlar uchun rasm
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
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
      <body className="font-sans antialiased bg-black">
        {children}
        <Analytics />

        {/* Meta Pixel - Body oxirida (Hydration xatosi bermasligi uchun) */}
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
            fbq('init', '3178375402339774'); // Pixel ID here !
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
