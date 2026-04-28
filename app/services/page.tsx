import dynamic from "next/dynamic";
import ServicesHero from "@/components/services/ServicesHero";

const ServicesContent = dynamic(() => import("@/components/services/ServicesContent"));
const SocialMedia = dynamic(() => import("@/components/about/SocialMedia"));

export const metadata = {
  title: "Our Services | SKD Event Management",
  description: "Explore our premium event management services, from stage setup to complete convocation execution.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <ServicesHero />
      <ServicesContent />
      <SocialMedia />
    </main>
  );
}