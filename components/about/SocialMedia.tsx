"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Share2 } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/event_skd/",
    gradient: "from-[#f09433] via-[#e6683c] to-[#bc1888]",
    accent: "bg-[#a40049]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1READQGoer/?mibextid=wwXIfr",
    gradient: "from-[#1877F2] to-[#0C5EBF]",
    accent: "bg-[#1877F2]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    )
  },
  {
    name: "TikTok",
    href: "#", 
    gradient: "from-[#000000] via-[#000000] to-[#000000]", // Black background for TikTok
    accent: "bg-black", // Pure black side bar for TikTok
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    )
  },
  {
    name: "LinkedIn",
    href: "#",
    gradient: "from-[#0A66C2] to-[#004182]",
    accent: "bg-[#0A66C2]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  }
];

export default function SocialMedia() {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      
      {/* Subtle Background Glow - Optimized for White Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]  rounded-full blur-[80px] pointer-events-none transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - Compact & Professional */}
        <div className="flex flex-col items-center mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            /* PERFORMANCE FIX: GPU Acceleration */
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-4 shadow-sm transform-gpu will-change-[transform,opacity]"
          >
            <Share2 className="w-3.5 h-3.5 text-[#a40049]" />
            <span className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">
              Connect With Us
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            /* PERFORMANCE FIX: GPU Acceleration */
            className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight transform-gpu will-change-[transform,opacity]"
          >
            Join Our <span className="text-[#a40049]">Community</span>
          </motion.h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {socialLinks.map((social, index) => (
            <Link key={social.name} href={social.href} target="_blank" className="block group">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                /* FIXED SIZE: w-40 (160px) ensures all boxes look identical on mobile and desktop */
                /* PERFORMANCE FIX: Added transform-gpu and will-change to the animating card */
                className="relative w-40 sm:w-44 h-12 sm:h-16 flex items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden transform-gpu will-change-[transform,opacity]"
              >
                {/* Hover Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Side Accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${social.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-3">
                  <div className="text-gray-400 group-hover:text-[#a40049] transition-colors duration-300 transform-gpu">
                    {social.icon}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 leading-none">
                      {social.name}
                    </span>
                  </div>

                  {/* PERFORMANCE FIX: Added transform-gpu to arrow animation */}
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#a40049] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all transform-gpu" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}