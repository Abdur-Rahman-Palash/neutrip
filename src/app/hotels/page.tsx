"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CityAutocomplete } from "@/components/ui/CityAutocomplete";
import { DatePicker } from "@/components/ui/DatePicker";
import { City } from "@/data/cities";

interface GuestRoom {
  adults: number;
  children: number;
  infants: number;
}

export default function HotelSearch() {
  const router = useRouter();
  const [destination, setDestination] = useState<City | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestRooms, setGuestRooms] = useState<GuestRoom[]>([{ adults: 2, children: 0, infants: 0 }]);
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = () => {
    if (!destination || !checkIn || !checkOut) {
      alert("Please fill in all required fields");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in date");
      return;
    }

    const totalGuests = guestRooms.reduce((sum, room) => sum + room.adults + room.children, 0);
    const totalRooms = guestRooms.length;

    const queryParams = new URLSearchParams({
      destination: destination.name,
      destinationCode: destination.code,
      checkIn,
      checkOut,
      guests: totalGuests.toString(),
      rooms: totalRooms.toString(),
    });

    // Add room-specific parameters
    guestRooms.forEach((room, index) => {
      queryParams.set(`room${index}Adults`, room.adults.toString());
      queryParams.set(`room${index}Children`, room.children.toString());
      queryParams.set(`room${index}Infants`, room.infants.toString());
    });

    router.push(`/hotels/results?${queryParams.toString()}`);
  };

  const addRoom = () => {
    if (guestRooms.length < 4) {
      setGuestRooms([...guestRooms, { adults: 2, children: 0, infants: 0 }]);
    }
  };

  const removeRoom = (index: number) => {
    if (guestRooms.length > 1) {
      setGuestRooms(guestRooms.filter((_, i) => i !== index));
    }
  };

  const updateRoom = (index: number, field: keyof GuestRoom, value: number) => {
    const updatedRooms = [...guestRooms];
    updatedRooms[index] = { ...updatedRooms[index], [field]: value };
    setGuestRooms(updatedRooms);
  };

  const getTotalGuests = () => {
    return guestRooms.reduce((sum, room) => sum + room.adults + room.children + room.infants, 0);
  };

  const getTotalRooms = () => guestRooms.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Hotels
            </h1>
            <p className="text-lg text-gray-600">
              Find the perfect accommodation for your trip
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Destination */}
                <div className="md:col-span-2">
                  <CityAutocomplete
                    value={destination ? `${destination.name}, ${destination.country}` : ""}
                    onChange={setDestination}
                    placeholder="Enter city or hotel name"
                    label="Destination"
                  />
                </div>

                {/* Check-in Date */}
                <DatePicker
                  value={checkIn}
                  onChange={setCheckIn}
                  min={today}
                  label="Check-in"
                />

                {/* Check-out Date */}
                <DatePicker
                  value={checkOut}
                  onChange={setCheckOut}
                  min={checkIn || today}
                  label="Check-out"
                />
              </div>

              {/* Guests & Rooms */}
              <div className="mb-6">
                <div className="relative">
                  <button
                    onClick={() => setIsGuestSelectorOpen(!isGuestSelectorOpen)}
                    className="w-full h-12 px-4 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm font-medium hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left"
                  >
                    <span className="truncate">
                      {getTotalRooms()} Room{getTotalRooms() > 1 ? 's' : ''}, {getTotalGuests()} Guest{getTotalGuests() > 1 ? 's' : ''}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>

                  {isGuestSelectorOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {guestRooms.map((room, roomIndex) => (
                          <div key={roomIndex} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">Room {roomIndex + 1}</h4>
                              {guestRooms.length > 1 && (
                                <button
                                  onClick={() => removeRoom(roomIndex)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            
                            <div className="space-y-3">
                              {/* Adults */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-gray-900">Adults</div>
                                  <div className="text-xs text-gray-500">18+ years</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateRoom(roomIndex, 'adults', Math.max(1, room.adults - 1))}
                                    disabled={room.adults <= 1}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center font-medium">{room.adults}</span>
                                  <button
                                    onClick={() => updateRoom(roomIndex, 'adults', Math.min(4, room.adults + 1))}
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
                                  <div className="text-xs text-gray-500">2-17 years</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateRoom(roomIndex, 'children', Math.max(0, room.children - 1))}
                                    disabled={room.children <= 0}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center font-medium">{room.children}</span>
                                  <button
                                    onClick={() => updateRoom(roomIndex, 'children', Math.min(3, room.children + 1))}
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
                                    onClick={() => updateRoom(roomIndex, 'infants', Math.max(0, room.infants - 1))}
                                    disabled={room.infants <= 0}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center font-medium">{room.infants}</span>
                                  <button
                                    onClick={() => updateRoom(roomIndex, 'infants', Math.min(2, room.infants + 1))}
                                    disabled={room.infants >= room.adults}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Room Button */}
                      {guestRooms.length < 4 && (
                        <button
                          onClick={addRoom}
                          className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                        >
                          + Add Another Room
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={handleSearch}
                  className="px-12 py-4 text-lg rounded-xl shadow-lg shadow-blue-600/20"
                >
                  Search Hotels
                </Button>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Hotel Destinations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { city: "Dhaka", country: "Bangladesh", price: "BDT 3,500", hotels: 156 },
                  { city: "Cox's Bazar", country: "Bangladesh", price: "BDT 4,200", hotels: 89 },
                  { city: "Sylhet", country: "Bangladesh", price: "BDT 2,800", hotels: 67 },
                  { city: "Dubai", country: "UAE", price: "BDT 8,500", hotels: 456 },
                  { city: "Singapore", country: "Singapore", price: "BDT 12,000", hotels: 234 },
                  { city: "Bangkok", country: "Thailand", price: "BDT 5,500", hotels: 189 },
                ].map((destination, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => {
                      const city = { id: index.toString(), name: destination.city, country: destination.country, code: destination.city.substring(0, 3).toUpperCase(), timezone: "Asia/Dhaka" };
                      setDestination(city);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {destination.city}
                        </div>
                        <div className="text-sm text-gray-500">{destination.country}</div>
                        <div className="text-xs text-gray-400">{destination.hotels} hotels</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{destination.price}</div>
                        <div className="text-xs text-gray-500">from/night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Types */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Hotel Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { type: "Luxury Hotels", icon: "🏨", count: 45 },
                  { type: "Budget Hotels", icon: "💰", count: 78 },
                  { type: "Resorts", icon: "🏖️", count: 23 },
                  { type: "Business Hotels", icon: "💼", count: 56 },
                  { type: "Family Hotels", icon: "👨‍👩‍👧‍👦", count: 34 },
                  { type: "Boutique Hotels", icon: "🎨", count: 19 },
                  { type: "Airport Hotels", icon: "✈️", count: 12 },
                  { type: "Beach Hotels", icon: "🏖️", count: 28 },
                ].map((hotelType, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer text-center"
                  >
                    <div className="text-3xl mb-2">{hotelType.icon}</div>
                    <div className="font-medium text-gray-900 text-sm">{hotelType.type}</div>
                    <div className="text-xs text-gray-500">{hotelType.count} hotels</div>
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
