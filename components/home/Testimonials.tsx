"use client";

import { motion } from "framer-motion";
import { MessageCircle, Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";

// PDF Extracted Concepts
const testimonials = [
  {
    id: 1,
    name: "Dr. Saman Weerasinghe",
    role: "University Vice-Chancellor",
    review: "SKD orchestrated our entire convocation flawlessly. The stage setup, lighting, and academic gowns were managed with absolute precision and professionalism.",
    rating: 5,
  },
  {
    id: 2,
    name: "Corporate Director",
    role: "Leading Tech Firm",
    review: "Their multimedia screens and sound system transformed our product launch. An ISO-certified team that truly delivers extraordinary experiences.",
    rating: 5,
  },
  {
    id: 3,
    name: "Head of Administration",
    role: "Private Institute",
    review: "100% commitment to a transparent and stress-free process. The guest management and photobooth arrangements were a massive hit among our students.",
    rating: 5,
  },
  {
    id: 4,
    name: "Event Partner",
    role: "Vendor Network",
    review: "Working with SKD is a breeze. Their strong vendor partnerships and precise execution make them the top event management company in Sri Lanka.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-Slide Logic for Mobile/Tablet
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 Seconds per slide (Slow & comfortable reading speed)

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-18 md:py-24 bg-white relative overflow-hidden">
      
      {/* PERFORMANCE FIX: Added transform-gpu and will-change-transform to massive blur */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#a40049]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu will-change-transform" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 mb-6 shadow-sm transform-gpu"
          >
            <MessageCircle className="w-4 h-4 text-[#a40049]" />
            <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Client Stories
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight transform-gpu"
          >
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#ff4d94]">Visionaries</span>
          </motion.h2>
        </div>

        {/* =========================================
            DESKTOP: 4 In a Row Grid (Unchanged)
            ========================================= */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={`desktop-${item.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              /* PERFORMANCE FIX: Added GPU acceleration to cards */
              className="relative w-full p-8 rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-[0_20px_40px_-15px_rgba(164,0,73,0.15)] hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between transform-gpu will-change-[transform,opacity]"
            >
              <div className="absolute top-6 right-6 text-gray-50 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 transform-gpu">
                <Quote size={80} strokeWidth={1} />
              </div>
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#a40049] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[2rem]" />

              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ff4d94] text-[#ff4d94]" />
                  ))}
                </div>
                <p className="text-gray-600 font-medium leading-relaxed mb-8">
                  "{item.review}"
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a40049] to-[#4d002c] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold group-hover:text-[#a40049] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex lg:hidden flex-col items-center w-full">
          
          {/* Slider Container */}
          <div className="w-full overflow-hidden px-2 sm:px-4">
            <motion.div 
              /* PERFORMANCE FIX: Added GPU acceleration to the sliding track */
              className="flex w-full transform-gpu will-change-transform"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.8 }}
            >
              {testimonials.map((item) => (
                <div key={`mobile-${item.id}`} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="relative h-full w-full p-8 rounded-[2rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between">
                    
                    <div className="absolute top-6 right-6 text-gray-50">
                      <Quote size={80} strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                      <div className="flex gap-1 mb-6">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={`star-${item.id}-${i}`} className="w-5 h-5 fill-[#ff4d94] text-[#ff4d94]" />
                        ))}
                      </div>
                      <p className="text-gray-600 font-medium leading-relaxed mb-8">
                        "{item.review}"
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a40049] to-[#4d002c] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-bold">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.role}</p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Modern Expanding Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <motion.div
                key={`dot-${idx}`}
                className={`h-2 rounded-full cursor-pointer transform-gpu ${
                  currentIndex === idx ? "bg-[#a40049]" : "bg-gray-200"
                }`}
                animate={{ width: currentIndex === idx ? 28 : 8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => setCurrentIndex(idx)} 
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}