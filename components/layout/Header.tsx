"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { navItems, cta } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-50/85 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        {/* 会社ロゴ */}
        <a href="#top" className="flex items-center">
          <Image
            src="/images/logoK.png"
            alt="株式会社キャリア・リード"
            width={180}
            height={48}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </a>

        {/* PC ナビ */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.slice(0, -1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-700 transition-colors hover:text-brand-600"
            >
              {item.label}
            </a>
          ))}
          <a
            href={cta.contactHref}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg"
          >
            無料相談
          </a>
        </nav>

        {/* モバイル: ハンバーガー */}
        <button
          type="button"
          aria-label="メニューを開く"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-lg text-neutral-800 lg:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 flex h-full w-72 max-w-[80%] flex-col bg-white p-6 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Image
                  src="/images/logoK.png"
                  alt="株式会社キャリア・リード"
                  width={140}
                  height={38}
                  className="h-8 w-auto"
                />
                <button
                  type="button"
                  aria-label="メニューを閉じる"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-lg text-neutral-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <a
                href={cta.contactHref}
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                無料相談
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
