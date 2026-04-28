"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Lock, UserCheck, RefreshCw, FileText, Mail, PhoneCall } from "lucide-react";

export default function PrivacyContent() {
  return (
    <section className="py-20 md:py-32 bg-white relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        
        {/* ==============================================
            SECTION 1: INFORMATION WE COLLECT
            ============================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#a40049]/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[#a40049]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              1. Information We Collect
            </h2>
          </div>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            To provide you with seamless event management services, we need to collect certain details. We ensure that only the strictly necessary information is gathered to execute your event flawlessly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Info Box */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-lg hover:border-[#a40049]/20 transition-all duration-300">
              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a40049]" /> Personal Details
              </h4>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Full Name & Email Address</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Contact Numbers</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Postal Address</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> NIC/Passport <span className="text-gray-400 italic">(Only if required for high-security venue permits)</span></li>
              </ul>
            </div>
            
            {/* Event Info Box */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-lg hover:border-[#a40049]/20 transition-all duration-300">
              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a40049]" /> Event Specifications
              </h4>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Event Date, Time & Venue</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Service Preferences</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Estimated Guest/Student Counts</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Any Special Custom Requirements</li>
              </ul>
            </div>

            {/* Website Info Box */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 hover:shadow-lg hover:border-[#a40049]/20 transition-all duration-300">
              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a40049]" /> Technical Data
              </h4>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> IP Address & Browser Type</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Cookies and Usage Data</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#a40049] mt-0.5 flex-shrink-0" /> Contact Form Submissions</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ==============================================
            SECTION 2 & 3: USAGE AND CONSENT
            ============================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="text-[#a40049]">2.</span> How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Your data is never used for unrelated marketing without your permission. We strictly utilize your information to guarantee the highest quality of service during your event planning and execution phases.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700 bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100">
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Provide and manage event services seamlessly</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Communicate with you regarding bookings</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Prepare accurate quotations, invoices, and agreements</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Coordinate logistics with third-party vendors</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Maintain security and prevent fraudulent activity</li>
              <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#a40049] flex-shrink-0" /> Improve our website and customer experience</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#a40049] to-[#4d002c] rounded-[2rem] p-8 md:p-10 text-white shadow-xl h-full flex flex-col justify-center relative overflow-hidden">
              <UserCheck className="w-24 h-24 absolute -right-4 -bottom-4 text-white/10 pointer-events-none" />
              <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-3">
                <span className="text-[#ff4d94]">3.</span> Consent
              </h2>
              <p className="text-white/90 leading-relaxed mb-6 font-medium text-lg">
                By using our website, filling our forms, or utilizing our services, you consent to the collection and use of your information as outlined in this policy.
              </p>
              <p className="text-white/80 text-sm p-4 bg-black/20 rounded-xl border border-white/10">
                You have the full right to withdraw your consent at any given time by contacting our support team.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ==============================================
            SECTION 4: DATA PROTECTION & SECURITY
            ============================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#a40049]" />
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
              <Lock className="w-10 h-10 text-[#a40049]" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                4. Data Protection & Security
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Your trust is our priority. We employ robust security measures to prevent unauthorized access, disclosure, or alteration of your personal data. We comply fully with the Sri Lanka Personal Data Protection Act (PDPA).
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 font-medium">
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <ShieldAlert className="w-5 h-5 text-[#a40049]" /> Secure storage of personal data
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <ShieldAlert className="w-5 h-5 text-[#a40049]" /> Limited access to authorized personnel
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <ShieldAlert className="w-5 h-5 text-[#a40049]" /> Compliance with PDPA requirements
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <ShieldAlert className="w-5 h-5 text-[#a40049]" /> Secure handling of online forms
                </div>
              </div>
              
              <div className="mt-8 inline-block px-6 py-3 bg-[#a40049]/10 rounded-full border border-[#a40049]/20">
                <span className="font-bold text-[#a40049]">Strict Policy:</span> We never sell, lease, or trade your personal data to third parties.
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==============================================
            SECTION 5, 6, 7: VENDORS, MEDIA, RETENTION
            ============================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-200 pt-16">
          
          {/* Vendors */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">5.</span> Third-Party Vendors
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              To deliver a comprehensive event experience, we may share strictly necessary information with verified service partners.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Catering", "Photo/Video Teams", "Sound & Light", "Logistics"].map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">{tag}</span>
              ))}
            </div>
            <p className="text-xs text-[#a40049] font-bold bg-[#a40049]/5 p-3 rounded-xl border border-[#a40049]/10">
              All third-party vendors are legally bound to handle your data responsibly.
            </p>
          </motion.div>

          {/* Media Consent */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">6.</span> Media Consent
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              We take pride in our work. SKD Event Management may capture and use event photos or videos for our marketing, social media, and website portfolio.
            </p>
            <p className="text-sm text-gray-800 font-medium bg-gray-50 p-4 rounded-xl border border-gray-200">
              If you value absolute privacy, clients may request in writing that their event not be used for promotional purposes. We respect your choice.
            </p>
          </motion.div>

          {/* Retention */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">7.</span> Data Retention
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              We do not hold onto your data forever. Personal data is stored only for:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 mb-5 marker:text-[#a40049]">
              <li>The duration of service delivery</li>
              <li>Mandatory legal & accounting purposes</li>
              <li>Internal quality improvements</li>
            </ul>
            <p className="text-sm font-bold text-gray-900 border-l-4 border-[#a40049] pl-3">
              Data not required will be securely deleted from our servers.
            </p>
          </motion.div>

        </div>

        {/* ==============================================
            SECTION 8 & 9: PDPA RIGHTS AND COOKIES
            ============================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-[#a40049]/5 p-8 md:p-10 rounded-[2rem] border border-[#a40049]/10">
            <h2 className="text-2xl font-extrabold text-[#a40049] mb-6 flex items-center gap-3">
              8. Your Rights Under PDPA
            </h2>
            <p className="text-gray-800 mb-6 font-medium leading-relaxed">
              As a citizen, you have full control over your personal data under the Sri Lankan law. You have the right to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-gray-800">
              <span className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 className="w-4 h-4 text-[#a40049]" /> Access your data</span>
              <span className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 className="w-4 h-4 text-[#a40049]" /> Request corrections</span>
              <span className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 className="w-4 h-4 text-[#a40049]" /> Request deletion</span>
              <span className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 className="w-4 h-4 text-[#a40049]" /> Limit processing</span>
              <span className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 className="w-4 h-4 text-[#a40049]" /> Withdraw consent</span>
              <span className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"><CheckCircle2 className="w-4 h-4 text-[#a40049]" /> File complaints</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-gray-50 p-8 md:p-10 rounded-[2rem] border border-gray-100 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6 text-[#a40049]" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-[#a40049]">9.</span> Cookies & Tracking
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We use secure cookies to enhance your browsing experience, analyze site traffic, and improve performance. No sensitive personal data is extracted via cookies.
            </p>
            <p className="text-sm font-bold text-gray-500 bg-white p-4 rounded-xl border border-gray-200 inline-block">
              You can easily disable cookies directly from your browser settings at any time.
            </p>
          </motion.div>
          
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-900 rounded-[2.5rem] p-8 md:p-14 text-white shadow-2xl flex flex-col md:flex-row justify-between gap-12 mt-16">
          
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 flex items-center gap-3">
              <span className="text-[#ff4d94]">10.</span> Policy Updates
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              We may update this Privacy Policy periodically to reflect changes in legal requirements or our internal processes. Updated versions will always be posted transparently on this page.
            </p>
          </div>

          <div className="w-full md:w-px bg-white/10 h-px md:h-auto" />

          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-3">
              <span className="text-[#ff4d94]">11.</span> Contact Us
            </h2>
            <p className="text-gray-400 mb-6 font-medium">For any privacy-related questions or data requests, please reach out to us:</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#ff4d94]/20 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-5 h-5 text-[#ff4d94]" />
                </div>
                <div>
                  <span className="block text-sm text-gray-400 font-medium">Hotline</span>
                  <span className="font-bold text-lg md:text-xl tracking-wide">+94 112 248 181</span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#ff4d94]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#ff4d94]" />
                </div>
                <div>
                  <span className="block text-sm text-gray-400 font-medium">Email Address</span>
                  <span className="font-bold text-lg md:text-xl text-[#ff4d94]">info@skdevents.lk</span>
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}