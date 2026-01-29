"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface VisaCountry {
  code: string;
  name: string;
  flag: string;
  processingTime: string;
  fees: {
    tourist: number;
    business: number;
    student: number;
  };
  requirements: string[];
}

const visaCountries: VisaCountry[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    processingTime: "15-20 working days",
    fees: {
      tourist: 185,
      business: 185,
      student: 185
    },
    requirements: ["Valid passport", "Photo", "Bank statement", "Travel itinerary", "Proof of funds"]
  },
  {
    code: "UK",
    name: "United Kingdom",
    flag: "🇬🇧",
    processingTime: "10-15 working days",
    fees: {
      tourist: 100,
      business: 200,
      student: 150
    },
    requirements: ["Valid passport", "Photo", "Bank statement", "Accommodation proof", "Travel insurance"]
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    processingTime: "20-25 working days",
    fees: {
      tourist: 100,
      business: 150,
      student: 150
    },
    requirements: ["Valid passport", "Photo", "Bank statement", "IELTS score", "Proof of funds"]
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    processingTime: "15-20 working days",
    fees: {
      tourist: 145,
      business: 195,
      student: 160
    },
    requirements: ["Valid passport", "Photo", "Bank statement", "Health insurance", "English proficiency"]
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    processingTime: "5-7 working days",
    fees: {
      tourist: 30,
      business: 60,
      student: 30
    },
    requirements: ["Valid passport", "Photo", "Bank statement", "Travel itinerary", "Hotel bookings"]
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    processingTime: "3-5 working days",
    fees: {
      tourist: 30,
      business: 50,
      student: 30
    },
    requirements: ["Valid passport", "Photo", "Bank statement", "Travel itinerary", "Return ticket"]
  },
  {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    processingTime: "2-3 working days",
    fees: {
      tourist: 20,
      business: 40,
      student: 20
    },
    requirements: ["Valid passport", "Photo", "Bank statement", "Hotel bookings", "Return ticket"]
  },
  {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    processingTime: "2-3 working days",
    fees: {
      tourist: 30,
      business: 60,
      student: 30
    },
    requirements: ["Valid passport", "Photo", "Bank statement", "Hotel bookings", "Return ticket"]
  }
];

export default function VisaServices() {
  const [selectedCountry, setSelectedCountry] = useState<VisaCountry | null>(null);
  const [visaType, setVisaType] = useState<"tourist" | "business" | "student">("tourist");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passportNumber: "",
    nationality: "",
    dateOfBirth: "",
    purpose: ""
  });

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  const handleCountrySelect = (country: VisaCountry) => {
    setSelectedCountry(country);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry) {
      alert("Please select a country");
      return;
    }
    alert(`Visa application submitted for ${selectedCountry.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Visa Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hassle-free visa assistance for your international travel. Expert guidance for tourist, business, and student visas.
            </p>
          </div>

          {/* Country Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Destination Country</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {visaCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCountry?.code === country.code
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{country.flag}</div>
                  <div className="font-medium text-gray-900">{country.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{country.processingTime}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedCountry && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Visa Information */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {selectedCountry.flag} {selectedCountry.name} Visa Information
                  </h3>

                  {/* Visa Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Visa Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { type: "tourist", label: "Tourist" },
                        { type: "business", label: "Business" },
                        { type: "student", label: "Student" }
                      ].map((item) => (
                        <button
                          key={item.type}
                          onClick={() => setVisaType(item.type as any)}
                          className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                            visaType === item.type
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fee Information */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Visa Fees</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Application Fee ({visaType})</span>
                        <span className="font-bold text-lg text-blue-600">
                          {formatPrice(selectedCountry.fees[visaType])}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Processing time: {selectedCountry.processingTime}
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Required Documents</h4>
                    <div className="space-y-2">
                      {selectedCountry.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 11l3 3L22 4"/>
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                          </svg>
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="font-medium text-gray-900 mb-3">Application Details</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number *</label>
                        <input
                          type="text"
                          value={formData.passportNumber}
                          onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Passport number"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
                        <input
                          type="text"
                          value={formData.nationality}
                          onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., Bangladeshi"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Travel *</label>
                      <textarea
                        value={formData.purpose}
                        onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Describe your purpose of travel"
                        required
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full">
                      Submit Visa Application
                    </Button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Service Features */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Why Choose Our Visa Service?</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.14 1.18 6.88L12 17.77l-6.18 6.88L7 13.41l-5-4.14 6.91-.95L12 2z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Expert Guidance</div>
                        <div className="text-sm text-gray-600">Professional assistance throughout the process</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Fast Processing</div>
                        <div className="text-sm text-gray-600">Quick submission and tracking</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Document Verification</div>
                        <div className="text-sm text-gray-600">Complete document checking</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">24/7 Support</div>
                        <div className="text-sm text-gray-600">Round-the-clock assistance</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <span className="text-sm text-gray-700">+880 9617-617-617</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                      <span className="text-sm text-gray-700">visa@sharetrip.net</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
