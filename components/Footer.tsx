"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, PhoneCall, Mail, Instagram, Facebook, ArrowRight, ExternalLink } from "lucide-react";

// Premium WhatsApp SVG Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-50 relative overflow-hidden pt-16 pb-8 border-t border-gray-200">
      
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#a40049]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#ff4d94]/5 to-transparent rounded-full blur-[100px] pointer-events-none transform-gpu" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-8"> 
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <img src="/logo.png" alt="SKD Logo" className="h-16 sm:h-20 w-auto mb-6 object-contain" />
            
            <p className="text-lg text-[#a40049] font-bold tracking-wide italic mb-4">
              "Inspired Events, Lasting Impressions."
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              Sri Lanka's premier event management company. We transform your ideas into extraordinary, world-class experiences with precision and creativity.
            </p>
            
            {/* ISO Certification Badge - NEW */}
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#a40049]/10 flex items-center justify-center font-black text-[#a40049] text-[10px] tracking-tighter">
                ISO
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-extrabold text-xs">ISO 9001:2015 Certified</span>
                <span className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">Quality Management System</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://www.instagram.com/event_skd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-[#f09433] hover:to-[#bc1888] hover:text-white transition-all duration-300 group shadow-sm">
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/share/1READQGoer/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all duration-300 group shadow-sm">
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#25D366] hover:text-white transition-all duration-300 group shadow-sm">
                <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 lg:pl-8"
          >
            <h3 className="text-gray-900 font-extrabold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff4d94]" /> Explore
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Portfolio Gallery", path: "/gallery" },
                { name: "Get a Quote", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="group flex items-center text-gray-600 hover:text-[#a40049] transition-colors text-sm font-medium">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#a40049] transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-gray-900 font-extrabold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a40049]" /> Legal
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms & Conditions", path: "/terms-conditions" },
                { name: "Refund Policy", path: "/refund-policy" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="group flex items-center text-gray-600 hover:text-[#a40049] transition-colors text-sm font-medium">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#a40049] transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h3 className="text-gray-900 font-extrabold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-900" /> Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-[#a40049]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049] transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-[#a40049] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-gray-600 text-sm leading-relaxed mt-1">
                  No. L2-29, Reality Plaza,<br />
                  Colombo Road, Ja-Ela,<br />
                  Sri Lanka.
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-[#a40049]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049] transition-colors duration-300">
                  <PhoneCall className="w-4 h-4 text-[#a40049] group-hover:text-white transition-colors duration-300" />
                </div>
                <a href="tel:+94112248181" className="text-gray-600 text-sm hover:text-[#a40049] font-medium transition-colors">+94 112 248 181</a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-[#a40049]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049] transition-colors duration-300">
                  <Mail className="w-4 h-4 text-[#a40049] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-0.5 mt-1">
                  <a href="mailto:info@skdevents.lk" className="text-gray-600 text-sm hover:text-[#a40049] font-medium transition-colors">info@skdevents.lk</a>
                  <a href="mailto:thilina@skdevents.lk" className="text-gray-600 text-sm hover:text-[#a40049] font-medium transition-colors">thilina@skdevents.lk</a>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            © {new Date().getFullYear()} SKD Event Management (Pvt) Ltd. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-xs sm:text-sm font-medium flex items-center gap-1.5">
            Designed & Developed by 
            <a 
              href="https://www.axioralabs.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-900 hover:text-[#a40049] font-bold inline-flex items-center gap-1 transition-all duration-300 group"
            >
              Axiora Labs 
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </a>
          </p>
        </motion.div>

      </div>
    </footer>
  );
}