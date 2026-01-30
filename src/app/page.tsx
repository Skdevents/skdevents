// src/app/page.tsx
"use client";
import React, { useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { motion } from "framer-motion";
import { Send, GraduationCap, Settings2, Sparkles } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    alert(`Thank you! We will notify you when we are back. Email: ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen w-full rounded-md flex md:items-center md:justify-center bg-black relative overflow-hidden">
      
      {/* --- BACKGROUND IMAGE SECTION --- */}
      {/* Mekata api supiri Graduation Image ekak damme. */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
            // Graduation caps in the air - Dark & Premium look
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=3270&auto=format&fit=crop" 
            alt="Graduation Background"
            className="w-full h-full object-cover opacity-40" 
        />
        {/* Gradient Overlay - Text eka clear penna meka udin damme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
        {/* Grid Pattern Overlay - Thawa tech/modern look ekak ganna */}
        <div className="absolute inset-0 bg-grid-white/[0.03]"></div>
      </div>

      {/* --- SPOTLIGHT EFFECT --- */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 z-10"
        fill="white"
      />
      
      {/* --- CONTENT SECTION --- */}
      <div className="p-4 py-20 md:p-8 max-w-7xl mx-auto relative z-20 w-full flex flex-col justify-center min-h-[80vh] md:min-h-0">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
            {/* MAINTENANCE BADGE */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-8"
            >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 text-[10px] md:text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    <Settings2 size={14} className="animate-spin-slow text-yellow-400" />
                    System Under Maintenance
                </span>
            </motion.div>

          {/* MAIN HEADLINE */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500 tracking-tighter leading-[1] drop-shadow-2xl">
            We Are <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Upgrading.</span>
          </h1>
          
          {/* DESCRIPTION */}
          <p className="mt-8 font-light text-base md:text-xl text-neutral-300 max-w-sm md:max-w-2xl mx-auto leading-relaxed px-4">
            We are redefining the experience exclusively for <span className="text-white font-medium border-b border-yellow-500/50">Graduation Events</span>. 
            The next era of celebration is being built right now.
          </p>
        </motion.div>

        {/* NOTIFICATION FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 mx-auto w-full max-w-sm md:max-w-lg"
        >
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/50 to-purple-600/50 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-1 gap-2 sm:gap-0 shadow-2xl">
                
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for early access"
                    className="flex-1 bg-transparent border-none outline-none text-white px-6 py-4 placeholder:text-neutral-500 text-center sm:text-left text-sm md:text-base"
                    required
                />
                
                <button 
                    type="submit"
                    className="bg-white hover:bg-neutral-200 text-black px-8 py-3.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                    Notify Me
                    <Send size={16} className="text-black" />
                </button>
            </div>
          </form>
          
          {/* FOOTER ICONS */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col items-center mt-12 gap-3"
          >
            <p className="text-center text-neutral-600 text-[10px] md:text-xs uppercase tracking-[0.2em]">
              Exclusive Partner For
            </p>
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                <GraduationCap size={20} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                <span className="font-medium text-neutral-200 text-sm tracking-wide">Elite Graduation Ceremonies</span>
                <Sparkles size={16} className="text-yellow-400" />
            </div>
          </motion.div>
        </motion.div>
      </div>
      
    </div>
  );
}