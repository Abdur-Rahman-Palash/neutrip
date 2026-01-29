"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { mockFlights, Flight } from "@/data/flights";
import { airlines } from "@/data/airlines";

type SortOption = "cheapest" | "fastest" | "earliest" | "latest";

function FlightResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("cheapest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [stopsFilter, setStopsFilter] = useState<number[]>([0, 1, 2]);
  const [timeFilter, setTimeFilter] = useState<string[]>(["morning", "afternoon", "evening", "night"]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Search parameters
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const fromName = searchParams.get("fromName") || "";
  const toName = searchParams.get("toName") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";
  const tripType = searchParams.get("tripType") || "oneway";
  const cabinClass = searchParams.get("cabinClass") || "economy";

  useEffect(() => {
    setFlights(mockFlights);
    setFilteredFlights(mockFlights);
  }, []);

  useEffect(() => {
    let filtered = [...flights];

    // Price filter
    filtered = filtered.filter(flight => {
      const price = flight.price[cabinClass as keyof typeof flight.price] || flight.price.economy;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Airline filter
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter(flight => 
        selectedAirlines.includes(flight.airlineCode)
      );
    }

    // Stops filter
    filtered = filtered.filter(flight => stopsFilter.includes(flight.stops));

    // Time filter
    filtered = filtered.filter(flight => {
      const hour = parseInt(flight.departure.time.split(':')[0]);
      let timeOfDay = "";
      if (hour >= 5 && hour < 12) timeOfDay = "morning";
      else if (hour >= 12 && hour < 17) timeOfDay = "afternoon";
      else if (hour >= 17 && hour < 21) timeOfDay = "evening";
      else timeOfDay = "night";
      
      return timeFilter.includes(timeOfDay);
    });

    // Sort
    switch (sortBy) {
      case "cheapest":
        filtered.sort((a, b) => 
          (a.price[cabinClass as keyof typeof a.price] || a.price.economy) - 
          (b.price[cabinClass as keyof typeof b.price] || b.price.economy)
        );
        break;
      case "fastest":
        filtered.sort((a, b) => {
          const aDuration = parseInt(a.duration.replace(/[^\d]/g, ''));
          const bDuration = parseInt(b.duration.replace(/[^\d]/g, ''));
          return aDuration - bDuration;
        });
        break;
      case "earliest":
        filtered.sort((a, b) => a.departure.time.localeCompare(b.departure.time));
        break;
      case "latest":
        filtered.sort((a, b) => b.departure.time.localeCompare(a.departure.time));
        break;
    }

    setFilteredFlights(filtered);
  }, [flights, sortBy, priceRange, selectedAirlines, stopsFilter, timeFilter, cabinClass]);

  const handleAirlineToggle = (airlineCode: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airlineCode)
        ? prev.filter(code => code !== airlineCode)
        : [...prev, airlineCode]
    );
  };

  const handleStopsToggle = (stops: number) => {
    setStopsFilter(prev => 
      prev.includes(stops)
        ? prev.filter(s => s !== stops)
        : [...prev, stops]
    );
  };

  const handleTimeToggle = (time: string) => {
    setTimeFilter(prev => 
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  const formatDuration = (duration: string) => {
    return duration.replace('h', 'h ').replace('m', 'm');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Search Summary */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <span className="font-medium text-gray-900">{fromName}</span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="font-medium text-gray-900">{toName}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {departure} {returnDate && `- ${returnDate}`}
                </div>
                <div className="text-sm text-gray-600">
                  {tripType === "roundtrip" ? "Round trip" : "One way"} • {cabinClass}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/flights")}
              >
                Modify Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-80">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="w-full"
                  variant="outline"
                >
                  Filters ({selectedAirlines.length + stopsFilter.length + timeFilter.length})
                </Button>
              </div>

              {/* Filters */}
              <div className={`bg-white rounded-lg p-6 shadow-sm ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
                <h3 className="font-bold text-gray-900 mb-6">Filters</h3>

                {/* Sort */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cheapest">Cheapest</option>
                    <option value="fastest">Fastest</option>
                    <option value="earliest">Earliest</option>
                    <option value="latest">Latest</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <RangeSlider
                    min={0}
                    max={150000}
                    value={priceRange}
                    onChange={setPriceRange}
                    label="Price Range"
                    formatValue={formatPrice}
                  />
                </div>

                {/* Airlines */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Airlines</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {airlines.map((airline) => (
                      <label key={airline.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(airline.code)}
                          onChange={() => handleAirlineToggle(airline.code)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{airline.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stops */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Stops</label>
                  <div className="space-y-2">
                    {[0, 1, 2].map((stops) => (
                      <label key={stops} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={stopsFilter.includes(stops)}
                          onChange={() => handleStopsToggle(stops)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {stops === 0 ? "Non-stop" : stops === 1 ? "1 Stop" : "2+ Stops"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Departure Time */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Departure Time</label>
                  <div className="space-y-2">
                    {[
                      { value: "morning", label: "Morning (5:00 - 12:00)" },
                      { value: "afternoon", label: "Afternoon (12:00 - 17:00)" },
                      { value: "evening", label: "Evening (17:00 - 21:00)" },
                      { value: "night", label: "Night (21:00 - 5:00)" }
                    ].map((time) => (
                      <label key={time.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={timeFilter.includes(time.value)}
                          onChange={() => handleTimeToggle(time.value)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{time.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Results Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-gray-900">
                      {filteredFlights.length} Flights Found
                    </h2>
                    <div className="text-sm text-gray-600">
                      {fromName} → {toName} • {departure}
                    </div>
                  </div>
                </div>

                {/* Flight List */}
                <div className="divide-y divide-gray-200">
                  {filteredFlights.map((flight) => {
                    const price = flight.price[cabinClass as keyof typeof flight.price] || flight.price.economy;
                    
                    return (
                      <div key={flight.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          {/* Airline Info */}
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-600">{flight.airlineCode}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{flight.airline}</div>
                              <div className="text-sm text-gray-600">{flight.flightNumber}</div>
                            </div>
                          </div>

                          {/* Flight Details */}
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="font-bold text-lg text-gray-900">{flight.departure.time}</div>
                                <div className="text-sm text-gray-600">{flight.departure.code}</div>
                                <div className="text-xs text-gray-500">{flight.departure.city}</div>
                              </div>
                              
                              <div className="flex-1 text-center">
                                <div className="text-sm text-gray-600 mb-1">{formatDuration(flight.duration)}</div>
                                <div className="flex items-center justify-center gap-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                  <div className="flex-1 h-0.5 bg-gray-400"></div>
                                  {flight.stops > 0 && (
                                    <div className="flex-1 h-0.5 bg-gray-400 border-dashed"></div>
                                  )}
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                                </div>
                              </div>
                              
                              <div className="text-center">
                                <div className="font-bold text-lg text-gray-900">{flight.arrival.time}</div>
                                <div className="text-sm text-gray-600">{flight.arrival.code}</div>
                                <div className="text-xs text-gray-500">{flight.arrival.city}</div>
                              </div>
                            </div>
                          </div>

                          {/* Price & Book */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600 mb-2">
                              {formatPrice(price)}
                            </div>
                            <div className="text-sm text-gray-600 mb-3">
                              {cabinClass}
                            </div>
                            <Button
                              onClick={() => router.push(`/flights/${flight.id}?${searchParams.toString()}`)}
                              size="sm"
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredFlights.length === 0 && (
                  <div className="p-12 text-center">
                    <div className="text-gray-500 mb-4">No flights found matching your criteria</div>
                    <Button variant="outline" onClick={() => {
                      setPriceRange([0, 150000]);
                      setSelectedAirlines([]);
                      setStopsFilter([0, 1, 2]);
                      setTimeFilter(["morning", "afternoon", "evening", "night"]);
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function FlightResults() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flight results...</p>
        </div>
      </div>
    }>
      <FlightResultsContent />
    </Suspense>
  );
}
