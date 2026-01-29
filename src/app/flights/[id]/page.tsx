"use client";

import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { mockFlights, Flight } from "@/data/flights";

export default function FlightDetails() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedFare, setSelectedFare] = useState("economy");
  const [activeTab, setActiveTab] = useState("itinerary");

  const flightId = params.id as string;
  const flight = mockFlights.find(f => f.id === flightId);

  // Search parameters
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const fromName = searchParams.get("fromName") || "";
  const toName = searchParams.get("toName") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";
  const tripType = searchParams.get("tripType") || "oneway";
  const adults = parseInt(searchParams.get("adults") || "1");
  const children = parseInt(searchParams.get("children") || "0");
  const infants = parseInt(searchParams.get("infants") || "0");
  const cabinClass = searchParams.get("cabinClass") || "economy";

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Flight Not Found</h1>
            <Button onClick={() => router.push("/flights")}>
              Search Flights
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  const formatDuration = (duration: string) => {
    return duration.replace('h', 'h ').replace('m', 'm');
  };

  const calculateTotalPrice = () => {
    const basePrice = flight.price[selectedFare as keyof typeof flight.price] || flight.price.economy;
    const passengers = adults + children;
    return basePrice * passengers;
  };

  const fareTypes = [
    { id: "economy", name: "Economy", price: flight.price.economy },
    { id: "premium_economy", name: "Premium Economy", price: flight.price.premium_economy },
    { id: "business", name: "Business", price: flight.price.business },
    { id: "first", name: "First Class", price: flight.price.first }
  ];

  const handleBooking = () => {
    const bookingParams = new URLSearchParams({
      flightId: flight.id,
      from,
      to,
      fromName,
      toName,
      departure,
      ...(returnDate && { return: returnDate }),
      tripType,
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString(),
      cabinClass: selectedFare,
    });

    router.push(`/flights/booking?${bookingParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <button onClick={() => router.push("/flights")} className="hover:text-blue-600">
              Flights
            </button>
            <span>→</span>
            <button onClick={() => router.back()} className="hover:text-blue-600">
              Results
            </button>
            <span>→</span>
            <span className="text-gray-900">Flight Details</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Flight Header */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">{flight.airlineCode}</span>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{flight.airline}</h1>
                      <p className="text-gray-600">{flight.flightNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Aircraft</div>
                    <div className="font-medium text-gray-900">{flight.aircraft}</div>
                  </div>
                </div>

                {/* Route Summary */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="font-bold text-xl text-gray-900">{flight.departure.time}</div>
                    <div className="text-sm text-gray-600">{flight.departure.code}</div>
                    <div className="text-xs text-gray-500">{flight.departure.city}</div>
                  </div>
                  
                  <div className="flex-1 text-center">
                    <div className="text-sm text-gray-600 mb-1">{formatDuration(flight.duration)}</div>
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <div className="flex-1 h-1 bg-blue-600"></div>
                      {flight.stops > 0 && (
                        <div className="flex-1 h-1 bg-blue-600 border-dashed"></div>
                      )}
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-bold text-xl text-gray-900">{flight.arrival.time}</div>
                    <div className="text-sm text-gray-600">{flight.arrival.code}</div>
                    <div className="text-xs text-gray-500">{flight.arrival.city}</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                  <div className="flex gap-8">
                    {["itinerary", "baggage", "fare-rules", "reviews"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === tab
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.split("-").map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(" ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "itinerary" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4">Flight Itinerary</h3>
                        
                        {/* Departure */}
                        <div className="flex gap-4 pb-6 border-b border-gray-200">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">Departure</div>
                            <div className="text-sm text-gray-600 mb-2">
                              {flight.departure.time} • {flight.departure.terminal && `Terminal ${flight.departure.terminal}`}
                            </div>
                            <div className="text-sm text-gray-600">
                              {flight.departure.airport}, {flight.departure.city}
                            </div>
                          </div>
                        </div>

                        {/* Layover (if any) */}
                        {flight.stops > 0 && flight.stopInfo && (
                          <div className="flex gap-4 pb-6 border-b border-gray-200">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 mb-1">Layover</div>
                              <div className="text-sm text-gray-600">
                                {flight.stopInfo.join(", ")}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Arrival */}
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">Arrival</div>
                            <div className="text-sm text-gray-600 mb-2">
                              {flight.arrival.time} • {flight.arrival.terminal && `Terminal ${flight.arrival.terminal}`}
                            </div>
                            <div className="text-sm text-gray-600">
                              {flight.arrival.airport}, {flight.arrival.city}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "baggage" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 mb-4">Baggage Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Cabin Baggage</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Economy: 7kg</li>
                            <li>• Premium Economy: 10kg</li>
                            <li>• Business: 15kg</li>
                            <li>• First: 20kg</li>
                          </ul>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Check-in Baggage</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Economy: 23kg</li>
                            <li>• Premium Economy: 30kg</li>
                            <li>• Business: 35kg</li>
                            <li>• First: 40kg</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                        <ul className="space-y-1 text-sm text-yellow-700">
                          <li>• Additional baggage charges may apply</li>
                          <li>• Size restrictions: 158cm total (L+W+H)</li>
                          <li>• Liquid restrictions apply to cabin baggage</li>
                          <li>• Special items may require additional fees</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === "fare-rules" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 mb-4">Fare Rules</h3>
                      
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Cancellation</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Economy: Non-refundable</li>
                            <li>• Premium Economy: 50% refundable</li>
                            <li>• Business: 75% refundable</li>
                            <li>• First: Fully refundable</li>
                          </ul>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Changes</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Economy: BDT 3,000 fee + fare difference</li>
                            <li>• Premium Economy: BDT 2,000 fee + fare difference</li>
                            <li>• Business: BDT 1,000 fee + fare difference</li>
                            <li>• First: No change fee</li>
                          </ul>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">No-Show</h4>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li>• No refund for no-show passengers</li>
                            <li>• Rebooking allowed with applicable fees</li>
                            <li>• Must contact airline within 24 hours</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 mb-4">Passenger Reviews</h3>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-3xl font-bold text-gray-900">4.2</div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 ${star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                viewBox="0 0 24 24"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">Based on 1,247 reviews</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            name: "Ahmed Rahman",
                            rating: 5,
                            date: "2 weeks ago",
                            comment: "Excellent service and comfortable flight. The crew was very professional."
                          },
                          {
                            name: "Fatema Khatun",
                            rating: 4,
                            date: "1 month ago",
                            comment: "Good flight experience. On-time departure and arrival. Food could be better."
                          },
                          {
                            name: "Mohammad Ali",
                            rating: 3,
                            date: "2 months ago",
                            comment: "Average service. Flight was delayed by 30 minutes but staff was helpful."
                          }
                        ].map((review, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-gray-900">{review.name}</div>
                              <div className="text-sm text-gray-600">{review.date}</div>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  viewBox="0 0 24 24"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Fare Selection */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Select Fare Type</h3>
                <div className="space-y-3">
                  {fareTypes.map((fare) => (
                    <label
                      key={fare.id}
                      className={`block border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedFare === fare.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="fare"
                            value={fare.id}
                            checked={selectedFare === fare.id}
                            onChange={(e) => setSelectedFare(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{fare.name}</div>
                            <div className="text-sm text-gray-600">
                              {fare.id === "economy" && "Basic amenities, standard seats"}
                              {fare.id === "premium_economy" && "Extra legroom, premium meals"}
                              {fare.id === "business" && "Lie-flat seats, lounge access"}
                              {fare.id === "first" && "Private suite, premium service"}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{formatPrice(fare.price)}</div>
                          <div className="text-xs text-gray-600">per person</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Price Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Fare ({adults + children} passengers)</span>
                    <span className="font-medium">{formatPrice(calculateTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">{formatPrice(Math.round(calculateTotalPrice() * 0.15))}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-blue-600">
                        {formatPrice(Math.round(calculateTotalPrice() * 1.15))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBooking}
                size="lg"
                className="w-full"
              >
                Continue to Booking
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 text-center">
                <div className="text-sm text-gray-600 mb-3">Secure Booking</div>
                <div className="flex justify-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">VISA</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">MC</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">AMEX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
