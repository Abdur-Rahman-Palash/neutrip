"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { holidayPackages } from "@/data/hotels";

export default function HolidayPackages() {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>("price-low");

  const filteredPackages = holidayPackages.filter(pkg => {
    if (selectedDuration !== "all") {
      const duration = parseInt(pkg.duration.split(' ')[0]);
      if (selectedDuration === "short" && duration > 4) return false;
      if (selectedDuration === "medium" && (duration < 4 || duration > 7)) return false;
      if (selectedDuration === "long" && duration < 7) return false;
    }
    
    if (selectedDestination !== "all") {
      if (!pkg.locations.some(loc => loc.toLowerCase().includes(selectedDestination.toLowerCase()))) {
        return false;
      }
    }
    
    if (pkg.price < priceRange[0] || pkg.price > priceRange[1]) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "duration-short":
        return parseInt(a.duration.split(' ')[0]) - parseInt(b.duration.split(' ')[0]);
      case "duration-long":
        return parseInt(b.duration.split(' ')[0]) - parseInt(a.duration.split(' ')[0]);
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  const getDurationDays = (duration: string) => {
    return parseInt(duration.split(' ')[0]);
  };

  const allDestinations = Array.from(new Set(holidayPackages.flatMap(pkg => pkg.locations)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Holiday Packages
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing holiday packages to your favorite destinations. All-inclusive deals with flights, hotels, and activities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-6">Filter Packages</h3>

                {/* Duration Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Duration</label>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "All Durations" },
                      { value: "short", label: "Short (1-4 days)" },
                      { value: "medium", label: "Medium (4-7 days)" },
                      { value: "long", label: "Long (7+ days)" }
                    ].map((duration) => (
                      <label key={duration.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="duration"
                          value={duration.value}
                          checked={selectedDuration === duration.value}
                          onChange={(e) => setSelectedDuration(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{duration.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Destination Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Destination</label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Destinations</option>
                    {allDestinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration-short">Duration: Short to Long</option>
                    <option value="duration-long">Duration: Long to Short</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Package Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {filteredPackages.length} Holiday Packages Found
                </h2>
                <div className="text-sm text-gray-600">
                  Showing all available packages
                </div>
              </div>

              {/* Package Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                    {/* Package Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {pkg.duration}
                      </div>
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Popular
                      </div>
                    </div>

                    {/* Package Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {pkg.name}
                      </h3>
                      
                      {/* Locations */}
                      <div className="flex items-center gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span className="text-sm text-gray-600">
                          {pkg.locations.join(' → ')}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span className="text-sm text-gray-600">{pkg.duration}</span>
                      </div>

                      {/* Inclusions */}
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-900 mb-2">Includes:</div>
                        <div className="flex flex-wrap gap-1">
                          {pkg.includes.slice(0, 3).map((item, index) => (
                            <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {item}
                            </span>
                          ))}
                          {pkg.includes.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              +{pkg.includes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-sm text-gray-600">From</div>
                          <div className="text-xl font-bold text-blue-600">
                            {formatPrice(pkg.price)}
                          </div>
                          <div className="text-xs text-gray-500">per person</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => router.push(`/holidays/${pkg.id}`)}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/holidays/${pkg.id}?booking=true`)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPackages.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-gray-500 mb-4">No packages found matching your criteria</div>
                  <Button variant="outline" onClick={() => {
                    setSelectedDuration("all");
                    setSelectedDestination("all");
                    setPriceRange([0, 2000]);
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Dhaka", count: 12, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" },
                { name: "Cox's Bazar", count: 8, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop" },
                { name: "Sylhet", count: 6, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop" },
                { name: "Bandarban", count: 4, image: "https://images.unsplash.com/photo-1464822759842-33c89424de2d?w=400&h=300&fit=crop" }
              ].map((dest) => (
                <div
                  key={dest.name}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedDestination(dest.name)}
                >
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-3 text-white">
                    <div className="font-medium">{dest.name}</div>
                    <div className="text-xs">{dest.count} packages</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
