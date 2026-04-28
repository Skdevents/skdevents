import RefundHero from "@/components/refund/RefundHero";
import RefundContent from "@/components/refund/RefundContent";

export const metadata = {
  title: "Refund Policy | SKD Event Management",
  description: "Learn about the cancellation, postponement, and refund policies of SKD Event Management.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <RefundHero />
      <RefundContent />
    </main>
  );
}