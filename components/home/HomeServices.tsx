"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Crown, Sparkles } from "lucide-react";

// PDF Extracted Content
const services = [
  {
    id: 1,
    title: "Stage Setup",
    desc: "A professionally designed stage with podium, backdrop, lighting, and seating for dignitaries to ensure a formal and elegant ceremony.",
    img: "/services/stage.jpg",
  },
  {
    id: 2,
    title: "Graduation Backdrop",
    desc: "A branded backdrop featuring the institution's name, logo, and convocation theme for official photographs and stage presence.",
    img: "/services/backdrop.jpg",
  },
  {
    id: 3,
    title: "Multimedia & Screens",
    desc: "LED screens or projectors to display names, live video feed, presentations, or ceremonial content.",
    img: "/services/multimedia.jpg",
  },
  {
    id: 4,
    title: "Sound System",
    desc: "Clear audio equipment including microphones, speakers, and mixers to ensure speeches, announcements, and music are heard properly.",
    img: "/services/sound.jpg",
  },
  {
    id: 5,
    title: "Lighting Setup",
    desc: "Focused stage lighting, ambient lights, and spotlights to enhance visibility and create a professional atmosphere.",
    img: "/services/lighting.jpg",
  },
  {
    id: 6,
    title: "Photography & Videography",
    desc: "Professional photo and video coverage to capture stage moments, group photos, and highlights of the entire event.",
    img: "/services/photography.jpg",
  },
];

export default function HomeServices() {
  return (
    <section className="py-14 md:py-20 bg-white relative overflow-hidden">
      
      {/* PERFORMANCE FIX: Added Anti-Jitter properties (backface-visibility, perspective) for buttery smooth mobile scrolling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes mobile-slide {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .gpu-slider-track {
          display: flex;
          width: max-content;
          animation: mobile-slide 80s linear infinite;
          will-change: transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          perspective: 1000;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }
      `}} />

      {/* PERFORMANCE FIX: Added transform-gpu and will-change-transform to prevent repaint lag from the large blur */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-bl from-[#a40049]/5 to-transparent rounded-full blur-[80px] md:blur-[100px] pointer-events-none transform-gpu will-change-transform" />

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
      
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-end mb-12 md:mb-16 gap-8 text-center lg:text-left px-4 sm:px-0">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-auto flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-6 shadow-sm">
              <Crown className="w-4 h-4 text-[#a40049]" />
              <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">
                Premium Offerings
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Our Signature <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#4d002c]">Services</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex"
          >
            <Link href="/services">
              <button className="group relative px-8 py-4 bg-white border border-gray-200 rounded-full font-bold text-gray-900 shadow-sm hover:shadow-md hover:border-[#a40049] transition-all flex items-center justify-center gap-3">
                Explore All Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:text-[#a40049] transition-all" />
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-6 px-4 sm:px-0">
          {services.map((service, index) => (
            <motion.div
              key={`desktop-${service.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-900 transform-gpu"
            >
              {/* PERFORMANCE FIX: loading="eager" added for auto caching + transform-gpu */}
              <img
                src={service.img}
                alt={service.title}
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-40 transform-gpu will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[#a40049]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 transform-gpu will-change-transform">
                  {service.title}
                </h3>
                <div className="overflow-hidden">
                  <p className="text-gray-100 text-sm leading-relaxed opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 transform-gpu will-change-transform">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="block lg:hidden overflow-hidden relative w-full pb-8">
          
          <div className="gpu-slider-track pl-4 sm:pl-0">
            
            {/* First Set of Cards */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5">
              {services.map((service) => (
                <div
                  key={`mobile-1-${service.id}`}
                  tabIndex={0}
                  className="relative w-[85vw] sm:w-[340px] md:w-[380px] h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-md bg-gray-900 flex-shrink-0 group focus:outline-none cursor-pointer transform-gpu"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-focus:scale-110 transform-gpu will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none transition-colors duration-500 group-focus:from-black group-focus:via-black/70" />
                  
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 transform transition-transform duration-500 ease-out group-focus:-translate-y-2 transform-gpu will-change-transform">
                      {service.title}
                    </h3>
                    
                    <div className="grid grid-rows-[0fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="overflow-hidden">
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed opacity-0 group-focus:opacity-100 transition-opacity duration-700 delay-100 pt-2 transform-gpu will-change-[opacity]">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Set of Cards for infinite scroll - Changed to loading="lazy" to save Mobile RAM and prevent lag */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5">
              {services.map((service) => (
                <div
                  key={`mobile-2-${service.id}`}
                  tabIndex={0}
                  className="relative w-[85vw] sm:w-[340px] md:w-[380px] h-[400px] md:h-[450px] rounded-3xl overflow-hidden shadow-md bg-gray-900 flex-shrink-0 group focus:outline-none cursor-pointer transform-gpu"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-focus:scale-110 transform-gpu will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none transition-colors duration-500 group-focus:from-black group-focus:via-black/70" />
                  
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 transform transition-transform duration-500 ease-out group-focus:-translate-y-2 transform-gpu will-change-transform">
                      {service.title}
                    </h3>
                    
                    <div className="grid grid-rows-[0fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="overflow-hidden">
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed opacity-0 group-focus:opacity-100 transition-opacity duration-700 delay-100 pt-2 transform-gpu will-change-[opacity]">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex lg:hidden justify-center mt-6 px-4"
        >
          <Link href="/services" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-[#a40049] to-[#4d002c] rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 transform-gpu">
              Explore All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}