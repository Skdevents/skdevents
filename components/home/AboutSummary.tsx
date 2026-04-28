"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";

export default function HomeAbout() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      
      {/* Subtle Background Elements - Added transform-gpu to prevent repaint lag on scroll */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#a40049]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            /* PERFORMANCE FIX: Hardware acceleration for text slide-in */
            className="w-full flex flex-col transform-gpu will-change-[transform,opacity]" 
          >
            {/* Header Area - Centered on Mobile/Tablet, Left on Desktop */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left mb-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-50 border border-gray-100 mb-6 shadow-sm">
                <Building2 className="w-4 h-4 text-[#a40049]" />
                <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">
                  Who We Are
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                Transforming Ideas into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#ff4d94]">Extraordinary Experiences.</span>
              </h2>
            </div>
            
            {/* Paragraphs - Centered on Mobile, Left Aligned on Desktop */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              
              {/* FIXED: Typography for Mobile. Added text-center sm:text-left (handled by parent), max-w, and leading-relaxed */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed sm:leading-loose mb-6 font-medium max-w-xl lg:max-w-none">
                Welcome to SKD Event Management. As an extended division of SKD Manufacturer (Pvt) Ltd, we blend creativity with precision to deliver world-class events. From distinguished convocations to grand corporate launches, we bring passion and innovation to every project.
              </p>

              {/* ISO Certification Highlight - NEW */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 bg-[#a40049]/5 border border-[#a40049]/20 rounded-2xl px-4 sm:px-5 py-3 mb-8 w-full max-w-xl lg:max-w-none">
  <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#a40049] text-white font-black text-[9px] sm:text-[10px] tracking-tighter shrink-0 shadow-md">
    ISO
  </span>
  <p className="text-sm sm:text-base text-gray-900 font-extrabold text-center">
    Proudly <span className="text-[#a40049]">ISO 9001:2015</span> Certified <span className="font-medium text-gray-600 ml-1 text-xs sm:text-sm hidden sm:inline">(Quality Management System)</span>
  </p>
</div>

              {/* Checkmark points from PDF - Left Aligned inside a centered container on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-md lg:max-w-none text-left">
                {["Strategic Planning", "Creative Design", "Precise Execution", "Unforgettable Experiences"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#a40049]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#a40049]" />
                    </div>
                    <span className="text-gray-800 font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button - Always centered on mobile, left on desktop */}
              <Link href="/about">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-[#a40049] to-[#4d002c] rounded-full font-bold text-white shadow-[0_10px_30px_rgba(164,0,73,0.3)] hover:shadow-[0_15px_40px_rgba(164,0,73,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto transform-gpu will-change-transform">
                  Discover Our Story
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* =========================================
              RIGHT SIDE: BENTO GRID (4 Images)
              ========================================= */}
          <div className="w-full">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 h-[500px] sm:h-[600px] lg:h-[650px]">
              
              {/* Column 1 (Pushed Down slightly) */}
              <div className="flex flex-col gap-4 sm:gap-6 pt-8 sm:pt-16">
                
                {/* Image 1: Tall */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative flex-[3] rounded-3xl overflow-hidden shadow-lg group cursor-pointer transform-gpu will-change-[transform,opacity]"
                >
                  <img 
                    src="/about/lighting.jpg" 
                    alt="SKD Event Experience" 
                    loading="lazy" /* FIXED: Lazy loading for below-the-fold performance */
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>

                {/* Image 2: Small Square */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative flex-[2] rounded-3xl overflow-hidden shadow-lg group cursor-pointer transform-gpu will-change-[transform,opacity]"
                >
                  <img 
                    src="/about/convocation.jpg" 
                    alt="SKD Convocation" 
                    loading="lazy" /* FIXED */
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>

              </div>

              {/* Column 2 (Pushed Up slightly) */}
              <div className="flex flex-col gap-4 sm:gap-6 pb-8 sm:pb-16">
                
                {/* Image 3: Small Square -> LOGO CONTAINER */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative flex-[2] rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white flex items-center justify-center p-6 group cursor-pointer transform-gpu will-change-[transform,opacity]"
                >
                  <img 
                    src="/logo.png" 
                    alt="SKD Event Management Logo" 
                    loading="lazy" /* FIXED */
                    decoding="async"
                    className="w-full h-full object-contain relative z-10" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50 z-0 transform-gpu" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-2 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-100 text-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out z-20 transform-gpu will-change-[transform,opacity]">
                    <span className="text-[#a40049] font-bold text-xs sm:text-sm block">ISO Certified</span>
                    <span className="text-gray-500 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">SKD Manufacturer</span>
                  </div>
                </motion.div>

                {/* Image 4: Tall */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative flex-[3] rounded-3xl overflow-hidden shadow-lg group cursor-pointer transform-gpu will-change-[transform,opacity]"
                >
                  <img 
                    src="/about/stage.jpg" 
                    alt="SKD Stage Setup" 
                    loading="lazy" /* FIXED */
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}