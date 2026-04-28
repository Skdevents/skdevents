"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export default function AboutMission() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      
      {/* PERFORMANCE FIX: Added transform-gpu and will-change-transform to offload heavy blurs to the GPU */}
      <div className="absolute top-0 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#a40049]/5 rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute bottom-0 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#4d002c]/5 rounded-full blur-[100px] pointer-events-none delay-1000 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================
            MISSION & VISION CARDS (Light Theme)
            ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            /* PERFORMANCE FIX: GPU Acceleration for the sliding card */
            className="relative p-8 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-[0_20px_40px_-15px_rgba(164,0,73,0.15)] hover:border-[#a40049]/30 transition-all duration-500 group overflow-hidden transform-gpu will-change-[transform,opacity]"
          >
            {/* Top Glowing Line on Hover */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a40049] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon Container */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#a40049]/10 to-[#4d002c]/5 border border-[#a40049]/20 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10 transform-gpu">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-[#a40049]" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#a40049] transition-colors duration-300">
                Our Mission
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium">
                To deliver exceptional, stress-free, and memorable events through creativity, innovation, and with world-class service.
              </p>
            </div>
            
            {/* Giant Faded Watermark Background - GPU Accelerated for hover scale */}
            <div className="absolute -right-6 -bottom-6 text-[150px] font-extrabold text-gray-50 select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-gray-100/50 pointer-events-none transform-gpu">
              01
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            /* PERFORMANCE FIX: GPU Acceleration for the sliding card */
            className="relative p-8 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-[0_20px_40px_-15px_rgba(164,0,73,0.15)] hover:border-[#a40049]/30 transition-all duration-500 group overflow-hidden transform-gpu will-change-[transform,opacity]"
          >
            {/* Top Glowing Line on Hover */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a40049] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon Container */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#a40049]/10 to-[#4d002c]/5 border border-[#a40049]/20 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10 transform-gpu">
              <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-[#a40049]" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#a40049] transition-colors duration-300">
                Our Vision
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium">
                To be one of Sri Lanka’s most trusted and sought-after event management companies, recognized for excellence, creativity, and reliability.
              </p>
            </div>

            {/* Giant Faded Watermark Background - GPU Accelerated for hover scale */}
            <div className="absolute -right-6 -bottom-6 text-[150px] font-extrabold text-gray-50 select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-gray-100/50 pointer-events-none transform-gpu">
              02
            </div>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}