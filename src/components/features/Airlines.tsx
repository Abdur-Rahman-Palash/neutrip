"use client";

import { airlines } from "@/data/airlines";

export function Airlines() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Top Airlines</h2>
        
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {airlines.map((airline) => (
            <div
              key={airline.id}
              className="flex-shrink-0 flex flex-col items-center gap-3 min-w-[120px] snap-start group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300 filter grayscale group-hover:grayscale-0">
                <img 
                  src={airline.logo} 
                  alt={airline.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors text-center">
                {airline.name}
              </span>
              <span className="text-xs text-gray-400">
                {airline.code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
