"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ShoppingBag, CheckCircle2, Trash2, ChevronDown, Mail } from "lucide-react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: string[];
  toggleCart: (item: string) => void;
  clearCart: () => void;
}

type ParsedItem = { original: string; item: string };
type SubCatGroup = { [subCat: string]: ParsedItem[] };
type MainCatGroup = { [mainCat: string]: SubCatGroup };

// --- CUSTOM REUSABLE DROPDOWN COMPONENT ---
// This replaces the ugly default HTML <select> with a beautiful, animated custom dropdown
const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  name 
}: { 
  options: string[], 
  value: string, 
  onChange: (name: string, value: string) => void,
  name: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Hidden input for form validation */}
      <input type="hidden" name={name} value={value} required />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-left focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all flex items-center justify-between"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Select an option..."}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(name, option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  value === option 
                    ? "bg-[#a40049]/10 text-[#a40049] font-bold" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function WhatsAppModal({ isOpen, onClose, cart, toggleCart, clearCart }: WhatsAppModalProps) {
  const [mounted, setMounted] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false); 
  const formRef = useRef<HTMLFormElement>(null);

  // Form State with Default Dropdown Values
  const [formData, setFormData] = useState({
    organizationName: "", 
    address: "", 
    email: "", 
    contactPerson: "", 
    officeNumber: "", 
    whatsappNumber: "", 
    eventName: "Convocation", // Default value
    eventDate: "", 
    eventLocation: "BMICH - Main Hall", // Default value
    guestCount: "0-100", // Default value
    studentCount: "0-100" // Default value
  });

  // Get Today's Date for Min Date Validation
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setShowConfirmClear(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Custom handler for our new CustomDropdown
  const handleDropdownChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const executeClearCart = () => {
    clearCart(); 
    setShowConfirmClear(false);
    onClose(); 
  };

  const groupedCart = useMemo(() => {
    return cart.reduce((acc: MainCatGroup, originalString: string) => {
      const [catPart, itemPart] = originalString.split(": ");
      if (!catPart || !itemPart) return acc; 

      let mainCat = catPart;
      let subCat = "General"; 

      if (catPart.includes(" - ")) {
        const parts = catPart.split(" - ");
        mainCat = parts[0];
        subCat = parts[1];
      }

      if (!acc[mainCat]) acc[mainCat] = {};
      if (!acc[mainCat][subCat]) acc[mainCat][subCat] = [];

      acc[mainCat][subCat].push({ original: originalString, item: itemPart });
      return acc;
    }, {});
  }, [cart]);

  // Unified Submit Handler for both WhatsApp and Email
  const handleSubmitAction = (type: 'whatsapp' | 'email') => {
    if (cart.length === 0) {
      alert("Please select at least one service before requesting a quotation.");
      return;
    }

    // Trigger Native HTML5 Form Validation
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    // Format Date from YYYY-MM-DD to DD-MM-YYYY for the message
    const dateParts = formData.eventDate.split('-');
    const formattedDate = dateParts.length === 3 ? `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}` : formData.eventDate;

    let formattedCartText = "";
    Object.entries(groupedCart).forEach(([mainCat, subCats]) => {
      formattedCartText += `\n📦 *${mainCat.toUpperCase()}*\n`;
      Object.entries(subCats).forEach(([subCat, items]) => {
        if (subCat !== "General") {
          formattedCartText += `  🔸 _${subCat}_\n`;
        }
        items.forEach(i => {
          formattedCartText += `    ✅ ${i.item}\n`;
        });
      });
    });

    const text = `🌟 *PREMIUM QUOTATION REQUEST* 🌟

📋 *SELECTED EVENT PACKAGE:*${formattedCartText}

🏢 *ORGANIZATION DETAILS:*
• *Organization Name:* ${formData.organizationName}
• *Contact Person:* ${formData.contactPerson}
• *Office/Uni Address:* ${formData.address}

📞 *CONTACT INFO:*
• *Email:* ${formData.email}
• *WhatsApp Number:* ${formData.whatsappNumber}
• *Office Number:* ${formData.officeNumber || 'N/A'}

🎉 *EVENT DETAILS:*
• *Event Name:* ${formData.eventName}
• *Event Date:* ${formattedDate}
• *Location:* ${formData.eventLocation}
• *Guest Count:* ${formData.guestCount}
• *Student Count:* ${formData.studentCount}

─────────────────────
Sent via SKD Event Management Website`;

    if (type === 'whatsapp') {
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/94777238387?text=${encodedText}`, '_blank');
    } else {
      // Create MailTo Link (Using encodeURIComponent for proper line breaks)
      const subject = encodeURIComponent(`New Quotation Request - ${formData.organizationName}`);
      const body = encodeURIComponent(text);
      window.open(`mailto:info@skdevents.lk?subject=${subject}&body=${body}`, '_blank');
    }
    
    onClose();
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-6 sm:p-8 md:p-12" style={{ zIndex: 999999 }}>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transform-gpu will-change-opacity" 
          />
          
          <motion.div 
  initial={{ opacity: 0, scale: 0.95, y: 20 }} 
  animate={{ opacity: 1, scale: 1, y: 0 }} 
  exit={{ opacity: 0, scale: 0.95, y: 20 }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
  className="relative w-full max-w-[1150px] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh] transform-gpu will-change-[transform,opacity]"
>
            {/* HEADER */}
            <div className="px-6 sm:px-10 py-5 sm:py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20 shadow-sm shrink-0">
              <div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900">Request Quotation</h3>
                <p className="text-xs sm:text-sm text-[#a40049] font-bold mt-1">Review your customized package and submit your details</p>
              </div>
              <button onClick={onClose} className="p-2.5 sm:p-3 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors group transform-gpu shrink-0">
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-red-500" />
              </button>
            </div>

            {/* BODY */}
            <div className="overflow-y-auto p-0 sm:p-2 scroll-smooth flex-grow bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                
                {/* LEFT: CART */}
                <div className="lg:col-span-5 order-1 bg-gray-50/50 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-200 lg:border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#a40049]/10 flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-5 h-5 text-[#a40049]" /> 
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase tracking-wider">Your Package</h4>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-white border border-gray-200 text-[#a40049] text-xs font-extrabold rounded-full shadow-sm whitespace-nowrap shrink-0">
                        {cart.length} Items
                      </span>
                      {cart.length > 0 && (
                        <button 
                          onClick={() => setShowConfirmClear(true)} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors whitespace-nowrap shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Clear All
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
                        <ShoppingBag className="w-12 h-12 text-gray-200 mb-3" />
                        <p className="text-sm text-gray-400 font-medium">No services selected yet.<br/>Please close this window and select items.</p>
                      </div>
                    ) : (
                      Object.entries(groupedCart).map(([mainCat, subCats]) => (
                        <div key={mainCat} className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden group">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a40049] to-[#ff4d94]" />
                          <h5 className="font-extrabold text-[#a40049] text-sm sm:text-base mb-4 uppercase tracking-wide pl-2">{mainCat}</h5>
                          
                          <div className="space-y-4 pl-2">
                            {Object.entries(subCats).map(([subCat, items]) => (
                              <div key={subCat}>
                                {subCat !== "General" && (
                                  <h6 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-50 pb-1 inline-block">
                                    {subCat}
                                  </h6>
                                )}
                                <ul className="space-y-2.5">
                                  {items.map((i) => (
                                    <li key={i.original} className="flex items-start justify-between gap-3 group/item">
                                      <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug">
                                          {i.item}
                                        </span>
                                      </div>
                                      <button 
                                        onClick={() => toggleCart(i.original)} 
                                        className="opacity-100 lg:opacity-0 lg:group-hover/item:opacity-100 transition-opacity p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                                        title="Remove Item"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN: FORM */}
                <div className="lg:col-span-7 order-2 p-6 sm:p-8 lg:p-10 pt-8 sm:pt-10">
                  <form id="quoteForm" ref={formRef} className="space-y-6 sm:space-y-8 mx-auto">
                    
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5 mb-2">
                        <span className="w-7 h-7 rounded-full bg-[#a40049] flex items-center justify-center text-xs font-bold text-white shadow-sm">1</span>
                        Organization Details
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-500 font-medium ml-10">We need this information to process your request.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-5 ml-0 sm:ml-9">
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Organization Name <span className="text-red-500">*</span></label>
                          <input required minLength={2} type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Contact Person <span className="text-red-500">*</span></label>
                          <input required minLength={2} type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address <span className="text-red-500">*</span></label>
                          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Office / University Address <span className="text-red-500">*</span></label>
                          <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">WhatsApp Number <span className="text-red-500">*</span></label>
                          <input required type="tel" pattern="[0-9+\-\s()]+" title="Please enter a valid phone number" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all placeholder:text-gray-300" placeholder="+94 7X XXX XXXX"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Office Contact Number <span className="text-gray-400 normal-case font-normal">(Optional)</span></label>
                          <input type="tel" pattern="[0-9+\-\s()]+" name="officeNumber" value={formData.officeNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all placeholder:text-gray-300" placeholder="011 XXXXXXX"/>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-gray-100">
                      <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5 mb-2">
                        <span className="w-7 h-7 rounded-full bg-[#a40049] flex items-center justify-center text-xs font-bold text-white shadow-sm">2</span>
                        Event Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-5 ml-0 sm:ml-9">
                        
                        {/* CUSTOM DROPDOWN: EVENT NAME */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Event Name <span className="text-red-500">*</span></label>
                          <CustomDropdown 
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleDropdownChange}
                            options={[
                              "Convocation",
                              "Corporate",
                              "Seminar",
                              "Product Launched",
                              "Award Ceremony"
                            ]}
                          />
                        </div>

                        {/* DATE PICKER */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Event Date <span className="text-red-500">*</span></label>
                          <input required type="date" min={todayDate} name="eventDate" value={formData.eventDate} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all cursor-pointer"/>
                        </div>

                        {/* CUSTOM DROPDOWN: EVENT LOCATION */}
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Event Location <span className="text-red-500">*</span></label>
                          <CustomDropdown 
                            name="eventLocation"
                            value={formData.eventLocation}
                            onChange={handleDropdownChange}
                            options={[
                              "BMICH - Main Hall",
                              "BMICH - Lotus Hall",
                              "BMICH - Jasmine Hall",
                              "BMICH - Sirimavo Bandaranaike Exhibition Centre",
                              "BMICH - Committee Room",
                              "Nelum Pokuna Auditorium",
                              "Nagananda Auditorium",
                              "Colombo Campus Auditorium",
                              "Other"
                            ]}
                          />
                        </div>

                        {/* CUSTOM DROPDOWN: GUEST COUNT */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Guest Count <span className="text-red-500">*</span></label>
                          <CustomDropdown 
                            name="guestCount"
                            value={formData.guestCount}
                            onChange={handleDropdownChange}
                            options={["0-100", "101-200", "201-500", "501-1000", "Above 1000"]}
                          />
                        </div>

                        {/* CUSTOM DROPDOWN: STUDENT COUNT */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Student Count <span className="text-red-500">*</span></label>
                          <CustomDropdown 
                            name="studentCount"
                            value={formData.studentCount}
                            onChange={handleDropdownChange}
                            options={["0-100", "101-200", "201-500", "501-1000", "Above 1000"]}
                          />
                        </div>

                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* FOOTER (DUAL SUBMIT BUTTONS) */}
            <div className="px-6 sm:px-10 py-4 sm:py-5 border-t border-gray-100 bg-white shrink-0">
  {/* max-w-lg දාලා බටන් දෙකේ උපරිම පළල පොඩි කළා */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
    
    {/* WHATSAPP BUTTON (py-3 දාලා උස අඩු කළා, rounded-xl දැම්මා) */}
    <motion.button 
      whileTap={{ scale: 0.98 }}
      type="button" 
      onClick={() => handleSubmitAction('whatsapp')}
      disabled={cart.length === 0}
      className={`w-full sm:flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform-gpu ${
        cart.length > 0 
          ? "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-[0_5px_20px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(37,211,102,0.5)] hover:-translate-y-0.5" 
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
    >
      <Send className="w-4 h-4 shrink-0" />
      <span className="text-sm tracking-wide">Send via WhatsApp</span>
    </motion.button>

    {/* EMAIL BUTTON (py-3 දාලා උස අඩු කළා, rounded-xl දැම්මා) */}
    <motion.button 
      whileTap={{ scale: 0.98 }}
      type="button" 
      onClick={() => handleSubmitAction('email')}
      disabled={cart.length === 0}
      className={`w-full sm:flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform-gpu ${
        cart.length > 0 
          ? "bg-gradient-to-r from-[#a40049] to-[#4d002c] text-white shadow-[0_5px_20px_-5px_rgba(164,0,73,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(164,0,73,0.5)] hover:-translate-y-0.5" 
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
    >
      <Mail className="w-4 h-4 shrink-0" />
      <span className="text-sm tracking-wide">Send via Email</span>
    </motion.button>
    
  </div>
</div>

            {/* CUSTOM CONFIRMATION UI (INSIDE MODAL) */}
            <AnimatePresence>
              {showConfirmClear && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-[2rem] sm:rounded-[2.5rem]">
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-white border border-gray-100 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] p-6 sm:p-8 rounded-3xl max-w-sm w-full text-center"
                  >
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trash2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-extrabold text-gray-900 mb-2">Clear Entire Package?</h4>
                    <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">Are you sure you want to remove all selected services? This action cannot be undone.</p>
                    <div className="flex gap-3">
                      <button onClick={() => setShowConfirmClear(false)} className="flex-1 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors">
                        Cancel
                      </button>
                      <button onClick={executeClearCart} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
                        Yes, Clear All
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}