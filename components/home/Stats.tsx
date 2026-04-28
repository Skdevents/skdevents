"use client";

import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Award, Building2, CalendarCheck, HeartHandshake } from "lucide-react";

// ========================================================================
// PERFORMANCE FIX: Zero-Lag Smooth Counter
// Bypassed React 'useState' completely. Using Framer Motion's useMotionValue 
// to animate directly in the DOM. This stops hundreds of CPU-heavy re-renders!
// ========================================================================
const SmoothCounter = ({ target, duration = 2, suffix = "" }: { target: number, duration?: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: duration, ease: "easeOut" });
    }
  }, [isInView, target, duration, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
};

// Extracted & Strategized Stats based on PDF data
const stats = [
  {
    id: 1,
    icon: Award,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    desc: "In the event industry",
  },
  {
    id: 2,
    icon: Building2,
    value: 50,
    suffix: "+",
    label: "Corporate Clients",
    desc: "Premier institutions & brands",
  },
  {
    id: 3,
    icon: CalendarCheck,
    value: 100,
    suffix: "+",
    label: "Successful Events",
    desc: "Flawlessly executed moments",
  },
  {
    id: 4,
    icon: HeartHandshake,
    value: 100,
    suffix: "%",
    label: "Client Commitment",
    desc: "Unforgettable experiences",
  },
];

export default function Stats() {
  return (
    // FIXED: Adjusted main padding for a slightly tighter, cleaner section
    <section className="py-10 md:py-14 bg-white relative z-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Premium Floating Glassmorphic Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // FIXED: Adjusted padding (p-6 sm:p-8 md:p-10) to make the box perfectly proportioned
          className="relative rounded-[2rem] md:rounded-[3rem] bg-[#050505] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(164,0,73,0.4)] overflow-hidden transform-gpu will-change-[transform,opacity]"
        >
          
          {/* Ambient Inner Glows */}
          <div className="absolute top-0 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-[#a40049]/20 rounded-full blur-[80px] pointer-events-none transform-gpu will-change-transform" />
          <div className="absolute bottom-0 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-[#ff4d94]/10 rounded-full blur-[80px] pointer-events-none transform-gpu will-change-transform" />
          
          {/* Subtle Border Gradient */}
          <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] border border-white/10 pointer-events-none" />

          {/* RESPONSIVE GRID SYSTEM */}
          {/* FIXED: Reduced vertical and horizontal gaps slightly for a more compact look */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-6 lg:gap-10">
            
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.id} 
                  className="flex flex-col items-center text-center group px-1 sm:px-0"
                >
                  
                  {/* Glowing Icon - FIXED: Scaled down icon container and icon for a cuter look */}
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 sm:mb-5 shadow-inner group-hover:bg-[#a40049]/20 transition-colors duration-500 transform-gpu">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-[#ff4d94] group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Animated Counter - FIXED: Scaled down text size to be less bulky */}
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1 tracking-tight transform-gpu">
                    <SmoothCounter target={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Labels - FIXED: Refined font sizes */}
                  <h3 className="text-[12px] sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white mb-1 leading-tight">
                    {stat.label}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium max-w-[120px] sm:max-w-[180px] leading-snug hidden sm:block">
                    {stat.desc}
                  </p>
                  
                </div>
              );
            })}

          </div>

        </motion.div>
      </div>

    </section>
  );
}