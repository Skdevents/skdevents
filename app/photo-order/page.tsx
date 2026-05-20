'use client';

import { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, Calendar, User, Phone, Mail, Loader2 } from 'lucide-react';

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
  const [isMounted, setIsMounted] = useState(false);
  const [minDate, setMinDate] = useState('');
  
  const [fileError, setFileError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isOtherInstitute, setIsOtherInstitute] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  // 418 Hydration Error එක සම්පූර්ණයෙන්ම වළක්වන ක්‍රමය
  useEffect(() => {
    setIsMounted(true);
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setFileError('File is too large. Please upload an image under 3MB.');
        setFileName('');
        e.target.value = ''; 
      } else {
        setFileError('');
        setFileName(file.name);
      }
    }
  };

  const handleInstituteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsOtherInstitute(e.target.value === 'Other');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPackage) {
      alert("Please select a package.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('selectedPackage', selectedPackage);

    try {
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
      alert('Error submitting the form.');
    } finally {
      setIsLoading(false);
    }
  };

  // UI එක හැප්පෙන්නේ නැති වෙන්න පේජ් එක ලෝඩ් වෙනකන් Loading එකක් පෙන්නනවා
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-500 font-medium">Loading Secure Form...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
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

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          
          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Seat No</label>
                <input type="text" name="seatNo" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Institute / Campus Name</label>
                <select name="instituteDropdown" onChange={handleInstituteChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white" required>
                  <option value="">Select Institute</option>
                  <option value="ICBT Campus">ICBT Campus</option>
                  <option value="NSBM Green University">NSBM Green University</option>
                  <option value="SLIIT">SLIIT</option>
                  <option value="Other">Other (Please Specify)</option>
                </select>
                {isOtherInstitute && (
                  <input type="text" name="otherInstitute" required placeholder="Type your institute name" className="w-full px-4 py-3 mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Event Date</label>
                <input type="date" name="eventDate" min={minDate} required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Session</label>
                <select name="session" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Select Session</option>
                  <option value="Session 1">Session 1</option>
                  <option value="Session 2">Session 2</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">Select Photo Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedPackage === pkg.name ? 'border-blue-600 bg-blue-50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-blue-300'}`}
                >
                  {selectedPackage === pkg.name && (
                    <div className="absolute -top-3 -right-3 bg-white rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{pkg.name}</h3>
                  <p className="text-blue-600 font-bold text-xl mb-3">{pkg.price}</p>
                  <p className="text-sm text-gray-500">{pkg.details}</p>
                </div>
              ))}
            </div>
            <input type="text" name="packageValidation" required value={selectedPackage} readOnly className="h-0 w-0 opacity-0 absolute" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">First Name</label><input type="text" name="firstName" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Last Name</label><input type="text" name="lastName" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div className="space-y-2 md:col-span-2"><label className="text-sm font-semibold text-gray-700">Courier Address</label><input type="text" name="address" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Nearest Main City</label><input type="text" name="city" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">District</label><select name="district" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"><option value="">Select District</option>{DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              <div className="space-y-2"><label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Phone className="w-4 h-4 text-gray-500" /> Mobile No 1 *</label><input type="tel" name="mobile1" required pattern="[0-9]*" onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div className="space-y-2"><label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Phone className="w-4 h-4 text-gray-500" /> Mobile No 2 (Optional)</label><input type="tel" name="mobile2" pattern="[0-9]*" onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
              <div className="space-y-2 md:col-span-2"><label className="text-sm font-semibold text-gray-700 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-500" /> Email Address</label><input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300 text-center relative">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Payment Slip Upload *</h2>
            <p className="text-sm text-gray-500 mb-4">Max file size: 3MB.</p>
            
            <input 
              type="file" 
              name="paymentSlip" 
              accept="image/*,.pdf" 
              required 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            
            <div className="bg-white px-6 py-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center gap-3">
              <UploadCloud className={`w-10 h-10 ${fileName ? 'text-green-500' : 'text-blue-500'}`} />
              <span className={`font-semibold ${fileName ? 'text-green-600' : 'text-blue-600'}`}>
                {fileName ? fileName : 'Click to upload or drag & drop'}
              </span>
            </div>
            {fileError && <p className="text-red-500 text-sm mt-3 font-medium">{fileError}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !!fileError || !selectedPackage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? 'Processing Order...' : 'Submit Order Securely'}
          </button>
        </form>
      </div>
    </div>
  );
}