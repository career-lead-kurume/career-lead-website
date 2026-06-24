import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/site";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-white/80 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          description={testimonials.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl">
                {/* 引用符 */}
                <span
                  aria-hidden
                  className="font-serif text-5xl leading-none text-brand-200"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-neutral-700">
                  {t.comment}
                </blockquote>
                <figcaption className="mt-6 border-t border-neutral-100 pt-5">
                  <span className="block text-xs text-neutral-500">
                    {t.industry}
                  </span>
                  <span className="mt-0.5 block text-sm font-bold text-neutral-900">
                    {t.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
