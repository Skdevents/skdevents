import dynamic from "next/dynamic";
import AboutHero from "@/components/about/AboutHero";

const AboutDetails = dynamic(() => import("@/components/about/AboutDetails"));
const AboutMission = dynamic(() => import("@/components/about/AboutMission"));
const Cta = dynamic(() => import("@/components/about/Cta"));
const SocialMedia = dynamic(() => import("@/components/about/SocialMedia"));

export const metadata = {
  title: "About Us | SKD Event Management",
  description: "Where creativity meets precision to deliver exceptional events.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      
      <AboutDetails />
      <AboutMission />
      <Cta />
      <SocialMedia />
    </main>
  );
}