"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Tab = "flight" | "hotel" | "holiday";

export function HeroSearch() {
  const [activeTab, setActiveTab] = useState<Tab>("flight");

  return (
    <section className="relative w-full bg-blue-50 py-20 lg:py-32">
      {/* Background Decor - simple gradient/pattern for travel feel */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-100/50 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Your Journey Starts Here
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Flights, Hotels & Holidays at the Best Price
          </p>
        </div>

        {/* Search Panel */}
        <div className="bg-white rounded-2xl shadow-xl max-w-5xl mx-auto overflow-hidden border border-gray-100">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("flight")}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeTab === "flight"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L2 22" />
                <path d="M12 2L2 22" />
                <path d="M22 2L12 22" />
                <path d="M2 12H22" /> {/* Placeholder Plane Icon */}
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 4 6 3.2-2 2-4-1.5L1 16c7.4 2.6 13.4 5.6 19.2 7.4.7.2 1.4-.4 1.2-1.1l-2.6-4.1z" />
              </svg>
              Flight
            </button>
            <button
              onClick={() => setActiveTab("hotel")}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeTab === "hotel"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 22V2c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v20" />
                <path d="M10 22V10" />
                <path d="M14 22V10" />
                <rect x="9" y="5" width="2" height="2" />
                <rect x="13" y="5" width="2" height="2" />
              </svg>
              Hotel
            </button>
            <button
              onClick={() => setActiveTab("holiday")}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeTab === "holiday"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M8 11h8" />
                <path d="M12 7v8" /> {/* Placeholder Holiday Icon */}
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Holiday
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === "flight" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                
                {/* From */}
                <div className="lg:col-span-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">From</label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Dhaka (DAC)" 
                      className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Swap Icon (Visual only) */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center pb-2">
                   <div className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>
                   </div>
                </div>

                {/* To */}
                <div className="lg:col-span-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">To</label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Cox's Bazar (CXB)" 
                      className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Departure</label>
                    <div className="relative group">
                      <input 
                        type="date" 
                        className="w-full h-12 px-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Return</label>
                    <div className="relative group">
                       <input 
                        type="date" 
                        className="w-full h-12 px-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Travelers & Class */}
                <div className="lg:col-span-2 md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Travelers & Class</label>
                  <div className="relative group">
                    <button className="w-full h-12 px-4 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm font-medium hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left">
                       <span className="truncate">1 Traveler, Economy</span>
                       <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                  </div>
                </div>

                {/* Search Button */}
                <div className="lg:col-span-12 flex justify-center mt-4 lg:mt-6">
                    <Button size="lg" className="w-full md:w-auto px-12 py-6 text-lg rounded-xl shadow-lg shadow-blue-600/20">
                      Search Flights
                    </Button>
                </div>
              </div>
            )}
            
            {activeTab !== "flight" && (
                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <p>Search functionality for {activeTab} coming soon.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
