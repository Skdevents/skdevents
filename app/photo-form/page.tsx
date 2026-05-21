"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, GraduationCap, Calendar, Clock, User, MapPin, 
  Phone, Mail, UploadCloud, CreditCard, CheckCircle2, ShieldCheck, Info,
  Check, X, AlertCircle, ChevronDown, Search
} from "lucide-react";

// Sri Lanka Districts List
const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", 
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", 
  "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", 
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

// Updated Packages Data with Specific Sizes
const packages = [
  {
    id: "P1", name: "Package 1",
    features: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”"]
  },
  {
    id: "P2", name: "Package 2",
    features: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”", "Family Photo - 12”x18”"]
  },
  {
    id: "P3", name: "Package 3",
    features: ["Stage Photo - 12”x15”", "Full Photo - 12”x18” | Bust Photo 12”x15”", "Family Photo - 12”x18”", "Group Photo - Soft Copy - 12”x18”"]
  },
  {
    id: "P4", name: "Package 4",
    features: ["Customized Selection (Build your own)"],
    isCustom: true
  }
];

// Modern Custom Dropdown Component (Matched with WhatsAppModal style)
const CustomSelect = ({ value, options, onChange, placeholder, searchable = false }: { value: string, options: string[], onChange: (val: string) => void, placeholder: string, searchable?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm(""); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-left outline-none transition-all flex items-center justify-between ${
          isOpen ? 'ring-2 ring-[#a40049]/30 border-[#a40049]' : 'focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049]'
        }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
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
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
          >
            {/* --- Search Input Bar --- */}
            {searchable && (
              <div className="p-2 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-[#a40049] focus:ring-1 focus:ring-[#a40049]/20"
                  />
                </div>
              </div>
            )}

            {/* --- Filtered Options List --- */}
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearchTerm(""); // Select කරාම search එක clear වෙනවා
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      value === opt 
                        ? "bg-[#a40049]/10 text-[#a40049] font-bold" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-gray-400 text-center font-medium">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default function PhotoFormPage() {
  const [today, setToday] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [formData, setFormData] = useState({
    seatNo: "",
    campusName: "",
    diplomaName: "",
    eventDate: "",
    session: "Session 1",
    firstName: "",
    lastName: "",
    surname: "",
    courierAddress: "",
    nearestCity: "",
    district: "",
    mobile1: "",
    mobile2: "",
    email: "",
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedData = localStorage.getItem("skdFormDraft");
    if (savedData) setFormData(JSON.parse(savedData));
    
    const savedPackage = localStorage.getItem("skdPackageDraft");
    if (savedPackage) setSelectedPackage(savedPackage);
  }, []);

  useEffect(() => {
    localStorage.setItem("skdFormDraft", JSON.stringify(formData));
    localStorage.setItem("skdPackageDraft", selectedPackage);
  }, [formData, selectedPackage]);


  const handleResetForm = () => {
    setFormData({
      seatNo: "", campusName: "", diplomaName: "", eventDate: "", session: "Session 1",
      firstName: "", lastName: "", surname: "", courierAddress: "", nearestCity: "",
      district: "", mobile1: "", mobile2: "", email: "",
    });
    setSelectedPackage("");
    setFileName("");
    setFilePreview(null);
    setFieldErrors({});
    localStorage.removeItem("skdFormDraft");
    localStorage.removeItem("skdPackageDraft");
    setShowPopup(false);
  };

  useEffect(() => {
    // Current date set madalu Android/iOS browser compatibility gagi
    const currentDate = new Date().toISOString().split("T")[0];
    setToday(currentDate);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 1. Mobile numbers validate - numbers පමණක් ඇතුලත් කිරීමට
    if (name === "mobile1" || name === "mobile2") {
      const cleanValue = value.replace(/\D/g, "");
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
      return;
    }

    // 2. Data Formatting (Professional Uppercase Logic)
    let processedValue = value;

    if (name === "email") {
      // Email එක සම්මතයක් විදියට හැමතිස්සෙම Simple අකුරු (Lowercase) කරනවා
      processedValue = value.toLowerCase();
    } else if (e.target.type === "text") {
      // type="text" තියෙන අනිත් හැම input එකක්ම (Name, Address, City, Seat No) Auto Capital (Uppercase) කරනවා
      processedValue = value.toUpperCase();
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    setFileName("");
    setFilePreview(null); 

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 3145728) {
        setFileError("File size exceeds the 3MB maximum limit.");
        e.target.value = ""; 
        return;
      }
      setFileName(file.name);

      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        setFilePreview(previewUrl);
      }
    }
  };

  // Toggle Package Selection
  const togglePackage = (id: string) => {
    setSelectedPackage(prev => prev === id ? "" : id);
    setValidationError(""); // Clear errors on select
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setFieldErrors({});

    let errors: Record<string, boolean> = {};

    // --- 4. Smart Validation (Email & Phone) ---
    if (formData.mobile1.length !== 10) errors.mobile1 = true;
    if (formData.mobile2.length !== 10) errors.mobile2 = true;
    if (!formData.email.includes("@") || !formData.email.includes(".com")) errors.email = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setValidationError("Please check the fields highlighted in red. Phone numbers must be 10 digits and Email must be valid.");
      // Scroll to personal info section
      document.getElementById('personal-info-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    if (!formData.campusName) {
      setValidationError("Please select your Institute / Campus Name.");
      return;
    }
    
    if (!formData.district) {
      setValidationError("Please select your District.");
      return;
    }
    
    if (!selectedPackage) {
      setValidationError("Please select a Photo Package before submitting.");
      document.getElementById('package-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!fileName) {
      setValidationError("Payment Slip Upload is mandatory.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key as keyof typeof formData]);
      });
      submitData.append("package", selectedPackage);
      
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        submitData.append("file", fileInput.files[0]);
      }

      const response = await fetch('/api/submit-photo-form', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) throw new Error("Something went wrong");

      setShowPopup(true);
      
    } catch (error) {
      console.error(error);
      setValidationError("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // pt-32 md:pt-40 added for Navbar Spacing
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-[#a40049]/20 selection:text-[#a40049] pt-28 md:pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Smooth Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#a40049]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 mb-4 shadow-sm"
          >
            <Camera className="w-4 h-4 text-[#a40049]" />
            <span className="text-[11px] font-bold tracking-widest text-gray-700 uppercase">Premium Photography Portal</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#a40049] to-[#ff4d94] mb-4"
          >
            SKD Events Order Form
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Welcome to the official SKD Events media portal. We are dedicated to capturing your milestone moments with world-class interactive setups, premium intelligence systems, and cinematic production clarity. Please verify the layout details and transfer guidelines below to initialize your processing sequence.
          </motion.p>
        </div>

        {/* Form Validation Error Message (Top) */}
        <AnimatePresence>
          {validationError && (
            <motion.div 
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-8"
            >
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-bold text-red-600">{validationError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bank Details Luxury Information Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(164,0,73,0.08)] mb-10 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#a40049]/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#a40049]/10 flex items-center justify-center text-[#a40049]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Official Bank Transfer Details</h2>
              <p className="text-xs text-gray-500">Please complete your payment process prior to completing the request form</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Bank Name</span>
              <p className="text-sm font-bold text-gray-800 mt-0.5">Luxury Trust Bank PLC</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Account Branch</span>
              <p className="text-sm font-bold text-gray-800 mt-0.5">Colombo Corporate Office</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Account Number</span>
              <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a40049] to-[#ff4d94] mt-0.5 tracking-wider">9874-5123-0012-4562</p>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-4 text-xs text-gray-500 font-medium">
            <Info className="w-4 h-4 text-[#a40049] shrink-0 mt-0.5" />
            <p>Ensure that the uploaded slip image is perfectly legible. Digital bank transactions or physical deposit slips are fully accepted.</p>
          </div>
        </motion.div>

        {/* Main Application Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Event Mapping Parameters */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] space-y-6">
            <h3 className="text-md font-bold uppercase tracking-wider text-[#a40049] flex items-center gap-2 border-b border-gray-50 pb-3">
              <ShieldCheck className="w-4 h-4" /> 1. Event Parameters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Seat Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 text-xs font-bold">#</span>
                  <input 
                    type="text" required name="seatNo" value={formData.seatNo} onChange={handleInputChange}
                    placeholder="Enter assigned seat ID"
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Institute / Campus Name</label>
                <CustomSelect 
                  value={formData.campusName}
                  options={["SLIIT", "NIBM", "IIT"]}
                  onChange={(val: string) => setFormData(prev => ({ ...prev, campusName: val }))}
                  placeholder="Select Campus"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Name of Diploma | Degree</label>
                <div className="relative">
                  <input 
                    type="text" required name="diplomaName" value={formData.diplomaName} onChange={handleInputChange}
                    placeholder="E.g. BSc in Data Science"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Event Date</label>
                <div className="relative">
                  <input 
                    type="date" required name="eventDate" min={today} value={formData.eventDate} onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Session Sequence</label>
                <CustomSelect 
                  value={formData.session}
                  options={["Session 1", "Session 2"]}
                  onChange={(val: string) => setFormData(prev => ({ ...prev, session: val }))}
                  placeholder="Select Session"
                />
              </div>
              
            </div>
          </div>

          {/* Section 2: Photo Package Custom Cards Grid Selector */}
          <div id="package-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] space-y-4">
            <div>
              <h3 className="text-md font-bold uppercase tracking-wider text-[#a40049] flex items-center gap-2">
                <Camera className="w-4 h-4" /> 2. Select Photo Package
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-medium">Click a package to select. Click again to deselect.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {packages.map((pkg) => {
                const isSelected = selectedPackage === pkg.id;
                return (
                  <motion.div 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    key={pkg.id}
                    onClick={() => togglePackage(pkg.id)}
                    className={`cursor-pointer relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                      isSelected 
                        ? "border-[#a40049] bg-gradient-to-br from-white to-[#a40049]/5 shadow-md" 
                        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#a40049] rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    
                    <h4 className={`text-sm font-bold mb-3 ${isSelected ? 'text-[#a40049]' : 'text-gray-900'}`}>
                      {pkg.name}
                    </h4>
                    
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? "bg-[#a40049]/10 text-[#a40049]" : "bg-gray-100 text-gray-400"
                          }`}>
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span className="text-xs font-medium text-gray-600 leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Personal Information Input Controls */}
<div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] space-y-6">
  <h3 className="text-md font-bold uppercase tracking-wider text-[#a40049] flex items-center gap-2 border-b border-gray-50 pb-3">
    <User className="w-4 h-4" /> 3. Personal Information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* --- Name Fields: 3 Columns in a single row --- */}
    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">First Name</label>
        <input 
          type="text" required name="firstName" value={formData.firstName} onChange={handleInputChange}
          placeholder="Enter first name"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Last Name</label>
        <input 
          type="text" required name="lastName" value={formData.lastName} onChange={handleInputChange}
          placeholder="Enter last name"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
          Surname <span className="text-gray-400 lowercase normal-case">(optional)</span>
        </label>
        <input 
          type="text" name="surname" value={formData.surname} onChange={handleInputChange}
          placeholder="Enter surname (if any)"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
        />
      </div>
    </div>
    {/* ---------------------------------------------- */}

    <div className="md:col-span-2">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Courier Delivery Address</label>
      <input 
        type="text" required name="courierAddress" value={formData.courierAddress} onChange={handleInputChange}
        placeholder="Street address, apartment, building info"
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
      />
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Nearest Main City</label>
      <input 
        type="text" required name="nearestCity" value={formData.nearestCity} onChange={handleInputChange}
        placeholder="City name"
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
      />
    </div>

   <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">District Selection</label>
              <CustomSelect 
                value={formData.district}
                options={districts}
                onChange={(val: string) => setFormData(prev => ({ ...prev, district: val }))}
                placeholder="Select District"
                searchable={true} // <--- මෙන්න මේක විතරයි අලුතින් දැම්මේ
              />
            </div>
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Primary Mobile No (Mobile 1)</label>
      <input 
        type="tel" required name="mobile1" value={formData.mobile1} onChange={handleInputChange}
        placeholder="Numbers only format"
        className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none transition-all duration-200 ${
          fieldErrors.mobile1 ? 'bg-red-50 border-red-500 ring-2 ring-red-200 focus:border-red-500' : 'bg-gray-50 border-gray-200 focus:border-[#a40049] focus:bg-white'
        }`}
      />
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Secondary Mobile No (Mobile 2)</label>
      <input 
        type="tel" required name="mobile2" value={formData.mobile2} onChange={handleInputChange}
        placeholder="Numbers only format"
        className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none transition-all duration-200 ${
          fieldErrors.mobile2 ? 'bg-red-50 border-red-500 ring-2 ring-red-200 focus:border-red-500' : 'bg-gray-50 border-gray-200 focus:border-[#a40049] focus:bg-white'
        }`}
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email Address</label>
      <input 
        type="email" required name="email" value={formData.email} onChange={handleInputChange}
        placeholder="example@domain.com"
        className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none transition-all duration-200 ${
          fieldErrors.email ? 'bg-red-50 border-red-500 ring-2 ring-red-200 focus:border-red-500 text-red-900' : 'bg-gray-50 border-gray-200 focus:border-[#a40049] focus:bg-white'
        }`}
      />
    </div>
  </div>
</div>

          {/* Section 4: Secure Document Upload Component (Payment Slip) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] space-y-4">
            <div>
              <h3 className="text-md font-bold uppercase tracking-wider text-[#a40049] flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> 4. Transaction Verification
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-medium">Please attach your transaction confirmation voucher image below</p>
            </div>

            <div className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-colors duration-300 ${
              fileName ? 'border-[#a40049]/50 bg-[#a40049]/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}>
              <input 
                type="file" required accept="image/*,application/pdf" onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-3">
                {filePreview ? (
                  <div className="mx-auto w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-2 border-[#a40049]/20 shadow-sm relative group">
                    <img src={filePreview} alt="Slip Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#a40049]/10 flex items-center justify-center text-[#a40049]">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                )}
                
                <div className="text-sm font-semibold text-gray-700">
                  {fileName ? (
                    <span className="text-[#a40049] flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> {fileName}</span>
                  ) : (
                    "Click to select or drag verification slip"
                  )}
                </div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide">File Limit: Max 3MB (Image or PDF format only) *Required</p>
              </div>
            </div>

            {fileError && (
              <p className="text-xs font-bold text-red-500 flex items-center gap-1.5 mt-2">
                <AlertCircle className="w-3.5 h-3.5" /> {fileError}
              </p>
            )}
          </div>

          {/* Form Action Submit Button Trigger */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="pt-6 flex justify-center"
          >
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto min-w-[300px] md:min-w-[400px] px-8 py-4 rounded-full font-bold text-white text-sm sm:text-base tracking-widest uppercase shadow-[0_15px_30px_-10px_rgba(164,0,73,0.3)] transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#a40049] to-[#ff4d94] hover:opacity-95 hover:shadow-[0_20px_40px_-10px_rgba(164,0,73,0.4)]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Verify & Complete Request</span>
                </>
              )}
            </button>
          </motion.div>

        </form>
      </div>

      {/* Modern Animated Success Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white rounded-[2rem] p-8 sm:p-10 max-w-md w-full text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-50 overflow-hidden"
            >
              {/* Top Decorative Gradient */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-[#a40049]/5 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Multi-layered Animated Success Icon */}
              <div className="mx-auto w-24 h-24 mb-6 relative flex items-center justify-center mt-2">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
                  className="absolute inset-0 bg-[#a40049]/10 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2, bounce: 0.5 }}
                  className="absolute inset-2 bg-[#a40049]/20 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.3, bounce: 0.5 }}
                  className="relative bg-[#a40049] w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(164,0,73,0.4)] text-white"
                >
                  <Check className="w-7 h-7 stroke-[3]" />
                </motion.div>
              </div>
              
              {/* Typography & Content */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight relative z-10">
                Thank You!
              </h3>
              <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed px-2 relative z-10">
                Your order details and payment verification have been successfully submitted. Our team will review your request and process your premium photography package shortly.
              </p>
              
              {/* Action Button */}
              <button 
                onClick={handleResetForm}
                className="w-full py-4 rounded-xl font-bold tracking-wider uppercase bg-gradient-to-r from-[#a40049] to-[#ff4d94] text-white text-sm hover:shadow-[0_15px_30px_-10px_rgba(164,0,73,0.4)] transition-all duration-300 hover:opacity-95 relative z-10"
              >
                Close & Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}