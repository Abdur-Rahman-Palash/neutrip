"use client";

import { destinations } from "@/data/destinations";

export function Destinations() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Explore Destinations
            </h2>
            <p className="text-gray-500 mt-2">
              Find the perfect place for your next getaway
            </p>
          </div>
          <a href="#" className="hidden md:block text-blue-600 font-medium hover:underline">
            View All Destinations
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="h-48 w-full relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                <h3 className="text-lg font-bold group-hover:text-blue-200 transition-colors">
                  {destination.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-medium opacity-90">{destination.country}</span>
                  <span className="text-xs bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                    {destination.hotelCount} Hotels
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <a href="#" className="text-blue-600 font-medium hover:underline">
                View All Destinations
            </a>
        </div>
      </div>
    </section>
  );
}
