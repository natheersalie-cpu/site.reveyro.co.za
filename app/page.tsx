import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { WhyReveyro } from "@/components/WhyReveyro";
import { FeatureMarquee } from "@/components/FeatureMarquee";
import { PricingTeaser } from "@/components/PricingTeaser";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <WhyReveyro />
      <FeatureMarquee />
      <PricingTeaser />
      <Footer />
    </>
  );
}