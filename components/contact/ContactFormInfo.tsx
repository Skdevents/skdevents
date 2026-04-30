// components/contact/ContactFormInfo.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, PhoneCall, Mail, Info, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";

export default function ContactFormInfo() {
  // States
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  
  const formRef = useRef<HTMLFormElement>(null);

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPrivacyAccepted) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setIsPrivacyAccepted(false);
        if (formRef.current) formRef.current.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* =========================================
              LEFT COLUMN: CONTACT INFO (UNCHANGED)
              ========================================= */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center lg:items-start lg:text-left transform-gpu will-change-[transform,opacity]"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Contact Details</h2>
              <p className="text-gray-500 font-medium mb-4 lg:mb-8 leading-relaxed max-w-sm">
                Experience transparent communication and a client-first mindset. We are ready to listen.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex gap-5 group hover:bg-white hover:shadow-xl hover:border-[#a40049]/20 transition-all duration-300 transform-gpu will-change-[transform,opacity]"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049]/10 transition-colors transform-gpu">
                <MapPin className="w-5 h-5 text-[#a40049]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Head Office</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">No. L2-29, Reality Plaza,<br />Colombo Road, Ja-Ela,<br />Sri Lanka.</p>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex gap-5 group hover:bg-white hover:shadow-xl hover:border-[#a40049]/20 transition-all duration-300 transform-gpu will-change-[transform,opacity]"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049]/10 transition-colors transform-gpu">
                <PhoneCall className="w-5 h-5 text-[#a40049]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Direct Lines</h4>
                <p className="text-sm text-gray-600 font-medium hover:text-[#a40049] transition-colors cursor-pointer">+94 112 248 181 (Hotline)</p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex gap-5 group hover:bg-white hover:shadow-xl hover:border-[#a40049]/20 transition-all duration-300 transform-gpu will-change-[transform,opacity]"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049]/10 transition-colors transform-gpu">
                <Mail className="w-5 h-5 text-[#a40049]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                <p className="text-sm text-gray-600 font-medium mb-1">General & Refunds:</p>
                <p className="text-sm text-[#a40049] font-bold">info@skdevents.lk</p>
                <p className="text-sm text-[#a40049] font-bold">thilina@skdevents.lk</p>
              </div>
            </motion.div>

            {/* PDF Extracted Guideline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-[#a40049]/5 to-transparent border border-[#a40049]/20 flex gap-5 relative overflow-hidden transform-gpu will-change-[transform,opacity]"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#a40049]" />
              <div className="w-10 h-10 rounded-full bg-[#a40049]/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[#a40049]" />
              </div>
              <div>
                <h4 className="font-bold text-[#a40049] mb-1">Important Guideline</h4>
                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                  Quotations must be confirmed at least <strong className="text-gray-900">15 days</strong> prior to the event date to ensure flawless execution.
                </p>
              </div>
            </motion.div>
          </div>

          {/* =========================================
              RIGHT COLUMN: PROFESSIONAL CONTACT FORM
              ========================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-3 bg-white border border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] p-6 sm:p-8 md:p-12 relative overflow-hidden transform-gpu will-change-[transform,opacity]"
          >
            {/* Form Top Decor */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#a40049] to-[#ff4d94]" />

            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">Send Us A Message</h3>

            {/* Standard Professional Form */}
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Your Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Kasun Perera" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all" />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="name@company.com" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Contact Number <span className="text-gray-400 normal-case font-normal">(Optional)</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="e.g. +94 7X XXX XXXX" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all" />
                </div>
                {/* Subject / Company */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Subject / Company</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="e.g. General Inquiry" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Your Message <span className="text-red-500">*</span></label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} required placeholder="How can we help you?..." className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all resize-none"></textarea>
              </div>

              {/* Privacy Policy Checkbox (Controls Button state) */}
              <div className="flex items-start gap-3 mt-4">
                <div className="flex items-center h-5 mt-1">
                  <input 
                    id="privacy" 
                    type="checkbox" 
                    required 
                    checked={isPrivacyAccepted}
                    onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
                    className="w-5 h-5 border-gray-300 rounded text-[#a40049] focus:ring-[#a40049] cursor-pointer accent-[#a40049]" 
                  />
                </div>
                <label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed cursor-pointer font-medium">
                  I have read and agree to the {" "}
                  <Link href="/privacy-policy" className="text-[#a40049] font-bold hover:underline transition-all">
                    Privacy Policy
                  </Link>
                  {" "}regarding the collection and use of my data.
                </label>
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-200">
                    <CheckCircle className="w-5 h-5 shrink-0 text-green-500" />
                    <p className="text-sm font-bold">Thank you! Your message has been sent successfully. We will get back to you shortly.</p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                    <p className="text-sm font-bold">{errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button (Dynamic State based on Checkbox & Loading) */}
              <button 
                type="submit" 
                disabled={!isPrivacyAccepted || isSubmitting}
                className={`w-full group relative px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 transform-gpu overflow-hidden
                  ${isPrivacyAccepted && !isSubmitting
                    ? "bg-gradient-to-r from-[#a40049] to-[#4d002c] border border-[#ff4d94]/30 text-white shadow-[0_10px_30px_rgba(164,0,73,0.4)] hover:shadow-[0_15px_40px_rgba(164,0,73,0.6)] cursor-pointer" 
                    : "bg-gray-200 text-gray-400 border-transparent cursor-not-allowed"
                  }
                `}
              >
                {isPrivacyAccepted && !isSubmitting && (
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-active:opacity-100 transition-opacity duration-100 pointer-events-none" />
                )}
                
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="relative z-10">Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <Send className={`w-5 h-5 relative z-10 transition-transform duration-300 transform-gpu ${isPrivacyAccepted ? "group-hover:translate-x-1 group-hover:-translate-y-1" : ""}`} />
                  </>
                )}
              </button>

            </form>

          </motion.div>

        </div>
      </div>
    </section>
  );
}