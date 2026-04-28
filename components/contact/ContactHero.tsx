"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, Clock, ShieldCheck } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAFA] overflow-hidden border-b border-gray-100">
      
      {/* GPU Accelerated Smooth Background Glows */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-gradient-to-b from-[#a40049]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-gradient-to-t from-[#ff4d94]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* PERFORMANCE FIX: Added GPU acceleration to all text animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 mb-6 shadow-sm transform-gpu will-change-[transform,opacity]"
        >
          <MessageSquare className="w-4 h-4 text-[#a40049]" />
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-800 uppercase">
            Get In Touch
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.1] mb-6 transform-gpu will-change-[transform,opacity]"
        >
          Let's Plan Your Next <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#ff4d94]">Big Event.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto transform-gpu will-change-[transform,opacity]"
        >
          Have a vision? We have the expertise. Reach out to our team, and let's start crafting an unforgettable experience today.
        </motion.p>
        
        {/* =========================================
            NEW: TRUST & RESPONSE BADGES ROW
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 mt-10 transform-gpu will-change-[transform,opacity]"
        >
          {/* Badge 1: Fast Response - Added transform-gpu for the hover effect */}
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default transform-gpu">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#a40049]" />
            <span className="text-xs sm:text-sm font-bold text-gray-800">Fast Response</span>
          </div>

          {/* Badge 2: 24-Hour Replies */}
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default transform-gpu">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff4d94]" />
            <span className="text-xs sm:text-sm font-bold text-gray-800">24-Hour Replies</span>
          </div>

          {/* Badge 3: Transparent Process (Extracted from PDF) */}
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default transform-gpu">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#a40049]" />
            <span className="text-xs sm:text-sm font-bold text-gray-800">Transparent Process</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}