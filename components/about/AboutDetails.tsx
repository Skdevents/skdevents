"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AboutDetails() {
  return (
    <section className="bg-white relative z-10 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* =========================================
              LEFT COLUMN: STICKY HEADER
              ========================================= */}
          <div className="w-full lg:w-1/3 relative">
            <div className="lg:sticky lg:top-32">
              {/* PERFORMANCE FIX: Added GPU Acceleration to the sticky header animation */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="transform-gpu will-change-[transform,opacity]"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Who We Are & <br className="hidden lg:block"/>
                  <span className="text-[#a40049]">What We Do</span>
                </h2>
                <div className="w-20 h-2 bg-[#a40049] rounded-full mb-6" />
                <p className="text-gray-500 text-lg font-medium leading-relaxed border-l-4 border-gray-200 pl-4 mb-10">
                  An extended division of SKD Manufacturer (Pvt) Ltd.
                </p>

                {/* ISO Certification Details - NEW */}
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-6 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#a40049]/5 rounded-full blur-2xl" />
                  
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center shrink-0">
                      <span className="text-[#a40049] font-black text-sm tracking-tighter">ISO</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-extrabold text-lg leading-tight">ISO 9001:2015 Certified</h4>
                      <span className="text-[#a40049] font-bold text-xs uppercase tracking-wider">Quality Management System</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                    Our operations are backed by internationally recognized standards, ensuring consistent quality, reliability, and continuous improvement in every event we manage.
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                    <span className="text-xs font-bold text-gray-800">Certificate No: 0705Q108024</span>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN: SCROLLING DETAILS (PDF Data)
              ========================================= */}
          <div className="w-full lg:w-2/3 space-y-20 md:space-y-24">
            
            {/* Our Foundation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              /* PERFORMANCE FIX: GPU Acceleration to prevent scroll jitter */
              className="transform-gpu will-change-[transform,opacity]"
            >
              <h3 className="text-2xl font-bold text-[#a40049] mb-6">Our Foundation</h3>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-medium">
                <p>
                  Whether it’s a convocation event, corporate function, entertainment event or a grand launch, we bring passion, innovation, and professionalism to every project. SKD Event Management (Pvt) Ltd extends the brand’s excellence into the event management sector. We provide end-to-end event solutions that combine strategic planning, creative design, and precise execution.
                </p>
                <p>
                  At SKD Event Management, we understand that every event carries its own purpose and significance. Whether it is a formal institutional gathering or a large-scale celebration, we approach each project with attention to detail, personalized service, and a strong focus on quality.
                </p>
                <p>
                  Our team works closely with clients to transform ideas into well structured, memorable experiences that reflect professionalism and elegance at every stage. Guided by our vision of creating world class events, we remain committed to innovation, reliability, and delivering experiences that leave a lasting impression.
                </p>
              </div>
            </motion.div>

            {/* The Team */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="transform-gpu will-change-[transform,opacity]"
            >
              <h3 className="text-2xl font-bold text-[#a40049] mb-6">The Team Behind the Magic</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                We are a team of creative planners, designers, coordinators, and production experts who are committed to making your event seamless, stylish, and unforgettable. With years of experience in the event industry, we understand that every occasion is unique and so is our approach.
              </p>
              <p className="text-xl font-bold text-gray-900 italic border-l-4 border-[#a40049] pl-4">
                "We listen, we plan, and we execute with care."
              </p>
            </motion.div>

            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="transform-gpu will-change-[transform,opacity]"
            >
              <h3 className="text-2xl font-bold text-[#a40049] mb-6">End-to-End Solutions</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our expertise spans across concept development, logistics coordination, technical production, décor, guest management, and professional event documentation. We offer solutions including:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-800 font-bold bg-gray-50 p-8 rounded-3xl border border-gray-100">
                {[
                  "Event Planning & Coordination", 
                  "Event Management",
                  "Corporate Events & Launches", 
                  "Convocation Events", 
                  "Entertainment Events", 
                  "Supply Services (Décor, Sound, Light)",
                  "Photography & Videography",
                  "Entertainment Solutions (360 booths, DJs)",
                  "Event Logistics & On-site"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-2.5 h-2.5 bg-[#a40049] rounded-full shadow-[0_0_8px_rgba(164,0,73,0.5)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mt-6 italic font-medium">
                From concept design to the final moment of the event, we ensure every detail is handled with precision and creativity.
              </p>
            </motion.div>

            {/* Our Approach */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="transform-gpu will-change-[transform,opacity]"
            >
              <h3 className="text-2xl font-bold text-[#a40049] mb-6">Our Approach</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium">
                At the heart of SKD Event Management is a commitment to quality, transparency, and customer satisfaction. We believe in:
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {["Clear communication", "Creative concepts", "Timely planning", "Flawless execution", "A client-first mindset"].map((badge, idx) => (
                  <span key={idx} className="px-5 py-2.5 bg-white border border-gray-200 shadow-sm rounded-full text-[#a40049] font-bold text-sm">
                    {badge}
                  </span>
                ))}
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                Your vision guides our process. We work closely with you to understand your goals, tailor your event, and bring your dream to life with unmatched professionalism.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}