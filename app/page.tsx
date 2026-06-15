import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Affinity from "@/components/sections/Affinity";
import Solution from "@/components/sections/Solution";
import Offer from "@/components/sections/Offer";
import Achievements from "@/components/sections/Achievements";
import Testimonials from "@/components/sections/Testimonials";
import NarrowingDown from "@/components/sections/NarrowingDown";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Affinity />
      <Solution />
      <Offer />
      <Achievements />
      <Testimonials />
      <NarrowingDown />
      <Faq />
      <FinalCta />
    </>
  );
}
