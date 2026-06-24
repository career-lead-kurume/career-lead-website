import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { site, coverage, faq } from "@/lib/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";

/**
 * 公開ドメインが確定したら NEXT_PUBLIC_SITE_URL を設定してください。
 * canonical / OGP / 構造化データの絶対URLに利用します。
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

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

const siteDescription =
  "株式会社キャリア・リードは、特定技能外国人の採用から在留資格の申請、入社後の定着支援までワンストップで伴走致します。25年の人材紹介ノウハウを活かし、介護・自動車運送・工業製品製造・飲食料品製造・建設の各分野で、意欲ある海外人材をご紹介。人手不足の現場に確かな一手を提供します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.company}｜特定技能外国人の採用・定着をワンストップ支援`,
    template: `%s｜${site.companyShort}`,
  },
  description: siteDescription,
  keywords: [
    "特定技能",
    "特定技能外国人",
    "外国人採用",
    "外国人材紹介",
    "登録支援機関",
    "人材紹介",
    "人手不足",
    "在留資格",
    "介護人材",
    "トラックドライバー",
    "建設人材",
    "製造業 人材",
    "外食 人材",
    "倉庫",
    "清掃",
    "久留米",
    "福岡",
    site.company,
    site.companyShort,
  ],
  applicationName: site.company,
  authors: [{ name: site.company }],
  creator: site.company,
  publisher: site.company,
  category: "人材紹介・特定技能",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    siteName: site.company,
    title: `${site.company}｜特定技能外国人の採用・定着をワンストップ支援`,
    description:
      "特定技能外国人の採用から在留資格申請、入社後の定着支援までワンストップで伴走。人材紹介会社として、人手不足の現場に意欲ある海外人材をご紹介します。",
    url: siteUrl,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.company}｜特定技能外国人の採用・定着をワンストップ支援`,
    description:
      "特定技能外国人の採用から定着までワンストップで伴走。登録支援機関として人手不足の現場を支えます。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * 構造化データ（JSON-LD）。
 * 検索エンジンと LLM（生成AI検索 / LLMO）に対して、事業者・サービス・FAQ を
 * 機械可読な形で明示する。表示文言は site.ts と同期。
 */
function StructuredData() {
  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.company,
    alternateName: site.companyShort,
    url: siteUrl,
    description: siteDescription,
    slogan: site.tagline,
    telephone: site.tel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressParts.street,
      addressLocality: site.addressParts.locality,
      addressRegion: site.addressParts.region,
      postalCode: site.addressParts.postalCode,
      addressCountry: "JP",
    },
  };

  const service = {
    "@type": "Service",
    name: "特定技能外国人の採用・定着ワンストップ支援",
    serviceType: "特定技能外国人の人材紹介・登録支援",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "日本" },
    description: siteDescription,
    category: coverage.industries.map((i) => i.field),
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [organization, service, faqPage],
  };

  // `</script>` でのブレイクアウトを防ぐため `<` をエスケープしてから埋め込む。
  const json = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

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
    <html lang="ja" className={notoSansJp.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <StructuredData />
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
