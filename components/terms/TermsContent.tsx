"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ShieldCheck, FileText, Gavel, Handshake } from "lucide-react";

export default function TermsContent() {
  return (
    <section className="py-20 md:py-32 bg-white relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        
        {/* ==============================================
            SECTION 1 & 2: ACCEPTANCE & SERVICES
            ============================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-full flex flex-col">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">1.</span> Acceptance of Terms
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
              By using our website or services, you agree to comply with and be legally bound by these Terms & Conditions.
            </p>
            <p className="text-sm font-bold text-[#a40049] bg-white p-3 rounded-xl border border-gray-200">
              If you do not agree, please discontinue the use of our services.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-full flex flex-col">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">2.</span> About Our Services
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
              We provide comprehensive event planning, coordination, decorations, production, entertainment, photography, videography, logistics, and all related event services.
            </p>
            <p className="text-sm font-medium text-gray-700 border-l-2 border-[#a40049] pl-3">
              We reserve the right to update, modify, or discontinue services without prior notice.
            </p>
          </motion.div>
        </div>

        {/* ==============================================
            SECTION 3: BOOKINGS & PAYMENTS
            ============================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white border border-gray-100 shadow-xl shadow-gray-100/50 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#a40049] to-[#ff4d94]" />
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-[#a40049]/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-[#a40049]" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                3. Bookings & Payments
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 font-medium">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> A booking is considered confirmed only upon receipt of the designated advance payment.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Advance payments are strictly non-refundable except under special written agreements.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Full settlement must be completed before the event date, unless otherwise agreed in writing.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Prices may vary depending on location, market rates, vendor availability, and event requirements.</li>
                <li className="flex items-start gap-3 sm:col-span-2 text-[#a40049] font-bold"><AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" /> Late or incomplete payments may result in the immediate cancellation of services.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ==============================================
            SECTION 4: CANCELLATIONS & REFUND POLICY
            ============================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 border-b border-gray-200 pb-4">
            <span className="text-[#a40049]">4.</span> Cancellations & Refund Policy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Client Cancellations */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a40049]" /> Client Cancellations
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Must be made in writing officially from authorized personnel.</li>
                <li className="flex items-start gap-2 text-[#a40049] font-bold"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Advance payments will not be refunded.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Work already completed, vendor reservations, or material purchases will be deducted from any refundable portion.</li>
              </ul>
            </div>
            
            {/* Company Cancellations */}
            <div className="bg-[#a40049]/5 rounded-[2rem] p-8 border border-[#a40049]/20 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-[#a40049] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a40049]" /> Company Cancellations
              </h4>
              <p className="text-sm text-gray-700 mb-3">If SKD Event Management cancels due to unforeseen internal reasons, the client will receive:</p>
              <ul className="space-y-2 text-sm text-gray-800 font-bold mb-4">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#a40049]" /> A full refund OR</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#a40049]" /> An alternative date/service arrangement.</li>
              </ul>
            </div>
          </div>

          {/* Uncontrollable Events */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white flex gap-4 items-start shadow-lg">
            <AlertTriangle className="w-6 h-6 text-[#ff4d94] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white mb-2">Uncontrollable Events (Force Majeure)</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                In the case of force majeure (natural disasters, political unrest, curfews, pandemics, strikes), refunds will be assessed based on expenses already committed. Sri Lankan contract law principles under the <span className="text-[#ff4d94]">Contract Act No. 25 of 1872</span> apply.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ==============================================
            SECTION 5 & 6: RESPONSIBILITIES & MODIFICATIONS
            ============================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-gray-200">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="text-[#a40049]">5.</span> Client Responsibilities
            </h2>
            <ul className="space-y-3 text-sm text-gray-700 font-medium">
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#a40049] flex-shrink-0" /> Provide accurate event requirement information.</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#a40049] flex-shrink-0" /> Obtain necessary venue approvals, permits, and noise clearances.</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#a40049] flex-shrink-0" /> Ensure timely communication and availability for meetings.</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#a40049] flex-shrink-0" /> Take responsibility for guest behavior, damages, or misconduct.</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#a40049] flex-shrink-0" /> Comply with venue rules and SL regulations (e.g., liquor protocols).</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="text-[#a40049]">6.</span> Event Modifications
            </h2>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Changes to date, venue, number of guests, theme, setup, or timing must be communicated at least <strong className="text-[#a40049]">7–14 days prior</strong> to the event.
              </p>
              <div className="flex gap-3 items-start bg-white p-4 rounded-xl border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-xs text-red-600 font-bold">
                  Last-minute adjustments may incur additional charges due to labor, logistics, or vendor changes.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ==============================================
            SECTION 7, 8, 9: MEDIA, VENDORS, LIABILITY
            ============================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">7.</span> Media Usage
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              We may use event photos/videos for marketing and portfolio purposes. We respect privacy rights under the PDPA No. 9 of 2022.
            </p>
            <p className="text-xs text-gray-800 font-medium bg-gray-50 p-3 rounded-lg border border-gray-200">
              If you wish to restrict this, inform us in writing at the time of confirmation.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">8.</span> Third-Party Vendors
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              We may engage external vendors for catering, sound, venues, etc. We are not liable for issues caused by third-party vendors.
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Clients are subject to vendor terms.</li>
              <li>• Additional deposits may apply.</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">9.</span> Liability Limitations
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              We are not responsible for injuries, property damage, or disruptions caused by natural disasters or force-majeure conditions.
            </p>
            <p className="text-xs text-red-600 font-bold bg-red-50 p-3 rounded-lg border border-red-100">
              Our maximum liability is limited strictly to the total amount paid by the client.
            </p>
          </motion.div>

        </div>

        {/* ==============================================
            SECTION 10 & 11: WEBSITE TERMS & DATA PRIVACY
            ============================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-gray-200">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">10.</span> Website Usage Terms
            </h2>
            <p className="text-sm text-gray-700 mb-3 font-medium">Users agree not to:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><div className="w-1 h-1 mt-1.5 rounded-full bg-[#a40049]" /> Copy or republish website content without approval.</li>
              <li className="flex items-start gap-2"><div className="w-1 h-1 mt-1.5 rounded-full bg-[#a40049]" /> Attempt hacking, data extraction, or disruption.</li>
              <li className="flex items-start gap-2"><div className="w-1 h-1 mt-1.5 rounded-full bg-[#a40049]" /> Submit fraudulent information through online forms.</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">11.</span> Data Privacy
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              We process personal information according to the Sri Lanka Personal Data Protection Act (PDPA). Your data is used strictly for communication, service coordination, and operational improvement.
            </p>
            <p className="text-sm text-[#a40049] font-bold underline cursor-pointer">
              A full Privacy Policy can be provided upon request.
            </p>
          </motion.div>
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gradient-to-r from-[#050505] to-[#1a1a1a] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <Gavel className="w-32 h-32 absolute -right-4 -bottom-4 text-white/5 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
                <span className="text-[#ff4d94]">12.</span> Governing Law
              </h2>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                These terms are interpreted in accordance with the laws of Sri Lanka, including but not limited to:
              </p>
              <ul className="space-y-2 text-sm text-gray-400 font-medium mb-6">
                <li>• Contract Act No. 25 of 1872</li>
                <li>• Electronic Transactions Act No. 19 of 2006</li>
                <li>• Personal Data Protection Act No. 9 of 2022</li>
                <li>• Local government permit regulations</li>
              </ul>
              <p className="text-sm text-[#ff4d94] font-bold bg-white/10 p-3 rounded-lg inline-block border border-white/5">
                Disputes resolved under Sri Lankan courts.
              </p>
            </div>

            <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10">
              <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-3">
                <span className="text-[#ff4d94]">13.</span> Amendments
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                SKD Event Management (Pvt) Ltd reserves the right to update these Terms & Conditions at any time.
              </p>
              <div className="flex items-center gap-3 text-[#ff4d94] font-bold">
                <Handshake className="w-5 h-5" />
                Updates become effective immediately.
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}