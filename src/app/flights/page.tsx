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
import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, scaleIn, staggerContainer, hoverScale, hoverLift } from "@/components/layout/AnimatedLayout";

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
      
      <motion.main {...staggerContainer} className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <motion.div {...fadeInUp} className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Flights
            </h1>
            <p className="text-lg text-gray-600">
              Find the best deals on domestic and international flights
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div {...scaleIn} className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {/* Trip Type Selector */}
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="flex gap-2 mb-6">
                <motion.button
                  onClick={() => setTripType("oneway")}
                  {...hoverScale}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    tripType === "oneway"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  One Way
                </motion.button>
                <motion.button
                  onClick={() => setTripType("roundtrip")}
                  {...hoverScale}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    tripType === "roundtrip"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Round Trip
                </motion.button>
                <motion.button
                  onClick={() => setTripType("multicity")}
                  {...hoverScale}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    tripType === "multicity"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Multi City
                </motion.button>
              </motion.div>

              {/* Form Fields */}
              <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
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
                  <motion.button
                    onClick={swapCities}
                    {...hoverScale}
                    className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                    </svg>
                  </motion.button>
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

                {/* Departure Date */}
                <div className="lg:col-span-2">
                  <DatePicker
                    value={departureDate}
                    onChange={setDepartureDate}
                    label="Departure"
                    min={today}
                  />
                </div>

                {/* Return Date */}
                {tripType === "roundtrip" && (
                  <div className="lg:col-span-2">
                    <DatePicker
                      value={returnDate}
                      onChange={setReturnDate}
                      label="Return"
                      min={departureDate}
                    />
                  </div>
                )}

                {/* Passenger & Class */}
                <div className="lg:col-span-2">
                  <PassengerSelector
                    adults={adults}
                    children={children}
                    infants={infants}
                    cabinClass={cabinClass}
                    onAdultsChange={setAdults}
                    onChildrenChange={setChildren}
                    onInfantsChange={setInfants}
                    onCabinClassChange={setCabinClass}
                  />
                </div>

                {/* Search Button */}
                <div className="lg:col-span-2">
                  <motion.div {...hoverScale}>
                    <Button
                      onClick={handleSearch}
                      size="lg"
                      className="w-full"
                    >
                      Search Flights
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Popular Routes */}
          <motion.div {...fadeInUp} transition={{ delay: 0.5 }} className="mt-12">
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
                <motion.div
                  key={index}
                  {...hoverLift}
                  transition={{ delay: index * 0.1 }}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
