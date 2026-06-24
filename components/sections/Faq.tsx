"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/solid";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { faq } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-cream-100/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

        <div className="mx-auto mt-14 max-w-3xl">
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
        </div>
      </div>
    </section>
  );
}
