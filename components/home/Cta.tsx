"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PhoneCall, Mail } from "lucide-react";

export default function Cta() {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-orb1 {
          0%, 100% { transform: scale(1) translate3d(0,0,0); opacity: 0.3; }
          50% { transform: scale(1.2) translate3d(0,0,0); opacity: 0.5; }
        }
        @keyframes pulse-orb2 {
          0%, 100% { transform: scale(1) translate3d(0,0,0); opacity: 0.2; }
          50% { transform: scale(1.5) translate3d(0,0,0); opacity: 0.4; }
        }
        .css-animated-orb1 {
          animation: pulse-orb1 8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .css-animated-orb2 {
          animation: pulse-orb2 10s ease-in-out infinite 1s;
          will-change: transform, opacity;
        }
      `}} />

       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-100 via-white to-white z-0 transform-gpu" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#050505] shadow-[0_20px_50px_-15px_rgba(164,0,73,0.3)] group transform-gpu will-change-[transform,opacity]"
        >
          {/* Animated Gradient Backgrounds & Orbs */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4d002c] via-[#050505] to-[#a40049] opacity-80" />
          
          {/* CSS Accelerated Orb 1 */}
          <div 
            className="css-animated-orb1 absolute top-[-20%] right-[-10%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-[#ff4d94] rounded-full blur-[100px] mix-blend-screen pointer-events-none transform-gpu" 
          />
          
          {/* CSS Accelerated Orb 2 */}
          <div 
            className="css-animated-orb2 absolute bottom-[-20%] left-[-10%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-[#a40049] rounded-full blur-[120px] pointer-events-none transform-gpu" 
          />

          {/* Grid Pattern Overlay for High-Tech feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />

          {/* Content Container - FIXED: Reduced paddings for a more compact, cute look */}
          <div className="relative z-20 px-6 py-12 md:py-16 lg:px-16 flex flex-col items-center text-center">
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md transform-gpu"
            >
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase">
                Let's Work Together
              </span>
            </motion.div>

            {/* FIXED: Scaled down text sizes slightly to avoid bulkiness */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 sm:mb-5 leading-[1.15] max-w-3xl transform-gpu"
            >
              Ready to Create an <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d94] to-[#a40049]">Unforgettable Experience?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base text-gray-300 max-w-xl mb-8 sm:mb-10 font-medium leading-relaxed transform-gpu px-4"
            >
              From conceptualization to flawless execution, we bring passion, innovation, and professionalism to every project. Book your event with us today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              /* FIXED: Reduced gap and adjusted button sizes for a sleeker look */
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto transform-gpu px-4 sm:px-0"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-white rounded-full font-bold text-gray-900 text-sm sm:text-base shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                  Request a Quotation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-[#a40049]" />
                </button>
              </Link>

              <Link href="/services" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center text-sm sm:text-base">
                  Explore Services
                </button>
              </Link>
            </motion.div>

            {/* Quick Contact Info at the bottom of CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              /* FIXED: Reduced top margin and padding for a tighter, cleaner layout */
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-2xl transform-gpu"
            >
              <a href="tel:+94112248181" className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group">
                <div className="p-2 sm:p-2.5 rounded-full bg-white/5 group-hover:bg-[#a40049]/20 transition-colors">
                  <PhoneCall className="w-4 h-4 text-[#ff4d94]" />
                </div>
                <span className="text-sm font-semibold tracking-wide">+94 112 248 181</span>
              </a>
              
              <a href="mailto:info@skdevents.lk" className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group">
                <div className="p-2 sm:p-2.5 rounded-full bg-white/5 group-hover:bg-[#a40049]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#ff4d94]" />
                </div>
                <span className="text-sm font-semibold tracking-wide">info@skdevents.lk</span>
              </a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}