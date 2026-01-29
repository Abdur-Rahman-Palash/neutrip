"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CityAutocomplete } from "@/components/ui/CityAutocomplete";
import { DatePicker } from "@/components/ui/DatePicker";
import { PassengerSelector } from "@/components/ui/PassengerSelector";
import { City } from "@/data/cities";

type TripType = "oneway" | "roundtrip" | "multicity";

export default function FlightSearch() {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>("roundtrip");
  const [fromCity, setFromCity] = useState<City | null>(null);
  const [toCity, setToCity] = useState<City | null>(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState("economy");

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = () => {
    if (!fromCity || !toCity || !departureDate) {
      alert("Please fill in all required fields");
      return;
    }

    if (tripType === "roundtrip" && !returnDate) {
      alert("Please select return date for round trip");
      return;
    }

    const queryParams = new URLSearchParams({
      from: fromCity.code,
      to: toCity.code,
      fromName: fromCity.name,
      toName: toCity.name,
      departure: departureDate,
      ...(tripType === "roundtrip" && { return: returnDate }),
      tripType,
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString(),
      cabinClass,
    });

    router.push(`/flights/results?${queryParams.toString()}`);
  };

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Flights
            </h1>
            <p className="text-lg text-gray-600">
              Find the best deals on domestic and international flights
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {/* Trip Type Selector */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setTripType("oneway")}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    tripType === "oneway"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  One Way
                </button>
                <button
                  onClick={() => setTripType("roundtrip")}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    tripType === "roundtrip"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Round Trip
                </button>
                <button
                  onClick={() => setTripType("multicity")}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    tripType === "multicity"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Multi City
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
                {/* From */}
                <div className="lg:col-span-3">
                  <CityAutocomplete
                    value={fromCity ? `${fromCity.name} (${fromCity.code})` : ""}
                    onChange={setFromCity}
                    placeholder="From city or airport"
                    label="From"
                  />
                </div>

                {/* Swap Button */}
                <div className="lg:col-span-1 flex justify-center">
                  <button
                    onClick={swapCities}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Swap cities"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
                    </svg>
                  </button>
                </div>

                {/* To */}
                <div className="lg:col-span-3">
                  <CityAutocomplete
                    value={toCity ? `${toCity.name} (${toCity.code})` : ""}
                    onChange={setToCity}
                    placeholder="To city or airport"
                    label="To"
                  />
                </div>

                {/* Dates */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-2">
                  <DatePicker
                    value={departureDate}
                    onChange={setDepartureDate}
                    min={today}
                    label="Departure"
                  />
                  {tripType === "roundtrip" && (
                    <DatePicker
                      value={returnDate}
                      onChange={setReturnDate}
                      min={departureDate || today}
                      label="Return"
                    />
                  )}
                </div>

                {/* Passengers & Class */}
                <div className="lg:col-span-2">
                  <PassengerSelector
                    adults={adults}
                    children={children}
                    infants={infants}
                    onChange={setAdults}
                    cabinClass={cabinClass}
                    onCabinClassChange={setCabinClass}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-6 text-center">
                <Button
                  size="lg"
                  onClick={handleSearch}
                  className="px-12 py-4 text-lg rounded-xl shadow-lg shadow-blue-600/20"
                >
                  Search Flights
                </Button>
              </div>
            </div>

            {/* Popular Routes */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Routes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { from: "Dhaka", to: "Dubai", price: "BDT 25,000" },
                  { from: "Dhaka", to: "Singapore", price: "BDT 35,000" },
                  { from: "Dhaka", to: "Bangkok", price: "BDT 18,000" },
                  { from: "Chattogram", to: "Dubai", price: "BDT 22,000" },
                  { from: "Sylhet", to: "London", price: "BDT 65,000" },
                  { from: "Dhaka", to: "Kuala Lumpur", price: "BDT 28,000" },
                ].map((route, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {route.from} → {route.to}
                        </div>
                        <div className="text-sm text-gray-500">Round trip</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{route.price}</div>
                        <div className="text-xs text-gray-500">from</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
