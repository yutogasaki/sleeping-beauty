import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sleeping-beauty.vercel.app"),
  title: "眠れる森の美女 | AYAMI BALLET STUDIO 第4回発表会",
  description: "2026年8月23日（日）豊橋市芸術劇場PLAT。百年の眠りから目覚める、特別な一日。バレエ発表会特設サイト。",
  openGraph: {
    title: "眠れる森の美女 | AYAMI BALLET STUDIO 第4回発表会",
    description: "2026年8月23日（日）豊橋市芸術劇場PLAT。百年の眠りから目覚める、特別な一日。バレエ発表会特設サイト。",
    images: [{ url: "/images/ogp.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "眠れる森の美女 | AYAMI BALLET STUDIO 第4回発表会",
    description: "2026年8月23日（日）豊橋市芸術劇場PLAT。バレエ発表会特設サイト。",
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
