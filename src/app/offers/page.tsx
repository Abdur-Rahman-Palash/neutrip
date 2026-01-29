"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  category: string;
  validUntil: string;
  terms: string;
  bank?: string;
  image: string;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "Summer Flight Sale",
    description: "Get up to 30% off on domestic flights",
    code: "SUMMER30",
    discount: "30% OFF",
    category: "flights",
    validUntil: "2024-08-31",
    terms: "Valid for domestic flights only. Minimum booking amount BDT 5,000.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a139cc57?w=600&h=400&fit=crop"
  },
  {
    id: "2",
    title: "DBI Bank Credit Card Offer",
    description: "Extra 15% off on all bookings with DBI credit cards",
    code: "DBI15",
    discount: "15% OFF",
    category: "bank",
    validUntil: "2024-12-31",
    terms: "Valid only on DBI credit cards. Cannot be combined with other offers.",
    bank: "DBI Bank",
    image: "https://images.unsplash.com/photo-1563013544658-65025ead80aa?w=600&h=400&fit=crop"
  },
  {
    id: "3",
    title: "Hotel Weekend Special",
    description: "20% off on weekend hotel stays",
    code: "WEEKEND20",
    discount: "20% OFF",
    category: "hotels",
    validUntil: "2024-09-30",
    terms: "Valid for Friday-Sunday stays only. Minimum 2 nights required.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"
  },
  {
    id: "4",
    title: "Brac Bank Flash Sale",
    description: "25% off on international flights",
    code: "BRAC25",
    discount: "25% OFF",
    category: "bank",
    validUntil: "2024-07-31",
    terms: "Valid for international flights only. Brac Bank credit/debit cards.",
    bank: "Brac Bank",
    image: "https://images.unsplash.com/photo-1548618606-52341b5b8a6d?w=600&h=400&fit=crop"
  },
  {
    id: "5",
    title: "Holiday Package Deal",
    description: "Up to BDT 5,000 off on holiday packages",
    code: "HOLIDAY5K",
    discount: "BDT 5,000 OFF",
    category: "packages",
    validUntil: "2024-10-31",
    terms: "Valid on packages above BDT 20,000. Cannot be combined with other discounts.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop"
  },
  {
    id: "6",
    title: "City Bank Travel Month",
    description: "10% cashback on all travel bookings",
    code: "CITY10",
    discount: "10% CASHBACK",
    category: "bank",
    validUntil: "2024-08-15",
    terms: "Maximum cashback BDT 2,000. Valid on City Bank cards only.",
    bank: "City Bank",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
  },
  {
    id: "7",
    title: "First Time User Offer",
    description: "BDT 500 off on your first booking",
    code: "FIRST500",
    discount: "BDT 500 OFF",
    category: "newuser",
    validUntil: "2024-12-31",
    terms: "Valid for first-time users only. Minimum booking BDT 2,000.",
    image: "https://images.unsplash.com/photo-1554658895-80bfcc30995c?w=600&h=400&fit=crop"
  },
  {
    id: "8",
    title: "Dutch Bangla Bank Special",
    description: "20% off on hotel bookings",
    code: "DBBL20",
    discount: "20% OFF",
    category: "bank",
    validUntil: "2024-09-15",
    terms: "Valid on hotel bookings only. Dutch Bangla Bank credit cards.",
    bank: "Dutch Bangla Bank",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop"
  }
];

export default function OffersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredOffers = selectedCategory === "all" 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  const categories = [
    { id: "all", name: "All Offers" },
    { id: "flights", name: "Flights" },
    { id: "hotels", name: "Hotels" },
    { id: "packages", name: "Holiday Packages" },
    { id: "bank", name: "Bank Offers" },
    { id: "newuser", name: "New User" }
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  const getDaysLeft = (validUntil: string) => {
    const today = new Date();
    const expiryDate = new Date(validUntil);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Exclusive Offers & Deals
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Save big on your travel with our exclusive offers, bank deals, and seasonal promotions.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => {
              const expired = isExpired(offer.validUntil);
              const daysLeft = getDaysLeft(offer.validUntil);
              
              return (
                <div key={offer.id} className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden ${expired ? 'opacity-75' : ''}`}>
                  {/* Offer Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {offer.discount}
                    </div>
                    {expired && (
                      <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Expired
                      </div>
                    )}
                    {!expired && daysLeft <= 7 && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {daysLeft} days left
                      </div>
                    )}
                  </div>

                  {/* Offer Content */}
                  <div className="p-6">
                    {/* Bank Badge */}
                    {offer.bank && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-blue-600">{offer.bank}</span>
                      </div>
                    )}

                    {/* Offer Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{offer.title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                    
                    {/* Promo Code */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Promo Code</div>
                          <div className="font-mono font-bold text-gray-900">{offer.code}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(offer.code)}
                          disabled={expired}
                        >
                          {copiedCode === offer.code ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                    </div>

                    {/* Valid Until */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-600">Valid until:</span>
                      <span className={`font-medium ${expired ? 'text-red-600' : 'text-gray-900'}`}>
                        {new Date(offer.validUntil).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Terms */}
                    <div className="text-xs text-gray-500 mb-4">
                      <strong>Terms:</strong> {offer.terms}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full"
                      disabled={expired}
                    >
                      {expired ? "Offer Expired" : "Use This Offer"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredOffers.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-500 mb-4">No offers found in this category</div>
              <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                View All Offers
              </Button>
            </div>
          )}

          {/* How to Use Section */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use These Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">1️⃣</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Choose an Offer</h3>
                <p className="text-sm text-gray-600">Browse through our exclusive offers and select the one that suits your travel needs.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">2️⃣</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Copy the Code</h3>
                <p className="text-sm text-gray-600">Click the copy button to copy the promo code to your clipboard.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">3️⃣</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Apply at Checkout</h3>
                <p className="text-sm text-gray-600">Enter the promo code during checkout to avail the discount.</p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">Terms & Conditions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Offers cannot be combined with other promotions unless specified</li>
              <li>• All offers are subject to availability and terms of the service provider</li>
              <li>• ShareTrip reserves the right to modify or cancel any offer without prior notice</li>
              <li>• Offers are valid for the specified period only</li>
              <li>• Please read individual offer terms before booking</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
