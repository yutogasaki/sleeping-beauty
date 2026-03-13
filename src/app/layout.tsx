import type { Metadata } from "next";
import { EVENT_DETAILS } from "../lib/eventDetails";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sleeping-beauty.vercel.app"),
  title: `${EVENT_DETAILS.productionTitle} | ${EVENT_DETAILS.studioTitle}`,
  description: `${EVENT_DETAILS.footerDateLabel} ${EVENT_DETAILS.venueName}。百年の眠りから目覚める、特別な一日。バレエ発表会特設サイト。`,
  openGraph: {
    title: `${EVENT_DETAILS.productionTitle} | ${EVENT_DETAILS.studioTitle}`,
    description: `${EVENT_DETAILS.footerDateLabel} ${EVENT_DETAILS.venueName}。百年の眠りから目覚める、特別な一日。バレエ発表会特設サイト。`,
    images: [{ url: "/images/ogp.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT_DETAILS.productionTitle} | ${EVENT_DETAILS.studioTitle}`,
    description: `${EVENT_DETAILS.footerDateLabel} ${EVENT_DETAILS.venueName}。バレエ発表会特設サイト。`,
    images: ["/images/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
