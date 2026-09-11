import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { WhyReveyro } from "@/components/WhyReveyro";
import { PricingTeaser } from "@/components/PricingTeaser";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <WhyReveyro />
      <PricingTeaser />
      <Footer />
    </>
  );
}