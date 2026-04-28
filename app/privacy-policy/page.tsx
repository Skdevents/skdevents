import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyContent from "@/components/privacy/PrivacyContent";
import SocialMedia from "@/components/about/SocialMedia";

export const metadata = {
  title: "Privacy Policy | SKD Event Management",
  description: "Privacy Policy and data protection guidelines for SKD Event Management.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PrivacyHero />
      <PrivacyContent />
      <SocialMedia />
    </main>
  );
}