"use client";

import { useState } from "react";
import { hotels, holidayPackages } from "@/data/hotels";
import { Button } from "@/components/ui/Button";

export function HotelsAndPackages() {
  const [activeTab, setActiveTab] = useState<'hotels' | 'packages'>('hotels');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Hotels & Holiday Packages
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'hotels'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Hotels
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'packages'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Holiday Packages
          </button>
        </div>

        {/* Content */}
        {activeTab === 'hotels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="h-48 w-full relative">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors mb-2">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 ${i < Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({hotel.rating})</span>
                    <span className="text-xs text-gray-400 ml-1">({hotel.reviewCount} reviews)</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{hotel.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">From</span>
                    <span className="text-lg font-bold text-gray-900">${hotel.price}/night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {holidayPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="h-48 w-full relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs font-medium text-blue-600 mb-2 bg-blue-50 inline-block px-2 py-1 rounded-full">
                    {pkg.duration}
                  </p>
                  <div className="text-xs text-gray-500 mb-3">
                    {pkg.locations.join(' → ')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Per Person</span>
                    <span className="text-lg font-bold text-gray-900">${pkg.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All {activeTab === 'hotels' ? 'Hotels' : 'Packages'}
          </Button>
        </div>
      </div>
    </section>
  );
}
