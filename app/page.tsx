import Hero from "@/components/sections/Hero";
import ImageMarquee from "@/components/ui/ImageMarquee";
import Problem from "@/components/sections/Problem";
import Affinity from "@/components/sections/Affinity";
import Solution from "@/components/sections/Solution";
import Offer from "@/components/sections/Offer";
import Coverage from "@/components/sections/Coverage";
import Testimonials from "@/components/sections/Testimonials";
import NarrowingDown from "@/components/sections/NarrowingDown";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ImageMarquee
        images={[
          { alt: "現場写真 1" },
          { alt: "現場写真 2" },
          { alt: "現場写真 3" },
          { alt: "現場写真 4" },
          { alt: "現場写真 5" },
          { alt: "現場写真 6" },
        ]}
      />
      <Problem />
      <Affinity />
      <Solution />
      <Offer />
      <Coverage />
      <Testimonials />
      <NarrowingDown />
      <Faq />
      <FinalCta />
    </>
  );
}
