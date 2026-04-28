"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

const backgroundImages = [
  "/graduatebg.jpg",
  "/graduatebg1.jpg"
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); 

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#050505] group"> 
      
      {/* ========================================================================
          PERFORMANCE & ANIMATION FIX:
          Restored Framer Motion (<motion.img>) for the beautiful initial load animation!
          Kept images permanently in the DOM to prevent lag.
          Base image is always opacity 1 after load, top image fades in/out over it.
          ======================================================================== */}
      {backgroundImages.map((src, index) => {
        const isBaseImage = index === 0;
        const isActive = index === currentImageIndex;

        return (
          <motion.img
            key={src}
            src={src}
            alt={`SKD Event Management Background ${index + 1}`}
            loading="eager"
            fetchPriority={isBaseImage ? "high" : "auto"}
            decoding="async"
            // The beautiful initial load animation is back!
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: isBaseImage ? 1 : (isActive ? 1 : 0), 
              scale: isActive ? 1 : 1.05 
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full object-cover transform-gpu will-change-[transform,opacity] ${
              isBaseImage ? "z-0" : "z-10"
            }`}
          />
        );
      })}

      {/* Gradients & Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-[#050505] mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#a40049]/20 to-transparent" />
      <div className="absolute inset-0 z-[15] bg-transparent group-hover:bg-black/50 transition-colors duration-[1500ms] pointer-events-none" />
      
      {/* Content wrapper - Added pb-20 to prevent collision with scroll arrow on small screens */}
      <div className="relative z-20 text-center px-4 w-full max-w-6xl mx-auto flex flex-col items-center pt-16 md:pt-20 pb-20 md:pb-0">
  
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg mb-6 sm:mb-8"
        >
          <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] text-white uppercase text-center">
            Inspired Events, Lasting Impressions
          </span>
        </motion.div>
        
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.1] mb-6 sm:mb-8 text-white drop-shadow-2xl"
        >
          We Don' t Just <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-[#ff0066] py-2">
            Plan Events.
          </span><br className="hidden sm:block" />
          We Define Them.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 sm:mb-12 font-medium leading-relaxed drop-shadow-md px-2 sm:px-0"
        >
          Premium Event Management Solutions Crafted with Precision, Creativity, and Purpose.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }} 
              className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 bg-gradient-to-r from-[#a40049] to-[#4d002c] rounded-full font-bold text-white text-base sm:text-lg shadow-[0_10px_30px_rgba(164,0,73,0.4)] hover:shadow-[0_15px_40px_rgba(164,0,73,0.6)] transition-all duration-300 flex items-center justify-center gap-3 border border-[#ff4d94]/30 transform-gpu overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/30 opacity-0 group-active:opacity-100 transition-opacity duration-100 pointer-events-none" />
              
              <span className="relative z-10">Request a Quote</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </Link>

          <Link href="/services" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }} 
              className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 rounded-full font-bold text-white border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform-gpu overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-100 pointer-events-none" />
              
              <span className="relative z-10">Explore Services</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Down Indicator - Minimal Bouncing Arrow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronDown className="w-6 h-6 text-white/80" />
        </motion.div>
      </motion.div>

    </section>
  );
}