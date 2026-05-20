'use client';

import { useState } from 'react';
import { UploadCloud, CheckCircle2, Building, Calendar, MapPin, User, Phone, Mail } from 'lucide-react';

// Districts of Sri Lanka
const DISTRICTS = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", 
  "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", 
  "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", 
  "Trincomalee", "Vavuniya"
];

const PACKAGES = [
  { id: 'pkg1', name: 'Standard Package', price: 'Rs. 1,500', details: '1 Group Photo + Softcopy' },
  { id: 'pkg2', name: 'Premium Package', price: 'Rs. 2,500', details: '1 Individual + 1 Group + Softcopy' },
  { id: 'pkg3', name: 'VIP Package', price: 'Rs. 3,500', details: 'Printed Frame + Softcopies + Group' },
  { id: 'pkg4', name: 'Digital Only', price: 'Rs. 1,000', details: 'All High-Res Softcopies via Email' }
];

export default function PhotoOrderForm() {
  const [fileError, setFileError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isOtherInstitute, setIsOtherInstitute] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format to disable past dates
  const today = new Date().toISOString().split('T')[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File is too large. Please upload an image under 5MB.');
        e.target.value = ''; // Reset
      } else {
        setFileError('');
      }
    }
  };

  const handleInstituteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'Other') {
      setIsOtherInstitute(true);
    } else {
      setIsOtherInstitute(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('selectedPackage', selectedPackage);

    try {
      // 1. Send data to our secure Next.js API route
      const response = await fetch('/api/submit-photo-order', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Order submitted successfully!');
        window.location.reload();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting the form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header & Payment Details Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Request Photo Package</h1>
          <p className="text-gray-300 text-sm mb-6 max-w-2xl mx-auto">
            Please fill in the exact details below. A valid payment slip is mandatory for processing your order.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 inline-block text-left w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-3 border-b border-white/20 pb-2 text-center">Payment Details</h3>
            <div className="space-y-2 text-sm text-gray-200">
              <p><span className="font-medium text-white">Bank:</span> Commercial Bank</p>
              <p><span className="font-medium text-white">Account Name:</span> SKD Events</p>
              <p><span className="font-medium text-white">Account No:</span> 1234 5678 9012</p>
              <p><span className="font-medium text-white">Branch:</span> Wattala</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          
          {/* Section 1: Event Details */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Seat No</label>
                <input type="text" name="seatNo" required placeholder="e.g. A-12" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Institute / Campus Name</label>
                <div className="relative">
                  <select name="instituteDropdown" onChange={handleInstituteChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white" required>
                    <option value="">Select Institute</option>
                    <option value="ICBT Campus">ICBT Campus</option>
                    <option value="NSBM Green University">NSBM Green University</option>
                    <option value="SLIIT">SLIIT</option>
                    <option value="Other">Other (Please Specify)</option>
                  </select>
                </div>
                {isOtherInstitute && (
                  <input type="text" name="otherInstitute" required placeholder="Type your institute name" className="w-full px-4 py-3 mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all outline-none" />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Event Date</label>
                <input type="date" name="eventDate" min={today} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Session</label>
                <select name="session" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white">
                  <option value="">Select Session</option>
                  <option value="Session 1">Session 1</option>
                  <option value="Session 2">Session 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Photo Packages */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">Select Photo Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedPackage === pkg.name ? 'border-blue-600 bg-blue-50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-blue-300'}`}
                >
                  {selectedPackage === pkg.name && (
                    <div className="absolute -top-3 -right-3 bg-white rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{pkg.name}</h3>
                  <p className="text-blue-600 font-bold text-xl mb-3">{pkg.price}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{pkg.details}</p>
                </div>
              ))}
            </div>
            {/* Hidden input to ensure package validation on submit */}
            <input type="text" name="packageValidation" required value={selectedPackage} readOnly className="h-0 w-0 opacity-0 absolute" />
          </div>

          {/* Section 3: Personal Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">First Name</label>
                <input type="text" name="firstName" required placeholder="John" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Last Name</label>
                <input type="text" name="lastName" required placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Courier Address</label>
                <input type="text" name="address" required placeholder="123, Main Street, Town" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Nearest Main City</label>
                <input type="text" name="city" required placeholder="e.g. Wattala" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">District</label>
                <select name="district" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Select District</option>
                  {DISTRICTS.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" /> Mobile No 1 *
                </label>
                <input type="tel" name="mobile1" required pattern="[0-9]*" placeholder="07XXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" /> Mobile No 2 (Optional)
                </label>
                <input type="tel" name="mobile2" pattern="[0-9]*" placeholder="07XXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" /> Email Address
                </label>
                <input type="email" name="email" required placeholder="student@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Section 4: File Upload */}
          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Payment Slip Upload *</h2>
            <p className="text-sm text-gray-500 mb-4">Max file size: 5MB. Must clearly show date, time, and reference ID.</p>
            
            <div className="relative group cursor-pointer inline-block w-full max-w-sm mx-auto">
              <input 
                type="file" 
                name="paymentSlip" 
                accept="image/*,.pdf" 
                required 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="bg-white px-6 py-8 rounded-xl shadow-sm border border-gray-200 group-hover:border-blue-400 group-hover:bg-blue-50 transition-all flex flex-col items-center gap-3">
                <UploadCloud className="w-10 h-10 text-blue-500" />
                <span className="font-semibold text-blue-600">Click to upload or drag & drop</span>
              </div>
            </div>
            {fileError && <p className="text-red-500 text-sm mt-3 font-medium">{fileError}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !!fileError || !selectedPackage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing Order...' : 'Submit Order Securely'}
          </button>
        </form>
      </div>
    </div>
  );
}