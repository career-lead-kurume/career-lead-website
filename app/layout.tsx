import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
  fallback: [
    "Hiragino Sans",
    "Yu Gothic",
    "Meiryo",
    "system-ui",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  // TODO: 公開ドメイン確定後に metadataBase を設定
  title: {
    default: `${site.company}｜特定技能人材で、女性活躍の現場づくりを`,
    template: `%s｜${site.companyShort}`,
  },
  description:
    "特定技能制度を活用し、意欲ある海外人材——とりわけ女性の活躍を、採用から定着まで一気通貫でサポート。人手不足の現場に新しい力を。",
  openGraph: {
    title: `${site.company}`,
    description:
      "特定技能人材の採用から定着までワンストップで伴走。女性活躍の現場づくりを応援します。",
    locale: "ja_JP",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#c41f63",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSansJp.variable}>
      <body className="min-h-screen font-sans">
        <LenisProvider>
          <div className="relative">
            <Header />
            <main className="relative w-full">{children}</main>
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
