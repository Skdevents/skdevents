import dynamic from "next/dynamic";
import GalleryHero from "@/components/gallery/GalleryHero";

const GalleryGrid = dynamic(() => import("@/components/gallery/GalleryGrid"));
const SocialMedia = dynamic(() => import("@/components/about/SocialMedia"));

export const metadata = {
  title: "Portfolio Gallery | SKD Event Management",
  description: "Explore our portfolio of premium convocations, corporate events, and stage setups.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <GalleryHero />
      
      <GalleryGrid />
      <SocialMedia />
    </main>
  );
}