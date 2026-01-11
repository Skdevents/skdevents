// src/app/page.tsx
"use client";
import React, { useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { motion } from "framer-motion";
import { Send, CalendarHeart, Star } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    alert(`You are on the VIP list! Email: ${email}`);
    setEmail("");
  };

  return (
    // CHANGE 1: 'h-screen' wenuwata 'min-h-screen' damme. Podi phones wala content kapenne na ethakota scroll karanna puluwan.
    <div className="min-h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      
      {/* SPOTLIGHT EFFECT - Responsive adjustment */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* CHANGE 2: Padding adjust kala mobile walata (py-12 px-4) */}
      <div className="p-4 py-20 md:p-8 max-w-7xl mx-auto relative z-10 w-full flex flex-col justify-center min-h-[80vh] md:min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
            {/* BADGE */}
            <div className="flex justify-center mb-4 md:mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 text-[10px] md:text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    The Next Era of Events
                </span>
            </div>

          {/* MAIN HEADLINE - Fully Responsive Fonts */}
          {/* text-4xl (Mobile) -> sm:text-5xl (Small Tablet) -> md:text-7xl (Desktop) */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 tracking-tight leading-[1.1]">
            Unforgettable <br className="hidden sm:block" />
            Moments.
          </h1>
          
          {/* DESCRIPTION */}
          <p className="mt-4 md:mt-6 font-normal text-sm md:text-lg text-neutral-300 max-w-sm md:max-w-2xl mx-auto leading-relaxed px-2">
            From luxury weddings to massive corporate expos, we are redefining how events are experienced. 
            Join the waitlist to get exclusive early access.
          </p>
        </motion.div>

        {/* INPUT FORM - Responsive Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 md:mt-10 mx-auto w-full max-w-sm md:max-w-lg"
        >
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 hidden md:block"></div>
            
            {/* CHANGE 3: Flex-col on mobile (stack), Flex-row on desktop */}
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-transparent sm:bg-neutral-900 sm:ring-1 sm:ring-white/10 rounded-lg p-0 sm:p-1 gap-3 sm:gap-0">
                
                {/* Mobile Input Styling (Has background on mobile) */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-neutral-900 sm:bg-transparent ring-1 sm:ring-0 ring-white/10 rounded-lg sm:rounded-none border-none outline-none text-white px-4 py-3 md:py-4 placeholder:text-neutral-500 text-center sm:text-left"
                    required
                />
                
                {/* Responsive Button */}
                <button 
                    type="submit"
                    className="bg-white text-black px-6 py-3 md:py-2.5 rounded-lg sm:rounded-md font-medium hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                    Notify Me
                    <CalendarHeart size={18} className="text-black" />
                </button>
            </div>
          </form>
          
          <p className="text-center text-neutral-500 text-[10px] md:text-xs mt-6 uppercase tracking-widest opacity-60">
            Weddings | Concerts | Corporate
          </p>
        </motion.div>
      </div>
      
      {/* BACKGROUND MASK */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
}