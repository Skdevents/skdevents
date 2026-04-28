"use client";

import { motion } from "framer-motion";
import { Map } from "lucide-react";

export default function ContactMap() {
  return (
    <section className="py-10 pb-16 md:pb-12 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Map Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          /* PERFORMANCE FIX: Added GPU Acceleration for the header animation */
          className="flex items-center gap-3 mb-8 transform-gpu will-change-[transform,opacity]"
        >
          <div className="w-10 h-10 rounded-full bg-[#a40049]/10 flex items-center justify-center">
            <Map className="w-5 h-5 text-[#a40049]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Visit Our Office</h2>
        </motion.div>

        {/* Google Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          /* PERFORMANCE FIX: GPU Acceleration to prevent massive iframe scroll lag */
          className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-200 relative group transform-gpu will-change-[transform,opacity]"
        >
          {/* Map loading overlay (optional aesthetic) */}
          <div className="absolute inset-0 bg-gray-100 animate-pulse -z-10" />

          {/* Google Maps Embed iframe mapping exact address: Reality Plaza, Ja-Ela */}
          <iframe 
            src="https://maps.google.com/maps?q=Reality%20Plaza%2C%20Colombo%20Road%2C%20Ja-Ela%2C%20Sri%20Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            /* PERFORMANCE FIX: Added transform-gpu to the iframe itself */
            className="w-full h-full relative z-10 filter group-hover:contrast-100 transition-all duration-700 transform-gpu"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}