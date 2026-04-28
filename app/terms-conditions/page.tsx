import TermsHero from "@/components/terms/TermsHero";
import TermsContent from "@/components/terms/TermsContent";
import SocialMedia from "@/components/about/SocialMedia";

export const metadata = {
  title: "Terms & Conditions | SKD Event Management",
  description: "Read the terms and conditions for booking events with SKD Event Management.",
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <TermsHero />
      <TermsContent />
      <SocialMedia />
    </main>
  );
}