"use client";

import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";

export default function GalleryHero() {
  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-18 bg-[#FAFAFA] overflow-hidden border-b border-gray-100">
      
      {/* GPU Accelerated Smooth Background Glows (Zero Lag) */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-gradient-to-b from-[#a40049]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] bg-gradient-to-t from-[#ff4d94]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* PERFORMANCE FIX: Added transform-gpu and will-change to text animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 mb-6 shadow-sm transform-gpu will-change-[transform,opacity]"
        >
          <Camera className="w-4 h-4 text-[#a40049]" />
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-800 uppercase">
            Our Portfolio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.1] mb-6 transform-gpu will-change-[transform,opacity]"
        >
          Moments We've <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#ff4d94]">Crafted.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10 transform-gpu will-change-[transform,opacity]"
        >
          Explore our extensive gallery of world-class convocations, corporate launches, and premium events. We transform visions into unforgettable realities.
        </motion.p>

      </div>
    </section>
  );
}