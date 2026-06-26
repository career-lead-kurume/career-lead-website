import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* ブランド */}
          <div>
            <Image
              src="/images/logoK.png"
              alt={site.company}
              width={800}
              height={150}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {site.tagline}
              <br />
              特定技能人材の採用から定着まで、ワンストップで伴走します。
            </p>
          </div>

          {/* ナビ */}
          <div>
            <h3 className="text-sm font-semibold text-white">メニュー</h3>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    className="text-sm text-neutral-400 transition-colors hover:text-accent-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 連絡先 */}
          <div>
            <h3 className="text-sm font-semibold text-white">お問い合わせ</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              <li>TEL: {site.tel}</li>
              <li className="text-neutral-500">{site.telHours}</li>
              <li className="pt-1">
                <span className="text-neutral-500">{site.officeName}</span>
                <br />
                {site.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} {site.company}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
