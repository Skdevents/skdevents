"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Share2 } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/event_skd/",
    gradient: "from-[#f09433] via-[#e6683c] to-[#bc1888]",
    // අලුතින් එකතු කල brand colors
    iconColor: "text-[#E1306C]",
    iconBg: "bg-[#E1306C]/10", 
    hoverBorder: "group-hover:border-[#E1306C]/40",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    iconColor: "text-[#1877F2]",
    iconBg: "bg-[#1877F2]/10",
    hoverBorder: "group-hover:border-[#1877F2]/40",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    )
  },
  {
    name: "TikTok",
    href: "#", 
    gradient: "from-[#000000] via-[#333333] to-[#000000]",
    iconColor: "text-black",
    iconBg: "bg-gray-100",
    hoverBorder: "group-hover:border-black/30",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    )
  },
  {
    name: "LinkedIn",
    href: "#",
    gradient: "from-[#0A66C2] to-[#004182]",
    iconColor: "text-[#0A66C2]",
    iconBg: "bg-[#0A66C2]/10",
    hoverBorder: "group-hover:border-[#0A66C2]/40",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full blur-[80px] pointer-events-none transform-gpu will-change-transform bg-gray-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 sm:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight transform-gpu will-change-[transform,opacity]"
          >
            Join Our <span className="text-[#a40049]">Community</span>
          </motion.h2>
        </div>
        
        {/* Cards Container - Supremely Responsive */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
          {socialLinks.map((social, index) => (
            <Link key={social.name} href={social.href} target="_blank" className="block group w-[47%] sm:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                // Responsive sizes: Mobile එකේදි w-full (47% container නිසා), Desktop වල w-44
                className={`relative w-full sm:w-44 h-14 sm:h-16 flex items-center justify-start px-2.5 sm:px-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden transform-gpu will-change-[transform,opacity] ${social.hoverBorder}`}
              >
                {/* Soft Brand Background Color inside card on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                
                {/* Side Accent bar - Thicker on hover */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${social.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Content Wrapper */}
                <div className="relative z-10 flex items-center gap-2.5 sm:gap-3 w-full ml-1">
                  
                  {/* Highlighted Icon Container - This fixes the "penne na" issue */}
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full ${social.iconBg} ${social.iconColor} group-hover:scale-110 transition-transform duration-300 transform-gpu shrink-0`}>
                    {social.icon}
                  </div>
                  
                  {/* Text Container */}
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-[13px] sm:text-[15px] font-bold text-gray-800 leading-none group-hover:text-gray-900 transition-colors">
                      {social.name}
                    </span>
                    
                    {/* Animated Arrow - Appears smoothly on hover */}
                    <ArrowUpRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 transform-gpu ${social.iconColor}`} />
                  </div>
                  
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}