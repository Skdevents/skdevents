"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Crown, LayoutGrid } from "lucide-react";

// NEW 8 SERVICES WITH STANDARD DESCRIPTIONS
const services = [
  {
    id: 1,
    title: "Event Management & Coordination",
    desc: "Flawless execution from registration to seating, ensuring a perfectly organized experience for all guests and VIPs.",
    img: "/services/convocation.jpg",
  },
  {
    id: 2,
    title: "Time Management & Coordination",
    desc: "Precision scheduling and synchronization to keep every moment of your prestigious ceremony exactly on track.",
    img: "/services/time.jpg",
  },
  {
    id: 3,
    title: "Photography & Videography",
    desc: "Professional coverage capturing stage moments, group photos, and cinematic highlight videos of your event.",
    img: "/services/photography.jpg",
  },
  {
    id: 4,
    title: "Entertainment & Cultural Acts",
    desc: "Captivating traditional and modern performances, including Wes dance, Puja dance, and instrumental acts.",
    img: "/services/entertainment.jpg",
  },
  {
    id: 5,
    title: "Master of Ceremony & Compere",
    desc: "Expert bilingual hosts to guide your event seamlessly with an engaging, formal, and professional delivery.",
    img: "/services/mc.jpg",
  },
  {
    id: 6,
    title: "Stage Arrangements, Sounds & Lighting",
    desc: "Stunning stage setups, LED walls, crystal-clear audio, and dynamic lighting for a magnificent atmosphere.",
    img: "/services/stagephoto.jpg",
  },
  {
    id: 7,
    title: "Premium Graduation Items",
    desc: "High-quality graduation cloaks, elegant hoods, and beautifully crafted fresh flower garlands.",
    img: "/services/graduation.jpg",
  },
  {
    id: 8,
    title: "Manufacturing & Printing",
    desc: "Official printed materials, secure certificate pouches, and custom flags tailored to your institution.",
    img: "/services/print.jpg",
  },
];

export default function HomeServices() {
  return (
    <section className="py-10 md:py-16 bg-white relative overflow-hidden">
      
      {/* PERFORMANCE FIX & SPEED INCREASE (80s -> 45s for faster mobile scroll) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes mobile-slide {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .gpu-slider-track {
          display: flex;
          width: max-content;
          animation: mobile-slide 45s linear infinite;
          will-change: transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }
      `}} />

      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gradient-to-bl from-[#a40049]/5 to-transparent rounded-full blur-[70px] md:blur-[90px] pointer-events-none transform-gpu" />

      {/* FIXED: Changed max-w-[90rem] to max-w-7xl to perfectly align with About and Partners sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end mb-10 md:mb-14 gap-6 text-center lg:text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-auto flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-100 mb-5 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-[#a40049]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-gray-800 uppercase">
                Premium Offerings
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Our Signature <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#4d002c]">Services</span>
            </h2>
          </motion.div>

          {/* EYE-CATCHING DESKTOP BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex"
          >
            <Link href="/services">
              <button className="group relative px-7 py-3.5 bg-gradient-to-r from-[#a40049] to-[#4d002c] rounded-full font-bold text-white shadow-[0_8px_20px_-6px_rgba(164,0,73,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(164,0,73,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
                <LayoutGrid className="w-4 h-4 text-white/80" />
                Explore All Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ==============================================
            DESKTOP & TABLET GRID (4 Columns, Cute Sizes)
            ============================================== */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={`desktop-${service.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative h-[300px] lg:h-[340px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-900 transform-gpu"
            >
              <img
                src={service.img}
                alt={service.title}
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-30 transform-gpu will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              
              {/* Vibrant Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#a40049]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-end">
                <h3 className="text-lg lg:text-xl font-bold text-white mb-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 transform-gpu leading-snug">
                  {service.title}
                </h3>
                <div className="overflow-hidden">
                  <p className="text-white/90 text-xs lg:text-sm leading-relaxed opacity-0 transform translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 transform-gpu line-clamp-3">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ==============================================
            MOBILE INFINITE SCROLL SLIDER (Cute & Fast)
            ============================================== */}
        <div className="block md:hidden overflow-hidden relative w-full pb-6">
          <div className="gpu-slider-track">
            
            {/* First Set of Cards */}
            <div className="flex gap-3.5 pr-3.5">
              {services.map((service) => (
                <div
                  key={`mobile-1-${service.id}`}
                  tabIndex={0}
                  className="relative w-[75vw] sm:w-[280px] h-[320px] rounded-2xl overflow-hidden shadow-md bg-gray-900 flex-shrink-0 group focus:outline-none cursor-pointer transform-gpu"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-700 group-focus:scale-110 transform-gpu will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none transition-colors duration-500 group-focus:from-[#a40049]/90 group-focus:via-black/60" />
                  
                  <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
                    <h3 className="text-xl font-extrabold text-white mb-1.5 transform transition-transform duration-500 ease-out group-focus:-translate-y-1 transform-gpu leading-snug">
                      {service.title}
                    </h3>
                    <div className="grid grid-rows-[0fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="overflow-hidden">
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed opacity-0 group-focus:opacity-100 transition-opacity duration-700 delay-100 pt-1.5 transform-gpu line-clamp-3">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Set of Cards for infinite scroll */}
            <div className="flex gap-3.5 pr-3.5">
              {services.map((service) => (
                <div
                  key={`mobile-2-${service.id}`}
                  tabIndex={0}
                  className="relative w-[75vw] sm:w-[280px] h-[320px] rounded-2xl overflow-hidden shadow-md bg-gray-900 flex-shrink-0 group focus:outline-none cursor-pointer transform-gpu"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-700 group-focus:scale-110 transform-gpu will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none transition-colors duration-500 group-focus:from-[#a40049]/90 group-focus:via-black/60" />
                  
                  <div className="absolute inset-0 p-5 flex flex-col justify-end z-10">
                    <h3 className="text-xl font-extrabold text-white mb-1.5 transform transition-transform duration-500 ease-out group-focus:-translate-y-1 transform-gpu leading-snug">
                      {service.title}
                    </h3>
                    <div className="grid grid-rows-[0fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="overflow-hidden">
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed opacity-0 group-focus:opacity-100 transition-opacity duration-700 delay-100 pt-1.5 transform-gpu line-clamp-3">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* EYE-CATCHING MOBILE BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex lg:hidden justify-center mt-4"
        >
          <Link href="/services" className="w-full">
            <button className="w-full group relative px-6 py-3.5 bg-gradient-to-r from-[#a40049] to-[#4d002c] rounded-xl font-bold text-white shadow-[0_8px_20px_-6px_rgba(164,0,73,0.4)] hover:shadow-lg transition-all flex items-center justify-center gap-2 transform-gpu text-sm">
              <LayoutGrid className="w-4 h-4 text-white/80" />
              Explore All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}