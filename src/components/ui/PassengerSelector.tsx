"use client";

import { useState, useRef, useEffect } from "react";

interface PassengerSelectorProps {
  adults: number;
  children: number;
  infants: number;
  onChange: (adults: number, children: number, infants: number) => void;
  cabinClass: string;
  onCabinClassChange: (cabinClass: string) => void;
}

export function PassengerSelector({ 
  adults, 
  children, 
  infants, 
  onChange, 
  cabinClass, 
  onCabinClassChange 
}: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTotalPassengers = () => adults + children + infants;

  const handlePassengerChange = (type: 'adults' | 'children' | 'infants', delta: number) => {
    let newAdults = adults;
    let newChildren = children;
    let newInfants = infants;

    switch (type) {
      case 'adults':
        newAdults = Math.max(1, adults + delta);
        break;
      case 'children':
        newChildren = Math.max(0, children + delta);
        break;
      case 'infants':
        newInfants = Math.max(0, infants + delta);
        // Infants cannot exceed adults
        if (newInfants > newAdults) {
          newInfants = newAdults;
        }
        break;
    }

    onChange(newAdults, newChildren, newInfants);
  };

  const getCabinClassDisplay = () => {
    switch (cabinClass) {
      case 'economy': return 'Economy';
      case 'premium_economy': return 'Premium Economy';
      case 'business': return 'Business';
      case 'first': return 'First Class';
      default: return 'Economy';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm font-medium hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left"
      >
        <span className="truncate">
          {getTotalPassengers()} Traveler{getTotalPassengers() > 1 ? 's' : ''}, {getCabinClassDisplay()}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          {/* Cabin Class Selector */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cabin Class</label>
            <select
              value={cabinClass}
              onChange={(e) => onCabinClassChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>

          {/* Passenger Counters */}
          <div className="space-y-3">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Adults</div>
                <div className="text-xs text-gray-500">12+ years</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePassengerChange('adults', -1)}
                  disabled={adults <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{adults}</span>
                <button
                  onClick={() => handlePassengerChange('adults', 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Children</div>
                <div className="text-xs text-gray-500">2-11 years</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePassengerChange('children', -1)}
                  disabled={children <= 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{children}</span>
                <button
                  onClick={() => handlePassengerChange('children', 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Infants</div>
                <div className="text-xs text-gray-500">Under 2 years</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePassengerChange('infants', -1)}
                  disabled={infants <= 0}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{infants}</span>
                <button
                  onClick={() => handlePassengerChange('infants', 1)}
                  disabled={infants >= adults}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
