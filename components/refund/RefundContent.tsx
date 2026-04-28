"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Wallet, XCircle, RefreshCcw, CalendarClock, Building } from "lucide-react";

export default function RefundContent() {
  return (
    <section className="py-20 md:py-32 bg-white relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        
        {/* ==============================================
            SECTION 1: ADVANCE PAYMENTS
            ============================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="bg-gradient-to-br from-gray-900 to-[#1a1a1a] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <Wallet className="w-40 h-40 absolute -right-6 -bottom-6 text-white/5 pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-3">
                <span className="text-[#ff4d94]">1.</span> Advance Payments
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To guarantee the highest quality of service, your advance payment is utilized immediately to secure event dates, top-tier vendors, premium materials, and to begin administrative processing.
              </p>
              <div className="space-y-3 font-medium text-gray-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff4d94] mt-0.5 flex-shrink-0" />
                  <p>All advance payments are strictly <strong className="text-white">non-refundable</strong>.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff4d94] mt-0.5 flex-shrink-0" />
                  <p>Refunds for advances will only be considered if SKD Event Management cancels the event due to internal company reasons.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==============================================
            SECTION 2 & 3: CANCELLATIONS (CLIENT VS COMPANY)
            ============================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Client Cancellations */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col h-full">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-[#a40049]">2.</span> Cancellations by Client
            </h2>
            <p className="text-sm text-gray-600 mb-6 font-medium">
              All client cancellation requests must be made formally in writing via email or official written letter.
            </p>
            
            <div className="space-y-4 text-sm text-gray-700 flex-grow">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <strong className="text-red-600 block mb-1">Non-refundable:</strong> 
                Advance payments are strictly non-refundable.
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <strong className="text-[#a40049] block mb-1">Partially refundable:</strong> 
                Only applicable if the client has made additional payments beyond the initial advance.
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-bold text-gray-900 mb-3 text-sm">Deductions apply for:</h4>
              <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#a40049]" />Vendor reservations</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#a40049]" />Materials purchased</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#a40049]" />Labor allocated</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#a40049]" />Admin & coordination</li>
              </ul>
            </div>
          </motion.div>

          {/* Company Cancellations */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-[#a40049]/5 p-8 rounded-3xl border border-[#a40049]/20 flex flex-col h-full">
            <h2 className="text-xl font-extrabold text-[#a40049] mb-6 flex items-center gap-3">
              <span className="text-[#a40049]">3.</span> Cancellations by Company
            </h2>
            <p className="text-sm text-gray-800 mb-6 font-medium leading-relaxed">
              If SKD Event Management (Pvt) Ltd is forced to cancel an event due to unforeseen company-side internal issues, the client is entitled to receive:
            </p>
            <ul className="space-y-4 text-sm font-bold text-gray-900 mb-6 flex-grow">
              <li className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-[#a40049]/10">
                <CheckCircle2 className="w-5 h-5 text-[#a40049]" /> A full refund of payments made.
              </li>
              <div className="text-center text-gray-400 font-bold text-xs uppercase tracking-widest">OR</div>
              <li className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-[#a40049]/10">
                <RefreshCcw className="w-5 h-5 text-[#a40049]" /> An alternative date or service option.
              </li>
            </ul>
            <p className="text-xs text-gray-600 italic">
              * This does not apply in cases of force majeure (e.g., natural disasters, curfews, political unrest, pandemics).
            </p>
          </motion.div>
          
        </div>

        {/* ==============================================
            SECTION 4: FORCE MAJEURE
            ============================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="bg-white border border-gray-200 shadow-xl shadow-gray-200/50 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                4. Force Majeure / Uncontrollable Events
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Events beyond the control of either party (such as severe weather, natural disasters, national emergencies, or strikes) may prevent service delivery. In such scenarios, refunds (if any) will be calculated after deducting:
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-700">Vendor charges</span>
                <span className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-700">Materials purchased</span>
                <span className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-700">Work completed</span>
              </div>
              <p className="text-sm font-medium text-gray-800 border-l-2 border-red-500 pl-3">
                SKD Event Management follows general principles under the Sri Lankan Contract Act for such scenarios.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ==============================================
            SECTION 5 & 6: POSTPONEMENTS & NO-SHOW
            ============================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Postponements */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="text-[#a40049]">5.</span> Event Postponements
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex gap-4 items-start">
                <CalendarClock className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">More than 14 Days Prior</h4>
                  <p className="text-sm text-gray-600">May be accommodated without extra charge, subject to date availability.</p>
                </div>
              </div>
              <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 flex gap-4 items-start">
                <CalendarClock className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Within 14 Days</h4>
                  <p className="text-sm text-gray-700">May incur additional costs depending on vendor availability and logistics already committed.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* No Show / Last Minute */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="text-[#a40049]">6.</span> No-Show | Last-Minute
            </h2>
            <div className="bg-red-50 p-6 rounded-3xl border border-red-100 h-full">
              <p className="text-sm text-red-900 mb-4 font-medium">If the client commits any of the following:</p>
              <ul className="space-y-3 text-sm text-red-800 font-bold mb-6">
                <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> Does not appear for the event</li>
                <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> Cancels on the event day itself</li>
                <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> Fails to provide required information</li>
              </ul>
              <div className="bg-red-600 text-white p-4 rounded-xl text-center shadow-lg">
                <span className="block font-extrabold text-lg">100% of Payments</span>
                <span className="text-xs uppercase tracking-wider font-medium">Will be considered non-refundable</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ==============================================
            SECTION 7 & 8: REFUND PROCESS & CONTACT
            ============================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-gray-200">
          
          {/* Processing Time */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-[#a40049]">7.</span> Refund Method & Processing
            </h2>
            <p className="text-sm text-gray-600 mb-4 font-medium">Approved refunds will be processed strictly under the following conditions:</p>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><div className="w-2 h-2 rounded-full bg-[#a40049]" /> Issued after deducting relevant charges.</li>
              <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><div className="w-2 h-2 rounded-full bg-[#a40049]" /> Made directly to the same account/payment method used.</li>
              <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"><div className="w-2 h-2 rounded-full bg-[#a40049]" /> May take <strong className="text-[#a40049]">7–14 working days</strong> to process.</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center relative overflow-hidden">
            <Building className="w-32 h-32 absolute -right-4 -bottom-4 text-white/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-xl font-extrabold mb-4 flex items-center gap-3">
                <span className="text-[#ff4d94]">8.</span> Contact for Refund Requests
              </h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                If you have any specific inquiries regarding your refund status or need to officially submit a cancellation request, please email our finance and management team:
              </p>
              <div className="space-y-3">
                <a href="mailto:info@skdevents.lk" className="flex items-center gap-3 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors">
                  <span className="font-bold text-lg text-[#ff4d94] tracking-wide">info@skdevents.lk</span>
                </a>
                <a href="mailto:thilina@skdevents.lk" className="flex items-center gap-3 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors">
                  <span className="font-bold text-lg text-[#ff4d94] tracking-wide">thilina@skdevents.lk</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}