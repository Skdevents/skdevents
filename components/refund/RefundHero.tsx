"use client";

import { motion } from "framer-motion";
import { Receipt, Clock } from "lucide-react";

export default function RefundHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#FAFAFA] overflow-hidden border-b border-gray-100">
      
      {/* GPU Accelerated Smooth Background Glows */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-gradient-to-b from-[#a40049]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-gradient-to-t from-[#ff4d94]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 mb-6 shadow-sm"
        >
          <Receipt className="w-4 h-4 text-[#a40049]" />
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-800 uppercase">
            Financial Agreements
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.1] mb-6"
        >
          Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#ff4d94]">Policy.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Thank you for choosing SKD Event Management. This policy outlines exactly how cancellations, postponements, and refunds are handled to ensure a fair and transparent process for all our premium events.
        </motion.p>
        
        {/* Last Updated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm cursor-default">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#a40049]" />
            <span className="text-xs sm:text-sm font-bold text-gray-800">
              Last Updated: 24th February 2026
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}