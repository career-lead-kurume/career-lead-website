import {
  UserGroupIcon,
  DocumentCheckIcon,
  HomeModernIcon,
  AcademicCapIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { offer } from "@/lib/site";

const icons = [
  UserGroupIcon,
  DocumentCheckIcon,
  HomeModernIcon,
  AcademicCapIcon,
  SparklesIcon,
  ShieldCheckIcon,
];

export default function Offer() {
  return (
    <section
      id="offer"
      className="relative bg-cream-200/80 py-28 sm:py-36"
      style={{ clipPath: "polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={offer.eyebrow}
          title={offer.title}
          description={offer.description}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offer.features.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-brand-100/60 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:ring-brand-200">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-all group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
