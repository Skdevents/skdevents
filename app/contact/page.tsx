import dynamic from "next/dynamic";
import ContactHero from "@/components/contact/ContactHero";

const ContactFormInfo = dynamic(() => import("@/components/contact/ContactFormInfo"));

const ContactMap = dynamic(() => import("@/components/contact/ContactMap"));
const SocialMedia = dynamic(() => import("@/components/about/SocialMedia"));

export const metadata = {
  title: "Contact Us | SKD Event Management",
  description: "Get in touch with SKD Event Management for your next big event.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />
      
      <ContactFormInfo />
      <ContactMap />
      <SocialMedia />
    </main>
  );
}