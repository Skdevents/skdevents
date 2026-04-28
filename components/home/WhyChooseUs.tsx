"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Sparkles, ShieldCheck } from "lucide-react";

const features = [
  {
    id: "01",
    icon: Users,
    title: "Expertise & Network",
    desc: "Experienced passionate team combined with strong vendor partnerships to execute flawlessly.",
  },
  {
    id: "02",
    icon: DollarSign,
    title: "Tailored Solutions",
    desc: "Customized event solutions carefully planned to fit every specific budget and requirement.",
  },
  {
    id: "03",
    icon: Sparkles,
    title: "Premium Execution",
    desc: "High-quality décor, state-of-the-art multimedia, and world-class production standards.",
  },
  {
    id: "04",
    icon: ShieldCheck,
    title: "Client-First Approach",
    desc: "100% commitment to a transparent process, delivering unforgettable and stress-free experiences.",
  },
];

// Custom SVG for Downward Curve Arrow (Bold & Embossed)
const CurvedArrowDown = () => (
  <div className="hidden lg:flex items-center justify-center w-20 xl:w-28 h-full relative -mx-4 xl:-mx-5 mt-16 transform-gpu">
    <svg width="100%" height="100px" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_3px_5px_rgba(164,0,73,0.3)]">
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        d="M 0,20 C 40,20 50,80 100,80"
        stroke="url(#gradientDown)"
        strokeWidth="5"
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <motion.polygon
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1.5 }}
        points="86,70 100,80 86,90"
        fill="#a40049"
      />
      <defs>
        <linearGradient id="gradientDown" x1="0" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff4d94" stopOpacity="0.4" />
          <stop offset="1" stopColor="#a40049" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Custom SVG for Upward Curve Arrow (Bold & Embossed)
const CurvedArrowUp = () => (
  <div className="hidden lg:flex items-center justify-center w-20 xl:w-28 h-full relative -mx-4 xl:-mx-5 -mt-16 transform-gpu">
    <svg width="100%" height="100px" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_3px_5px_rgba(164,0,73,0.3)]">
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
        d="M 0,80 C 40,80 50,20 100,20"
        stroke="url(#gradientUp)"
        strokeWidth="5"
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <motion.polygon
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1.8 }}
        points="86,10 100,20 86,30"
        fill="#a40049"
      />
      <defs>
        <linearGradient id="gradientUp" x1="0" y1="80" x2="100" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a40049" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ff4d94" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default function WhyChooseUs() {
  return (
    <section className="py-14 bg-white relative overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white z-0 transform-gpu" />
      
      {/* GPU Accelerated Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#a40049]/5 rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#4d002c]/5 rounded-full blur-[100px] pointer-events-none delay-1000 transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/60 mb-5 shadow-sm transform-gpu"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#a40049] animate-pulse shadow-[0_0_10px_#a40049]" />
            <span className="text-[11px] sm:text-xs font-bold tracking-widest text-gray-800 uppercase">
              The SKD Advantage
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 transform-gpu"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#4d002c]">Us?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium transform-gpu"
          >
            We bring passion, innovation, and professionalism to every project, ensuring your event is flawlessly executed.
          </motion.p>
        </div>

        {/* Features Row */}
        <div className="flex flex-col lg:flex-row items-center justify-center relative w-full">
          
          {features.map((feature, index) => {
            const Icon = feature.icon;
            // Desktop alternate push down effect
            const isPushedDown = index % 2 !== 0;

            return (
              <div key={feature.id} className="flex flex-col lg:flex-row items-center relative z-20 w-full lg:w-auto">
                
                {/* THE CARD: 
                  - Horizontal Layout (Icon Left, Text Right) 
                  - Cute sizes, highly responsive 
                */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative w-full sm:w-[420px] lg:w-[270px] xl:w-[290px] p-5 sm:p-6 xl:p-7 rounded-[1.5rem] sm:rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-[0_20px_40px_-15px_rgba(164,0,73,0.2)] hover:border-[#a40049]/30 transition-all duration-500 hover:-translate-y-2 group overflow-hidden transform-gpu will-change-[transform,opacity] ${isPushedDown ? 'lg:mt-24' : 'lg:-mt-24'}`}
                >
                  {/* Giant Faded Number in Background */}
                  <div className="absolute -right-2 -bottom-4 text-[80px] sm:text-[100px] font-extrabold text-gray-50 select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-gray-100/60 transform-gpu">
                    {feature.id}
                  </div>

                  {/* Top glowing border effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a40049] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* HORIZONTAL FLEX CONTAINER */}
                  <div className="relative z-10 flex flex-row items-start gap-4">
                    
                    {/* Left: Icon Container */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#a40049]/10 to-[#4d002c]/5 border border-[#a40049]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 transform-gpu">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#a40049]" />
                    </div>

                    {/* Right: Content */}
                    <div className="flex-1 text-left pt-0.5 sm:pt-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#a40049] transition-colors duration-300 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed transition-colors">
                        {feature.desc}
                      </p>
                    </div>

                  </div>
                </motion.div>

                {/* Connecting Arrows for Desktop */}
                {index === 0 && <CurvedArrowDown />}
                {index === 1 && <CurvedArrowUp />}
                {index === 2 && <CurvedArrowDown />}

                {/* Connecting Arrows for Mobile/Tablet (Bold & Embossed) */}
                {index !== features.length - 1 && (
                  <div className="lg:hidden flex justify-center py-3 sm:py-4 transform-gpu">
                    <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="drop-shadow-[0_3px_4px_rgba(164,0,73,0.35)]">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        d="M12 0L12 28M12 28L6 22M12 28L18 22"
                        stroke="url(#mobileGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="mobileGradient" x1="12" y1="0" x2="12" y2="32" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ff4d94" />
                          <stop offset="1" stopColor="#a40049" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}