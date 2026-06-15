"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon, PhoneIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { faq, cta, site } from "@/lib/site";
import { telHref } from "@/lib/utils";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-cream-100/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* アコーディオン */}
          <Reveal>
            <ul className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
              {faq.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li
                    key={i}
                    className="border-b border-neutral-100 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-50/40 sm:px-6"
                    >
                      <span className="flex items-start gap-3">
                        <span className="text-base font-bold text-brand-500">
                          Q
                        </span>
                        <span className="text-sm font-medium text-neutral-800 sm:text-base">
                          {item.q}
                        </span>
                      </span>
                      <PlusIcon
                        className={`h-5 w-5 shrink-0 text-brand-400 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-3 px-5 pb-5 sm:px-6">
                            <span className="text-base font-bold text-accent-400">
                              A
                            </span>
                            <p className="text-sm leading-relaxed text-neutral-600">
                              {item.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* 相談ボックス */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-500 p-7 text-white shadow-lg sm:p-8">
              <h3 className="whitespace-pre-line text-lg font-bold leading-snug sm:text-xl">
                {faq.contactBox.title}
              </h3>

              <a
                href={cta.contactHref}
                className="group mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-bold text-brand-600 shadow-md transition-all hover:-translate-y-0.5"
              >
                {cta.contactLabel}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="mt-6 border-t border-white/20 pt-5 text-center">
                <a
                  href={telHref(site.tel)}
                  className="inline-flex items-center gap-2 text-2xl font-bold tracking-wide"
                >
                  <PhoneIcon className="h-6 w-6" />
                  {site.tel}
                </a>
                <p className="mt-1 text-xs text-white/80">{site.telHours}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
