"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, GraduationCap, Calendar, Clock, User, MapPin, 
  Phone, Mail, UploadCloud, CreditCard, CheckCircle2, ShieldCheck, Info,
  Check, X, AlertCircle
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

export default function PhotoFormPage() {
  const [today, setToday] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom Popup & Validation States
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // 3MB size limit check (3 * 1024 * 1024 bytes)
      if (file.size > 3145728) {
        setFileError("File size exceeds the 3MB maximum limit.");
        e.target.value = ""; // Reset file field
        return;
      }
      setFileName(file.name);
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

    if (!selectedPackage) {
      setValidationError("Please select a Photo Package before submitting.");
      document.getElementById('package-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!fileName) {
      setValidationError("Payment Slip Upload is mandatory.");
      return;
    }
    
    setIsSubmitting(true); // Loading එක පටන් ගන්නවා

    try {
      // Data ටික API එකට යවන්න ලෑස්ති කිරීම
      const submitData = new FormData();
      
      // Text Data අතුලත් කිරීම
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key as keyof typeof formData]);
      });
      submitData.append("package", selectedPackage); // තෝරාගත් Package එක
      
      // Photo/PDF File එක ඇතුලත් කිරීම
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        submitData.append("file", fileInput.files[0]);
      }

      // API එකට යැවීම
      const response = await fetch('/api/submit-photo-form', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      // සාර්ථකව ගියා නම් Success Popup එක පෙන්නනවා
      setShowPopup(true);
      
    } catch (error) {
      console.error(error);
      setValidationError("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false); // Loading එක ඉවර කරනවා
    }
  };

  return (
    // pt-32 md:pt-40 added for Navbar Spacing
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-[#a40049]/20 selection:text-[#a40049] pt-32 md:pt-40 pb-20 relative overflow-hidden">
      
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
                <div className="relative">
                  <select 
                    name="campusName" value={formData.campusName} onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200 appearance-none"
                  >
                    <option value="SLIIT">SLIIT</option>
                    <option value="NIBM">NIBM</option>
                    <option value="IIT">IIT</option>
                    <option value="Test">Test</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    ▼
                  </div>
                </div>
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
                <div className="relative">
                  <select 
                    name="session" value={formData.session} onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200 appearance-none"
                  >
                    <option value="Session 1">Session 1</option>
                    <option value="Session 2">Session 2</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    ▼
                  </div>
                </div>
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
      <div className="relative">
        <select 
          required name="district" value={formData.district} onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200 appearance-none"
        >
          <option value="" disabled>Select Sri Lankan District</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          ▼
        </div>
      </div>
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Primary Mobile No (Mobile 1)</label>
      <input 
        type="tel" required name="mobile1" value={formData.mobile1} onChange={handleInputChange}
        placeholder="Numbers only format"
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
      />
    </div>

    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Secondary Mobile No (Mobile 2)</label>
      <input 
        type="tel" required name="mobile2" value={formData.mobile2} onChange={handleInputChange}
        placeholder="Numbers only format"
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Email Address</label>
      <input 
        type="email" required name="email" value={formData.email} onChange={handleInputChange}
        placeholder="example@domain.com"
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a40049] focus:bg-white transition-all duration-200"
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
              <div className="space-y-2">
                <div className="mx-auto w-10 h-10 rounded-full bg-[#a40049]/10 flex items-center justify-center text-[#a40049]">
                  {fileName ? <CheckCircle2 className="w-5 h-5" /> : <UploadCloud className="w-5 h-5" />}
                </div>
                <div className="text-sm font-semibold text-gray-700">
                  {fileName ? <span className="text-[#a40049]">{fileName}</span> : "Click to select or drag verification slip"}
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
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            className="pt-2"
          >
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl font-bold text-white text-sm tracking-wider uppercase shadow-[0_15px_30px_-10px_rgba(164,0,73,0.3)] transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#a40049] to-[#ff4d94] hover:opacity-95'
              }`}
            >
              {isSubmitting ? (
                <>Loading...</>
              ) : (
                <><ShieldCheck className="w-5 h-5" /> Verify & Complete Registration Request</>
              )}
            </button>
          </motion.div>

        </form>
      </div>

      {/* Modern Animated Success Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-gray-100"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-50" />
                <CheckCircle2 className="w-10 h-10 text-green-500 relative z-10" />
              </div>
              
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Success!</h3>
              <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
                Your details and payment slip have been submitted successfully. We will process your request shortly.
              </p>
              
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full py-3.5 rounded-xl font-bold bg-gray-900 text-white text-sm hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}