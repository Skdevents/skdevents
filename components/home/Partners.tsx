"use client";

import { motion } from "framer-motion";

const partnerLogos = [
  "/partners/dlc_ppp_logo.png",
  "/partners/nocn_collabration.png",
  "/partners/ies_campus.png",
  "/partners/dlc_ppp_logo2.png",
  "/partners/nocn_collabration2.png",
  "/partners/ies_campus2.png",
  "/partners/dlc_ppp_logo3.png",  
  "/partners/nocn_collabration3.png", 
  "/partners/ies_campus3.png",
];

export default function Partners() {
  return (
    <section className="py-18 bg-white relative overflow-hidden border-t border-gray-100">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-slide-fast {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .css-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-slide-fast 25s linear infinite;
          will-change: transform;
        }
      `}} />

      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        {/* Animated Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-6 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#a40049] animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-gray-600 uppercase">
            Global Network
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
        >
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#4d002c]">Industry Leaders</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-gray-500 max-w-2xl mx-auto font-medium"
        >
          Collaborating with premier institutions and organizations to deliver excellence and unmatched quality in every event.
        </motion.p>
      </div>

      {/* Infinite Scrolling Marquee Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Edge Fade Masks to make it look smooth when entering/exiting */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex overflow-hidden relative w-full">
          {/* Using pure CSS class instead of motion.div for infinite scroll */}
          <div className="css-marquee-track">
            {/* Block 1 */}
            <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
              {partnerLogos.map((logo, index) => (
                <div
                  key={`set1-${index}`}
                  className="relative w-32 h-16 md:w-48 md:h-24 flex-shrink-0 group cursor-pointer"
                >
                  <img
                    src={logo}
                    alt={`Partner Logo ${index + 1}`}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 transform-gpu"
                  />
                </div>
              ))}
            </div>

            {/* Block 2 (Exact Duplicate for Seamless Loop) */}
            <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
              {partnerLogos.map((logo, index) => (
                <div
                  key={`set2-${index}`}
                  className="relative w-32 h-16 md:w-48 md:h-24 flex-shrink-0 group cursor-pointer"
                >
                  <img
                    src={logo}
                    alt={`Partner Logo ${index + 1}`}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 transform-gpu"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}