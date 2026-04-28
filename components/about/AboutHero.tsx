"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown, ShieldCheck } from "lucide-react";

export default function AboutHero() {
  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white pt-36 md:pt-42 pb-24 md:pb-32">
      
      {/* PERFORMANCE FIX: Added transform-gpu and will-change-transform to offload heavy blur to the GPU */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#a40049]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            // PERFORMANCE FIX: GPU Acceleration for text container
            className="flex flex-col items-center text-center lg:items-start lg:text-left transform-gpu will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 mb-6 shadow-sm">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-800 uppercase">
                Welcome to SKD Event Management
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.1] mb-6">
              Where Creativity <br className="hidden sm:block" />
              Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#ff4d94]">Precision.</span>
            </h1>
            
            <p className="text-gray-600 text-lg sm:text-xl md:text-xl leading-relaxed font-medium mb-4 max-w-2xl">
              We are a full-service event planning and production company dedicated to transforming your ideas into extraordinary experiences.
            </p>

            <p className="text-[#a40049] text-lg font-bold tracking-wide italic mb-8">
              Your Event. Our Expertise. Simply Unforgettable.
            </p>

            <motion.button 
  onClick={handleScroll}
  whileHover={{ y: -3 }}
  whileTap={{ scale: 0.92 }} 
  className="mt-4 w-full sm:w-auto group relative px-8 sm:px-10 py-4 bg-gradient-to-r from-[#a40049] to-[#4d002c] rounded-full font-bold text-white text-base sm:text-lg shadow-[0_10px_30px_rgba(164,0,73,0.4)] hover:shadow-[0_15px_40px_rgba(164,0,73,0.6)] transition-all duration-300 flex items-center justify-center gap-3 border border-[#ff4d94]/30 transform-gpu overflow-hidden"
>
  <div className="absolute inset-0 bg-black/30 opacity-0 group-active:opacity-100 transition-opacity duration-100 pointer-events-none" />
  
  <span className="relative z-10">Explore Our Story</span>
  <ArrowDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
</motion.button>
          </motion.div>

          {/* =========================================
              RIGHT SIDE: ASYMMETRICAL BENTO MASONRY
              ========================================= */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] mt-10 lg:mt-0">
            {/* PERFORMANCE FIX: GPU Accelerated Center Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#a40049]/10 rounded-full blur-[80px] pointer-events-none z-0 transform-gpu will-change-transform" />

            <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full relative z-10">
              {/* Column 1 */}
              <div className="flex flex-col gap-4 sm:gap-6 pt-12 sm:pt-20">
                
                {/* PERFORMANCE FIX: Added decoding="async" loading="eager" to Images & will-change-transform to motion.div */}
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative flex-[3] rounded-3xl overflow-hidden shadow-xl group cursor-pointer bg-gray-200 transform-gpu will-change-transform">
                  <img src="/services/stage.jpg" alt="Stage" decoding="async" loading="eager" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110 transform-gpu" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                </motion.div>
                
                {/* --- ISO CERTIFIED BOX --- */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8, delay: 0.4 }} 
                  className="relative flex-[2] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-4 sm:p-6 flex flex-col justify-center items-center text-center group transform-gpu will-change-transform"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a40049] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#a40049]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500 transform-gpu">
                    <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#a40049]" />
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl mb-1">ISO Certified</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Extended Division of <br/>
                    <span className="text-[#a40049]">SKD Manufacturer</span>
                  </p>
                </motion.div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-4 sm:gap-6 pb-12 sm:pb-20">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="relative flex-[2] rounded-3xl overflow-hidden shadow-xl group cursor-pointer bg-gray-200 transform-gpu will-change-transform">
                  <img src="/about/convocation.jpg" alt="Backdrop" decoding="async" loading="eager" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110 transform-gpu" />
                  <div className="absolute inset-0 bg-[#a40049]/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="relative flex-[3] rounded-3xl overflow-hidden shadow-xl group cursor-pointer bg-gray-200 transform-gpu will-change-transform">
                  <img src="/services/lighting.jpg" alt="Lighting" decoding="async" loading="eager" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110 transform-gpu" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}