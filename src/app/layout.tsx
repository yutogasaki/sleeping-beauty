import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "目覚めを待つ王国 | 眠りの森の美女 発表会",
  description: "生徒の意気込みが光となり森に宿り、観客の感想が祝福となり城を照らす。発表会当日に向けた物語の序章。",
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
