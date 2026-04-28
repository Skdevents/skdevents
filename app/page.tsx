import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import HomeServices from "@/components/home/HomeServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Cta from "@/components/home/Cta";
import Stats from "@/components/home/Stats";
import AboutSummary from "@/components/home/AboutSummary";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Hero />
      <Partners />
      <AboutSummary />
      <HomeServices />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <Cta />
    </main>
  );
}